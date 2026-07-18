import { initVehicles, renderVehicles } from "./vehicles.js";
import { setSearch } from "./search.js";
import { askPlayer } from "./player.js";

// ===== Fahrer =====

const player = askPlayer();

document.getElementById("welcomeText").textContent =
`Hallo ${player} 👋`;

// ===== Navigation =====

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

    Object.values(pages).forEach(p => p.hidden = true);
    Object.values(buttons).forEach(b => b.classList.remove("active"));

    pages[page].hidden = false;
    buttons[page].classList.add("active");
}

buttons.home.onclick = () => showPage("home");
buttons.stats.onclick = () => showPage("stats");
buttons.ranking.onclick = () => showPage("ranking");
buttons.settings.onclick = () => showPage("settings");

// ===== Suche =====

const search = document.getElementById("search");

search.addEventListener("input", (e) => {

    setSearch(e.target.value);

    renderVehicles();

});

// ===== Start =====

async function start() {

    showPage("home");

    await initVehicles();

}

start();