class Deck {
    constructor() {
        this.deck = this.generateCards();
    }

    //Methode, um die Karten für das Kartendeck zu generieren
    generateCards() {
        const cards = [];
        const suits = ["Herz", "Kreuz", "Karo", "Pik"]; // alle vier Farben
        const ranks = ["7", "8", "9", "10", "B", "D", "K", "A"]; //alle möglichen Kartenränge von 7 bis Ass

        //generiert jede mögliche Karte einmal
        for(const suit of suits) {
            for(const rank of ranks) {
                cards.push(new Card(suit, rank)); //übergibt ein entsprechendes Objekt der Klasse Card
            }
        }
        return cards;
    }

    //Methode, um das Kartendeck zu mischen (Fisher-Yates Shuffle - von ChatGPT)
    
    shuffle() {
        //Gemischt wird, indem vom Ende des Arrays aus iteriert wird und jedes Element mit einem zufälligen Element aus dem noch nicht gemischten Teil vertauscht wird. 
        //Dadurch entsteht eine gleichmäßig zufällige Reihenfolge der Karten.
        for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
    
        //Karten tauschen
        [deck[i], deck[j]] = [deck[j], deck[i]];
        }
        return deck;
    }

    //Methode, um die oberste Karte vom Stapel zu entfernen und zurückzugeben
    draw() {
        return this.deck.pop();
    }

    //evtl. eine Methode um das Kartendeck neuzugenerieren? / löschen und dann neu generieren oder so -> also soetwas wie ein Reset
}