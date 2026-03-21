//für Echtzeitspiel Kommunikation (aka Spielplatz)

module.exports = (io, db) => { //Diese Datei gibt eine Funktion nach außen frei; SocketIO Server und Datenbank werden übergebn
 
    io.on("connection", (socket) => { //wenn ein neuer Spieler den browser öffnet und sich verbindet; socket ist die Verbindung zu diesem Spieler => jeder Spieler bekommt einen Socket

        console.log("Spieler verbunden:", socket.id); //Spieler ID wird ausgegeben
 
        // Spieler tritt bei => noch anpassen
        socket.on("join", async (playerName) => {

            console.log("Join:", playerName);
 
            // TODO: Spieler in DB speichern

            // TODO: Gamestate laden

            // TODO: Gamestate an alle senden

        });
 
        // Spieler macht eine Aktion
        socket.on("action", async (data) => { //data enthält die Infos über die Aktion: also zb, dass es sich um einen Tausch handelt und welche Karten getauscht werden sollen

            console.log("Aktion:", data);
 
            // TODO: Gamestate aktualisieren

            // TODO: Gamestate speichern

            // TODO: neuen Gamestate an alle senden

        });
 
        // Spieler trennt sich

        socket.on("disconnect", () => {

            console.log("Spieler weg:", socket.id);
 
            // TODO: Spieler aus DB entfernen

            // TODO: Gamestate aktualisieren

            // TODO: neuen Gamestate an alle senden

        });

    });
 
};

 