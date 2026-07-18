// js/player.js

import { savePlayer, loadPlayer } from "./storage.js";

export function askPlayer() {

    let player = loadPlayer();

    if (player) {
        return player;
    }

    const fahrer = [
        "Lukas",
        "Fahrer 2",
        "Fahrer 3",
        "Fahrer 4"
    ];

    while (true) {

        player = prompt(
`Willkommen bei BusHunter!

Bitte gib deinen Fahrernamen ein:

${fahrer.join("\n")}`
        );

        if (player === null) {

            alert("Ein Fahrer muss ausgewählt werden.");

            continue;

        }

        player = player.trim();

        if (fahrer.includes(player)) {

            savePlayer(player);

            return player;

        }

        alert("Unbekannter Fahrer.");

    }

}

export function logout() {

    localStorage.removeItem("bushunter-player");

    location.reload();

}

export function currentPlayer() {

    return loadPlayer();

}