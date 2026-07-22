/**
 * DIRECTOR DE ORQUESTA (Centralizador de Módulos)
 * Este archivo conecta todas las piezas de la aplicación.
 */

import { appState } from './js/utils/state.js';
import { i18n } from './js/i18n/i18n.js';
import { getEl, validateForm } from './js/utils/helpers.js';
import {
    initApp,
    checkTC,
    checkConsent,
    setupEventListeners,
    setupHelperCalc,
    setupDraggable,
    setCountry,
    updateUITranslations,
    updatePagasUI,
    activatePro
} from './js/ui/ui-manager.js';

// Motores de Cálculo
import { calculateSpain } from './js/engines/spain/modes-sp.js';
import { calculateUK } from './js/engines/uk/modes-uk.js';

// Importación de configuración externa
import './firebase-config.js';

// --- Vinculación de Funciones al Ámbito Global ---
window.validateForm = validateForm;

window.processCalculation = function() {
    getEl('results-loader')?.classList.add('hidden');
    getEl('results-content')?.classList.remove('hidden');
    const list = getEl('results-list');
    if (list) list.innerHTML = '';

    const lang = i18n[appState.language];
    const label = getEl('label-net-total');
    if (label) {
        label.textContent = appState.mode === 'inverse' ? lang.bruto_result_label : lang.net_result_label;
    }

    if (appState.country === 'spain') calculateSpain();
    else if (appState.country === 'uk') calculateUK();
};

// --- Inicialización de la Aplicación ---
document.addEventListener('DOMContentLoaded', () => {
    checkTC();
    checkConsent();
    initApp();
    setupEventListeners();

    // Inicialización de componentes UI
    setupHelperCalc();
    setupDraggable(getEl('floating-calc'));

    // Configuración inicial por defecto
    setCountry('spain');
    updateUITranslations();
    updatePagasUI();

    // Activar modo PRO automáticamente (Fase de Pruebas)
    activatePro();
});
