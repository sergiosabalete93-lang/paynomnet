import { i18n } from '../../i18n/i18n.js';
import { appState } from '../../utils/state.js';
import { parseSafe } from '../../utils/helpers.js';
import { renderResult } from '../../ui/results-renderer.js';
import { performUKCalculations } from './main-uk.js';

/**
 * Controlador para el modo Inverso (Neto a Bruto) en UK.
 */

export function calculateUKInverse() {
    const lang = i18n[appState.language];
    const target = parseSafe('uk-inverse-net');
    const periods = appState.ukPeriods.inverse || 12;

    let low = target * periods, high = target * periods * 4, gross = low;
    for(let i=0; i<40; i++) {
        gross = (low + high) / 2;
        let res = performUKCalculations(gross, periods);
        if (res.net / periods < target) low = gross; else high = gross;
    }
    renderResult(lang.bruto_est + " " + lang.anual, gross.toFixed(2) + "£");

    const resultElement = document.getElementById('net-result-value');
    if (resultElement) {
        resultElement.textContent = (gross / periods).toFixed(2) + "£";
    }
}
