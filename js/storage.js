// js/storage.js

import { savePlayerData, loadPlayerData } from "./firebase.js";

const KEY = "bushunter-player";
const BUSES = "bushunter-buses";

/*
----------------------------------
Spieler speichern
----------------------------------
*/

export function savePlayer(name) {
    localStorage.setItem(KEY, name);
}

export function loadPlayer() {
    return localStorage.getItem(KEY);
}

/*
----------------------------------
Busse lokal speichern
----------------------------------
*/

export function saveLocal(collected) {
    localStorage.setItem(BUSES, JSON.stringify(collected));
}

export function loadLocal() {
    return JSON.parse(localStorage.getItem(BUSES)) || [];
}

/*
----------------------------------
Busse online speichern
----------------------------------
*/

export async function saveOnline(player, collected) {

    saveLocal(collected);

    try {

        await savePlayerData(player, collected);

    } catch (err) {

        console.error("Firebase:", err);

    }

}

/*
----------------------------------
Busse laden
----------------------------------
*/

export async function loadCollected(player) {

    try {

        const online = await loadPlayerData(player);

        if (online.length > 0) {

            saveLocal(online);

            return online;

        }

    } catch (err) {

        console.log("Offline-Modus");

    }

    return loadLocal();

}