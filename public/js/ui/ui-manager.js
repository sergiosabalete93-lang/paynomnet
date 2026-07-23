import { i18n } from '../i18n/i18n.js';
import { resetToDefaultMode } from '../utils/helpers.js';
import { appState } from '../utils/state.js';

export function applyTheme(isDark, save = true) {
    const getEl = (id) => document.getElementById(id);
    if (!getEl('meta-theme-color')) return;

    if (isDark) {
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
        getEl('meta-theme-color').setAttribute('content', '#121212');
    } else {
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
        getEl('meta-theme-color').setAttribute('content', '#0056b3');
    }

    const toggle = getEl('theme-toggle');
    if (toggle) toggle.checked = isDark;

    if (save) {
        localStorage.setItem('app_theme', isDark ? 'dark' : 'light');
    }
}

export function updateUITranslations() {
    const getEl = (id) => document.getElementById(id);
    const lang = i18n[appState.language];
    if (!lang) return;

    document.title = lang.page_title;
    getEl('title-en')?.classList.toggle('hidden', appState.language !== 'en');
    getEl('title-es')?.classList.toggle('hidden', appState.language !== 'es');

    // Modal
    if (getEl('tc-title')) getEl('tc-title').textContent = lang.tc_title;
    if (getEl('tc-text')) getEl('tc-text').innerHTML = lang.tc_text;
    if (getEl('btn-accept-tc')) getEl('btn-accept-tc').textContent = lang.btn_accept;

    // Disclaimer
    document.querySelectorAll('.legal-disclaimer').forEach(el => el.textContent = lang.disclaimer);

    // Labels del menú
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

    // Sección País / Modo
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

    // España labels
    if (getEl('sp-hijos-label')) getEl('sp-hijos-label').firstChild.textContent = lang.labels.hijos + " ";
    if (getEl('sp-hijo-dis-label')) getEl('sp-hijo-dis-label').textContent = lang.labels.hijo_dis;
    if (getEl('sp-otros-label')) getEl('sp-otros-label').firstChild.textContent = lang.labels.others + " ";
    if (getEl('sp-otro-dis-label')) getEl('sp-otro-dis-label').textContent = lang.labels.otro_dis;
    if (getEl('sp-otro-75-label')) getEl('sp-otro-75-label').textContent = lang.labels.otro_75;
    if (getEl('sp-otro-dis-count-label')) getEl('sp-otro-dis-count-label').textContent = lang.labels.otro_dis_count;
    if (getEl('sp-otro-75-count-label')) getEl('sp-otro-75-count-label').textContent = lang.labels.otro_75_count;
    if (getEl('sp-tu-dis-label')) getEl('sp-tu-dis-label').firstChild.textContent = lang.labels.tu_dis + " ";
    if (getEl('btn-dis-none')) getEl('btn-dis-none').textContent = appState.language === 'es' ? 'No' : 'None';
    if (getEl('sp-comunidad-label')) getEl('sp-comunidad-label').textContent = lang.labels.comunidad;
    if (getEl('opt-sp-comun')) getEl('opt-sp-comun').textContent = lang.options.common;
    if (getEl('sp-pagadores-label')) getEl('sp-pagadores-label').firstChild.textContent = lang.labels.pagadores + " ";
    if (getEl('sp-conjunta-label')) getEl('sp-conjunta-label').firstChild.textContent = lang.labels.conjunta + " ";
    if (getEl('sp-anual-bruto-label')) getEl('sp-anual-bruto-label').firstChild.textContent = lang.labels.bruto_anual + " ";
    if (getEl('sp-pagas-tot-label')) getEl('sp-pagas-tot-label').firstChild.textContent = lang.labels.pagas_totales + " ";
    if (getEl('sp-pagas-pro-label')) getEl('sp-pagas-pro-label').textContent = lang.labels.pagas_prorrateadas;
    if (getEl('sp-pagas-tot-label-mon')) getEl('sp-pagas-tot-label-mon').firstChild.textContent = lang.labels.pagas_totales + " ";
    if (getEl('sp-mobility-label')) getEl('sp-mobility-label').firstChild.textContent = lang.labels.mobility + " ";
    if (getEl('sp-union-label')) getEl('sp-union-label').firstChild.textContent = lang.labels.union + " ";
    if (getEl('sp-pre2012-label')) getEl('sp-pre2012-label').textContent = appState.language === 'es' ? "¿Contrato anterior a Feb 2012?" : "Seniority before Feb 2012?";
    if (getEl('sp-pagas-pro-label-mon')) getEl('sp-pagas-pro-label-mon').textContent = lang.labels.pagas_prorrateadas;
    if (getEl('sp-pagas-tot-label-hou')) getEl('sp-pagas-tot-label-hou').firstChild.textContent = lang.labels.pagas_totales + " ";
    if (getEl('sp-pagas-pro-label-hou')) getEl('sp-pagas-pro-label-hou').textContent = lang.labels.pagas_prorrateadas;
    if (getEl('sp-pagas-tot-label-inv')) getEl('sp-pagas-tot-label-inv').firstChild.textContent = lang.labels.pagas_totales + " ";
    if (getEl('sp-pagas-pro-label-inv')) getEl('sp-pagas-pro-label-inv').textContent = lang.labels.pagas_prorrateadas;

    if (getEl('sp-mensual-bruto-label')) getEl('sp-mensual-bruto-label').firstChild.textContent = lang.labels.bruto_mensual + " ";
    if (getEl('sp-hora-precio-label')) getEl('sp-hora-precio-label').firstChild.textContent = lang.labels.precio_hora + " ";
    if (getEl('sp-hora-horas-label')) getEl('sp-hora-horas-label').firstChild.textContent = lang.labels.horas_mes;
    if (getEl('sp-inverso-neto-label')) getEl('sp-inverso-neto-label').firstChild.textContent = lang.labels.neto_obj + " ";
    if (getEl('sp-despido-salario-label')) getEl('sp-despido-salario-label').firstChild.textContent = lang.labels.despido_sal + " ";
    if (getEl('sp-despido-anos-label')) getEl('sp-despido-anos-label').firstChild.textContent = lang.labels.despido_anos + " ";
    if (getEl('sp-despido-tipo-label')) getEl('sp-despido-tipo-label').textContent = lang.labels.despido_tipo;
    if (getEl('opt-unfair')) getEl('opt-unfair').textContent = lang.options.unfair;
    if (getEl('opt-objective')) getEl('opt-objective').textContent = lang.options.objective;
    if (getEl('sp-tipo-cont-label')) getEl('sp-tipo-cont-label').firstChild.textContent = lang.labels.tipo_contrato + " ";
    if (getEl('btn-cont-indef')) getEl('btn-cont-indef').textContent = lang.options.indefinite;
    if (getEl('btn-cont-temp')) getEl('btn-cont-temp').textContent = lang.options.temporary;
    if (getEl('sp-advanced-label')) getEl('sp-advanced-label').textContent = lang.labels.adv_config;
    if (getEl('sp-irpf-manual-label')) getEl('sp-irpf-manual-label').firstChild.textContent = lang.labels.irpf_manual + " ";
    if (getEl('sp-base-manual-label')) getEl('sp-base-manual-label').firstChild.textContent = lang.labels.base_manual + " ";
    if (getEl('sp-antiguedad-label')) getEl('sp-antiguedad-label').firstChild.textContent = lang.labels.antiguedad + " ";
    if (getEl('sp-otros-imp-label')) getEl('sp-otros-imp-label').firstChild.textContent = lang.labels.otros_imp + " ";
    if (getEl('sp-horas-extra-label')) getEl('sp-horas-extra-label').textContent = lang.labels.ot_hours;
    if (getEl('sp-precio-extra-label')) getEl('sp-precio-extra-label').textContent = lang.labels.ot_price;
    if (getEl('sp-horas-extra-label-ann')) getEl('sp-horas-extra-label-ann').firstChild.textContent = lang.labels.ot_hours + " ";
    if (getEl('sp-precio-extra-label-ann')) getEl('sp-precio-extra-label-ann').firstChild.textContent = lang.labels.ot_price + " ";
    if (getEl('sp-horas-extra-label-mon')) getEl('sp-horas-extra-label-mon').firstChild.textContent = lang.labels.ot_hours + " ";
    if (getEl('sp-precio-extra-label-mon')) getEl('sp-precio-extra-label-mon').firstChild.textContent = lang.labels.ot_price + " ";
    if (getEl('sp-horas-extra-label-hou')) getEl('sp-horas-extra-label-hou').firstChild.textContent = lang.labels.ot_hours + " ";
    if (getEl('sp-precio-extra-label-hou')) getEl('sp-precio-extra-label-hou').firstChild.textContent = lang.labels.ot_price + " ";
    if (getEl('sp-horas-extra-label-inv')) getEl('sp-horas-extra-label-inv').firstChild.textContent = lang.labels.ot_hours + " ";
    if (getEl('sp-precio-extra-label-inv')) getEl('sp-precio-extra-label-inv').firstChild.textContent = lang.labels.ot_price + " ";

    // UK labels
    if (getEl('uk-anual-bruto-label')) getEl('uk-anual-bruto-label').firstChild.textContent = lang.labels.gross_annual + " ";
    if (getEl('uk-pay-periods-label')) getEl('uk-pay-periods-label').firstChild.textContent = lang.labels.pay_periods + " ";
    if (getEl('uk-mensual-bruto-label')) getEl('uk-mensual-bruto-label').firstChild.textContent = lang.labels.gross_monthly + " ";
    if (getEl('uk-pay-periods-mon-label')) getEl('uk-pay-periods-mon-label').firstChild.textContent = lang.labels.pay_periods + " ";
    if (getEl('uk-pay-periods-hou-label')) getEl('uk-pay-periods-hou-label').firstChild.textContent = lang.labels.pay_periods + " ";
    if (getEl('uk-pay-periods-inv-label')) getEl('uk-pay-periods-inv-label').firstChild.textContent = lang.labels.pay_periods + " ";
    if (getEl('uk-pay-periods-ir35-label')) getEl('uk-pay-periods-ir35-label').firstChild.textContent = lang.labels.pay_periods + " ";

    ['ann', 'mon', 'hou', 'inv', 'ir35'].forEach(s => {
        if (getEl(`uk-holiday-label-${s}`)) getEl(`uk-holiday-label-${s}`).firstChild.textContent = lang.holiday_label + " ";
    });

    if (getEl('uk-ir35-type-label')) getEl('uk-ir35-type-label').firstChild.textContent = lang.labels.ir35_type + " ";
    if (getEl('btn-uk-inside')) getEl('btn-uk-inside').textContent = lang.options.inside;
    if (getEl('btn-uk-outside')) getEl('btn-uk-outside').textContent = lang.options.outside;
    if (getEl('uk-assignment-label')) getEl('uk-assignment-label').firstChild.textContent = lang.labels.assign_rate + " ";
    if (getEl('btn-uk-ir35-daily')) getEl('btn-uk-ir35-daily').textContent = lang.options.daily;
    if (getEl('btn-uk-ir35-hourly')) getEl('btn-uk-ir35-hourly').textContent = lang.options.hourly;
    if (getEl('uk-umbrella-label')) getEl('uk-umbrella-label').firstChild.textContent = lang.labels.umbrella_margin + " ";
    if (getEl('uk-expenses-label')) getEl('uk-expenses-label').firstChild.textContent = lang.labels.expenses + " ";
    if (getEl('uk-marriage-label')) getEl('uk-marriage-label').firstChild.textContent = lang.labels.marriage + " ";
    if (getEl('uk-blind-label')) getEl('uk-blind-label').firstChild.textContent = lang.labels.blind + " ";
    if (getEl('uk-cb-toggle-label')) getEl('uk-cb-toggle-label').firstChild.textContent = lang.labels.cb_toggle + " ";
    if (getEl('uk-children-cb-label')) getEl('uk-children-cb-label').textContent = lang.labels.children_count;
    if (getEl('uk-cb-desc-label')) getEl('uk-cb-desc-label').textContent = lang.labels.children_desc;

    if (getEl('uk-region-label')) getEl('uk-region-label').textContent = lang.labels.tax_region;
    if (getEl('opt-uk-ewni')) getEl('opt-uk-ewni').textContent = lang.options.ewni;
    if (getEl('opt-uk-sco')) getEl('opt-uk-sco').textContent = lang.options.scotland;

    if (getEl('opt-ni-a')) getEl('opt-ni-a').textContent = lang.options.standard + " (A)";
    if (getEl('opt-ni-b')) getEl('opt-ni-b').textContent = lang.options.reduced + " (B)";
    if (getEl('opt-ni-c')) getEl('opt-ni-c').textContent = lang.options.over_pension + " (C)";
    if (getEl('opt-ni-h')) getEl('opt-ni-h').textContent = lang.options.apprentice + " < 25 (H)";
    if (getEl('opt-ni-j')) getEl('opt-ni-j').textContent = lang.options.deferred + " (J)";
    if (getEl('opt-ni-m')) getEl('opt-ni-m').textContent = lang.options.under_21 + " (M)";
    if (getEl('opt-ni-v')) getEl('opt-ni-v').textContent = lang.options.veterans + " (V)";
    if (getEl('opt-ni-z')) getEl('opt-ni-z').textContent = lang.options.under_21 + " " + lang.options.deferred + " (Z)";

    if (getEl('uk-ni-cat-label')) getEl('uk-ni-cat-label').firstChild.textContent = lang.labels.ni_cat + " ";
    if (getEl('btn-uk-pension-qual')) getEl('btn-uk-pension-qual').textContent = appState.language === 'es' ? "Ganancias Calificables" : "Qualifying Earnings";
    if (getEl('btn-uk-pension-sal')) getEl('btn-uk-pension-sal').textContent = appState.language === 'es' ? "Salario Total" : "Total Salary";

    if (getEl('btn-uk-weekly')) getEl('btn-uk-weekly').textContent = lang.semanal;
    if (getEl('btn-uk-monthly')) getEl('btn-uk-monthly').textContent = lang.mensual;
    if (getEl('uk-hora-precio-label')) getEl('uk-hora-precio-label').firstChild.textContent = lang.labels.hourly_rate + " ";
    if (getEl('lbl-uk-hourly-hours')) getEl('lbl-uk-hourly-hours').firstChild.textContent = (appState.ukHourlyFreq === 'weekly' ? lang.labels.hours_week : lang.labels.hours_month) + " ";
    if (getEl('uk-mon-calc-label')) getEl('uk-mon-calc-label').firstChild.textContent = lang.labels.mon_calc + " ";
    if (getEl('btn-uk-cal-month')) getEl('btn-uk-cal-month').textContent = lang.options.cal_month;
    if (getEl('btn-uk-4weeks')) getEl('btn-uk-4weeks').textContent = lang.options.four_weeks;

    if (getEl('uk-inverso-neto-label')) getEl('uk-inverso-neto-label').firstChild.textContent = lang.labels.target_net + " ";
    if (getEl('uk-despido-edad-label')) getEl('uk-despido-edad-label').firstChild.textContent = lang.labels.current_age + " ";
    if (getEl('uk-despido-anos-label')) getEl('uk-despido-anos-label').textContent = lang.labels.years_service;
    if (getEl('uk-despido-semana-label')) getEl('uk-despido-semana-label').textContent = lang.labels.weekly_pay;
    if (getEl('uk-advanced-label')) getEl('uk-advanced-label').textContent = lang.labels.adv_config;
    if (getEl('uk-bonus-list-label')) getEl('uk-bonus-list-label').firstChild.textContent = lang.labels.bonus_a.replace(' A', '') + " ";
    if (getEl('uk-jobs-label')) getEl('uk-jobs-label').firstChild.textContent = lang.labels.jobs + " ";
    if (getEl('btn-uk-1job')) getEl('btn-uk-1job').textContent = lang.options.job1;
    if (getEl('btn-uk-2jobs')) getEl('btn-uk-2jobs').textContent = lang.options.jobs2plus;
    if (getEl('uk-tax-code-label')) getEl('uk-tax-code-label').firstChild.textContent = lang.labels.tax_code + " ";
    if (getEl('opt-uk-custom-code')) getEl('opt-uk-custom-code').textContent = lang.options.other_manual;
    if (getEl('uk-pension-label')) getEl('uk-pension-label').firstChild.textContent = lang.labels.pension_perc + " ";
    if (getEl('btn-uk-pension-before')) getEl('btn-uk-pension-before').textContent = lang.options.net_pay;
    if (getEl('btn-uk-pension-source')) getEl('btn-uk-pension-source').textContent = lang.options.relief_source;
    if (getEl('uk-bik-label')) getEl('uk-bik-label').firstChild.textContent = lang.labels.benefits_bik + " ";
    if (getEl('uk-stud-loan-label')) getEl('uk-stud-loan-label').textContent = lang.labels.student_loan;
    if (getEl('opt-uk-sl-none')) getEl('opt-uk-sl-none').textContent = lang.options.none;
    if (getEl('uk-postgrad-label')) getEl('uk-postgrad-label').textContent = lang.labels.postgrad_loan;

    // Consent Banner
    if (getEl('consent-text-content')) getEl('consent-text-content').innerHTML = lang.consent_text;
    if (getEl('btn-accept-consent')) getEl('btn-accept-consent').textContent = lang.consent_btn_all;
    if (getEl('btn-reject-consent')) getEl('btn-reject-consent').textContent = lang.consent_btn_min;

    // Placeholders dinámicos
    if (getEl('auth-email')) getEl('auth-email').placeholder = lang.placeholders.email;
    if (getEl('sp-annual-gross')) getEl('sp-annual-gross').placeholder = lang.placeholders.sp_annual;
    if (getEl('sp-monthly-gross')) getEl('sp-monthly-gross').placeholder = lang.placeholders.sp_monthly;
    if (getEl('sp-hourly-price')) getEl('sp-hourly-price').placeholder = lang.placeholders.sp_hourly_price;
    if (getEl('sp-hourly-hours')) getEl('sp-hourly-hours').placeholder = lang.placeholders.sp_hourly_hours;
    if (getEl('sp-inverse-net')) getEl('sp-inverse-net').placeholder = lang.placeholders.sp_inverse;
    if (getEl('sp-dismissal-salary')) getEl('sp-dismissal-salary').placeholder = lang.placeholders.sp_dismissal_sal;
    if (getEl('sp-dismissal-years')) getEl('sp-dismissal-years').placeholder = lang.placeholders.sp_dismissal_years;
    if (getEl('sp-irpf-manual')) getEl('sp-irpf-manual').placeholder = lang.placeholders.manual_irpf;
    if (getEl('sp-pro-base-common')) getEl('sp-pro-base-common').placeholder = lang.placeholders.optional;
    if (getEl('sp-pro-base-at-ep')) getEl('sp-pro-base-at-ep').placeholder = lang.placeholders.optional;

    if (getEl('uk-annual-gross')) getEl('uk-annual-gross').placeholder = lang.placeholders.uk_annual;
    if (getEl('uk-monthly-gross')) getEl('uk-monthly-gross').placeholder = lang.placeholders.uk_monthly;
    if (getEl('uk-hourly-rate')) getEl('uk-hourly-rate').placeholder = lang.placeholders.uk_hourly_rate;
    if (getEl('uk-hourly-hours')) getEl('uk-hourly-hours').placeholder = lang.placeholders.uk_hourly_hours;
    if (getEl('uk-inverse-net')) getEl('uk-inverse-net').placeholder = lang.placeholders.uk_inverse;
    if (getEl('uk-pro-taxcode-manual')) getEl('uk-pro-taxcode-manual').placeholder = lang.placeholders.uk_taxcode_manual;
    if (getEl('uk-ir35-rate')) getEl('uk-ir35-rate').placeholder = lang.placeholders.uk_ir35_rate;

    // Calcular botón
    getEl('btn-calculate').textContent = lang.calc;
    getEl('results-title-label').textContent = lang.results_label;
    if (getEl('label-net-total')) getEl('label-net-total').textContent = lang.net_result_label;

    const helpNotes = {
        'h-children': lang.help.children,
        'h-others': lang.help.others,
        'h-disability': lang.help.disability,
        'h-multipayer': lang.help.multipayer,
        'h-joint': lang.help.joint,
        'h-pagas': lang.help.pagas,
        'h-contract': lang.help.contract,
        'h-manual-irpf': lang.help.manual_irpf,
        'h-custom-base': lang.help.custom_base,
        'h-extra-tax': lang.help.extra_tax,
        'h-bonus': lang.help.bonus,
        'h-antiguedad': lang.help.antiguedad,
        'h-ot-hours': lang.help.ot_hours,
        'h-ot-price': lang.help.ot_price,
        'h-grupo': lang.help['h-grupo'],
        'h-jornada': lang.help['h-jornada'],
        'h-meses': lang.help['h-meses'],
        'h-especie': lang.help['h-especie'],
        'h-exento': lang.help['h-exento'] || "",
        'h-mobility': lang.help.mobility || "",
        'h-union': lang.help.union || "",
        'h-seniority-2012': lang.help['h-seniority-2012'] || "",
        'h-uk-periods': lang.help.uk_periods,
        'h-uk-periods-monthly': lang.help.uk_periods,
        'h-uk-bik': lang.help.uk_bik,
        'h-uk-pension': lang.help.uk_pension,
        'h-uk-taxcode': lang.help.uk_taxcode,
        'h-uk-ni-letter': lang.help.uk_ni_letter,
        'h-uk-bonus': lang.help.uk_bonus,
        'h-uk-jobs': lang.help.uk_jobs,
        'h-uk-inverse': lang.help.uk_inverse,
        'h-uk-redundancy': lang.help.uk_redundancy,
        'h-uk-holiday': lang.help.uk_holiday,
        'h-uk-ir35-type': lang.help.uk_ir35_type,
        'h-uk-assign': lang.help.uk_assign,
        'h-uk-margin': lang.help.uk_margin,
        'h-uk-expenses': lang.help.uk_expenses,
        'h-uk-marriage': lang.help.uk_marriage,
        'h-uk-blind': lang.help.uk_blind,
        'h-uk-child-benefit': lang.help.uk_child_benefit,
        'h-mode-annual': lang.help.mode_annual,
        'h-mode-monthly': lang.help.mode_monthly,
        'h-mode-hourly': lang.help.mode_hourly,
        'h-mode-ir35': lang.help.mode_ir35,
        'h-mode-inverse': lang.help.mode_inverse,
        'h-mode-dismissal': lang.help.mode_dismissal,
        'h-uk-hourly-base': lang.help.uk_hourly_base
    };

    for (let id in helpNotes) {
        const el = getEl(id);
        if (el) el.textContent = helpNotes[id] || "";
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
            payLabel.nextElementSibling.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            payLabel.nextElementSibling.querySelectorAll('button')[0].classList.add('active');
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
    // Cerrar ayudas abiertas
    document.querySelectorAll('.help-note').forEach(n => n.classList.remove('visible'));

    appState.mode = m;
    document.querySelectorAll('.btn-mode').forEach(b => b.classList.remove('active'));
    getEl(`btn-mode-${m}`).classList.add('active');

    // Ocultar todos los formularios de cálculo del país actual
    const currentModule = getEl(`module-${appState.country}`);
    currentModule.querySelectorAll('.calc-form').forEach(f => f.classList.add('hidden'));

    // Mostrar el formulario correspondiente
    const targetForm = getEl(`${appState.country}-${m}`);
    if (targetForm) targetForm.classList.remove('hidden');
}

export function updatePagasUI() {
    const getEl = (id) => document.getElementById(id);
    const modes = ['annual', 'monthly', 'hourly', 'inverse'];
    const total = appState.spToggles.pagas;
    const prorated = appState.spToggles.pagas_prorrateadas;

    modes.forEach(m => {
        // 1. Highlight Total Buttons
        const totalGroup = getEl(`sp-pagas-tot-${m}`);
        if (totalGroup) {
            totalGroup.querySelectorAll('button').forEach(b => {
                b.classList.toggle('active', parseInt(b.textContent) === total);
            });
        }

        // 2. Manage Prorated Section
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
                    // window.setSpainProrrateadas se definirá globalmente
                    btn.onclick = () => { if (window.setSpainProrrateadas) window.setSpainProrrateadas(i); };
                    list.appendChild(btn);
                }
            }
        }
    });
}

export function setupEventListeners() {
    const getEl = (id) => document.getElementById(id);

    // T&C Accept
    getEl('btn-accept-tc')?.addEventListener('click', () => {
        localStorage.setItem('payroll_tc_accepted', 'true');
        getEl('welcome-modal').classList.add('hidden');
    });

    // Menú y Ajustes
    getEl('btn-settings')?.addEventListener('click', () => {
        getEl('settings-menu').classList.remove('hidden');
        setTimeout(() => getEl('settings-menu').classList.add('open'), 10);
    });
    getEl('btn-close-settings')?.addEventListener('click', () => {
        getEl('settings-menu').classList.remove('open');
        setTimeout(() => getEl('settings-menu').classList.add('hidden'), 300);
    });

    getEl('theme-toggle')?.addEventListener('change', (e) => {
        applyTheme(e.target.checked, true);
    });

    getEl('lang-select')?.addEventListener('change', (e) => {
        appState.language = e.target.value;
        localStorage.setItem('app_language', e.target.value);
        updateUITranslations();
    });

    // Cambio de País
    getEl('btn-spain')?.addEventListener('click', () => setCountry('spain'));
    getEl('btn-uk')?.addEventListener('click', () => setCountry('uk'));

    // Calculadora Flotante
    getEl('btn-calc-helper')?.addEventListener('click', () => {
        const calc = getEl('floating-calc');
        calc.classList.toggle('hidden');
    });
    getEl('btn-close-calc')?.addEventListener('click', () => getEl('floating-calc').classList.add('hidden'));

    // Cambio de Modo
    document.querySelectorAll('.btn-mode').forEach(btn => {
        btn.addEventListener('click', () => {
            const modeId = btn.id.replace('btn-mode-', '');
            setMode(modeId);
        });
    });

    // Eventos UK Tax Code
    getEl('uk-pro-taxcode-select')?.addEventListener('change', (e) => {
        getEl('uk-pro-taxcode-manual').classList.toggle('hidden', e.target.value !== 'custom');
    });

    // Holiday Toggles
    getEl('sp-holiday-prorated')?.addEventListener('change', (e) => {
        appState.spToggles['holiday-prorated'] = e.target.checked;
    });
    getEl('uk-holiday-prorated')?.addEventListener('change', (e) => {
        appState.ukToggles['holiday-prorated'] = e.target.checked;
    });

    // Revelación progresiva y Bloqueo de cantidades (Hijos)
    const updateChildVisibility = (e) => {
        const val = parseInt(e.target.value) || 0;
        getEl('wrapper-sp-child-options').classList.toggle('hidden', val <= 0);
        if (val <= 0) {
            getEl('sp-pro-child-dis').checked = false;
            getEl('wrapper-sp-child-dis-count').classList.add('hidden');
            getEl('sp-pro-child-dis-count').value = 0;
        }
    };
    getEl('sp-pro-children')?.addEventListener('input', updateChildVisibility);
    getEl('sp-pro-children')?.addEventListener('change', updateChildVisibility);

    getEl('sp-pro-child-dis')?.addEventListener('change', (e) => {
        getEl('wrapper-sp-child-dis-count').classList.toggle('hidden', !e.target.checked);
        if (!e.target.checked) getEl('sp-pro-child-dis-count').value = 0;
        else if (parseInt(getEl('sp-pro-child-dis-count').value) === 0) getEl('sp-pro-child-dis-count').value = 1;
    });

    // UK Child Benefit Toggle logic
    getEl('uk-pro-cb-toggle')?.addEventListener('change', (e) => {
        getEl('wrapper-uk-cb-count').classList.toggle('hidden', !e.target.checked);
        if (!e.target.checked) {
            getEl('uk-pro-children-count').value = 0;
        }
    });

    const limitChildDis = (e) => {
        const total = parseInt(getEl('sp-pro-children').value) || 0;
        if (parseInt(e.target.value) > total) e.target.value = total;
    };
    getEl('sp-pro-child-dis-count')?.addEventListener('input', limitChildDis);
    getEl('sp-pro-child-dis-count')?.addEventListener('change', limitChildDis);

    // Revelación progresiva y Bloqueo de cantidades (Otros)
    const updateOtherVisibility = (e) => {
        const val = parseInt(e.target.value) || 0;
        getEl('wrapper-sp-other-options').classList.toggle('hidden', val <= 0);
        if (val <= 0) {
            getEl('sp-pro-other-dis').checked = false;
            getEl('wrapper-sp-other-dis-count').classList.add('hidden');
            getEl('sp-pro-other-dis-count').value = 0;
            getEl('sp-pro-other-75').checked = false;
            getEl('wrapper-sp-other-75-count').classList.add('hidden');
            getEl('sp-pro-other-75-count').value = 0;
        }
    };
    getEl('sp-pro-others')?.addEventListener('input', updateOtherVisibility);
    getEl('sp-pro-others')?.addEventListener('change', updateOtherVisibility);

    getEl('sp-pro-other-dis')?.addEventListener('change', (e) => {
        getEl('wrapper-sp-other-dis-count').classList.toggle('hidden', !e.target.checked);
        if (!e.target.checked) getEl('sp-pro-other-dis-count').value = 0;
        else if (parseInt(getEl('sp-pro-other-dis-count').value) === 0) getEl('sp-pro-other-dis-count').value = 1;
    });

    const limitOtherDis = (e) => {
        const total = parseInt(getEl('sp-pro-others').value) || 0;
        if (parseInt(e.target.value) > total) e.target.value = total;
    };
    getEl('sp-pro-other-dis-count')?.addEventListener('input', limitOtherDis);
    getEl('sp-pro-other-dis-count')?.addEventListener('change', limitOtherDis);

    getEl('sp-pro-other-75')?.addEventListener('change', (e) => {
        getEl('wrapper-sp-other-75-count').classList.toggle('hidden', !e.target.checked);
        if (!e.target.checked) getEl('sp-pro-other-75-count').value = 0;
        else if (parseInt(getEl('sp-pro-other-75-count').value) === 0) getEl('sp-pro-other-75-count').value = 1;
    });

    const limitOther75 = (e) => {
        const total = parseInt(getEl('sp-pro-others').value) || 0;
        if (parseInt(e.target.value) > total) e.target.value = total;
    };
    getEl('sp-pro-other-75-count')?.addEventListener('input', limitOther75);
    getEl('sp-pro-other-75-count')?.addEventListener('change', limitOther75);

    // Eventos Consentimiento
    getEl('btn-accept-consent')?.addEventListener('click', () => {
        localStorage.setItem('user_consent_accepted', 'all');
        getEl('consent-banner').classList.remove('visible');
    });

    getEl('btn-reject-consent')?.addEventListener('click', () => {
        localStorage.setItem('user_consent_accepted', 'essential');
        getEl('consent-banner').classList.remove('visible');
        window['ga-disable-G-031G1V1F9J'] = true;
    });

    // Botón Calcular
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

        const adBanner = getEl('ad-banner-bottom');
        if (adBanner && !appState.isPro) {
            adBanner.style.display = 'block';
        }

        const shouldShowInterstitial = (appState.adClickCount % 2 === 0) && !appState.isPro && appState.adClickCount > 0;

        if (shouldShowInterstitial && window.showInterstitialAd) {
            window.showInterstitialAd(() => { if (window.processCalculation) window.processCalculation(); });
        } else {
            setTimeout(() => { if (window.processCalculation) window.processCalculation(); }, 600);
        }
    });
}

export function checkTC() {
    const getEl = (id) => document.getElementById(id);
    const accepted = localStorage.getItem('payroll_tc_accepted');
    if (!accepted) {
        getEl('welcome-modal').classList.remove('hidden');
    }
}

export function checkConsent() {
    const getEl = (id) => document.getElementById(id);
    const consented = localStorage.getItem('user_consent_accepted');
    if (!consented) {
        setTimeout(() => {
            getEl('consent-banner').classList.add('visible');
        }, 1000);
    }
}

export function initApp() {
    const getEl = (id) => document.getElementById(id);

    // 1. Detectar tema preferido
    const savedTheme = localStorage.getItem('app_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme === 'dark', false);
    } else {
        applyTheme(systemPrefersDark, false);
    }

    // 2. Escuchar cambios de tema del sistema en tiempo real
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('app_theme')) {
            applyTheme(e.matches, false);
        }
    });

    // Detectar idioma
    const savedLang = localStorage.getItem('app_language');
    const sysLang = navigator.language.split('-')[0];

    if (savedLang) {
        appState.language = savedLang;
    } else if (sysLang === 'en') {
        appState.language = 'en';
    }

    if (getEl('lang-select')) getEl('lang-select').value = appState.language;

    // 3. Registrar Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log("SW: Registrado"))
            .catch(err => console.warn("SW: Error", err));
    }

    // 4. Bloquear teclas inválidas
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (['e', 'E', '+', '-'].includes(e.key)) {
                e.preventDefault();
            }
        });

        input.addEventListener('input', () => {
            input.classList.remove('input-error');
            const parent = input.closest('.input-group');
            const errorMsg = parent?.querySelector('.error-label');
            if (errorMsg) errorMsg.remove();
        });
    });
}

export function activatePro(msg) {
    appState.isPro = true;
    document.body.classList.add('is-pro');
    document.getElementById('pro-settings-container')?.classList.remove('hidden');
    document.getElementById('pro-upgrade-container')?.classList.add('hidden');
    document.getElementById('ad-banner-bottom')?.classList.add('hidden');
    if (msg) alert(msg);
}

// Registro global de funciones críticas para que el HTML y otros módulos las vean
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

    handle.onmousedown = dragMouseDown;
    handle.ontouchstart = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        pos3 = e.clientX || e.touches[0].clientX;
        pos4 = e.clientY || e.touches[0].clientY;
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        const x = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        const y = e.clientY || (e.touches ? e.touches[0].clientY : 0);
        pos1 = pos3 - x;
        pos2 = pos4 - y;
        pos3 = x;
        pos4 = y;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
        el.style.right = 'auto';
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.ontouchend = null;
        document.onmousemove = null;
        document.ontouchmove = null;
    }
}

export function setupHelperCalc() {
    let calcDisplay = '0';
    let calcHistory = '';
    let calcAccumulator = 0;
    let calcPendingOp = null;
    let calcNextReset = false;

    const display = document.getElementById('calc-display');
    const history = document.getElementById('calc-history');

    document.querySelectorAll('.btn-calc-num').forEach(btn => {
        btn.addEventListener('click', () => {
            if (calcNextReset) {
                calcDisplay = '';
                calcNextReset = false;
            }
            const val = btn.textContent;
            if (val === '.' && calcDisplay.includes('.')) return;
            if (calcDisplay === '0' && val !== '.') calcDisplay = val;
            else calcDisplay += val;
            display.textContent = calcDisplay;
        });
    });

    document.querySelectorAll('.btn-calc-op').forEach(btn => {
        btn.addEventListener('click', () => {
            const op = btn.getAttribute('data-val');
            const current = parseFloat(calcDisplay);

            if (op === 'C') {
                calcDisplay = '0'; calcHistory = ''; calcAccumulator = 0; calcPendingOp = null;
            } else if (op === 'back') {
                calcDisplay = calcDisplay.length > 1 ? calcDisplay.slice(0, -1) : '0';
            } else if (op === '====') {
                if (calcPendingOp) {
                    calcAccumulator = doCalc(calcAccumulator, current, calcPendingOp);
                    calcDisplay = calcAccumulator.toString();
                    calcHistory = '';
                    calcPendingOp = null;
                    calcNextReset = true;
                }
            } else {
                if (calcPendingOp) {
                    calcAccumulator = doCalc(calcAccumulator, current, calcPendingOp);
                } else {
                    calcAccumulator = current;
                }
                calcPendingOp = op;
                calcHistory = calcAccumulator + ' ' + (op === '*' ? '×' : op === '/' ? '÷' : op);
                calcNextReset = true;
            }
            display.textContent = calcDisplay;
            history.textContent = calcHistory;
        });
    });
}

function doCalc(a, b, op) {
    if (op === '+') return a + b;
    if (op === '-') return a - b;
    if (op === '*') return a * b;
    if (op === '/') return b !== 0 ? a / b : 0;
    return b;
}
