class Round {
    constructor(players, deck) {
        
        this.players = players;
        this.deck = deck;
        this.tableCards = [];
        this.currentPlayer = 0;
        this.finished = false;
    }

    startRound() {
        //evtl. Deck wieder neuerstellen / auf Anfang zurücksetzen? -> siehe auch deck.js

        this.deck.shuffle();
        this.dealPlayerCards();
        this.firstPlayerChoose(false); //von wo den Parameter herholen? => mit einem Button verknüpfen
    }

    //Methode, um jeweils 3 Karten an die Spieler zu verteilen
    dealPlayerCards() {
        for(let i = 1; i<= 3; i++) { //damit je 3 Karten gegeben werden
            for(const player of this.players) { //damit jedem Spieler Karten gegeben werden
                player.addCard(this.deck.draw());
            }
        }
    }

    //Methode, um 3 Karten in die Tischmitte zu teilen
    dealTableCards() {
        this.tableCards = [
            this.deck.draw(),
            this.deck.draw(),
            this.deck.draw()
        ]
    }

    //Methode, mit der am Anfang einer Runde, der erste Spieler entscheiden kann, ob seine 3 Handkarten  oder 3 neue Karten in die Tischmitte kommen
    firstPlayerChoose(getNewCards) { //true oder false
        const firstPlayer = this.players[0]; //der erste Spieler

        if(getNewCards) {
            this.tableCards = firstPlayer.hand.slice(); //kopiert die Hand des ersten Spielers in die Mitte
        } else {
            this.dealTableCards();
        }
    }

    performAction() {
        //todo: erst action validieren, über Validation.js und dann ausführen über Actions.js
    }
}