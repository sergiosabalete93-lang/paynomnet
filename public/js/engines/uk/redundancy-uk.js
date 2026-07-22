import { parseSafe } from '../../utils/helpers.js';

/**
 * Controlador para el modo Redundancy (Despido) en UK.
 */

export function calculateUKRedundancy() {
    const a = parseSafe('uk-redundancy-age');
    const y = parseSafe('uk-redundancy-years');
    const w = Math.min(parseSafe('uk-redundancy-weekly'), 725);
    let total = 0;
    for (let i = 0; i < Math.min(y, 20); i++) {
        let age = a - i;
        total += (age >= 41 ? w * 1.5 : (age >= 22 ? w : w * 0.5));
    }

    const resultElement = document.getElementById('net-result-value');
    if (resultElement) {
        resultElement.textContent = total.toFixed(2) + "£";
    }
}
