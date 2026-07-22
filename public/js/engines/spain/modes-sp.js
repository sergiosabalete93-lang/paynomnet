import { appState } from '../../utils/state.js';
import { i18n } from '../../i18n/i18n.js';
import { parseSafe, getEl } from '../../utils/helpers.js';
import { renderResult } from '../../ui/results-renderer.js';
import { performSpainCalculations } from './main-sp.js';
import { calculateSpainInverse } from './inverso-sp.js';
import { calculateSpainDismissal } from './despido-sp.js';

/**
 * Controlador principal de los modos de cálculo para España.
 */

export function calculateSpain() {
    const lang = i18n[appState.language];
    let annualContractBase = 0; // Sueldo base puro sin extras
    let pagas = appState.spToggles.pagas || 12;
    const prorrated = appState.spToggles.pagas_prorrateadas || 0;

    if (appState.mode === 'annual') {
        annualContractBase = parseSafe('sp-annual-gross');
    } else if (appState.mode === 'monthly') {
        let mGross = parseSafe('sp-monthly-gross');
        annualContractBase = mGross * pagas;
    } else if (appState.mode === 'hourly') {
        let price = parseSafe('sp-hourly-price');
        let hoursMonth = parseSafe('sp-hourly-hours');
        annualContractBase = (price * hoursMonth) * 12;
    } else if (appState.mode === 'inverse') {
        calculateSpainInverse(); return;
    } else if (appState.mode === 'dismissal') {
        calculateSpainDismissal(); return;
    }

    const res = performSpainCalculations(annualContractBase, pagas);

    // --- Lógica de Visualización de Mes Normal (Precisión Contable) ---
    const baseAntiguedad = parseSafe('sp-pro-antiguedad');
    const basePagaBruta = annualContractBase / pagas;
    const visibleMonthlyGross = (basePagaBruta + baseAntiguedad) + ((basePagaBruta + baseAntiguedad) * prorrated / 12) + (res.otAmountMonthly || 0) + (res.cashMonthlyAdditions || 0);

    const monthlySS = (res.totalSS || 0) / 12;
    // Sincronización IRPF: Se aplica el % sobre la suma de efectivo y especie (base imponible real)
    const visibleMonthlyIRPF = (visibleMonthlyGross + (res.especieMonthly || 0)) * (res.irpfPerc / 100);

    renderResult(lang.bruto + " " + lang.mensual, visibleMonthlyGross.toFixed(2) + "€");
    if (res.holidayPayMonthly > 0) renderResult(lang.holiday_res, res.holidayPayMonthly.toFixed(2) + "€");
    if (res.otAmountMonthly > 0) renderResult(lang.ot_res, res.otAmountMonthly.toFixed(2) + "€");

    // Seguridad Social
    renderResult(lang.ss, "-" + monthlySS.toFixed(2) + "€");

    // IRPF
    renderResult(lang.irpf + ` (${parseFloat(res.irpfPerc || 0).toFixed(2)}%)`, "-" + visibleMonthlyIRPF.toFixed(2) + "€");

    if (res.extraTaxMonthly > 0) renderResult(lang.other_deductions, "-" + res.extraTaxMonthly.toFixed(2) + "€");
    if (res.exemptIncomeMonthly > 0) renderResult(lang.labels.cotiza + " (Exento)", res.exemptIncomeMonthly.toFixed(2) + "€");

    // Neto Visible final: Se resta el IRPF sincronizado y la SS
    const visibleNet = visibleMonthlyGross - monthlySS - visibleMonthlyIRPF - (res.extraTaxMonthly || 0) + (res.exemptIncomeMonthly || 0);
    const resultElement = document.getElementById('net-result-value');
    if (resultElement) {
        resultElement.textContent = visibleNet.toFixed(2) + "€";
    }
}
