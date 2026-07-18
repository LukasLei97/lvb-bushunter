// js/storage.js

import { savePlayerData, loadPlayerData } from "./firebase.js";

const PLAYER_KEY = "bushunter-player";
const BUSES_KEY = "bushunter-buses";

// ==============================
// Spieler
// ==============================

export function savePlayer(name) {
    localStorage.setItem(PLAYER_KEY, name);
}

export function loadPlayer() {
    return localStorage.getItem(PLAYER_KEY);
}

export function removePlayer() {
    localStorage.removeItem(PLAYER_KEY);
}

// ==============================
// Fahrzeuge lokal
// ==============================

export function saveLocal(collected) {
    localStorage.setItem(BUSES_KEY, JSON.stringify(collected));
}

export function loadLocal() {

    const data = localStorage.getItem(BUSES_KEY);

    if (!data) {
        return [];
    }

    try {
        return JSON.parse(data);
    } catch (err) {
        console.error("Fehler beim Laden der lokalen Daten:", err);
        return [];
    }

}

export function clearLocal() {
    localStorage.removeItem(BUSES_KEY);
}

// ==============================
// Fahrzeuge online
// ==============================

export async function saveOnline(player, collected) {

    saveLocal(collected);

    try {

        await savePlayerData(player, collected);

    } catch (err) {

        console.error("Firebase:", err);

    }

}

// ==============================
// Fahrzeuge laden
// ==============================

export async function loadCollected(player) {

    try {

        const online = await loadPlayerData(player);

        if (Array.isArray(online) && online.length > 0) {

            saveLocal(online);

            return online;

        }

    } catch (err) {

        console.warn("Offline-Modus aktiv");

    }

    return loadLocal();

}