// js/login.js

import { savePlayer, loadPlayer } from "./storage.js";

const fahrer = [
    {
        id: "Lukas",
        farbe: "#1976d2"
    },
    {
        id: "Tim",
        farbe: "#43a047"
    },
    {
        id: "John",
        farbe: "#f9a825"
    },
    {
        id: "Victoria",
        farbe: "#8e24aa"
    },
    {
        id: "Florian",
        farbe: "#e53935"
    }
];

export function showLogin(callback) {

    const vorhanden = loadPlayer();

    if (vorhanden) {
        callback(vorhanden);
        return;
    }

    const overlay = document.createElement("div");
    overlay.id = "loginOverlay";

    overlay.innerHTML = `
        <div class="loginBox">

            <h1>🚌 BusHunter Leipzig</h1>

            <p>Wer fährt heute?</p>

            <div id="fahrerButtons"></div>

        </div>
    `;

    document.body.appendChild(overlay);

    const container = document.getElementById("fahrerButtons");

    fahrer.forEach((fahrer) => {

        const btn = document.createElement("button");

        btn.className = "driverButton";
        btn.style.background = fahrer.farbe;
        btn.textContent = fahrer.id;

        btn.onclick = () => {

            savePlayer(fahrer.id);

            overlay.remove();

            callback(fahrer.id);

        };

        container.appendChild(btn);

    });

}
