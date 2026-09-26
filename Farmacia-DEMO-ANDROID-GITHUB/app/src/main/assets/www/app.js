
const state={
  route:location.hash.replace('#','')||'home',
  cart:JSON.parse(localStorage.getItem('farmaciaDemoAppCart')||'[]'),
  points:1280
};

const products=[
 {id:1,name:'Vitamina C 1000',cat:'Integratori',price:12.90,desc:'Integratore alimentare demo.'},
 {id:2,name:'Crema viso Daily',cat:'Dermocosmesi',price:18.50,desc:'Idratazione quotidiana.'},
 {id:3,name:'SPF 50+ Fluido',cat:'Solari',price:21.00,desc:'Protezione alta.'},
 {id:4,name:'Termometro digitale',cat:'Dispositivi',price:9.90,desc:'Misurazione rapida.'},
 {id:5,name:'Probiotici Daily',cat:'Integratori',price:16.90,desc:'Benessere intestinale.'},
 {id:6,name:'Cerotti delicati',cat:'Primo soccorso',price:5.60,desc:'Piccole medicazioni.'}
];

const services=[
 {icon:'♥',name:'Misurazione pressione',time:'15 min',price:'€ 5'},
 {icon:'◉',name:'Autoanalisi glicemia',time:'15 min',price:'€ 8'},
 {icon:'✦',name:'Consulenza dermocosmetica',time:'30 min',price:'Gratuita'},
 {icon:'◎',name:'Noleggio dispositivi',time:'Su richiesta',price:'Variabile'}
];

function euro(n){return new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(n)}
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2000)}
function nav(route){state.route=route;location.hash=route;render()}
function bindNav(){
 document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>nav(b.dataset.route));
 document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.toggle('active',b.dataset.route===state.route));
}
function openModal(title,eyebrow,html){
 document.getElementById('modalTitle').textContent=title;
 document.getElementById('modalEyebrow').textContent=eyebrow||'Dettaglio';
 document.getElementById('modalBody').innerHTML=html;
 document.getElementById('modal').showModal();
}
function closeModal(){document.getElementById('modal').close()}
window.closeModal=closeModal;

function addCart(id){
 const p=products.find(x=>x.id===id);
 const f=state.cart.find(x=>x.id===id);
 if(f)f.qty++;else state.cart.push({...p,qty:1});
 localStorage.setItem('farmaciaDemoAppCart',JSON.stringify(state.cart));
 toast(`${p.name} aggiunto`);
}
window.addCart=addCart;

function home(){
 return `
 <section class="hero-card">
   <small>Buongiorno 👋</small>
   <h1>Come possiamo aiutarti oggi?</h1>
   <p>Servizi, prodotti, richieste e assistenza in un'unica app.</p>
   <div class="hero-actions">
     <button class="btn white" onclick="openPrescription()">Invia ricetta</button>
     <button class="btn glass" data-route="services">Prenota servizio</button>
   </div>
 </section>

 <section class="section">
   <div class="section-head"><div><span class="eyebrow">Accesso rapido</span><h2>Cosa vuoi fare?</h2></div></div>
   <div class="quick-grid">
     <button class="quick-card" onclick="openPrescription()"><span class="quick-icon">▤</span><strong>Invia ricetta</strong><span>Richiesta e verifica disponibilità</span></button>
     <button class="quick-card" data-route="services"><span class="quick-icon">♡</span><strong>Prenota servizio</strong><span>Agenda e disponibilità</span></button>
     <button class="quick-card" data-route="orders"><span class="quick-icon">↗</span><strong>Segui ordine</strong><span>Ritiro o consegna</span></button>
     <button class="quick-card" onclick="openChat()"><span class="quick-icon">◌</span><strong>Chiedi alla farmacia</strong><span>Chat e assistenza</span></button>
   </div>
 </section>

 <section class="section">
   <div class="loyalty-card">
    <div class="points"><span>Farmacia DEMO Club</span><strong>${state.points}</strong><span>punti disponibili</span></div>
    <div class="loyalty-badge">★</div>
   </div>
 </section>

 <section class="section">
   <div class="section-head"><div><span class="eyebrow">Per te</span><h2>Prodotti consigliati</h2></div><button class="link-btn" data-route="shop">Vedi tutti</button></div>
   <div class="horizontal">
     ${products.slice(0,4).map(p=>`
       <div class="product-mini">
         <div class="product-img"><div class="pack">${p.name}</div></div>
         <strong>${p.name}</strong><small>${p.cat}</small>
         <div class="price"><span>${euro(p.price)}</span><button class="plus" onclick="addCart(${p.id})">+</button></div>
       </div>`).join('')}
   </div>
 </section>

 <section class="section">
  <div class="section-head"><div><span class="eyebrow">Prossimo appuntamento</span><h2>La tua agenda</h2></div></div>
  <div class="list-row">
   <div class="left"><div class="list-icon">♥</div><div><strong>Misurazione pressione</strong><span>24 settembre · 10:30</span></div></div>
   <span class="chip">Confermato</span>
  </div>
 </section>
 `;
}

function shop(){
 const cats=['Tutti',...new Set(products.map(p=>p.cat))];
 return `
 <div class="page-title"><span class="eyebrow">Catalogo demo</span><h1>Prodotti</h1><p>Parafarmaco, dermocosmesi, integratori e dispositivi.</p></div>
 <div class="search"><span>⌕</span><input id="searchInput" placeholder="Cerca prodotto o categoria"></div>
 <div class="filters">${cats.map((c,i)=>`<button class="filter ${i===0?'active':''}" data-cat="${c}">${c}</button>`).join('')}</div>
 <div class="product-grid" id="grid">${productGrid(products)}</div>`;
}
function productGrid(list){
 return list.map(p=>`
  <div class="product-full">
    <div class="product-img"><div class="pack">${p.name}</div></div>
    <h3>${p.name}</h3><p>${p.cat}</p>
    <div class="price"><span>${euro(p.price)}</span><button class="plus" onclick="addCart(${p.id})">+</button></div>
  </div>`).join('');
}

function servicesView(){
 return `
 <div class="page-title"><span class="eyebrow">Farmacia dei servizi</span><h1>Prenota</h1><p>Scegli un servizio e invia una richiesta di appuntamento.</p></div>
 <div class="list">
   ${services.map(s=>`
   <div class="list-row">
     <div class="left"><div class="list-icon">${s.icon}</div><div><strong>${s.name}</strong><span>${s.time} · ${s.price}</span></div></div>
     <button class="btn soft" onclick="book('${s.name.replaceAll("'","\\'")}')">Prenota</button>
   </div>`).join('')}
 </div>
 <section class="section">
  <div class="card">
   <span class="eyebrow">Campagne</span>
   <h2 style="font-size:17px;margin:5px 0 7px">Giornata prevenzione</h2>
   <p style="font-size:10px;color:var(--muted);line-height:1.5">Esempio di campagna stagionale con prenotazioni, notifiche e reminder.</p>
   <button class="btn green wide" onclick="toast('Interesse registrato nella demo')">Scopri disponibilità</button>
  </div>
 </section>`;
}
function book(name){
 openModal('Prenotazione','Servizio',`
 <div class="form">
  <div class="field"><label>Servizio</label><input class="input" value="${name}" readonly></div>
  <div class="field"><label>Data preferita</label><input class="input" type="date"></div>
  <div class="field"><label>Fascia oraria</label><select><option>Mattina</option><option>Pomeriggio</option><option>Prima disponibilità</option></select></div>
  <button class="btn green wide" onclick="closeModal();toast('Richiesta appuntamento inviata')">Conferma richiesta</button>
 </div>`);
}
window.book=book;

function orders(){
 return `
 <div class="page-title"><span class="eyebrow">Ordini & richieste</span><h1>Stato</h1><p>Il cliente sa sempre cosa è pronto e cosa è ancora in lavorazione.</p></div>
 <div class="list">
   <div class="order-card">
     <div class="order-top"><div><strong>Ordine #D-1048</strong><small>Ritiro in farmacia · oggi</small></div><span class="chip">In preparazione</span></div>
     <div class="progress"><span style="width:68%"></span></div>
     <div class="progress-labels"><span>Ricevuto</span><span>Preparazione</span><span>Pronto</span></div>
   </div>
   <div class="order-card">
     <div class="order-top"><div><strong>Richiesta #R-321</strong><small>Documento inviato · ieri</small></div><span class="chip">Verificata</span></div>
     <div class="progress"><span style="width:100%"></span></div>
     <div class="progress-labels"><span>Inviata</span><span>Verifica</span><span>Completata</span></div>
   </div>
 </div>
 <section class="section">
   <button class="btn green wide" onclick="openPrescription()">+ Nuova richiesta</button>
 </section>`;
}

function profile(){
 return `
 <div class="profile-card">
   <div class="avatar">A</div>
   <h2>Andrea</h2><p>Profilo cliente demo</p>
   <div class="profile-stats"><div><strong>${state.points}</strong><span>Punti loyalty</span></div><div><strong>3</strong><span>Ordini demo</span></div></div>
 </div>
 <section class="section">
  <div class="list">
    <div class="list-row" onclick="openReminders()"><div class="left"><div class="list-icon">◷</div><div><strong>Promemoria</strong><span>2 routine configurate</span></div></div><span>›</span></div>
    <div class="list-row" onclick="openCoupons()"><div class="left"><div class="list-icon">★</div><div><strong>Coupon & vantaggi</strong><span>1 coupon disponibile</span></div></div><span>›</span></div>
    <div class="list-row" onclick="toast('Preferiti aperti nella demo')"><div class="left"><div class="list-icon">♡</div><div><strong>Preferiti</strong><span>Prodotti salvati</span></div></div><span>›</span></div>
    <div class="list-row" onclick="toast('Impostazioni demo')"><div class="left"><div class="list-icon">⚙</div><div><strong>Impostazioni</strong><span>Privacy, notifiche e account</span></div></div><span>›</span></div>
  </div>
 </section>
 <section class="section"><div class="notice"><strong>DEMO:</strong> dati e funzioni sono di esempio. La versione reale verrebbe personalizzata sul brand e sui processi della farmacia.</div></section>`;
}

function openPrescription(){
 openModal('Invia una richiesta','Ricetta / documento',`
 <div class="form">
  <div class="notice"><strong>Demo:</strong> la funzione invia una richiesta alla farmacia. I medicinali soggetti a prescrizione non vengono acquistati direttamente online.</div>
  <div class="field"><label>Tipo richiesta</label><select><option>Verifica disponibilità</option><option>Richiesta ritiro</option><option>Richiesta consegna</option><option>Parlare con il farmacista</option></select></div>
  <div class="field"><label>Allega documento</label><div class="upload">＋ Seleziona foto o PDF<br><small>Nessun file viene realmente caricato nella demo</small></div></div>
  <div class="field"><label>Note</label><textarea rows="3" placeholder="Scrivi eventuali informazioni..."></textarea></div>
  <button class="btn green wide" onclick="closeModal();toast('Richiesta demo inviata')">Invia richiesta</button>
 </div>`);
}
window.openPrescription=openPrescription;

function openChat(){
 openModal('Assistente farmacia','Chat demo',`
  <div class="card" style="background:var(--mint);margin-bottom:10px">
   <p style="font-size:10px;line-height:1.5;margin:0">Ciao! Posso aiutarti a trovare un prodotto, prenotare un servizio o inoltrare una richiesta. Per informazioni cliniche personalizzate ti metto in contatto con il farmacista.</p>
  </div>
  <div class="list">
   <button class="btn secondary wide" onclick="toast('Ricerca disponibilità avviata')">Disponibilità prodotto</button>
   <button class="btn secondary wide" onclick="closeModal();nav('services')">Prenota servizio</button>
   <button class="btn secondary wide" onclick="closeModal();openPrescription()">Invia ricetta</button>
   <button class="btn green wide" onclick="toast('Richiesta passata al farmacista')">Parla con il farmacista</button>
  </div>`);
}
window.openChat=openChat;

function openReminders(){
 openModal('Promemoria','Routine personale',`
  <div class="list">
   <div class="list-row"><div><strong>Vitamina D</strong><span>Ogni giorno · 09:00</span></div><span class="chip">Attivo</span></div>
   <div class="list-row"><div><strong>Magnesio</strong><span>Ogni giorno · 21:00</span></div><span class="chip">Attivo</span></div>
  </div>
  <button class="btn green wide" style="margin-top:12px" onclick="toast('Nuovo promemoria demo')">+ Aggiungi promemoria</button>`);
}
window.openReminders=openReminders;

function openCoupons(){
 openModal('Coupon','Farmacia DEMO Club',`
 <div class="loyalty-card" style="margin-bottom:12px"><div class="points"><span>Coupon attivo</span><strong>-15%</strong><span>Dermocosmesi · demo</span></div><div class="loyalty-badge">★</div></div>
 <div class="notice">Le campagne reali possono essere segmentate per consenso, interessi e storico cliente nel rispetto della privacy.</div>`);
}
window.openCoupons=openCoupons;

function render(){
 const views={home,shop,services:servicesView,orders,profile};
 document.getElementById('app').innerHTML=(views[state.route]||home)();
 bindNav();
 if(state.route==='shop'){
   const input=document.getElementById('searchInput');
   input.oninput=()=>{
     const q=input.value.toLowerCase();
     document.getElementById('grid').innerHTML=productGrid(products.filter(p=>(p.name+' '+p.cat).toLowerCase().includes(q)));
   };
   document.querySelectorAll('.filter').forEach(f=>f.onclick=()=>{
     document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));f.classList.add('active');
     document.getElementById('grid').innerHTML=productGrid(f.dataset.cat==='Tutti'?products:products.filter(p=>p.cat===f.dataset.cat));
   });
 }
}
document.getElementById('notifBtn').onclick=()=>{
 openModal('Notifiche','Centro notifiche',`
  <div class="list">
    <div class="list-row"><div><strong>Ordine in preparazione</strong><span>Il tuo ordine #D-1048 è quasi pronto.</span></div><span class="chip">Ora</span></div>
    <div class="list-row"><div><strong>Promemoria appuntamento</strong><span>Pressione · domani alle 10:30.</span></div></div>
    <div class="list-row"><div><strong>Nuovo coupon</strong><span>-15% dermocosmesi nella demo.</span></div></div>
  </div>`);
};
window.addEventListener('hashchange',()=>{state.route=location.hash.replace('#','')||'home';render()});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))}
render();
