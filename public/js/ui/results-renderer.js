/**
 * Módulo encargado de renderizar los resultados en la interfaz.
 */
export function renderResult(label, value) {
    const list = document.getElementById('results-list');
    if (!list) return;

    const div = document.createElement('div');
    div.className = 'result-item';
    div.innerHTML = `<span>${label}:</span> <span class="result-value">${value}</span>`;
    list.appendChild(div);
}

export function clearResults() {
    const list = document.getElementById('results-list');
    if (list) list.innerHTML = '';
}
