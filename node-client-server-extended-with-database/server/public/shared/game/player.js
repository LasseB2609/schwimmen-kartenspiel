class Player {
    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.lives = 3; //oder je nach "Modi" automatisch anpassen lassen?
        this.hand = [];
    }

    //fügt eine Karte der Hand des Spielers hinzu
    addCard(card) {
        this.hand.push(card);
    }

    //entfernt eine Karte aus der Hand des Spielers
    removeCard(card) {
        
    }

    //leert die Hand
    clearHand() {

    }
}