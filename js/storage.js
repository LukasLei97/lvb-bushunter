// ===== LocalStorage =====

const KEY = "bushunter-gesammelt";

export function loadCollected() {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveCollected(collected) {
    localStorage.setItem(KEY, JSON.stringify(collected));
}