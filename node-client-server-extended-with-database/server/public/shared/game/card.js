class Card {
    //übergibt beim erstellen einer Karte die entsprechenden Parameter
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = this.calculateCardValue;
    }

    calculateCardValue() { //gibt basierend auf dem Kartenrang den entsprechenden Kartenwert zurück
        if(this.rank === "A") { //Kartenrang Ass
            return 11;
        } else if(this.rank === "B" || this.rank === "D" || this.rank === "K") { //Kartenrang Bube/Dame/König
            return 10;
        } else { //Kartenrang Zahlen
            return Number(this.rank);
        }
    }

    
}