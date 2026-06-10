
//  SportPrep – app.js
//  Logique complète : profil, activité, checklist, nutrition

// Données 
const SPORTS = [
  { id:'course',        label:'Course à pied', icon:'<img src="/static/icons/1.jpg" alt="course" width="100">', met:10, sac:false },
  { id:'trail',         label:'Trail',         icon:'<img src="/static/icons/2.jpg" alt="course" width="100">',  met:9,  sac:true  },
  { id:'rando',         label:'Randonnée',     icon:'<img src="/static/icons/3.jpg" alt="course" width="100">', met:5.5, sac:true  },
  { id:'bivouac',       label:'Bivouac',       icon:'<img src="/static/icons/4.jpeg" alt="course" width="100">', met:4,  sac:true  },
  { id:'velo',          label:'Vélo route',    icon:'<img src="/static/icons/5.jpeg" alt="course" width="100">', met:8,  sac:false },
  { id:'natation',      label:'Natation',      icon:'<img src="/static/icons/6.jpeg" alt="course" width="100">', met:8,  sac:false },
  { id:'aguerrissement',label:'Stage aguerr.', icon:'<img src="/static/icons/7.jpeg" alt="course" width="100">', met:7,  sac:true  },
  { id:'ski',           label:'Ski/Alpinisme', icon:'<img src="/static/icons/8.jpeg" alt="course" width="100">', met:7,  sac:true  },
  { id:'escalade',      label:'Escalade',      icon:'<img src="/static/icons/9.jpeg" alt="course" width="100">', met:8,  sac:true  },
];

const EQUIPMENT = {
  course: [
    {n:'Chaussures de running',w:600,req:true},{n:'Chaussettes techniques',w:50,req:true},
    {n:'Montre GPS',w:50,req:false},{n:'Dossard/numéro',w:5,req:false},
    {n:'Téléphone chargé',w:200,req:true},{n:'Gel énergétique x2',w:60,req:false},
    {n:'Eau (flacon 500 ml)',w:500,req:true},
  ],
  trail: [
    {n:'Chaussures de trail',w:650,req:true},{n:'Vest/sac trail',w:600,req:true},
    {n:'Bâtons de trail',w:500,req:false},{n:'Téléphone chargé',w:200,req:true},
    {n:'Carte/GPS',w:100,req:true},{n:'Couverture de survie',w:80,req:true},
    {n:'Veste imperméable',w:400,req:true},{n:'Eau (1L min.)',w:1000,req:true},
    {n:'Gels/barres x4',w:200,req:true},{n:'Trousse premiers secours',w:200,req:true},
    {n:'Lampe frontale',w:100,req:false},{n:'Crème solaire',w:80,req:false},
  ],
  rando: [
    {n:'Chaussures de randonnée',w:1000,req:true},{n:'Sac à dos 20-30L',w:800,req:true},
    {n:'Bâtons de randonnée',w:500,req:false},{n:'Carte IGN + boussole',w:150,req:true},
    {n:'Téléphone chargé',w:200,req:true},{n:'Veste coupe-vent',w:300,req:true},
    {n:'Eau (1.5L)',w:1500,req:true},{n:'Nourriture (repas+collation)',w:600,req:true},
    {n:'Couverture de survie',w:80,req:true},{n:'Trousse premiers secours',w:200,req:true},
    {n:'Crème solaire',w:80,req:false},{n:'Gants et bonnet',w:150,req:false},
  ],
  bivouac: [
    {n:'Tente ou tarp (1.5-2 kg)',w:1800,req:true},{n:'Sac de couchage',w:1200,req:true},
    {n:'Matelas de sol',w:400,req:true},{n:'Sac à dos 40-60L',w:1500,req:true},
    {n:'Réchaud + gaz',w:350,req:true},{n:'Gamelle + couverts',w:200,req:true},
    {n:'Eau (min. 2L + filtre)',w:2200,req:true},{n:'Nourriture 2 repas',w:800,req:true},
    {n:'Lampe frontale + piles',w:150,req:true},{n:'Carte + boussole',w:150,req:true},
    {n:'Trousse premiers secours',w:200,req:true},{n:'Veste polaire',w:400,req:true},
    {n:'Imperméable',w:400,req:true},{n:'Chaussures de marche',w:1000,req:true},
  ],
  velo: [
    {n:'Casque',w:250,req:true},{n:'Lunettes',w:30,req:false},
    {n:'Cuissard rembourré',w:200,req:true},{n:'Maillot cycliste',w:120,req:false},
    {n:'Chambres à air x2',w:150,req:true},{n:'Démonte-pneu + pompe',w:120,req:true},
    {n:'Eau (bidons 2×750 ml)',w:1500,req:true},{n:'Barres/gels x3',w:180,req:true},
    {n:'Téléphone + support',w:250,req:true},
  ],
  natation: [
    {n:'Maillot de bain/combi',w:300,req:true},{n:'Lunettes de natation',w:50,req:true},
    {n:'Bonnet',w:40,req:false},{n:'Serviette microfibre',w:150,req:true},
    {n:'Crème solaire (OW)',w:80,req:false},{n:'Bouée de sécurité (OW)',w:200,req:false},
    {n:'Eau (500 ml)',w:500,req:true},
  ],
  aguerrissement: [
    {n:'Rangers/chaussures de marche',w:1200,req:true},{n:'Tenue de sport adaptée',w:600,req:true},
    {n:'Sac à dos 20-30L',w:800,req:true},{n:'Eau (2L min.)',w:2000,req:true},
    {n:'Ration de combat / barres',w:600,req:true},{n:'Imperméable',w:400,req:true},
    {n:'Trousse premiers secours',w:200,req:true},{n:'Couverture de survie',w:80,req:true},
    {n:'Lampe frontale',w:100,req:true},{n:'Gants de travail',w:100,req:false},
  ],
  ski: [
    {n:'Skis/crampons/piolet',w:3000,req:true},{n:'Chaussures de ski/rando',w:2000,req:true},
    {n:'Casque',w:400,req:true},{n:'Lunettes de glacier',w:80,req:true},
    {n:'Veste + pantalon ski',w:1200,req:true},{n:'Couche base thermique',w:300,req:true},
    {n:'Gants chauds',w:200,req:true},{n:'Crème solaire indice 50',w:80,req:true},
    {n:'DVA + pelle + sonde',w:1200,req:true},{n:'Sac à dos 25-30L',w:900,req:true},
    {n:'Eau (1L minimum)',w:1000,req:true},{n:'Carte + GPS',w:150,req:true},
  ],
  escalade: [
    {n:'Baudrier',w:450,req:true},{n:"Chaussons d'escalade",w:300,req:true},
    {n:'Casque',w:350,req:true},{n:'Corde (si tête)',w:4000,req:false},
    {n:'Dégaines x6',w:600,req:false},{n:'Magnésie',w:100,req:true},
    {n:'Descendeur + mousquetons',w:300,req:false},{n:'Eau (1L)',w:1000,req:true},
    {n:'Barres énergétiques x2',w:100,req:false},
  ],
};

const EXTRA_METEO = {
  pluie:       [{n:'Poncho/imperméable',w:300},{n:'Sacs étanches pour affaires',w:100},{n:'Chaussettes imperméables',w:80}],
  neige:       [{n:'Guêtres',w:300},{n:'Couche thermique supplémentaire',w:300},{n:'Bâtons (si rando)',w:500}],
  trescaliente:[{n:'Casquette/chapeau',w:80},{n:'Spray solaire 50+',w:100},{n:'Eau supplémentaire +1L',w:1000}],
  vent:        [{n:'Veste coupe-vent',w:250}],
};

// État global
let state = {
  sport: null,
  meteo: { temp:'froid', cond:'beau' },
  checkedItems: {},
  nutritionLog: [],
  calories: 0, hydration: 0, glucides: 0,
};

// Persistance localStorage
function loadState() {
  try {
    const p = JSON.parse(localStorage.getItem('sportPrep_profile') || '{}');
    if (p.prenom) document.getElementById('prenom').value = p.prenom;
    if (p.sexe)   document.getElementById('sexe').value   = p.sexe;
    if (p.age)    document.getElementById('age').value    = p.age;
    if (p.poids)  document.getElementById('poids').value  = p.poids;
    if (p.taille) document.getElementById('taille').value = p.taille;
    if (p.niveau) document.getElementById('niveau').value = p.niveau;

    const s = JSON.parse(localStorage.getItem('sportPrep_state') || '{}');
    if (s.sport)        state.sport        = s.sport;
    if (s.meteo)        state.meteo        = s.meteo;
    if (s.checkedItems) state.checkedItems = s.checkedItems;
    if (s.nutritionLog) state.nutritionLog = s.nutritionLog;
    if (s.calories)     { state.calories = s.calories; state.hydration = s.hydration; state.glucides = s.glucides; }
    if (s.duree)    document.getElementById('duree').value    = s.duree;
    if (s.distance) document.getElementById('distance').value = s.distance;
    if (s.denivele) document.getElementById('denivele').value = s.denivele;
    if (s.chargeSac)document.getElementById('chargeSac').value= s.chargeSac;

    // Restore météo chips
    if (state.meteo.temp) {
      document.querySelectorAll('#tempRow .meteo-chip').forEach(c => {
        c.classList.toggle('selected', c.dataset.val === state.meteo.temp);
      });
    }
    if (state.meteo.cond) {
      document.querySelectorAll('#condRow .meteo-chip').forEach(c => {
        c.classList.toggle('selected', c.dataset.val === state.meteo.cond);
      });
    }
  } catch(e) {}
}

function saveProfile() {
  const p = {
    prenom: document.getElementById('prenom').value,
    sexe:   document.getElementById('sexe').value,
    age:    +document.getElementById('age').value,
    poids:  +document.getElementById('poids').value,
    taille: +document.getElementById('taille').value,
    niveau: document.getElementById('niveau').value,
  };
  localStorage.setItem('sportPrep_profile', JSON.stringify(p));
  updateProfileDisplay();
}

function saveActivityState() {
  const s = {
    sport: state.sport, meteo: state.meteo,
    checkedItems: state.checkedItems, nutritionLog: state.nutritionLog,
    calories: state.calories, hydration: state.hydration, glucides: state.glucides,
    duree:    document.getElementById('duree').value,
    distance: document.getElementById('distance').value,
    denivele: document.getElementById('denivele').value,
    chargeSac:document.getElementById('chargeSac').value,
  };
  localStorage.setItem('sportPrep_state', JSON.stringify(s));
}

// Profil
function getBMR() {
  const age   = +document.getElementById('age').value;
  const poids = +document.getElementById('poids').value;
  const taille= +document.getElementById('taille').value;
  const sexe  = document.getElementById('sexe').value;
  if (sexe === 'H') return Math.round(88.362 + 13.397*poids + 4.799*taille - 5.677*age);
  return Math.round(447.593 + 9.247*poids + 3.098*taille - 4.330*age);
}

function getIMC() {
  const poids = +document.getElementById('poids').value;
  const taille= +document.getElementById('taille').value;
  if (!taille) return 0;
  return poids / ((taille/100)**2);
}

function updateProfileDisplay() {
  const imc = getIMC();
  const bmr = getBMR();
  const age = +document.getElementById('age').value;
  document.getElementById('imcVal').textContent     = imc.toFixed(1);
  document.getElementById('imcDisplay').textContent = imc.toFixed(1);
  document.getElementById('bmrVal').textContent     = bmr;
  document.getElementById('ageVal').textContent     = age;
  let msg = '';
  if      (imc < 18.5) msg = "⚠️ Corpulence insuffisante — apports caloriques à surveiller.";
  else if (imc < 25)   msg = "✅ Corpulence normale — bonne base pour l'effort.";
  else if (imc < 30)   msg = "⚠️ Surpoids — pensez à adapter intensité et durée.";
  else                 msg = "⚠️ Obésité — consultez un médecin avant effort intense.";
  document.getElementById('imcCommentaire').textContent = msg;
}

// Activité
function buildSportGrid() {
  const grid = document.getElementById('sportGrid');
  grid.innerHTML = '';
  SPORTS.forEach(s => {
    const d = document.createElement('div');
    d.className = 'sport-card' + (state.sport === s.id ? ' selected' : '');
    d.innerHTML = `<div class="icon">${s.icon}</div>${s.label}`;
    d.onclick = () => selectSport(s.id);
    grid.appendChild(d);
  });
}

function selectSport(id) {
  state.sport = id;
  buildSportGrid();
  computeCalories();
  buildChecklist();
  updateNutritionPage();
  saveActivityState();
}

function selectMeteo(el, group) {
  const parent = document.getElementById(group === 'temp' ? 'tempRow' : 'condRow');
  parent.querySelectorAll('.meteo-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.meteo[group === 'temp' ? 'temp' : 'cond'] = el.dataset.val;
  buildChecklist();
  computeCalories();
  saveActivityState();
}

function computeCalories() {
  if (!state.sport) return;
  const sport    = SPORTS.find(s => s.id === state.sport);
  const poids    = +document.getElementById('poids').value;
  const duree    = +document.getElementById('duree').value;
  const distance = +document.getElementById('distance').value;
  const denivele = +document.getElementById('denivele').value;
  const chargeSac= +document.getElementById('chargeSac').value;

  let met = sport.met;
  if (document.getElementById('niveau').value === 'debutant') met *= 0.85;
  if (document.getElementById('niveau').value === 'avance')   met *= 1.1;

  let kcal = Math.round(met * poids * duree);
  kcal += Math.round(0.25 * poids * (denivele/100));
  if (chargeSac > 0) kcal = Math.round(kcal * (1 + (chargeSac/poids) * 0.08));
  if (state.meteo.temp === 'chaud')       kcal = Math.round(kcal * 1.05);
  if (state.meteo.temp === 'trescaliente')kcal = Math.round(kcal * 1.12);
  if (state.meteo.cond === 'vent')        kcal = Math.round(kcal * 1.05);
  if (state.meteo.cond === 'neige')       kcal = Math.round(kcal * 1.1);

  let hydL = duree * 0.5;
  if (state.meteo.temp === 'chaud')       hydL += duree * 0.25;
  if (state.meteo.temp === 'trescaliente')hydL += duree * 0.5;
  if (['velo','course','trail'].includes(state.sport)) hydL = Math.max(hydL, duree * 0.6);
  hydL = Math.round(hydL * 10) / 10;

  let glucParH;
  if      (duree <= 1) glucParH = 0;
  else if (duree <= 2) glucParH = 30;
  else if (duree <= 3) glucParH = 45;
  else                 glucParH = 60;
  if (['trail','aguerrissement','ski'].includes(state.sport) && duree > 2)
    glucParH = Math.min(60, glucParH + 10);
  let glucG = Math.round(glucParH * duree);

  state.calories  = kcal;
  state.hydration = hydL;
  state.glucides  = glucG;

  document.getElementById('calVal').textContent  = kcal;
  document.getElementById('hydVal').textContent  = hydL.toFixed(1);
  document.getElementById('glucVal').textContent = glucG;
  document.getElementById('caloriesResult').style.display = 'block';

  let detail = `Effort estimé: ${kcal} kcal sur ${duree}h`;
  if (denivele > 0)   detail += ` avec ${denivele}m D+`;
  if (chargeSac > 0)  detail += `, sac de ${chargeSac} kg`;
  if (glucG > 0)      detail += `. À ingérer : ~${glucParH}g de glucides/h (limite absorption intestinale).`;
  else                detail += `. Effort court : le glycogène musculaire suffit.`;
  document.getElementById('caloriesDetail').textContent = detail;

  updateNutritionPage();
  saveActivityState();
}

// Checklist
function buildChecklist() {
  if (!state.sport) return;
  const container = document.getElementById('checklistItems');
  const alert     = document.getElementById('alertChecklist');
  alert.style.display = 'none';
  container.innerHTML = '';

  let items = [...(EQUIPMENT[state.sport] || [])];
  const extra     = EXTRA_METEO[state.meteo.cond] || [];
  const extraTemp = EXTRA_METEO[state.meteo.temp] || [];
  extra.forEach(e     => { if (!items.find(i => i.n === e.n)) items.push({...e, req:false}); });
  extraTemp.forEach(e => { if (!items.find(i => i.n === e.n)) items.push({...e, req:false}); });

  const custom = JSON.parse(localStorage.getItem('sportPrep_custom_'+state.sport) || '[]');
  custom.forEach(c => items.push({...c, req:false, custom:true}));

  items.forEach((item, idx) => {
    const key     = state.sport + '_' + item.n;
    const checked = state.checkedItems[key] || false;

    const li = document.createElement('li');
    li.className = checked ? 'checked' : '';
    li.innerHTML = `
      <input type="checkbox" ${checked ? 'checked' : ''} id="ck_${idx}">
      <label for="ck_${idx}" style="flex:1;cursor:pointer;">${item.req ? '<strong>'+item.n+'</strong>' : item.n}</label>
      <span class="item-weight ${item.w ? 'has-weight' : ''}">${item.w ? (item.w >= 1000 ? (item.w/1000).toFixed(1)+'kg' : item.w+'g') : ''}</span>
      ${item.custom ? `<button class="btn-danger" onclick="removeCustomItem('${item.n.replace(/'/g,"\\'")}')">✕</button>` : ''}
    `;
    li.querySelector('input').addEventListener('change', e => {
      state.checkedItems[key] = e.target.checked;
      li.className = e.target.checked ? 'checked' : '';
      updateTotalWeight(items);
      updateCheckProgress(items);
      saveActivityState();
    });
    container.appendChild(li);
  });

  updateTotalWeight(items);
  updateCheckProgress(items);
}

function updateTotalWeight(items) {
  const sport = SPORTS.find(s => s.id === state.sport);
  if (!sport || !sport.sac) { document.getElementById('totalWeightBox').style.display = 'none'; return; }
  let total = 0;
  items.forEach(item => {
    const key = state.sport + '_' + item.n;
    if (state.checkedItems[key] && item.w) total += item.w;
  });
  const kg = (total/1000).toFixed(2);
  document.getElementById('totalWeightVal').textContent = kg + ' kg';
  document.getElementById('totalWeightBox').style.display = 'flex';
  document.getElementById('chargeSac').value = parseFloat(kg);
  computeCalories();
}

function updateCheckProgress(items) {
  const total   = items.filter(i => i.req).length;
  const checked = items.filter(i => i.req && state.checkedItems[state.sport+'_'+i.n]).length;
  document.getElementById('checkProgress').textContent = `${checked}/${total} indispensables`;
}

function addCustomItem() {
  const name   = document.getElementById('customItem').value.trim();
  const weight = +document.getElementById('customWeight').value || 0;
  if (!name || !state.sport) return;
  const key    = 'sportPrep_custom_' + state.sport;
  const custom = JSON.parse(localStorage.getItem(key) || '[]');
  custom.push({n: name, w: weight});
  localStorage.setItem(key, JSON.stringify(custom));
  document.getElementById('customItem').value   = '';
  document.getElementById('customWeight').value = '';
  buildChecklist();
}

function removeCustomItem(name) {
  if (!state.sport) return;
  const key    = 'sportPrep_custom_' + state.sport;
  let custom   = JSON.parse(localStorage.getItem(key) || '[]');
  custom       = custom.filter(c => c.n !== name);
  localStorage.setItem(key, JSON.stringify(custom));
  buildChecklist();
}

// Nutrition
function updateNutritionPage() {
  document.getElementById('nCalVal').textContent  = state.calories  || '–';
  document.getElementById('nHydVal').textContent  = state.hydration ? state.hydration.toFixed(1) : '–';
  document.getElementById('nGlucVal').textContent = state.glucides  || '–';

  const duree = +document.getElementById('duree').value;
  const kcal  = state.calories;
  if (!kcal) { document.getElementById('nutritionPlan').textContent = 'Définissez une activité pour voir le plan.'; return; }

  const gluParH = Math.round(state.glucides / duree);
  let msg = `Consommez environ ${gluParH}g de glucides/h d'effort`;
  if (duree >= 2) msg += `, répartis en prises toutes les 30 min`;
  if (duree >= 4) msg += '. Ajoutez des protéines (fromage, noix) à mi-parcours';
  msg += '.';
  document.getElementById('nutritionPlan').textContent = msg;

  buildMealPlan(duree, state.calories, state.hydration, state.glucides);
  renderNutritionLog();
}

function buildMealPlan(duree, kcal, hydL, glucG) {
  const div = document.getElementById('mealPlan');
  div.innerHTML = '';
  const steps = [];

  if (duree >= 1) steps.push({t:'Avant (30 min)',  txt:`Repas glucidique léger (200-300 kcal): riz, pâtes, pain. ${Math.round(hydL*200)} ml d'eau.`});
  if (duree >= 1) steps.push({t:'1ère heure',      txt:`Gel ou barre: ~${Math.min(60,gluH(glucG,duree))}g glucides. ${Math.round(hydL/duree*300)} ml eau.`});
  if (duree >= 2) steps.push({t:'Heure 2',         txt:`Barre céréales ou fruits secs: ~${gluH(glucG,duree)}g glucides. Eau.`});
  if (duree >= 3) steps.push({t:'Mi-sortie',       txt:`Collation solide: fromage, sandwich, noix + eau.`});
  if (duree >= 4) steps.push({t:'Heures 3-4',      txt:`Ration complète: riz gras, purée ou repas chaud (bivouac). Boisson électrolytes.`});
  steps.push(       {t:'Après effort',      txt:`Récupération: 20g protéines + glucides dans les 30 min. 500 ml eau minimum.`});

  steps.forEach(s => {
    const p = document.createElement('div');
    p.style.cssText = 'padding:8px 0;border-bottom:1px solid var(--border);font-size:13px;';
    p.innerHTML = `<span style="font-weight:600;color:var(--accent);">${s.t}</span><br><span style="color:var(--muted);">${s.txt}</span>`;
    div.appendChild(p);
  });
}

function gluH(glucG, duree) { return Math.min(60, Math.round(glucG/duree)); }

function addLog() {
  const type = document.getElementById('logType').value;
  const qty  = +document.getElementById('logQty').value;
  const unit = document.getElementById('logUnit').value || (type==='eau'?'ml':'kcal');
  if (!qty) return;
  const now = new Date();
  state.nutritionLog.push({
    time: now.getHours()+':'+(now.getMinutes()<10?'0':'')+now.getMinutes(),
    type, qty, unit
  });
  document.getElementById('logQty').value = '';
  saveActivityState();
  renderNutritionLog();
}

function renderNutritionLog() {
  const ul = document.getElementById('nutritionLog');
  ul.innerHTML = '';
  let totalEau = 0, totalCal = 0;

  state.nutritionLog.forEach(entry => {
    if (entry.type === 'eau') totalEau += entry.qty;
    if (entry.type === 'energie' || entry.type === 'repas') totalCal += entry.qty;
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="time">${entry.time}</span>
      <div class="content">
        <span class="type type-${entry.type}">${{eau:'Eau',energie:'Énergie',repas:'Repas'}[entry.type]}</span>
        <div>${entry.qty} ${entry.unit}</div>
      </div>
    `;
    ul.prepend(li);
  });

  const hydTarget = state.hydration * 1000;
  const calTarget = state.calories;
  const hydPct    = hydTarget ? Math.min(100, Math.round(totalEau/hydTarget*100)) : 0;
  const calPct    = calTarget ? Math.min(100, Math.round(totalCal/calTarget*100)) : 0;

  document.getElementById('hydProgress').textContent = `${Math.round(totalEau/100)/10} / ${state.hydration ? state.hydration.toFixed(1) : '–'} L`;
  document.getElementById('calProgress').textContent = `${totalCal} / ${calTarget || '–'} kcal`;
  document.getElementById('hydBar').style.width = hydPct + '%';
  document.getElementById('calBar').style.width = calPct + '%';
}

function clearLog() {
  if (!confirm('Effacer le journal de sortie ?')) return;
  state.nutritionLog = [];
  saveActivityState();
  renderNutritionLog();
}

// Navigation tabs
function showTab(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const idx = ['profil','activite','checklist','nutrition'].indexOf(id);
  document.querySelectorAll('.tab')[idx].classList.add('active');
  if (id === 'checklist') buildChecklist();
  if (id === 'nutrition') updateNutritionPage();
}

// PWA : Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => {
      console.log('[App] SW enregistré, scope:', reg.scope);
      document.getElementById('pwaBadge').style.display = 'inline';
    })
    .catch(err => console.warn('[App] SW échec:', err));
}

// Offline / Online events
window.addEventListener('online',  () => { document.getElementById('offlineBanner').style.display = 'none';  });
window.addEventListener('offline', () => { document.getElementById('offlineBanner').style.display = 'block'; });

// Init
loadState();
updateProfileDisplay();
buildSportGrid();
if (state.sport) {
  computeCalories();
  buildChecklist();
  updateNutritionPage();
}
if (!navigator.onLine) document.getElementById('offlineBanner').style.display = 'block';
