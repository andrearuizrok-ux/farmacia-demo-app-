
const state = {
  route: location.hash.replace('#','') || 'home',
  cart: JSON.parse(localStorage.getItem('farmaciaCart') || '[]'),
  points: 1280,
  appointments: [
    {service:'Misurazione pressione', date:'24 settembre', time:'10:30', status:'Confermato'}
  ],
  reminders: [
    {name:'Vitamina D', time:'09:00', active:true},
    {name:'Magnesio', time:'21:00', active:false}
  ]
};

const products = [
  {id:1,name:'Vitamina C 1000',cat:'Integratori',price:12.90,badge:'Più scelto',desc:'Integratore alimentare in compresse. Demo prodotto.',type:'parafarmaco'},
  {id:2,name:'Crema idratante viso',cat:'Dermocosmesi',price:18.50,badge:'Dermocosmesi',desc:'Texture leggera, uso quotidiano. Demo prodotto.',type:'cosmetico'},
  {id:3,name:'Soluzione fisiologica',cat:'Igiene',price:4.90,badge:'Famiglia',desc:'Formato monodose. Demo prodotto.',type:'dispositivo'},
  {id:4,name:'Cerotti delicati',cat:'Primo soccorso',price:5.60,badge:'Essenziale',desc:'Cerotti assortiti per piccole medicazioni.',type:'dispositivo'},
  {id:5,name:'Probiotici Daily',cat:'Integratori',price:16.90,badge:'Benessere',desc:'Integratore alimentare. Demo prodotto.',type:'parafarmaco'},
  {id:6,name:'SPF 50+ Fluido',cat:'Solari',price:21.00,badge:'Protezione',desc:'Protezione solare alta. Demo prodotto.',type:'cosmetico'},
  {id:7,name:'Termometro digitale',cat:'Dispositivi',price:9.90,badge:'Dispositivo',desc:'Misurazione rapida della temperatura.',type:'dispositivo'},
  {id:8,name:'Gel mani 100 ml',cat:'Igiene',price:3.20,badge:'Tascabile',desc:'Gel igienizzante per le mani.',type:'igiene'}
];

const services = [
  {icon:'♥',name:'Misurazione pressione',time:'15 min',price:'€ 5',desc:'Controllo rapido in farmacia e registrazione del valore nel profilo cliente.'},
  {icon:'◉',name:'Autoanalisi glicemia',time:'15 min',price:'€ 8',desc:'Servizio in farmacia con personale qualificato e referto/registrazione.'},
  {icon:'✦',name:'Consulenza dermocosmetica',time:'30 min',price:'Gratuita',desc:'Appuntamento personalizzato per skincare e scelta prodotti.'},
  {icon:'⌁',name:'Test & prevenzione',time:'20 min',price:'Da € 10',desc:'Catalogo configurabile per i servizi realmente erogati dalla farmacia.'},
  {icon:'◎',name:'Noleggio dispositivi',time:'Su richiesta',price:'Variabile',desc:'Richiesta online per aerosol, bilance, tiralatte o altri dispositivi disponibili.'},
  {icon:'↗',name:'Consegna locale',time:'In giornata',price:'Da € 3',desc:'Gestione zone, fasce orarie e soglie di consegna configurabili.'}
];

const app = document.getElementById('app');

function euro(n){ return new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(n); }
function saveCart(){ localStorage.setItem('farmaciaCart',JSON.stringify(state.cart)); updateCartBadge(); }
function updateCartBadge(){ document.getElementById('cartCount').textContent = state.cart.reduce((a,b)=>a+b.qty,0); }
function toast(msg){
  const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2200);
}
function navigate(route){
  state.route=route; location.hash=route; render(); window.scrollTo({top:0,behavior:'smooth'});
}
function bindRoutes(){
  document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>navigate(b.dataset.route));
  document.querySelectorAll('.desktop-nav button,.mobile-nav button').forEach(b=>b.classList.toggle('active',b.dataset.route===state.route));
}
function addToCart(id){
  const p=products.find(x=>x.id===id);
  const found=state.cart.find(x=>x.id===id);
  if(found) found.qty++;
  else state.cart.push({...p,qty:1});
  saveCart(); toast(`${p.name} aggiunto al carrello`);
}
function renderCart(){
  const wrap=document.getElementById('cartItems');
  if(!state.cart.length) wrap.innerHTML='<div class="empty">Il carrello è vuoto.</div>';
  else wrap.innerHTML=state.cart.map((x,i)=>`
    <div class="cart-row">
      <div><strong>${x.name}</strong><p>${x.cat}</p></div>
      <span>x${x.qty}</span>
      <button class="icon-btn" onclick="removeCart(${i})">×</button>
    </div>`).join('');
  document.getElementById('cartTotal').textContent=euro(state.cart.reduce((s,x)=>s+x.price*x.qty,0));
}
function removeCart(i){ state.cart.splice(i,1); saveCart(); renderCart(); }
window.removeCart=removeCart;

function homeView(){
 return `
 <section class="hero">
   <div>
     <span class="eyebrow">Farmacia locale, esperienza digitale</span>
     <h1>Una possibile esperienza digitale per una farmacia moderna.</h1>
     <p>Questa demo mostra come potrebbe funzionare un ecosistema digitale farmacia: sito, area cliente, servizi, prenotazioni, richieste, loyalty e strumenti operativi. Grafica, contenuti e funzioni vengono poi adattati alla farmacia reale.</p>
     <div class="hero-actions">
       <button class="btn primary" data-route="shop">Vedi esempio catalogo</button>
       <button class="btn secondary" data-route="services">Vedi esempio servizi</button>
     </div>
   </div>
   <div class="hero-panel visual-hero-panel">
     <div class="hero-panel-top"><span class="eyebrow">Concept dimostrativo</span><span class="status">Progetto personalizzabile</span></div>
     <div class="hero-photo-wrap">
       <img src="farmacia-demo-hero.svg" alt="Interno elegante di una farmacia moderna" class="hero-photo">
       <div class="hero-float-card">
         <span class="mini-label">Servizio rapido</span>
         <strong>Ritira in farmacia</strong>
         <small>Ordina online e passa quando è pronto.</small>
       </div>
     </div>
     <div class="quick-grid light-grid">
       <button class="quick-tile light" data-route="prescription"><strong>▤ Invia ricetta</strong><span>Richiesta e prenotazione</span></button>
       <button class="quick-tile light" data-route="services"><strong>♡ Servizi</strong><span>Prenota un appuntamento</span></button>
       <button class="quick-tile light" data-route="shop"><strong>▦ Prodotti</strong><span>Catalogo e disponibilità</span></button>
       <button class="quick-tile light" onclick="openChat()"><strong>◌ Chat farmacia</strong><span>Parla con un operatore</span></button>
     </div>
   </div>
 </section>
 <section class="section compact" style="padding-top:10px;padding-bottom:24px">
   <div class="proposal-note">
      <div>
        <span class="eyebrow">Proposta NOMYRA</span>
        <strong>Questa non è una versione finale del sito.</strong>
        <p>È una demo funzionale per mostrare possibilità, flussi e valore del progetto. Brand, immagini, testi, servizi, colori e integrazioni verranno definiti insieme nella fase progettuale.</p>
      </div>
      <span class="proposal-badge">DEMO</span>
   </div>
 </section>
 <section class="trust-strip">
  <div class="trust-card"><strong>Ritiro in farmacia</strong><span>Ordina e ritira senza attese.</span></div>
  <div class="trust-card"><strong>Consegna locale</strong><span>Fasce orarie configurabili.</span></div>
  <div class="trust-card"><strong>Fidelity digitale</strong><span>Punti, coupon e promozioni.</span></div>
  <div class="trust-card"><strong>Assistenza reale</strong><span>Chat e contatto con la farmacia.</span></div>
 </section>
 <section class="section compact visual-story-section">
   <div class="visual-story">
     <div class="visual-story-copy">
       <span class="eyebrow">Concept digitale per farmacia</span>
       <h2>Un esempio di come il progetto potrebbe presentarsi al cliente finale.</h2>
       <p>Il concept combina immagine coordinata, funzioni utili e semplicità d’uso. Ogni modulo può essere mantenuto, eliminato o personalizzato in base alle esigenze reali della farmacia.</p>
       <div class="mini-stats">
         <div><strong>6+</strong><span>servizi prenotabili</span></div>
         <div><strong>24/7</strong><span>richieste online</span></div>
         <div><strong>1</strong><span>area cliente unica</span></div>
       </div>
     </div>
     <div class="visual-collage">
       <div class="visual-card vc-main"><img src="farmacia-demo-wellness.svg" alt="Prodotti benessere e skincare"></div>
       <div class="visual-card vc-small"><span class="visual-icon">✚</span><strong>Consulenza</strong><small>Umana, semplice, vicina.</small></div>
       <div class="visual-card vc-small alt"><span class="visual-icon">♡</span><strong>Prevenzione</strong><small>Servizi e giornate dedicate.</small></div>
     </div>
   </div>
 </section>
 <section class="section">
   <div class="section-head">
     <div><span class="eyebrow">Tutto in un solo posto</span><h2>Una farmacia che lavora anche prima che il cliente entri.</h2></div>
     <p>La parte digitale non sostituisce il farmacista: riduce telefonate ripetitive, organizza le richieste e rende più facile prenotare, acquistare i prodotti consentiti e ricevere assistenza.</p>
   </div>
   <div class="cards">
     <article class="card hover"><div class="icon">▦</div><h3>Catalogo intelligente</h3><p>Ricerca per categoria, disponibilità, preferiti, promozioni e consigli editoriali approvati dalla farmacia.</p><button class="btn soft" data-route="shop">Apri catalogo</button></article>
     <article class="card hover"><div class="icon">▤</div><h3>Richieste con ricetta</h3><p>Upload sicuro, presa in carico, conferma disponibilità e contatto per il ritiro. Nessun checkout online per i farmaci con prescrizione.</p><button class="btn soft" data-route="prescription">Invia richiesta</button></article>
     <article class="card hover"><div class="icon">♡</div><h3>Farmacia dei servizi</h3><p>Agenda per analisi, prevenzione, consulenze e servizi disponibili nella singola farmacia.</p><button class="btn soft" data-route="services">Prenota</button></article>
   </div>
 </section>
 <section class="section compact">
   <div class="split">
     <div class="feature-panel">
       <div><span class="eyebrow" style="color:#c7eee4">Esperienza cliente</span><h2 style="font-size:42px;margin:12px 0">L’app resta utile anche dopo l’acquisto.</h2><p>Una vera relazione digitale con il cliente, non soltanto un e-commerce.</p></div>
       <div class="feature-list">
         <div class="feature-row"><b>01</b><div><b>Promemoria personali</b><span>Notifiche configurabili dal cliente per la propria routine.</span></div></div>
         <div class="feature-row"><b>02</b><div><b>Fidelity & coupon</b><span>Carta digitale, punti e campagne segmentate.</span></div></div>
         <div class="feature-row"><b>03</b><div><b>Riordino facile</b><span>Preferiti e cronologia dei prodotti acquistabili online.</span></div></div>
       </div>
     </div>
     <div class="card" style="padding:30px">
       <span class="eyebrow">Per la farmacia</span>
       <h2 style="font-size:38px;margin:12px 0 18px">Dietro al sito c’è un piccolo centro operativo.</h2>
       <div class="timeline">
         <div class="timeline-item"><div class="timeline-num">1</div><div><h4>Ordini e richieste</h4><p>Una coda unica per ritiro, consegna, ricette e messaggi.</p></div></div>
         <div class="timeline-item"><div class="timeline-num">2</div><div><h4>Agenda servizi</h4><p>Slot, operatori, reminder e no-show.</p></div></div>
         <div class="timeline-item"><div class="timeline-num">3</div><div><h4>CRM leggero</h4><p>Fidelity, segmenti e storico consensi.</p></div></div>
         <div class="timeline-item"><div class="timeline-num">4</div><div><h4>Analytics</h4><p>Richieste, conversioni, servizi prenotati e categorie più viste.</p></div></div>
       </div>
       <button class="btn primary" style="margin-top:22px" data-route="admin">Vedi la demo gestionale</button>
     </div>
   </div>
 </section>
 <section class="section compact"><div class="promo"><div><span class="eyebrow">Demo PWA</span><h3>Installabile sul telefono come un’app.</h3><p>Una sola base web responsive, pronta per essere trasformata anche in app Android/iOS.</p></div><button class="btn primary" onclick="toast('Demo installabile: usa “Aggiungi a schermata Home” dal browser compatibile.')">Come funziona</button></div></section>
 `;
}

function shopView(){
 const cats=['Tutti',...new Set(products.map(p=>p.cat))];
 return `
 <section class="page-head">
   <span class="eyebrow">Catalogo demo</span>
   <h1>Prodotti per il benessere quotidiano.</h1>
   <p>Catalogo dimostrativo con parafarmaco, dermocosmesi, integratori e dispositivi. In produzione, eventuali SOP/OTC richiedono autorizzazioni e gestione conforme alla normativa.</p>
   <div class="filters">${cats.map((c,i)=>`<button class="filter ${i===0?'active':''}" data-cat="${c}">${c}</button>`).join('')}</div>
 </section>
 <section class="section compact"><div class="product-grid" id="productGrid">${productCards(products)}</div></section>`;
}
function productCards(list){
 return list.map(p=>`<article class="product-card">
   <div class="product-visual"><span class="product-badge">${p.badge}</span><div class="product-pack">${p.name}</div></div>
   <div class="product-body"><span class="tag">${p.cat}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="price-row"><span class="price">${euro(p.price)}</span><button class="add-btn" onclick="addToCart(${p.id})">+</button></div></div>
 </article>`).join('');
}
window.addToCart=addToCart;

function servicesView(){
 return `
 <section class="page-head">
   <span class="eyebrow">Farmacia dei servizi</span>
   <h1>Prenota senza telefonare.</h1>
   <p>La farmacia decide quali servizi mostrare, durata, prezzo, operatori e orari. Il cliente riceve conferma e promemoria.</p>
 </section>
 <section class="section compact">
   <div class="service-grid">${services.map((s,i)=>`<article class="service-card">
     <div class="icon">${s.icon}</div><h3>${s.name}</h3><p>${s.desc}</p>
     <div class="meta">${s.time} • disponibilità demo</div><div class="price">${s.price}</div>
     <button class="btn primary wide" onclick="bookService('${s.name.replaceAll("'","\\'")}')">Prenota</button>
   </article>`).join('')}</div>
 </section>
 <section class="section compact">
   <div class="split">
     <div class="card"><span class="eyebrow">Agenda intelligente</span><h2>Reminder automatici e meno appuntamenti persi.</h2><p>Conferme, promemoria, cancellazioni e riempimento degli slot liberi possono essere automatizzati via email, SMS o push.</p></div>
     <div class="card"><span class="eyebrow">Prevenzione</span><h2>Campagne stagionali misurabili.</h2><p>La farmacia può promuovere giornate dedicate, invitare clienti interessati e monitorare prenotazioni e risultati della campagna.</p></div>
   </div>
 </section>`;
}

function prescriptionView(){
 return `
 <section class="page-head">
   <span class="eyebrow">Richiesta alla farmacia</span>
   <h1>Invia la ricetta, poi pensa la farmacia al resto.</h1>
   <p>Una funzione pensata per ridurre telefonate e passaggi a vuoto: il cliente invia i dati, la farmacia verifica la richiesta e comunica disponibilità e modalità di ritiro o consegna.</p>
 </section>
 <section class="section compact">
   <div class="split">
     <form class="form-card" id="rxForm">
       <div class="form-grid">
         <div class="field"><label>Nome</label><input class="input" required placeholder="Mario" /></div>
         <div class="field"><label>Cognome</label><input class="input" required placeholder="Rossi" /></div>
         <div class="field"><label>Telefono</label><input class="input" required placeholder="+39…" /></div>
         <div class="field"><label>Email</label><input class="input" type="email" placeholder="nome@email.it" /></div>
         <div class="field full"><label>Tipo di richiesta</label>
           <select><option>Verifica disponibilità e prenotazione</option><option>Richiesta consegna locale</option><option>Parlare con il farmacista</option></select>
         </div>
         <div class="field full"><label>Allega ricetta / documento</label><div class="upload"><input type="file" accept="image/*,.pdf" /><p>JPG, PNG o PDF — nella demo il file non viene caricato su un server.</p></div></div>
         <div class="field full"><label>Note</label><textarea rows="4" placeholder="Scrivi eventuali informazioni utili alla farmacia…"></textarea></div>
         <div class="field full"><label><input type="checkbox" required /> Acconsento al trattamento dei dati per gestire questa richiesta.</label></div>
         <div class="field full"><div class="notice"><strong>Importante:</strong> questa è una demo. I farmaci con obbligo di prescrizione non vengono venduti online. La richiesta viene presa in carico dalla farmacia, che conferma successivamente disponibilità e modalità operative.</div></div>
         <div class="field full"><button class="btn primary wide">Invia richiesta demo</button></div>
       </div>
     </form>
     <div class="card" style="padding:30px">
       <span class="eyebrow">Come funziona</span>
       <h2 style="font-size:38px">Tre passaggi, senza confusione.</h2>
       <div class="timeline">
         <div class="timeline-item"><div class="timeline-num">1</div><div><h4>Invia</h4><p>Il cliente compila la richiesta e, se necessario, allega il documento.</p></div></div>
         <div class="timeline-item"><div class="timeline-num">2</div><div><h4>La farmacia verifica</h4><p>L’operatore controlla la richiesta, disponibilità e condizioni applicabili.</p></div></div>
         <div class="timeline-item"><div class="timeline-num">3</div><div><h4>Conferma</h4><p>Il cliente riceve la conferma e le istruzioni per ritiro, consegna o contatto.</p></div></div>
       </div>
       <div class="notice" style="margin-top:22px">In una versione reale, i documenti sanitari richiedono un’infrastruttura con privacy, accessi, logging, conservazione e misure di sicurezza adeguate.</div>
     </div>
   </div>
 </section>`;
}

function profileView(){
 return `
 <section class="page-head"><span class="eyebrow">Area personale demo</span><h1>Tutto quello che serve, senza cercare tra messaggi e ricevute.</h1><p>Profilo, fidelity, appuntamenti, preferiti e promemoria in un solo spazio.</p></section>
 <section class="section compact">
  <div class="profile-grid">
    <div class="member-card">
      <div><small>Farmacia DEMO Club</small><h2>Andrea</h2></div>
      <div><div class="points">${state.points}</div><small>punti disponibili</small></div>
      <div><small>Livello</small><strong>Verde Plus</strong></div>
    </div>
    <div class="card">
      <div class="section-head" style="margin-bottom:16px"><div><span class="eyebrow">Prossimi appuntamenti</span><h2 style="font-size:28px">Agenda</h2></div><button class="btn soft" data-route="services">+ Prenota</button></div>
      <div class="list">${state.appointments.map(a=>`<div class="list-item"><div><strong>${a.service}</strong><span>${a.date} · ${a.time}</span></div><span class="chip">${a.status}</span></div>`).join('')}</div>
    </div>
  </div>
  <div class="split" style="margin-top:22px">
    <div class="card"><span class="eyebrow">Promemoria</span><h2 style="font-size:28px">La mia routine</h2>
      <div class="list">${state.reminders.map((r,i)=>`<div class="list-item"><div><strong>${r.name}</strong><span>Ogni giorno · ${r.time}</span></div><button class="btn ${r.active?'soft':'secondary'}" onclick="toggleReminder(${i})">${r.active?'Attivo':'Attiva'}</button></div>`).join('')}</div>
    </div>
    <div class="card"><span class="eyebrow">Vantaggi</span><h2 style="font-size:28px">Coupon & comunicazioni</h2>
      <div class="list">
        <div class="list-item"><div><strong>-15% dermocosmesi</strong><span>Demo coupon · valido fino al 30/09</span></div><span class="chip">Attivo</span></div>
        <div class="list-item"><div><strong>Giornata prevenzione</strong><span>Nuovi slot disponibili venerdì</span></div><span class="chip">Novità</span></div>
      </div>
    </div>
  </div>
 </section>`;
}
function toggleReminder(i){state.reminders[i].active=!state.reminders[i].active; render(); toast('Promemoria aggiornato');}
window.toggleReminder=toggleReminder;

function adminView(){
 return `
 <section class="page-head"><span class="eyebrow">Demo gestionale farmacia</span><h1>Un’unica vista per richieste, ordini e servizi.</h1><p>Questa sezione rappresenta la parte che il cliente finale non vede: il valore operativo per la farmacia.</p></section>
 <div class="admin-shell">
   <aside class="admin-side"><h3>Farmacia DEMO</h3><button class="active">Dashboard</button><button>Ordini</button><button>Richieste ricette</button><button>Agenda servizi</button><button>Clienti & loyalty</button><button>Campagne</button><button>Catalogo</button><button>Report</button><button>Impostazioni</button></aside>
   <section>
     <div class="kpi-grid">
       <div class="kpi"><span>Richieste oggi</span><strong>18</strong><small>+12% vs media</small></div>
       <div class="kpi"><span>Ordini ritiro</span><strong>11</strong><small>7 pronti</small></div>
       <div class="kpi"><span>Appuntamenti</span><strong>9</strong><small>2 slot liberi</small></div>
       <div class="kpi"><span>Clienti loyalty</span><strong>1.284</strong><small>+36 questo mese</small></div>
     </div>
     <div class="admin-grid">
       <div class="card">
         <span class="eyebrow">Richieste ultimi 7 giorni</span>
         <div class="bar-chart">
           <div class="bar" style="height:48%"><span>Lun</span></div><div class="bar" style="height:68%"><span>Mar</span></div>
           <div class="bar" style="height:61%"><span>Mer</span></div><div class="bar" style="height:82%"><span>Gio</span></div>
           <div class="bar" style="height:74%"><span>Ven</span></div><div class="bar" style="height:56%"><span>Sab</span></div>
           <div class="bar" style="height:35%"><span>Dom</span></div>
         </div>
       </div>
       <div class="card"><span class="eyebrow">Da gestire</span><h3 style="font-size:24px">Coda operativa</h3>
         <div class="list">
          <div class="list-item"><div><strong>Richiesta ricetta #R-1042</strong><span>Ricevuta 8 min fa</span></div><span class="chip">Nuova</span></div>
          <div class="list-item"><div><strong>Ordine ritiro #O-889</strong><span>3 prodotti</span></div><span class="chip">Prepara</span></div>
          <div class="list-item"><div><strong>Messaggio cliente</strong><span>“Prodotto disponibile?”</span></div><span class="chip">Rispondi</span></div>
         </div>
       </div>
     </div>
     <div class="card" style="margin-top:18px;overflow:auto">
       <span class="eyebrow">Agenda di oggi</span><h3 style="font-size:24px">Servizi prenotati</h3>
       <table class="table"><thead><tr><th>Ora</th><th>Cliente</th><th>Servizio</th><th>Stato</th></tr></thead><tbody>
        <tr><td>09:30</td><td>Cliente 01</td><td>Pressione</td><td><span class="chip">Completato</span></td></tr>
        <tr><td>10:30</td><td>Cliente 02</td><td>Glicemia</td><td><span class="chip">Confermato</span></td></tr>
        <tr><td>11:00</td><td>Cliente 03</td><td>Dermocosmesi</td><td><span class="chip">Confermato</span></td></tr>
        <tr><td>12:15</td><td>Cliente 04</td><td>Noleggio dispositivo</td><td><span class="chip">Richiesta</span></td></tr>
       </tbody></table>
     </div>
   </section>
 </div>`;
}

function render(){
 const views={home:homeView,shop:shopView,services:servicesView,prescription:prescriptionView,profile:profileView,admin:adminView};
 app.innerHTML=(views[state.route]||homeView)();
 bindRoutes();
 if(state.route==='shop'){
   document.querySelectorAll('.filter').forEach(f=>f.onclick=()=>{
     document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active')); f.classList.add('active');
     const cat=f.dataset.cat; document.getElementById('productGrid').innerHTML=productCards(cat==='Tutti'?products:products.filter(p=>p.cat===cat));
   });
 }
 if(state.route==='prescription'){
   document.getElementById('rxForm').onsubmit=(e)=>{e.preventDefault();toast('Richiesta demo inviata alla farmacia'); e.target.reset();}
 }
 updateCartBadge();
}

function bookService(name){
 state.appointments.unshift({service:name,date:'Data da selezionare',time:'Da confermare',status:'Richiesto'});
 toast(`${name}: richiesta di prenotazione aggiunta`);
 setTimeout(()=>navigate('profile'),700);
}
window.bookService=bookService;

document.getElementById('openCart').onclick=()=>{renderCart();document.getElementById('cartDialog').showModal()};
document.getElementById('checkoutBtn').onclick=()=>{
 if(!state.cart.length){toast('Aggiungi almeno un prodotto');return}
 document.getElementById('cartDialog').close();
 toast('Checkout demo: scegliere ritiro o consegna');
};
document.getElementById('openSearch').onclick=()=>{document.getElementById('searchDialog').showModal();document.getElementById('globalSearch').focus()};
document.getElementById('globalSearch').oninput=(e)=>{
 const q=e.target.value.toLowerCase().trim();
 const hits=q?products.filter(p=>(p.name+' '+p.cat).toLowerCase().includes(q)).slice(0,5):[];
 document.getElementById('searchResults').innerHTML=hits.length?hits.map(p=>`<div class="search-hit"><div><strong>${p.name}</strong><small style="display:block;color:#6c817c">${p.cat}</small></div><button class="btn soft" onclick="addToCart(${p.id})">Aggiungi</button></div>`).join(''):'<div class="empty">Scrivi per cercare nel catalogo demo.</div>';
};

function openChat(){
 const p=document.getElementById('chatPanel'); p.classList.toggle('open');
}
window.openChat=openChat;
function chatChoice(text){
 document.getElementById('chatBody').innerHTML=`<div class="chat-msg"><strong>Assistente Farmacia DEMO</strong><br>Hai scelto: “${text}”. In produzione questa richiesta verrebbe indirizzata al flusso corretto o a un operatore.</div>`;
 toast('Richiesta classificata');
}
window.chatChoice=chatChoice;

const chat = document.createElement('div');
chat.innerHTML=`<button class="floating-chat" onclick="openChat()" aria-label="Apri chat">◌</button>
<div class="chat-panel" id="chatPanel">
  <div class="modal-head"><div><span class="eyebrow">Assistente farmacia</span><h3 style="margin:6px 0">Come posso aiutarti?</h3></div><button class="icon-btn" onclick="openChat()">×</button></div>
  <div id="chatBody"><div class="chat-msg">Posso indirizzarti rapidamente. Per questioni cliniche o personalizzate, ti metto in contatto con il farmacista.</div></div>
  <div class="chat-options">
    <button onclick="chatChoice('Disponibilità prodotto')">Disponibilità prodotto</button>
    <button onclick="chatChoice('Prenotare un servizio')">Prenotare servizio</button>
    <button onclick="chatChoice('Inviare una ricetta')">Inviare ricetta</button>
    <button onclick="chatChoice('Parlare con il farmacista')">Parlare col farmacista</button>
  </div>
</div>`;
document.body.appendChild(chat);

window.addEventListener('hashchange',()=>{state.route=location.hash.replace('#','')||'home';render()});
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
render();
