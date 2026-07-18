// ===== Dashboard =====

export function updateDashboard(total, collected) {

    const percent =
        total === 0 ? 0 : Math.round((collected / total) * 100);

    document.getElementById("gesamt").textContent = total;
    document.getElementById("gefahren").textContent = collected;
    document.getElementById("offen").textContent = total - collected;

    document.getElementById("progress").style.width =
        percent + "%";

    document.getElementById("progressText").textContent =
        percent + "% abgeschlossen";
}