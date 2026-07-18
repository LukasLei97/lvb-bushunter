// ===== Fahrer =====

const STORAGE_KEY = "bushunter-player";

export function getPlayer() {
    return localStorage.getItem(STORAGE_KEY);
}

export function setPlayer(name) {
    localStorage.setItem(STORAGE_KEY, name);
}

export function hasPlayer() {
    return getPlayer() !== null;
}

export function askPlayer() {

    if (hasPlayer()) return getPlayer();

    const name = prompt(
        "Wie heißt du?\n\nBeispiel:\nLukas\nMarcel\nSven\nTobi"
    );

    if (!name) {
        return askPlayer();
    }

    setPlayer(name);

    return name;
}