import { i18n } from '../i18n/i18n.js';
import { resetToDefaultMode } from '../utils/helpers.js';
import { appState } from '../utils/state.js';

/**
 * Función de seguridad para actualizar solo el texto de una etiqueta
 * sin borrar los elementos internos (como los iconos de ayuda).
 */
function safeLabelUpdate(id, newText) {
    const el = document.getElementById(id);
    if (!el) return;

    let textNodeFound = false;
    for (let node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
            node.textContent = newText + " ";
            textNodeFound = true;
            break;
        }
    }

    if (!textNodeFound) {
        el.prepend(document.createTextNode(newText + " "));
    }
}

export function applyTheme(isDark, save = true) {
    const getEl = (id) => document.getElementById(id);
    const meta = getEl('meta-theme-color');
    if (isDark) {
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
        if (meta) meta.setAttribute('content', '#121212');
    } else {
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
        if (meta) meta.setAttribute('content', '#0056b3');
    }

    const toggle = getEl('theme-toggle');
    if (toggle) toggle.checked = isDark;

    if (save) {
        localStorage.setItem('app_theme', isDark ? 'dark' : 'light');
    }
}

export function updateUITranslations() {
    try {
        const getEl = (id) => document.getElementById(id);
        const lang = i18n[appState.language];
        if (!lang) return;

        document.title = lang.page_title;
        getEl('title-en')?.classList.toggle('hidden', appState.language !== 'en');
        getEl('title-es')?.classList.toggle('hidden', appState.language !== 'es');

        // Modal y Banners
        if (getEl('tc-title')) getEl('tc-title').textContent = lang.tc_title;
        if (getEl('tc-text')) getEl('tc-text').innerHTML = lang.tc_text;
        if (getEl('btn-accept-tc')) getEl('btn-accept-tc').textContent = lang.btn_accept;

        if (getEl('consent-text-content')) getEl('consent-text-content').innerHTML = lang.consent_text;
        if (getEl('btn-accept-consent')) getEl('btn-accept-consent').textContent = lang.consent_btn_all;
        if (getEl('btn-reject-consent')) getEl('btn-reject-consent').textContent = lang.consent_btn_min;

        // General
        document.querySelectorAll('.legal-disclaimer').forEach(el => el.textContent = lang.disclaimer);
        if (getEl('menu-settings-label')) getEl('menu-settings-label').textContent = lang.settings;
        if (getEl('dark-mode-label')) getEl('dark-mode-label').textContent = lang.dark_mode;
        if (getEl('lang-label')) getEl('lang-label').textContent = lang.language;
        if (getEl('btn-become-pro')) getEl('btn-become-pro').textContent = lang.activate_pro;
        if (getEl('pro-active-title')) getEl('pro-active-title').textContent = lang.pro_active;
        if (getEl('btn-undo-pro')) getEl('btn-undo-pro').textContent = lang.logout_pro;
        if (getEl('auth-title')) getEl('auth-title').textContent = lang.auth_title;
        if (getEl('btn-login')) getEl('btn-login').textContent = lang.login;
        if (getEl('link-privacy')) getEl('link-privacy').textContent = lang.labels.privacidad;
        if (getEl('link-terms')) getEl('link-terms').textContent = lang.labels.terminos;
        if (getEl('auth-email')) getEl('auth-email').placeholder = lang.placeholders.email;

        // Selección País / Modo
        if (getEl('country-label')) getEl('country-label').textContent = lang.country_label;
        if (getEl('mode-label')) getEl('mode-label').textContent = lang.mode_label;
        if (getEl('btn-spain')) getEl('btn-spain').textContent = lang.spain;
        if (getEl('btn-uk')) getEl('btn-uk').textContent = lang.uk;
        if (getEl('mode-ann-text')) getEl('mode-ann-text').textContent = lang.anual;
        if (getEl('mode-mon-text')) getEl('mode-mon-text').textContent = lang.mensual;
        if (getEl('mode-hou-text')) getEl('mode-hou-text').textContent = lang.horas;
        if (getEl('mode-ir35-text')) getEl('mode-ir35-text').textContent = lang.ir35;
        if (getEl('mode-inv-text')) getEl('mode-inv-text').textContent = lang.inverse;
        if (getEl('mode-dis-text')) getEl('mode-dis-text').textContent = lang.despido;

        // España Labels
        safeLabelUpdate('sp-hijos-label', lang.labels.hijos);
        safeLabelUpdate('sp-otros-label', lang.labels.others);
        safeLabelUpdate('sp-tu-dis-label', lang.labels.tu_dis);
        safeLabelUpdate('sp-pagadores-label', lang.labels.pagadores);
        safeLabelUpdate('sp-conjunta-label', lang.labels.conjunta);
        safeLabelUpdate('sp-anual-bruto-label', lang.labels.bruto_anual);
        safeLabelUpdate('sp-pagas-tot-label', lang.labels.pagas_totales);
        safeLabelUpdate('sp-pagas-tot-label-mon', lang.labels.pagas_totales);
        safeLabelUpdate('sp-pagas-tot-label-hou', lang.labels.pagas_totales);
        safeLabelUpdate('sp-pagas-tot-label-inv', lang.labels.pagas_totales);
        safeLabelUpdate('sp-mobility-label', lang.labels.mobility);
        safeLabelUpdate('sp-union-label', lang.labels.union);
        safeLabelUpdate('sp-mensual-bruto-label', lang.labels.bruto_mensual);
        safeLabelUpdate('sp-hora-precio-label', lang.labels.precio_hora);
        safeLabelUpdate('sp-hora-horas-label', lang.labels.horas_mes);
        safeLabelUpdate('sp-inverso-neto-label', lang.labels.neto_obj);
        safeLabelUpdate('sp-despido-salario-label', lang.labels.despido_sal);
        safeLabelUpdate('sp-despido-anos-label', lang.labels.despido_anos);
        safeLabelUpdate('sp-antiguedad-label', lang.labels.antiguedad);
        safeLabelUpdate('sp-irpf-manual-label', lang.labels.irpf_manual);
        safeLabelUpdate('sp-horas-extra-label-ann', lang.labels.ot_hours);
        safeLabelUpdate('sp-precio-extra-label-ann', lang.labels.ot_price);
        safeLabelUpdate('sp-horas-extra-label-mon', lang.labels.ot_hours);
        safeLabelUpdate('sp-precio-extra-label-mon', lang.labels.ot_price);
        safeLabelUpdate('sp-horas-extra-label-hou', lang.labels.ot_hours);
        safeLabelUpdate('sp-precio-extra-label-hou', lang.labels.ot_price);
        safeLabelUpdate('sp-horas-extra-label-inv', lang.labels.ot_hours);
        safeLabelUpdate('sp-precio-extra-label-inv', lang.labels.ot_price);

        if (getEl('sp-pagas-pro-label')) getEl('sp-pagas-pro-label').textContent = lang.labels.pagas_prorrateadas;
        if (getEl('sp-pagas-pro-label-mon')) getEl('sp-pagas-pro-label-mon').textContent = lang.labels.pagas_prorrateadas;
        if (getEl('sp-pagas-pro-label-hou')) getEl('sp-pagas-pro-label-hou').textContent = lang.labels.pagas_prorrateadas;
        if (getEl('sp-pagas-pro-label-inv')) getEl('sp-pagas-pro-label-inv').textContent = lang.labels.pagas_prorrateadas;
        if (getEl('sp-pre2012-label')) getEl('sp-pre2012-label').textContent = appState.language === 'es' ? "¿Contrato anterior a Feb 2012?" : "Seniority before Feb 2012?";
        if (getEl('sp-advanced-label')) getEl('sp-advanced-label').textContent = lang.labels.adv_config;

        // UK Labels
        safeLabelUpdate('uk-anual-bruto-label', lang.labels.gross_annual);
        safeLabelUpdate('uk-pay-periods-label', lang.labels.pay_periods);
        safeLabelUpdate('uk-mensual-bruto-label', lang.labels.gross_monthly);
        safeLabelUpdate('uk-pay-periods-mon-label', lang.labels.pay_periods);
        safeLabelUpdate('uk-pay-periods-hou-label', lang.labels.pay_periods);
        safeLabelUpdate('uk-pay-periods-inv-label', lang.labels.pay_periods);
        safeLabelUpdate('uk-pay-periods-ir35-label', lang.labels.pay_periods);
        safeLabelUpdate('uk-ir35-type-label', lang.labels.ir35_type);
        safeLabelUpdate('uk-assignment-label', lang.labels.assign_rate);
        safeLabelUpdate('uk-inverso-neto-label', lang.labels.target_net);
        safeLabelUpdate('uk-despido-edad-label', lang.labels.current_age);
        safeLabelUpdate('uk-despido-anos-label', lang.labels.years_service);
        safeLabelUpdate('uk-despido-semana-label', lang.labels.weekly_pay);
        safeLabelUpdate('uk-marriage-label', lang.labels.marriage);
        safeLabelUpdate('uk-blind-label', lang.labels.blind);
        safeLabelUpdate('uk-cb-toggle-label', lang.labels.cb_toggle);
        safeLabelUpdate('uk-children-cb-label', lang.labels.children_count);
        safeLabelUpdate('uk-ni-cat-label', lang.labels.ni_cat);
        safeLabelUpdate('uk-tax-code-label', lang.labels.tax_code);
        safeLabelUpdate('uk-pension-label', lang.labels.pension_perc);
        safeLabelUpdate('uk-bik-label', lang.labels.benefits_bik);
        safeLabelUpdate('uk-bonus-list-label', lang.labels.extras);

        if (getEl('uk-horas-extra-label-ann')) safeLabelUpdate('uk-horas-extra-label-ann', lang.labels.ot_hours);
        if (getEl('uk-precio-extra-label-ann')) safeLabelUpdate('uk-precio-extra-label-ann', lang.labels.ot_rate);
        if (getEl('uk-horas-extra-label-mon')) safeLabelUpdate('uk-horas-extra-label-mon', lang.labels.ot_hours);
        if (getEl('uk-precio-extra-label-mon')) safeLabelUpdate('uk-precio-extra-label-mon', lang.labels.ot_rate);
        if (getEl('uk-horas-extra-label-hou')) safeLabelUpdate('uk-horas-extra-label-hou', lang.labels.ot_hours);
        if (getEl('uk-precio-extra-label-hou')) safeLabelUpdate('uk-precio-extra-label-hou', lang.labels.ot_rate);
        if (getEl('uk-horas-extra-label-inv')) safeLabelUpdate('uk-horas-extra-label-inv', lang.labels.ot_hours);
        if (getEl('uk-precio-extra-label-inv')) safeLabelUpdate('uk-precio-extra-label-inv', lang.labels.ot_rate);

        ['ann', 'mon', 'hou', 'inv', 'ir35'].forEach(s => {
            safeLabelUpdate(`uk-holiday-label-${s}`, lang.holiday_label);
        });

        if (getEl('uk-advanced-label')) getEl('uk-advanced-label').textContent = lang.labels.adv_config;
        if (getEl('uk-cb-desc-label')) getEl('uk-cb-desc-label').textContent = lang.labels.children_desc;
        if (getEl('btn-uk-pension-before')) getEl('btn-uk-pension-before').textContent = lang.options.net_pay;
        if (getEl('btn-uk-pension-source')) getEl('btn-uk-pension-source').textContent = lang.options.relief_source;

        // Placeholders
        if (getEl('sp-annual-gross')) getEl('sp-annual-gross').placeholder = lang.placeholders.sp_annual;
        if (getEl('sp-monthly-gross')) getEl('sp-monthly-gross').placeholder = lang.placeholders.sp_monthly;
        if (getEl('sp-hourly-price')) getEl('sp-hourly-price').placeholder = lang.placeholders.sp_hourly_price;
        if (getEl('sp-hourly-hours')) getEl('sp-hourly-hours').placeholder = lang.placeholders.sp_hourly_hours;
        if (getEl('sp-inverse-net')) getEl('sp-inverse-net').placeholder = lang.placeholders.sp_inverse;
        if (getEl('sp-dismissal-salary')) getEl('sp-dismissal-salary').placeholder = lang.placeholders.sp_dismissal_sal;
        if (getEl('sp-dismissal-years')) getEl('sp-dismissal-years').placeholder = lang.placeholders.sp_dismissal_years;
        if (getEl('sp-irpf-manual')) getEl('sp-irpf-manual').placeholder = lang.placeholders.manual_irpf;
        if (getEl('uk-annual-gross')) getEl('uk-annual-gross').placeholder = lang.placeholders.uk_annual;
        if (getEl('uk-monthly-gross')) getEl('uk-monthly-gross').placeholder = lang.placeholders.uk_monthly;
        if (getEl('uk-hourly-rate')) getEl('uk-hourly-rate').placeholder = lang.placeholders.uk_hourly_rate;
        if (getEl('uk-hourly-hours')) getEl('uk-hourly-hours').placeholder = lang.placeholders.uk_hourly_hours;
        if (getEl('uk-inverse-net')) getEl('uk-inverse-net').placeholder = lang.placeholders.uk_inverse;
        if (getEl('uk-ir35-rate')) getEl('uk-ir35-rate').placeholder = lang.placeholders.uk_ir35_rate;

        // Ayudas
        const helpNotes = {
            'h-children': lang.help.children, 'h-others': lang.help.others, 'h-disability': lang.help.disability,
            'h-multipayer': lang.help.multipayer, 'h-joint': lang.help.joint, 'h-pagas': lang.help.pagas,
            'h-contract': lang.help.contract, 'h-manual-irpf': lang.help.manual_irpf, 'h-custom-base': lang.help.custom_base,
            'h-extra-tax': lang.help.extra_tax, 'h-bonus': lang.help.bonus, 'h-antiguedad': lang.help.antiguedad,
            'h-ot-hours': lang.help.ot_hours, 'h-ot-price': lang.help.ot_price, 'h-grupo': lang.help['h-grupo'],
            'h-jornada': lang.help['h-jornada'], 'h-meses': lang.help['h-meses'], 'h-especie': lang.help['h-especie'],
            'h-exento': lang.help['h-exento'] || "", 'h-mobility': lang.help.mobility, 'h-union': lang.help.union,
            'h-uk-periods': lang.help.uk_periods, 'h-uk-bik': lang.help.uk_bik, 'h-uk-pension': lang.help.uk_pension,
            'h-uk-taxcode': lang.help.uk_taxcode, 'h-uk-ni-letter': lang.help.uk_ni_letter, 'h-uk-bonus': lang.help.uk_bonus,
            'h-uk-jobs': lang.help.uk_jobs, 'h-uk-inverse': lang.help.uk_inverse, 'h-uk-redundancy': lang.help.uk_redundancy,
            'h-uk-holiday': lang.help.uk_holiday, 'h-uk-ir35-type': lang.help.uk_ir35_type, 'h-uk-assign': lang.help.uk_assign,
            'h-uk-margin': lang.help.uk_margin, 'h-uk-expenses': lang.help.uk_expenses, 'h-uk-marriage': lang.help.uk_marriage,
            'h-uk-blind': lang.help.uk_blind, 'h-uk-child-benefit': lang.help.uk_child_benefit, 'h-mode-annual': lang.help.mode_annual,
            'h-mode-monthly': lang.help.mode_monthly, 'h-mode-hourly': lang.help.mode_hourly, 'h-mode-ir35': lang.help.mode_ir35,
            'h-mode-inverse': lang.help.mode_inverse, 'h-mode-dismissal': lang.help.mode_dismissal, 'h-uk-hourly-base': lang.help.uk_hourly_base
        };

        for (let id in helpNotes) {
            const el = getEl(id);
            if (el) el.textContent = helpNotes[id] || "";
        }
    } catch (e) {
        console.error("Error en updateUITranslations:", e);
    }
}

export function setCountry(c) {
    const getEl = (id) => document.getElementById(id);
    document.querySelectorAll('.help-note').forEach(n => n.classList.remove('visible'));

    appState.country = c;
    document.querySelectorAll('.btn-country').forEach(b => b.classList.remove('active'));
    const btn = getEl(`btn-${c}`);
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.country-module').forEach(m => m.classList.add('hidden'));
    const mod = getEl(`module-${c}`);
    if (mod) mod.classList.remove('hidden');

    const ir35Btn = getEl('btn-mode-ir35');
    if (ir35Btn) ir35Btn.classList.toggle('hidden', c === 'spain');

    syncAllTogglesUI(c === 'spain' ? 'sp' : 'uk');
    resetToDefaultMode();
    updateUITranslations();
}

export function syncAllTogglesUI(country) {
    const getEl = (id) => document.getElementById(id);
    if (country === 'sp') {
        const btnIndef = getEl('btn-cont-indef');
        if (btnIndef) {
            btnIndef.parentNode.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btnIndef.classList.add('active');
        }
        const btnDisNone = getEl('btn-dis-none');
        if (btnDisNone) {
            btnDisNone.parentNode.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btnDisNone.classList.add('active');
        }
        const payLabel = getEl('sp-pagadores-label');
        if (payLabel && payLabel.nextElementSibling) {
            const btns = payLabel.nextElementSibling.querySelectorAll('button');
            btns.forEach(b => b.classList.remove('active'));
            if (btns[0]) btns[0].classList.add('active');
        }
    } else {
        const groups = [
            'uk-ir35-type-label', 'uk-assignment-label', 'uk-jobs-label',
            'uk-pension-label', 'uk-pay-periods-label', 'uk-pay-periods-mon-label',
            'uk-pay-periods-hou-label', 'uk-pay-periods-inv-label', 'uk-pay-periods-ir35-label'
        ];
        groups.forEach(id => {
            const label = getEl(id);
            if (label && label.nextElementSibling) {
                label.nextElementSibling.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            }
        });
    }
}

export function setMode(m) {
    const getEl = (id) => document.getElementById(id);
    document.querySelectorAll('.help-note').forEach(n => n.classList.remove('visible'));

    appState.mode = m;
    document.querySelectorAll('.btn-mode').forEach(b => b.classList.remove('active'));
    const btn = getEl(`btn-mode-${m}`);
    if (btn) btn.classList.add('active');

    const currentModule = getEl(`module-${appState.country}`);
    if (currentModule) {
        currentModule.querySelectorAll('.calc-form').forEach(f => f.classList.add('hidden'));
        const targetForm = getEl(`${appState.country}-${m}`);
        if (targetForm) targetForm.classList.remove('hidden');
    }
}

export function updatePagasUI() {
    const getEl = (id) => document.getElementById(id);
    const modes = ['annual', 'monthly', 'hourly', 'inverse'];
    const total = appState.spToggles.pagas;
    const prorated = appState.spToggles.pagas_prorrateadas;

    modes.forEach(m => {
        const totalGroup = getEl(`sp-pagas-tot-${m}`);
        if (totalGroup) {
            totalGroup.querySelectorAll('button').forEach(b => {
                b.classList.toggle('active', parseInt(b.textContent) === total);
            });
        }

        const wrapper = getEl(`sp-prorrateo-wrapper-${m}`);
        if (wrapper) {
            wrapper.classList.toggle('hidden', total === 12);
            const list = getEl(`sp-pagas-pro-list-${m}`);
            if (list && total > 12) {
                list.innerHTML = '';
                const max = total - 12;
                for (let i = 0; i <= max; i++) {
                    const btn = document.createElement('button');
                    btn.className = `btn-toggle-sp ${prorated === i ? 'active' : ''}`;
                    btn.textContent = i;
                    btn.onclick = () => { if (window.setSpainProrrateadas) window.setSpainProrrateadas(i); };
                    list.appendChild(btn);
                }
            }
        }
    });
}

export function setupEventListeners() {
    const getEl = (id) => document.getElementById(id);

    getEl('btn-accept-tc')?.addEventListener('click', () => {
        localStorage.setItem('payroll_tc_accepted', 'true');
        getEl('welcome-modal').classList.add('hidden');
    });

    getEl('btn-settings')?.addEventListener('click', () => {
        getEl('settings-menu').classList.remove('hidden');
        setTimeout(() => getEl('settings-menu').classList.add('open'), 10);
    });
    getEl('btn-close-settings')?.addEventListener('click', () => {
        getEl('settings-menu').classList.remove('open');
        setTimeout(() => getEl('settings-menu').classList.add('hidden'), 300);
    });

    getEl('theme-toggle')?.addEventListener('change', (e) => applyTheme(e.target.checked, true));

    getEl('lang-select')?.addEventListener('change', (e) => {
        appState.language = e.target.value;
        localStorage.setItem('app_language', e.target.value);
        updateUITranslations();
    });

    getEl('btn-spain')?.addEventListener('click', () => setCountry('spain'));
    getEl('btn-uk')?.addEventListener('click', () => setCountry('uk'));

    getEl('btn-calc-helper')?.addEventListener('click', () => {
        getEl('floating-calc').classList.toggle('hidden');
    });
    getEl('btn-close-calc')?.addEventListener('click', () => getEl('floating-calc').classList.add('hidden'));

    document.querySelectorAll('.btn-mode').forEach(btn => {
        btn.addEventListener('click', () => setMode(btn.id.replace('btn-mode-', '')));
    });

    getEl('uk-pro-taxcode-select')?.addEventListener('change', (e) => {
        getEl('uk-pro-taxcode-manual')?.classList.toggle('hidden', e.target.value !== 'custom');
    });

    getEl('sp-holiday-prorated')?.addEventListener('change', (e) => appState.spToggles['holiday-prorated'] = e.target.checked);
    getEl('uk-holiday-prorated')?.addEventListener('change', (e) => appState.ukToggles['holiday-prorated'] = e.target.checked);

    const updateChildVisibility = (e) => {
        const val = parseInt(e.target.value) || 0;
        getEl('wrapper-sp-child-options')?.classList.toggle('hidden', val <= 0);
    };
    getEl('sp-pro-children')?.addEventListener('input', updateChildVisibility);

    getEl('sp-pro-child-dis')?.addEventListener('change', (e) => {
        getEl('wrapper-sp-child-dis-count')?.classList.toggle('hidden', !e.target.checked);
    });

    getEl('uk-pro-cb-toggle')?.addEventListener('change', (e) => {
        getEl('wrapper-uk-cb-count')?.classList.toggle('hidden', !e.target.checked);
    });

    getEl('btn-accept-consent')?.addEventListener('click', () => {
        localStorage.setItem('user_consent_accepted', 'all');
        getEl('consent-banner').classList.remove('visible');
    });

    getEl('btn-reject-consent')?.addEventListener('click', () => {
        localStorage.setItem('user_consent_accepted', 'essential');
        getEl('consent-banner').classList.remove('visible');
        window['ga-disable-G-031G1V1F9J'] = true;
    });

    // Login Admin
    getEl('btn-login')?.addEventListener('click', () => {
        const emailInput = getEl('auth-email');
        const PRO_MASTER_EMAIL = "paynomnet@gmail.com";
        if (emailInput && emailInput.value === PRO_MASTER_EMAIL) {
            activatePro("Acceso de Administrador");
        }
    });

    getEl('btn-calculate')?.addEventListener('click', () => {
        if (window.validateForm && !window.validateForm()) return;
        if ((appState.mode === 'inverse' || appState.mode === 'dismissal') && !appState.isPro) {
            alert(i18n[appState.language].pro_alert);
            return;
        }
        appState.adClickCount++;
        getEl('results-section')?.classList.remove('hidden');
        getEl('results-section')?.scrollIntoView({ behavior: 'smooth' });
        getEl('results-content')?.classList.add('hidden');
        getEl('results-loader')?.classList.remove('hidden');

        // Lógica de Anuncios
        const adBanner = getEl('ad-banner-bottom');
        if (adBanner && !appState.isPro) {
            adBanner.style.display = 'block';
        }

        const shouldShowInterstitial = (appState.adClickCount % 2 === 0) && !appState.isPro && appState.adClickCount > 0;

        if (shouldShowInterstitial && window.showInterstitialAd) {
            window.showInterstitialAd(() => {
                if (window.processCalculation) window.processCalculation();
            });
        } else {
            setTimeout(() => {
                if (window.processCalculation) window.processCalculation();
            }, 600);
        }
    });
}

export function checkTC() {
    const accepted = localStorage.getItem('payroll_tc_accepted');
    if (!accepted) document.getElementById('welcome-modal')?.classList.remove('hidden');
}

export function checkConsent() {
    const consented = localStorage.getItem('user_consent_accepted');
    if (!consented) {
        setTimeout(() => document.getElementById('consent-banner')?.classList.add('visible'), 1000);
    }
}

export function initApp() {
    const savedTheme = localStorage.getItem('app_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme ? savedTheme === 'dark' : systemPrefersDark, false);

    const savedLang = localStorage.getItem('app_language');
    if (savedLang) appState.language = savedLang;
    const langSelect = document.getElementById('lang-select');
    if (langSelect) langSelect.value = appState.language;

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').catch(err => console.warn("SW: Error", err));
    }
}

export function activatePro(msg) {
    appState.isPro = true;
    document.body.classList.add('is-pro');
    document.getElementById('pro-settings-container')?.classList.remove('hidden');
    document.getElementById('pro-upgrade-container')?.classList.add('hidden');
    document.getElementById('ad-banner-bottom')?.classList.add('hidden');
    if (msg) alert(msg);
}

// Función Puente para Android
window.setProStatus = function(isPremium) {
    if (isPremium) {
        activatePro("Suscripción PRO Activada");
    } else {
        appState.isPro = false;
        document.body.classList.remove('is-pro');
        location.reload();
    }
};

window.setCountry = setCountry;
window.setMode = setMode;
window.updateUITranslations = updateUITranslations;
window.activatePro = activatePro;
window.applyTheme = applyTheme;
window.updatePagasUI = updatePagasUI;
window.syncAllTogglesUI = syncAllTogglesUI;

export function setupDraggable(el) {
    if (!el) return;
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const handle = document.getElementById('calc-handle');
    if (!handle) return;
    handle.onmousedown = (e) => {
        e = e || window.event;
        pos3 = e.clientX; pos4 = e.clientY;
        document.onmouseup = () => { document.onmouseup = null; document.onmousemove = null; };
        document.onmousemove = (e) => {
            e = e || window.event;
            pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY;
            pos3 = e.clientX; pos4 = e.clientY;
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
            el.style.right = 'auto';
        };
    };
}

export function setupHelperCalc() {
    let calcDisplay = '0';
    let calcAccumulator = 0;
    let calcPendingOp = null;
    let calcNextReset = false;
    const display = document.getElementById('calc-display');
    const history = document.getElementById('calc-history');

    document.querySelectorAll('.btn-calc-num').forEach(btn => {
        btn.addEventListener('click', () => {
            if (calcNextReset) { calcDisplay = ''; calcNextReset = false; }
            if (btn.textContent === '.' && calcDisplay.includes('.')) return;
            calcDisplay = (calcDisplay === '0' && btn.textContent !== '.') ? btn.textContent : calcDisplay + btn.textContent;
            if (display) display.textContent = calcDisplay;
        });
    });

    document.querySelectorAll('.btn-calc-op').forEach(btn => {
        btn.addEventListener('click', () => {
            const op = btn.getAttribute('data-val');
            const current = parseFloat(calcDisplay);
            if (op === 'C') {
                calcDisplay = '0'; calcAccumulator = 0; calcPendingOp = null;
                if (history) history.textContent = '';
            } else if (op === 'back') {
                calcDisplay = calcDisplay.length > 1 ? calcDisplay.slice(0, -1) : '0';
            } else if (op === '=') {
                if (calcPendingOp) {
                    calcAccumulator = (calcPendingOp === '+') ? calcAccumulator + current : (calcPendingOp === '-') ? calcAccumulator - current : (calcPendingOp === '*') ? calcAccumulator * current : (current !== 0 ? calcAccumulator / current : 0);
                    calcDisplay = calcAccumulator.toString(); calcPendingOp = null; calcNextReset = true;
                    if (history) history.textContent = '';
                }
            } else {
                calcAccumulator = calcPendingOp ? ((calcPendingOp === '+') ? calcAccumulator + current : (calcPendingOp === '-') ? calcAccumulator - current : (calcPendingOp === '*') ? calcAccumulator * current : (current !== 0 ? calcAccumulator / current : 0)) : current;
                calcPendingOp = op; calcNextReset = true;
                if (history) history.textContent = calcAccumulator + ' ' + op;
            }
            if (display) display.textContent = calcDisplay;
        });
    });
}
