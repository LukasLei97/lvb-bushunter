// ===== Suche =====

let searchText = "";

export function setSearch(text) {
    searchText = text.toLowerCase();
}

export function getSearch() {
    return searchText;
}