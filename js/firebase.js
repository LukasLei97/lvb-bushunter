// js/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCqKYTXx05RjREQ6iykqFK7PO1kl4DQ8Xw",
    authDomain: "bushunter-7f727.firebaseapp.com",
    projectId: "bushunter-7f727",
    storageBucket: "bushunter-7f727.firebasestorage.app",
    messagingSenderId: "1051031271932",
    appId: "1:1051031271932:web:8d739bb3a54043f61b9a79"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

/*
-----------------------------------
Spieler speichern
-----------------------------------
*/

export async function savePlayerData(playerName, collected) {

    const ref = doc(db, "players", playerName);

    await setDoc(ref, {

        player: playerName,

        buses: collected,

        score: collected.length,

        updated: serverTimestamp()

    });

}

/*
-----------------------------------
Spieler laden
-----------------------------------
*/

export async function loadPlayerData(playerName) {

    const ref = doc(db, "players", playerName);

    const snap = await getDoc(ref);

    if (!snap.exists()) {

        return [];

    }

    const data = snap.data();

    return data.buses || [];

}

/*
-----------------------------------
Live-Updates
-----------------------------------
*/

export function watchPlayer(playerName, callback) {

    const ref = doc(db, "players", playerName);

    return onSnapshot(ref, (snap) => {

        if (!snap.exists()) {

            callback([]);

            return;

        }

        callback(snap.data().buses || []);

    });

}
import {
    collection,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/*
-----------------------------------
Live-Rangliste
-----------------------------------
*/

export function watchRanking(callback) {

    const q = query(
        collection(db, "players"),
        orderBy("score", "desc")
    );

    return onSnapshot(q, (snapshot) => {

        const ranking = [];

        snapshot.forEach((doc) => {

            ranking.push(doc.data());

        });

        callback(ranking);

    });

}export async function resetAllPlayers() {

    const spieler = [
        "Lukas",
        "Tim",
        "John",
        "Victoria",
        "Florian"
    ];

    for (const name of spieler) {

        await savePlayerData(name, []);

    }

}