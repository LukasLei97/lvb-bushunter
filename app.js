let fahrzeuge = [];

const vehicleList = document.getElementById("vehicleList");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");
const suche = document.getElementById("search");

let gesammelt = JSON.parse(localStorage.getItem("gesammelt")) || [];

function speichern() {
    localStorage.setItem("gesammelt", JSON.stringify(gesammelt));
}

async function ladeFahrzeuge() {
    const antwort = await fetch("fahrzeuge.json");
    fahrzeuge = await antwort.json();

    anzeigen();

    suche.addEventListener("input", (e) => {
        anzeigen(e.target.value.toLowerCase());
    });
}

function anzeigen(filter = "") {

    vehicleList.innerHTML = "";

    const gruppen = {};

    fahrzeuge.forEach(fahrzeug => {

        if (
            !fahrzeug.nummer.toLowerCase().includes(filter) &&
            !fahrzeug.typ.toLowerCase().includes(filter)
        ) {
            return;
        }

        if (!gruppen[fahrzeug.typ]) {
            gruppen[fahrzeug.typ] = [];
        }

        gruppen[fahrzeug.typ].push(fahrzeug);
    });

    Object.keys(gruppen).forEach(typ => {

        const details = document.createElement("details");
        details.open = true;

        const summary = document.createElement("summary");
        summary.textContent = `${typ} (${gruppen[typ].length})`;
        details.appendChild(summary);

        gruppen[typ].forEach(fahrzeug => {

            const div = document.createElement("div");
            div.className = "vehicle";

            if (gesammelt.includes(fahrzeug.nummer)) {
                div.classList.add("checked");
            }

            div.innerHTML = `
                <strong>🚌 ${fahrzeug.nummer}</strong><br>
                <small>${fahrzeug.typ}</small>
            `;

            div.onclick = () => {

                if (gesammelt.includes(fahrzeug.nummer)) {
                    gesammelt = gesammelt.filter(x => x !== fahrzeug.nummer);
                } else {
                    gesammelt.push(fahrzeug.nummer);
                }

                speichern();
                anzeigen(suche.value.toLowerCase());
            };

            details.appendChild(div);
        });

        vehicleList.appendChild(details);
    });

    const prozent = fahrzeuge.length
        ? (gesammelt.length / fahrzeuge.length) * 100
        : 0;

    progress.style.width = prozent + "%";
    progressText.textContent =
        `${gesammelt.length} von ${fahrzeuge.length} Fahrzeugen`;
}

ladeFahrzeuge();