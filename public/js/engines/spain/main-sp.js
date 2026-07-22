import { appState } from '../../utils/state.js';
import { getEl, parseSafe } from '../../utils/helpers.js';

/**
 * Motor principal de cálculos para España.
 */

export function getSpainTaxScale(taxable) {
    if (taxable <= 12450) return taxable * 0.19;
    if (taxable <= 20200) return 2365.5 + (taxable - 12450) * 0.24;
    if (taxable <= 35200) return 4225.5 + (taxable - 20200) * 0.30;
    if (taxable <= 60000) return 8725.5 + (taxable - 35200) * 0.37;
    if (taxable <= 300000) return 17901.5 + (taxable - 60000) * 0.45;
    return 125901.5 + (taxable - 300000) * 0.47;
}

export function estimateSpainIRPF(gross, children, childDisCount, others, otherDisCount, other75Count, region, disability, isJoint, multipayer, totalSSAnnual, extraDeductions = 0, mobility = false) {
    // 1. Mínimo Personal y Familiar (MPF)
    let mpf = 5550;
    if (disability === '33') mpf += 3000;
    else if (disability === '65') mpf += 12000;

    let mHijos = 0;
    if (children >= 1) mHijos += 2400;
    if (children >= 2) mHijos += 2700;
    if (children >= 3) mHijos += 4000;
    if (children >= 4) mHijos += 4500;
    mpf += mHijos;
    if (childDisCount > 0) mpf += (Math.min(children, childDisCount) * 3000);

    if (others > 0) {
        mpf += (others * 1150);
        if (other75Count > 0) mpf += (Math.min(others, other75Count) * 1400);
        if (otherDisCount > 0) mpf += (Math.min(others, otherDisCount) * 3000);
    }
    if (isJoint) mpf += 3400;

    // 2. Reducción Rendimientos del Trabajo (DATOS REALES 2024-2026)
    let reduction = 0;
    if (gross < 14852) {
        reduction = 7302;
    } else if (gross <= 19747) {
        reduction = 7302 - (1.15 * (gross - 14852));
    }

    let minExempt = multipayer ? 12000 : 15876;
    if (gross < minExempt) return 0;

    // 3. Gastos Deducibles
    let fixedExpenses = 2000;
    if (mobility) fixedExpenses += 2000;
    const totalDeductions = totalSSAnnual + fixedExpenses + reduction + extraDeductions;

    // 4. Método Legal: Diferencia de Cuotas
    const baseLiquidable = Math.max(0, gross - totalDeductions);
    const cuota1 = getSpainTaxScale(baseLiquidable);
    const cuota2 = getSpainTaxScale(mpf);

    let totalTax = Math.max(0, cuota1 - cuota2);

    // 5. Ajustes Regionales
    if (region === 'madrid') totalTax *= 0.95;
    else if (region === 'catalunya') totalTax *= 1.01;
    else if (region === 'ceuta' || region === 'melilla') totalTax *= 0.50;

    return (totalTax / gross) * 100;
}

export function performSpainCalculations(annualGross, pagas) {
    if (pagas <= 0) pagas = 12;
    const children = parseInt(getEl('sp-pro-children')?.value) || 0;
    const childDis = getEl('sp-pro-child-dis')?.checked;
    const childDisCount = childDis ? (parseInt(getEl('sp-pro-child-dis-count')?.value) || 0) : 0;
    const others = parseInt(getEl('sp-pro-others')?.value) || 0;
    const otherDis = getEl('sp-pro-other-dis')?.checked;
    const otherDisCount = otherDis ? (parseInt(getEl('sp-pro-other-dis-count')?.value) || 0) : 0;
    const other75 = getEl('sp-pro-other-75')?.checked;
    const other75Count = other75 ? (parseInt(getEl('sp-pro-other-75-count')?.value) || 0) : 0;
    const region = getEl('sp-pro-region')?.value || "comun";
    const disability = appState.spToggles.disability;
    const multipayer = appState.spToggles.multipayer === 'yes';
    const isJoint = getEl('sp-pro-conjunta')?.checked;
    const isTemporal = appState.spToggles.contrato === 'temp';
    const workingMonths = isTemporal ? (parseInt(getEl('sp-pro-meses')?.value) || 12) : 12;
    const group = parseInt(getEl('sp-pro-grupo')?.value) || 7;
    const weeklyHours = parseSafe('sp-pro-jornada') || 40;
    const jornadaPerc = Math.min(1, weeklyHours / 40);

    const mobility = getEl('sp-pro-mobility')?.checked;
    const unionFees = parseSafe('sp-pro-union');

    const antiguedad = parseSafe('sp-pro-antiguedad');
    const contractBaseAnnual = annualGross + (antiguedad * pagas);
    const realAnnualFactor = workingMonths / 12;

    const mode = appState.mode;
    const suffix = mode === 'annual' ? 'ann' : mode === 'monthly' ? 'mon' : mode === 'hourly' ? 'hou' : 'inv';
    const otHours = parseSafe(`sp-pro-overtime-hours-${suffix}`);
    const otPrice = parseSafe(`sp-pro-overtime-price-${suffix}`);
    let otAmountMonthly = otHours * otPrice;
    appState.spToggles.dynamicOT.filter(o => o.suffix === suffix).forEach(o => {
        otAmountMonthly += o.amount;
    });
    const otAmountAnnual = otAmountMonthly * 12;

    let totalTaxableAnnual = contractBaseAnnual + otAmountAnnual;
    let ssTaxableAnnual = contractBaseAnnual;
    let especieAnnualSum = 0;
    let bonusCashAnnualSum = 0;
    let nonTaxableAnnualSum = 0;

    appState.spToggles.dynamicEspecie.forEach(e => {
        const annualAmt = e.amount * 12;
        especieAnnualSum += annualAmt;
        totalTaxableAnnual += annualAmt;
        ssTaxableAnnual += annualAmt;
    });

    appState.spToggles.dynamicBonus.forEach(b => {
        const annualAmt = b.amount * 12;
        if (b.exento) {
            nonTaxableAnnualSum += annualAmt;
        } else {
            if (b.irpf) totalTaxableAnnual += annualAmt;
            if (b.ss) {
                ssTaxableAnnual += annualAmt;
                bonusCashAnnualSum += annualAmt;
            }
        }
    });

    const rateCommon = (parseSafe('sp-rate-common') || 4.7) / 100;
    const rateUnemployment = (parseSafe('sp-rate-unemployment') || (isTemporal ? 1.60 : 1.55)) / 100;
    const rateFpMei = (parseSafe('sp-rate-fp-mei') || 0.25) / 100;

    const manualBaseCommon = parseSafe('sp-pro-base-common');
    const manualBaseAtEp = parseSafe('sp-pro-base-at-ep');

    const basesMinimas = { 1: 1950, 2: 1620, 3: 1410, 4: 1360, 5: 1360, 6: 1360, 7: 1360, 8: 1360, 9: 1360, 10: 1360, 11: 1360 };
    const minLegalMonthly = (basesMinimas[group] || 1360) * jornadaPerc;
    const MAX_SS_BASE_MONTHLY = 4950.00;

    const baseAuto = Math.max(minLegalMonthly, Math.min(ssTaxableAnnual / 12, MAX_SS_BASE_MONTHLY));
    const baseComunMensual = manualBaseCommon > 0 ? manualBaseCommon : baseAuto;
    const baseAtEpMensual = manualBaseAtEp > 0 ? manualBaseAtEp : baseAuto;

    const baseSSComunAnual = baseComunMensual * 12;
    const baseSSAtEpAnual = baseAtEpMensual * 12;

    const ssNormal = (baseSSComunAnual * rateCommon) + (baseSSAtEpAnual * rateUnemployment) + (baseSSAtEpAnual * rateFpMei);
    const ssOT = (otAmountAnnual * 0.047);
    const totalSS = ssNormal + ssOT;

    const manualVal = getEl('sp-irpf-manual')?.value.trim();
    let irpfPerc;
    const realProjectedGross = totalTaxableAnnual * realAnnualFactor;
    const ssDeducibleIRPF = totalSS * realAnnualFactor;

    if (appState.isPro && manualVal !== "") {
        irpfPerc = parseFloat(manualVal);
    } else {
        irpfPerc = estimateSpainIRPF(realProjectedGross, children, childDisCount, others, otherDisCount, other75Count, region, disability, isJoint, multipayer, ssDeducibleIRPF, unionFees, mobility);
    }

    const totalIRPF = totalTaxableAnnual * (irpfPerc / 100);
    let deductionsTotal = 0;
    appState.spToggles.dynamicDeductions.forEach(d => deductionsTotal += d.amount * 12);

    const netAnnual = (totalTaxableAnnual + nonTaxableAnnualSum) - totalSS - totalIRPF - deductionsTotal - especieAnnualSum;

    return {
        taxableAnnual: totalTaxableAnnual,
        totalSS,
        totalIRPF,
        irpfPerc,
        netAnnual,
        otAmountMonthly,
        workingMonths,
        cashMonthlyAdditions: bonusCashAnnualSum / 12,
        holidayPayMonthly: 0,
        extraTaxMonthly: deductionsTotal / 12,
        exemptIncomeMonthly: nonTaxableAnnualSum / 12,
        especieMonthly: especieAnnualSum / 12
    };
}
