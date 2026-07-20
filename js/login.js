import { savePlayer, loadPlayer } from "./storage.js";

const fahrer = [
    { id: "Lukas", farbe: "#1976d2" },
    { id: "Tim", farbe: "#43a047" },
    { id: "John", farbe: "#f9a825" },
    { id: "Victoria", farbe: "#8e24aa" },
    { id: "Florian", farbe: "#e53935" }
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
        <div class="loginScreen">

            <div class="loginLogo">🚌</div>

            <h1>BusHunter Leipzig</h1>

            <p class="loginSubtitle">
                Wer fährt heute?
            </p>

            <div id="fahrerButtons"></div>

            <div class="loginVersion">
                Version 4.2
            </div>

        </div>
    `;

    document.body.appendChild(overlay);

    const container = document.getElementById("fahrerButtons");

    fahrer.forEach(fahrer => {

        const button = document.createElement("button");

        button.className = "driverButton";

        button.innerHTML = `
            <div class="driverLeft">
                <div class="driverCircle" style="background:${fahrer.farbe}">
                    👤
                </div>

                <span>${fahrer.id}</span>
            </div>

            <div class="driverArrow">➜</div>
        `;

        button.onclick = () => {

            savePlayer(fahrer.id);

            overlay.remove();

            callback(fahrer.id);

        };

        container.appendChild(button);

    });

}