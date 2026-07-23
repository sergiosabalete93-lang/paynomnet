import { i18n } from '../i18n/i18n.js';
import { appState } from './state.js';

/**
 * Módulo de Utilidades Técnicas y Validaciones.
 * Estas funciones son internas y se exportan para ser usadas por otros módulos.
 */

export function getEl(id) {
    return document.getElementById(id);
}

export function parseSafe(id) {
    const el = getEl(id);
    if (!el || !el.value) return 0;
    let val = el.value.toString().trim();
    if (val.includes(',') && val.includes('.')) {
        if (val.lastIndexOf('.') < val.lastIndexOf(',')) {
            val = val.replace(/\./g, '').replace(',', '.');
        } else {
            val = val.replace(/,/g, '');
        }
    } else if (val.includes(',')) {
        val = val.replace(',', '.');
    }
    return parseFloat(val) || 0;
}

export function validateForm() {
    let isValid = true;
    const errors = [];
    const lang = i18n[appState.language];

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

    if (!c) { markGroupError('btn-spain', "Selecciona un país"); return false; }
    if (!m) { markGroupError('btn-mode-annual', "Selecciona un modo"); return false; }

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

        if (m === 'hourly' && !appState.ukHourlyFreq) markGroupError('btn-uk-weekly', "Select weekly or monthly");
        if (appState.ukPeriods[m] === 0 && m !== 'dismissal' && m !== 'ir35' && m !== 'hourly') markGroupError('uk-pay-periods-label', "Select pay periods");
    }

    if (!isValid && errors.length > 0) errors[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    return isValid;
}

export function resetToDefaultMode() {
    const btn = document.getElementById('btn-mode-annual');
    if (btn) btn.click();
}

export function toggleHelp(event, id) {
    if (event) event.stopPropagation();
    const el = getEl(id);
    if (!el || !el.textContent || el.textContent.trim() === "") return;
    el.classList.toggle('visible');
}

export function updateEspecieVal(id, val) {
    const e = appState.spToggles.dynamicEspecie.find(x => x.id === id);
    if (e) e.amount = parseFloat(val) || 0;
}

export function setSpainPagas(event, val) {
    if (event) {
        const btn = event.target.closest('button');
        if (btn) {
            const parent = btn.parentNode;
            parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    }
    appState.spToggles.pagas = parseInt(val);
    const maxProrrated = appState.spToggles.pagas - 12;
    if (appState.spToggles.pagas_prorrateadas > maxProrrated) {
        appState.spToggles.pagas_prorrateadas = 0;
    }
    if (window.updatePagasUI) window.updatePagasUI();
}

export function setSpainProrrateadas(val) {
    appState.spToggles.pagas_prorrateadas = parseInt(val);
    if (window.updatePagasUI) window.updatePagasUI();
}

export function toggleRatesConfig() {
    const el = getEl('sp-rates-config');
    if (el) el.classList.toggle('hidden');
}

export function toggleBasesConfig() {
    const el = getEl('sp-bases-config');
    if (el) el.classList.toggle('hidden');
}

export function addExtraItem(country, type, suffix) {
    const target = country === 'sp' ? appState.spToggles : appState.ukToggles;
    if (type === 'bonus') {
        const id = Date.now();
        target.dynamicBonus.push({ id, amount: 0, irpf: true, ss: true, unemployment: true });
    } else if (type === 'especie') {
        const id = Date.now();
        appState.spToggles.dynamicEspecie.push({ id, amount: 0 });
    } else if (type === 'ot') {
        if (country === 'sp') {
            const id = Date.now();
            appState.spToggles.dynamicOT.push({ id, amount: 0, suffix });
        }
    } else if (type === 'deduction') {
        const id = Date.now();
        if (country === 'sp') appState.spToggles.dynamicDeductions.push({ id, amount: 0 });
    }
    renderDynamicLists();
}

export function removeExtraItem(type, id, country = 'sp') {
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
}

export function renderDynamicLists() {
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
                    <label><input type="checkbox" ${b.exento ? 'checked' : ''} onchange="updateBonusVal('sp', ${b.id}, 'exento', this.checked)"> Exento (Dietas)</label>
                    <label><input type="checkbox" ${b.irpf && !b.exento ? 'checked' : ''} ${b.exento ? 'disabled' : ''} onchange="updateBonusVal('sp', ${b.id}, 'irpf', this.checked)"> IRPF</label>
                    <label><input type="checkbox" ${b.ss && !b.exento ? 'checked' : ''} ${b.exento ? 'disabled' : ''} onchange="updateBonusVal('sp', ${b.id}, 'ss', this.checked)"> SS</label>
                </div>
            `;
            bonusListSp.appendChild(div);
        });
    }

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
                    <label><input type="checkbox" ${b.irpf ? 'checked' : ''} onchange="updateBonusVal('uk', ${b.id}, 'irpf', this.checked)"> Retención</label>
                    <label><input type="checkbox" ${b.ss ? 'checked' : ''} onchange="updateBonusVal('uk', ${b.id}, 'ss', this.checked)"> NI</label>
                </div>
            `;
            bonusListUK.appendChild(div);
        });
    }

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

export function updateBonusVal(country, id, key, val) {
    const target = country === 'sp' ? appState.spToggles : appState.ukToggles;
    const b = target.dynamicBonus.find(x => x.id === id);
    if (b) b[key] = (key === 'amount') ? (parseFloat(val) || 0) : val;
}

export function updateOTVal(id, val) {
    const o = appState.spToggles.dynamicOT.find(x => x.id === id);
    if (o) o.amount = parseFloat(val) || 0;
}

export function updateDeductionVal(id, val) {
    const d = appState.spToggles.dynamicDeductions.find(x => x.id === id);
    if (d) d.amount = parseFloat(val) || 0;
}

export function setSpainToggle(event, key, val) {
    appState.spToggles[key] = val;
    if (event) {
        const btn = event.target.closest('button');
        if (btn) {
            const parent = btn.parentNode;
            parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    }
    if (key === 'contrato') {
        const rateInput = getEl('sp-rate-unemployment');
        if (rateInput) rateInput.value = (val === 'temp') ? '1.60' : '1.55';
        getEl('wrapper-sp-meses-trabajo')?.classList.toggle('hidden', val !== 'temp');
    }
}

export function setUKToggle(event, key, val) {
    appState.ukToggles[key] = val;
    if (event) {
        const btn = event.target.closest('button');
        if (btn) {
            const parent = btn.parentNode;
            parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    }
    if (key === 'ir35-type') {
        const inside = getEl('wrapper-uk-inside-only');
        const outside = getEl('wrapper-uk-outside-only');
        if (inside) inside.classList.toggle('hidden', val !== 'inside');
        if (outside) outside.classList.toggle('hidden', val !== 'outside');
    }
}

export function setUKPeriods(event, mode, val) {
    appState.ukPeriods[mode] = val;
    if (event) {
        const btn = event.target.closest('button');
        if (btn) {
            const parent = btn.parentNode;
            parent.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    }
}

export function setHourlyType(event, country, type) {
    if (country === 'uk') {
        appState.ukHourlyFreq = type;
        if (event) {
            const btn = event.target.closest('button');
            if (btn) {
                btn.parentNode.querySelectorAll('button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        }
        const config = getEl('uk-hourly-monthly-config');
        if (config) config.style.display = type === 'monthly' ? 'block' : 'none';
        if (window.updateUITranslations) window.updateUITranslations();
    }
}

export function syncUKHoliday(checked) {
    appState.ukToggles['holiday-prorated'] = checked;
    ['ann', 'mon', 'hou', 'inv', 'ir35'].forEach(s => {
        const el = getEl(`uk-holiday-prorated-${s}`);
        if (el) el.checked = checked;
    });
}

export function resetAllFields(country) {
    const isES = appState.language === 'es';
    if (!confirm(isES ? '¿Limpiar todos los datos?' : 'Clear all data?')) return;
    location.reload();
}

export function toggleSeniority2012(val) {
    const wrapper = getEl('wrapper-seniority-2012');
    if (wrapper) wrapper.classList.toggle('hidden', val !== 'unfair');
}
