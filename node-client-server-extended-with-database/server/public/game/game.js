class Game {
    constructor(players){ //erwartet bei erstellen eines Game-Objekts, dass ein Array Players übergeben wird, mit den Parametern id und username
        this.players = players.map(
            p => new Player(p.id, p.username)
        );
        this.deck = new Deck(); //macht man das so? generell noch überprüfen, inwieweit Klassen/Dateien eingebunden werden müssen, also schauen mit import und export
        
        this.currentRound = null;
    }


    startNewRound() {
        //irgendwo hier das deck neu erstellen lassen
        this.currentRound = new Round(this.players, this.deck);
        this.currentRound.startRound();
    }

    
    
}