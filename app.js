'use strict';
const root=document.documentElement;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#global-menu');
const main=document.querySelector('main');
const footer=document.querySelector('.footer');
function setMenu(open){nav.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.body.classList.toggle('menu-open',open);main.inert=open;footer.inert=open;}
menuButton.addEventListener('click',()=>setMenu(nav.hidden));
nav.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!nav.hidden){setMenu(false);menuButton.focus();}if(event.key==='Tab'&&!nav.hidden){const items=[...document.querySelectorAll('.site-header a,.site-header button,#global-menu a')].filter(el=>el.getClientRects().length);const first=items[0],last=items[items.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
const themeButton=document.querySelector('.theme-switch');
function applyTheme(theme){root.dataset.theme=theme;themeButton.setAttribute('aria-checked',String(theme==='dark'));document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#0b0b0d':'#ffffff';}
try{applyTheme(localStorage.getItem('aisafesafe-theme')==='dark'?'dark':'light');}catch{applyTheme('light');}
themeButton.addEventListener('click',()=>{const theme=root.dataset.theme==='dark'?'light':'dark';applyTheme(theme);try{localStorage.setItem('aisafesafe-theme',theme);}catch{}});
const cases = {
  oauth: {
    eyebrow: 'IDENTITY / EMBEDDED WALLETS', title: 'When a login redirect becomes wallet control.', status: 'In review', statusClass: 'review', meta: 'Ult (Cronos) · Submitted 06 October 2026',
    body: `<p>A researcher-submitted report describes an OAuth destination-validation weakness in Ult’s identity-provider configuration. A genuine user consent flow could deliver its result to an untrusted destination, after which downstream services treated the resulting session as valid.</p><h3>What the investigation followed</h3><p>The supplied evidence traces the issue from account access to embedded-wallet authorization. Follow-up testing on researcher-owned accounts reports wallet-key export and registration of an origin-bound passkey. A separate wallet-address binding issue is also described and requires separate remediation.</p><div class="evidence-grid"><div><b>Identity and signature controls</b><p>Invalid app IDs, invalid credentials, missing signatures, and unrelated keys were tested. A recovered signing address matched the researcher’s account wallet.</p></div><div><b>Bounded, account-specific impact</b><p>Cross-wallet authorization attempts were refused. The report explicitly requires user consent and does not claim a zero-interaction or cross-account mass compromise.</p></div></div><h3>Observed evidence versus simulated impact</h3><p>Key access and passkey behavior are reported on accounts owned by the researcher. A later withdrawal demonstration used owner impersonation on a local chain fork. It demonstrates the contract’s owner authority; it is not a live withdrawal using an obtained victim key. No transaction was broadcast and no third-party funds were moved, according to the supplied report.</p><h3>Remediation direction</h3><p>Restrict identity-provider origins and callback destinations, require appropriate step-up checks around sensitive account and wallet actions, review linked credentials, and require proof of control for separately registered wallet addresses. The follow-up reports that the populated domain list was the relevant enforcement control; it corrects the initial assumption about a separate allowlist flag.</p><h3>Why this matters for AI systems</h3><p>The transferable lesson is to test authority across the entire chain. For an agent-connected product, a valid identity or tool response does not by itself prove that the preceding trust boundary was enforced.</p><div class="case-note"><p><strong>Disclosure status:</strong> The supplied HackenProof snapshot shows “In review” and researcher-assessed Critical severity. This case is not presented as confirmed, paid, or resolved. It is a limited summary of the supplied report; live status has not been independently verified.</p></div>`
  },
  graphql: {
    eyebrow:'APPLICATION SECURITY / GRAPHQL',title:'One request. 500 resolver executions.',status:'Resolved',statusClass:'resolved',meta:'white.market · Founder research',
    body:`<p>Aliased duplicate GraphQL fields caused roughly 500 resolver executions from a single HTTP request, bypassing the application’s query-complexity limit.</p><h3>Why it mattered</h3><p>The result was a low-cost resource-amplification primitive: the cost of processing the request could substantially exceed what the complexity control accounted for.</p><h3>Outcome</h3><p>The founder’s research record identifies the finding as resolved. His public LinkedIn post also describes the fix as deployed.</p><h3>Research lesson</h3><p>Test the real execution cost of an API request. A query that looks small to one control may still create many expensive operations behind it.</p><p><a href="https://www.linkedin.com/in/somveer-yadav" target="_blank" rel="noopener noreferrer">Founder’s public research profile ↗</a></p><div class="case-note"><p>Status is sourced from the supplied résumé and the founder’s public post, rather than an independent vendor advisory.</p></div>`
  },
  aws: {
    eyebrow:'APPLICATION SECURITY / CLOUD',title:'Cloud credentials. No authentication.',status:'Accepted',statusClass:'accepted',meta:'HackenProof submission · Founder research',
    body:`<p>The supplied résumé describes an unauthenticated upload endpoint that returned temporary AWS credentials. The reported access capabilities included object writes, public reads, and cross-credential object access.</p><h3>Why it mattered</h3><p>A client-facing upload flow crossed into cloud authorization. The report connected the credential-issuance behavior to its potential storage impact rather than treating the exposed response as the whole finding.</p><h3>Research lesson</h3><p>Review both who can request temporary credentials and what permissions the resulting credentials carry. An expiration time does not replace caller authorization or least privilege.</p><div class="case-note"><p>The founder’s résumé lists this finding as accepted. A production fix and current remediation state are not asserted. No credentials or operational endpoint details are published here.</p></div>`
  },
  sagemaker: {
    eyebrow:'AI / ML SOFTWARE SECURITY',title:'A model artifact. A code-execution boundary.',status:'Submitted',statusClass:'submitted',meta:'SageMaker Python SDK · Submitted March 2026 via Huntr',
    body:`<p>The founder’s résumé records a submission concerning a helper that deserializes a pickle file through cloudpickle. The report argues that an untrusted artifact could execute operating-system commands on the developer’s machine.</p><h3>Why it matters to AI workflows</h3><p>Model and dependency artifacts are part of an application’s trust boundary. Loading an artifact can carry different risks from reading ordinary data.</p><h3>Research focus</h3><p>The report concerns insecure deserialization (CWE-502), artifact provenance, and where validation or isolation is needed before processing externally supplied files.</p><div class="case-note"><p>This is a submitted research claim from the supplied résumé. No vendor confirmation, CVE, or resolved status is claimed. Determining the security impact also requires assessing the helper’s intended trust model.</p></div>`
  }
};
const caseDialog = document.querySelector('#case-dialog');
function openDialog(dialog){dialog.showModal();document.body.style.overflow='hidden';}
document.querySelectorAll('[data-case]').forEach(button=>button.addEventListener('click',()=>{
  const item=cases[button.dataset.case];
  document.querySelector('#case-content').innerHTML=`<span class="eyebrow">${item.eyebrow}</span><h2>${item.title}</h2><div class="dialog-meta"><span class="status ${item.statusClass}">${item.status}</span><span>${item.meta}</span></div>${item.body}`;
  openDialog(caseDialog);
}));
document.querySelectorAll('.dialog').forEach(dialog=>{
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{document.body.style.overflow='';});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(item=>{const active=item===button;item.classList.toggle('active',active);item.setAttribute('aria-pressed',String(active));});
  document.querySelectorAll('.finding').forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;});
}));

const form=document.querySelector('#enquiry-form');
document.querySelectorAll('[data-enquire]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.service)form.elements.service.value=button.dataset.service;document.querySelector('#contact').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});form.elements.name.focus({preventScroll:true});}));
document.querySelector('[data-privacy]').addEventListener('click',()=>openDialog(document.querySelector('#privacy-dialog')));
function getBrief(){const data=new FormData(form);return {subject:`Project enquiry: ${data.get('service')}`,text:`Hello Somveer,\n\nI would like to discuss ${data.get('service')}.\n\nName: ${data.get('name')}\nEmail: ${data.get('email')}\n\nProject brief:\n${data.get('brief')}\n\nThank you.`};}
function showDraft(draft){document.querySelector('#email-fallback').hidden=false;document.querySelector('#brief-output').value=draft.text;const url=`mailto:contact@aisafesafe.me?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.text)}`;document.querySelector('#email-draft-link').href=url;return url;}
form.addEventListener('submit',event=>{
  event.preventDefault();if(!form.reportValidity())return;
  const url=showDraft(getBrief());
  document.querySelector('#form-status').textContent='Your brief is ready. Open the draft in your email app, review it, then send it.';
  window.location.href=url;
});
document.querySelector('#copy-brief').addEventListener('click',async()=>{
  if(!form.reportValidity())return;
  const draft=getBrief();showDraft(draft);
  try{await navigator.clipboard.writeText(draft.text);document.querySelector('#form-status').textContent='Brief copied. Paste it into an email to contact@aisafesafe.me.';}
  catch{const output=document.querySelector('#brief-output');output.focus();output.select();document.querySelector('#form-status').textContent='Your brief is selected below. Copy it and paste it into your email.';}
});

const pixels={
walker:['00011000','00011000','00111100','01111110','11011011','00011000','00100100','01100110'],
bird:['100000001','110000011','011010110','001111100','000111000','000010000'],
plant:['00100100','01100110','00111100','00011000','11011011','01111110','00011000','00111100'],
bug:['01000010','00100100','00111100','01011010','11111111','01011010','00111100','01000010'],
eye:['000110000','001111000','011001100','110110110','011001100','001111000','000110000'],
link:['00111000','01101100','11000110','11011110','01111011','01100011','00110110','00011100'],
bot:['00011000','00011000','01111110','11000011','11011011','11000011','01111110','01000010'],
cross:['11000011','01100110','00111100','00011000','00011000','00111100','01100110','11000011'],
document:['11111100','10000110','10110011','10000001','10111101','10000001','10111101','11111111'],
layers:['000110000','001111000','011111100','111111110','011111100','101111010','010110100','001001000'],
spark:['000110000','010110100','001111000','111111110','111111110','001111000','010110100','000110000']
};
document.querySelectorAll('[data-pixel]').forEach(el=>{const grid=pixels[el.dataset.pixel]||pixels.spark;el.innerHTML='<svg viewBox="0 0 '+grid[0].length+' '+grid.length+'" fill="currentColor" aria-hidden="true" shape-rendering="crispEdges">'+grid.map((row,y)=>[...row].map((cell,x)=>cell==='1'?'<rect x="'+x+'" y="'+y+'" width="1" height="1"/>':'').join('')).join('')+'</svg>';});
if('IntersectionObserver' in window&&!reduced.matches){root.classList.add('js');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));}
const cursor=document.querySelector('.custom-cursor');
if(window.matchMedia('(hover: hover) and (pointer: fine)').matches&&!reduced.matches){document.addEventListener('pointermove',event=>{cursor.style.transform='translate('+event.clientX+'px,'+event.clientY+'px)';cursor.style.opacity='1';cursor.classList.toggle('hover',!!event.target.closest('a,button,summary'));});document.addEventListener('pointerleave',()=>cursor.style.opacity='0');}
const canvas=document.querySelector('#pixel-wordmark');
const ctx=canvas.getContext('2d');
const play=document.querySelector('#play-pixels');
const letters={P:['11110','10001','10001','11110','10000','10000','10000'],R:['11110','10001','10001','11110','10100','10010','10001'],O:['01110','10001','10001','10001','10001','10001','01110'],V:['10001','10001','10001','10001','10001','01010','00100'],E:['11111','10000','10000','11110','10000','10000','11111'],T:['11111','00100','00100','00100','00100','00100','00100'],H:['10001','10001','10001','11111','10001','10001','10001'],I:['11111','00100','00100','00100','00100','00100','11111'],S:['01111','10000','10000','01110','00001','00001','11110'],K:['10001','10010','10100','11000','10100','10010','10001'],' ':['000','000','000','000','000','000','000']};
let playing=false,frame=0,clock=0,canvasWidth=0,canvasHeight=0,dots=[];
function resizeWordmark(){const rect=canvas.getBoundingClientRect();canvasWidth=rect.width;canvasHeight=rect.height;const ratio=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(rect.width*ratio);canvas.height=Math.round(rect.height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);const word='PROVE THE RISK';const columns=[...word].reduce((sum,ch)=>sum+letters[ch][0].length+1,0)-1;const unit=Math.min(canvasWidth/columns,canvasHeight/9);let x=(canvasWidth-columns*unit)/2;const y=(canvasHeight-7*unit)/2;dots=[];for(const ch of word){letters[ch].forEach((row,ry)=>[...row].forEach((cell,rx)=>{if(cell==='1')dots.push({x:x+rx*unit,y:y+ry*unit,size:unit*.85,phase:Math.random()*Math.PI*2});}));x+=(letters[ch][0].length+1)*unit;}drawWordmark();}
function drawWordmark(){ctx.clearRect(0,0,canvasWidth,canvasHeight);ctx.fillStyle='#f0eeea';for(const dot of dots){const offset=playing?Math.sin(clock*.002+dot.phase)*Math.min(20,canvasHeight*.12):0;ctx.fillRect(Math.round(dot.x),Math.round(dot.y+offset),Math.ceil(dot.size),Math.ceil(dot.size));}}
function animateWordmark(time){clock=time;drawWordmark();if(playing)frame=requestAnimationFrame(animateWordmark);}
function togglePixels(){playing=!playing;play.setAttribute('aria-pressed',String(playing));play.innerHTML=playing?'<span>PAUSE</span><span aria-hidden="true">Ⅱ</span>':'<span>PLAY</span><span aria-hidden="true">▶</span>';cancelAnimationFrame(frame);if(playing)frame=requestAnimationFrame(animateWordmark);else drawWordmark();}
play.addEventListener('click',togglePixels);canvas.addEventListener('click',togglePixels);canvas.addEventListener('keydown',event=>{if(event.key===' '||event.key==='Enter'){event.preventDefault();togglePixels();}});
new ResizeObserver(resizeWordmark).observe(canvas);
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);}else if(playing){frame=requestAnimationFrame(animateWordmark);}});
