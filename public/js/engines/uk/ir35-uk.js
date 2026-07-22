import { i18n } from '../../i18n/i18n.js';
import { appState } from '../../utils/state.js';
import { parseSafe } from '../../utils/helpers.js';
import { renderResult } from '../../ui/results-renderer.js';
import { performUKCalculations } from './main-uk.js';

/**
 * Controlador para el modo IR35 (Inside/Outside) en UK.
 */

export function calculateUKIR35() {
    const lang = i18n[appState.language];
    const type = appState.ukToggles['ir35-type'] || 'inside';
    const rate = parseSafe('uk-ir35-rate');
    const freq = appState.ukToggles['ir35-freq'] || 'daily';
    const periods = appState.ukPeriods.ir35 || 12;

    let annualRevenue = freq === 'daily' ? rate * 260 : rate * 37.5 * 52;

    if (type === 'inside') {
        const margin = parseSafe('uk-umbrella-margin') || 25;
        const annualMargin = margin * 52;
        let available = annualRevenue - annualMargin;

        const grossSalary = Math.max(0, (available + 937.2) / 1.185);

        const res = performUKCalculations(grossSalary, periods);
        renderResult("Assignment Revenue", annualRevenue.toFixed(2) + "£");
        renderResult(lang.labels.umbrella_margin, annualMargin.toFixed(2) + "£");
        renderResult(lang.bruto_result_label, grossSalary.toFixed(2) + "£");

        const resultElement = document.getElementById('net-result-value');
        if (resultElement) {
            resultElement.textContent = (res.net / periods).toFixed(2) + "£";
        }
    } else {
        const expenses = parseSafe('uk-business-expenses');
        const annualExpenses = expenses * 12;
        const profit = annualRevenue - annualExpenses;
        const corpTax = profit * 0.20;
        const availableForDividends = profit - corpTax;
        const salary = 12570;
        const dividends = Math.max(0, availableForDividends - salary);
        const divTax = Math.max(0, dividends - 500) * 0.0875;
        const netAnnual = salary + dividends - divTax;

        renderResult("Revenue", annualRevenue.toFixed(2) + "£");
        renderResult(lang.labels.expenses, annualExpenses.toFixed(2) + "£");
        renderResult("Corporation Tax", "-" + corpTax.toFixed(2) + "£");
        renderResult("Dividends (Net)", dividends.toFixed(2) + "£");

        const resultElement = document.getElementById('net-result-value');
        if (resultElement) {
            resultElement.textContent = (netAnnual / 12).toFixed(2) + "£";
        }
    }
}
