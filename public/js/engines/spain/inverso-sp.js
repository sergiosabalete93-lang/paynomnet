import { appState } from '../../utils/state.js';
import { i18n } from '../../i18n/i18n.js';
import { parseSafe } from '../../utils/helpers.js';
import { renderResult } from '../../ui/results-renderer.js';
import { performSpainCalculations } from './main-sp.js';

/**
 * Controlador para el modo Inverso (Neto a Bruto) en España.
 */

export function calculateSpainInverse() {
    const lang = i18n[appState.language];
    const target = parseSafe('sp-inverse-net');
    const pagas = appState.spToggles.pagas || 12;
    const prorrated = appState.spToggles.pagas_prorrateadas || 0;

    const targetAnnualNet = target / ((1 / pagas) * (1 + (prorrated / 12)));

    // Búsqueda binaria para encontrar el sueldo bruto
    let low = targetAnnualNet, high = targetAnnualNet * 4, gross = low;
    for(let i=0; i<40; i++) {
        gross = (low + high) / 2;
        let res = performSpainCalculations(gross, pagas);
        if (res.netAnnual < targetAnnualNet) low = gross; else high = gross;
    }

    renderResult(lang.bruto_est + " " + lang.anual, gross.toFixed(2) + "€");
    const resultElement = document.getElementById('net-result-value');
    if (resultElement) {
        resultElement.textContent = (gross / pagas).toFixed(2) + "€";
    }
}
