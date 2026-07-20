import { initVehicles, renderVehicles } from "./vehicles.js";
import { setSearch } from "./search.js";
import { initRanking } from "./ranking.js";
import { showLogin } from "./login.js";
import { removePlayer, clearLocal } from "./storage.js";
import { resetAllPlayers } from "./firebase.js";
// ===============================
// Navigation
// ===============================

const pages = {
    home: document.getElementById("homePage"),
    stats: document.getElementById("statsPage"),
    ranking: document.getElementById("rankingPage"),
    settings: document.getElementById("settingsPage")
};

const buttons = {
    home: document.getElementById("navHome"),
    stats: document.getElementById("navStats"),
    ranking: document.getElementById("navRanking"),
    settings: document.getElementById("navSettings")
};

function showPage(page) {

    Object.values(pages).forEach(p => {
        if (p) p.hidden = true;
    });

    Object.values(buttons).forEach(b => {
        if (b) b.classList.remove("active");
    });

    pages[page].hidden = false;
    buttons[page].classList.add("active");

}

buttons.home.onclick = () => showPage("home");
buttons.stats.onclick = () => showPage("stats");
buttons.ranking.onclick = () => showPage("ranking");
buttons.settings.onclick = () => showPage("settings");

// ===============================
// Suche
// ===============================

const search = document.getElementById("search");

if (search) {

    search.addEventListener("input", e => {

        setSearch(e.target.value);

        renderVehicles();

    });

}

// ===============================
// Fahrer wechseln
// ===============================

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.onclick = () => {

        if (!confirm("Fahrer wirklich wechseln?")) {
            return;
        }

        removePlayer();
        clearLocal();
        location.reload();

    };

}

// ===============================
// App starten
// ===============================

showLogin(async (player) => {

    const welcome = document.getElementById("welcomeText");

    if (welcome) {
        welcome.textContent = `Hallo ${player} 👋`;
    }

    const currentPlayer = document.getElementById("currentPlayer");

    if (currentPlayer) {
        currentPlayer.textContent = player;
    }

    // ===============================
    // Adminbereich nur für Lukas
    // ===============================

    if (player === "Lukas") {

        const settingsList = document.querySelector(".settingsList");

        const adminButton = document.createElement("button");

        adminButton.id = "resetAllButton";
        adminButton.className = "dangerButton";
        adminButton.textContent = "🗑️ Alle Statistiken zurücksetzen";

        adminButton.onclick = async () => {

            const ok = confirm(
`⚠️ ACHTUNG!

Alle Statistiken werden gelöscht.

• Lukas
• Tim
• John
• Victoria
• Florian

Dieser Vorgang kann nicht rückgängig gemacht werden.

Möchtest du fortfahren?`
            );

            if (!ok) return;

            adminButton.disabled = true;
            adminButton.textContent = "Zurücksetzen...";

            try {

                await resetAllPlayers();

                alert("✅ Alle Statistiken wurden erfolgreich zurückgesetzt.");

            } catch (e) {

                console.error(e);

                alert("❌ Fehler beim Zurücksetzen.");

            }

            adminButton.disabled = false;
            adminButton.textContent = "🗑️ Alle Statistiken zurücksetzen";

        };

        settingsList.appendChild(adminButton);

    }

    showPage("home");

    await initVehicles(player);

    initRanking();

    console.log("BusHunter gestartet");

});