/**
 * DIRECTOR DE ORQUESTA (Centralizador de Módulos)
 * V5 - RECONEXIÓN DE TEXTOS Y DISEÑO UK
 */

import { appState } from './js/utils/state.js';
import { i18n } from './js/i18n/i18n.js';
import {
    getEl,
    validateForm,
    toggleHelp,
    updateEspecieVal,
    updateBonusVal,
    updateOTVal,
    updateDeductionVal,
    setSpainPagas,
    setSpainProrrateadas,
    setSpainToggle,
    setUKToggle,
    setUKPeriods,
    setHourlyType,
    syncUKHoliday,
    resetAllFields,
    toggleSeniority2012,
    toggleRatesConfig,
    toggleBasesConfig,
    addExtraItem,
    removeExtraItem,
    renderDynamicLists
} from './js/utils/helpers.js';

import {
    initApp,
    checkTC,
    checkConsent,
    setupEventListeners,
    setupHelperCalc,
    setupDraggable,
    setCountry,
    setMode,
    updateUITranslations,
    updatePagasUI,
    activatePro,
    syncAllTogglesUI
} from './js/ui/ui-manager.js';

// Motores de Cálculo
import { calculateSpain } from './js/engines/spain/modes-sp.js';
import { calculateUK } from './js/engines/uk/modes-uk.js';

import './firebase-config.js';

// --- CONEXIÓN GLOBAL (Para compatibilidad con index.html) ---
window.appState = appState;
window.getEl = getEl;
window.validateForm = validateForm;
window.toggleHelp = toggleHelp;
window.updateEspecieVal = updateEspecieVal;
window.updateBonusVal = updateBonusVal;
window.updateOTVal = updateOTVal;
window.updateDeductionVal = updateDeductionVal;
window.setSpainPagas = setSpainPagas;
window.setSpainProrrateadas = setSpainProrrateadas;
window.setSpainToggle = setSpainToggle;
window.setUKToggle = setUKToggle;
window.setUKPeriods = setUKPeriods;
window.setHourlyType = setHourlyType;
window.syncUKHoliday = syncUKHoliday;
window.resetAllFields = resetAllFields;
window.toggleSeniority2012 = toggleSeniority2012;
window.toggleRatesConfig = toggleRatesConfig;
window.toggleBasesConfig = toggleBasesConfig;
window.addExtraItem = addExtraItem;
window.removeExtraItem = removeExtraItem;
window.renderDynamicLists = renderDynamicLists;

window.setCountry = setCountry;
window.setMode = setMode;
window.updateUITranslations = updateUITranslations;
window.updatePagasUI = updatePagasUI;
window.activatePro = activatePro;
window.syncAllTogglesUI = syncAllTogglesUI;

window.processCalculation = function() {
    const list = getEl('results-list');
    if (list) list.innerHTML = '';

    getEl('results-loader')?.classList.add('hidden');
    getEl('results-content')?.classList.remove('hidden');

    const lang = i18n[appState.language];
    const label = getEl('label-net-total');
    if (label) label.textContent = appState.mode === 'inverse' ? lang.bruto_result_label : lang.net_result_label;

    if (appState.country === 'spain') calculateSpain();
    else if (appState.country === 'uk') calculateUK();
};

// --- ARRANQUE SEGURO ---
function startApp() {
    initApp();
    setupEventListeners();
    setupHelperCalc();

    const floatingCalc = getEl('floating-calc');
    if (floatingCalc) setupDraggable(floatingCalc);

    // Carga de textos (Asegura que los banners tengan contenido)
    updateUITranslations();

    // Estado inicial
    setCountry('spain');
    updatePagasUI();
    // activatePro(); // <--- Comentado para fase de pruebas de anuncios

    // Banners (Tras asegurar que hay texto)
    checkTC();
    checkConsent();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
} else {
    startApp();
}
