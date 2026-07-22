import { appState } from '../../utils/state.js';
import { getEl, parseSafe } from '../../utils/helpers.js';

/**
 * Motor principal de cálculos para el Reino Unido (UK).
 */

export function performUKCalculations(annual, periods = 12) {
    if (periods <= 0) periods = 12;
    const bik = parseSafe('uk-pro-bik') * 12;
    const pPerc = parseSafe('uk-pro-pension');
    const pType = appState.ukToggles['pension-type'] || 'before';

    // Overtime for UK
    const mode = appState.mode;
    const suffix = mode === 'annual' ? 'ann' : mode === 'monthly' ? 'mon' : mode === 'hourly' ? 'hou' : 'inv';
    const otHours = parseSafe(`uk-pro-overtime-hours-${suffix}`);
    const otPrice = parseSafe(`uk-pro-overtime-price-${suffix}`);

    let otAmountAnnual = mode === 'hourly' && appState.ukHourlyFreq === 'weekly' ? (otHours * otPrice) * 52 : (otHours * otPrice) * 12;
    const holidayProrated = getEl('uk-holiday-prorated')?.checked;
    const holidayPayAnnual = holidayProrated ? annual * 0.1207 : 0;

    let taxableBonusAnnual = otAmountAnnual;
    let nonTaxableBonusAnnual = 0;
    appState.ukToggles.dynamicBonus.forEach(b => {
        if (b.irpf) taxableBonusAnnual += b.amount * 12;
        else nonTaxableBonusAnnual += b.amount * 12;
    });

    const taxCodeSelect = getEl('uk-pro-taxcode-select')?.value;
    const taxCodeManual = getEl('uk-pro-taxcode-manual')?.value.toUpperCase() || "";
    const taxCode = taxCodeSelect === 'custom' ? taxCodeManual : taxCodeSelect;
    const niLetter = getEl('uk-pro-ni-letter')?.value || "A";

    const totalIncome = annual + holidayPayAnnual + taxableBonusAnnual;

    // 4. Pension Logic (Standard Auto-enrolment basis: £6,240 - £50,270)
    let pensionBase = Math.max(0, Math.min(totalIncome, 50270) - 6240);
    const pensionAnnual = pensionBase * (pPerc / 100);

    // 5. NI Calculation (2025/26 Rates)
    let ni = 0;
    let niRateMain = 0.08;
    let niRateHigher = 0.02;

    if (niLetter === "B") niRateMain = 0.0185;
    else if (niLetter === "C") niRateMain = 0;
    else if (niLetter === "J" || niLetter === "Z") { niRateMain = 0.02; niRateHigher = 0.02; }
    else if (niLetter === "M" || niLetter === "H") { niRateMain = 0; niRateHigher = 0.02; }

    if (totalIncome > 12570) {
        ni = (Math.min(totalIncome, 50270) - 12570) * niRateMain;
        if (totalIncome > 50270) ni += (totalIncome - 50270) * niRateHigher;
    }

    // Employer NI (2025/26: 15% above £5,000)
    let erNiRate = (niLetter === "M" || niLetter === "H" || niLetter === "V") ? 0 : 0.15;
    let employerNi = Math.max(0, (totalIncome - 5000) * erNiRate);

    // 6. Income Tax
    let allowance = 12570;
    if (getEl('uk-pro-marriage')?.checked) allowance += 1260;
    if (getEl('uk-pro-blind')?.checked) allowance += 3070;

    if (taxCode.startsWith('K')) {
        allowance = -parseInt(taxCode.replace(/\D/g, '') || 0) * 10;
    } else {
        const numOnly = taxCode.replace(/\D/g, '');
        if (numOnly !== "") allowance = parseInt(numOnly) * 10;
        else if (taxCode === "BR" || taxCode === "D0") allowance = 0;
        else if (taxCode === "NT") allowance = 999999;
    }
    if (totalIncome > 100000) allowance = Math.max(0, allowance - (totalIncome - 100000) / 2);

    let taxableAmount = Math.max(0, totalIncome + bik - allowance);
    if (pType === 'before') taxableAmount = Math.max(0, taxableAmount - pensionAnnual);

    let tax = 0;
    if (taxCode === "D0") tax = taxableAmount * 0.40;
    else if (taxCode === "D1") tax = taxableAmount * 0.45;
    else if (taxCode === "BR") tax = taxableAmount * 0.20;
    else {
        const regionSelect = getEl('uk-region-select')?.value || "rUK";
        const isScottish = (regionSelect === "SCO") || taxCode.startsWith('S');
        if (isScottish) {
            if (taxableAmount <= 2162) tax = taxableAmount * 0.19;
            else if (taxableAmount <= 13118) tax = 410.78 + (taxableAmount - 2162) * 0.20;
            else if (taxableAmount <= 31092) tax = 2601.98 + (taxableAmount - 13118) * 0.21;
            else if (taxableAmount <= 62430) tax = 6376.52 + (taxableAmount - 31092) * 0.42;
            else if (taxableAmount <= 125140) tax = 19538.48 + (taxableAmount - 62430) * 0.45;
            else tax = 47757.98 + (taxableAmount - 125140) * 0.48;
        } else {
            if (taxableAmount <= 37700) tax = taxableAmount * 0.20;
            else if (taxableAmount <= 125140) tax = 7540 + (taxableAmount - 37700) * 0.40;
            else tax = 42516 + (taxableAmount - 125140) * 0.45;
        }
    }

    // Student Loans
    let slBase = totalIncome;
    let studentLoan = 0;
    const slPlan = getEl('uk-pro-student-loan')?.value;
    if (slPlan === "plan1" && slBase > 24990) studentLoan += (slBase - 24990) * 0.09;
    else if (slPlan === "plan2" && slBase > 27295) studentLoan += (slBase - 27295) * 0.09;
    else if (slPlan === "plan4" && slBase > 31395) studentLoan += (slBase - 31395) * 0.09;
    else if (slPlan === "plan5" && slBase > 25000) studentLoan += (slBase - 25000) * 0.09;
    if (getEl('uk-pro-postgrad')?.checked && slBase > 21000) studentLoan += (slBase - 21000) * 0.06;

    let net = totalIncome + nonTaxableBonusAnnual - tax - ni - pensionAnnual - studentLoan;
    return { tax, ni, employerNi, pension: pensionAnnual, studentLoan, net, bonusTotalMonthly: (taxableBonusAnnual+nonTaxableBonusAnnual)/12, holidayPayMonthly: holidayPayAnnual / periods };
}
