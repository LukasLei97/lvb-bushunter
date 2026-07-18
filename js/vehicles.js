import { loadCollected, saveOnline } from "./storage.js";
import { updateDashboard } from "./stats.js";
import { getSearch } from "./search.js";
import { watchPlayer } from "./firebase.js";

let fahrzeuge = [];
let gesammelt = [];
let spieler = "";

const liste = document.getElementById("vehicleList");

export async function initVehicles(playerName) {

    spieler = playerName;

    const response = await fetch("fahrzeuge.json");
    fahrzeuge = await response.json();

    gesammelt = await loadCollected(spieler);

    renderVehicles();

    watchPlayer(spieler, (online) => {

        gesammelt = online;

        renderVehicles();

    });

}

export function renderVehicles() {

    liste.innerHTML = "";

    const suche = getSearch().toLowerCase();

    const gruppen = {};

    fahrzeuge.forEach(bus => {

        if (
            suche &&
            !bus.nummer.toLowerCase().includes(suche) &&
            !bus.typ.toLowerCase().includes(suche)
        ) return;

        if (!gruppen[bus.typ]) {

            gruppen[bus.typ] = [];

        }

        gruppen[bus.typ].push(bus);

    });

    Object.keys(gruppen)
        .sort()
        .forEach(typ => {

            const details = document.createElement("details");

            details.open = true;

            const summary = document.createElement("summary");

            summary.textContent =
                typ + " (" + gruppen[typ].length + ")";

            details.appendChild(summary);

            gruppen[typ].forEach(bus => {

                const card = document.createElement("div");

                card.className = "vehicle";

                if (gesammelt.includes(bus.nummer)) {

                    card.classList.add("done");

                }

                const nummer = document.createElement("div");

                nummer.className = "number";

                nummer.textContent = bus.nummer;

                const status = document.createElement("div");

                status.className = "status";

                status.textContent =
                    gesammelt.includes(bus.nummer)
                        ? "✅ Gefahren"
                        : "⬜ Offen";

                card.appendChild(nummer);

                card.appendChild(status);

                card.onclick = async () => {

                    toggleBus(bus.nummer);

                };

                details.appendChild(card);

            });

            liste.appendChild(details);

        });

    updateStats();

}
function toggleBus(busNummer) {

    if (gesammelt.includes(busNummer)) {

        gesammelt = gesammelt.filter(nr => nr !== busNummer);

    } else {

        gesammelt.push(busNummer);

    }

    saveOnline(spieler, gesammelt);

    renderVehicles();

}

function updateStats() {

    const gesamt = fahrzeuge.length;

    const gefahren = gesammelt.length;

    updateDashboard(gesamt, gefahren);

    updateTypeStats();

}

function updateTypeStats() {

    const container = document.getElementById("typeStats");

    if (!container) return;

    container.innerHTML = "";

    const typen = {};

    fahrzeuge.forEach(bus => {

        if (!typen[bus.typ]) {

            typen[bus.typ] = {
                gesamt: 0,
                gefahren: 0
            };

        }

        typen[bus.typ].gesamt++;

        if (gesammelt.includes(bus.nummer)) {

            typen[bus.typ].gefahren++;

        }

    });

    Object.keys(typen)
        .sort()
        .forEach(typ => {

            const daten = typen[typ];

            const prozent = Math.round(
                (daten.gefahren / daten.gesamt) * 100
            );

            const card = document.createElement("div");

            card.className = "typeCard";

            card.innerHTML = `

                <h3>${typ}</h3>

                <p>${daten.gefahren} / ${daten.gesamt}</p>

                <div class="typeProgress">

                    <div
                        class="typeProgressBar"
                        style="width:${prozent}%">
                    </div>

                </div>

                <span>${prozent}%</span>

            `;

            container.appendChild(card);

        });

}