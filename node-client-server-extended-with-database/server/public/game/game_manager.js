class GameManager {
    constructor(connection) {
        this.connection = connection;
        this.games = new Map(); // gameId -> Game
    }
 
    getGame(gameId, callback) {
        if (this.games.has(gameId)) {
            return callback(null, this.games.get(gameId));
        }
 
        const game = new Game(gameId, this.connection);
        game.loadFromDB(err => {
            if (err) return callback(err);
            this.games.set(gameId, game);
            callback(null, game);
        });
    }
 
    createGame(callback) {
        const game = new Game(null, this.connection);
        game.createInDB((err, gameId) => {
            if (err) return callback(err);
            this.games.set(gameId, game);
            callback(null, game);
        });
    }
}