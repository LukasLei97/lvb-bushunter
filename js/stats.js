// js/stats.js

let letzteDaten = null;

/*
-----------------------------------
Dashboard aktualisieren
-----------------------------------
*/

export function updateDashboard(gesamt, gefahren) {

    const offen = gesamt - gefahren;

    const prozent =
        gesamt === 0
            ? 0
            : Math.round((gefahren / gesamt) * 100);

    const progress = document.getElementById("progress");
    const progressText = document.getElementById("progressText");

    const gesamtEl = document.getElementById("gesamt");
    const gefahrenEl = document.getElementById("gefahren");
    const offenEl = document.getElementById("offen");

    if (progress) {
        progress.style.width = prozent + "%";
    }

    if (progressText) {
        progressText.textContent = prozent + "% abgeschlossen";
    }

    if (gesamtEl) {
        gesamtEl.textContent = gesamt;
    }

    if (gefahrenEl) {
        gefahrenEl.textContent = gefahren;
    }

    if (offenEl) {
        offenEl.textContent = offen;
    }

    letzteDaten = {
        gesamt,
        gefahren,
        offen,
        prozent
    };

    renderStats();

}

/*
-----------------------------------
Statistikseite
-----------------------------------
*/

export function renderStats() {

    const container = document.getElementById("statsContent");

    if (!container || !letzteDaten) {
        return;
    }

    container.innerHTML = `

        <div class="statsGrid">

            <div class="statsCard">

                <h3>🚌 Fahrzeuge</h3>

                <p>${letzteDaten.gesamt}</p>

            </div>

            <div class="statsCard">

                <h3>✅ Gefahren</h3>

                <p>${letzteDaten.gefahren}</p>

            </div>

            <div class="statsCard">

                <h3>⬜ Offen</h3>

                <p>${letzteDaten.offen}</p>

            </div>

            <div class="statsCard">

                <h3>🏆 Fortschritt</h3>

                <p>${letzteDaten.prozent}%</p>

            </div>

        </div>

    `;

}