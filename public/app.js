/**
 * DIRECTOR DE ORQUESTA (Centralizador de Módulos)
 * V3 - ARRANQUE SINCRONIZADO Y ROBUSTO
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

// --- VINCULACIÓN GLOBAL DEFINITIVA ---
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
    getEl('results-loader')?.classList.add('hidden');
    getEl('results-content')?.classList.remove('hidden');
    const list = getEl('results-list');
    if (list) list.innerHTML = '';

    const lang = i18n[appState.language];
    const label = getEl('label-net-total');
    if (label) label.textContent = appState.mode === 'inverse' ? lang.bruto_result_label : lang.net_result_label;

    if (appState.country === 'spain') calculateSpain();
    else if (appState.country === 'uk') calculateUK();
};

// --- ARRANQUE SECUENCIAL SEGURO ---
async function startApp() {
    console.log("Iniciando secuencia de arranque...");

    // 1. Inicializar UI y Eventos
    initApp();
    setupEventListeners();
    setupHelperCalc();

    const floatingCalc = getEl('floating-calc');
    if (floatingCalc) setupDraggable(floatingCalc);

    // 2. Cargar textos e idioma (Esto llena los helpNotes)
    updateUITranslations();

    // 3. Establecer estado inicial
    setCountry('spain');
    updatePagasUI();

    // 4. Banners de bienvenida (Solo si es necesario)
    checkTC();
    checkConsent();

    // 5. Modo PRO para pruebas
    activatePro();

    console.log("¡Arranque completado con éxito!");
}

document.addEventListener('DOMContentLoaded', startApp);
