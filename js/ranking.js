// js/ranking.js

import { collection, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from "./firebase.js";

let unsubscribe = null;

export function initRanking() {

    const container = document.getElementById("rankingList");

    if (!container) return;

    if (unsubscribe) {
        unsubscribe();
    }

    const q = query(
        collection(db, "players"),
        orderBy("score", "desc")
    );

    unsubscribe = onSnapshot(q, (snapshot) => {

        container.innerHTML = "";

        if (snapshot.empty) {

            container.innerHTML = `
                <div class="rankingEmpty">
                    Noch keine Fahrer vorhanden.
                </div>
            `;

            return;
        }

        let platz = 1;

        snapshot.forEach((doc) => {

            const fahrer = doc.data();

            const card = document.createElement("div");
            card.className = "rankingCard";

            let medal = "";

            if (platz === 1) medal = "🥇";
            else if (platz === 2) medal = "🥈";
            else if (platz === 3) medal = "🥉";
            else medal = "#" + platz;

            const score = fahrer.score || 0;

            const updated =
                fahrer.updated && fahrer.updated.toDate
                    ? fahrer.updated.toDate().toLocaleString("de-DE")
                    : "-";

            card.innerHTML = `
                <div class="rankingPlace">${medal}</div>

                <div class="rankingPlayer">

                    <div class="playerName">
                        ${fahrer.player}
                    </div>

                    <div class="playerDate">
                        ${updated}
                    </div>

                </div>

                <div class="rankingScore">

                    🚍 ${score}

                </div>
            `;

            container.appendChild(card);

            platz++;

        });

    });

}