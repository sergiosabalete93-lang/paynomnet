/**
 * Módulo que gestiona el estado global de la aplicación.
 */
export const appState = {
    language: 'es',
    country: null,
    mode: null,
    isPro: true,
    adClickCount: 0,
    interstitialId: 'ca-app-pub-3940256099942544/1033173712',
    spToggles: {
        disability: null,
        multipayer: 'no',
        pagas: 0,
        pagas_prorrateadas: 0,
        contrato: null,
        'holiday-prorated': false,
        dynamicBonus: [],
        dynamicEspecie: [],
        dynamicOT: [],
        dynamicDeductions: []
    },
    ukToggles: {
        'hourly-monthly-base': 'full',
        'pension-type': 'before',
        dynamicBonus: [],
        'jobs': '1',
        'holiday-prorated': false,
        'ir35-type': null,
        'ir35-freq': null
    },
    ukPeriods: {
        annual: 0,
        monthly: 0
    },
    ukHourlyFreq: null
};

// Exportar al objeto window para compatibilidad con scripts legacy
window.appState = appState;
