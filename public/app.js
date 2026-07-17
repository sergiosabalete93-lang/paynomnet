import './firebase-config.js';

/* ==========================================================================
   1. ESTADO GLOBAL Y CONFIGURACIÓN
   ========================================================================== */
const appState = {
    language: 'es', // 'es' o 'en'
    country: 'spain', // 'spain' o 'uk'
    mode: 'annual', // 'annual', 'monthly', 'hourly', 'inverse', 'dismissal'
    isPro: true, // <--- Activo por defecto para pruebas
    adClickCount: 0,
    interstitialId: 'ca-app-pub-3940256099942544/1033173712', // ID de Prueba (Test)
    spToggles: {
        disability: 'none',
        multipayer: 'no',
        civil: 'single',
        pagas: 12,
        pagas_prorrateadas: 0,
        contrato: 'indef',
        'holiday-prorated': false,
        dynamicBonus: [], // List of { id, amount, cotizaIRPF, cotizaSS, cotizaUnemployment }
        dynamicOT: [],     // List of { id, amount, modeSuffix }
        dynamicDeductions: [] // List of { id, amount }
    },
    ukToggles: {
        'hourly-monthly-base': 'full',
        'pension-type': 'before',
        'bonus-a-tax': 'yes',
        'bonus-b-tax': 'yes',
        'jobs': '1',
        'holiday-prorated': false
    },
    ukPeriods: {
        annual: 12,
        monthly: 12
    },
    ukHourlyFreq: 'weekly'
};

const i18n = {
    es: {
        page_title: "Paynomnet 2026",
        settings: "Ajustes",
        dark_mode: "Modo Oscuro",
        language: "Idioma",
        activate_pro: "Activar Modo PRO",
        pro_active: "Suscripción PRO Activa",
        logout_pro: "Cerrar Sesión PRO",
        auth_title: "Acceso PRO",
        login: "Iniciar Sesión",
        country_label: "País",
        mode_label: "Modo de Cálculo",
        spain: "España",
        uk: "UK",
        anual: "Anual",
        mensual: "Mensual",
        horas: "Por Horas",
        semanal: "Semanal",
        inverse: "Inverso (Neto a Bruto)",
        despido: "Indemnización",
        calc: "CALCULAR",
        results_label: "Resultados del Cálculo",
        net_result_label: "IMPORTE NETO",
        bruto_result_label: "SALARIO BASE ESTIMADO",
        pro_alert: "Esta función requiere el Modo PRO activado.",
        bruto: "Sueldo",
        ss: "Seguridad Social",
        irpf: "IRPF",
        neto: "Neto",
        extras: "Extras/Bonus",
        ot_res: "Horas Extra",
        other_deductions: "Otras Deducciones",
        pension: "Pensión",
        student_loan_res: "Student Loan",
        emp_ni: "Employer NI (Coste Empresa)",
        salary_daily: "Salario Diario",
        days_year: "Días por año",
        bruto_est: "Sueldo Estimado",
        tc_title: "Términos y Condiciones",
        tc_text: "Bienvenido a <strong>Paynomnet 2026</strong>. Al utilizar esta aplicación, aceptas que los cálculos proporcionados son estimaciones orientativas basadas en las normativas fiscales previstas para el año 2026 en España y Reino Unido. <br><br>Esta herramienta no sustituye el asesoramiento de un profesional fiscal ni tiene validez legal vinculante. Los resultados reales pueden variar según circunstancias personales específicas, cambios legislativos de última hora o interpretaciones de la agencia tributaria correspondiente (AEAT / HMRC).",
        btn_accept: "Aceptar y Entrar",
        disclaimer: "El cálculo es orientativo y el resultado real puede variar según la agencia tributaria de cada país",
        holiday_label: "Vacaciones Prorrateadas",
        holiday_res: "Vacaciones Pagadas",
        consent_text: "Al utilizar Paynomnet, aceptas nuestros <a href='terms.html' target='_blank'>Términos</a> y <a href='privacy.html' target='_blank'>Privacidad</a>. Usamos cookies de terceros (Google) para mejorar la app y mostrar anuncios. Los cálculos son <strong>estimaciones orientativas</strong>.",
        consent_btn_all: "Aceptar Todo",
        consent_btn_min: "Solo Necesarias",
        options: {
            common: "Común",
            single: "Soltero/a",
            married: "Casado/a",
            prorated: "Prorrateadas",
            no_prorated: "Sin Prorratear",
            unfair: "Improcedente (33 días)",
            objective: "Procedente/Objetivo (20 días)",
            indefinite: "Indefinido",
            temporary: "Temporal",
            standard: "Estándar",
            reduced: "Reducida",
            over_pension: "Jubilado",
            apprentice: "Aprendiz",
            deferred: "Diferido",
            under_21: "Menor 21",
            veterans: "Veteranos",
            cal_month: "Mes Natural",
            four_weeks: "4 Semanas",
            before_tax: "Antes de Imp.",
            after_tax: "Después de Imp.",
            taxed: "Con Impuestos",
            net_paid: "Neto Pagado",
            other_manual: "Otro / Manual...",
            none: "Ninguno",
            ewni: "Inglaterra / Gales / NI",
            scotland: "Escocia",
            job1: "1 Empleo",
            jobs2plus: "2+ Empleos"
        },
        placeholders: {
            email: "Email (Admin)",
            sp_annual: "Ej: 24000",
            sp_monthly: "Ej: 2000",
            sp_hourly_price: "Ej: 12",
            sp_hourly_hours: "Ej: 160",
            sp_inverse: "Ej: 1800",
            sp_dismissal_sal: "Ej: 2000 o 24000",
            sp_dismissal_years: "Ej: 3.5",
            manual_irpf: "Ej: 15",
            optional: "Automática",
            uk_annual: "Ej: 35000",
            uk_monthly: "Ej: 2800",
            uk_hourly_rate: "Ej: 15",
            uk_hourly_hours: "Ej: 37.5",
            uk_inverse: "Ej: 2200",
            uk_taxcode_manual: "e.g. S1257L"
        },
        labels: {
            privacidad: "Privacidad",
            terminos: "Términos",
            hijos: "Nº Hijos",
            hijo_dis: "Hijo con Discapacidad",
            otros: "Otros a Cargo",
            otro_dis: "Persona con Discapacidad",
            otro_75: "Mayor de 75 años",
            otro_dis_count: "¿Cuántos con discapacidad?",
            otro_75_count: "¿Cuántos con +75 años?",
            tu_dis: "Tu Discapacidad",
            comunidad: "Comunidad",
            pagadores: "Pagadores",
            civil: "Estado Civil",
            conjunta: "Declaración Conjunta",
            bruto_anual: "Salario Base Anual (€)",
            n_pagas: "Número de Pagas",
            pagas_totales: "Pagas Totales (Contrato)",
            pagas_prorrateadas: "Pagas Prorrateadas (Repartidas)",
            bruto_mensual: "Salario Base Mensual (€)",
            pagas_extras: "Pagas Extras",
            precio_hora: "Precio por Hora (€)",
            horas_mes: "Horas al Mes",
            ot_hours: "Horas Extra",
            neto_obj: "Neto Mensual Objetivo (€)",
            despido_sal: "Salario (Mensual o Anual)",
            despido_anos: "Años trabajados",
            despido_tipo: "Tipo de Despido",
            tipo_contrato: "Tipo de Contrato",
            adv_config: "Configuración Avanzada (PRO)",
            irpf_manual: "IRPF Manual (%)",
            base_manual: "Base Manual (€/mes)",
            antiguedad: "Antigüedad / Trienios (€/mes)",
            otros_imp: "Otras Deducciones (€/mes)",
            bonus_a: "Bonus A (€/mes)",
            bonus_b: "Bonus B (€/mes)",
            ot_hours: "Horas Extra",
            ot_price: "Precio Hora Extra",
            hijo_dis_count: "¿Cuántos hijos?",
            cotiza: "Cotiza",
            tax_region: "Tax Region",
            ni_cat: "NI Category",
            gross_annual: "Gross Annual Salary (£)",
            pay_periods: "Pay Periods",
            gross_monthly: "Monthly Gross Pay (£)",
            hourly_rate: "Hourly Rate (£)",
            hours_week: "Hours per WEEK",
            hours_month: "Hours per MONTH",
            mon_calc: "Cálculo de Horas Mensuales",
            weekly_ot: "Horas Extra (Semanal)",
            monthly_ot: "Horas Extra (Mensual)",
            ot_rate: "Precio Hora Extra (£)",
            target_net: "Neto Mensual Objetivo (£)",
            current_age: "Current Age",
            years_service: "Years of Service",
            weekly_pay: "Weekly Pay (£)",
            jobs: "Jobs / Empleos",
            tax_code: "Tax Code",
            pension_perc: "Pension (%)",
            benefits_bik: "Benefits (BIK)",
            student_loan: "Student Loan",
            postgrad_loan: "Postgraduate Loan"
        },
        help: {
            mode_annual: "Calcula tu sueldo neto a partir del bruto total que recibirás en un año completo.",
            mode_monthly: "Calcula tu sueldo neto a partir de lo que cobras mensualmente en bruto.",
            mode_hourly: "Ideal para trabajos por horas o contratos temporales de corta duración.",
            mode_inverse: "Dinos cuánto quieres cobrar 'limpio' al mes y te diremos cuánto bruto debes negociar.",
            mode_dismissal: "Calcula la indemnización legal que te corresponde según la ley vigente 2026.",
            children: "Número de hijos menores de 25 años que conviven contigo y no tienen ingresos.",
            others: "Personas mayores de 65 años o con discapacidad a tu cargo.",
            disability: "Tu grado de discapacidad oficialmente reconocido influye en el mínimo personal exento.",
            multipayer: "Tener más de un pagador en el mismo año puede afectar a tu retención final de IRPF.",
            joint: "Si estás casado/a, a veces sale más rentable hacer la declaración de la renta juntos.",
            pagas: "Indica si cobras en 12 pagas (extras prorrateadas) o 14 pagas (con pagas en junio y diciembre).",
            contract: "Los contratos temporales suelen tener una retención de IRPF mínima obligatoria diferente.",
            manual_irpf: "Fuerza un porcentaje de IRPF específico si sabes que tu empresa te aplica uno concreto.",
            custom_base: "Si tu base de cotización no coincide con tu bruto (ej: bases máximas), ajústala aquí.",
            extra_tax: "Resta del neto cualquier descuento mensual de tu nómina que no sea impuesto legal, como: cuotas sindicales, seguros privados, embargos o aportaciones a planes de empresa.",
            bonus: "Complementos salariales mensuales. Indica si estos conceptos cotizan o son extras netos.",
            uk_periods: "Normalmente 12 meses, pero algunos contratos usan periodos de 4 semanas (13 al año) o semanales (52).",
            uk_bik: "Beneficios no monetarios como coche de empresa, seguro médico, etc. (P11D).",
            uk_pension: "Tu aportación al fondo de pensiones. Puede ser antes de impuestos (Salary Sacrifice) o después.",
            uk_taxcode: "Tu código fiscal (ej: 1257L). Determina cuánto puedes ganar libre de impuestos.",
            uk_ni_letter: "La mayoría de empleados usan la letra A. Influye en tus contribuciones a la Seguridad Social.",
            uk_bonus: "Bonificaciones adicionales. Indica si el importe introducido es antes o después de impuestos.",
            uk_jobs: "Si tienes varios trabajos, tu 'Personal Allowance' suele aplicarse solo al trabajo principal.",
            uk_inverse: "Introduce el neto mensual deseado y calcularemos el salario anual bruto equivalente.",
            uk_redundancy: "Cálculo basado en la ley del Reino Unido (Statutory Redundancy Pay).",
            uk_hourly_base: "Define cómo convertir horas semanales a mensuales (Promedio año vs Bloques de 4 semanas)."
        }
    },
    en: {
        page_title: "Paynomnet 2026",
        settings: "Settings",
        dark_mode: "Dark Mode",
        language: "Language",
        activate_pro: "Activate PRO Mode",
        pro_active: "PRO Subscription Active",
        logout_pro: "Logout PRO",
        auth_title: "PRO Access",
        login: "Login",
        country_label: "Country",
        mode_label: "Calculation Mode",
        spain: "Spain",
        uk: "UK",
        anual: "Annual",
        mensual: "Monthly",
        horas: "Hourly",
        semanal: "Weekly",
        inverse: "Inverse (Net to Gross)",
        despido: "Redundancy",
        calc: "CALCULATE",
        results_label: "Calculation Results",
        net_result_label: "TAKE-HOME PAY",
        bruto_result_label: "ESTIMATED GROSS SALARY",
        pro_alert: "This feature requires PRO Mode activated.",
        bruto: "Gross",
        ss: "Social Security",
        irpf: "Income Tax",
        neto: "Net",
        extras: "Extras/Bonus",
        ot_res: "Overtime",
        other_deductions: "Other Deductions",
        pension: "Pension",
        student_loan_res: "Student Loan",
        emp_ni: "Employer NI",
        salary_daily: "Daily Salary",
        days_year: "Days per year",
        bruto_est: "Estimated Gross",
        tc_title: "Terms and Conditions",
        tc_text: "Welcome to <strong>Paynomnet 2026</strong>. By using this application, you accept that the calculations provided are guidance estimates based on tax regulations planned for the year 2026 in Spain and the United Kingdom. <br><br>This tool does not replace the advice of a tax professional and has no binding legal validity. Actual results may vary depending on specific personal circumstances, last-minute legislative changes, or interpretations by the relevant tax agency (AEAT / HMRC).",
        btn_accept: "Accept and Enter",
        disclaimer: "The calculation is indicative and the real result may vary according to each country's tax agency",
        holiday_label: "Prorated Holiday Pay",
        holiday_res: "Holiday Pay",
        consent_text: "By using Paynomnet, you agree to our <a href='terms.html' target='_blank'>Terms</a> and <a href='privacy.html' target='_blank'>Privacy Policy</a>. We use third-party cookies (Google) for analytics and ads. Calculations are <strong>guidance estimates</strong>.",
        consent_btn_all: "Accept All",
        consent_btn_min: "Only Necessary",
        options: {
            common: "Common",
            single: "Single",
            married: "Married",
            prorated: "Prorated",
            no_prorated: "Not Prorated",
            unfair: "Unfair Dismissal (33 days)",
            objective: "Objective Dismissal (20 days)",
            indefinite: "Indefinite",
            temporary: "Temporary",
            standard: "Standard",
            reduced: "Reduced Rate",
            over_pension: "Over Pension Age",
            apprentice: "Apprentice",
            deferred: "Deferred",
            under_21: "Under 21",
            veterans: "Veterans",
            cal_month: "Calendar Month",
            four_weeks: "4 Weeks",
            before_tax: "Before Tax",
            after_tax: "After Tax",
            taxed: "Taxed",
            net_paid: "Net Paid",
            other_manual: "Other / Manual...",
            none: "None",
            ewni: "England / Wales / NI",
            scotland: "Scotland",
            job1: "1 Job",
            jobs2plus: "2+ Jobs"
        },
        placeholders: {
            email: "Email (Admin)",
            sp_annual: "e.g. 24000",
            sp_monthly: "e.g. 2000",
            sp_hourly_price: "e.g. 12",
            sp_hourly_hours: "e.g. 160",
            sp_inverse: "e.g. 1800",
            sp_dismissal_sal: "e.g. 2000 or 24000",
            sp_dismissal_years: "e.g. 3.5",
            manual_irpf: "e.g. 15",
            optional: "Optional",
            uk_annual: "e.g. 35000",
            uk_monthly: "e.g. 2800",
            uk_hourly_rate: "e.g. 15",
            uk_hourly_hours: "e.g. 37.5",
            uk_inverse: "e.g. 2200",
            uk_taxcode_manual: "e.g. S1257L"
        },
        labels: {
            privacidad: "Privacy",
            terminos: "Terms",
            hijos: "Children",
            hijo_dis: "Disabled Child",
            others: "Dependents",
            otro_dis: "Disabled Dependent",
            otro_75: "Over 75 years old",
            otro_dis_count: "How many disabled?",
            otro_75_count: "How many over 75?",
            tu_dis: "Your Disability",
            comunidad: "Region",
            pagadores: "Employers",
            civil: "Marital Status",
            conjunta: "Joint Declaration",
            bruto_anual: "Annual Base Salary (€)",
            n_pagas: "Number of Payments",
            pagas_totales: "Total Payments (Contract)",
            pagas_prorrateadas: "Prorated Payments (Monthly)",
            bruto_mensual: "Monthly Base Salary (€)",
            pagas_extras: "Extra Payments",
            precio_hora: "Hourly Rate (€)",
            horas_mes: "Hours per Month",
            neto_obj: "Target Monthly Net (€)",
            despido_sal: "Salary (Monthly or Annual)",
            despido_anos: "Years Worked",
            despido_tipo: "Dismissal Type",
            tipo_contrato: "Contract Type",
            adv_config: "Advanced Config (PRO)",
            irpf_manual: "Manual IRPF (%)",
            base_manual: "Manual Base (€/mo)",
            antiguedad: "Longevity / Trienios (€/mo)",
            otros_imp: "Other Deductions (€/mo)",
            bonus_a: "Bonus A (€/mo)",
            bonus_b: "Bonus B (€/mo)",
            ot_hours: "Overtime Hours",
            ot_price: "Overtime Rate",
            hijo_dis_count: "How many children?",
            cotiza: "Taxable",
            tax_region: "Tax Region",
            ni_cat: "NI Category",
            gross_annual: "Gross Annual Salary (£)",
            pay_periods: "Pay Periods",
            gross_monthly: "Monthly Gross Pay (£)",
            hourly_rate: "Hourly Rate (£)",
            hours_week: "Hours per WEEK",
            hours_month: "Hours per MONTH",
            mon_calc: "Cálculo de Horas Mensuales",
            weekly_ot: "Horas Extra (Semanal)",
            monthly_ot: "Horas Extra (Mensual)",
            ot_rate: "Precio Hora Extra (£)",
            target_net: "Neto Mensual Objetivo (£)",
            current_age: "Current Age",
            years_service: "Years of Service",
            weekly_pay: "Weekly Pay (£)",
            jobs: "Jobs",
            tax_code: "Tax Code",
            pension_perc: "Pension (%)",
            benefits_bik: "Benefits (BIK)",
            student_loan: "Student Loan",
            postgrad_loan: "Postgraduate Loan"
        },
        help: {
            mode_annual: "Enter your annual base salary. The app will calculate your monthly take-home pay based on your contract's payment structure and taxes.",
            mode_monthly: "Enter your gross monthly base salary. You can configure how many extra payments you have per year and how many are prorated monthly.",
            mode_hourly: "Ideal for hourly work. Calculates projected annual gross and extracts monthly taxes.",
            mode_inverse: "Tell us how much you want to earn 'clean' per month and we'll tell you the base gross salary you should negotiate.",
            mode_dismissal: "Calculates legal redundancy pay based on days per year and time worked.",
            children: "Number of children living with you. If any have a disability, enable the toggle to apply additional tax relief.",
            others: "Parents or grandparents living with you. Specifying if they are over 75 or have a disability can significantly increase your net pay.",
            disability: "Your personal degree of disability affects the tax-free personal allowance. Select 'None' if you don't have an official resolution.",
            multipayer: "Enable if you've had more than one employer during the year. This lowers the tax-free limit and usually increases income tax withholding.",
            joint: "For married couples, a joint declaration can sometimes provide an additional reduction in taxable income.",
            pagas: "Configure your contract: choose total payments (12-16) and how many extra payments are spread across your monthly paychecks.",
            contract: "Temporary contracts have slightly different social security contributions for unemployment.",
            manual_irpf: "Use this field only if you want to override the automatic tax calculation with a fixed percentage you already know from your payslip.",
            custom_base: "Define specific contribution bases. Useful if your social security base doesn't match your gross salary due to caps or exempt items.",
            extra_tax: "Add specific deductions from your net pay: union fees, private health insurance, or voluntary contributions.",
            antiguedad: "Monthly amount for longevity or seniority. It's added to your base salary and projected across all contract payments.",
            ot_hours: "Number of overtime hours worked. Normal overtime is subject to reduced social security and regular income tax.",
            ot_price: "The gross price you receive for each overtime hour according to your contract or collective agreement.",
            bonus: "Monthly bonuses (transport, bonus, goals). For each one, you can decide if it's subject to social security, unemployment, or income tax.",
            rates: "Technical adjustment of contribution percentages. Don't change them unless your sector has special rates.",
            uk_periods: "Usually 12 months, but some contracts use 4-week (13/yr) or weekly (52) cycles.",
            uk_bik: "Non-cash benefits like company car, medical insurance, etc. (P11D).",
            uk_pension: "Your pension contribution. Can be before tax (Salary Sacrifice) or after.",
            uk_taxcode: "Your tax code (e.g., 1257L). Determines your personal allowance.",
            uk_ni_letter: "Most employees use category A. Affects your NI contributions.",
            uk_bonus: "Additional bonuses. Indicate if the amount is gross or net.",
            uk_jobs: "If you have multiple jobs, your allowance usually applies to the main one.",
            uk_inverse: "Enter desired monthly take-home to calculate equivalent annual gross.",
            uk_redundancy: "UK Statutory Redundancy Pay calculation.",
            uk_hourly_base: "Define how to convert weekly hours to monthly (Avg Year vs 4-Week blocks)."
        }
    }
};

/* ==========================================================================
   2. INICIALIZACIÓN Y EVENTOS UI
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    checkTC();
    checkConsent();
    initApp();
    setupEventListeners();
    updateUITranslations();
    updatePagasUI();

    // Activar modo PRO automáticamente para fase de pruebas
    activatePro();
});

function checkConsent() {
    const consented = localStorage.getItem('user_consent_accepted');
    if (!consented) {
        setTimeout(() => {
            getEl('consent-banner').classList.add('visible');
        }, 1000);
    }
}

// Función "Puente" para integración nativa (Google Play / Android)
window.setProStatus = function(isPremium) {
    if (isPremium) {
        activatePro("Suscripción de Google Play activada");
        localStorage.setItem('user_is_pro', 'true');
    } else {
        appState.isPro = false;
        localStorage.removeItem('user_is_pro');
        location.reload(); // Recargar para limpiar funciones PRO
    }
};

function getEl(id) { return document.getElementById(id); }

function checkTC() {
    const accepted = localStorage.getItem('payroll_tc_accepted');
    if (!accepted) {
        getEl('welcome-modal').classList.remove('hidden');
    }
}

function initApp() {
    // Detectar idioma del sistema
    const sysLang = navigator.language.split('-')[0];
    if (sysLang === 'en') appState.language = 'en';
    getEl('lang-select').value = appState.language;

    // Load defaults (Spain active)
    resetToDefaultMode();
}

function setupEventListeners() {
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
        if (e.target.checked) {
            document.body.classList.add('theme-dark');
            document.body.classList.remove('theme-light');
        } else {
            document.body.classList.add('theme-light');
            document.body.classList.remove('theme-dark');
        }
    });

    getEl('lang-select')?.addEventListener('change', (e) => {
        appState.language = e.target.value;
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
        // Opcional: Desactivar Analytics si es posible
        window['ga-disable-G-031G1V1F9J'] = true;
    });

    // Botón Calcular
    getEl('btn-calculate')?.addEventListener('click', () => {
        if ((appState.mode === 'inverse' || appState.mode === 'dismissal') && !appState.isPro) {
            alert(i18n[appState.language].pro_alert);
            return;
        }

        appState.adClickCount++;
        getEl('results-section')?.classList.remove('hidden');
        getEl('results-section')?.scrollIntoView({ behavior: 'smooth' });
        getEl('results-content')?.classList.add('hidden');
        getEl('results-loader')?.classList.remove('hidden');

        // Mostrar banner de publicidad si existe y no es PRO
        const adBanner = getEl('ad-banner-bottom');
        if (adBanner && !appState.isPro) {
            adBanner.style.display = 'block';
        }

        const shouldShowInterstitial = (appState.adClickCount % 2 === 0) && !appState.isPro && appState.adClickCount > 0;

        if (shouldShowInterstitial) {
            // Intentar mostrar anuncio intersticial si está disponible (vía AdMob/AdSense)
            if (window.adsbygoogle && typeof window.adsbygoogle.push === 'function') {
                try {
                    // Nota: En web/TWA el intersticial se gestiona por AdSense/AdMob Auto-ads o manual
                    // Para disparar uno manual en web se suele usar la API de H5 Games o similares,
                    // pero aquí usaremos el retraso simulado para dar tiempo a la carga.
                    console.log("Mostrando anuncio Intersticial...");
                } catch(e) { console.error("Error al cargar anuncio:", e); }
            }
            setTimeout(() => processCalculation(), 2000);
        } else {
            setTimeout(processCalculation, 600);
        }
    });
}

function setCountry(c) {
    appState.country = c;
    document.querySelectorAll('.btn-country').forEach(b => b.classList.remove('active'));
    getEl(`btn-${c}`).classList.add('active');

    document.querySelectorAll('.country-module').forEach(m => m.classList.add('hidden'));
    getEl(`module-${c}`).classList.remove('hidden');

    resetToDefaultMode();
    updateUITranslations();
}

function setMode(m) {
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

/* ==========================================================================
   3. LOGICA DE TOGGLES ESPECÍFICOS
   ========================================================================== */
window.setSpainPagas = function(val) {
    appState.spToggles.pagas = parseInt(val);
    // Reset prorrateadas if they exceed new max
    const maxProrrated = appState.spToggles.pagas - 12;
    if (appState.spToggles.pagas_prorrateadas > maxProrrated) {
        appState.spToggles.pagas_prorrateadas = 0;
    }
    updatePagasUI();
};

window.setSpainProrrateadas = function(val) {
    appState.spToggles.pagas_prorrateadas = parseInt(val);
    updatePagasUI();
};

function updatePagasUI() {
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
                    btn.onclick = () => setSpainProrrateadas(i);
                    list.appendChild(btn);
                }
            }
        }
    });
}

window.toggleRatesConfig = function() {
    getEl('sp-rates-config').classList.toggle('hidden');
};

window.toggleBasesConfig = function() {
    getEl('sp-bases-config').classList.toggle('hidden');
};

window.addExtraItem = function(country, type, suffix) {
    if (country === 'sp') {
        if (type === 'bonus') {
            const id = Date.now();
            appState.spToggles.dynamicBonus.push({ id, amount: 0, irpf: true, ss: true, unemployment: true });
        } else if (type === 'ot') {
            const id = Date.now();
            appState.spToggles.dynamicOT.push({ id, amount: 0, suffix });
        } else if (type === 'deduction') {
            const id = Date.now();
            appState.spToggles.dynamicDeductions.push({ id, amount: 0 });
        }
        renderDynamicLists();
    }
};

window.removeExtraItem = function(type, id) {
    if (type === 'bonus') {
        appState.spToggles.dynamicBonus = appState.spToggles.dynamicBonus.filter(b => b.id !== id);
    } else if (type === 'deduction') {
        appState.spToggles.dynamicDeductions = appState.spToggles.dynamicDeductions.filter(d => d.id !== id);
    } else {
        appState.spToggles.dynamicOT = appState.spToggles.dynamicOT.filter(o => o.id !== id);
    }
    renderDynamicLists();
};

function renderDynamicLists() {
    // 1. Bonus List
    const bonusList = getEl('sp-bonus-dynamic-list');
    if (bonusList) {
        bonusList.innerHTML = '';
        appState.spToggles.dynamicBonus.forEach(b => {
            const div = document.createElement('div');
            div.style = "background: rgba(255,255,255,0.5); padding: 10px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #eee;";
            div.innerHTML = `
                <div style="display:flex; gap:10px; margin-bottom:5px;">
                    <input type="number" class="input-field" style="flex:1; padding:5px;" placeholder="Importe" value="${b.amount}" onchange="updateBonusVal(${b.id}, 'amount', this.value)">
                    <button class="btn-danger" style="width:30px; padding:0;" onclick="removeExtraItem('bonus', ${b.id})">×</button>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:5px; font-size:10px;">
                    <label><input type="checkbox" ${b.irpf ? 'checked' : ''} onchange="updateBonusVal(${b.id}, 'irpf', this.checked)"> IRPF</label>
                    <label><input type="checkbox" ${b.ss ? 'checked' : ''} onchange="updateBonusVal(${b.id}, 'ss', this.checked)"> SS</label>
                    <label><input type="checkbox" ${b.unemployment ? 'checked' : ''} onchange="updateBonusVal(${b.id}, 'unemployment', this.checked)"> Paro</label>
                </div>
            `;
            bonusList.appendChild(div);
        });
    }

    // 2. OT List
    const suffixes = ['ann', 'mon', 'hou', 'inv'];
    suffixes.forEach(s => {
        const otList = getEl(`sp-extra-ot-list-${s}`);
        if (otList) {
            otList.innerHTML = '';
            appState.spToggles.dynamicOT.filter(o => o.suffix === s).forEach(o => {
                const div = document.createElement('div');
                div.style = "display:flex; gap:10px; margin-top:5px;";
                div.innerHTML = `
                    <input type="number" class="input-field" style="flex:1; padding:5px;" placeholder="Plus extra" value="${o.amount}" onchange="updateOTVal(${o.id}, this.value)">
                    <button class="btn-danger" style="width:30px; padding:0;" onclick="removeExtraItem('ot', ${o.id})">×</button>
                `;
                otList.appendChild(div);
            });
        }
    });

    // 3. Deductions List
    const deductionsList = getEl('sp-deductions-dynamic-list');
    if (deductionsList) {
        deductionsList.innerHTML = '';
        appState.spToggles.dynamicDeductions.forEach(d => {
            const div = document.createElement('div');
            div.style = "display:flex; gap:10px; margin-top:5px;";
            div.innerHTML = `
                <input type="number" class="input-field" style="flex:1; padding:5px;" placeholder="Importe deducción" value="${d.amount}" onchange="updateDeductionVal(${d.id}, this.value)">
                <button class="btn-danger" style="width:30px; padding:0;" onclick="removeExtraItem('deduction', ${d.id})">×</button>
            `;
            deductionsList.appendChild(div);
        });
    }
}

window.updateBonusVal = function(id, key, val) {
    const b = appState.spToggles.dynamicBonus.find(x => x.id === id);
    if (b) b[key] = key === 'amount' ? parseFloat(val) : val;
};

window.updateOTVal = function(id, val) {
    const o = appState.spToggles.dynamicOT.find(x => x.id === id);
    if (o) o.amount = parseFloat(val);
};

window.updateDeductionVal = function(id, val) {
    const d = appState.spToggles.dynamicDeductions.find(x => x.id === id);
    if (d) d.amount = parseFloat(val);
};

window.toggleHelp = function(id) {
    // Detener la propagación para evitar activar clics en contenedores padre
    if (window.event) window.event.stopPropagation();

    const el = getEl(id);
    if (el) el.classList.toggle('visible');
};

window.setSpainToggle = function(key, val) {
    appState.spToggles[key] = val;
    const parent = event.target.parentNode;
    parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    if (key === 'civil') {
        getEl('wrapper-sp-conjunta').classList.toggle('hidden', val !== 'married');
    }
};

window.setUKToggle = function(key, val) {
    appState.ukToggles[key] = val;
    const parent = event.target.parentNode;
    parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
};

window.setUKPeriods = function(mode, val) {
    appState.ukPeriods[mode] = val;
    const parent = event.target.parentNode;
    parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
};

window.setHourlyType = function(country, type) {
    if (country === 'uk') {
        appState.ukHourlyFreq = type;
        getEl('uk-hourly-monthly-config').style.display = type === 'monthly' ? 'block' : 'none';
        updateUITranslations();
    }
};

function updateUITranslations() {
    const lang = i18n[appState.language];
    document.title = lang.page_title;
    getEl('title-en')?.classList.toggle('hidden', appState.language !== 'en');
    getEl('title-es')?.classList.toggle('hidden', appState.language !== 'es');

    // Modal
    if (getEl('tc-title')) getEl('tc-title').textContent = lang.tc_title;
    if (getEl('tc-text')) getEl('tc-text').innerHTML = lang.tc_text;
    if (getEl('btn-accept-tc')) getEl('btn-accept-tc').textContent = lang.btn_accept;

    // Disclaimer
    const disc = document.querySelector('.legal-disclaimer');
    if (disc) disc.textContent = lang.disclaimer;

    // Labels del menú
    getEl('menu-settings-label').textContent = lang.settings;
    getEl('dark-mode-label').textContent = lang.dark_mode;
    getEl('lang-label').textContent = lang.language;
    getEl('btn-become-pro').textContent = lang.activate_pro;
    getEl('pro-active-title').textContent = lang.pro_active;
    getEl('btn-undo-pro').textContent = lang.logout_pro;
    getEl('auth-title').textContent = lang.auth_title;
    getEl('btn-login').textContent = lang.login;
    getEl('link-privacy').textContent = lang.labels.privacidad;
    getEl('link-terms').textContent = lang.labels.terminos;
    getEl('auth-email').placeholder = lang.placeholders.email;

    // Sección País / Modo
    getEl('country-label').textContent = lang.country_label;
    getEl('mode-label').textContent = lang.mode_label;
    getEl('btn-spain').textContent = lang.spain;
    getEl('btn-uk').textContent = lang.uk;
    getEl('mode-ann-text').textContent = lang.anual;
    getEl('mode-mon-text').textContent = lang.mensual;
    getEl('mode-hou-text').textContent = lang.horas;
    getEl('mode-inv-text').textContent = lang.inverse;
    getEl('mode-dis-text').textContent = lang.despido;

    // España labels
    if (getEl('sp-hijos-label')) getEl('sp-hijos-label').firstChild.textContent = lang.labels.hijos + " ";
    if (getEl('sp-hijo-dis-label')) getEl('sp-hijo-dis-label').textContent = lang.labels.hijo_dis;
    if (getEl('sp-otros-label')) getEl('sp-otros-label').firstChild.textContent = lang.labels.otros + " ";
    if (getEl('sp-otro-dis-label')) getEl('sp-otro-dis-label').textContent = lang.labels.otro_dis;
    if (getEl('sp-otro-75-label')) getEl('sp-otro-75-label').textContent = lang.labels.otro_75;
    if (getEl('sp-otro-dis-count-label')) getEl('sp-otro-dis-count-label').textContent = lang.labels.otro_dis_count;
    if (getEl('sp-otro-75-count-label')) getEl('sp-otro-75-count-label').textContent = lang.labels.otro_75_count;
    if (getEl('sp-tu-dis-label')) getEl('sp-tu-dis-label').firstChild.textContent = lang.labels.tu_dis + " ";
    if (getEl('btn-dis-none')) getEl('btn-dis-none').textContent = appState.language === 'es' ? 'No' : 'None';
    if (getEl('sp-comunidad-label')) getEl('sp-comunidad-label').textContent = lang.labels.comunidad;
    if (getEl('opt-sp-comun')) getEl('opt-sp-comun').textContent = lang.options.common;
    if (getEl('sp-pagadores-label')) getEl('sp-pagadores-label').firstChild.textContent = lang.labels.pagadores + " ";
    if (getEl('sp-civil-label')) getEl('sp-civil-label').textContent = lang.labels.civil;
    if (getEl('btn-civil-single')) getEl('btn-civil-single').textContent = lang.options.single;
    if (getEl('btn-civil-married')) getEl('btn-civil-married').textContent = lang.options.married;
    if (getEl('sp-conjunta-label')) getEl('sp-conjunta-label').firstChild.textContent = lang.labels.conjunta + " ";
    if (getEl('sp-anual-bruto-label')) getEl('sp-anual-bruto-label').textContent = lang.labels.bruto_anual;
    if (getEl('sp-pagas-tot-label')) getEl('sp-pagas-tot-label').firstChild.textContent = lang.labels.pagas_totales + " ";
    if (getEl('sp-pagas-pro-label')) getEl('sp-pagas-pro-label').textContent = lang.labels.pagas_prorrateadas;
    if (getEl('sp-pagas-tot-label-mon')) getEl('sp-pagas-tot-label-mon').textContent = lang.labels.pagas_totales;
    if (getEl('sp-pagas-pro-label-mon')) getEl('sp-pagas-pro-label-mon').textContent = lang.labels.pagas_prorrateadas;
    if (getEl('sp-pagas-tot-label-hou')) getEl('sp-pagas-tot-label-hou').textContent = lang.labels.pagas_totales;
    if (getEl('sp-pagas-pro-label-hou')) getEl('sp-pagas-pro-label-hou').textContent = lang.labels.pagas_prorrateadas;
    if (getEl('sp-pagas-tot-label-inv')) getEl('sp-pagas-tot-label-inv').textContent = lang.labels.pagas_totales;
    if (getEl('sp-pagas-pro-label-inv')) getEl('sp-pagas-pro-label-inv').textContent = lang.labels.pagas_prorrateadas;

    if (getEl('sp-mensual-bruto-label')) getEl('sp-mensual-bruto-label').textContent = lang.labels.bruto_mensual;
    if (getEl('sp-hora-precio-label')) getEl('sp-hora-precio-label').textContent = lang.labels.precio_hora;
    if (getEl('sp-hora-horas-label')) getEl('sp-hora-horas-label').textContent = lang.labels.horas_mes;
    if (getEl('sp-inverso-neto-label')) getEl('sp-inverso-neto-label').textContent = lang.labels.neto_obj;
    if (getEl('sp-despido-salario-label')) getEl('sp-despido-salario-label').textContent = lang.labels.despido_sal;
    if (getEl('sp-despido-anos-label')) getEl('sp-despido-anos-label').textContent = lang.labels.despido_anos;
    if (getEl('sp-despido-tipo-label')) getEl('sp-despido-tipo-label').textContent = lang.labels.despido_tipo;
    if (getEl('opt-unfair')) getEl('opt-unfair').textContent = lang.options.unfair;
    if (getEl('opt-objective')) getEl('opt-objective').textContent = lang.options.objective;
    if (getEl('sp-tipo-cont-label')) getEl('sp-tipo-cont-label').firstChild.textContent = lang.labels.tipo_contrato + " ";
    if (getEl('btn-cont-indef')) getEl('btn-cont-indef').textContent = lang.options.indefinite;
    if (getEl('btn-cont-temp')) getEl('btn-cont-temp').textContent = lang.options.temporary;
    if (getEl('sp-advanced-label')) getEl('sp-advanced-label').textContent = lang.labels.adv_config;
    if (getEl('sp-irpf-manual-label')) getEl('sp-irpf-manual-label').firstChild.textContent = lang.labels.irpf_manual + " ";
    if (getEl('sp-base-manual-label')) getEl('sp-base-manual-label').firstChild.textContent = lang.labels.base_manual + " ";
    if (getEl('sp-antiguedad-label')) getEl('sp-antiguedad-label').textContent = lang.labels.antiguedad;
    if (getEl('sp-otros-imp-label')) getEl('sp-otros-imp-label').firstChild.textContent = lang.labels.otros_imp + " ";
    if (getEl('sp-bonus-a-label')) getEl('sp-bonus-a-label').firstChild.textContent = lang.labels.bonus_a + " ";
    if (getEl('sp-bonus-b-label')) getEl('sp-bonus-b-label').textContent = lang.labels.bonus_b;
    if (getEl('sp-horas-extra-label')) getEl('sp-horas-extra-label').textContent = lang.labels.ot_hours;
    if (getEl('sp-precio-extra-label')) getEl('sp-precio-extra-label').textContent = lang.labels.ot_price;
    if (getEl('sp-horas-extra-label-ann')) getEl('sp-horas-extra-label-ann').textContent = lang.labels.ot_hours;
    if (getEl('sp-precio-extra-label-ann')) getEl('sp-precio-extra-label-ann').textContent = lang.labels.ot_price;
    if (getEl('sp-horas-extra-label-mon')) getEl('sp-horas-extra-label-mon').textContent = lang.labels.ot_hours;
    if (getEl('sp-precio-extra-label-mon')) getEl('sp-precio-extra-label-mon').textContent = lang.labels.ot_price;
    if (getEl('sp-horas-extra-label-hou')) getEl('sp-horas-extra-label-hou').textContent = lang.labels.ot_hours;
    if (getEl('sp-precio-extra-label-hou')) getEl('sp-precio-extra-label-hou').textContent = lang.labels.ot_price;
    if (getEl('sp-horas-extra-label-inv')) getEl('sp-horas-extra-label-inv').textContent = lang.labels.ot_hours;
    if (getEl('sp-precio-extra-label-inv')) getEl('sp-precio-extra-label-inv').textContent = lang.labels.ot_price;
    if (getEl('uk-horas-extra-label-ann')) getEl('uk-horas-extra-label-ann').textContent = lang.labels.monthly_ot;
    if (getEl('uk-precio-extra-label-ann')) getEl('uk-precio-extra-label-ann').textContent = lang.labels.ot_rate;
    if (getEl('uk-horas-extra-label-mon')) getEl('uk-horas-extra-label-mon').textContent = lang.labels.monthly_ot;
    if (getEl('uk-precio-extra-label-mon')) getEl('uk-precio-extra-label-mon').textContent = lang.labels.ot_rate;
    if (getEl('uk-horas-extra-label-hou')) getEl('uk-horas-extra-label-hou').textContent = appState.ukHourlyFreq === 'weekly' ? lang.labels.weekly_ot : lang.labels.monthly_ot;
    if (getEl('uk-precio-extra-label-hou')) getEl('uk-precio-extra-label-hou').textContent = lang.labels.ot_rate;
    if (getEl('uk-horas-extra-label-inv')) getEl('uk-horas-extra-label-inv').textContent = lang.labels.monthly_ot;
    if (getEl('uk-precio-extra-label-inv')) getEl('uk-precio-extra-label-inv').textContent = lang.labels.ot_rate;
    if (getEl('sp-hijo-dis-count-label')) getEl('sp-hijo-dis-count-label').textContent = lang.labels.hijo_dis_count;
    if (getEl('sp-cotiza-a-label')) getEl('sp-cotiza-a-label').textContent = lang.labels.cotiza;
    if (getEl('sp-cotiza-b-label')) getEl('sp-cotiza-b-label').textContent = lang.labels.cotiza;
    if (getEl('sp-holiday-label')) getEl('sp-holiday-label').textContent = lang.holiday_label;

    // España placeholders
    if (getEl('sp-annual-gross')) getEl('sp-annual-gross').placeholder = lang.placeholders.sp_annual;
    if (getEl('sp-monthly-gross')) getEl('sp-monthly-gross').placeholder = lang.placeholders.sp_monthly;
    if (getEl('sp-hourly-price')) getEl('sp-hourly-price').placeholder = lang.placeholders.sp_hourly_price;
    if (getEl('sp-hourly-hours')) getEl('sp-hourly-hours').placeholder = lang.placeholders.sp_hourly_hours;
    if (getEl('sp-inverse-net')) getEl('sp-inverse-net').placeholder = lang.placeholders.sp_inverse;
    if (getEl('sp-dismissal-salary')) getEl('sp-dismissal-salary').placeholder = lang.placeholders.sp_dismissal_sal;
    if (getEl('sp-dismissal-years')) getEl('sp-dismissal-years').placeholder = lang.placeholders.sp_dismissal_years;
    if (getEl('sp-irpf-manual')) getEl('sp-irpf-manual').placeholder = lang.placeholders.manual_irpf;
    if (getEl('sp-pro-custom-base')) getEl('sp-pro-custom-base').placeholder = lang.placeholders.optional;

    // UK labels
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
    if (getEl('uk-anual-bruto-label')) getEl('uk-anual-bruto-label').textContent = lang.labels.gross_annual;
    if (getEl('uk-pay-periods-label')) getEl('uk-pay-periods-label').firstChild.textContent = lang.labels.pay_periods + " ";
    if (getEl('uk-mensual-bruto-label')) getEl('uk-mensual-bruto-label').textContent = lang.labels.gross_monthly;
    if (getEl('uk-pay-periods-mon-label')) getEl('uk-pay-periods-mon-label').firstChild.textContent = lang.labels.pay_periods + " ";
    if (getEl('btn-uk-weekly')) getEl('btn-uk-weekly').textContent = lang.semanal;
    if (getEl('btn-uk-monthly')) getEl('btn-uk-monthly').textContent = lang.mensual;
    if (getEl('uk-hora-precio-label')) getEl('uk-hora-precio-label').textContent = lang.labels.hourly_rate;
    if (getEl('lbl-uk-hourly-hours')) getEl('lbl-uk-hourly-hours').textContent = appState.ukHourlyFreq === 'weekly' ? lang.labels.hours_week : lang.labels.hours_month;
    if (getEl('uk-mon-calc-label')) getEl('uk-mon-calc-label').firstChild.textContent = lang.labels.mon_calc + " ";
    if (getEl('btn-uk-cal-month')) getEl('btn-uk-cal-month').textContent = lang.options.cal_month;
    if (getEl('btn-uk-4weeks')) getEl('btn-uk-4weeks').textContent = lang.options.four_weeks;
    if (getEl('uk-horas-extra-label-ann')) getEl('uk-horas-extra-label-ann').textContent = lang.labels.monthly_ot;
    if (getEl('uk-precio-extra-label-ann')) getEl('uk-precio-extra-label-ann').textContent = lang.labels.ot_rate;
    if (getEl('uk-horas-extra-label-mon')) getEl('uk-horas-extra-label-mon').textContent = lang.labels.monthly_ot;
    if (getEl('uk-precio-extra-label-mon')) getEl('uk-precio-extra-label-mon').textContent = lang.labels.ot_rate;
    if (getEl('uk-horas-extra-label-hou')) getEl('uk-horas-extra-label-hou').textContent = appState.ukHourlyFreq === 'weekly' ? lang.labels.weekly_ot : lang.labels.monthly_ot;
    if (getEl('uk-precio-extra-label-hou')) getEl('uk-precio-extra-label-hou').textContent = lang.labels.ot_rate;
    if (getEl('uk-horas-extra-label-inv')) getEl('uk-horas-extra-label-inv').textContent = lang.labels.monthly_ot;
    if (getEl('uk-precio-extra-label-inv')) getEl('uk-precio-extra-label-inv').textContent = lang.labels.ot_rate;
    if (getEl('uk-inverso-neto-label')) getEl('uk-inverso-neto-label').firstChild.textContent = lang.labels.target_net + " ";
    if (getEl('uk-despido-edad-label')) getEl('uk-despido-edad-label').firstChild.textContent = lang.labels.current_age + " ";
    if (getEl('uk-despido-anos-label')) getEl('uk-despido-anos-label').textContent = lang.labels.years_service;
    if (getEl('uk-despido-semana-label')) getEl('uk-despido-semana-label').textContent = lang.labels.weekly_pay;
    if (getEl('uk-advanced-label')) getEl('uk-advanced-label').textContent = lang.labels.adv_config;
    if (getEl('uk-jobs-label')) getEl('uk-jobs-label').firstChild.textContent = lang.labels.jobs + " ";
    if (getEl('btn-uk-1job')) getEl('btn-uk-1job').textContent = lang.options.job1;
    if (getEl('btn-uk-2jobs')) getEl('btn-uk-2jobs').textContent = lang.options.jobs2plus;
    if (getEl('uk-tax-code-label')) getEl('uk-tax-code-label').firstChild.textContent = lang.labels.tax_code + " ";
    if (getEl('opt-uk-custom-code')) getEl('opt-uk-custom-code').textContent = lang.options.other_manual;
    if (getEl('uk-pension-label')) getEl('uk-pension-label').firstChild.textContent = lang.labels.pension_perc + " ";
    if (getEl('btn-uk-pension-before')) getEl('btn-uk-pension-before').textContent = lang.options.before_tax;
    if (getEl('btn-uk-pension-after')) getEl('btn-uk-pension-after').textContent = lang.options.after_tax;
    if (getEl('uk-bik-label')) getEl('uk-bik-label').firstChild.textContent = lang.labels.benefits_bik + " ";
    if (getEl('uk-bonus-a-label')) getEl('uk-bonus-a-label').firstChild.textContent = lang.labels.bonus_a + " ";
    if (getEl('btn-uk-bonus-a-taxed')) getEl('btn-uk-bonus-a-taxed').textContent = lang.options.taxed;
    if (getEl('btn-uk-bonus-a-net')) getEl('btn-uk-bonus-a-net').textContent = lang.options.net_paid;
    if (getEl('uk-bonus-b-label')) getEl('uk-bonus-b-label').textContent = lang.labels.bonus_b;
    if (getEl('btn-uk-bonus-b-taxed')) getEl('btn-uk-bonus-b-taxed').textContent = lang.options.taxed;
    if (getEl('btn-uk-bonus-b-net')) getEl('btn-uk-bonus-b-net').textContent = lang.options.net_paid;
    if (getEl('uk-stud-loan-label')) getEl('uk-stud-loan-label').textContent = lang.labels.student_loan;
    if (getEl('opt-uk-sl-none')) getEl('opt-uk-sl-none').textContent = lang.options.none;
    if (getEl('uk-postgrad-label')) getEl('uk-postgrad-label').textContent = lang.labels.postgrad_loan;
    if (getEl('uk-holiday-label')) getEl('uk-holiday-label').textContent = lang.holiday_label;

    // Consent Banner
    if (getEl('consent-text-content')) getEl('consent-text-content').innerHTML = lang.consent_text;
    if (getEl('btn-accept-consent')) getEl('btn-accept-consent').textContent = lang.consent_btn_all;
    if (getEl('btn-reject-consent')) getEl('btn-reject-consent').textContent = lang.consent_btn_min;

    // UK placeholders
    if (getEl('uk-annual-gross')) getEl('uk-annual-gross').placeholder = lang.placeholders.uk_annual;
    if (getEl('uk-monthly-gross')) getEl('uk-monthly-gross').placeholder = lang.placeholders.uk_monthly;
    if (getEl('uk-hourly-rate')) getEl('uk-hourly-rate').placeholder = lang.placeholders.uk_hourly_rate;
    if (getEl('uk-hourly-hours')) getEl('uk-hourly-hours').placeholder = lang.placeholders.uk_hourly_hours;
    if (getEl('uk-inverse-net')) getEl('uk-inverse-net').placeholder = lang.placeholders.uk_inverse;
    if (getEl('uk-pro-taxcode-manual')) getEl('uk-pro-taxcode-manual').placeholder = lang.placeholders.uk_taxcode_manual;

    // Calcular botón
    getEl('btn-calculate').textContent = lang.calc;
    getEl('results-title-label').textContent = lang.results_label;
    if (getEl('label-net-total')) getEl('label-net-total').textContent = lang.net_result_label;
    document.querySelectorAll('.legal-disclaimer').forEach(el => el.textContent = lang.disclaimer);

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
        'h-mode-annual': lang.help.mode_annual,
        'h-mode-monthly': lang.help.mode_monthly,
        'h-mode-hourly': lang.help.mode_hourly,
        'h-mode-inverse': lang.help.mode_inverse,
        'h-mode-dismissal': lang.help.mode_dismissal,
        'h-uk-hourly-base': lang.help.uk_hourly_base
    };

    for (let id in helpNotes) {
        const el = getEl(id);
        if (el) el.textContent = helpNotes[id];
    }
}

function resetToDefaultMode() {
    const btn = document.getElementById('btn-mode-annual');
    if (btn) btn.click();
}

function processCalculation() {
    getEl('results-loader')?.classList.add('hidden');
    getEl('results-content')?.classList.remove('hidden');
    const list = getEl('results-list');
    if (list) list.innerHTML = '';
    const lang = i18n[appState.language];
    const label = getEl('label-net-total');
    if (label) label.textContent = appState.mode === 'inverse' ? lang.bruto_result_label : lang.net_result_label;

    if (appState.country === 'spain') calculateSpain();
    else if (appState.country === 'uk') calculateUK();
}

/* ==========================================================================
   5. MOTOR ESPAÑA (ABRIL 2026)
   ========================================================================== */
function calculateSpain() {
    const lang = i18n[appState.language];
    let annualContractBase = 0; // Sueldo base puro sin extras
    const pagas = appState.spToggles.pagas;
    const prorrated = appState.spToggles.pagas_prorrateadas;

    if (appState.mode === 'annual') {
        annualContractBase = parseFloat(getEl('sp-annual-gross').value) || 0;
    } else if (appState.mode === 'monthly') {
        let mGross = parseFloat(getEl('sp-monthly-gross').value) || 0;
        annualContractBase = mGross * pagas;
    } else if (appState.mode === 'hourly') {
        let price = parseFloat(getEl('sp-hourly-price').value) || 0;
        let hoursMonth = parseFloat(getEl('sp-hourly-hours').value) || 0;
        annualContractBase = (price * hoursMonth) * 12;
    } else if (appState.mode === 'inverse') {
        calculateSpainInverse(); return;
    } else if (appState.mode === 'dismissal') {
        calculateSpainDismissal(); return;
    }

    const res = performSpainCalculations(annualContractBase, pagas);

    // --- Lógica de Visualización de Mes Normal (Precisión Contable) ---
    const basePagaBruta = annualContractBase / pagas;
    const visibleMonthlyGross = basePagaBruta + (basePagaBruta * prorrated / 12) + res.otAmountMonthly + res.netMonthlyAdditions;

    const monthlySS = res.totalSS / 12;
    const monthlyIRPF = res.totalIRPF / pagas;
    const visibleMonthlyIRPF = monthlyIRPF * (1 + prorrated / 12);

    renderResult(lang.bruto + " " + lang.mensual, visibleMonthlyGross.toFixed(2) + "€");
    if (res.holidayPayMonthly > 0) renderResult(lang.holiday_res, res.holidayPayMonthly.toFixed(2) + "€");
    if (res.otAmountMonthly > 0) renderResult(lang.ot_res, res.otAmountMonthly.toFixed(2) + "€");

    // Seguridad Social: Siempre se muestra el descuento de 1/12
    renderResult(lang.ss, "-" + monthlySS.toFixed(2) + "€");

    // IRPF: Se ajusta según el prorrateo para que el Neto cuadre
    renderResult(lang.irpf + ` (${parseFloat(res.irpfPerc).toFixed(2)}%)`, "-" + visibleMonthlyIRPF.toFixed(2) + "€");

    if (res.extraTaxMonthly > 0) renderResult(lang.other_deductions, "-" + res.extraTaxMonthly.toFixed(2) + "€");

    // Neto Visible final
    const visibleNet = visibleMonthlyGross - monthlySS - visibleMonthlyIRPF - res.extraTaxMonthly;
    getEl('net-result-value').textContent = visibleNet.toFixed(2) + "€";
}

function performSpainCalculations(annualGross, pagas) {
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
    const isMarried = appState.spToggles.civil === 'married';
    const isJoint = isMarried && getEl('sp-pro-conjunta')?.checked;
    const isTemporal = appState.spToggles.contrato === 'temp';

    // Base Salarial (Salario + Antigüedad) - Multiplica por PAGAS
    const antiguedad = parseFloat(getEl('sp-pro-antiguedad')?.value) || 0;
    const contractBaseAnnual = annualGross + (antiguedad * pagas);

    // Sistema de "Cucharas" (Buckets) para impuestos
    let bucketIRPF = contractBaseAnnual;
    let bucketSS = contractBaseAnnual;
    let bucketUnemployment = contractBaseAnnual;
    let totalGrossAnnual = contractBaseAnnual; // TODO el dinero que entra

    // Procesar Bonus Dinámicos
    appState.spToggles.dynamicBonus.forEach(b => {
        const annualAmt = b.amount * 12;
        totalGrossAnnual += annualAmt;
        if (b.irpf) bucketIRPF += annualAmt;
        if (b.ss) bucketSS += annualAmt;
        if (b.unemployment) bucketUnemployment += annualAmt;
    });

    // Procesar Horas Extras y Pluses de Horas
    const mode = appState.mode;
    const suffix = mode === 'annual' ? 'ann' : mode === 'monthly' ? 'mon' : mode === 'hourly' ? 'hou' : 'inv';
    const otHours = parseFloat(getEl(`sp-pro-overtime-hours-${suffix}`)?.value) || 0;
    const otPrice = parseFloat(getEl(`sp-pro-overtime-price-${suffix}`)?.value) || 0;
    let otAmountMonthly = otHours * otPrice;

    // Sumar pluses extra de OT
    appState.spToggles.dynamicOT.filter(o => o.suffix === suffix).forEach(o => {
        otAmountMonthly += o.amount;
    });

    const otAmountAnnual = otAmountMonthly * 12;
    totalGrossAnnual += otAmountAnnual;
    bucketIRPF += otAmountAnnual; // Las horas extra siempre tributan IRPF

    // Procesar Deducciones Dinámicas
    let dynamicDeductionsTotal = 0;
    appState.spToggles.dynamicDeductions.forEach(d => {
        dynamicDeductionsTotal += d.amount;
    });

    const holidayProrated = getEl('sp-holiday-prorated')?.checked;
    let holidayPayAnnual = 0;
    if (holidayProrated) {
        holidayPayAnnual = contractBaseAnnual * 0.0833;
        totalGrossAnnual += holidayPayAnnual;
        bucketIRPF += holidayPayAnnual;
        bucketSS += holidayPayAnnual;
        bucketUnemployment += holidayPayAnnual;
    }

    // Seguridad Social con tipos configurables
    const rateCommon = (parseFloat(getEl('sp-rate-common')?.value) || 4.7) / 100;
    const rateUnemployment = (parseFloat(getEl('sp-rate-unemployment')?.value) || (isTemporal ? 1.60 : 1.55)) / 100;
    const rateFpMei = (parseFloat(getEl('sp-rate-fp-mei')?.value) || 0.25) / 100;

    const MAX_SS_BASE_MONTHLY = 4950.00;
    const manualBaseCommon = parseFloat(getEl('sp-pro-base-common')?.value);
    const manualBaseAtEp = parseFloat(getEl('sp-pro-base-at-ep')?.value);

    let baseSSAnnual, baseUnemploymentAnnual;

    // Base Contingencias Generales
    if (!isNaN(manualBaseCommon) && manualBaseCommon > 0) {
        baseSSAnnual = manualBaseCommon * 12;
    } else {
        baseSSAnnual = Math.min(bucketSS / 12, MAX_SS_BASE_MONTHLY) * 12;
    }

    // Base AT/EP (Desempleo/FP)
    if (!isNaN(manualBaseAtEp) && manualBaseAtEp > 0) {
        baseUnemploymentAnnual = manualBaseAtEp * 12;
    } else {
        baseUnemploymentAnnual = Math.min(bucketUnemployment / 12, MAX_SS_BASE_MONTHLY) * 12;
    }

    const totalSS = (baseSSAnnual * rateCommon) +
                    (baseUnemploymentAnnual * rateUnemployment) +
                    (baseSSAnnual * rateFpMei) +
                    (otAmountAnnual * 0.047); // OT siempre cotiza al 4.7% fijo por ley

    const manualVal = getEl('sp-irpf-manual')?.value.trim();
    let irpfPerc;
    if (appState.isPro && manualVal !== "") {
        irpfPerc = parseFloat(manualVal);
        if (isNaN(irpfPerc)) irpfPerc = estimateSpainIRPF(bucketIRPF, children, childDisCount, others, otherDisCount, other75Count, region, disability, isMarried, isJoint, multipayer, totalSS);
    } else {
        irpfPerc = estimateSpainIRPF(bucketIRPF, children, childDisCount, others, otherDisCount, other75Count, region, disability, isMarried, isJoint, multipayer, totalSS);
    }

    const totalIRPF = bucketIRPF * (irpfPerc / 100);
    const netAnnual = totalGrossAnnual - totalSS - totalIRPF - (dynamicDeductionsTotal * 12);

    return { taxableAnnual: totalGrossAnnual, totalSS, totalIRPF, irpfPerc, extraTaxMonthly: dynamicDeductionsTotal, netAnnual, holidayPayMonthly: holidayPayAnnual / pagas, otAmountMonthly, netMonthlyAdditions: 0 };
}

function estimateSpainIRPF(gross, children, childDisCount, others, otherDisCount, other75Count, region, disability, isMarried, isJoint, multipayer, totalSSAnnual) {
    let allowance = 5550;
    if (disability === '33') allowance += 3000;
    else if (disability === '65') allowance += 12000;

    let mHijos = 0;
    if (children >= 1) mHijos += 2400;
    if (children >= 2) mHijos += 2700;
    if (children >= 3) mHijos += 4000;
    if (children >= 4) mHijos += 4500;
    allowance += mHijos;
    if (childDisCount > 0) allowance += (Math.min(children, childDisCount) * 3000);

    if (others > 0) {
        allowance += (others * 1150);
        if (other75Count > 0) allowance += (Math.min(others, other75Count) * 1400);
        if (otherDisCount > 0) allowance += (Math.min(others, otherDisCount) * 3000);
    }
    if (isJoint) allowance += 3400;

    // Reducción Rendimientos del Trabajo (DATOS REALES HACIENDA 2024-2026)
    let reduction = 0;
    if (gross < 14852) {
        reduction = 7302;
    } else if (gross <= 19747) {
        reduction = 7302 - (1.15 * (gross - 14852));
    }

    let minExempt = multipayer ? 12000 : 15876;
    if (gross < minExempt) return 0;

    // Base liquidable: Bruto - SS - Gastos fijos (2000) - Reduccion - Minimos
    let taxable = Math.max(0, gross - totalSSAnnual - 2000 - reduction - allowance);

    let tax = 0;
    if (taxable <= 12450) tax = taxable * 0.19;
    else if (taxable <= 20200) tax = 2365.5 + (taxable - 12450) * 0.24;
    else if (taxable <= 35200) tax = 4225.5 + (taxable - 20200) * 0.30;
    else if (taxable <= 60000) tax = 8725.5 + (taxable - 35200) * 0.37;
    else if (taxable <= 300000) tax = 17901.5 + (taxable - 60000) * 0.45;
    else tax = 125901.5 + (taxable - 300000) * 0.47;

    if (region === 'madrid') tax *= 0.95;
    else if (region === 'catalunya') tax *= 1.01;

    return (tax / gross) * 100;
}

function calculateSpainDismissal() {
    const lang = i18n[appState.language];
    const salary = parseFloat(getEl('sp-dismissal-salary').value) || 0;
    const years = parseFloat(getEl('sp-dismissal-years').value) || 0;
    const type = getEl('sp-dismissal-type').value;
    const annual = salary < 5000 ? salary * 12 : salary;
    const daily = annual / 365;
    let days = type === 'unfair' ? 33 : 20;
    let cap = (annual / 12) * (type === 'unfair' ? 24 : 12);
    let total = Math.min(daily * days * years, cap);
    renderResult(lang.salary_daily, daily.toFixed(2) + "€");
    renderResult(lang.days_year, days);
    getEl('net-result-value').textContent = total.toFixed(2) + "€";
}

function calculateSpainInverse() {
    const lang = i18n[appState.language];
    const target = parseFloat(getEl('sp-inverse-net').value) || 0;
    const pagas = appState.spToggles.pagas;
    const prorrated = appState.spToggles.pagas_prorrateadas;

    // The user target is "Monthly Take Home"
    // If user wants 2000€ and has 14 pagas, 0 prorrated -> Annual Net is 2000 * 14
    // If 14 pagas, 2 prorrated -> Monthly check is 2000, so Annual Net is 2000 * 12

    // Calculate required Annual Net based on target and prorrating
    // Target = (AnnualNet / pagas) * (1 + prorrated/12)
    // AnnualNet = Target / ( (1/pagas) * (1 + prorrated/12) )
    const targetAnnualNet = target / ((1 / pagas) * (1 + prorrated / 12));

    // Binary Search to find Gross
    let low = targetAnnualNet, high = targetAnnualNet * 4, gross = low;
    for(let i=0; i<40; i++) {
        gross = (low + high) / 2;
        let res = performSpainCalculations(gross, pagas);
        if (res.netAnnual < targetAnnualNet) low = gross; else high = gross;
    }
    renderResult(lang.bruto_est + " " + lang.anual, gross.toFixed(2) + "€");
    getEl('net-result-value').textContent = (gross / pagas).toFixed(2) + "€";
}

/* ==========================================================================
   6. MOTOR UK (ABRIL 2026 - TAX YEAR 26/27)
   ========================================================================== */
function calculateUK() {
    const lang = i18n[appState.language];
    let annualGross = 0;
    let periods = 12;

    if (appState.mode === 'annual') {
        annualGross = parseFloat(getEl('uk-annual-gross').value) || 0;
        periods = appState.ukPeriods.annual;
    } else if (appState.mode === 'monthly') {
        let mGross = parseFloat(getEl('uk-monthly-gross').value) || 0;
        periods = appState.ukPeriods.monthly;
        annualGross = mGross * periods;
    } else if (appState.mode === 'hourly') {
        const rate = parseFloat(getEl('uk-hourly-rate').value) || 0;
        const hours = parseFloat(getEl('uk-hourly-hours').value) || 0;

        if (appState.ukHourlyFreq === 'weekly') {
            annualGross = (rate * hours) * 52;
            periods = 52;
        } else {
            const base = appState.ukToggles['hourly-monthly-base'] || 'full';
            if (base === '4weeks') {
                annualGross = (rate * hours) * 13;
                periods = 13;
            } else {
                annualGross = (rate * hours) * 12;
                periods = 12;
            }
        }
    } else if (appState.mode === 'inverse') {
        calculateUKInverse(); return;
    } else if (appState.mode === 'dismissal') {
        calculateUKRedundancy(); return;
    }

    const res = performUKCalculations(annualGross, periods);
    const freqLabel = periods > 14 ? lang.semanal : lang.mensual;

    renderResult(lang.bruto + " " + freqLabel, (annualGross / periods).toFixed(2) + "£");
    if (res.holidayPayMonthly > 0) renderResult(lang.holiday_res, res.holidayPayMonthly.toFixed(2) + "£");
    if (res.bonusTotalMonthly > 0) renderResult(lang.extras, res.bonusTotalMonthly.toFixed(2) + "£");
    if (res.pension > 0) renderResult(lang.pension, "-" + (res.pension / periods).toFixed(2) + "£");
    renderResult(lang.irpf, "-" + (res.tax / periods).toFixed(2) + "£");
    renderResult(lang.ss + " (NI)", "-" + (res.ni / periods).toFixed(2) + "£");

    if (res.studentLoan > 0) renderResult(lang.student_loan_res, "-" + (res.studentLoan / periods).toFixed(2) + "£");

    if (res.employerNi > 0) {
        renderResult(lang.emp_ni, (res.employerNi / periods).toFixed(2) + "£");
    }

    getEl('net-result-value').textContent = (res.net / periods).toFixed(2) + "£";
}

function performUKCalculations(annual, periods = 12) {
    const bik = (parseFloat(getEl('uk-pro-bik')?.value) || 0) * 12;
    const pPerc = parseFloat(getEl('uk-pro-pension')?.value) || 0;
    const pType = appState.ukToggles['pension-type'] || 'before';

    const bonusA = parseFloat(getEl('uk-pro-bonus-a')?.value) || 0;
    const bonusATaxed = appState.ukToggles['bonus-a-tax'] === 'yes';
    const bonusB = parseFloat(getEl('uk-pro-bonus-b')?.value) || 0;
    const bonusBTaxed = appState.ukToggles['bonus-b-tax'] === 'yes';

    // Overtime for UK
    const mode = appState.mode;
    const suffix = mode === 'annual' ? 'ann' : mode === 'monthly' ? 'mon' : mode === 'hourly' ? 'hou' : 'inv';
    const otHours = parseFloat(getEl(`uk-pro-overtime-hours-${suffix}`)?.value) || 0;
    const otPrice = parseFloat(getEl(`uk-pro-overtime-price-${suffix}`)?.value) || 0;

    let otAmountAnnual = 0;
    let otAmountMonthly = 0;
    if (mode === 'hourly' && appState.ukHourlyFreq === 'weekly') {
        otAmountAnnual = (otHours * otPrice) * 52;
        otAmountMonthly = otAmountAnnual / 12;
    } else {
        otAmountMonthly = otHours * otPrice;
        otAmountAnnual = otAmountMonthly * 12;
    }

    const holidayProrated = getEl('uk-holiday-prorated')?.checked;
    let holidayPayAnnual = 0;
    if (holidayProrated) {
        // UK Statutory: 12.07%
        holidayPayAnnual = annual * 0.1207;
    }

    const taxCodeSelect = getEl('uk-pro-taxcode-select')?.value;
    const taxCodeManual = getEl('uk-pro-taxcode-manual')?.value.toUpperCase() || "";
    const taxCode = taxCodeSelect === 'custom' ? taxCodeManual : taxCodeSelect;

    const niLetter = getEl('uk-pro-ni-letter')?.value || "A";
    const manualNiAmtMonthly = parseFloat(getEl('uk-pro-ni-manual-amt')?.value);
    const regionSelect = getEl('uk-region-select')?.value || "rUK";
    const studentLoanPlan = getEl('uk-pro-student-loan')?.value || "none";
    const hasPostgrad = getEl('uk-pro-postgrad')?.checked;
    const isMultipayer = appState.ukToggles.jobs === '2';

    // 1. Detect region from Tax Code prefix 'S'
    let isScottish = (regionSelect === "SCO") || taxCode.startsWith('S');

    // 2. Allowance from Tax Code
    let allowance = isMultipayer ? 0 : 12570;
    if (taxCode && !isMultipayer) {
        if (taxCode.startsWith('K')) {
            const kVal = parseInt(taxCode.replace(/\D/g, ''));
            if (!isNaN(kVal)) allowance = -kVal * 10;
        } else {
            // Support for S prefix (Scottish) and standard numbers
            const numOnly = taxCode.replace(/\D/g, '');
            if (numOnly !== "") {
                allowance = parseInt(numOnly) * 10;
            } else if (taxCode === "BR" || taxCode === "D0" || taxCode === "D1") {
                allowance = 0;
            } else if (taxCode === "NT") {
                allowance = 999999;
            }
        }
    }

    if (annual > 100000 && !isMultipayer && !taxCode?.startsWith('K')) {
        allowance = Math.max(0, allowance - (annual - 100000) / 2);
    }

    // 3. Bonus logic
    const taxableBonusAnnual = (bonusATaxed ? bonusA : 0) * 12 + (bonusBTaxed ? bonusB : 0) * 12 + otAmountAnnual;
    const nonTaxableBonusAnnual = (!bonusATaxed ? bonusA : 0) * 12 + (!bonusBTaxed ? bonusB : 0) * 12;
    const bonusTotalMonthlyTotal = bonusA + bonusB + otAmountMonthly;

    // 4. Pension
    const pensionAnnual = (annual + holidayPayAnnual + taxableBonusAnnual) * (pPerc / 100);

    // 5. NI Calculation
    const niBaseAnnual = annual + holidayPayAnnual + taxableBonusAnnual;
    let ni = 0;
    if (!isNaN(manualNiAmtMonthly)) {
        ni = manualNiAmtMonthly * 12;
    } else {
        let niRateMain = 0.08;
        let niRateHigher = 0.02;
        if (niLetter === "B") niRateMain = 0.0185;
        else if (niLetter === "C") niRateMain = 0;

        if (niBaseAnnual > 12570) {
            ni = (Math.min(niBaseAnnual, 50270) - 12570) * niRateMain;
            if (niBaseAnnual > 50270) ni += (niBaseAnnual - 50270) * niRateHigher;
        }
    }
    let employerNi = Math.max(0, (niBaseAnnual - 5000) * 0.15);

    // 6. Income Tax
    let taxableAmount = Math.max(0, annual + holidayPayAnnual + taxableBonusAnnual + bik - allowance);
    if (pType === 'before') taxableAmount = Math.max(0, taxableAmount - pensionAnnual);

    let tax = 0;
    if (taxCode === "D0") tax = taxableAmount * 0.40;
    else if (taxCode === "D1") tax = taxableAmount * 0.45;
    else if (taxCode === "BR") tax = taxableAmount * 0.20;
    else if (taxCode === "NT") tax = 0;
    else {
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

    // 7. Student Loans
    let slBase = annual + holidayPayAnnual + taxableBonusAnnual;
    let studentLoan = 0;
    if (studentLoanPlan === "plan1" && slBase > 24990) studentLoan += (slBase - 24990) * 0.09;
    else if (studentLoanPlan === "plan2" && slBase > 27295) studentLoan += (slBase - 27295) * 0.09;
    else if (studentLoanPlan === "plan4" && slBase > 31395) studentLoan += (slBase - 31395) * 0.09;
    else if (studentLoanPlan === "plan5" && slBase > 25000) studentLoan += (slBase - 25000) * 0.09;
    if (hasPostgrad && slBase > 21000) studentLoan += (slBase - 21000) * 0.06;

    let net = annual + holidayPayAnnual + taxableBonusAnnual + nonTaxableBonusAnnual - tax - ni - pensionAnnual - studentLoan;
    return { tax, ni, employerNi, pension: pensionAnnual, studentLoan, net, bonusTotalMonthly: bonusTotalMonthlyTotal, holidayPayMonthly: holidayPayAnnual / periods };
}

function calculateUKRedundancy() {
    const a = parseInt(getEl('uk-redundancy-age').value) || 0;
    const y = parseInt(getEl('uk-redundancy-years').value) || 0;
    const w = Math.min(parseFloat(getEl('uk-redundancy-weekly').value) || 0, 725);
    let total = 0;
    for (let i = 0; i < Math.min(y, 20); i++) {
        let age = a - i;
        total += (age >= 41 ? w * 1.5 : (age >= 22 ? w : w * 0.5));
    }
    getEl('net-result-value').textContent = total.toFixed(2) + "£";
}

function calculateUKInverse() {
    const lang = i18n[appState.language];
    const target = parseFloat(getEl('uk-inverse-net').value) || 0;
    let low = target * 12, high = target * 12 * 4, gross = low;
    for(let i=0; i<40; i++) {
        gross = (low + high) / 2;
        let res = performUKCalculations(gross);
        if (res.net / 12 < target) low = gross; else high = gross;
    }
    renderResult(lang.bruto_est + " " + lang.anual, gross.toFixed(2) + "£");
    getEl('net-result-value').textContent = (gross / 12).toFixed(2) + "£";
}

/* ==========================================================================
   7. UTILIDADES
   ========================================================================== */
function renderResult(label, value) {
    const div = document.createElement('div');
    div.className = 'result-item';
    div.innerHTML = `<span>${label}:</span> <span class="result-value">${value}</span>`;
    getEl('results-list').appendChild(div);
}

function activatePro(msg) {
    appState.isPro = true;
    document.body.classList.add('is-pro');
    document.querySelectorAll('.pro-feature').forEach(e => {
        // e.classList.remove('hidden'); // No eliminar hidden, solo permitir clic si el estilo lo habilita
    });
    getEl('pro-settings-container')?.classList.remove('hidden');
    getEl('pro-upgrade-container')?.classList.add('hidden');
    getEl('ad-banner-bottom')?.classList.add('hidden');
    if (msg) alert(msg);
}

const PRO_MASTER_EMAIL = "paynomnet@gmail.com";
getEl('btn-become-pro')?.addEventListener('click', () => activatePro("Acceso PRO Activado"));
getEl('btn-login')?.addEventListener('click', () => {
    if (getEl('auth-email').value === PRO_MASTER_EMAIL) activatePro("Admin Login");
});

/* ==========================================================================
   8. LÓGICA CALCULADORA HELPER (FLOTANTE)
   ========================================================================== */
let calcDisplay = '0';
let calcHistory = '';
let calcPendingOp = null;
let calcAccumulator = 0;
let calcNextReset = false;

function setupHelperCalc() {
    const display = getEl('calc-display');
    const history = getEl('calc-history');

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
            } else if (op === '=') {
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

/* --- Dragging Logic --- */
function setupDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const handle = getEl('calc-handle');

    handle.onmousedown = dragMouseDown;
    handle.ontouchstart = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        // e.preventDefault(); // Comentado para permitir scroll si fuera necesario
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
        el.style.right = 'auto'; // Liberar anclaje original
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.ontouchend = null;
        document.onmousemove = null;
        document.ontouchmove = null;
    }
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    setupHelperCalc();
    setupDraggable(getEl('floating-calc'));
});
