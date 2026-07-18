// js/ranking.js

import { watchRanking } from "./firebase.js";

let unsubscribe = null;

export function initRanking() {

    const container = document.getElementById("rankingList");

    if (!container) return;

    if (unsubscribe) {
        unsubscribe();
    }

    unsubscribe = watchRanking((players) => {

        container.innerHTML = "";

        if (players.length === 0) {

            container.innerHTML = `
                <p>Noch keine Spieler vorhanden.</p>
            `;

            return;

        }

        players.forEach((player, index) => {

            const card = document.createElement("div");
            card.className = "rankingCard";

            let medal = `#${index + 1}`;

            if (index === 0) medal = "🥇";
            if (index === 1) medal = "🥈";
            if (index === 2) medal = "🥉";

            const updated =
                player.updated?.toDate
                    ? player.updated.toDate().toLocaleString("de-DE")
                    : "-";

            card.innerHTML = `
                <div class="rankingPlace">${medal}</div>

                <div class="rankingPlayer">
                    <div class="playerName">${player.player}</div>
                    <div class="playerDate">${updated}</div>
                </div>

                <div class="rankingScore">
                    🚌 ${player.score}
                </div>
            `;

            container.appendChild(card);

        });

    });

}