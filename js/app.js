import { initVehicles, renderVehicles } from "./vehicles.js";
import { setSearch } from "./search.js";
import { initRanking } from "./ranking.js";
import { showLogin } from "./login.js";

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

function showPage(page){

    Object.values(pages).forEach(p=>{
        if(p)p.hidden=true;
    });

    Object.values(buttons).forEach(b=>{
        if(b)b.classList.remove("active");
    });

    if(pages[page]){
        pages[page].hidden=false;
    }

    if(buttons[page]){
        buttons[page].classList.add("active");
    }

}

buttons.home.onclick=()=>showPage("home");
buttons.stats.onclick=()=>showPage("stats");
buttons.ranking.onclick=()=>showPage("ranking");
buttons.settings.onclick=()=>showPage("settings");

// ===============================
// Suche
// ===============================

const search=document.getElementById("search");

if(search){

    search.addEventListener("input",(e)=>{

        setSearch(e.target.value);

        renderVehicles();

    });

}

// ===============================
// App starten
// ===============================

showLogin(async(player)=>{

    const welcome=document.getElementById("welcomeText");

    if(welcome){

        welcome.textContent=`Hallo ${player} 👋`;

    }

    showPage("home");

    await initVehicles(player);

    initRanking();

    console.log("BusHunter gestartet");

});