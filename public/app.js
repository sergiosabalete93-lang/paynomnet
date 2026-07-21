import './firebase-config.js';

/* ==========================================================================
   1. ESTADO GLOBAL Y CONFIGURACIÓN
   ========================================================================== */
const appState = {
    language: 'es', // 'es' o 'en'
    country: null, // 'spain' o 'uk'
    mode: null, // 'annual', 'monthly', 'hourly', 'inverse', 'dismissal'
    isPro: true, // <--- Activo por defecto para pruebas
    adClickCount: 0,
    interstitialId: 'ca-app-pub-3940256099942544/1033173712', // ID de Prueba (Test)
    spToggles: {
        disability: null,
        multipayer: 'no',
        pagas: 0,
        pagas_prorrateadas: 0,
        contrato: null,
        'holiday-prorated': false,
        dynamicBonus: [],
        dynamicEspecie: [], // New
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

// Hacer appState global para ads-engine.js
window.appState = appState;

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
        ir35: "IR35",
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
            jobs2plus: "2+ Empleos",
            inside: "Dentro",
            outside: "Fuera",
            daily: "Diario",
            hourly: "Por Hora",
            net_pay: "Deducción Bruta (Net Pay)",
            relief_source: "Deducción Neta (Relief at Source)"
        },
        placeholders: {
            email: "Email (Admin)",
            sp_annual: "Sueldo bruto anual (ej: 30000)",
            sp_monthly: "Sueldo mensual bruto (ej: 2100)",
            sp_hourly_price: "Precio hora bruto (ej: 12.50)",
            sp_hourly_hours: "Horas al mes (ej: 160)",
            sp_inverse: "Sueldo neto mensual deseado",
            sp_dismissal_sal: "Último sueldo bruto o anual",
            sp_dismissal_years: "Años totales en la empresa",
            manual_irpf: "Fuerza un % (ej: 14)",
            optional: "Dejar vacío si es automático",
            uk_annual: "Total annual gross (e.g. 35000)",
            uk_monthly: "Total monthly gross (e.g. 3000)",
            uk_hourly_rate: "Gross hourly rate (e.g. 15.50)",
            uk_hourly_hours: "Standard weekly hours (e.g. 37.5)",
            uk_inverse: "Desired net monthly take-home",
            uk_taxcode_manual: "e.g. S1257L or C1257L",
            uk_ir35_rate: "Daily or hourly rate (e.g. 500)"
        },
        labels: {
            privacidad: "Privacidad",
            terminos: "Términos",
            hijos: "Nº Hijos",
            hijo_dis: "Hijo con Discapacidad",
            others: "Otros a Cargo",
            otro_dis: "Persona con Discapacidad",
            otro_75: "Mayor de 75 años",
            otro_dis_count: "¿Cuántos con discapacidad?",
            otro_75_count: "¿Cuántos con +75 años?",
            tu_dis: "Tu Discapacidad",
            comunidad: "Comunidad",
            pagadores: "Pagadores",
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
            bonus_a: "Bonus (€/mes)",
            ot_hours: "Horas Extra",
            ot_price: "Precio Hora Extra",
            hijo_dis_count: "Nº de Niños",
            cotiza: "Cotiza",
            tax_region: "Región Fiscal",
            ni_cat: "Categoría NI",
            gross_annual: "Salario Base Anual (£)",
            pay_periods: "Periodos de Pago",
            gross_monthly: "Salario Base Mensual (£)",
            hourly_rate: "Precio por Hora (£)",
            hours_week: "Horas por SEMANA",
            hours_month: "Horas por MES",
            mon_calc: "Cálculo de Horas Mensuales",
            weekly_ot: "Horas Extra",
            monthly_ot: "Horas Extra",
            ot_rate: "Precio Hora Extra (£)",
            target_net: "Neto Mensual Objetivo (£)",
            current_age: "Edad Actual",
            years_service: "Años de Servicio",
            weekly_pay: "Sueldo Semanal (£)",
            jobs: "Empleos",
            tax_code: "Código Fiscal",
            pension_perc: "Pensión (%)",
            benefits_bik: "Beneficios (BIK)",
            student_loan: "Préstamo Estudiantil",
            postgrad_loan: "Préstamo Posgrado",
            ir35_type: "Tipo de IR35",
            assign_rate: "Tarifa de Contrato (£)",
            umbrella_margin: "Margen de Umbrella (£/sem)",
            expenses: "Gastos de Empresa (£/mes)",
            marriage: "Asignación por Matrimonio",
            blind: "Asignación por Persona Ciega",
            child_benefit: "Recargo por Ayuda de Hijos",
            cb_toggle: "Recargo de Ayuda por Hijos",
            children_count: "Nº de Niños",
            children_desc: "recibiendo ayuda"
        },
        help: {
            mode_annual: "Calcula tu sueldo neto a partir del bruto total anual pactado con tu empresa.",
            mode_monthly: "Calcula tu neto mensual limpio a partir de tu sueldo bruto mensual actual.",
            mode_hourly: "Ideal si cobras por horas. Indica tu precio/hora y las horas que haces al mes para proyectar tu sueldo.",
            mode_ir35: "Cálculo especializado para contratistas en Reino Unido bajo normativa IR35 (Umbrella o LTD).",
            mode_inverse: "Dinos cuánto quieres cobrar 'limpio' al mes y calcularemos el sueldo bruto que debes negociar.",
            mode_dismissal: "Calcula la indemnización legal aproximada en caso de despido según tu antigüedad y salario.",
            children: "Hijos menores de 25 años que vivan contigo. Si tienen discapacidad, activa el interruptor para reducir el IRPF.",
            others: "Padres o abuelos mayores de 65 años a tu cargo. Especificar su discapacidad o edad (+75) reduce tu impuesto.",
            disability: "Tu grado de discapacidad oficial. Esto aumenta tu mínimo personal libre de impuestos.",
            multipayer: "Actívalo si has trabajado en más de una empresa este año; Hacienda suele subir la retención en estos casos.",
            joint: "Declaración de la renta conjunta. Suele interesar si uno de los dos cónyuges no tiene ingresos.",
            pagas: "12 si las extras están prorrateadas cada mes. 14 si cobras una extra en junio y otra en diciembre.",
            contract: "Indefinido (fijo) o Temporal. Los temporales tienen una retención de Seguridad Social ligeramente distinta.",
            manual_irpf: "Úsalo solo si quieres forzar el porcentaje exacto que ya ves en tu nómina real para cuadrar resultados.",
            custom_base: "La base de cotización suele ser igual al bruto, pero con límites legales. No lo toques si no eres experto.",
            extra_tax: "Cualquier otro descuento neto mensual: cuota sindical, embargos o préstamos de empresa.",
            bonus: "Conceptos extra en dinero (plus transporte, incentivos). Puedes marcar si tributan o si son netos.",
            antiguedad: "Importe total que cobras al mes por años en la empresa (trienios, sexenios, etc.). No pongas los años, pon el dinero.",
            ot_hours: "Número de horas trabajadas fuera de tu jornada normal este mes.",
            ot_price: "El precio bruto por cada hora extra según tu contrato.",
            'h-grupo': "Tu categoría profesional según contrato. Determina las bases mínimas y máximas de cotización.",
            'h-jornada': "Horas semanales de tu contrato. El estándar es 40h. Si es menos, los mínimos legales se ajustan.",
            'h-meses': "Si tu contrato es temporal y solo vas a trabajar unos meses, la app ajustará tu IRPF a la baja.",
            'h-especie': "Pagos no monetarios (seguro médico, coche). Tributan como sueldo pero se restan al final al cobrarse 'en cosas'.",
            'h-exento': "Conceptos que no pagan impuestos ni SS, como dietas de viaje o kilometraje (hasta 0.26€/km). Suman directo a tu neto.",
            rates: "Porcentajes técnicos de cotización. No los cambies a menos que tengas un convenio muy especial.",
            uk_periods: "Frecuencia de cobro en UK: 12 meses, 13 (cada 4 semanas) o 52 (semanal).",
            uk_bik: "Beneficios no monetarios (P11D) como coche de empresa. Tributan como ingresos pero no los recibes en efectivo.",
            uk_pension: "Ahorro jubilación. Por ley (Auto-enrolment), se calcula sobre lo que ganes entre £6,240 y £50,270 al año.",
            uk_taxcode: "Indica tu mínimo exento. '1257L' es el normal (£12,570 libres). El prefijo 'S' es para Escocia y 'C' para Gales.",
            uk_ni_letter: "Categoría del National Insurance. La 'A' es para la mayoría de empleados adultos.",
            uk_bonus: "Bonificaciones extra. Indica si la cantidad es bruta (tributable) o neta (ya limpia).",
            uk_jobs: "Si tienes más de un empleo, tu mínimo exento suele aplicarse solo al trabajo principal.",
            uk_inverse: "Introduce el neto mensual que deseas y calcularemos el sueldo bruto anual equivalente.",
            uk_redundancy: "Indemnización por despido en UK según edad, años trabajados y tope semanal de £725 (2026).",
            uk_hourly_base: "Cómo convertir tus horas semanales a mensuales (Promedio anual o bloques de 4 semanas).",
            uk_holiday: "Incluye un 12.07% extra simulando el pago de vacaciones no disfrutadas, común en agencias.",
            uk_ir35_type: "Inside: Eres empleado fiscal (vía Umbrella). Outside: Eres una empresa independiente (LTD).",
            uk_assign: "La tarifa total que paga el cliente por tus servicios antes de cualquier descuento.",
            uk_margin: "Tarifa semanal fija que cobra la empresa Umbrella por hacerte la nómina.",
            uk_expenses: "Gastos de negocio que puedes deducir del beneficio antes de impuestos (solo en modo LTD/Outside).",
            uk_marriage: "Permite transferir £1,260 de tu mínimo exento a tu pareja si gana menos que tú.",
            uk_blind: "Aumento del mínimo exento de £3,070 extra si estás registrado como invidente.",
            uk_child_benefit: "Si ganas más de £60,000, debes devolver parte de las ayudas por hijos recibidas vía impuestos."
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
        ir35: "IR35",
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
            jobs2plus: "2+ Jobs",
            inside: "Inside",
            outside: "Outside",
            daily: "Daily",
            hourly: "Hourly",
            net_pay: "Net Pay (Before Tax)",
            relief_source: "Relief at Source (After Tax)"
        },
        placeholders: {
            email: "Email (Admin)",
            sp_annual: "Gross salary (e.g. 30000)",
            sp_monthly: "Monthly salary (e.g. 2100)",
            sp_hourly_price: "Hourly rate (e.g. 12.50)",
            sp_hourly_hours: "Monthly hours (e.g. 160)",
            sp_inverse: "Desired net pay",
            sp_dismissal_sal: "Latest salary or annual",
            sp_dismissal_years: "Years of service",
            manual_irpf: "Force % (e.g. 14)",
            optional: "Leave blank for automatic",
            uk_annual: "Base salary (e.g. 35000)",
            uk_monthly: "Monthly pay (e.g. 3000)",
            uk_hourly_rate: "Hourly rate (e.g. 15.50)",
            uk_hourly_hours: "Weekly hours (e.g. 37.5)",
            uk_inverse: "Desired net monthly",
            uk_taxcode_manual: "e.g. S1257L",
            uk_ir35_rate: "Full rate (e.g. 500)"
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
            bonus_a: "Bonus (€/mo)",
            ot_hours: "Overtime Hours",
            ot_price: "Overtime Rate",
            hijo_dis_count: "How many children?",
            cotiza: "Taxable",
            tax_region: "Tax Region",
            ni_cat: "NI Category",
            gross_annual: "Annual Base Salary (£)",
            pay_periods: "Pay Periods",
            gross_monthly: "Monthly Base Salary (£)",
            hourly_rate: "Hourly Rate (£)",
            hours_week: "Hours per WEEK",
            hours_month: "Hours per MONTH",
            mon_calc: "Monthly Hours Calculation",
            weekly_ot: "Overtime Hours",
            monthly_ot: "Overtime Hours",
            ot_rate: "Overtime Rate (£)",
            target_net: "Target Monthly Net (£)",
            current_age: "Current Age",
            years_service: "Years of Service",
            weekly_pay: "Weekly Pay (£)",
            jobs: "Jobs",
            tax_code: "Tax Code",
            pension_perc: "Pension (%)",
            benefits_bik: "Benefits (BIK)",
            student_loan: "Student Loan",
            postgrad_loan: "Postgraduate Loan",
            ir35_type: "IR35 Type",
            assign_rate: "Assignment Rate (£)",
            umbrella_margin: "Umbrella Margin (£/week)",
            expenses: "Business Expenses (£/mo)",
            marriage: "Marriage Allowance",
            blind: "Blind Person's Allowance",
            child_benefit: "Child Benefit Charge",
            cb_toggle: "Child Benefit Charge",
            children_count: "Number of Children",
            children_desc: "receiving benefit"
        },
        help: {
            mode_annual: "Calculate your take-home pay based on the total annual gross salary agreed with your employer.",
            mode_monthly: "Calculate your monthly net pay based on your current monthly gross salary.",
            mode_hourly: "Perfect for hourly roles. Enter your hourly rate and monthly hours to project your income.",
            mode_ir35: "Specialized calculation for UK contractors working via Umbrella or Limited companies.",
            mode_inverse: "Enter your target monthly net pay, and we will calculate the gross salary you should negotiate.",
            mode_dismissal: "Estimate your legal redundancy pay based on your years of service and salary.",
            children: "Children under 25 living with you. If they have a disability, enable the toggle for tax relief.",
            others: "Dependent parents or grandparents. Specifying disability or age (+75) increases your tax-free allowance.",
            disability: "Your official disability degree. This increases your personal tax-free allowance.",
            multipayer: "Enable if you worked for more than one employer this year; tax agencies often increase withholding to avoid debt.",
            joint: "Joint tax return for married couples. Usually beneficial if one spouse has low or no income.",
            pagas: "12 if bonuses are spread monthly. 14 if you receive extra checks in Summer and Christmas.",
            contract: "Permanent vs. Temporary. Temporary contracts may have slightly different social security contributions.",
            manual_irpf: "Use this field only to force an exact tax percentage you already know from your payslip.",
            custom_base: "The contribution base usually matches gross pay but has legal caps. Leave blank if unsure.",
            extra_tax: "Subtract amounts taken directly from your bank net pay. E.g., union fees, company loans, or court orders. NOT for regular taxes.",
            bonus: "Extra cash payments (transport, performance). You can choose if they are gross (taxed) or net (clean).",
            antiguedad: "Total monthly amount for years at the company. Enter the money amount in euros, not the number of years.",
            'h-exento': "Income not subject to tax or SS, like travel expenses or mileage (up to 0.26€/km). Adds directly to your net pay.",
            ot_hours: "Number of hours worked beyond your standard contracted hours this month.",
            ot_price: "The gross hourly rate for overtime as per your contract or collective agreement.",
            rates: "Technical contribution percentages. Do not change unless you have a very specific agreement.",
            uk_periods: "Payment frequency in UK: 12 months (standard), 13 (every 4 weeks), or 52 (weekly).",
            uk_bik: "Non-cash benefits (P11D) like company cars or private medical insurance. They are taxed as income.",
            uk_pension: "Retirement savings. By law (Auto-enrolment), it is calculated on earnings between £6,240 and £50,270 per year.",
            uk_taxcode: "Your personal allowance code. '1257L' is standard (£12,570 free). Prefixes 'S' for Scotland and 'C' for Wales.",
            uk_ni_letter: "National Insurance category. 'A' is for most adults. 'J' is for deferred rate (2%).",
            uk_bonus: "Additional bonuses. Indicate if the amount is gross (taxable) or net (already clean).",
            uk_jobs: "If you have multiple jobs, your personal allowance usually applies only to your main role.",
            uk_inverse: "Enter your target monthly net take-home to find the equivalent annual gross salary.",
            uk_redundancy: "Statutory redundancy pay based on age, years of service, and £725 weekly cap (2026).",
            uk_hourly_base: "How to convert weekly hours to monthly (Annual average vs. 4-week blocks).",
            uk_holiday: "Adds an extra 12.07% to simulate rolled-up holiday pay, common for agency workers.",
            uk_ir35_type: "Inside: Taxed as an employee (via Umbrella). Outside: Independent business (LTD).",
            uk_assign: "The total 'day rate' or 'hourly rate' paid by the client before any deductions.",
            uk_margin: "Fixed weekly fee charged by the Umbrella company for their payroll service.",
            uk_expenses: "Business costs you can deduct from profit before tax (only in LTD/Outside mode)." ,
            uk_marriage: "Allows transferring £1,260 of your personal allowance to your partner if they earn less.",
            uk_blind: "Additional tax-free allowance if you are registered as blind.",
            uk_child_benefit: "If earning over £60,000, you must pay a charge to repay some of the child benefits received.",
            'h-grupo': "It's your legal category based on your title. Group 1 (Heads/Engineers) has higher legal minimums. If you earn little but your group is high, you will pay more Social Security by law.",
            'h-jornada': "Enter how many hours you work per week. Normal is 40. If you work part-time (20h), the legal minimums are automatically reduced by half.",
            'h-meses': "Only for temporary contracts. If you are only going to work 6 months this year, the app will adjust your tax downward. You will take home more net each month!",
            'h-especie': "Non-cash benefits (Medical insurance, car, tickets). They are taxed as income, but the app will subtract them at the end to show your real cash in hand.",
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
        if (!localStorage.getItem('app_theme')) { // Solo si el usuario no ha forzado un tema manual
            applyTheme(e.matches, false);
        }
    });

    // Detectar idioma: Prioridad al guardado, luego al sistema
    const savedLang = localStorage.getItem('app_language');
    const sysLang = navigator.language.split('-')[0];

    if (savedLang) {
        appState.language = savedLang;
    } else if (sysLang === 'en') {
        appState.language = 'en';
    }

    getEl('lang-select').value = appState.language;

    // 3. Registrar Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log("SW: Registrado"))
            .catch(err => console.warn("SW: Error", err));
    }

    // Load defaults (Spain active)
    setCountry('spain');

    // 4. Bloquear teclas inválidas en todos los inputs numéricos
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (['e', 'E', '+', '-'].includes(e.key)) {
                e.preventDefault();
            }
        });

        // Limpiar error al empezar a escribir
        input.addEventListener('input', () => {
            input.classList.remove('input-error');
            const parent = input.closest('.input-group');
            const errorMsg = parent?.querySelector('.error-label');
            if (errorMsg) errorMsg.remove();
        });
    });
}

function applyTheme(isDark, save = true) {
    if (isDark) {
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
        getEl('meta-theme-color')?.setAttribute('content', '#121212');
    } else {
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
        getEl('meta-theme-color')?.setAttribute('content', '#0056b3');
    }

    const toggle = getEl('theme-toggle');
    if (toggle) toggle.checked = isDark;

    if (save) {
        localStorage.setItem('app_theme', isDark ? 'dark' : 'light');
    }
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
        // Opcional: Desactivar Analytics si es posible
        window['ga-disable-G-031G1V1F9J'] = true;
    });

    // Botón Calcular
    getEl('btn-calculate')?.addEventListener('click', () => {
        if (!validateForm()) return;

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
            // Intentar mostrar anuncio intersticial si está disponible
            if (window.showInterstitialAd) {
                showInterstitialAd(() => processCalculation());
            } else {
                setTimeout(processCalculation, 600);
            }
        } else {
            setTimeout(processCalculation, 600);
        }
    });
}

function parseSafe(id) {
    const el = getEl(id);
    if (!el || !el.value) return 0;
    let val = el.value.toString().trim();
    // Sanitización básica: permitir pegado de formatos europeos o estándar
    if (val.includes(',') && val.includes('.')) {
        // Formato 1.234,56 -> 1234.56
        if (val.lastIndexOf('.') < val.lastIndexOf(',')) {
            val = val.replace(/\./g, '').replace(',', '.');
        } else {
            // Formato 1,234.56 -> 1234.56
            val = val.replace(/,/g, '');
        }
    } else if (val.includes(',')) {
        val = val.replace(',', '.');
    }
    return parseFloat(val) || 0;
}

function validateForm() {
    let isValid = true;
    const errors = [];
    const lang = i18n[appState.language];

    // Limpiar errores previos
    document.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
    document.querySelectorAll('.error-label').forEach(el => el.remove());
    document.querySelectorAll('.group-error').forEach(el => el.classList.remove('group-error'));

    const markError = (id, msg) => {
        const el = getEl(id);
        if (!el) return;
        el.classList.add('input-error');
        const parent = el.closest('.input-group') || el.parentNode;
        const label = document.createElement('div');
        label.className = 'error-label';
        label.innerHTML = `<span>⚠</span> ${msg}`;
        parent.appendChild(label);
        if (errors.length === 0) errors.push(el);
        isValid = false;
    };

    const markGroupError = (groupId, msg) => {
        const group = getEl(groupId);
        if (!group) return;
        group.classList.add('group-error');
        const label = document.createElement('div');
        label.className = 'error-label';
        label.innerHTML = `<span>⚠</span> ${msg}`;
        group.parentNode.insertBefore(label, group.nextSibling);
        if (errors.length === 0) errors.push(group);
        isValid = false;
    };

    const c = appState.country;
    const m = appState.mode;

    // 0. Validar País y Modo (si no hay selección)
    if (!c) {
        markGroupError('btn-spain', "Selecciona un país");
        return false;
    }
    if (!m) {
        markGroupError('btn-mode-annual', "Selecciona un modo");
        return false;
    }

    // 1. Validar Inputs Numéricos Obligatorios
    if (c === 'spain') {
        if (m === 'annual' && parseSafe('sp-annual-gross') <= 0) markError('sp-annual-gross', "Sueldo anual requerido");
        if (m === 'monthly' && parseSafe('sp-monthly-gross') <= 0) markError('sp-monthly-gross', "Sueldo mensual requerido");
        if (m === 'hourly') {
            if (parseSafe('sp-hourly-price') <= 0) markError('sp-hourly-price', "Precio hora requerido");
            if (parseSafe('sp-hourly-hours') <= 0) markError('sp-hourly-hours', "Horas mensuales requeridas");
        }
        if (m === 'inverse' && parseSafe('sp-inverse-net') <= 0) markError('sp-inverse-net', "Neto objetivo requerido");
        if (m === 'dismissal') {
            if (parseSafe('sp-dismissal-salary') <= 0) markError('sp-dismissal-salary', "Salario requerido");
            if (parseSafe('sp-dismissal-years') <= 0) markError('sp-dismissal-years', "Años requeridos");
        }

        // 2. Validar Selecciones Obligatorias (Botones)
        if (appState.spToggles.pagas === 0) markGroupError('sp-pagas-tot-' + (m === 'dismissal' ? 'annual' : m), "Selecciona número de pagas");
        if (!appState.spToggles.contrato) markGroupError('btn-cont-indef', "Selecciona tipo contrato");
    } else {
        if (m === 'annual' && parseSafe('uk-annual-gross') <= 0) markError('uk-annual-gross', "Annual salary required");
        if (m === 'monthly' && parseSafe('uk-monthly-gross') <= 0) markError('uk-monthly-gross', "Monthly salary required");
        if (m === 'hourly') {
            if (parseSafe('uk-hourly-rate') <= 0) markError('uk-hourly-rate', "Hourly rate required");
            if (parseSafe('uk-hourly-hours') <= 0) markError('uk-hourly-hours', "Hours required");
        }
        if (m === 'inverse' && parseSafe('uk-inverse-net') <= 0) markError('uk-inverse-net', "Target net required");
        if (m === 'ir35' && parseSafe('uk-ir35-rate') <= 0) markError('uk-ir35-rate', "Assignment rate required");

        if (appState.ukPeriods[m] === 0 && m !== 'dismissal' && m !== 'ir35') markGroupError('uk-pay-periods-label', "Select pay periods");
    }

    if (!isValid && errors.length > 0) {
        errors[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return isValid;
}

function setCountry(c) {
    appState.country = c;
    document.querySelectorAll('.btn-country').forEach(b => b.classList.remove('active'));
    getEl(`btn-${c}`).classList.add('active');

    document.querySelectorAll('.country-module').forEach(m => m.classList.add('hidden'));
    getEl(`module-${c}`).classList.remove('hidden');

    // IR35 mode is UK only
    const ir35Btn = getEl('btn-mode-ir35');
    if (ir35Btn) {
        ir35Btn.classList.toggle('hidden', c === 'spain');
    }

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
window.setSpainPagas = function(event, val) {
    if (event) {
        const parent = event.target.parentNode;
        parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        event.target.classList.add('active');
        const parentGroup = event.target.closest('.group-error');
        if (parentGroup) {
            parentGroup.classList.remove('group-error');
            const errorLabel = parentGroup.nextElementSibling;
            if (errorLabel?.classList.contains('error-label')) errorLabel.remove();
        }
    }
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
    const target = country === 'sp' ? appState.spToggles : appState.ukToggles;
    if (type === 'bonus') {
        const id = Date.now();
        target.dynamicBonus.push({ id, amount: 0, irpf: true, ss: true, unemployment: true });
    } else if (type === 'especie') {
        const id = Date.now();
        appState.spToggles.dynamicEspecie.push({ id, amount: 0 });
    } else if (type === 'ot') {
        const id = country === 'sp' ? appState.spToggles.dynamicOT : []; // UK OT is usually handled in inputs
        if (country === 'sp') {
            const id = Date.now();
            appState.spToggles.dynamicOT.push({ id, amount: 0, suffix });
        }
    } else if (type === 'deduction') {
        const id = Date.now();
        if (country === 'sp') appState.spToggles.dynamicDeductions.push({ id, amount: 0 });
    }
    renderDynamicLists();
};

window.removeExtraItem = function(type, id, country = 'sp') {
    const target = country === 'sp' ? appState.spToggles : appState.ukToggles;
    if (type === 'bonus') {
        target.dynamicBonus = target.dynamicBonus.filter(b => b.id !== id);
    } else if (type === 'especie' && country === 'sp') {
        appState.spToggles.dynamicEspecie = appState.spToggles.dynamicEspecie.filter(e => e.id !== id);
    } else if (type === 'deduction' && country === 'sp') {
        appState.spToggles.dynamicDeductions = appState.spToggles.dynamicDeductions.filter(d => d.id !== id);
    } else if (type === 'ot' && country === 'sp') {
        appState.spToggles.dynamicOT = appState.spToggles.dynamicOT.filter(o => o.id !== id);
    }
    renderDynamicLists();
};

function renderDynamicLists() {
    // 0. Especie List Spain
    const especieListSp = getEl('sp-especie-dynamic-list');
    if (especieListSp) {
        especieListSp.innerHTML = '';
        appState.spToggles.dynamicEspecie.forEach(e => {
            const div = document.createElement('div');
            div.style = "display:flex; gap:10px; margin-top:5px;";
            div.innerHTML = `
                <input type="number" step="any" class="input-field" style="flex:1; padding:5px;" placeholder="Importe especie" value="${e.amount}" onchange="updateEspecieVal(${e.id}, this.value)">
                <button class="btn-danger" style="width:30px; padding:0;" onclick="removeExtraItem('especie', ${e.id}, 'sp')">×</button>
            `;
            especieListSp.appendChild(div);
        });
    }

    // 1. Bonus List Spain
    const bonusListSp = getEl('sp-bonus-dynamic-list');
    if (bonusListSp) {
        bonusListSp.innerHTML = '';
        appState.spToggles.dynamicBonus.forEach(b => {
            const div = document.createElement('div');
            div.style = "background: rgba(255,255,255,0.5); padding: 10px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #eee;";
            div.innerHTML = `
                <div style="display:flex; gap:10px; margin-bottom:5px;">
                    <input type="number" step="any" class="input-field" style="flex:1; padding:5px;" placeholder="Importe" value="${b.amount}" onchange="updateBonusVal('sp', ${b.id}, 'amount', this.value)">
                    <button class="btn-danger" style="width:30px; padding:0;" onclick="removeExtraItem('bonus', ${b.id}, 'sp')">×</button>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:5px; font-size:10px;">
                    <label><input type="checkbox" ${b.irpf ? 'checked' : ''} onchange="updateBonusVal('sp', ${b.id}, 'irpf', this.checked)"> IRPF</label>
                    <label><input type="checkbox" ${b.ss ? 'checked' : ''} onchange="updateBonusVal('sp', ${b.id}, 'ss', this.checked)"> SS</label>
                    <label><input type="checkbox" ${b.unemployment ? 'checked' : ''} onchange="updateBonusVal('sp', ${b.id}, 'unemployment', this.checked)"> Paro</label>
                </div>
            `;
            bonusListSp.appendChild(div);
        });
    }

    // 1.2 Bonus List UK
    const bonusListUK = getEl('uk-bonus-dynamic-list');
    if (bonusListUK) {
        const lang = i18n[appState.language];
        bonusListUK.innerHTML = '';
        appState.ukToggles.dynamicBonus.forEach(b => {
            const div = document.createElement('div');
            div.style = "background: rgba(255,255,255,0.5); padding: 10px; border-radius: 8px; margin-bottom: 10px; border: 1px solid #eee;";
            div.innerHTML = `
                <div style="display:flex; gap:10px; margin-bottom:5px;">
                    <input type="number" step="any" class="input-field" style="flex:1; padding:5px;" placeholder="Amount" value="${b.amount}" onchange="updateBonusVal('uk', ${b.id}, 'amount', this.value)">
                    <button class="btn-danger" style="width:30px; padding:0;" onclick="removeExtraItem('bonus', ${b.id}, 'uk')">×</button>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:5px; font-size:10px;">
                    <label><input type="checkbox" ${b.irpf ? 'checked' : ''} onchange="updateBonusVal('uk', ${b.id}, 'irpf', this.checked)"> ${lang.irpf}</label>
                    <label><input type="checkbox" ${b.ss ? 'checked' : ''} onchange="updateBonusVal('uk', ${b.id}, 'ss', this.checked)"> NI</label>
                </div>
            `;
            bonusListUK.appendChild(div);
        });
    }

    // 2. OT List Spain
    const suffixes = ['ann', 'mon', 'hou', 'inv'];
    suffixes.forEach(s => {
        const otList = getEl(`sp-extra-ot-list-${s}`);
        if (otList) {
            otList.innerHTML = '';
            appState.spToggles.dynamicOT.filter(o => o.suffix === s).forEach(o => {
                const div = document.createElement('div');
                div.style = "display:flex; gap:10px; margin-top:5px;";
                div.innerHTML = `
                    <input type="number" step="any" class="input-field" style="flex:1; padding:5px;" placeholder="Plus extra" value="${o.amount}" onchange="updateOTVal(${o.id}, this.value)">
                    <button class="btn-danger" style="width:30px; padding:0;" onclick="removeExtraItem('ot', ${o.id}, 'sp')">×</button>
                `;
                otList.appendChild(div);
            });
        }
    });

    // 3. Deductions List Spain
    const deductionsList = getEl('sp-deductions-dynamic-list');
    if (deductionsList) {
        deductionsList.innerHTML = '';
        appState.spToggles.dynamicDeductions.forEach(d => {
            const div = document.createElement('div');
            div.style = "display:flex; gap:10px; margin-top:5px;";
            div.innerHTML = `
                <input type="number" step="any" class="input-field" style="flex:1; padding:5px;" placeholder="Importe deducción" value="${d.amount}" onchange="updateDeductionVal(${d.id}, this.value)">
                <button class="btn-danger" style="width:30px; padding:0;" onclick="removeExtraItem('deduction', ${d.id}, 'sp')">×</button>
            `;
            deductionsList.appendChild(div);
        });
    }
}

window.updateEspecieVal = function(id, val) {
    const e = appState.spToggles.dynamicEspecie.find(x => x.id === id);
    if (e) e.amount = parseFloat(val);
};

window.updateBonusVal = function(country, id, key, val) {
    const target = country === 'sp' ? appState.spToggles : appState.ukToggles;
    const b = target.dynamicBonus.find(x => x.id === id);
    if (b) b[key] = (key === 'amount') ? parseFloat(val) : val;
};

window.updateOTVal = function(id, val) {
    const o = appState.spToggles.dynamicOT.find(x => x.id === id);
    if (o) o.amount = parseFloat(val);
};

window.updateDeductionVal = function(id, val) {
    const d = appState.spToggles.dynamicDeductions.find(x => x.id === id);
    if (d) d.amount = parseFloat(val);
};

window.toggleHelp = function(event, id) {
    // Detener la propagación para evitar activar clics en contenedores padre
    if (event) event.stopPropagation();

    const el = getEl(id);
    if (el) el.classList.toggle('visible');
};

window.setSpainToggle = function(event, key, val) {
    appState.spToggles[key] = val;
    if (event) {
        const parent = event.target.parentNode;
        parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        event.target.classList.add('active');

        // Limpiar error visual
        const groupParent = event.target.closest('.group-error') || (event.target.id === 'btn-cont-indef' || event.target.id === 'btn-cont-temp' ? event.target.parentNode : null);
        if (groupParent) {
            groupParent.classList.remove('group-error');
            const errorLabel = groupParent.nextElementSibling;
            if (errorLabel?.classList.contains('error-label')) errorLabel.remove();
        }
    }

    if (key === 'contrato') {
        const rateInput = getEl('sp-rate-unemployment');
        if (rateInput) {
            rateInput.value = (val === 'temp') ? '1.60' : '1.55';
        }
        getEl('wrapper-sp-meses-trabajo')?.classList.toggle('hidden', val !== 'temp');
    }
};

window.setUKToggle = function(event, key, val) {
    appState.ukToggles[key] = val;
    if (event) {
        const parent = event.target.parentNode;
        parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        event.target.classList.add('active');

        // Limpiar error visual
        const groupParent = event.target.closest('.group-error');
        if (groupParent) {
            groupParent.classList.remove('group-error');
            const errorLabel = groupParent.nextElementSibling;
            if (errorLabel?.classList.contains('error-label')) errorLabel.remove();
        }
    }

    if (key === 'ir35-type') {
        getEl('wrapper-uk-inside-only').classList.toggle('hidden', val !== 'inside');
        getEl('wrapper-uk-outside-only').classList.toggle('hidden', val !== 'outside');
    }
};

window.syncUKHoliday = function(checked) {
    appState.ukToggles['holiday-prorated'] = checked;
    ['ann', 'mon', 'hou', 'inv', 'ir35'].forEach(s => {
        const el = getEl(`uk-holiday-prorated-${s}`);
        if (el) el.checked = checked;
    });
};

window.setUKPeriods = function(event, mode, val) {
    appState.ukPeriods[mode] = val;
    if (event) {
        const parent = event.target.parentNode;
        parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        event.target.classList.add('active');

        // Limpiar error visual
        const groupParent = event.target.closest('.group-error');
        if (groupParent) {
            groupParent.classList.remove('group-error');
            const errorLabel = groupParent.nextElementSibling;
            if (errorLabel?.classList.contains('error-label')) errorLabel.remove();
        }
    }
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
    if (getEl('uk-horas-extra-label-ann')) getEl('uk-horas-extra-label-ann').textContent = lang.labels.ot_hours;
    if (getEl('uk-precio-extra-label-ann')) getEl('uk-precio-extra-label-ann').textContent = lang.labels.ot_rate;
    if (getEl('uk-horas-extra-label-mon')) getEl('uk-horas-extra-label-mon').textContent = lang.labels.ot_hours;
    if (getEl('uk-precio-extra-label-mon')) getEl('uk-precio-extra-label-mon').textContent = lang.labels.ot_rate;
    if (getEl('uk-horas-extra-label-hou')) getEl('uk-horas-extra-label-hou').textContent = lang.labels.ot_hours;
    if (getEl('uk-precio-extra-label-hou')) getEl('uk-precio-extra-label-hou').textContent = lang.labels.ot_rate;
    if (getEl('uk-horas-extra-label-inv')) getEl('uk-horas-extra-label-inv').textContent = lang.labels.ot_hours;
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
    if (getEl('uk-holiday-label')) getEl('uk-holiday-label').textContent = lang.holiday_label;
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
    if (getEl('uk-horas-extra-label-ann')) getEl('uk-horas-extra-label-ann').textContent = lang.labels.ot_hours;
    if (getEl('uk-precio-extra-label-ann')) getEl('uk-precio-extra-label-ann').textContent = lang.labels.ot_rate;
    if (getEl('uk-horas-extra-label-mon')) getEl('uk-horas-extra-label-mon').textContent = lang.labels.ot_hours;
    if (getEl('uk-precio-extra-label-mon')) getEl('uk-precio-extra-label-mon').textContent = lang.labels.ot_rate;
    if (getEl('uk-horas-extra-label-hou')) getEl('uk-horas-extra-label-hou').textContent = lang.labels.ot_hours;
    if (getEl('uk-precio-extra-label-hou')) getEl('uk-precio-extra-label-hou').textContent = lang.labels.ot_rate;
    if (getEl('uk-horas-extra-label-inv')) getEl('uk-horas-extra-label-inv').textContent = lang.labels.ot_hours;
    if (getEl('uk-precio-extra-label-inv')) getEl('uk-precio-extra-label-inv').textContent = lang.labels.ot_rate;
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
    if (getEl('uk-holiday-label')) getEl('uk-holiday-label').textContent = lang.holiday_label;

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
        'h-antiguedad': lang.help.antiguedad,
        'h-ot-hours': lang.help.ot_hours,
        'h-ot-price': lang.help.ot_price,
        'h-grupo': lang.help['h-grupo'],
        'h-jornada': lang.help['h-jornada'],
        'h-meses': lang.help['h-meses'],
        'h-especie': lang.help['h-especie'],
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
        if (el) el.textContent = helpNotes[id];
    }
}

function resetToDefaultMode() {
    const btn = document.getElementById('btn-mode-annual');
    if (btn) btn.click();
}

window.resetAllFields = function(country) {
    if (!confirm(appState.language === 'es' ? '¿Limpiar todos los datos?' : 'Clear all data?')) return;

    const modulePrefix = country === 'sp' ? 'module-spain' : 'module-uk';
    const moduleEl = getEl(modulePrefix);

    if (country === 'sp') {
        // 1. Reset Internal State Spain
        appState.spToggles.dynamicBonus = [];
        appState.spToggles.dynamicOT = [];
        appState.spToggles.dynamicDeductions = [];
        appState.spToggles.disability = 'none';
        appState.spToggles.pagas = 12;
        appState.spToggles.pagas_prorrateadas = 0;
        appState.spToggles.contrato = 'indef';
        appState.spToggles['holiday-prorated'] = false;
        appState.spToggles.multipayer = 'no';
    } else {
        // 1. Reset Internal State UK
        appState.ukToggles.dynamicBonus = [];
        appState.ukToggles['pension-type'] = 'before';
        appState.ukToggles.jobs = '1';
        appState.ukToggles['holiday-prorated'] = false;
        appState.ukToggles['ir35-type'] = 'inside';
        appState.ukToggles['ir35-freq'] = 'daily';
        appState.ukHourlyFreq = 'weekly';
        appState.ukPeriods.annual = 12;
        appState.ukPeriods.monthly = 12;
    }

    // 2. Reset All Inputs in the module (Text, Number, Checkbox)
    if (moduleEl) {
        const inputs = moduleEl.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = false;
            } else if (input.tagName === 'SELECT') {
                input.selectedIndex = 0;
            } else {
                input.value = '';
            }
        });
    }

    // 3. Hide all progressive revelation wrappers
    if (moduleEl) {
        moduleEl.querySelectorAll('[id*="wrapper-"]').forEach(w => w.classList.add('hidden'));
    }

    // 4. Global UI Refresh
    renderDynamicLists();
    updateUITranslations();
    updatePagasUI();
    syncAllTogglesUI(country);

    setCountry(country === 'sp' ? 'spain' : 'uk');

    // 5. Limpieza profunda de resultados
    getEl('results-section').classList.add('hidden');
    getEl('results-content').classList.add('hidden');
    const resultsList = getEl('results-list');
    if (resultsList) resultsList.innerHTML = '';
    getEl('net-result-value').textContent = '0.00';

    window.scrollTo({ top: 0, behavior: 'smooth' });
};

function syncAllTogglesUI(country) {
    if (country === 'sp') {
        // Reset Contrato
        const contGroup = getEl('btn-cont-indef').parentNode;
        contGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        getEl('btn-cont-indef').classList.add('active');

        // Reset Discapacidad
        const disGroup = getEl('btn-dis-none').parentNode;
        disGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        getEl('btn-dis-none').classList.add('active');

        // Reset Pagadores
        const payGroup = getEl('sp-pagadores-label').nextElementSibling;
        payGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        payGroup.querySelectorAll('button')[0].classList.add('active');
    } else {
        // Reset UK Toggles
        const groups = [
            'uk-hourly-monthly-config',
            'uk-ir35-type-label',
            'uk-assignment-label',
            'uk-jobs-label',
            'uk-pension-label'
        ];

        groups.forEach(id => {
            const label = getEl(id);
            if (label) {
                const group = label.nextElementSibling || label.querySelector('.frequency-toggle');
                if (group) {
                    group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                    group.querySelectorAll('button')[0].classList.add('active');
                }
            }
        });

        // Reset UK Weekly/Monthly toggle
        const ukFreqGroup = getEl('btn-uk-weekly').parentNode;
        ukFreqGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        getEl('btn-uk-weekly').classList.add('active');
    }
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
        annualContractBase = parseSafe('sp-annual-gross');
    } else if (appState.mode === 'monthly') {
        let mGross = parseSafe('sp-monthly-gross');
        annualContractBase = mGross * pagas;
    } else if (appState.mode === 'hourly') {
        let price = parseSafe('sp-hourly-price');
        let hoursMonth = parseSafe('sp-hourly-hours');
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
    // El IRPF mensual es el total anual dividido entre 12, ya que la base mensual visible ya incluye el prorrateo de extras.
    const visibleMonthlyIRPF = res.totalIRPF / 12;

    renderResult(lang.bruto + " " + lang.mensual, visibleMonthlyGross.toFixed(2) + "€");
    if (res.holidayPayMonthly > 0) renderResult(lang.holiday_res, res.holidayPayMonthly.toFixed(2) + "€");
    if (res.otAmountMonthly > 0) renderResult(lang.ot_res, res.otAmountMonthly.toFixed(2) + "€");

    // Seguridad Social: Siempre se muestra el descuento de 1/12
    renderResult(lang.ss, "-" + monthlySS.toFixed(2) + "€");

    // IRPF: Refleja el descuento mensual real basado en el total anual
    renderResult(lang.irpf + ` (${parseFloat(res.irpfPerc).toFixed(2)}%)`, "-" + visibleMonthlyIRPF.toFixed(2) + "€");

    if (res.extraTaxMonthly > 0) renderResult(lang.other_deductions, "-" + res.extraTaxMonthly.toFixed(2) + "€");
    if (res.exemptIncomeMonthly > 0) renderResult(lang.labels.cotiza + " (Exento)", res.exemptIncomeMonthly.toFixed(2) + "€");

    // Neto Visible final
    const visibleNet = visibleMonthlyGross - monthlySS - visibleMonthlyIRPF - res.extraTaxMonthly + (res.exemptIncomeMonthly || 0);
    getEl('net-result-value').textContent = visibleNet.toFixed(2) + "€";
}

function performSpainCalculations(annualGross, pagas) {
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

    // Ingresos Exentos (Dietas/KM)
    const exemptIncomeMonthly = parseSafe('sp-pro-exempt-income');
    const exemptIncomeAnnual = exemptIncomeMonthly * 12;

    // Base Salarial (Salario + Antigüedad) - Multiplica por PAGAS
    const antiguedad = parseSafe('sp-pro-antiguedad');
    const contractBaseAnnual = annualGross + (antiguedad * pagas);

    // Sistema de "Cucharas" (Buckets) para impuestos
    let bucketIRPF = contractBaseAnnual;
    let bucketSS = contractBaseAnnual;
    let bucketUnemployment = contractBaseAnnual;
    let totalGrossAnnual = contractBaseAnnual; // TODO el dinero que entra

    // Procesar Retribución en Especie (Tributan pero no se cobran)
    let especieAnnualSum = 0;
    appState.spToggles.dynamicEspecie.forEach(e => {
        const annualAmt = e.amount * 12;
        especieAnnualSum += annualAmt;
        bucketIRPF += annualAmt;
        bucketSS += annualAmt;
        bucketUnemployment += annualAmt;
        totalGrossAnnual += annualAmt;
    });

    // Procesar Bonus Dinámicos
    let bonusMonthlySum = 0;
    appState.spToggles.dynamicBonus.forEach(b => {
        const annualAmt = b.amount * 12;
        bonusMonthlySum += b.amount;
        totalGrossAnnual += annualAmt;
        if (b.irpf) bucketIRPF += annualAmt;
        if (b.ss) bucketSS += annualAmt;
        if (b.unemployment) bucketUnemployment += annualAmt;
    });

    // Procesar Horas Extras y Pluses de Horas
    const mode = appState.mode;
    const suffix = mode === 'annual' ? 'ann' : mode === 'monthly' ? 'mon' : mode === 'hourly' ? 'hou' : 'inv';
    const otHours = parseSafe(`sp-pro-overtime-hours-${suffix}`);
    const otPrice = parseSafe(`sp-pro-overtime-price-${suffix}`);
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
    const rateCommon = (parseSafe('sp-rate-common') || 4.7) / 100;
    const rateUnemployment = (parseSafe('sp-rate-unemployment') || (isTemporal ? 1.60 : 1.55)) / 100;
    const rateFpMei = (parseSafe('sp-rate-fp-mei') || 0.20) / 100; // MEI 2026: 0.20% trabajador

    // Bases Mínimas Proyectadas 2026 (Prorrateadas según Jornada)
    const basesMinimas = {
        1: 1950, 2: 1620, 3: 1410, 4: 1360, 5: 1360, 6: 1360, 7: 1360, 8: 1360, 9: 1360, 10: 1360, 11: 1360
    };
    const minLegalMonthly = (basesMinimas[group] || 1360) * jornadaPerc;

    const MAX_SS_BASE_MONTHLY = 4950.00;
    const manualBaseCommon = parseSafe('sp-pro-base-common');
    const manualBaseAtEp = parseSafe('sp-pro-base-at-ep');

    let baseSSAnnual, baseUnemploymentAnnual;

    // Base Contingencias Generales (Con suelo de Grupo y techo de Ley)
    if (manualBaseCommon > 0) {
        baseSSAnnual = manualBaseCommon * 12;
    } else {
        const monthlyBase = Math.max(minLegalMonthly, Math.min(bucketSS / 12, MAX_SS_BASE_MONTHLY));
        baseSSAnnual = monthlyBase * 12;
    }

    // Base AT/EP (Desempleo/FP)
    if (manualBaseAtEp > 0) {
        baseUnemploymentAnnual = manualBaseAtEp * 12;
    } else {
        const monthlyBase = Math.max(minLegalMonthly, Math.min(bucketUnemployment / 12, MAX_SS_BASE_MONTHLY));
        baseUnemploymentAnnual = monthlyBase * 12;
    }

    const totalSS = (baseSSAnnual * rateCommon) +
                    (baseUnemploymentAnnual * rateUnemployment) +
                    (baseSSAnnual * rateFpMei) +
                    (otAmountAnnual * 0.047); // OT siempre cotiza al 4.7% fijo por ley

    const manualVal = getEl('sp-irpf-manual')?.value.trim();
    let irpfPerc;
    if (appState.isPro && manualVal !== "") {
        irpfPerc = parseFloat(manualVal);
        if (isNaN(irpfPerc)) irpfPerc = estimateSpainIRPF(bucketIRPF, children, childDisCount, others, otherDisCount, other75Count, region, disability, isJoint, multipayer, totalSS);
    } else {
        irpfPerc = estimateSpainIRPF(bucketIRPF, children, childDisCount, others, otherDisCount, other75Count, region, disability, isJoint, multipayer, totalSS);
    }

    const totalIRPF = bucketIRPF * (irpfPerc / 100);
    // El neto final resta la Seguridad Social, el IRPF, las deducciones y la Retribución en Especie (porque ya se ha recibido)
    // Se suman los ingresos exentos (Dietas) al final porque no tributan.
    const netAnnual = totalGrossAnnual - totalSS - totalIRPF - (dynamicDeductionsTotal * 12) - especieAnnualSum + exemptIncomeAnnual;

    return { taxableAnnual: totalGrossAnnual, totalSS, totalIRPF, irpfPerc, extraTaxMonthly: dynamicDeductionsTotal, netAnnual, holidayPayMonthly: holidayPayAnnual / pagas, otAmountMonthly, netMonthlyAdditions: bonusMonthlySum, workingMonths, exemptIncomeMonthly };
}

function estimateSpainIRPF(gross, children, childDisCount, others, otherDisCount, other75Count, region, disability, isJoint, multipayer, totalSSAnnual) {
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
    else if (region === 'ceuta' || region === 'melilla') tax *= 0.50; // Deducción 50% IRPF

    return (tax / gross) * 100;
}

function calculateSpainDismissal() {
    const lang = i18n[appState.language];
    const salary = parseSafe('sp-dismissal-salary');
    const years = parseSafe('sp-dismissal-years');
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
    const target = parseSafe('sp-inverse-net');
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
        annualGross = parseSafe('uk-annual-gross');
        periods = appState.ukPeriods.annual;
    } else if (appState.mode === 'monthly') {
        let mGross = parseSafe('uk-monthly-gross');
        periods = appState.ukPeriods.monthly;
        annualGross = mGross * periods;
    } else if (appState.mode === 'hourly') {
        const rate = parseSafe('uk-hourly-rate');
        const hours = parseSafe('uk-hourly-hours');

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
    if (res.holidayPayMonthly > 0) renderResult(lang.holiday_res, res.holidayPayMonthly.toFixed(2) + "£");

    // Dynamic Bonus Display for UK
    if (res.bonusTotalMonthly > 0) {
        renderResult(lang.extras, res.bonusTotalMonthly.toFixed(2) + "£");
    }

    if (res.pension > 0) renderResult(lang.pension, "-" + (res.pension / periods).toFixed(2) + "£");
    renderResult(lang.irpf, "-" + (res.tax / periods).toFixed(2) + "£");
    renderResult(lang.ss + " (NI)", "-" + (res.ni / periods).toFixed(2) + "£");
    if (res.cbCharge > 0) renderResult(lang.labels.child_benefit, "-" + (res.cbCharge / periods).toFixed(2) + "£");

    if (res.studentLoan > 0) renderResult(lang.student_loan_res, "-" + (res.studentLoan / periods).toFixed(2) + "£");

    if (res.employerNi > 0) {
        renderResult(lang.emp_ni, (res.employerNi / periods).toFixed(2) + "£");
    }

    getEl('net-result-value').textContent = (res.net / periods).toFixed(2) + "£";
}

function calculateUKIR35() {
    const lang = i18n[appState.language];
    const type = appState.ukToggles['ir35-type'] || 'inside';
    const rate = parseSafe('uk-ir35-rate');
    const freq = appState.ukToggles['ir35-freq'] || 'daily';

    // Assignment Rate projected to Annual
    let annualRevenue = 0;
    if (freq === 'daily') {
        annualRevenue = rate * 260; // 260 working days/yr
    } else {
        annualRevenue = rate * 37.5 * 52; // standard 37.5h week
    }

    if (type === 'inside') {
        const margin = parseSafe('uk-umbrella-margin') || 25;
        const annualMargin = margin * 52;

        // 1. Remove Umbrella Margin
        let afterMargin = annualRevenue - annualMargin;

        // 2. Reverse calculate Employer Costs from Assignment Rate
        // Assignment = Gross + ErNI + Apprenticeship Levy + ErPension
        // Approx factor for 2026 ErCosts: 1.138 (ErNI) + 0.005 (AL) + 0.03 (Pension) = ~1.173
        const grossSalary = afterMargin / 1.15; // Simplified reverse for guidance

        const res = performUKCalculations(grossSalary, 12);
        renderResult("Assignment Revenue", annualRevenue.toFixed(2) + "£");
        renderResult(lang.labels.umbrella_margin, annualMargin.toFixed(2) + "£");
        renderResult(lang.bruto_result_label, grossSalary.toFixed(2) + "£");
        getEl('net-result-value').textContent = (res.net / 12).toFixed(2) + "£";
    } else {
        const expenses = parseSafe('uk-business-expenses');
        const annualExpenses = expenses * 12;
        const profit = annualRevenue - annualExpenses;

        // Outside IR35: 19-25% Corp Tax (Simplified 20% for 2026 guidance)
        const corpTax = profit * 0.20;
        const availableForDividends = profit - corpTax;

        // Strategy: Salary at NI Primary Threshold (£12,570) + Dividends
        const salary = 12570;
        const dividends = availableForDividends - salary;

        // Dividend Tax (Simplified 2026: 8.75% after £500 allowance)
        const divTax = Math.max(0, dividends - 500) * 0.0875;

        const netAnnual = salary + dividends - divTax;

        renderResult("Revenue", annualRevenue.toFixed(2) + "£");
        renderResult(lang.labels.expenses, annualExpenses.toFixed(2) + "£");
        renderResult("Corporation Tax", "-" + corpTax.toFixed(2) + "£");
        renderResult("Dividends (Net)", dividends.toFixed(2) + "£");

        getEl('net-result-value').textContent = (netAnnual / 12).toFixed(2) + "£";
    }
}

function performUKCalculations(annual, periods = 12) {
    if (periods <= 0) periods = 12;
    const bik = parseSafe('uk-pro-bik') * 12;
    const pPerc = parseSafe('uk-pro-pension');
    const pType = appState.ukToggles['pension-type'] || 'before';

    // Overtime for UK
    const mode = appState.mode;
    const suffix = mode === 'annual' ? 'ann' : mode === 'monthly' ? 'mon' : mode === 'hourly' ? 'hou' : 'inv';
    const otHours = parseSafe(`uk-pro-overtime-hours-${suffix}`);
    const otPrice = parseSafe(`uk-pro-overtime-price-${suffix}`);

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
        holidayPayAnnual = annual * 0.1207;
    }

    // 3. Bonus logic (Dynamic)
    let taxableBonusAnnual = otAmountAnnual;
    let nonTaxableBonusAnnual = 0;
    let bonusTotalMonthlyTotal = otAmountMonthly;

    appState.ukToggles.dynamicBonus.forEach(b => {
        if (b.irpf) {
            taxableBonusAnnual += b.amount * 12;
        } else {
            nonTaxableBonusAnnual += b.amount * 12;
        }
        bonusTotalMonthlyTotal += b.amount;
    });

    const taxCodeSelect = getEl('uk-pro-taxcode-select')?.value;
    const taxCodeManual = getEl('uk-pro-taxcode-manual')?.value.toUpperCase() || "";
    const taxCode = taxCodeSelect === 'custom' ? taxCodeManual : taxCodeSelect;

    const niLetter = getEl('uk-pro-ni-letter')?.value || "A";
    const manualNiAmtMonthly = parseFloat(getEl('uk-pro-ni-manual-amt')?.value);
    const regionSelect = getEl('uk-region-select')?.value || "rUK";
    const studentLoanPlan = getEl('uk-pro-student-loan')?.value || "none";
    const hasPostgrad = getEl('uk-pro-postgrad')?.checked;
    const isMultipayer = appState.ukToggles.jobs === '2';
    const isMarriage = getEl('uk-pro-marriage')?.checked;
    const isBlind = getEl('uk-pro-blind')?.checked;
    const hasCB = getEl('uk-pro-cb-toggle')?.checked;
    const cbChildren = parseInt(getEl('uk-pro-children-count')?.value) || 0;

    // 1. Detect region from Tax Code prefix 'S'
    let isScottish = (regionSelect === "SCO") || taxCode.startsWith('S');

    // 2. Allowance from Tax Code
    let allowance = isMultipayer ? 0 : 12570;
    if (isMarriage && !isMultipayer) allowance += 1260;
    if (isBlind && !isMultipayer) allowance += 3070;

    if (taxCode && !isMultipayer) {
        if (taxCode.startsWith('K')) {
            const kVal = parseInt(taxCode.replace(/\D/g, ''));
            if (!isNaN(kVal)) allowance = -kVal * 10;
        } else {
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

    // 4. Pension (Qualifying Earnings Logic: between £6,240 and £50,270)
    let pensionBase = Math.max(0, Math.min(annual + holidayPayAnnual + taxableBonusAnnual, 50270) - 6240);
    const pensionAnnual = pensionBase * (pPerc / 100);

    // 5. NI Calculation
    const niBaseAnnual = annual + holidayPayAnnual + taxableBonusAnnual;
    let ni = 0;
    let niRateMain = 0.08;
    let niRateHigher = 0.02;

    if (niLetter === "B") niRateMain = 0.0185;
    else if (niLetter === "C") niRateMain = 0;
    else if (niLetter === "J") { niRateMain = 0.02; niRateHigher = 0.02; }

    if (niBaseAnnual > 12570) {
        ni = (Math.min(niBaseAnnual, 50270) - 12570) * niRateMain;
        if (niBaseAnnual > 50270) ni += (niBaseAnnual - 50270) * niRateHigher;
    }
    let employerNi = Math.max(0, (niBaseAnnual - 5000) * 0.15); // Simple estimate with £5k allowance

    // 6. Income Tax
    let taxableAmount = Math.max(0, annual + holidayPayAnnual + taxableBonusAnnual + bik - allowance);
    // Net Pay Arrangement: deduction before tax. Relief at source: after tax.
    if (pType === 'before') taxableAmount = Math.max(0, taxableAmount - pensionAnnual);

    let tax = 0;
    if (taxCode === "D0") tax = taxableAmount * 0.40;
    else if (taxCode === "D1") tax = taxableAmount * 0.45;
    else if (taxCode === "BR") tax = taxableAmount * 0.20;
    else if (taxCode === "NT") tax = 0;
    else {
        // Recognize 'S' for Scotland and 'C' for Wales
        let isScottish = (regionSelect === "SCO") || taxCode.startsWith('S');
        let isWelsh = taxCode.startsWith('C');

        if (isScottish) {
            if (taxableAmount <= 2162) tax = taxableAmount * 0.19;
            else if (taxableAmount <= 13118) tax = 410.78 + (taxableAmount - 2162) * 0.20;
            else if (taxableAmount <= 31092) tax = 2601.98 + (taxableAmount - 13118) * 0.21;
            else if (taxableAmount <= 62430) tax = 6376.52 + (taxableAmount - 31092) * 0.42;
            else if (taxableAmount <= 125140) tax = 19538.48 + (taxableAmount - 62430) * 0.45;
            else tax = 47757.98 + (taxableAmount - 125140) * 0.48;
        } else if (isWelsh) {
            // Welsh rates are currently aligned with England, but kept separate for future proofing
            if (taxableAmount <= 37700) tax = taxableAmount * 0.20;
            else if (taxableAmount <= 125140) tax = 7540 + (taxableAmount - 37700) * 0.40;
            else tax = 42516 + (taxableAmount - 125140) * 0.45;
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

    // 8. Child Benefit Charge
    let cbCharge = 0;
    if (hasCB && annual > 60000 && cbChildren > 0) {
        const weeklyBenefit = 22.15 + (cbChildren - 1) * 14.70;
        const totalBenefit = weeklyBenefit * 52;
        const excess = Math.max(0, annual - 60000);
        const perc = Math.min(1, excess / 20000);
        cbCharge = totalBenefit * perc;
    }

    let net = annual + holidayPayAnnual + taxableBonusAnnual + nonTaxableBonusAnnual - tax - ni - pensionAnnual - studentLoan - cbCharge;
    return { tax, ni, employerNi, pension: pensionAnnual, studentLoan, cbCharge, net, bonusTotalMonthly: bonusTotalMonthlyTotal, holidayPayMonthly: holidayPayAnnual / periods };
}

function calculateUKRedundancy() {
    const a = parseSafe('uk-redundancy-age');
    const y = parseSafe('uk-redundancy-years');
    const w = Math.min(parseSafe('uk-redundancy-weekly'), 725);
    let total = 0;
    for (let i = 0; i < Math.min(y, 20); i++) {
        let age = a - i;
        total += (age >= 41 ? w * 1.5 : (age >= 22 ? w : w * 0.5));
    }
    getEl('net-result-value').textContent = total.toFixed(2) + "£";
}

function calculateUKInverse() {
    const lang = i18n[appState.language];
    const target = parseSafe('uk-inverse-net');
    const periods = appState.ukPeriods.annual; // Usar periodos configurados (12, 13, 14)

    let low = target * periods, high = target * periods * 4, gross = low;
    for(let i=0; i<40; i++) {
        gross = (low + high) / 2;
        let res = performUKCalculations(gross, periods);
        if (res.net / periods < target) low = gross; else high = gross;
    }
    renderResult(lang.bruto_est + " " + lang.anual, gross.toFixed(2) + "£");
    getEl('net-result-value').textContent = (gross / periods).toFixed(2) + "£";
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
    const emailInput = getEl('auth-email');
    if (emailInput && emailInput.value === PRO_MASTER_EMAIL) activatePro("Admin Login");
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
