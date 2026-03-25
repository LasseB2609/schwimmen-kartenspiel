//für Echtzeitspiel Kommunikation (aka Spielplatz)

//Token-Middelware
const jwt = require("jsonwebtoken");
const JWT_SECRET = "SUPER_GEHEIMES_PASSWORT"; // später .env




module.exports = (io, db) => { //Diese Datei gibt eine Funktion nach außen frei; SocketIO Server und Datenbank werden übergebn
 
//Token prüfen, bevor Verbindung akzeptiert wird
io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("Kein Token übergeben"));
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);

        // Spielerinfos am Socket speichern
        socket.user = {
            player_id: user.player_id,
            username: user.username
        };

        next();
    } catch (err) {
        next(new Error("Ungültiger Token"));
    }
});


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

 