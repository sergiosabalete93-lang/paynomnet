import { i18n } from '../../i18n/i18n.js';
import { appState } from '../../utils/state.js';
import { parseSafe } from '../../utils/helpers.js';
import { renderResult } from '../../ui/results-renderer.js';
import { performUKCalculations } from './main-uk.js';
import { calculateUKIR35 } from './ir35-uk.js';
import { calculateUKInverse } from './inverso-uk.js';
import { calculateUKRedundancy } from './redundancy-uk.js';

/**
 * Controlador principal de los modos de cálculo para el Reino Unido (UK).
 */

export function calculateUK() {
    const lang = i18n[appState.language];
    let annualGross = 0;
    let periods = 12;

    if (appState.mode === 'annual') {
        annualGross = parseSafe('uk-annual-gross');
        periods = appState.ukPeriods.annual || 12;
    } else if (appState.mode === 'monthly') {
        let mGross = parseSafe('uk-monthly-gross');
        periods = appState.ukPeriods.monthly || 12;
        annualGross = mGross * periods;
    } else if (appState.mode === 'hourly') {
        const rate = parseSafe('uk-hourly-rate');
        const hours = parseSafe('uk-hourly-hours');

        if (appState.ukHourlyFreq === 'weekly') {
            annualGross = (rate * hours) * 52;
            periods = 52;
        } else {
            periods = appState.ukPeriods.hourly || 12;
            annualGross = (rate * hours) * periods;
        }
    } else if (appState.mode === 'ir35') {
        calculateUKIR35(); return;
    } else if (appState.mode === 'inverse') {
        calculateUKInverse(); return;
    } else if (appState.mode === 'dismissal') {
        calculateUKRedundancy(); return;
    }

    const res = performUKCalculations(annualGross, periods);
    const freqLabel = periods > 51 ? lang.semanal : lang.mensual;

    renderResult(lang.bruto + " " + freqLabel, (annualGross / periods).toFixed(2) + "£");
    if ((res.holidayPayMonthly || 0) > 0) renderResult(lang.holiday_res, res.holidayPayMonthly.toFixed(2) + "£");

    // Dynamic Bonus Display for UK
    if ((res.bonusTotalMonthly || 0) > 0) {
        renderResult(lang.extras, res.bonusTotalMonthly.toFixed(2) + "£");
    }

    if ((res.pension || 0) > 0) renderResult(lang.pension, "-" + (res.pension / periods).toFixed(2) + "£");
    renderResult(lang.irpf, "-" + ((res.tax || 0) / periods).toFixed(2) + "£");
    renderResult(lang.ss + " (NI)", "-" + ((res.ni || 0) / periods).toFixed(2) + "£");
    if ((res.cbCharge || 0) > 0) renderResult(lang.labels.child_benefit, "-" + (res.cbCharge / periods).toFixed(2) + "£");

    if ((res.studentLoan || 0) > 0) renderResult(lang.student_loan_res, "-" + (res.studentLoan / periods).toFixed(2) + "£");

    if ((res.employerNi || 0) > 0) {
        renderResult(lang.emp_ni, (res.employerNi / periods).toFixed(2) + "£");
    }

    const resultElement = document.getElementById('net-result-value');
    if (resultElement) {
        resultElement.textContent = ((res.net || 0) / periods).toFixed(2) + "£";
    }
}
