import { loadCollected, saveCollected } from "./storage.js";
import { updateDashboard } from "./stats.js";
import { getSearch } from "./search.js";

let vehicles = [];
let collected = [];

export async function initVehicles() {

    const response = await fetch("../fahrzeuge.json");
    vehicles = await response.json();

    collected = loadCollected();

    renderVehicles();
}

export function renderVehicles() {

    const list = document.getElementById("vehicleList");
    const typeStats = document.getElementById("typeStats");

    list.innerHTML = "";
    typeStats.innerHTML = "";

    const filter = getSearch();

    const groups = {};

    vehicles.forEach(vehicle => {

        const number = vehicle.nummer.toLowerCase();
        const type = vehicle.typ.toLowerCase();

        if (
            filter &&
            !number.includes(filter) &&
            !type.includes(filter)
        ) return;

        if (!groups[vehicle.typ]) {
            groups[vehicle.typ] = [];
        }

        groups[vehicle.typ].push(vehicle);
    });

    Object.keys(groups).sort().forEach(type => {

        const details = document.createElement("details");
        details.open = true;

        const summary = document.createElement("summary");
        summary.textContent =
            `${type} (${groups[type].length})`;

        details.appendChild(summary);

        let done = 0;

        groups[type].forEach(vehicle => {

            const checked =
                collected.includes(vehicle.nummer);

            if (checked) done++;

            const card = document.createElement("div");
            card.className = "vehicle";

            if (checked) {
                card.classList.add("checked");
            }

            card.innerHTML = `
                <div class="vehicle-info">
                    <div class="vehicle-number">
                        🚌 ${vehicle.nummer}
                    </div>
                    <div class="vehicle-type">
                        ${vehicle.typ}
                    </div>
                </div>

                <div class="checkmark">
                    ${checked ? "✅" : "⭕"}
                </div>
            `;

            card.onclick = () => {

                if (checked) {
                    collected =
                        collected.filter(x => x !== vehicle.nummer);
                } else {
                    collected.push(vehicle.nummer);
                }

                saveCollected(collected);
                renderVehicles();

            };

            details.appendChild(card);

        });

        list.appendChild(details);

        const percent =
            Math.round((done / groups[type].length) * 100);

        const stat = document.createElement("div");

        stat.className = "type-stat";

        stat.innerHTML = `
            <div class="type-header">
                <span>${type}</span>
                <span>${done}/${groups[type].length}</span>
            </div>

            <div class="type-progress">
                <div class="type-fill"
                    style="width:${percent}%">
                </div>
            </div>
        `;

        typeStats.appendChild(stat);

    });

    updateDashboard(
        vehicles.length,
        collected.length
    );
}