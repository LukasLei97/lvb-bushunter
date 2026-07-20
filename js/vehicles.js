import { loadCollected, saveOnline } from "./storage.js";
import { updateDashboard } from "./stats.js";
import { getSearch } from "./search.js";
import { watchPlayer } from "./firebase.js";

let fahrzeuge = [];
let gesammelt = [];
let spieler = "";

const liste = document.getElementById("vehicleList");


// ===============================
// Fahrzeuge laden
// ===============================

export async function initVehicles(playerName) {

    spieler = playerName;

    const response = await fetch("fahrzeuge.json");

    fahrzeuge = await response.json();

    gesammelt = await loadCollected(spieler);


    renderVehicles();


    watchPlayer(spieler, online => {

        gesammelt = online;

        renderVehicles();

    });

}


// ===============================
// Fahrzeuge anzeigen
// ===============================

export function renderVehicles() {


    // offene Kategorien merken

    const offeneGruppen = [];


    document
        .querySelectorAll("#vehicleList details")
        .forEach(details => {


            if(details.open){

                offeneGruppen.push(
                    details.dataset.typ
                );

            }

        });



    liste.innerHTML = "";



    const suche = getSearch().toLowerCase();



    const gruppen = {};



    fahrzeuge.forEach(bus => {



        if(

            suche &&

            !bus.nummer
                .toLowerCase()
                .includes(suche)

            &&

            !bus.typ
                .toLowerCase()
                .includes(suche)

        ){

            return;

        }



        if(!gruppen[bus.typ]){

            gruppen[bus.typ] = [];

        }



        gruppen[bus.typ].push(bus);



    });





    Object.keys(gruppen)

        .sort()

        .forEach(typ => {



            const details =
                document.createElement("details");



            details.dataset.typ = typ;



            // Zustand merken oder bei Suche öffnen

            details.open =

                offeneGruppen.includes(typ)

                ||

                suche.length > 0;




            const summary =
                document.createElement("summary");



            summary.textContent =
                `${typ} (${gruppen[typ].length})`;



            details.appendChild(summary);





            gruppen[typ].forEach(bus => {



                const gefahren =
                    gesammelt.includes(bus.nummer);




                const card =
                    document.createElement("div");



                card.className =
                    "vehicle";



                if(gefahren){

                    card.classList.add("done");

                }




                card.innerHTML = `

                    <div class="vehicleLeft">


                        <div class="vehicleNumber">

                            🚌 ${bus.nummer}

                        </div>


                        <div class="vehicleType">

                            ${bus.typ}

                        </div>


                    </div>



                    <div class="vehicleRight">


                        <div class="vehicleStatus">

                            ${gefahren ? "✅" : "⬜"}

                        </div>


                    </div>

                `;




                card.onclick = () => {


                    toggleBus(
                        bus.nummer
                    );


                };




                details.appendChild(card);



            });




            liste.appendChild(details);



        });



    updateStats();


}




// ===============================
// Bus speichern
// ===============================

function toggleBus(busNummer){



    if(
        gesammelt.includes(busNummer)
    ){


        gesammelt =
            gesammelt.filter(
                nr => nr !== busNummer
            );


    }

    else{


        gesammelt.push(busNummer);


    }




    saveOnline(
        spieler,
        gesammelt
    );



    renderVehicles();



}





// ===============================
// Dashboard
// ===============================

function updateStats(){


    updateDashboard(

        fahrzeuge.length,

        gesammelt.length

    );


    updateTypeStats();


}




// ===============================
// Fahrzeugtypen Statistik
// ===============================

function updateTypeStats(){


    const container =
        document.getElementById("typeStats");



    if(!container){

        return;

    }



    container.innerHTML = "";



    const typen = {};



    fahrzeuge.forEach(bus => {



        if(!typen[bus.typ]){


            typen[bus.typ] = {

                gesamt:0,

                gefahren:0

            };


        }



        typen[bus.typ].gesamt++;



        if(
            gesammelt.includes(bus.nummer)
        ){

            typen[bus.typ].gefahren++;

        }



    });





    Object.keys(typen)

        .sort()

        .forEach(typ => {



            const daten =
                typen[typ];



            const prozent =
                Math.round(

                    daten.gefahren /

                    daten.gesamt *

                    100

                );




            const card =
                document.createElement("div");



            card.className =
                "typeCard";



            card.innerHTML = `


                <div class="typeHeader">

                    <strong>${typ}</strong>

                    <strong>${prozent}%</strong>

                </div>



                <div class="typeBar">


                    <div

                        class="typeBarFill"

                        style="width:${prozent}%">

                    </div>


                </div>



                <p>

                    ${daten.gefahren}

                    von

                    ${daten.gesamt}

                    Fahrzeugen

                </p>


            `;



            container.appendChild(card);



        });



}