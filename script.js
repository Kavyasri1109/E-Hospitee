// â”€â”€ PAGE NAVIGATION â”€â”€
function goPage(id){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0,0);
  initPage(id);
}
function initPage(id){
  if(id==='page-landing'){
    setTimeout(()=>{
      const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.12});
      document.querySelectorAll('#page-landing .reveal').forEach(el=>obs.observe(el));
    },100);
  }
  if(id==='page-hospital') buildBedGrid();
}

// â”€â”€ REGISTRATION â”€â”€
let selectedRole='patient';
function selectRole(r){
  selectedRole=r;
  document.getElementById('role-patient').classList.toggle('selected',r==='patient');
  document.getElementById('role-hospital').classList.toggle('selected',r==='hospital');
  document.getElementById('reg-patient-form').style.display=r==='patient'?'block':'none';
  document.getElementById('reg-hospital-form').style.display=r==='hospital'?'block':'none';
}
function handleRegister(){
  showToast('Account created! Redirecting to dashboard...');
  setTimeout(()=>{
    if(selectedRole==='hospital') goPage('page-hospital');
    else goPage('page-patient');
  },1200);
}

// â”€â”€ LOGIN â”€â”€
function switchLoginTab(type,btn){
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('login-patient').style.display=type==='patient'?'block':'none';
  document.getElementById('login-hospital').style.display=type==='hospital'?'block':'none';
}
function handleLogin(type){
  showToast('Signing you in...');
  setTimeout(()=>{
    if(type==='hospital'||type==='demo-hospital') goPage('page-hospital');
    else goPage('page-patient');
  },900);
}

// â”€â”€ PATIENT DASHBOARD PANELS â”€â”€
function showPanel(id,btn){
  document.querySelectorAll('#page-patient .dash-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(btn){document.querySelectorAll('#page-patient .sidebar-item').forEach(s=>s.classList.remove('active'));btn.classList.add('active');}
}

// â”€â”€ HOSPITAL DASHBOARD PANELS â”€â”€
function showHPanel(id,btn){
  document.querySelectorAll('#page-hospital .dash-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(btn){document.querySelectorAll('#page-hospital .sidebar-item').forEach(s=>s.classList.remove('active'));btn.classList.add('active');}
}

// â”€â”€ BED GRID â”€â”€
function buildBedGrid(){
  const g=document.getElementById('bed-grid');
  if(!g||g.children.length)return;
  const states=['free','occupied','occupied','free','reserved','occupied','free','occupied','occupied','free','occupied','occupied','reserved','free','occupied','free'];
  states.forEach((s,i)=>{
    const b=document.createElement('div');
    b.className='bed-cell bed-'+s;
    b.textContent='B'+(i+1);
    b.title='Bed '+(i+1)+' â€” '+s;
    b.onclick=()=>showToast('Bed '+(i+1)+': '+s);
    g.appendChild(b);
  });
}

// â”€â”€ HOW IT WORKS â”€â”€
let currentStep=0;
function setStep(idx,el){
  document.querySelectorAll('.hiw-step').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.hiw-screen').forEach(s=>s.classList.remove('active'));
  el.classList.add('active');document.getElementById('screen-'+idx).classList.add('active');currentStep=idx;
}
setInterval(()=>{
  const steps=document.querySelectorAll('#page-landing .hiw-step');
  if(!steps.length)return;
  const next=(currentStep+1)%steps.length;setStep(next,steps[next]);
},3500);

// â”€â”€ FOR WHO â”€â”€
function switchTab(type,btn){
  document.querySelectorAll('.fw-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.fw-content').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');document.getElementById('fw-'+type).classList.add('active');
}

// â”€â”€ CTA â”€â”€
function handleCTA(btn){
  const inputs=btn.parentElement.querySelectorAll('input');let ok=true;
  inputs.forEach(i=>{if(!i.value.trim()){i.style.borderColor='#F87171';setTimeout(()=>i.style.borderColor='',2000);ok=false;}});
  if(ok){btn.textContent='Sent âœ“';btn.style.background='#16A34A';document.getElementById('cta-success').style.display='block';inputs.forEach(i=>i.value='');}
}

// â”€â”€ TOAST â”€â”€
function showToast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),3000);
}

// â”€â”€ HERO 3D TILT â”€â”€
const tilt=document.getElementById('tiltCard');
if(tilt){
  const p=tilt.closest('.hero-visual');
  p.addEventListener('mousemove',e=>{
    const r=tilt.getBoundingClientRect();
    const dx=(e.clientX-r.left-r.width/2)/(r.width/2);
    const dy=(e.clientY-r.top-r.height/2)/(r.height/2);
    tilt.style.transform=`perspective(800px) rotateY(${dx*14}deg) rotateX(${-dy*10}deg) scale(1.02)`;
  });
  p.addEventListener('mouseleave',()=>{tilt.style.transform='';});
}

// â”€â”€ NAV SCROLL â”€â”€
window.addEventListener('scroll',()=>{
  document.getElementById('navbar')&&document.getElementById('navbar').classList.toggle('scrolled',scrollY>20);
});

// â”€â”€ PARALLAX ORBS â”€â”€
window.addEventListener('scroll',()=>{
  document.querySelectorAll('.orb').forEach((o,i)=>{o.style.transform=`translateY(${scrollY*(0.08+i*0.04)}px)`;});
});

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// E-HOSPITEE DATABASE (IndexedDB + localStorage)
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const DB = {
  _prefix: 'ehospitee_',
  _idb: null,

  async init() {
    return new Promise((res, rej) => {
      const req = indexedDB.open('EHospiteeDB', 1);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        ['patients','hospitals','appointments','records','medications','vitals','emergencies','messages'].forEach(store => {
          if (!db.objectStoreNames.contains(store)) {
            const s = db.createObjectStore(store, { keyPath: 'id', autoIncrement: true });
            if (store === 'patients') s.createIndex('email', 'email', { unique: true });
            if (store === 'hospitals') s.createIndex('email', 'email', { unique: true });
            if (store === 'appointments') s.createIndex('patientId', 'patientId', { unique: false });
            if (store === 'records') s.createIndex('patientId', 'patientId', { unique: false });
            if (store === 'medications') s.createIndex('patientId', 'patientId', { unique: false });
          }
        });
      };
      req.onsuccess = e => { this._idb = e.target.result; this._seedData(); res(); };
      req.onerror = () => rej(req.error);
    });
  },

  async _seedData() {
    // Seed only if empty
    const count = await this.count('patients');
    if (count > 0) { await this._loadSession(); return; }

    // Default patient
    await this.add('patients', {
      firstName:'Rajesh', lastName:'Kumar', email:'rajesh@demo.com',
      mobile:'+91 98765 43210', dob:'1985-06-15', bloodGroup:'B+',
      allergies:'Penicillin', emergencyContact:'Priya Kumar â€” +91 98765 12345',
      password:'demo123', createdAt: new Date().toISOString()
    });

    // Default hospital
    await this.add('hospitals', {
      name:'Apollo Hospitals', regNo:'MCI-HYD-2024-00123',
      email:'admin@apollo.com', password:'demo123',
      address:'Film Nagar, Jubilee Hills, Hyderabad â€” 500033',
      phone:'+91 40 2360 7777', emergencyPhone:'+91 40 2360 0000',
      specialties:'Cardiology, Orthopaedics, Neurology, General Medicine',
      totalBeds:52, createdAt: new Date().toISOString()
    });

    // Appointments
    const appts = [
      { patientId:1, doctor:'Dr. S. Rao', specialty:'Cardiology', hospital:'Apollo Hospitals', date:'2026-03-12', time:'10:30 AM', status:'upcoming', fee:600 },
      { patientId:1, doctor:'Dr. P. Mehta', specialty:'Orthopaedics', hospital:'KIMS Hospital', date:'2026-03-18', time:'3:00 PM', status:'upcoming', fee:500 },
      { patientId:1, doctor:'Dr. V. Iyer', specialty:'Neurology', hospital:'Yashoda Hospital', date:'2026-01-22', time:'11:00 AM', status:'completed', fee:700 },
      { patientId:1, doctor:'Dr. S. Rao', specialty:'Cardiology', hospital:'Apollo Hospitals', date:'2026-01-12', time:'10:00 AM', status:'completed', fee:600 },
    ];
    for (const a of appts) await this.add('appointments', { ...a, createdAt: new Date().toISOString() });

    // Health records
    const recs = [
      { patientId:1, name:'Lipid Profile Report', type:'lab', hospital:'Apollo Hospitals', date:'2026-03-08', file:null },
      { patientId:1, name:'Prescription â€” Dr. Rao', type:'prescription', hospital:'Apollo Hospitals', date:'2026-02-12', file:null },
      { patientId:1, name:'Complete Blood Count', type:'lab', hospital:'KIMS Hospital', date:'2026-01-10', file:null },
      { patientId:1, name:'ECG Report', type:'report', hospital:'Apollo Hospitals', date:'2025-12-22', file:null },
      { patientId:1, name:'Discharge Summary', type:'summary', hospital:'Yashoda Hospital', date:'2025-11-15', file:null },
    ];
    for (const r of recs) await this.add('records', { ...r, createdAt: new Date().toISOString() });

    // Medications
    const meds = [
      { patientId:1, name:'Ecosprin 75mg', dose:'1 tablet', frequency:'After breakfast', time:'8:00 AM', prescribedBy:'Dr. S. Rao', active:true },
      { patientId:1, name:'Atorvastatin 10mg', dose:'1 tablet', frequency:'Before bed', time:'10:00 PM', prescribedBy:'Dr. S. Rao', active:true },
      { patientId:1, name:'Metoprolol 25mg', dose:'1 tablet', frequency:'Twice daily', time:'8AM / 8PM', prescribedBy:'Dr. S. Rao', active:true },
    ];
    for (const m of meds) await this.add('medications', { ...m, createdAt: new Date().toISOString() });

    // Vitals
    await this.add('vitals', {
      patientId:1, heartRate:'72 bpm', bp:'120/80', temp:'36.8Â°C',
      sugar:'98 mg/dL', weight:'72 kg', spo2:'98%',
      recordedAt: new Date().toISOString()
    });

    showToast('âœ… Database initialised with demo data');
  },

  async _loadSession() {
    const s = localStorage.getItem(this._prefix + 'session');
    if (s) {
      const session = JSON.parse(s);
      currentUser = session;
      if (session.role === 'patient') {
        // Re-fetch fresh user data from DB
        const user = await this.get('patients', session.id);
        if (user) {
          currentUser = { ...user, role: 'patient' };
          await loadPatientDash(currentUser);
          goPage('page-patient');
        }
      } else if (session.role === 'hospital') {
        goPage('page-hospital');
      }
    }
  },

  // Core CRUD
  async add(store, data) {
    return new Promise((res, rej) => {
      const tx = this._idb.transaction(store, 'readwrite');
      const req = tx.objectStore(store).add(data);
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  },

  async get(store, id) {
    return new Promise((res, rej) => {
      const tx = this._idb.transaction(store, 'readonly');
      const req = tx.objectStore(store).get(id);
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  },

  async getAll(store) {
    return new Promise((res, rej) => {
      const tx = this._idb.transaction(store, 'readonly');
      const req = tx.objectStore(store).getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  },

  async getByIndex(store, index, value) {
    return new Promise((res, rej) => {
      const tx = this._idb.transaction(store, 'readonly');
      const req = tx.objectStore(store).index(index).getAll(value);
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  },

  async put(store, data) {
    return new Promise((res, rej) => {
      const tx = this._idb.transaction(store, 'readwrite');
      const req = tx.objectStore(store).put(data);
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  },

  async delete(store, id) {
    return new Promise((res, rej) => {
      const tx = this._idb.transaction(store, 'readwrite');
      const req = tx.objectStore(store).delete(id);
      req.onsuccess = () => res();
      req.onerror = () => rej(req.error);
    });
  },

  async count(store) {
    return new Promise((res, rej) => {
      const tx = this._idb.transaction(store, 'readonly');
      const req = tx.objectStore(store).count();
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  },

  async findByEmail(store, email) {
    const all = await this.getAll(store);
    return all.find(r => r.email === email) || null;
  },

  // Session
  setSession(user, role) {
    currentUser = { ...user, role };
    localStorage.setItem(this._prefix + 'session', JSON.stringify(currentUser));
  },

  clearSession() {
    currentUser = null;
    localStorage.removeItem(this._prefix + 'session');
  }
};

let currentUser = null;

// Init DB on load
DB.init().catch(e => console.error('DB init failed:', e));

// â”€â”€ REGISTRATION (DB-connected) â”€â”€
async function handleRegister() {
  const btn = document.getElementById('reg-btn');
  btn.textContent = 'Creating account...';
  btn.disabled = true;

  try {
    if (selectedRole === 'patient') {
      const inputs = document.querySelectorAll('#reg-patient-form input, #reg-patient-form select');
      const [firstName, lastName, mobile, email, dob, bloodGroup, password, confirmPw] = [...inputs].map(i => i.value.trim());
      if (!firstName || !email || !password) { showToast('âš ï¸ Please fill all required fields'); btn.textContent='Create Account â†’'; btn.disabled=false; return; }
      if (password !== confirmPw) { showToast('âš ï¸ Passwords do not match'); btn.textContent='Create Account â†’'; btn.disabled=false; return; }
      const existing = await DB.findByEmail('patients', email);
      if (existing) { showToast('âš ï¸ Email already registered'); btn.textContent='Create Account â†’'; btn.disabled=false; return; }
      const id = await DB.add('patients', { firstName, lastName, mobile, email, dob, bloodGroup, password, allergies:'', emergencyContact:'', createdAt: new Date().toISOString() });
      const user = await DB.get('patients', id);
      DB.setSession(user, 'patient');
      document.getElementById('patient-name').textContent = firstName;
      document.getElementById('sidebar-patient-name').textContent = firstName + ' ' + lastName;
      showToast('âœ… Account created successfully!');
      setTimeout(() => goPage('page-patient'), 800);

    } else {
      const inputs = document.querySelectorAll('#reg-hospital-form input');
      const [name, regNo, city, pincode, contactPerson, email, phone, password] = [...inputs].map(i => i.value.trim());
      if (!name || !email || !password) { showToast('âš ï¸ Please fill all required fields'); btn.textContent='Create Account â†’'; btn.disabled=false; return; }
      const existing = await DB.findByEmail('hospitals', email);
      if (existing) { showToast('âš ï¸ Email already registered'); btn.textContent='Create Account â†’'; btn.disabled=false; return; }
      await DB.add('hospitals', { name, regNo, city, pincode, contactPerson, email, phone, password, createdAt: new Date().toISOString() });
      DB.setSession({ name, email }, 'hospital');
      showToast('âœ… Hospital account created!');
      setTimeout(() => goPage('page-hospital'), 800);
    }
  } catch(e) {
    showToast('âš ï¸ Registration failed. Try again.');
    console.error(e);
  }
  btn.textContent = 'Create Account â†’'; btn.disabled = false;
}

// â”€â”€ LOGIN (DB-connected) â”€â”€
async function handleLogin(type) {
  if (type === 'demo-patient') {
    const user = await DB.findByEmail('patients', 'rajesh@demo.com');
    if (user) { DB.setSession(user, 'patient'); await loadPatientDash(user); goPage('page-patient'); return; }
  }
  if (type === 'demo-hospital') {
    const hosp = await DB.findByEmail('hospitals', 'admin@apollo.com');
    if (hosp) { DB.setSession(hosp, 'hospital'); goPage('page-hospital'); return; }
  }
  if (type === 'patient') {
    const id = document.getElementById('login-id').value.trim();
    const pw = document.getElementById('login-pw').value.trim();
    const all = await DB.getAll('patients');
    const user = all.find(u => (u.email === id || u.mobile === id) && u.password === pw);
    if (!user) { showToast('âš ï¸ Invalid credentials'); return; }
    DB.setSession(user, 'patient');
    await loadPatientDash(user);
    goPage('page-patient');
    return;
  }
  if (type === 'hospital') {
    const id = document.getElementById('hosp-login-id').value.trim();
    const pw = document.getElementById('hosp-login-pw').value.trim();
    const hosp = await DB.findByEmail('hospitals', id);
    if (!hosp || hosp.password !== pw) { showToast('âš ï¸ Invalid credentials'); return; }
    DB.setSession(hosp, 'hospital');
    goPage('page-hospital');
    return;
  }
}

async function loadPatientDash(user) {
  document.getElementById('patient-name').textContent = user.firstName;
  document.getElementById('sidebar-patient-name').textContent = user.firstName + ' ' + (user.lastName||'');

  // Load appointments
  const appts = await DB.getByIndex('appointments', 'patientId', user.id);
  renderAppointments(appts);

  // Load records
  const recs = await DB.getByIndex('records', 'patientId', user.id);
  renderRecords(recs);

  // Load medications
  const meds = await DB.getByIndex('medications', 'patientId', user.id);
  renderMedications(meds);

  // Load vitals
  const vitals = await DB.getAll('vitals');
  const v = vitals.find(v => v.patientId === user.id);
  if (v) renderVitals(v);
}

function renderAppointments(appts) {
  const upcoming = appts.filter(a => a.status === 'upcoming');
  const past = appts.filter(a => a.status !== 'upcoming');

  // Overview upcoming
  const ovUp = document.getElementById('overview-upcoming');
  if (ovUp) {
    ovUp.innerHTML = upcoming.length ? upcoming.map(a => `
      <div class="appt-row">
        <div class="appt-avatar2">ðŸ©º</div>
        <div class="appt-info"><div class="appt-doc">${a.doctor} â€” ${a.specialty}</div><div class="appt-spec">${a.hospital} Â· ${a.date} Â· ${a.time}</div></div>
        <span class="status-badge status-upcoming">Upcoming</span>
      </div>`).join('') : '<div style="color:var(--ink-light);font-size:.85rem;padding:12px 0">No upcoming appointments</div>';
  }

  // Appointments panel
  const apptUp = document.getElementById('appt-upcoming');
  if (apptUp) apptUp.innerHTML = upcoming.length ? upcoming.map(a => `
    <div class="appt-row">
      <div class="appt-avatar2">ðŸ©º</div>
      <div class="appt-info"><div class="appt-doc">${a.doctor} â€” ${a.specialty}</div><div class="appt-spec">${a.hospital} Â· ${a.date} Â· ${a.time}</div></div>
      <span class="status-badge status-upcoming">Upcoming</span>
    </div>`).join('') : '<div style="color:var(--ink-light);font-size:.85rem;padding:12px 0">No upcoming appointments</div>';

  const apptPast = document.getElementById('appt-past');
  if (apptPast) apptPast.innerHTML = past.length ? past.map(a => `
    <div class="appt-row">
      <div class="appt-avatar2">ðŸ©º</div>
      <div class="appt-info"><div class="appt-doc">${a.doctor} â€” ${a.specialty}</div><div class="appt-spec">${a.hospital} Â· ${a.date}</div></div>
      <span class="status-badge status-${a.status}">${a.status.charAt(0).toUpperCase()+a.status.slice(1)}</span>
    </div>`).join('') : '<div style="color:var(--ink-light);font-size:.85rem;padding:12px 0">No past appointments</div>';

  // Stat count
  const statEl = document.getElementById('stat-upcoming');
  if (statEl) statEl.textContent = upcoming.length;
}

function renderRecords(recs) {
  const icons = { lab:'ðŸ§ª', prescription:'ðŸ©º', report:'ðŸ“„', summary:'ðŸ“‹' };
  const html = recs.length ? recs.map(r => `
    <div class="record-item">
      <div class="record-icon">${icons[r.type]||'ðŸ“„'}</div>
      <div><div class="record-name">${r.name}</div><div class="record-date">${r.hospital} Â· ${r.date}</div></div>
      <button class="record-btn" onclick="showToast('Opening ${r.name}...')">View</button>
    </div>`).join('') : '<div style="color:var(--ink-light);font-size:.85rem;padding:12px 0">No records found</div>';

  const recEl = document.getElementById('records-list');
  if (recEl) recEl.innerHTML = html;
  const ovRec = document.getElementById('overview-records');
  if (ovRec) ovRec.innerHTML = recs.slice(0,2).map(r=>`
    <div class="record-item">
      <div class="record-icon">${icons[r.type]||'ðŸ“„'}</div>
      <div><div class="record-name">${r.name}</div><div class="record-date">${r.hospital} Â· ${r.date}</div></div>
      <button class="record-btn" onclick="showToast('Opening...')">View</button>
    </div>`).join('');

  const statEl = document.getElementById('stat-records');
  if (statEl) statEl.textContent = recs.length;
}

function renderMedications(meds) {
  const active = meds.filter(m => m.active);
  const html = active.length ? active.map(m => `
    <div class="med-item">
      <div class="med-icon">ðŸ’Š</div>
      <div><div class="med-name">${m.name}</div><div class="med-dose">${m.dose} Â· ${m.frequency} Â· By ${m.prescribedBy}</div></div>
      <div class="med-time">${m.time}</div>
    </div>`).join('') : '<div style="color:var(--ink-light);font-size:.85rem;padding:12px 0">No active medications</div>';

  const medEl = document.getElementById('medications-list');
  if (medEl) medEl.innerHTML = html;
  const ovMed = document.getElementById('overview-meds');
  if (ovMed) ovMed.innerHTML = html;
  const statEl = document.getElementById('stat-meds');
  if (statEl) statEl.textContent = active.length;
}

function renderVitals(v) {
  const map = { 'stat-heartrate': v.heartRate, 'stat-bp': v.bp, 'stat-temp': v.temp, 'stat-sugar': v.sugar, 'stat-weight': v.weight, 'stat-spo2': v.spo2 };
  Object.entries(map).forEach(([id, val]) => { const el=document.getElementById(id); if(el) el.textContent = val; });
}

// â”€â”€ SAVE PROFILE (DB) â”€â”€
async function saveProfile() {
  if (!currentUser || currentUser.role !== 'patient') return;
  const updated = {
    ...currentUser,
    firstName: document.getElementById('prof-fname').value,
    lastName:  document.getElementById('prof-lname').value,
    dob:       document.getElementById('prof-dob').value,
    bloodGroup:document.getElementById('prof-blood').value,
    mobile:    document.getElementById('prof-mobile').value,
    email:     document.getElementById('prof-email').value,
    allergies: document.getElementById('prof-allergies').value,
    emergencyContact: document.getElementById('prof-emergency').value,
  };
  await DB.put('patients', updated);
  DB.setSession(updated, 'patient');
  document.getElementById('patient-name').textContent = updated.firstName;
  document.getElementById('sidebar-patient-name').textContent = updated.firstName + ' ' + updated.lastName;
  showToast('âœ… Profile saved to database!');
}

// â”€â”€ ADD MEDICATION (DB) â”€â”€
async function addMedication() {
  if (!currentUser) return;
  const name = document.getElementById('new-med-name').value.trim();
  const dose = document.getElementById('new-med-dose').value.trim();
  const freq = document.getElementById('new-med-freq').value.trim();
  const time = document.getElementById('new-med-time').value.trim();
  if (!name) { showToast('âš ï¸ Enter medication name'); return; }
  await DB.add('medications', { patientId: currentUser.id, name, dose, frequency: freq, time, prescribedBy:'Self', active: true, createdAt: new Date().toISOString() });
  ['new-med-name','new-med-dose','new-med-freq','new-med-time'].forEach(id=>document.getElementById(id).value='');
  const meds = await DB.getByIndex('medications', 'patientId', currentUser.id);
  renderMedications(meds);
  showToast('âœ… Medication saved to database!');
}

// â”€â”€ UPLOAD RECORD (DB) â”€â”€
async function uploadRecord(input) {
  if (!currentUser || !input.files[0]) return;
  const file = input.files[0];
  const reader = new FileReader();
  reader.onload = async e => {
    await DB.add('records', {
      patientId: currentUser.id, name: file.name, type: 'upload',
      hospital: 'Self Upload', date: new Date().toISOString().split('T')[0],
      fileData: e.target.result, createdAt: new Date().toISOString()
    });
    const recs = await DB.getByIndex('records', 'patientId', currentUser.id);
    renderRecords(recs);
    showToast('âœ… Record uploaded and saved!');
  };
  reader.readAsDataURL(file);
}

// â”€â”€ SAVE VITALS (DB) â”€â”€
async function saveVitals() {
  if (!currentUser) return;
  const v = {
    patientId: currentUser.id,
    heartRate: document.getElementById('v-hr').value || document.getElementById('stat-heartrate').textContent,
    bp:        document.getElementById('v-bp').value || document.getElementById('stat-bp').textContent,
    temp:      document.getElementById('v-temp').value || document.getElementById('stat-temp').textContent,
    sugar:     document.getElementById('v-sugar').value || document.getElementById('stat-sugar').textContent,
    weight:    document.getElementById('v-weight').value || document.getElementById('stat-weight').textContent,
    spo2:      document.getElementById('v-spo2').value || document.getElementById('stat-spo2').textContent,
    recordedAt: new Date().toISOString()
  };
  await DB.add('vitals', v);
  renderVitals(v);
  ['v-hr','v-bp','v-temp','v-sugar','v-weight','v-spo2'].forEach(id=>document.getElementById(id).value='');
  showToast('âœ… Vitals saved to database!');
}

// â”€â”€ SOS (DB) â”€â”€
async function triggerSOS() {
  const log = { patientId: currentUser?.id||0, type:'SOS', location:'Hyderabad', status:'dispatched', triggeredAt: new Date().toISOString() };
  await DB.add('emergencies', log);
  const logEl = document.getElementById('sos-log');
  if (logEl) {
    logEl.innerHTML = `<div style="background:#FEF2F2;border:1.5px solid #FECACA;border-radius:12px;padding:14px;margin-bottom:10px">
      <div style="font-weight:700;color:#DC2626;font-size:.88rem">ðŸš¨ SOS Triggered â€” ${new Date().toLocaleTimeString()}</div>
      <div style="font-size:.78rem;color:var(--ink-light);margin-top:6px">âœ… Family notified &nbsp;Â·&nbsp; âœ… 3 Hospitals alerted &nbsp;Â·&nbsp; âœ… Ambulance dispatched<br>ðŸ“ Location shared automatically</div>
    </div>` + logEl.innerHTML;
  }
  showToast('ðŸš¨ SOS sent! Ambulance dispatched. Family notified.');
}

// â”€â”€ SIGN OUT â”€â”€
function signOut() { DB.clearSession(); goPage('page-landing'); }

// â”€â”€ WHATSAPP CHAT â”€â”€
const WA_NUMBER = '919876543210'; // Replace with real number
let waOpen = false;

function toggleChat(){
  waOpen = !waOpen;
  const chat = document.getElementById('waChat');
  const dot = document.getElementById('waDot');
  if(waOpen){
    chat.classList.add('open');
    dot.style.display = 'none';
    setTimeout(()=>document.getElementById('waInput').focus(), 400);
  } else {
    chat.classList.remove('open');
  }
}

function switchWaTab(tab, btn){
  document.querySelectorAll('.wa-chat-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.wa-tab-content').forEach(c=>c.classList.remove('active'));
  if(btn) btn.classList.add('active');
  document.getElementById('wa-tab-'+tab).classList.add('active');
  closeEmojiPicker();
}

const waReplies = {
  'book an appointment': "I can help you book an appointment! ðŸ“… Please tell me:\n1. Which specialty?\n2. Preferred date & time?\n3. Your city?\n\nOr click 'Book Appointment' to go directly to our booking page.",
  'emergency sos help': "ðŸš¨ For emergencies, please:\nâ€¢ Press the **SOS button** in your dashboard\nâ€¢ Or call 108 immediately\n\nYour location will be shared with the nearest hospitals automatically.",
  'view my health records': "ðŸ“‹ Your health records are securely stored in your E-Hospitee dashboard.\n\nI can help you:\nâ€¢ View prescriptions\nâ€¢ Access lab reports\nâ€¢ Share records with doctors",
  'contact a doctor': "ðŸ©º To contact a doctor:\n1. Log in to your dashboard\n2. Go to Appointments\n3. Select your doctor and send a message\n\nWould you like me to connect you now?",
  'show my health records': "Here are your latest records:\nðŸ“„ Lipid Profile â€” 8 Mar 2026\nðŸ©º Prescription Dr. Rao â€” 12 Feb\nðŸ§ª CBC Report â€” 10 Jan\n\nType the record name to view details.",
  'medication reminders': "ðŸ’Š I'll send you daily medication reminders on WhatsApp!\n\nYour current schedule:\nâ€¢ Ecosprin 75mg â€” 8:00 AM âœ…\nâ€¢ Metoprolol 25mg â€” 8:00 PM â°\nâ€¢ Atorvastatin 10mg â€” 10:00 PM â°",
  'lab reports update': "ðŸ§ª Your lab results are ready!\n\nLatest: **Lipid Profile** uploaded by Apollo Hospitals on 8 Mar 2026.\n\nTap 'View' in your Health Records to access the full report.",
  'doctor consultation': "ðŸ©º Starting a doctor consultation...\n\nAvailable now:\nâ€¢ Dr. S. Rao â€” Cardiology âœ…\nâ€¢ Dr. P. Mehta â€” Ortho âœ…\nâ€¢ Dr. R. Gupta â€” General âœ…\n\nWhich doctor would you like to contact?",
  'blood donor request': "ðŸ©¸ Searching for donors near you...\n\nFound 3 O+ donors within 5 km of Hyderabad.\n\nShall I send them an alert? They'll be notified on WhatsApp.",
  'ambulance tracking': "ðŸš‘ Live ambulance tracking activated!\n\nAMB-02 is 4 minutes away.\nCurrent location: Jubilee Hills â†’ Your location\n\nYou'll receive live updates here.",
  'default': "Thanks for reaching out! ðŸ˜Š I'm the E-Hospitee WhatsApp assistant.\n\nI can help with:\nðŸ“… Appointments\nðŸ“‹ Health records\nðŸ’Š Medications\nðŸš¨ Emergencies\nðŸ©º Doctor consultation\n\nWhat do you need help with?"
};

function getReply(msg){
  const key = Object.keys(waReplies).find(k => msg.toLowerCase().includes(k));
  return waReplies[key] || waReplies['default'];
}

function addMessage(text, type){
  const container = document.getElementById('waMessages');
  const now = new Date();
  const time = now.getHours()+':'+String(now.getMinutes()).padStart(2,'0');
  const div = document.createElement('div');
  div.className = 'wa-msg wa-msg-'+type;
  div.innerHTML = text.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
    + `<div class="wa-msg-time">${time}${type==='out'?' <span class="wa-tick">âœ“âœ“</span>':''}</div>`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showTyping(){
  const container = document.getElementById('waMessages');
  const t = document.createElement('div');
  t.className = 'wa-typing'; t.id = 'waTyping';
  t.innerHTML = '<span></span><span></span><span></span>';
  container.appendChild(t);
  container.scrollTop = container.scrollHeight;
}

function removeTyping(){ const t=document.getElementById('waTyping'); if(t)t.remove(); }

function sendWaMessage(){
  const input = document.getElementById('waInput');
  const text = input.value.trim();
  if(!text) return;
  addMessage(text, 'out');
  input.value = ''; input.style.height = 'auto';
  closeEmojiPicker();
  showTyping();
  setTimeout(()=>{ removeTyping(); addMessage(getReply(text), 'in'); }, 900 + Math.random()*600);
}

function sendQuickReply(text){
  if(!waOpen) toggleChat();
  switchWaTab('chat', document.querySelector('.wa-chat-tab'));
  setTimeout(()=>{
    addMessage(text, 'out');
    showTyping();
    setTimeout(()=>{ removeTyping(); addMessage(getReply(text), 'in'); }, 1000);
  }, waOpen ? 0 : 400);
}

function handleWaKey(e){ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendWaMessage();} }
function autoResize(el){ el.style.height='auto'; el.style.height=Math.min(el.scrollHeight,80)+'px'; }

// Emoji picker
const EMOJIS = ['ðŸ˜Š','ðŸ˜·','ðŸ’Š','ðŸ¥','â¤ï¸','ðŸ‘¨â€âš•ï¸','ðŸ©º','ðŸ©¸','ðŸš‘','ðŸ˜°','ðŸ¤’','ðŸ’‰','ðŸ§¬','ðŸ©»','ðŸƒ','ðŸ’ª','ðŸ§˜','ðŸ˜Œ','ðŸ™','âœ…','âš ï¸','ðŸ“‹','ðŸ“…','ðŸ””','ðŸ“ž','ðŸ’¬','ðŸ‘‹','ðŸ¤'];
function buildEmojiGrid(){
  const g = document.getElementById('waEmojiGrid');
  EMOJIS.forEach(e=>{
    const s = document.createElement('span');
    s.textContent = e;
    s.onclick = ()=>{ document.getElementById('waInput').value += e; closeEmojiPicker(); document.getElementById('waInput').focus(); };
    g.appendChild(s);
  });
}
function toggleEmojiPicker(e){ e.stopPropagation(); document.getElementById('waEmojiPicker').classList.toggle('open'); }
function closeEmojiPicker(){ document.getElementById('waEmojiPicker').classList.remove('open'); }
document.addEventListener('click', closeEmojiPicker);
buildEmojiGrid();

function openWhatsApp(){ window.open('https://wa.me/'+WA_NUMBER+'?text=Hi+E-Hospitee!+I+need+help+with+my+appointment.','_blank'); }

// â”€â”€ INIT LANDING REVEALS â”€â”€
setTimeout(()=>{
  const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
},200);
