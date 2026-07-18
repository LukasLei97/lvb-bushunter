const gesamt = 186;
let gesammelt = 0;

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const fahrzeugListe = document.getElementById("fahrzeugListe");

const fahrzeuge = [
    "1221",
    "1222",
    "1223",
    "1224",
    "1225",
    "1226",
    "1227",
    "1228",
    "1229",
    "1230"
];

function anzeigen() {

    fahrzeugListe.innerHTML = "";

    fahrzeuge.forEach(bus => {

        const div = document.createElement("div");

        div.style.padding = "12px";
        div.style.marginBottom = "10px";
        div.style.borderRadius = "12px";
        div.style.background = "#334155";
        div.style.cursor = "pointer";

        div.innerHTML = "☐ " + bus;

        div.onclick = () => {

            if(div.innerHTML.startsWith("☐")){
                div.innerHTML = "☑ " + bus;
                gesammelt++;
            }else{
                div.innerHTML = "☐ " + bus;
                gesammelt--;
            }

            update();

        }

        fahrzeugListe.appendChild(div);

    });

}

function update(){

    let prozent = gesammelt / gesamt * 100;

    progressFill.style.width = prozent + "%";

    progressText.innerHTML =
        gesammelt + " / " + gesamt + " Fahrzeuge";

}

anzeigen();
update();
