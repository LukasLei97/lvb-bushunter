import { initVehicles, renderVehicles } from "./vehicles.js";
import { setSearch } from "./search.js";
import { initRanking } from "./ranking.js";
import { showLogin } from "./login.js";
import { removePlayer, clearLocal } from "./storage.js";

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

        // Fahrer löschen
        removePlayer();

        // Lokale Fahrzeugliste leeren
        clearLocal();

        // Seite neu laden
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

    showPage("home");

    await initVehicles(player);

    initRanking();

    console.log("BusHunter gestartet");

});