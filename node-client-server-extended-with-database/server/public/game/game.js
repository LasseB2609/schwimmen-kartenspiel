class Game {
    constructor(gameId, connection) { //erwartet bei erstellen eines Game-Objekts, dass ein Array Players übergeben wird, mit den Parametern id und username
        //this.players = players.map(
        //    p => new Player(p.id, p.username)
        //);
        this.deck = new Deck(); //macht man das so? generell noch überprüfen, inwieweit Klassen/Dateien eingebunden werden müssen, also schauen mit import und export
        this.connection = connection;
        this.gameId = gameId;
        this.currentRound = null;
    }


    startNewRound() {
        //irgendwo hier das deck neu erstellen lassen
        this.currentRound = new Round(this.players, this.deck);
        this.currentRound.startRound();
    }


    //von KI
    createInDB(callback) {
        const sql = "INSERT INTO Game (status, round_number) VALUES ('waiting', 0)";
        this.connection.query(sql, (err, result) => {
            if (err) return callback(err);
            this.gameId = result.insertId;
            callback(null, this.gameId);
        });
    }

    addPlayer(playerId, socketId, callback) {
        const sql = `
        INSERT INTO Game_Player (game_id, player_id, socket_id, is_active, lives)
        VALUES (?, ?, ?, TRUE, 3)
    `;
        this.connection.query(sql, [this.gameId, playerId, socketId], (err) => {
            if (err) return callback(err);
            // Player-Details aus DB laden
            this.connection.query(
                "SELECT * FROM Player WHERE player_id = ?",
                [playerId],
                (err2, results) => {
                    if (err2) return callback(err2);
                    const row = results[0];
                    const player = new Player(row.player_id, row.username);
                    player.lives = 3;
                    this.players.push(player);
                    callback(null, player);
                }
            );
        });
    }


    initDeck(callback) {
        this.connection.query("SELECT * FROM Card", (err, rows) => {
            if (err) return callback(err);
            // Card-Objekte bauen
            this.deck = rows.map(r => new Card(r.card_id, r.suit, r.rank, r.value));
            // mischen
            for (let i = this.deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
            }
            // in Game_Card speichern
            const values = this.deck.map((card, index) => [
                this.gameId,
                card.id,
                'deck',
                null,
                index
            ]);
            const sql = `
            INSERT INTO Game_Card (game_id, card_id, location, owner_player_id, position)
            VALUES ?
        `;
            this.connection.query(sql, [values], callback);
        });
    }


    startGame(callback) {
        this.status = "playing";
        this.roundNumber = 1;
        this.currentPlayerIndex = 0;
        // 3 Karten pro Spieler ziehen
        const updates = [];
        this.players.forEach(player => {
            player.cards = [];
            for (let i = 0; i < 3; i++) {
                const card = this.deck.pop();
                player.cards.push(card);
                updates.push([
                    'player',
                    player.id,
                    null,
                    this.gameId,
                    card.id
                ]);
            }
        });
        // Game-Status speichern
        this.connection.query(
            "UPDATE Game SET status=?, round_number=?, current_player_id=? WHERE game_id=?",
            [this.status, this.roundNumber, this.players[0].id, this.gameId]
        );
        // Karten-Location updaten
        const sql = `
        UPDATE Game_Card
        SET location = ?, owner_player_id = ?, position = ?
        WHERE game_id = ? AND card_id = ?
    `;
        let pending = updates.length;
        if (pending === 0) return callback();
        updates.forEach(params => {
            this.connection.query(sql, params, (err) => {
                if (err) return callback(err);
                pending--;
                if (pending === 0) callback();
            });
        });
    }


    loadFromDB(callback) {
        // 1. Game
        this.connection.query(
            "SELECT * FROM Game WHERE game_id = ?",
            [this.gameId],
            (err, gameRows) => {
                if (err) return callback(err);
                if (gameRows.length === 0) return callback(new Error("Game not found"));

                const g = gameRows[0];
                this.status = g.status;
                this.roundNumber = g.round_number;

                // 2. Players
                this.connection.query(
                    `SELECT gp.*, p.username 
                 FROM Game_Player gp
                 JOIN Player p ON gp.player_id = p.player_id
                 WHERE gp.game_id = ?`,
                    [this.gameId],
                    (err2, playerRows) => {
                        if (err2) return callback(err2);

                        this.players = playerRows.map(r => {
                            const pl = new Player(r.player_id, r.username);
                            pl.lives = r.lives;
                            return pl;
                        });

                        // 3. Cards
                        this.connection.query(
                            "SELECT gc.*, c.suit, c.rank, c.value FROM Game_Card gc JOIN Card c ON gc.card_id = c.card_id WHERE gc.game_id = ?",
                            [this.gameId],
                            (err3, cardRows) => {
                                if (err3) return callback(err3);

                                this.deck = [];
                                // ggf. tableCards, discardPile etc. anlegen

                                cardRows.forEach(r => {
                                    const card = new Card(r.card_id, r.suit, r.rank, r.value);

                                    if (r.location === 'deck') {
                                        this.deck[r.position] = card;
                                    } else if (r.location === 'player') {
                                        const player = this.players.find(p => p.id === r.owner_player_id);
                                        if (player) player.cards.push(card);
                                    }
                                    // table / discard analog
                                });

                                callback();
                            }
                        );
                    }
                );
            }
        );
    }

    saveInDB() {

    }



}