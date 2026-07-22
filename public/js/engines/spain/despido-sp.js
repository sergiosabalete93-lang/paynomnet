import { appState } from '../../utils/state.js';
import { i18n } from '../../i18n/i18n.js';
import { parseSafe, getEl } from '../../utils/helpers.js';
import { renderResult } from '../../ui/results-renderer.js';

/**
 * Controlador para el modo Despido / Indemnización en España.
 */

export function calculateSpainDismissal() {
    const lang = i18n[appState.language];
    const salary = parseSafe('sp-dismissal-salary');
    const years = parseSafe('sp-dismissal-years');
    const type = getEl('sp-dismissal-type').value;
    const isPre2012 = getEl('sp-pro-pre2012')?.checked;

    const annual = salary < 5000 ? salary * 12 : salary;
    const daily = annual / 365;

    let days = type === 'unfair' ? 33 : 20;
    let capMonths = type === 'unfair' ? 24 : 12;

    if (type === 'unfair' && isPre2012) {
        days = 45;
        capMonths = 42;
    }

    let total = Math.min(daily * days * years, (annual / 12) * capMonths);
    renderResult(lang.salary_daily, daily.toFixed(2) + "€");
    renderResult(lang.days_year, days);

    const resultElement = document.getElementById('net-result-value');
    if (resultElement) {
        resultElement.textContent = total.toFixed(2) + "€";
    }
}
