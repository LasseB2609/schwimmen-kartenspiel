const game = new Game([
  { id: 1, username: "Spieler1" },
  { id: 2, username: "Spieler2" } //kommt noch raus, spieler werden sperat erstellt
]);

document.getElementById("startBtn").onclick = () => {
  game.startNewRound();
  alert("Runde gestartet!");
};

document.getElementById("profileBtn").onclick = () => {
  alert("Profilverwaltung kommt später!");
};

document.getElementById("helpBtn").onclick = () => {
  alert("Ziel: Erreiche 31 Punkte mit deinen Karten.");
};
