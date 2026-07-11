/* ==================================================================
   SNOW OVER LIAODONG 3D — engine
   Narrative bridge + five explorable levels + player + input
   ================================================================== */
'use strict';
const $ = id => document.getElementById(id);

/* ---- visible error reporter (debug aid) ---- */
function showErr(where, e){
  let box=document.getElementById('errbox');
  if(!box){ box=document.createElement('div'); box.id='errbox';
    box.style.cssText='position:fixed;left:8px;right:8px;bottom:8px;z-index:99;background:rgba(120,20,15,.95);color:#ffe;font:12px/1.4 monospace;padding:10px 12px;border-radius:8px;max-height:40vh;overflow:auto;white-space:pre-wrap';
    document.body.appendChild(box); }
  const msg=(e&&e.stack)?e.stack:(e&&e.message)?e.message:String(e);
  box.textContent='['+where+'] '+msg;
}
window.addEventListener('error', ev=>{ showErr('window', ev.error||ev.message||'unknown'); });
window.addEventListener('unhandledrejection', ev=>{ showErr('promise', ev.reason||'unknown'); });



/* ---- bind Begin button + title-code UI IMMEDIATELY, before any risky init ----
   This guarantees taps always do SOMETHING even if later setup throws. ---- */
function bindTap(el, fn){
  if(!el) return;
  let fired=false;
  const wrap=(ev)=>{ if(fired) return; fired=true; setTimeout(()=>fired=false,400);
    try{ fn(ev); }catch(e){ showErr('tap:'+el.id, e); } };
  el.addEventListener('click', wrap);
  el.addEventListener('touchend', e=>{ e.preventDefault&&e.preventDefault(); wrap(e); }, {passive:false});
}
let __started=false;
function beginGame(){
  if(__started) return; __started=true;
  const t=$('title'); if(t) t.style.display='none';
  started=true;
  if(typeof renderStats==='function') renderStats();
  if(typeof renderSatchel==='function') renderSatchel();
  loadLevel(1); startCine(()=>go('p1'));
}
bindTap($('startBtn'), beginGame);
bindTap($('titleCode'), ()=>{ $('codeBox').classList.add('open'); });
bindTap($('codeCancel'), ()=>{ $('codeBox').classList.remove('open'); });
bindTap($('codeGo'), ()=>{
  const v=$('codeInput').value.trim().toUpperCase();
  $('codeBox').classList.remove('open');
  if(CODES[v]) CODES[v]();
});

/* ---------------- narrative state (referenced by SCENES fx) ---------------- */
const S = {mu:2, ji:2, hon:2, items:[], flags:{}, scene:'p1'};
function addItem(name){ if(!S.items.includes(name)){ S.items.push(name); renderSatchel(); } }
function hasItem(n){ return S.items.includes(n); }
function bump(){}          /* stats removed — Halo-style story progression */
function renderStats(){}
function renderSatchel(){}
function setWeapon(name){ const el=$('weptxt'); if(el) el.textContent=name; }
function meets(req){
  if(!req) return true;
  if(req.item) return hasItem(req.item);
  if(req.flag) return !!S.flags[req.flag];
  if(req.stat) return S[req.stat]>=req.val;
  return true;
}
function reqLabel(req){
  if(!req) return '';
  if(req.item) return `Needs: ${req.item}`;
  if(req.flag) return req.flagLabel || 'A door closed earlier…';
  if(req.stat) return `Needs ${req.stat==='mu'?'武 Might':req.stat==='ji'?'智 Wit':'魂 Spirit'} ${req.val}`;
  return '';
}

/* ---------------- overlay narrative renderer ---------------- */
const LEVEL_CARDS = {ch1:1, ch2:2, ch3:3, ch4:4, ch5:5, ch6:6, ch7w:11, ch8j:12, ch8c:14, ch7:7, ch8:8, ch10r:13, ch9:9, ch10:10};
let overlayOpen=false, openedGate=null, selChoice=-1;

function openOverlay(){ overlayOpen=true; $('overlay').classList.add('open'); }
function closeOverlay(){
  overlayOpen=false; $('overlay').classList.remove('open'); selChoice=-1;
  if(openedGate){ openedGate.done=true; if(openedGate.onDone) openedGate.onDone(); openedGate=null; }
  updateObjective();
}
/* ---------------- cinematic fly-in ---------------- */
const CINE={active:false,t:0,dur:5,after:null};
function startCine(after){
  CINE.active=true; CINE.t=0; CINE.after=after||null;
  document.body.classList.add('cine');
}
function endCine(){
  if(!CINE.active) return;
  CINE.active=false; document.body.classList.remove('cine');
  if(CINE.after){ const f=CINE.after; CINE.after=null; f(); }
}
function tickCine(dt){
  CINE.t+=dt;
  const k=Math.min(1,CINE.t/CINE.dur);
  const e=k<.5 ? 2*k*k : 1-Math.pow(-2*k+2,2)/2;             // easeInOutQuad
  const ang=CAM.yaw+2.1-(e*2.1);                              // sweep 120° into place
  const dist=26-(26-CAM.dist)*e, h=15-(15-2.6)*e;
  const tgt=new THREE.Vector3(P.pos.x,P.pos.y+1.4,P.pos.z);
  camera.position.set(tgt.x+Math.sin(ang)*dist, tgt.y+h, tgt.z+Math.cos(ang)*dist);
  camera.lookAt(tgt);
  if(k>=1) endCine();
}

/* ---------- floating subtitle: quick narration beat, no tap, no panel ---------- */
let __subT=null;
function subtitle(text, ms){
  const el=$('subtitle'); if(!el) return;
  clearTimeout(__subT);
  el.textContent=text; el.classList.add('on');
  __subT=setTimeout(()=>el.classList.remove('on'), ms||2600);
}

function go(id){
  if(id==='RESET'){ location.reload(); return; }
  if(typeof id==='string' && id.indexOf('WAVE:')===0){
    const next=id.slice(5);
    if(overlayOpen) closeOverlay();
    const ids = (world && world.L.spawnWave) ? world.L.spawnWave() : [];
    world.L.wave = {next, ids};
    $('objtxt').textContent='Fight!';
    return;
  }
  if(typeof id==='string' && id.indexOf('CINE:')===0){
    const rest=id.slice(5), ci=rest.indexOf(':');
    const key=rest.slice(0,ci), next=rest.slice(ci+1);
    if(overlayOpen) closeOverlay();
    const spec=(typeof CUTSPECS!=='undefined'&&CUTSPECS[key])||{};
    playCutscene(key,{dur:spec.dur||8, subs:spec.subs||[], stage:spec.stage||null, after:()=>go(next)});
    return;
  }
  // ---- cave area swap-ins (Mission 5). Build the room, drop the quest gates. ----
  if(id==='a5_frag_go'){ if(overlayOpen) closeOverlay(); buildCaveArea('fragments'); return; }
  if(id==='a5_hunt_go'){ if(overlayOpen) closeOverlay(); buildCaveArea('weapons'); return; }
  S.scene=id;
  const lvl = LEVEL_CARDS[id];
  if(lvl && lvl!==curLevel){
    if(overlayOpen) closeOverlay();
    loadLevel(lvl); startCine(()=>{ renderScene(id); openOverlay(); }); return;
  }
  if(overlayOpen){
    const g = world && world.gates.find(g=>g.entry && g.entry===id && !g.done);
    if((g && g!==openedGate) || (world && world.closeScenes.includes(id))){ closeOverlay(); return; }
  }
  renderScene(id); openOverlay();
}
/* ---------------- Higgsfield chapter art (online: shows; offline: hides) ---------------- */
const ART={
  p1: 'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_041304_c0ddc6ac-230b-469b-ac33-fd6d2fe51b86.png',
  ch1:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_041304_c0ddc6ac-230b-469b-ac33-fd6d2fe51b86.png',
  ch2:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_150536_b7447fed-2742-4f43-83e6-3e5e7dc0a53d.png',
  ch3:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_041703_8565b960-1c4b-486e-b208-4251b8e68431.png',
  ch4:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_150708_c22b34e0-f1a9-4d6f-872c-f55da26ad822.png',
  ch5:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_151024_5f1611a6-148d-45ee-b212-6aa116eb8a61.png',
  ch6:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_151218_eb6661c5-99a3-4fe7-b2c1-6e89187d2059.png',
  ch7:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_150708_c22b34e0-f1a9-4d6f-872c-f55da26ad822.png',
  ch7w:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_151024_5f1611a6-148d-45ee-b212-6aa116eb8a61.png',
  ch8j:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_041304_c0ddc6ac-230b-469b-ac33-fd6d2fe51b86.png',
  ch10r:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_151218_eb6661c5-99a3-4fe7-b2c1-6e89187d2059.png',
  ch8c:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_150536_b7447fed-2742-4f43-83e6-3e5e7dc0a53d.png',
  ch8:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_151024_5f1611a6-148d-45ee-b212-6aa116eb8a61.png',
  ch9:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_150536_b7447fed-2742-4f43-83e6-3e5e7dc0a53d.png',
  ch10:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_041304_c0ddc6ac-230b-469b-ac33-fd6d2fe51b86.png',
};
function renderScene(id){
  const sc = SCENES[id]; if(!sc){ console.warn('missing scene',id); return; }
  $('overlay').classList.toggle('dialog', !sc.chapter);
  const card=$('ocard');
  card.classList.remove('fade'); void card.offsetWidth; card.classList.add('fade');
  card.classList.toggle('chapter', !!sc.chapter);
  if(typeof setPortrait==='function') setPortrait(sc.speaker||null);
  $('oeyebrow').textContent = sc.eyebrow||'';
  $('otitle').textContent = sc.title||'';
  let body = typeof sc.text==='function' ? sc.text() : sc.text;
  if(sc.chapter){
    const art = ART[id] ? `<img class="scene-art" src="${ART[id]}" alt="" onerror="this.remove()">` : '';
    body = art + `<div class="chapter-mark">${sc.mark||'章'}</div>` + body +
      (sc.code?`<div class="code-hint">Chapter code — write it down: <b>${sc.code}</b></div>`:'');
  }
  $('otext').innerHTML = body;
  if(sc.crumb) $('chapname').textContent = sc.crumb;
  const box=$('ochoices'); box.innerHTML='';
  const chs = typeof sc.choices==='function'?sc.choices():(sc.choices||[]);
  chs.forEach(c=>{
    if(c.hideIf && c.hideIf()) return;
    const ok = meets(c.req);
    const b=document.createElement('button');
    b.className='choice fade'+(ok?'':' locked');
    b.innerHTML=`<span class="glyph">${ok?'◆':'◇'}</span><span>${c.t}${c.req?`<span class="req">${ok?'✓ ':''}${reqLabel(c.req)}</span>`:''}</span>`;
    if(ok) b.onclick=()=>{ if(c.fx)c.fx(); go(typeof c.to==='function'?c.to():c.to); $('overlay').scrollTo({top:0}); };
    box.appendChild(b);
  });
  selChoice=-1; paintSel();
}
function choiceEls(){ return [...document.querySelectorAll('#ochoices .choice:not(.locked)')]; }
function paintSel(){
  document.querySelectorAll('#ochoices .choice').forEach(el=>el.classList.remove('sel'));
  const els=choiceEls();
  if(selChoice>=0 && els[selChoice]){ els[selChoice].classList.add('sel'); els[selChoice].scrollIntoView({block:'nearest'}); }
}
function moveSel(d){ const els=choiceEls(); if(!els.length)return;
  selChoice = selChoice<0 ? (d>0?0:els.length-1) : (selChoice+d+els.length)%els.length; paintSel(); }
function pressSel(){ const els=choiceEls(); if(selChoice>=0&&els[selChoice]) els[selChoice].click(); else if(els.length){selChoice=0;paintSel();} }

/* ==================================================================
   THREE.JS WORLD
   ================================================================== */
let renderer;
try{
  renderer = new THREE.WebGLRenderer({canvas:$('gl'), antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
}catch(e){ showErr('webgl-init', e); }
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, .1, 300);
function resize(){ renderer.setSize(innerWidth,innerHeight); camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); }
addEventListener('resize',resize); resize();

let world=null, curLevel=0;
const clock = new THREE.Clock();


/* ================== TEXTURE KIT — Higgsfield-painted, procedural fallback ================== */
const TEXURLS={
  roof:   'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_190449_f005d887-31c4-4d26-8ec0-ba75eec57535.png',
  plaster:'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_190716_e43b0cc1-4f86-4b66-8748-313b6bb094f4.png',
  ice:    'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260702_190900_ed698d26-0900-4e22-a7bd-9bd0b00b4f23.png',
};
function procCanvas(draw){
  const c=document.createElement('canvas'); c.width=c.height=256;
  draw(c.getContext('2d'));
  const t=new THREE.CanvasTexture(c); t.wrapS=t.wrapT=THREE.RepeatWrapping; return t;
}
const PROC={
  roof:()=>procCanvas(x=>{ x.fillStyle='#3d4453';x.fillRect(0,0,256,256);
    for(let r=0;r<8;r++)for(let c=0;c<8;c++){ x.fillStyle=(r+c)%2?'#394050':'#454e60'; x.fillRect(c*32,r*32,32,30);
      x.fillStyle='rgba(238,243,250,.28)'; x.fillRect(c*32,r*32,32,5);
      x.fillStyle='rgba(10,12,20,.25)'; x.fillRect(c*32,r*32+27,32,3);} }),
  plaster:()=>procCanvas(x=>{ x.fillStyle='#ddd0b2';x.fillRect(0,0,256,256);
    for(let i=0;i<1100;i++){ x.fillStyle='rgba(115,95,60,'+(Math.random()*.09)+')';
      x.fillRect(Math.random()*256,Math.random()*256,1+Math.random()*2,1+Math.random()*2);} 
    x.strokeStyle='rgba(100,80,50,.15)';
    for(let i=0;i<5;i++){x.beginPath();let px=Math.random()*256,py=0;x.moveTo(px,py);
      for(let s=0;s<6;s++){px+=(Math.random()-.5)*30;py+=45;x.lineTo(px,py);}x.stroke();} }),
  ice:()=>procCanvas(x=>{ x.fillStyle='#cfe0ea';x.fillRect(0,0,256,256);
    for(let i=0;i<400;i++){x.fillStyle='rgba(255,255,255,'+(Math.random()*.2)+')';
      x.fillRect(Math.random()*256,Math.random()*256,2,2);}
    x.strokeStyle='rgba(35,65,90,.4)'; x.lineWidth=1;
    for(let i=0;i<12;i++){x.beginPath();let px=Math.random()*256,py=Math.random()*256;x.moveTo(px,py);
      for(let s=0;s<5;s++){px+=(Math.random()-.5)*90;py+=(Math.random()-.5)*90;x.lineTo(px,py);}x.stroke();} }),
};
function texMat(key,tint,repX,repY){
  const m=new THREE.MeshLambertMaterial({color:tint||0xffffff});
  m.map=PROC[key](); m.map.repeat.set(repX,repY);
  if(TEXURLS[key]){
    try{
      const ld=new THREE.TextureLoader(); ld.setCrossOrigin&&ld.setCrossOrigin('anonymous');
      ld.load(TEXURLS[key], hi=>{ try{ hi.wrapS=hi.wrapT=THREE.RepeatWrapping; hi.repeat.set(repX,repY);
        m.map=hi; m.needsUpdate=true; }catch(e){} }, undefined, ()=>{});
    }catch(e){}
  }
  return m;
}
let MATS=null;
function initMats(){
  if(MATS) return;
  MATS={
    wallDay:  texMat('plaster',0xffffff,2,1),
    wallNight:texMat('plaster',0x9a9db2,2,1),
    roof:     texMat('roof',   0xffffff,3,3),
    roofNight:texMat('roof',   0xb8bdd0,3,3),
    ice:      texMat('ice',    0xffffff,10,12),
  };
}

/* ---------- builder helpers ---------- */
function mat(c,e){ const m=new THREE.MeshLambertMaterial({color:c}); if(e){m.emissive=new THREE.Color(e); m.emissiveIntensity=1;} return m; }
function box(w,h,d,c,x,y,z,opt){
  opt=opt||{};
  const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d), opt.m||mat(c,opt.e));
  m.position.set(x,y,z); if(opt.ry)m.rotation.y=opt.ry;
  world.group.add(m);
  if(opt.solid) world.solids.push({x1:x-w/2,z1:z-d/2,x2:x+w/2,z2:z+d/2,top:y+h/2});
  if(opt.plat) world.plats.push({x1:x-w/2,z1:z-d/2,x2:x+w/2,z2:z+d/2,y:y+h/2});
  return m;
}
function ground(w,d,c,y,m){ const g=box(w,.3,d,c,0,(y||0)-.15,0,{m:m}); world.plats.push({x1:-w/2,z1:-d/2,x2:w/2,z2:d/2,y:y||0}); return g; }
function building(x,z,w,d,h,wallC,roofC,opt){
  opt=opt||{};
  box(w,h,d,wallC,x,h/2,z,{solid:true,plat:true,m:(typeof wallC==='object'?wallC:undefined)});
  box(w+.7,.22,d+.7,roofC,x,h+.11,z,{m:(typeof roofC==='object'?roofC:undefined)});                    // eaves
  box(w+.7,.14,d+.7,'#f2f5fa',x,h+.3,z,{});                 // snow cap
  box(w*.5,.3,.24,'#2a2119',x,h+.5,z,{});                   // ridge
  if(opt.door) box(1,1.6,.1,'#7e2a1f',x,0.8,z+d/2+.06,{});
  if(opt.lantern) lantern(x+w/2-.3, h-.4, z+d/2+.35, opt.light);
}
function lantern(x,y,z,withLight){
  const s=new THREE.Mesh(new THREE.SphereGeometry(.22,10,10), mat('#5c1610','#ff4a2a'));
  s.position.set(x,y,z); world.group.add(s);
  box(.04,.5,.04,'#1a1410',x,y+.4,z,{});
  if(withLight && world.lights<5){ const L=new THREE.PointLight(0xff6a3a,.9,9); L.position.set(x,y,z); world.group.add(L); world.lights++; }
  return s;
}
function tree(x,z,s){
  s=s||1;
  box(.24*s,1*s,.24*s,'#3a2c20',x,.5*s,z,{});
  const cone=(r,h,y,c)=>{ const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,7),mat(c)); m.position.set(x,y,z); world.group.add(m); };
  cone(1*s,1.4*s,1.6*s,'#2c4a3a'); cone(.75*s,1.2*s,2.3*s,'#335643'); cone(.5*s,.9*s,3*s,'#f0f4f8');
}
function wallRun(x1,z1,x2,z2,h,c){
  const dx=x2-x1,dz=z2-z1,len=Math.hypot(dx,dz),cx=(x1+x2)/2,cz=(z1+z2)/2;
  const m=box(len,h,.5,c||'#a89a7c',cx,h/2,cz,{ry:Math.atan2(dz,dx)});
  // axis-aligned collider approximation
  if(Math.abs(dx)>Math.abs(dz)) world.solids.push({x1:Math.min(x1,x2),z1:cz-.3,x2:Math.max(x1,x2),z2:cz+.3,top:h});
  else world.solids.push({x1:cx-.3,z1:Math.min(z1,z2),x2:cx+.3,z2:Math.max(z1,z2),top:h});
  box(len+.2,.16,.8,'#f2f5fa',cx,h+.08,cz,{ry:Math.atan2(dz,dx)});
  return m;
}
function moonGate(x,z,ry){
  const t=new THREE.Mesh(new THREE.TorusGeometry(1.5,.22,10,28), mat('#a89a7c'));
  t.position.set(x,1.5,z); t.rotation.y=ry||0; world.group.add(t);
}
function textSprite(txt,color){
  const c=document.createElement('canvas'); c.width=512; c.height=128;
  const x=c.getContext('2d');
  x.font='bold 46px Georgia,serif'; x.textAlign='center'; x.textBaseline='middle';
  x.shadowColor='rgba(0,0,0,.9)'; x.shadowBlur=12;
  x.fillStyle=color||'#ffe9b0'; x.fillText(txt,256,64);
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false}));
  sp.scale.set(4.6,1.15,1); return sp;
}
function mkGate(g){
  const grp=new THREE.Group();
  const beamM=new THREE.MeshBasicMaterial({color:0xffd27a,transparent:true,opacity:.22,blending:THREE.AdditiveBlending,depthWrite:false});
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(.75,.75,4.4,14,1,true),beamM);
  beam.position.y=2.2; grp.add(beam);
  const core=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,4.4,8),
    new THREE.MeshBasicMaterial({color:0xfff2cf,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false}));
  core.position.y=2.2; grp.add(core);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.85,.06,8,26),
    new THREE.MeshBasicMaterial({color:0xffc873}));
  ring.rotation.x=Math.PI/2; ring.position.y=.08; grp.add(ring);
  const lbl=textSprite(g.title); lbl.position.y=3.3; grp.add(lbl);
  grp.position.set(g.pos[0], g.y||groundAt(g.pos[0],g.pos[1],50), g.pos[1]);
  g.mesh=grp; g.beamM=beamM; world.group.add(grp);
}

/* ---------- player figure ---------- */
let player;
function limb(len,r0,r1,color,px,py,pz){
  const pivot=new THREE.Group(); pivot.position.set(px,py,pz);
  const seg=new THREE.Mesh(new THREE.CylinderGeometry(r0,r1,len,6), mat(color));
  seg.position.y=-len/2; pivot.add(seg);
  return pivot;
}
function mkPlayer(){
  const g=new THREE.Group();                       // root (position+yaw)
  const body=new THREE.Group(); g.add(body);       // roll pivot
  body.position.y=.92;
  const hips=new THREE.Mesh(new THREE.BoxGeometry(.4,.16,.26), mat('#4a5163'));
  body.add(hips);
  // legs: thigh->knee->shin, trousers
  const thighL=limb(.42,.09,.08,'#4a5163',-.11,-.05,0), thighR=limb(.42,.09,.08,'#4a5163',.11,-.05,0);
  const kneeL=limb(.42,.075,.06,'#3d4454',0,-.42,0),  kneeR=limb(.42,.075,.06,'#3d4454',0,-.42,0);
  thighL.add(kneeL); thighR.add(kneeR); body.add(thighL,thighR);
  // torso: hip-length grey-blue jacket + red sash
  const torso=new THREE.Group(); torso.position.y=.08; body.add(torso);
  const jacket=new THREE.Mesh(new THREE.CylinderGeometry(.24,.3,.55,10), mat('#6b7587'));
  jacket.position.y=.3; torso.add(jacket);
  const sash=new THREE.Mesh(new THREE.BoxGeometry(.52,.1,.4), mat('#b4372a'));
  sash.position.y=.06; torso.add(sash);
  // arms: shoulder->elbow
  const shL=limb(.3,.07,.06,'#5d6678',-.3,.5,0), shR=limb(.3,.07,.06,'#5d6678',.3,.5,0);
  const elL=limb(.3,.055,.045,'#e8c9a8',0,-.3,0), elR=limb(.3,.055,.045,'#e8c9a8',0,-.3,0);
  shL.add(elL); shR.add(elR); torso.add(shL,shR);
  shL.rotation.z=.15; shR.rotation.z=-.15;
  // head + hair + braid + silver binyeo
  const headG=new THREE.Group(); headG.position.y=.62; torso.add(headG);
  const head=new THREE.Mesh(new THREE.SphereGeometry(.21,12,12), mat('#e8c9a8'));
  head.position.y=.16; headG.add(head);
  const hair=new THREE.Mesh(new THREE.SphereGeometry(.225,12,12), mat('#181310'));
  hair.position.set(0,.2,-.045); hair.scale.set(1,.92,1); headG.add(hair);
  const braid=new THREE.Group(); braid.position.set(0,.14,-.18); headG.add(braid);
  const braidM=new THREE.Mesh(new THREE.CylinderGeometry(.05,.032,.72,6), mat('#181310'));
  braidM.position.y=-.36; braid.add(braidM);
  const pin=new THREE.Mesh(new THREE.CylinderGeometry(.013,.013,.32,5), mat('#cfd6dd','#8b98a8'));
  pin.rotation.z=Math.PI/2; pin.position.set(0,.3,-.05); headG.add(pin);
  g.userData={body,thighL,thighR,kneeL,kneeR,torso,shL,shR,elL,elR,headG,braid};
  return g;
}
/* player animation state */
const ANIM={phase:0, roll:0, atk:0, atkDur:0, heavy:false, land:0};
function animPlayer(dt, speed, grounded, airborne){
  const u=player.userData;
  if(ANIM.roll>0){                                   // dodge roll: full body tumble
    ANIM.roll-=dt;
    u.body.rotation.x+= dt*(Math.PI*2)/.45;
    if(ANIM.roll<=0) u.body.rotation.x=0;
    return;
  }
  u.body.rotation.x*=.7;
  ANIM.phase += dt*(5.5+7*speed)*(speed>.02?1:0);
  const s=Math.min(1,speed), ph=ANIM.phase;
  if(!grounded){                                     // airborne tuck
    u.thighL.rotation.x=lerpA(u.thighL.rotation.x,-.9,dt*10);
    u.thighR.rotation.x=lerpA(u.thighR.rotation.x,-.6,dt*10);
    u.kneeL.rotation.x=u.kneeR.rotation.x=1.3;
  } else if(s>.02){                                  // walk / run cycle
    u.thighL.rotation.x=Math.sin(ph)*.7*s;
    u.thighR.rotation.x=Math.sin(ph+Math.PI)*.7*s;
    u.kneeL.rotation.x=Math.max(0,-Math.sin(ph-.5))*1.1*s;
    u.kneeR.rotation.x=Math.max(0,-Math.sin(ph+Math.PI-.5))*1.1*s;
    u.torso.rotation.x=.12*s; u.body.position.y=.92+Math.abs(Math.sin(ph))*.05*s;
  } else {                                           // idle: breathe + settle
    ['thighL','thighR','kneeL','kneeR'].forEach(k=>u[k].rotation.x*=.82);
    u.torso.rotation.x*=.85;
    u.body.position.y=.92+Math.sin(clock.elapsedTime*1.8)*.008;
  }
  if(ANIM.land>0){ ANIM.land-=dt; u.body.position.y-=.1*(ANIM.land/.18); }
  // arms: attack keyframes override the swing
  if(ANIM.atk>0){
    ANIM.atk-=dt; const k=1-ANIM.atk/ANIM.atkDur, sw=Math.sin(Math.min(1,k)*Math.PI);
    if(ANIM.heavy){ u.shL.rotation.x=u.shR.rotation.x=-.4-sw*2.0; u.elL.rotation.x=u.elR.rotation.x=-.4;
      u.torso.rotation.y=Math.sin(k*Math.PI)*.5; }
    else { u.shR.rotation.x=-.3-sw*2.1; u.elR.rotation.x=-.5*sw;
      u.torso.rotation.y=-Math.sin(k*Math.PI)*.35; }
    if(ANIM.atk<=0){ u.torso.rotation.y=0; }
  } else {
    u.shL.rotation.x=lerpA(u.shL.rotation.x,-Math.sin(ph)*.55*s,dt*12);
    u.shR.rotation.x=lerpA(u.shR.rotation.x, Math.sin(ph)*.55*s,dt*12);
    u.elL.rotation.x=u.elR.rotation.x=-.25-.2*s;
    u.torso.rotation.y*=.85;
  }
  // braid physics-ish: trails movement, swings with stride
  u.braid.rotation.x=.18+ .12*s*Math.sin(ph*2)+ (grounded?0:.5);
  u.headG.rotation.x=-.06*s;
}
function lerpA(a,b,t){ return a+(b-a)*Math.min(1,t); }
function mkBatu(x,z){
  const g=new THREE.Group();
  const robe=new THREE.Mesh(new THREE.CylinderGeometry(.42,.6,1.35,10), mat('#241f1c'));
  robe.position.y=.67; g.add(robe);
  const fur=new THREE.Mesh(new THREE.TorusGeometry(.42,.14,8,16), mat('#4a3f33'));
  fur.rotation.x=Math.PI/2; fur.position.y=1.28; g.add(fur);
  const head=new THREE.Mesh(new THREE.SphereGeometry(.26,10,10), mat('#c9a684'));
  head.position.y=1.62; g.add(head);
  const hat=new THREE.Mesh(new THREE.ConeGeometry(.3,.34,8), mat('#17120e'));
  hat.position.y=1.86; g.add(hat);
  const sabre=new THREE.Mesh(new THREE.BoxGeometry(.05,1.1,.12), mat('#9aa4ad'));
  sabre.position.set(.5,.9,.1); sabre.rotation.z=-.5; g.add(sabre);
  g.position.set(x,0,z); world.group.add(g);
  return g;
}

/* ---------- snow ---------- */
let snowPts;
function mkSnow(count){
  const geo=new THREE.BufferGeometry();
  const n=count||1100, pos=new Float32Array(n*3), spd=new Float32Array(n);
  for(let i=0;i<n;i++){ pos[i*3]=(Math.random()-.5)*70; pos[i*3+1]=Math.random()*24; pos[i*3+2]=(Math.random()-.5)*70; spd[i]=1.5+Math.random()*2.2; }
  geo.setAttribute('position', new THREE.BufferAttribute(pos,3));
  snowPts=new THREE.Points(geo, new THREE.PointsMaterial({color:0xe6ecf6,size:.14,transparent:true,opacity:.85}));
  snowPts.userData={spd,n}; world.group.add(snowPts);
}
function tickSnow(dt){
  if(!snowPts)return;
  const p=snowPts.geometry.attributes.position.array, {spd,n}=snowPts.userData;
  for(let i=0;i<n;i++){
    p[i*3+1]-=spd[i]*dt; p[i*3]+=Math.sin(clock.elapsedTime+i)*.004;
    if(p[i*3+1]<0){ p[i*3+1]=24; p[i*3]=P.pos.x+(Math.random()-.5)*70; p[i*3+2]=P.pos.z+(Math.random()-.5)*70; }
  }
  snowPts.geometry.attributes.position.needsUpdate=true;
}

/* ==================================================================
   LEVELS
   ================================================================== */
function baseWorld(){
  if(world) scene.remove(world.group);
  world={group:new THREE.Group(), solids:[], plats:[], gates:[], closeScenes:[], dynamic:[], enemies:[], lights:0, L:{}};
  scene.add(world.group);
}
function sky(hexTop, fogHex, fogNear, fogFar){
  renderer.setClearColor(hexTop);
  scene.fog=new THREE.Fog(fogHex, fogNear, fogFar);
}
function lights(hemiSky,hemiGnd,hemiI,dirC,dirI,dx,dy,dz){
  world.group.add(new THREE.HemisphereLight(hemiSky,hemiGnd,hemiI));
  const d=new THREE.DirectionalLight(dirC,dirI); d.position.set(dx,dy,dz); world.group.add(d);
}



/* ================= THE FOUR HERO CUTSCENES (puppet stagings) =================
   Camera choreography + timed dialogue over the live 3D scene. Skippable.
   If Higgsfield cinematics are ever injected, these stagings are bypassed
   automatically by playCutscene's asset-priority logic.                     */
const CUTSPECS = {
  ford: { dur: 16, subs: [
      {t:0.5, txt:'He catches them at the ford. One man, on foot, against seven.'},
      {t:3.5, txt:'You watch your father take them apart \u2014 the first with an arrow, the last with his hands.'},
      {t:7.0, txt:'Then his arms are around you, and he is saying your name into your hair \u2014'},
      {t:10.0,txt:'\u2014 and his arms go slack. You feel it before you understand it.'},
      {t:13.0,txt:'A blade behind you is a funeral. He was holding you when he stopped listening.'},
    ],
    stage(t,dt){
      // slow orbital descent toward the river's edge, ending close and low
      const a=-1.2+t*.09, r=16-Math.min(10,t*.8), h=7-Math.min(5,t*.42);
      camera.position.set(P.pos.x+Math.sin(a)*r, h, P.pos.z-19+Math.cos(a)*r);
      camera.lookAt(new THREE.Vector3(P.pos.x, 1, P.pos.z-19));
    } },
  kiss: { dur: 12, subs: [
      {t:0.5, txt:'\u201cStop trying to beat me. Move with me.\u201d'},
      {t:3.0, txt:'And one evening you stop fighting it \u2014'},
      {t:5.5, txt:'\u2014 and the two of you are one turning shape in the lantern light, blade-edge to blade-edge, never touching.'},
      {t:9.0, txt:'The form ends. Neither of you steps back.'},
      {t:10.8,txt:'The distance closes by itself.'},
    ],
    stage(t,dt){
      // slow circle around the pond, drifting upward at the end (the tasteful cut to the lanterns)
      const a=t*.28, r=9-Math.min(3,t*.2), h=2.2+(t>9? (t-9)*1.6 : 0);
      camera.position.set(Math.sin(a)*r, h, 6+Math.cos(a)*r);
      camera.lookAt(new THREE.Vector3(0, t>9? 3.5+(t-9) : 1.2, 6));
    } },
  recognition: { dur: 10, subs: [
      {t:0.4, txt:'There are too many. Thinking stops. Your body chooses for you \u2014'},
      {t:3.0, txt:'\u2014 and it chooses the pond, the lanterns, the turning form \u2014'},
      {t:5.5, txt:'\u2014 and the stranger flows into it with you, like he has been waiting years for the invitation.'},
      {t:8.0, txt:'You know this dance. You know this dancer.'},
    ],
    stage(t,dt){
      // accelerating circle around the player \u2014 the dance made of camera
      const a=t*(.4+t*.06), r=7.5-Math.min(3.5,t*.35);
      camera.position.set(P.pos.x+Math.sin(a)*r, 3.4-Math.min(1.6,t*.15), P.pos.z+Math.cos(a)*r);
      camera.lookAt(new THREE.Vector3(P.pos.x, 1.3, P.pos.z));
    } },
  mingzhu: { dur: 18, subs: [
      {t:0.6, txt:'Fushun falls. Then Tieling. The names come like ice cracking on a warming river.'},
      {t:4.2, txt:'It reaches the house on a market morning. A strike on the eastern estate \u2014 fast riders, guided by someone who knew the roads.'},
      {t:8.2, txt:'Lady Mingzhu was overseeing the granary there.'},
      {t:11.0,txt:'They bring her home in the cart she left in.'},
      {t:14.0,txt:'The general does not weep. Lan does not weep. Jin goes still \u2014 and stays still.'},
      {t:16.2,txt:'China is falling. In this house, it began with her.'},
    ],
    stage(t,dt){
      // begin high above the estate, descend with terrible slowness toward the front gate,
      // then \u2014 for the last four seconds \u2014 stop moving entirely and let the snow fall
      if(t<14){
        const p=t/14, h=16-p*13, z=26-p*8;
        camera.position.set(Math.sin(t*.05)*2.5, h, z);
        camera.lookAt(new THREE.Vector3(0, 1.2, 17));
      }
      // hold. stillness is the point. (Jin's grief \u2014 the dancer gone stone \u2014 as camera language)
    } },
  lake: { dur: 12, subs: [
      {t:0.5, txt:'The water is glass. The mountain stands upside down in it.'},
      {t:3.5, txt:'He is there at the shore \u2014 and for once, not moving at all.'},
      {t:6.5, txt:'As if stillness were the gift he prepared.'},
      {t:9.0, txt:'\u201cYou came,\u201d he says. In Korean. Still clumsy. Still learned for you.'},
    ],
    stage(t,dt){
      // long slow push across the water toward the shore
      const z=-30+t*1.1, h=5.5-t*.22;
      camera.position.set(Math.sin(t*.1)*3, Math.max(2.2,h), z);
      camera.lookAt(new THREE.Vector3(0, 3.9, -16));
    } },
};

/* ---- Mission 5 cave sub-area. Rebuilds world.group in place, sets gates. ---- */
function buildCaveArea(phase){
  // wipe current area
  while(world.group.children.length) world.group.remove(world.group.children[0]);
  world.solids.length=0; world.gates.length=0; world.enemies.length=0;
  world.dynamic.length=0; world.closeScenes=[];
  P.pos.set(0,1.1,10); P.vy=0; P.grounded=true; P.safe.copy(P.pos);

  // warm lantern-lit cave: dark rock, gold light, hanging paintings, spring, moss
  sky('#1a1710','#221c12',10,42);
  lights('#3a2f22','#0a0806',.5,'#e8b070',.9,4,10,6);
  ground(40,40,'#26201a',0);
  // rock shell (solid walls around a room)
  wallRun(-14,-14,14,-14,5,'#2c2620'); wallRun(-14,14,14,14,5,'#2c2620');
  wallRun(-14,-14,-14,14,5,'#2c2620'); wallRun(14,-14,14,14,5,'#2c2620');
  // rock pillars / uneven interior
  box(2,4,2,'#322a22',-8,2,-6,{solid:true}); box(2.4,5,2.4,'#2e271f',9,2.5,-4,{solid:true});
  box(1.6,3,1.6,'#352c23',6,1.5,7,{solid:true});
  // the spring pool (far corner) — the 'water's secret'
  box(7,.08,6,'#3a6a72',-8,.06,-10,{}); world.solids.push({x1:-11,z1:-13,x2:-5,z2:-7,top:.3});
  // the singing stone (center, low platform you can stand on)
  box(2.2,.5,2.2,'#4a4034',0,.25,-2,{solid:true,plat:true});
  // hanging paintings (quads on the walls) — art blends per style
  for(let i=0;i<5;i++){ box(1.4,1.9,.06,'#c9b78a',-11+i*5.5,2.6,-13.6,{}); }
  // lanterns for warmth
  lantern(-8,3.4,-6,true); lantern(9,3.6,-4,true); lantern(0,3.2,6,true); lantern(-8,2.6,-10,true);
  // moss dabs + a shaft of light (light cone)
  for(let i=0;i<10;i++) box(.6,.05,.6,'#4a6a3a',-12+Math.random()*24,.06,-12+Math.random()*24,{});
  mkSnow(60);

  if(phase==='fragments'){
    $('objtxt').textContent='Read the cave. Find the five fragments.';
    const fpos=[[-11,-6,2.4],[11,-8,2.4],[-9,-11,.6],[6,10,2.6],[0,-2,1.0]]; // last = on the singing stone
    fpos.forEach((p,i)=>{
      world.gates.push({
        entry:null, quick:'A line, vertical in the crack \u2014 a woman\u2019s hand disguised as water-stain.',
        title:'Fragment '+(i+1), pos:[p[0],p[1]], y:p[2], tag:'frag', avail:()=>true
      });
    });
    world.gates.push({ entry:'a5_stone', title:'Beneath the Singing Stone', pos:[0,-2], y:.6,
      avail(){ return world.gates.filter(g=>g.tag==='frag'&&g.done).length>=5; } });
    world.closeScenes=['a5_stone'];
  } else { // weapons
    $('objtxt').textContent='Two weapons. The high ledge, and the water\u2019s secret.';
    // sword: high ledge (a raised platform you jump to)
    box(3,.5,2,'#3a3128',9,3,-9,{solid:true,plat:true});
    box(2.2,.4,1.2,'#43392d',7.5,1.6,-8,{solid:true,plat:true}); // step up
    world.gates.push({ entry:'a5_sword', title:'The High Ledge \u2014 Crane\u2019s Wing', pos:[9,-9], y:3.3,
      avail:()=>true, fx(){ S.flags.jinsword=true; } });
    world.gates.push({ entry:'a5_bow', title:'The Water\u2019s Secret \u2014 Winter Bow', pos:[-8,-10], y:.4,
      avail(){ return world.gates.find(g=>g.entry==='a5_sword').done; },
      fx(){ S.flags.mombow=true; if(typeof setWeapon==='function') setWeapon('The Winter Bow'); } });
    world.closeScenes=['a5_sword','a5_bow'];
  }
  // reset the visit book-keeping for gates
  world.gates.forEach(g=>{ g.done=false; g._p=null; });
}

const LEVELS = {
/* ---------- 1 · Uiju, Joseon (bright winter morning) ---------- */
1:{ name:'Uiju, Joseon \u00b7 Age 11', spawn:[0,14],
  build(){
    sky('#c3cddd','#ccd5e2',18,80);
    lights('#e8eef8','#8a8272',.9,'#fff2dd',.8,20,30,10);
    ground(44,44,'#eef1f6',0);
    // hanok farmhouses
    building(-12,-10,8,5,2.8,MATS.wallDay,MATS.roof,{door:true});
    building(-1,-13,7,5,2.6,MATS.wallDay,MATS.roof,{door:true,lantern:true,light:true});
    building(10,-9,7,5,2.7,MATS.wallDay,MATS.roof,{door:true});
    // millet field rows (south)
    for(let i=0;i<36;i++){ const m=new THREE.Mesh(new THREE.ConeGeometry(.16,1.1,5),mat('#8a815e'));
      m.position.set(-16+(i%12)*3, .55, 6+Math.floor(i/12)*3); world.group.add(m); }
    // archery range (west): straw target
    box(.4,1.6,1.6,'#c9b47e',-16,1,0,{solid:true});
    box(.12,.5,.5,'#b4372a',-15.7,1.2,0,{});
    // frozen river along the north edge
    box(44,.1,7,'#a8c4d4',0,.04,-19,{});
    world.solids.push({x1:-22,z1:-22.5,x2:22,z2:-15.5,top:3});
    tree(-18,-14,1.1); tree(17,-15,1.2); tree(-19,10,1); tree(19,12,1.1);
    mkSnow(500);
  },
  gates:[
    {entry:'a1_drill', title:'Morning Drill', pos:[-14.5,2], avail:()=>true, fx(){ bump('mu',1); }},
    {entry:'a1_raidgo', title:'Smoke on the Wind', pos:[0,-14.5], avail(){return this._p.done}},
  ],
  wave(){ return [ mkGuard(P.pos.x+4,P.pos.z+2,{hp:30,dmg:8,speed:3,aggro:60}),
                   mkGuard(P.pos.x-4,P.pos.z+3,{hp:30,dmg:8,speed:2.8,aggro:60}) ]; }
},

/* ---------- 2 · Guangning slave market (grey morning) ---------- */
2:{ name:'Guangning \u00b7 The Market of Old Kang', spawn:[0,24],
  build(){
    sky('#9aa3b4','#a5adbd',14,70);
    lights('#c8d0de','#5a5347',.75,'#e8e2d2',.55,-14,26,8);
    ground(34,60,'#8e94a2',0);
    for(let i=0;i<5;i++){
      building(-12,-22+i*11,7,6,3+(i%2)*0.7,MATS.wallDay,MATS.roof,{door:true,lantern:i<2,light:i===0});
      if(i%2===0) building(11,-24+i*12,6,5,3.2,MATS.wallDay,MATS.roof,{door:true});
    }
    // slave cages: iron-dark boxes with bar posts
    function cage(x,z){ box(3,2,3,'#2c2a26',x,1,z,{solid:true});
      for(let i=0;i<4;i++) box(.12,2.2,.12,'#171412',x-1.4+i*.93,1.1,z+1.55,{}); }
    cage(4,6); cage(4,-2); cage(-4,-8);
    // auction block
    box(4,.7,3,'#6e5a3a',0,.35,14,{solid:true,plat:true});
    // market stalls
    box(3,1.8,1.4,'#7a4a3a',-8,.9,16,{solid:true}); box(3,1.8,1.4,'#4a5a7a',8,.9,18,{solid:true});
    wallRun(-17,-30,17,-30,5,'#5b5f6e');
    tree(-16,14,1); tree(-16,-8,1.1);
    // Kang's handlers — hostile from the start
    mkGuard(2,10,{hp:35,dmg:9,aggro:9});
    mkGuard(-3,2,{hp:35,dmg:9,aggro:9});
    mkSnow(300);
  },
  closeScenes:['a2_close1'],
  gates:[
    {entry:'a2_break', title:'The Careless Knot', pos:[0,14.8], y:.7, avail:()=>true},
    {entry:null, quick:'The lock gives. They scatter into the crowd like sparrows.', title:'Open the Cage', pos:[4,7.8], tag:'cage',
      avail(){ return world.gates[0].done; }},
    {entry:null, quick:'You strike the chain twice. An old man grips your hands and says a blessing you half-remember.', title:'Open the Cage', pos:[4,-.2], tag:'cage',
      avail(){ return world.gates[0].done; }},
    {entry:null, quick:'A girl your age runs without looking back. Good.', title:'Open the Cage', pos:[-4,-6.2], tag:'cage',
      avail(){ return world.gates[0].done; }},
    {entry:'a2_kang', title:'Old Kang', pos:[0,-14],
      avail(){ return world.gates.filter(g=>g.tag==='cage'&&g.done).length>=3; }},
  ]
},

/* ---------- 3 · House of Zhao (the five years) ---------- */
3:{ name:'The House of Zhao \u00b7 Five Winters', spawn:[0,10],
  build(){
    sky('#b9c4d6','#c3cddd',18,80);
    lights('#dfe8f5','#8a8272',.85,'#fff2dd',.85,20,30,10);
    ground(46,46,'#e9edf4',0);
    wallRun(-21,-21,21,-21,2.6); wallRun(-21,21,21,21,2.6);
    wallRun(-21,-21,-21,21,2.6); wallRun(21,-21,21,21,2.6);
    wallRun(-7,-21,-7,-2,2.4); wallRun(-7,2,-7,21,2.4); moonGate(-7,0,Math.PI/2);
    wallRun(7,-21,7,-2,2.4);  wallRun(7,2,7,21,2.4);  moonGate(7,0,Math.PI/2);
    building(-14,-16,9,5,3,MATS.wallDay,MATS.roof,{door:true,lantern:true,light:true});
    building(-14,16,8,5,3,MATS.wallDay,MATS.roof,{door:true});
    building(0,-16,10,6,3.6,MATS.wallDay,MATS.roof,{door:true,lantern:true,light:true});
    building(0,16,10,6,3.6,MATS.wallDay,MATS.roof,{door:true});
    building(14,-16,9,5,3.2,MATS.wallDay,MATS.roof,{door:true});
    building(14,16,9,5,3.2,MATS.wallDay,MATS.roof,{door:true,lantern:true,light:true});
    box(6,.1,4,'#a8c4d4',0,.06,6,{});
    box(6.6,.3,.4,'#8f8266',0,.15,3.9,{}); box(6.6,.3,.4,'#8f8266',0,.15,8.1,{});
    box(.4,.3,4.6,'#8f8266',-3.3,.15,6,{}); box(.4,.3,4.6,'#8f8266',3.3,.15,6,{});
    tree(-17,0,1.1); tree(17,6,1.2); tree(3,-8,.9); tree(-3,12,1);
    for(let i=0;i<3;i++) lantern(-7+.01, 2.2, -4+i*4);
    mkGuard(-16,-6,{dummy:true,hp:60});
    mkGuard(-13.5,-7.5,{dummy:true,hp:60});
    mkSnow(700);
  },
  gates:[
    {entry:'a3_go',   title:'Year One \u00b7 Lady Mingzhu', pos:[0,17.5], avail:()=>true},
    {entry:'a3_y2',   title:'Year Two \u00b7 The Yard', pos:[-14,-4], avail(){return this._p.done}, fx(){ bump('mu',2); S.flags.trained=true; setWeapon('Zhao Steel'); subtitle('Steel, at last. The strike and the throw are yours now.'); }},
    {entry:'a3_y3',   title:'Year Three \u00b7 The Son Who Dances', pos:[0,4], avail(){return this._p.done}, fx(){ bump('ji',1); }},
    {entry:'a3_y4',   title:'Year Four \u00b7 What You Know', pos:[14,-13.5], avail(){return this._p.done}, fx(){ bump('ji',1); }},
    {entry:'a3_dance',title:'Year Five \u00b7 The Pond, Evenings', pos:[0,8.5], avail(){return this._p.done}, fx(){ bump('hon',2); }},
    {entry:'a3_fall', title:'A Market Morning', pos:[0,-13], avail(){return this._p.done}},
    {entry:'a3_window',title:'A Grey Dawn', pos:[-14,13.5], avail(){return this._p.done}},
    {entry:'a3_vow',  title:'The General\u2019s Question', pos:[14,13.5], avail(){return this._p.done}, fx(){ bump('mu',1); bump('hon',1); }},
  ]
},

/* ---------- 4 · The masked mission (rooftops, deep night) ---------- */
4:{ name:'Years Later \u00b7 The Compound', spawn:[-16,16],
  build(){
    sky('#0a0d18','#0e1120',12,64);
    lights('#2c3760','#141210',.45,'#a9bce8',.5,-20,30,-10);
    ground(56,56,'#2e3342',0);
    const B=[[-10,10,6,6,2.6],[-3,9,5,5,3.1],[3.5,6,6,5,3.5],[9,2,5,6,3.8],[13,-4,6,5,4.2],
             [8,-10,5,5,3.4],[1,-8,6,5,3],[-6,-4,5,6,2.7],[-12,-10,6,5,3.2],[15,-12,5,5,4.6],
             [-1,0,4,4,2.2],[6,-2,4,4,2.9]];
    B.forEach(b=>building(b[0],b[1],b[2],b[3],b[4],MATS.wallNight,MATS.roofNight,{lantern:Math.random()<.4}));
    for(let i=0;i<5;i++) box(2.4,.5,1.1,'#4a4636',-13.5,.25+i*.5,13.4-i*1.1,{solid:true,plat:true});
    wallRun(-8,20,8,20,3.4,'#5b5f6e'); building(0,20,4,3,4.4,'#5b5f6e','#2a2d38',{});
    wallRun(-28,-20,28,-20,5,'#565a68');
    // holding cages inside the compound
    box(3,2,3,'#2c2a26',-6,1,-14,{solid:true});
    box(3,2,3,'#2c2a26',14,1,6,{solid:true});
    tree(-20,6,1); lantern(0,4.6,20,true);
    mkGuard(4,14,{hp:45,dmg:11,aggro:8,patrol:[[4,14],[-4,14],[-4,8],[4,8]]});
    mkGuard(-9,-14,{hp:45,dmg:11,aggro:8,patrol:[[-9,-14],[6,-14]]});
    mkGuard(17,4,{hp:55,dmg:12,aggro:9,speed:3});
    mkSnow(900);
  },
  closeScenes:['a4_go','a4_close'],
  gates:[
    {entry:'a4_clash', title:'The Other Crew', pos:[13,-4], y:4.3,
      avail(){ return world.enemies.filter(e=>!e.dummy&&e.hp<=0).length>=1; }},
    {entry:'a4_team', title:'Split the Compound', pos:[0,-2], avail(){return this._p.done}},
    {entry:null, quick:'Empty. Straw and a cold chain. Something is wrong.', title:'The West Cage', pos:[-6,-11.8], tag:'c4cage',
      avail(){ return world.gates[1].done; }},
    {entry:null, quick:'Also empty. Very wrong.', title:'The East Cage', pos:[14,8.2], tag:'c4cage',
      avail(){ return world.gates[1].done; }},
    {entry:'a4_ambushcut', title:'The Gates Close', pos:[0,18],
      avail(){ return world.gates.filter(g=>g.tag==='c4cage'&&g.done).length>=2; }},
  ],
  wave(){ const w=[]; const spots=[[5,12],[-5,12],[8,-6],[-8,-4],[0,-12]];
    spots.forEach(s=>w.push(mkGuard(s[0],s[1],{hp:45,dmg:11,speed:3.1,aggro:60})));
    return w; }
},

/* ---------- 5 · The lake (bright noon, mountain mirror) ---------- */
5:{ name:'The Next Day \u00b7 The Lake', spawn:[0,22],
  build(){
    sky('#8b95a8','#98a2b4',10,60);
    lights('#c8d2e2','#5a5e52',.85,'#e8eef8',.6,10,24,14);
    const T=[[0,20,26,12,0],[0,9,22,11,1.2],[0,-1,20,10,2.4],[0,-10,17,9,3.6]];
    T.forEach(t=>box(t[2],Math.max(t[4],.3)+.3,t[3],'#e6ebf2',t[0],(t[4]-.15),t[1],{plat:true}));
    T.slice(0,-1).forEach((t,i)=>{
      const n=T[i+1], steps=3;
      for(let s=1;s<=steps;s++){
        const y=t[4]+(n[4]-t[4])*s/(steps+0.4), z=t[1]+(n[1]-t[1])*(s/(steps+1))-2;
        box(2.6,.4,1.4,'#c9cfd8',(i%2?3:-3),y,z,{solid:true,plat:true});
      }
    });
    // the lake — a wide mirror at the top terrace's far side
    box(26,.08,14,'#9fc6d8',0,3.62,-21,{});
    world.solids.push({x1:-13,z1:-28,x2:13,z2:-14,top:6});
    // camp at the base (her quarters): errand spots
    building(-7,19,6,4,2.6,MATS.wallDay,MATS.roof,{door:true,lantern:true,light:true});
    box(1.6,.6,1,'#6e5a3a',-2,.3,20,{solid:true});         // whetstone bench
    box(1.4,.9,1,'#7a6a4a',3,.45,19,{solid:true});          // pack table
    const spots=[[-9,12],[9,13],[-8,3],[8,4],[-7,-6],[7,-5],[-11,17],[11,18]];
    spots.forEach((p,i)=>tree(p[0],p[1],.9+((i*7)%5)*.14));
    mkSnow(350);
  },
  closeScenes:['a5_go'],
  gates:[
    {entry:null, quick:'You sharpen the blade. It was already sharp. You sharpen it anyway.', title:'The Whetstone', pos:[-2,21.2], tag:'busy', avail:()=>true},
    {entry:null, quick:'Repack the bag. Unpack it. Repack it better. \u201cA riddle. A RIDDLE. Like I\u2019m twelve.\u201d', title:'The Pack', pos:[3,20.2], tag:'busy', avail:()=>true},
    {entry:null, quick:'\u201cHe left ME.\u201d You win the argument. The empty yard concedes.', title:'Pace the Yard', pos:[-7,16.2], tag:'busy', avail:()=>true},
    {entry:'a5_msg', title:'The Runner', pos:[0,13],
      avail(){ return world.gates.filter(g=>g.tag==='busy'&&g.done).length>=3; }},
    {entry:'a5_lake', title:'Where the Mountain Sees Itself', pos:[0,-12.5], y:3.6, cine:'lake', avail(){return this._p.done}},
  ]
},

/* ---------- 6 · The frozen Yalu (night, torches) ---------- */
6:{ name:'The Frozen Yalu \u00b7 Night', spawn:[0,26],
  build(){
    sky('#141a2e','#1c2338',16,90);
    lights('#3a4a7a','#1c1a20',.55,'#e8b890',.5,-30,14,-40);
    ground(60,70,'#cfe0ea',0,MATS.ice);
    for(let i=0;i<14;i++){
      box(3+Math.random()*5,.28,.5,'#9fb8c8',-24+Math.random()*48,.14,-28+Math.random()*50,{ry:Math.random()*3});
    }
    box(60,.12,6,'#0a1420',0,.05,-24,{});
    world.solids.push({x1:-30,z1:-27,x2:30,z2:-21,top:3});
    box(60,3,10,'#dfe7f0',0,1.5,-33,{});
    box(2.5,5,2.5,'#4a4438',-8,5.5,-33,{}); lantern(-8,9.2,-32,true);
    tree(6,-33,1.4); tree(11,-32,1.1); tree(-14,-33,1.2);
    box(60,1.4,8,'#e6ebf2',0,.7,32,{solid:true});
    // Kang's column: sledges + captive cages on the ice
    box(4,1.2,2,'#4a3b2c',-8,.6,4,{solid:true});  box(4,1.2,2,'#4a3b2c',8,.6,-2,{solid:true});
    box(3,2,3,'#2c2a26',-8,1,-4,{solid:true});     box(3,2,3,'#2c2a26',8,1,8,{solid:true});
    for(let z=-8;z<=12;z+=5) lantern(0,2.2,z, z===2);
    // escort riders (hostile)
    mkGuard(-4,2,{hp:50,dmg:12,aggro:9});
    mkGuard(5,-6,{hp:50,dmg:12,aggro:9});
    mkGuard(0,12,{hp:50,dmg:12,aggro:8});
    // Batu — passive until the confrontation
    world.L.batuBoss = mkGuard(0,-16,{boss:true,hostile:false,hp:190,dmg:17,speed:3.6,aggro:60}); world.L.batuBoss.charger=true;
    world.L.batuBoss.bar.visible=false;
    mkSnow(600);
  },
  closeScenes:['a6_go'],
  gates:[
    {entry:null, quick:'The chain parts. Jin\u2019s dancers are already there, moving them west along the bank.', title:'Strike the Chains', pos:[-8,-2.2], tag:'c6cage', avail:()=>true},
    {entry:null, quick:'\u201cWalk, don\u2019t run,\u201d you tell them in Korean. \u201cThe ice holds if you walk.\u201d', title:'Strike the Chains', pos:[8,9.8], tag:'c6cage', avail:()=>true},
    {entry:'a6_batu', title:'The Man in Wolf-fur', pos:[0,-13.5],
      avail(){ return world.gates.filter(g=>g.tag==='c6cage'&&g.done).length>=2; }},
  ],
  wave(){ const b=world.L.batuBoss; b.state='chase'; b.stateHome='chase'; b.bar.visible=true; return [b]; }
},
7:{ name:'Liaoyang \u00b7 The Fall', spawn:[-16,18],
  build(){
    sky('#1a0e10','#241114',12,60);
    lights('#7a3428','#170c0a',.6,'#ff9a5a',.75,-10,26,-8);
    ground(56,56,'#2e2126',0);
    const B=[[-10,10,6,6,2.6],[-3,9,5,5,3.1],[3.5,6,6,5,3.5],[9,2,5,6,3.8],[13,-4,6,5,4.2],
             [8,-10,5,5,3.4],[1,-8,6,5,3],[-6,-4,5,6,2.7],[-12,-10,6,5,3.2],[15,-12,5,5,4.6]];
    B.forEach((b,i)=>building(b[0],b[1],b[2],b[3],b[4],MATS.wallNight,MATS.roofNight,{lantern:i%3===0}));
    // fires: glowing braziers scattered (burning city)
    for(let i=0;i<8;i++){ lantern(-18+Math.random()*36,1.2+Math.random()*2,-16+Math.random()*32,true); }
    // the keep (Zhao's post) at the north
    wallRun(-8,-18,8,-18,4,'#4a3a34'); building(0,-18,6,4,5,'#4a3a34','#2a1d1a',{lantern:true,light:true});
    // barricade (Lan) mid-map
    box(6,1.2,1,'#5a4636',-4,.6,6,{solid:true});
    mkGuard(6,10,{hp:50,dmg:12,aggro:8,patrol:[[6,10],[-2,10]]});
    mkGuard(-10,-2,{hp:50,dmg:12,aggro:8});
    mkGuard(12,-8,{hp:55,dmg:13,aggro:9,speed:3});
    mkSnow(300);
  },
  closeScenes:['a7_go'],
  gates:[
    {entry:null, quick:'A family runs past with everything they own in two baskets. The city is ending around them.', title:'The Burning Street', pos:[-8,12], tag:'l7q', avail:()=>true},
    {entry:null, quick:'A merchant bars his shutters, then stops, then unbars them and walks away leaving the door wide open.', title:'The Silk Row', pos:[8,8], tag:'l7q', avail:()=>true},
    {entry:null, quick:'Soldiers feed a bonfire of documents \u2014 eleven years of records, keeping the enemy warm.', title:'The Archive Yard', pos:[-2,-2], tag:'l7q', avail:()=>true},
    {entry:null, quick:'A temple bell, rung by no one \u2014 the rope tied off, tolling the warning to a city already leaving.', title:'The Bell Tower', pos:[13,-2], y:4.4, tag:'l7q', avail:()=>true},
    {entry:'a7_lan', title:'The Barricade', pos:[-4,6.8],
      avail(){ return world.enemies.filter(e=>!e.dummy&&e.hp<=0).length>=1; }},
    {entry:'a7_dance', title:'The Rooftop Road', pos:[10,-14], avail(){ return !!S.flags.zhaoSaved; }},
  ],
  wave(){ const w=[]; [[2,-6],[-4,-8],[6,-12],[-8,-12]].forEach(s=>w.push(mkGuard(s[0],s[1],{hp:48,dmg:12,speed:3,aggro:60}))); return w; }
},

/* ---------- 8 · The mountain pass (ledger convoy) ---------- */
8:{ name:'The Western Hills \u00b7 The Pass', spawn:[0,20],
  build(){
    sky('#141826','#1b2030',12,70);
    lights('#3a4a6a','#14120e',.5,'#c8d4ee',.55,-16,28,-12);
    const T=[[0,18,24,12,0],[0,7,20,10,1.4],[0,-3,18,9,2.8],[0,-12,15,8,4.2]];
    T.forEach(t=>box(t[2],Math.max(t[4],.3)+.3,t[3],'#dfe5ee',t[0],(t[4]-.15),t[1],{plat:true}));
    T.slice(0,-1).forEach((t,i)=>{ const n=T[i+1];
      for(let s2=1;s2<=3;s2++){ const y=t[4]+(n[4]-t[4])*s2/3.4, z=t[1]+(n[1]-t[1])*(s2/4)-2;
        box(2.6,.4,1.4,'#c9cfd8',(i%2?3:-3),y,z,{solid:true,plat:true}); } });
    // the cut below (convoy road) with cart + strongbox
    box(4,1,2,'#4a3b2c',0,4.6,-16,{solid:true}); box(1.4,.9,1,'#6a5a3a',0,5.4,-16,{});
    for(let z=-18;z<=-8;z+=4) lantern(3,5.4,z,true);
    const spots=[[-8,12],[8,13],[-7,3],[7,4],[-6,-6],[6,-5]];
    spots.forEach((p,i)=>tree(p[0],p[1],.9+((i*7)%5)*.14));
    mkGuard(-3,-14,{hp:52,dmg:13,aggro:9}); mkGuard(4,-10,{hp:52,dmg:13,aggro:9});
    mkSnow(700);
  },
  closeScenes:['a8_go'],
  gates:[
    {entry:null, quick:'Wolf-fur riders below, and behind the cart \u2014 a roped line of people, stumbling in the dark.', title:'The Overlook', pos:[0,8], y:1.7, avail:()=>true},
    {entry:'a8_convoy', title:'Lanterns in the Cut', pos:[0,-10.5], y:4.4, avail(){return world.gates[0].done;}},
  ],
  wave(){ const w=[]; [[-4,-14],[5,-12],[0,-18],[-7,-9]].forEach(s=>w.push(mkGuard(s[0],s[1],{hp:52,dmg:13,speed:3,aggro:60}))); return w; }
},

/* ---------- 9 · Shenyang holding yards (night) ---------- */
9:{ name:'Shenyang \u00b7 The Holding Yards', spawn:[0,26],
  build(){
    sky('#0c0f1a','#121628',14,70);
    lights('#2c3760','#100e0c',.45,'#e8b070',.6,10,24,-10);
    ground(40,60,'#232838',0);
    // cage rows
    function cage(x,z){ box(3,2,3,'#241f1a',x,1,z,{solid:true});
      for(let i=0;i<4;i++) box(.12,2.2,.12,'#141210',x-1.4+i*.93,1.1,z+1.55,{}); }
    cage(-8,10); cage(-8,2); cage(-8,-6); cage(8,8); cage(8,0); cage(8,-8);
    for(let z=-12;z<=14;z+=6) lantern(0,2.4,z, z===2||z===-10);
    // the counting house (north)
    wallRun(-10,-20,10,-20,4,'#3a3446'); building(0,-20,8,5,4.4,'#3a3446','#221e2c',{lantern:true,light:true});
    wallRun(-19,-26,19,-26,5,'#2c2a36'); wallRun(-19,20,19,20,5,'#2c2a36');
    mkGuard(0,14,{hp:55,dmg:13,aggro:8,patrol:[[0,14],[0,4]]});
    mkGuard(-10,-2,{hp:55,dmg:13,aggro:8,patrol:[[-10,-2],[-4,-2]]});
    mkGuard(10,-4,{hp:55,dmg:13,aggro:8});
    mkSnow(250);
  },
  closeScenes:['a9_go'],
  gates:[
    {entry:null, quick:'The lock gives. \u201cGo south along the wall,\u201d you whisper in Korean. \u201cDancers will meet you.\u201d', title:'Cage Row', pos:[-8,10.8], tag:'yc', avail:()=>true},
    {entry:null, quick:'An old man grips your wrist: \u201cMy granddaughter \u2014 third cage.\u201d You are already moving.', title:'Cage Row', pos:[8,8.8], tag:'yc', avail:()=>true},
    {entry:null, quick:'The children go over the wall in the dancers\u2019 ribbons, laughing \u2014 laughing \u2014 at the ride.', title:'Cage Row', pos:[-8,-5.2], tag:'yc', avail:()=>true},
    {entry:'a9_kang', title:'The Counting House', pos:[0,-18],
      avail(){ return world.gates.filter(g=>g.tag==='yc'&&g.done).length>=3; }},
    {entry:'a9_out', title:'The Western Gate', pos:[-16,18], avail(){ return this._p && this._p.done; }},
  ],
  wave(){ const w=[]; [[-4,6],[4,4],[0,-4],[-6,-10],[6,-12]].forEach(s=>w.push(mkGuard(s[0],s[1],{hp:55,dmg:13,speed:3.1,aggro:60}))); return w; }
},

/* ---------- 10 · Uiju ford at dawn (the return) ---------- */
10:{ name:'Uiju \u00b7 The Third Crossing', spawn:[0,20],
  build(){
    sky('#3a3f55','#8a7a88',16,90);
    lights('#c8a8b8','#2c2430',.7,'#ffd8a8',.7,30,18,20);
    ground(48,60,'#e8ecf2',0);
    // the ford: frozen river band across the middle
    box(48,.1,10,'#b8d0dc',0,.05,-6,{});
    // village (south, behind spawn)
    building(-12,16,8,5,2.8,MATS.wallDay,MATS.roof,{door:true,lantern:true});
    building(0,18,7,5,2.6,MATS.wallDay,MATS.roof,{door:true,lantern:true,light:true});
    building(11,15,7,5,2.7,MATS.wallDay,MATS.roof,{door:true});
    // father's grave on the north rise
    box(1,1.4,.4,'#8a8d98',6,.7,-18,{solid:true});
    tree(4,-19,1.2); tree(8.5,-18,1);
    // millet stubble
    for(let i=0;i<24;i++){ const m=new THREE.Mesh(new THREE.ConeGeometry(.14,.8,5),mat('#9a8f6a'));
      m.position.set(-14+(i%12)*2.6,.4,8+Math.floor(i/12)*3); world.group.add(m); }
    tree(-16,-14,1.1); tree(16,-15,1.2); tree(-18,8,1);
    mkSnow(500);
  },
  closeScenes:['a10_go'],
  gates:[
    {entry:null, quick:'The village is smaller than memory. All first places are.', title:'The Road Home', pos:[0,14], tag:'l10q', avail:()=>true},
    {entry:'a10_wolf', title:'Riders on the West Wind', pos:[0,-6],
      avail(){ return world.gates[0].done; }},
    {entry:'a10_return', title:'The Village Wakes', pos:[0,16.5], avail(){ return !!S.flags.wolfDown; }},
    {entry:'a10_end', title:'The Grave on the Rise', pos:[6,-16.5],
      avail(){ return world.gates.find(g=>g.entry==='a10_return').done; }},
  ],
  wave(){
    const w=[]; [[-5,-8],[5,-9],[-8,-4],[8,-5]].forEach(s=>w.push(mkGuard(s[0],s[1],{hp:52,dmg:13,speed:3,aggro:60})));
    const boss=mkGuard(0,-12,{boss:true,hp:230,dmg:18,speed:3.2,aggro:60}); boss.wolf=true; boss.state='wguard'; boss.wt=2; boss.stateHome='chase'; w.push(boss);
    return w; }
},

/* ---------- 11 · The refugee waystation (M7, dusk into night) ---------- */
11:{ name:'The Waystation · A Country the Size of a Ruin', spawn:[0,22],
  build(){
    sky('#6a6f82','#8a8496',16,80);
    lights('#c8cede','#5a5448',.7,'#e8c088',.7,-8,20,10);
    ground(56,60,'#d8dde6',0);
    // the ruined Ming relay post: broken walls, a collapsed watchtower
    wallRun(-14,-16,-4,-16,3.2,'#6a5f52'); wallRun(4,-16,14,-16,3.2,'#6a5f52');   // gapped north wall
    wallRun(-14,-16,-14,-4,3.2,'#6a5f52'); wallRun(14,-16,14,-2,3.2,'#6a5f52');
    box(3,5,3,'#5a4f42',-12,2.5,-14,{solid:true});                                  // half-fallen tower
    box(2.6,2.2,2.6,'#4a4136',-12,5.6,-14,{solid:true,ry:.4});                       // its leaning top
    building(0,-13,8,5,3,'#7a6f5e','#4a4136',{door:true,lantern:true,light:true});   // the old command hall (the long table)
    // the tents of the freed — many, scattered, warm-lit
    const tents=[[-9,4],[-6,8],[-2,6],[3,9],[7,5],[10,10],[-10,12],[6,14],[0,2],[-5,0],[9,-2],[-8,-6]];
    tents.forEach((t,i)=>{ box(2,1.6,2,i%3? '#8a7a5e':'#7a6a52', t[0],.8,t[1],{solid:true,ry:i}); 
      if(i%2===0) lantern(t[0],1.9,t[1],true); });
    // cook-fires (warm point lights)
    lantern(-4,.6,10,true); lantern(5,.6,3,true); lantern(-8,.6,6,true);
    // the three roads out (marked by gateposts): west gully, mill road, east track
    box(.5,3,.5,'#5a4f42',-16,1.5,2,{}); box(.5,3,.5,'#5a4f42',-16,1.5,5,{});        // west gully mouth
    box(.5,3,.5,'#5a4f42',16,1.5,-4,{}); box(.5,3,.5,'#5a4f42',16,1.5,-1,{});         // mill road (near riders)
    box(.5,3,.5,'#5a4f42',2,1.5,20,{}); box(.5,3,.5,'#5a4f42',5,1.5,20,{});           // east track (south, open)
    tree(-18,14,1.2); tree(18,12,1.1); tree(-17,-2,1); tree(17,16,1.2);
    mkSnow(420);
  },
  closeScenes:['a7w_go'],
  gates:[
    // the arrival gate opens the camp; then three "walk among them" quiet beats before Namgil
    {entry:null, quick:'A woman mends a Qing-issue coat into a child\u2019s. The thread is army-grey. The child is warm.', title:'Among the Tents', pos:[-4,9], tag:'m7q', avail:()=>true},
    {entry:null, quick:'Two men argue over a map by firelight, then laugh, then argue again. Your camp. Your argument, soon.', title:'The Cook-fires', pos:[5,4], tag:'m7q', avail:()=>true},
    {entry:'a7w_namgil', title:'The Long Table', pos:[0,-9],
      avail(){ return world.gates.filter(g=>g.tag==='m7q'&&g.done).length>=2; }},
    {entry:'a7w_song', title:'The Women\u2019s Fire', pos:[-11,10], avail(){ return this._p && this._p.done; }},
    {entry:'a7w_patrol', title:'The North Track', pos:[0,-15], avail(){ return world.gates.find(g=>g.entry==='a7w_song')&&world.gates.find(g=>g.entry==='a7w_song').done; }},
    {entry:'a7w_ohan', title:'The East Track, at Dawn', pos:[4,18], avail(){ return !!(S.flags&&S.flags.m7order); }},
  ],
  // the defense: riders come down the north track; holding two roads means fighting here
  wave(){ const w=[]; [[-3,-10],[3,-11],[-7,-8],[6,-9],[0,-14]].forEach(s=>w.push(mkGuard(s[0],s[1],{hp:50,dmg:13,speed:3.1,aggro:60}))); return w; }
},

12:{ name:'The Joseon Bank \u00b7 The Border Shrine', spawn:[0,24],
  build(){
    sky('#c9d2de','#dde4ec',20,90);
    lights('#eef2f8','#8a8478',.95,'#fff4e2',.6,14,26,12);
    // terraced mountain path rising north
    const T=[[0,22,26,10,0],[0,12,22,9,1.6],[0,3,19,8,3.2],[0,-6,16,8,4.8],[0,-15,13,8,6.4]];
    T.forEach(t=>box(t[2],Math.max(t[4],.3)+.3,t[3],'#e9edf3',t[0],(t[4]-.15),t[1],{plat:true}));
    T.slice(0,-1).forEach((t,i)=>{ const n=T[i+1];
      for(let s2=1;s2<=3;s2++){ const y=t[4]+(n[4]-t[4])*s2/3.4, z=t[1]+(n[1]-t[1])*(s2/4)-1.6;
        box(2.4,.4,1.3,'#cfd5dd',(i%2?2.5:-2.5),y,z,{solid:true,plat:true}); } });
    // the shrine at the top: hall + inner hall
    building(0,-16,8,5,3.4,'#8a6a52','#5a3d2e',{door:true,lantern:true,light:true});
    building(-6,-14,4,3,2.6,'#8a6a52','#5a3d2e',{door:true});
    // prayer-ribbon poles along the path (thin posts with small colored flags)
    const ribbonCols=['#c85a4a','#5a7ac8','#c8b44a','#6ac87a','#c88ab0'];
    for(let i=0;i<8;i++){
      const z=16-i*4, x=(i%2? 5.5:-5.5);
      box(.14,3.2,.14,'#6a5a48',x,1.6+(T[Math.min(4,Math.floor(i/2))][4]||0),z,{});
      box(.7,.4,.04,ribbonCols[i%5],x+.4,2.6+(T[Math.min(4,Math.floor(i/2))][4]||0),z,{ry:.3});
    }
    // the seonangdang cairn at the first terrace edge
    box(1.2,.4,1.2,'#9a9da8',-4,.2,18,{solid:true}); box(.9,.35,.9,'#8a8d98',-4,.55,18,{});
    box(.6,.3,.6,'#7a7d88',-4,.85,18,{}); box(.35,.25,.35,'#6a6d78',-4,1.1,18,{});
    // the village below (south of spawn): hanok, the well, the persimmon tree
    building(-8,30,6,4,2.6,'#b8a88e','#6a4a38',{door:true});
    building(2,32,6,4,2.5,'#b8a88e','#6a4a38',{door:true,lantern:true});
    building(11,29,5,4,2.7,'#b8a88e','#6a4a38',{door:true});
    box(1.6,.9,1.6,'#8a8d98',-2,.45,27,{solid:true});                 // the well
    tree(6,26,1.3); tree(-13,27,1.1);                                  // persimmon + pine
    world.solids.push({x1:-30,z1:34,x2:30,z2:36,top:4});               // village edge
    tree(-9,10,1); tree(9,6,1.1); tree(-8,-2,1); tree(8,-8,1.2);
    mkSnow(650);
  },
  closeScenes:['a8j_go'],
  gates:[
    {entry:null, quick:'Your hand places a stone on the cairn before your mind remembers the custom. Ten years, and the hand remembered.', title:'The Seonangdang', pos:[-4,19.2], tag:'m8q', avail:()=>true},
    {entry:null, quick:'Prayer ribbons move in the wind. Somewhere below, a temple bell \u2014 one note, held, let go.', title:'The Ribbon Poles', pos:[5.5,14], y:1.6, tag:'m8q', avail:()=>true},
    {entry:'a8j_soldier', title:'The Man at the First Gate', pos:[0,10], y:1.6,
      avail(){ return world.gates.filter(g=>g.tag==='m8q'&&g.done).length>=2; }},
    {entry:'a8j_ming', title:'The Outer Hall \u00b7 Colonel Wei', pos:[-6,-12.5], y:6.4, avail(){ return this._p && this._p.done; }},
    {entry:'a8j_court', title:'The Inner Hall \u00b7 Inspector Yun', pos:[0,-14], y:6.4, avail(){ return this._p && this._p.done; }},
    {entry:'a8j_okhui', title:'The Village Below \u00b7 The Well at Dusk', pos:[-2,27.5], avail(){ return this._p && this._p.done; }},
    {entry:'a8j_leave', title:'The Ford Below the Village', pos:[0,33], avail(){ return !!(S.flags&&S.flags.m8raid); }},
  ],
  wave(){ if(S&&S.flags)S.flags.m8raid=true;
    const w=[]; [[-6,29],[6,31],[0,25],[-10,26]].forEach(s=>w.push(mkGuard(s[0],s[1],{hp:48,dmg:12,speed:3,aggro:60}))); return w; }
},
13:{ name:'The Last Road \u00b7 The North Bridge', spawn:[0,26],
  build(){
    sky('#8a8496','#a8a2b0',18,88);
    lights('#d8dce6','#6a6458',.8,'#f0e2c8',.6,-10,24,14);
    ground(50,64,'#e2e6ee',0);
    // the road: a long trodden strip south to north
    box(7,.06,56,'#cdd3dc',0,.05,0,{});
    // the column's wagons and belongings along the road (a village that learned to walk)
    const carts=[[-3,20],[3,16],[-3,10],[3,5],[-3,0],[3,-4]];
    carts.forEach((c,i)=>{ box(2.6,1,1.6,'#6a5a42',c[0],.5,c[1],{solid:true,ry:i*.3});
      box(.3,.9,.3,'#4a3f30',c[0]-1.1,.45,c[1]+.9,{}); box(.3,.9,.3,'#4a3f30',c[0]+1.1,.45,c[1]+.9,{}); });
    for(let i=0;i<7;i++) lantern(-4+(i%2)*8, 1.3, 22-i*6, i%2===0);
    // the gorge across the north, with the single stone bridge
    box(50,.1,9,'#3a4150',0,-.4,-14,{});                       // the void
    world.solids.push({x1:-25,z1:-19,x2:-3.2,z2:-9,top:-2});    // gorge edges (fall)
    world.solids.push({x1:3.2,z1:-19,x2:25,z2:-9,top:-2});
    box(6,.7,11,'#9aa0ac',0,.3,-14,{solid:true,plat:true});     // the bridge deck
    box(.4,1.1,11,'#8a9098',-2.9,1,-14,{}); box(.4,1.1,11,'#8a9098',2.9,1,-14,{}); // parapets
    // far bank + the road on
    box(50,1.2,10,'#dde2ea',0,.6,-22,{solid:true});
    tree(-12,-24,1.2); tree(11,-25,1.1);
    tree(-14,12,1.1); tree(13,8,1.2); tree(-15,-2,1); tree(15,18,1.1);
    mkSnow(600);
  },
  closeScenes:['a10r_go'],
  gates:[
    {entry:null, quick:'A grandmother carries nothing but a broken loom-shuttle. It was her mother\u2019s. It weighs nothing. It weighs everything.', title:'The Column', pos:[-3,19], tag:'m10q', avail:()=>true},
    {entry:null, quick:'Two of Zhao\u2019s old soldiers argue about soup. They have been arguing about soup since Liaoyang. It is the sound of people who expect a tomorrow.', title:'The Cook-cart', pos:[3,14], tag:'m10q', avail:()=>true},
    {entry:'a10r_child', title:'The Boy Who Walks Beside You', pos:[0,8],
      avail(){ return world.gates.filter(g=>g.tag==='m10q'&&g.done).length>=2; }},
    {entry:'a10r_bridge', title:'The North Bridge', pos:[0,-9], avail(){ return this._p && this._p.done; }},
    {entry:'a10r_ohan', title:'The Abandoned Scout Post', pos:[-9,-22], y:1.2,
      avail(){ return !!(S.flags&&S.flags.m10bridge); }},
  ],
  wave(){ if(S&&S.flags)S.flags.m10bridge=true;
    const w=[]; [[-4,-6],[4,-7],[0,-3],[-6,-2],[6,-1]].forEach(s=>w.push(mkGuard(s[0],s[1],{hp:54,dmg:14,speed:3.1,aggro:60}))); return w; }
},
/* ---------- 14 · The hill palace (The Child Between Crowns) ---------- */
14:{ name:'The Hill Palace \u00b7 Between Crowns', spawn:[0,24],
  build(){
    sky('#141a2a','#1c2236',14,80);
    lights('#3a4668','#12100e',.5,'#ffd8a0',.65,-12,26,-8);
    ground(52,58,'#dfe4ee',0);
    box(40,.9,12,'#e6eaf2',0,.45,4,{solid:true,plat:true});
    box(34,2.1,12,'#e2e6ef',0,1.05,-8,{solid:true,plat:true});
    box(28,3.3,12,'#dde2ec',0,1.65,-19,{solid:true,plat:true});
    for(let s2=0;s2<3;s2++){ box(3,.4+s2*.3,1.2,'#c8cfda',0,.2+s2*.3,10-s2*1.2,{solid:true,plat:true}); }
    for(let s2=0;s2<3;s2++){ box(3,1.2+s2*.35,1.2,'#c8cfda',0,.6+s2*.35,-1.5-s2*1.1,{solid:true,plat:true}); }
    for(let s2=0;s2<3;s2++){ box(3,2.3+s2*.35,1.2,'#c8cfda',0,1.15+s2*.35,-13-s2*1.1,{solid:true,plat:true}); }
    building(0,-21,10,6,4,'#8a3a3a','#3a2430',{lantern:true,light:true});
    building(-9,-19,4,4,3,'#7a4a44','#3a2430',{lantern:true});
    building(9,-19,4,4,3,'#7a4a44','#3a2430',{});
    wallRun(-17,-2,-17,10,2.6,'#9a8a7a'); wallRun(17,-2,17,10,2.6,'#9a8a7a');
    wallRun(-20,14,-4,14,3,'#8a7a6a'); wallRun(4,14,20,14,3,'#8a7a6a');
    for(let i=0;i<10;i++) lantern(-12+((i*7)%25), .9+(i%3), 12-i*3.4, i%2===0);
    box(2.6,3.2,.6,'#5a5248',16,1.6,-14,{solid:true}); lantern(14.5,1.4,-14,true);
    box(3,.4,3,'#6a5a50',-14,3.4,-6,{solid:true,plat:true});
    box(3,.4,3,'#6a5a50',-14,4.2,-13,{solid:true,plat:true});
    tree(-19,20,1.2); tree(19,19,1.1); tree(-20,-14,1);
    mkGuard(-6,2,{hp:52,dmg:13,aggro:7,patrol:[[-6,2],[6,2]]});
    mkGuard(8,-8,{hp:52,dmg:13,aggro:7,patrol:[[8,-8],[-2,-8]]});
    mkSnow(500);
  },
  closeScenes:['a8c_go'],
  gates:[
    {entry:null, quick:'A servant crosses the courtyard hugging the colonnade, eyes down, steps counted. Everyone here has learned to be small.', title:'The Lower Court', pos:[-8,8], tag:'m8cq', avail:()=>true},
    {entry:null, quick:'Two guards watch the ministers\u2019 wing, not the walls. In this palace the enemy is assumed to be inside.', title:'The Middle Terrace', pos:[6,-6], y:2.1, tag:'m8cq', avail:()=>true},
    {entry:'a8c_court', title:'The Roofline of the Great Hall', pos:[0,-17], y:3.3,
      avail(){ return world.gates.filter(g=>g.tag==='m8cq'&&g.done).length>=2; }},
    {entry:'a8c_succ', title:'The Quiet House in the Valley', pos:[16,20],
      avail(){ return !!(S.flags&&S.flags.m8crescue); }},
  ],
  wave(){ if(S&&S.flags)S.flags.m8crescue=true;
    const w=[]; [[-4,-16],[4,-15],[0,-10],[8,-13],[-8,-12]].forEach(s=>w.push(mkGuard(s[0],s[1],{hp:52,dmg:13,speed:3.2,aggro:60}))); return w; }
},
};/* gate availability plumbing: give each gate a reference to its predecessor */
function loadLevel(n){
  curLevel=n; baseWorld(); initMats();
  const L=LEVELS[n];
  L.build();
  // clone gate defs into live gate objects
  world.gates = L.gates.map(g=>Object.assign(Object.create(g), {done:false}));
  world.gates.forEach((g,i)=>{ g._p = world.gates[i-1]||{done:true}; mkGate(g); });
  world.closeScenes = L.closeScenes||[];
  world.L.spawnWave = L.wave ? L.wave.bind(L) : null;
  P.pos.set(L.spawn[0], groundAt(L.spawn[0],L.spawn[1],50)+.02, L.spawn[1]);
  P.vy=0; P.safe.copy(P.pos); P.hp=P.maxhp; P.dead=0; if(typeof hpUI==='function')hpUI();
  setWeapon(S.flags.mombow?'The Winter Bow':(S.flags.trained?'Zhao Steel':'Fists \u0026 Bow'));
  SK.max[3] = (n>=7)?28:20;   /* the Dance costs more focus in the late war */
  $('chapname').textContent = L.name;
  updateObjective();
}
function updateObjective(){
  if(!world){ $('objtxt').textContent='…'; return; }
  const av = world.gates.filter(g=>!g.done && g.avail());
  $('objtxt').textContent = av.length? av.map(g=>g.title).join(' · ') : 'Follow the light';
}

/* ==================================================================
   PLAYER PHYSICS & CAMERA
   ================================================================== */
const P={ pos:new THREE.Vector3(0,0,10), vy:0, yaw:0, grounded:true, safe:new THREE.Vector3(), gateTimer:0 };
const CAM={ yaw:Math.PI, pitch:.32, dist:5.6 };
function groundAt(x,z,feetY){
  let g=-Infinity;
  for(const p of world.plats){ if(x>=p.x1&&x<=p.x2&&z>=p.z1&&z<=p.z2&&p.y<=feetY+.6&&p.y>g) g=p.y; }
  return g;
}
function blocked(x,z,feetY){
  for(const s of world.solids){
    if(x>=s.x1-.3&&x<=s.x2+.3&&z>=s.z1-.3&&z<=s.z2+.3&&feetY<s.top-.6) return true;
  }
  return false;
}
function tickPlayer(dt, mv, jump){
  const sp=6;
  if(mv.lengthSq()>1) mv.normalize();
  const dx=(mv.x*Math.cos(CAM.yaw)-mv.y*Math.sin(CAM.yaw))*sp*dt;
  const dz=(mv.x*Math.sin(CAM.yaw)+mv.y*Math.cos(CAM.yaw))*sp*dt;
  if(dx&&!blocked(P.pos.x+dx,P.pos.z,P.pos.y)) P.pos.x+=dx;
  if(dz&&!blocked(P.pos.x,P.pos.z+dz,P.pos.y)) P.pos.z+=dz;
  const g=groundAt(P.pos.x,P.pos.z,P.pos.y);
  if(jump&&P.grounded){ P.vy=7.4; P.grounded=false; }
  P.vy-=22*dt; P.pos.y+=P.vy*dt;
  if(g>-Infinity && P.pos.y<=g){ P.pos.y=g; P.vy=0; P.grounded=true; }
  else P.grounded=false;
  if(P.grounded) P.safe.copy(P.pos);
  if(P.pos.y<-14){ P.pos.copy(P.safe); P.vy=0; }
  // facing + articulated animation
  const spd=Math.hypot(dx,dz)/(sp*dt||1);
  if(dx||dz){ const t=Math.atan2(dx,dz); P.yaw+=(((t-P.yaw+Math.PI*3)%(Math.PI*2))-Math.PI)*Math.min(1,dt*12); }
  if(!P.wasGrounded && P.grounded) ANIM.land=.18;
  P.wasGrounded=P.grounded;
  animPlayer(dt, spd, P.grounded, !P.grounded);
  player.position.set(P.pos.x,P.pos.y,P.pos.z); player.rotation.y=P.yaw;
}
function tickCamera(dt, look){
  CAM.yaw-=look.x*2.4*dt; CAM.pitch=Math.max(-.1,Math.min(1.1,CAM.pitch+look.y*1.8*dt));
  const d=CAM.dist, cy=Math.cos(CAM.pitch), tgt=new THREE.Vector3(P.pos.x,P.pos.y+1.4,P.pos.z);
  camera.position.set(tgt.x+Math.sin(CAM.yaw)*d*cy, tgt.y+Math.sin(CAM.pitch)*d+.4, tgt.z+Math.cos(CAM.yaw)*d*cy);
  camera.lookAt(tgt);
}
/* gates proximity */
function tickGates(dt, wantEnter){
  let near=null;
  for(const g of world.gates){
    const av=!g.done&&g.avail();
    if(g.mesh) g.mesh.visible=av;
    if(!av) continue;
    g.beamM.opacity=.18+Math.sin(clock.elapsedTime*2.2)*.07;
    g.mesh.rotation.y+=dt*.4;
    const d=Math.hypot(P.pos.x-g.mesh.position.x, P.pos.z-g.mesh.position.z);
    const dy=Math.abs(P.pos.y-g.mesh.position.y);
    if(d<1.5&&dy<1.6) near=g;
  }
  const pr=$('prompt');
  if(near && !overlayOpen){
    const ok=meets(near.req);
    pr.innerHTML = ok
      ? `<b>${near.title}</b><span class="req ok">step in · or press A</span>`
      : `<b>${near.title}</b><span class="req">${reqLabel(near.req)}</span>`;
    pr.classList.add('on');
    if(ok){ P.gateTimer+=dt; if(wantEnter||P.gateTimer>.9){ P.gateTimer=0; openGate(near); } }
    else P.gateTimer=0;
  } else { pr.classList.remove('on'); P.gateTimer=0; }
}
function openGate(g){
  if(g.quick){ subtitle(g.quick); if(g.fx)g.fx(); g.done=true; if(g.onDone)g.onDone(); updateObjective(); return; }
  openedGate=g; if(g.fx)g.fx(); if(g.tag==='route') world.L.route=true;
  if(g.cine && !g._cined){ g._cined=true; go('CINE:'+g.cine+':'+g.entry); return; }
  go(g.entry);
}

/* ==================================================================
   COMBAT — Jade-Empire-style real-time melee
   ================================================================== */
P.hp=100; P.maxhp=100; P.iframes=0; P.atkCd=0; P.dodgeCd=0; P.lastHurt=-99; P.dead=0;
const SK={cd:[0,0,0,0], max:[3,2.5,6,20], ult:0};   // dash, bow, throw, dance
function hpUI(){ $('hpfill').style.width=Math.max(0,P.hp/P.maxhp*100)+'%'; }
function updateCds(){
  for(let i=0;i<4;i++){
    const el=$('cd'+(i+1)); if(!el)continue;
    // ④ ult needs the dance; ① dash needs training
    if(i===3 && !S.flags.dance){ el.textContent='4'; el.className='cd locked'; continue; }
    if(i===0 && !S.flags.trained){ el.textContent='1'; el.className='cd locked'; continue; }
    if(i===2 && !S.flags.sk3){ el.textContent='3'; el.className='cd locked'; continue; }
    if(!S.flags.trained && (i===1||i===2)){                 // bow + throw available early
      if(SK.cd[i]>0){ el.textContent=Math.ceil(SK.cd[i]); el.className='cd cool'; }
      else { el.textContent=(i+1); el.className='cd ready'; }
      continue;
    }
    if(!S.flags.trained){ el.textContent=(i+1); el.className='cd locked'; continue; }
    if(SK.cd[i]>0){ el.textContent=Math.ceil(SK.cd[i]); el.className='cd cool'; }
    else { el.textContent=(i+1); el.className='cd ready'; }
  }
}
function hurtPlayer(dmg,fromX,fromZ){
  if(P.iframes>0||P.dead)return;
  P.hp-=dmg; P.lastHurt=clock.elapsedTime; hpUI();
  const f=$('dmgflash'); f.classList.remove('hit'); void f.offsetWidth; f.classList.add('hit');
  const kx=P.pos.x-fromX, kz=P.pos.z-fromZ, m=Math.hypot(kx,kz)||1;
  if(!blocked(P.pos.x+kx/m*.7,P.pos.z,P.pos.y))P.pos.x+=kx/m*.7;
  if(!blocked(P.pos.x,P.pos.z+kz/m*.7,P.pos.y))P.pos.z+=kz/m*.7;
  if(P.hp<=0){ P.dead=1.6; }
}
function mkEnemyBar(){
  const c=document.createElement('canvas'); c.width=128; c.height=16;
  const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthTest:false}));
  sp.scale.set(1.5,.18,1); sp.userData.cv=c; return sp;
}
function drawBar(sp,frac){
  const x=sp.userData.cv.getContext('2d');
  x.clearRect(0,0,128,16); x.fillStyle='rgba(10,12,20,.8)'; x.fillRect(0,0,128,16);
  x.fillStyle=frac>.4?'#c19a3f':'#b4372a'; x.fillRect(2,2,124*Math.max(0,frac),12);
  sp.material.map.needsUpdate=true;
}
function mkGuard(x,z,opt){
  opt=opt||{};
  const g=new THREE.Group();
  const body=new THREE.Group(); body.position.y=.98; g.add(body);
  const thighL=limb(.44,.1,.085,'#2a2725',-.12,-.04,0), thighR=limb(.44,.1,.085,'#2a2725',.12,-.04,0);
  const kneeL=limb(.44,.08,.065,'#211e1c',0,-.44,0),  kneeR=limb(.44,.08,.065,'#211e1c',0,-.44,0);
  thighL.add(kneeL); thighR.add(kneeR); body.add(thighL,thighR);
  const tunic=new THREE.Mesh(new THREE.CylinderGeometry(.3,.42,.7,10), mat(opt.boss?'#241f1c':'#33302e'));
  tunic.position.y=.34; body.add(tunic);
  if(opt.boss){ const fur=new THREE.Mesh(new THREE.TorusGeometry(.36,.13,8,16), mat('#4a3f33'));
    fur.rotation.x=Math.PI/2; fur.position.y=.66; body.add(fur); }
  const armPivot=limb(.62,.075,.06,'#2a2725',.34,.6,0); body.add(armPivot);
  const offArm=limb(.58,.075,.06,'#2a2725',-.34,.6,0); offArm.rotation.z=.25; body.add(offArm);
  const sabre=new THREE.Mesh(new THREE.BoxGeometry(.05,.9,.1), mat('#9aa4ad'));
  sabre.position.y=-.95; armPivot.add(sabre);
  const headG=new THREE.Group(); headG.position.y=.86; body.add(headG);
  const head=new THREE.Mesh(new THREE.SphereGeometry(.22,10,10), mat('#c9a684'));
  head.position.y=.14; headG.add(head);
  const hat=new THREE.Mesh(new THREE.ConeGeometry(.28,.3,8), mat('#17120e'));
  hat.position.y=.34; headG.add(hat);
  if(opt.boss) body.scale.set(1.15,1.12,1.15);
  g.position.set(x, groundAt(x,z,50), z);
  const bar=mkEnemyBar(); bar.position.y=2.25; g.add(bar);
  world.group.add(g);
  const e={grp:g, body, arm:armPivot, sabre, thighL,thighR,kneeL,kneeR, phase:Math.random()*6,
    hp:opt.hp||40, max:opt.hp||40, dmg:opt.dmg||10, speed:opt.speed||2.6,
    aggro:opt.aggro||10, state:opt.dummy?'dummy':(opt.hostile===false?'passive':'idle'),
    t:0, bar, boss:!!opt.boss, dummy:!!opt.dummy, home:[x,z], patrol:opt.patrol||null, pi:0};
  drawBar(bar,1); world.enemies.push(e);
  return e;
}
function guardLegs(e,dt,moving){
  if(moving){ e.phase+=dt*e.speed*2.6;
    e.thighL.rotation.x=Math.sin(e.phase)*.6; e.thighR.rotation.x=Math.sin(e.phase+Math.PI)*.6;
    e.kneeL.rotation.x=Math.max(0,-Math.sin(e.phase-.5))*.9;
    e.kneeR.rotation.x=Math.max(0,-Math.sin(e.phase+Math.PI-.5))*.9;
    e.body.position.y=.98+Math.abs(Math.sin(e.phase))*.04;
  } else { e.thighL.rotation.x*=.8; e.thighR.rotation.x*=.8; e.kneeL.rotation.x*=.8; e.kneeR.rotation.x*=.8; }
}
function hitEnemies(range,arc,dmg,knock,stun){
  if(typeof vfxSlash==='function'){ const fx=Math.sin(P.yaw)*range*.6, fz=Math.cos(P.yaw)*range*.6; vfxSlash(P.pos.x+fx,P.pos.y+1,P.pos.z+fz); }
  let hit=0;
  for(const e of world.enemies){
    if(e.hp<=0||e.state==='passive')continue;
    const dx=e.grp.position.x-P.pos.x, dz=e.grp.position.z-P.pos.z, d=Math.hypot(dx,dz);
    if(d>range)continue;
    const a=Math.atan2(dx,dz), diff=Math.abs(((a-P.yaw+Math.PI*3)%(Math.PI*2))-Math.PI);
    if(diff>arc)continue;
    let mod=1;
    if(e.wolf){ if(e.state==='wguard') mod=.1; else if(e.state==='wopen') mod=2; }
    if(e.state==='bslide') mod=2;
    e.hp-=Math.round(dmg*mod); hit++;
    drawBar(e.bar, e.hp/e.max);
    if(!e.dummy && !(e.wolf&&e.state==='wguard')){ e.state='stagger'; e.t=stun; }
    const m=d||1; e.grp.position.x+=dx/m*knock; e.grp.position.z+=dz/m*knock;
    if(e.hp<=0){ e.state='dead'; e.t=1.2; if(!e.dummy&&!e.boss){ P.hp=Math.min(P.maxhp,P.hp+(curLevel>=7?6:12)); hpUI(); } }
  }
  return hit;
}
function tickEnemies(dt){
  for(const e of world.enemies){
    const g=e.grp;
    if(e.state==='dead'){ e.t-=dt; g.rotation.x=Math.min(Math.PI/2,g.rotation.x+dt*4);
      if(e.t<=0){ if(e.dummy){ e.hp=e.max; drawBar(e.bar,1); e.state='dummy'; g.rotation.x=0; } else g.visible=false; }
      continue; }
    if(e.state==='dummy'||e.state==='passive'){ continue; }
    const dx=P.pos.x-g.position.x, dz=P.pos.z-g.position.z, d=Math.hypot(dx,dz);
    e.bar.visible = d<14;
    if(e.state==='stagger'){ e.t-=dt; if(e.t<=0)e.state=(e.wolf?'wguard':'chase'); if(e.wolf&&e.state==='wguard')e.wt=3; continue; }
    /* ---- OHAN (wolf): guard -> flurry -> spent ---- */
    if(e.state==='wguard'){
      g.rotation.y=Math.atan2(dx,dz); e.arm.rotation.x=-1.5; guardLegs(e,dt,false);
      if(!e._tg1){ e._tg1=1; subtitle('He guards \u2014 your blows glance off him. Survive the flurry; strike when he is spent.',3200); }
      e.wt-=dt;
      if(e.wt<=0){ e.state='chase'; e.wolfCombo=3; }
      continue; }
    if(e.state==='wopen'){
      e.arm.rotation.x*=.8; guardLegs(e,dt,false);
      if(!e._tg2){ e._tg2=1; subtitle('He is spent \u2014 NOW.',1600); }
      e.t-=dt; if(e.t<=0){ e.state='wguard'; e.wt=3; }
      continue; }
    /* ---- BATU (charger): windup -> committed line -> slide ---- */
    if(e.state==='bwind'){
      e.t-=dt; e.arm.rotation.x=-1.9; g.rotation.y=Math.atan2(e.cdx,e.cdz);
      if(e.t<=0){ e.state='bcharge'; e.t=.8; }
      continue; }
    if(e.state==='bcharge'){
      e.t-=dt;
      const nx=g.position.x+e.cdx*9*dt, nz=g.position.z+e.cdz*9*dt;
      if(!blocked(nx,g.position.z,g.position.y))g.position.x=nx;
      if(!blocked(g.position.x,nz,g.position.y))g.position.z=nz;
      guardLegs(e,dt,true);
      if(!e._chit && Math.hypot(P.pos.x-g.position.x,P.pos.z-g.position.z)<1.4){ e._chit=1; hurtPlayer(e.dmg+6, g.position.x, g.position.z); }
      if(e.t<=0){ e.state='bslide'; e.t=1.4; }
      continue; }
    if(e.state==='bslide'){
      e.t-=dt; e.arm.rotation.x*=.85;
      const nx=g.position.x+e.cdx*2.2*dt, nz=g.position.z+e.cdz*2.2*dt;
      if(!blocked(nx,g.position.z,g.position.y))g.position.x=nx;
      if(!blocked(g.position.x,nz,g.position.y))g.position.z=nz;
      if(e.t<=0){ e.state='chase'; e.bcd=5; }
      continue; }
    if(e.state==='idle'){
      if(d<e.aggro && !P.dead) e.state='chase';
      else if(e.patrol){ const p=e.patrol[e.pi], px=p[0]-g.position.x, pz=p[1]-g.position.z, pd=Math.hypot(px,pz);
        if(pd<.4){ e.pi=(e.pi+1)%e.patrol.length; guardLegs(e,dt,false); }
        else { g.position.x+=px/pd*1.2*dt; g.position.z+=pz/pd*1.2*dt; g.rotation.y=Math.atan2(px,pz); guardLegs(e,dt,true); } }
      else guardLegs(e,dt,false);
      continue; }
    if(e.state==='chase'){
      if(P.dead){ e.state='idle'; continue; }
      if(e.charger){ e.bcd=(e.bcd||0)-dt;
        if(e.bcd<=0 && d>4 && d<11){
          if(!e._tg1){ e._tg1=1; subtitle('He charges in straight lines. Step aside \u2014 then punish the slide.',2800); }
          e.state='bwind'; e.t=.8; e._chit=0; e.cdx=dx/d; e.cdz=dz/d; continue; } }
      g.rotation.y=Math.atan2(dx,dz);
      if(d>1.8){ const nx=g.position.x+dx/d*e.speed*dt, nz=g.position.z+dz/d*e.speed*dt;
        if(!blocked(nx,g.position.z,g.position.y))g.position.x=nx;
        if(!blocked(g.position.x,nz,g.position.y))g.position.z=nz;
        g.position.y=Math.max(g.position.y-6*dt, groundAt(g.position.x,g.position.z,g.position.y+1));
        guardLegs(e,dt,true);
      } else { e.state='windup'; e.t=e.boss?.42:.55; guardLegs(e,dt,false); }
      continue; }
    if(e.state==='windup'){
      e.t-=dt; e.arm.rotation.x=-(1-Math.max(0,e.t)/.55)*2.1;
      if(e.t<=0){ e.state='strike'; e.t=.2;
        if(d<2.3 && Math.abs(P.pos.y-g.position.y)<1.5) hurtPlayer(e.dmg, g.position.x, g.position.z); }
      continue; }
    if(e.state==='strike'){ e.t-=dt; e.arm.rotation.x=Math.min(1.1, e.arm.rotation.x+dt*14);
      if(e.t<=0){ e.state='cool'; e.t=e.boss?.7:1.15; } continue; }
    if(e.state==='cool'){ e.arm.rotation.x*=.88; }
    if(e.state==='cool'){ e.t-=dt;
      if(e.t<=0){
        if(e.wolf){
          if(e.wolfCombo>0){ e.wolfCombo--; e.state='windup'; e.t=.3; }
          else { e.state='wopen'; e.t=1.8; }
        } else e.state='chase';
      } continue; }
  }
  if(!P.dead && P.hp<P.maxhp && clock.elapsedTime-P.lastHurt>5){ P.hp=Math.min(P.maxhp,P.hp+2.2*dt); hpUI(); }
  if(P.dead){ P.dead-=dt;
    if(P.dead<=0){ P.hp=Math.round(P.maxhp*.6); hpUI(); P.pos.copy(P.safe); P.iframes=1.5;
      for(const e of world.enemies){ if(!e.dummy&&e.hp>0){ e.grp.position.set(e.home[0],groundAt(e.home[0],e.home[1],50),e.home[1]); e.state=e.stateHome||'idle'; }
        if(e.boss&&e.hp<e.max){ e.hp=e.max; drawBar(e.bar,1);} } }
  }
  if(P.iframes>0)P.iframes-=dt;
  if(world.L.wave){
    const w=world.L.wave;
    if(w.ids.every(e=>e.hp<=0)){
      world.L.wave=null;
      setTimeout(()=>go(w.next), 800);
    }
  }
}
function bowShot(){
  const mult=1;
  let best=null,bd=13;
  for(const en of world.enemies){
    if(en.hp<=0||en.state==='passive')continue;
    const dx=en.grp.position.x-P.pos.x, dz=en.grp.position.z-P.pos.z, d=Math.hypot(dx,dz);
    if(d>13)continue;
    const a=Math.atan2(dx,dz), diff=Math.abs(((a-P.yaw+Math.PI*3)%(Math.PI*2))-Math.PI);
    if(diff>.55)continue;
    if(d<bd){bd=d;best=en;}
  }
  // arrow visual flies whether or not it hits
  const ar=new THREE.Mesh(new THREE.CylinderGeometry(.02,.02,.7,4), mat('#caa870'));
  ar.rotation.x=Math.PI/2; ar.rotation.y=P.yaw;
  ar.position.set(P.pos.x,P.pos.y+1.2,P.pos.z);
  world.group.add(ar);
  const dir={x:Math.sin(P.yaw),z:Math.cos(P.yaw)}, tgt=best, born=clock.elapsedTime;
  world.dynamic.push(function fly(dt){
    ar.position.x+=dir.x*26*dt; ar.position.z+=dir.z*26*dt;
    if(clock.elapsedTime-born>.7){ ar.visible=false; }
  });
  if(best){
    if(typeof vfxBowHit==='function') vfxBowHit(best.grp.position.x,best.grp.position.y+1,best.grp.position.z);
    let bm=1; if(best.wolf){ bm=best.state==='wguard'?.1:(best.state==='wopen'?2:1); } if(best.state==='bslide') bm=2;
    best.hp-=Math.round((S.flags&&S.flags.mombow?22:15)*mult*bm);
    drawBar(best.bar,best.hp/best.max);
    if(!best.dummy && !(best.wolf&&best.state==='wguard')){best.state='stagger';best.t=.3;}
    if(best.hp<=0){best.state='dead';best.t=1.2;if(!best.dummy&&!best.boss){P.hp=Math.min(P.maxhp,P.hp+12);hpUI();}}
  }
}
function playerCombat(dt, k, dodge, mv){
  P.atkCd-=dt; P.dodgeCd-=dt;
  if(dodge && P.dodgeCd<=0 && P.grounded){
    P.dodgeCd=.9; P.iframes=.45; ANIM.roll=.45;
    let dx,dz;
    if(mv.lengthSq()>.01){
      const m=Math.hypot(mv.x,mv.y);
      dx=(mv.x*Math.cos(CAM.yaw)-mv.y*Math.sin(CAM.yaw))/m*3.2;
      dz=(mv.x*Math.sin(CAM.yaw)+mv.y*Math.cos(CAM.yaw))/m*3.2;
    } else { dx=Math.sin(P.yaw+Math.PI)*3.2; dz=Math.cos(P.yaw+Math.PI)*3.2; }
    if(!blocked(P.pos.x+dx,P.pos.z,P.pos.y))P.pos.x+=dx;
    if(!blocked(P.pos.x,P.pos.z+dz,P.pos.y))P.pos.z+=dz;
  }
  for(let i=0;i<4;i++) if(SK.cd[i]>0) SK.cd[i]-=dt;
  // ULT active: aerial dance — spin, rise, multi-hit
  if(SK.ult>0){
    SK.ult-=dt; P.iframes=.1;
    player.rotation.y+=dt*14;
    if(SK.ult>.6) P.pos.y+=dt*2.2;
    SK.tick=(SK.tick||0)-dt;
    if(SK.tick<=0){ SK.tick=.3; hitEnemies(3.4,Math.PI,14,1.2,.6); }
    if(SK.ult<=0){ player.rotation.y=P.yaw; if(typeof vfxDanceStop==='function') vfxDanceStop(); }
    updateCds(); return;
  }
  if(!S.flags.trained){
    // Untrained kit: X = melee (her father's knife), ② = the bow.
    if(k.basic && P.atkCd<=0){ P.atkCd=.42;
      ANIM.atk=.3; ANIM.atkDur=.3; ANIM.heavy=false;
      hitEnemies(1.8,1.1,11,.5,.35); }
    if(k.s2 && SK.cd[1]<=0){ SK.cd[1]=SK.max[1];
      ANIM.atk=.35; ANIM.atkDur=.35; ANIM.heavy=false; bowShot(); }
    if(k.s3 && S.flags.sk3 && SK.cd[2]<=0){ SK.cd[2]=SK.max[2];
      ANIM.atk=.5; ANIM.atkDur=.5; ANIM.heavy=true;
      hitEnemies(1.7,1.2,20,1.4,.9); }                 // Lan's counter-throw (untrained power)
    updateCds(); return;
  }
  if(k.basic && P.atkCd<=0){ P.atkCd=.38;
    ANIM.atk=.3; ANIM.atkDur=.3; ANIM.heavy=false;
    hitEnemies(1.9,1.1,12,.5,.35); }
  if(k.s1 && SK.cd[0]<=0){ SK.cd[0]=SK.max[0];                     // 1 · Swallow Step: dash strike
    ANIM.atk=.25; ANIM.atkDur=.25; ANIM.heavy=false;
    hitEnemies(4.0,0.9,10,.8,.4);                                  // strike the lane first
    const dx=Math.sin(P.yaw)*3.6, dz=Math.cos(P.yaw)*3.6;
    if(!blocked(P.pos.x+dx,P.pos.z,P.pos.y))P.pos.x+=dx;
    if(!blocked(P.pos.x,P.pos.z+dz,P.pos.y))P.pos.z+=dz;
    P.iframes=Math.max(P.iframes,.2); }
  if(k.s2 && SK.cd[1]<=0){ SK.cd[1]=SK.max[1];                     // 2 · Father's Bow
    ANIM.atk=.35; ANIM.atkDur=.35; ANIM.heavy=false; bowShot(); }
  if(k.s3 && S.flags.sk3 && SK.cd[2]<=0){ SK.cd[2]=SK.max[2];      // 3 · Lan's Counter-Throw
    ANIM.atk=.55; ANIM.atkDur=.55; ANIM.heavy=true;
    hitEnemies(1.8,1.3,28,1.8,1.1); }
  if(k.s4 && S.flags.dance && SK.cd[3]<=0){ SK.cd[3]=SK.max[3];    // 4 · ULT: The Dance
    SK.ult=1.4; P.vy=5; P.grounded=false; if(typeof vfxDanceStart==='function') vfxDanceStart();
    subtitle('The pond. The lanterns. Move with it.',1400); }
  updateCds();
}

/* boss duel: choosing to fight Batu triggers a REAL fight before the ending plays */
let pendingWinScene=null;
const _goCore = go;
go = function(id){
  if(id==='e_duel' && curLevel===5 && world && world.L.batuBoss && world.L.batuBoss.hp>0){
    if(overlayOpen) closeOverlay();
    pendingWinScene='e_duel';
    const b=world.L.batuBoss; b.state='chase'; b.stateHome='chase';
    $('objtxt').textContent='Defeat Batu';
    return;
  }
  _goCore(id);
};
function tickBoss(){
  if(pendingWinScene && world.L.batuBoss && world.L.batuBoss.hp<=0){
    const s=pendingWinScene; pendingWinScene=null;
    setTimeout(()=>_goCore(s), 900);
  }
}

/* ==================================================================
   INPUT — gamepad / keyboard / touch
   ================================================================== */
const KEY={};
addEventListener('keydown',e=>{KEY[e.code]=true; if(overlayOpen){
  if(e.code==='ArrowUp')moveSel(-1); if(e.code==='ArrowDown')moveSel(1);
  if(e.code==='Enter'||e.code==='Space')pressSel();
}});
addEventListener('keyup',e=>KEY[e.code]=false);

const TOUCH={ move:{x:0,y:0}, look:{x:0,y:0}, jump:false, atk:false, dodge:false, s1:false,s2:false,s3:false,s4:false, lId:null, cId:null, lStart:null, cLast:null };
function setupTouch(){
  const stick=$('stickL'), nub=stick.querySelector('.nub');
  addEventListener('touchstart',e=>{
    document.body.classList.add('touchmode');
    for(const t of e.changedTouches){
      if(overlayOpen) continue;
      if(t.clientX<innerWidth*.45 && TOUCH.lId===null){ TOUCH.lId=t.identifier; TOUCH.lStart={x:t.clientX,y:t.clientY};
        stick.style.left=(t.clientX-59)+'px'; stick.style.bottom='auto'; stick.style.top=(t.clientY-59)+'px'; }
      else if(TOUCH.cId===null && t.target.id!=='jumpBtn'){ TOUCH.cId=t.identifier; TOUCH.cLast={x:t.clientX,y:t.clientY}; }
    }
  },{passive:true});
  addEventListener('touchmove',e=>{
    for(const t of e.changedTouches){
      if(t.identifier===TOUCH.lId){
        let dx=(t.clientX-TOUCH.lStart.x)/46, dy=(t.clientY-TOUCH.lStart.y)/46;
        const m=Math.hypot(dx,dy); if(m>1){dx/=m;dy/=m;}
        TOUCH.move.x=dx; TOUCH.move.y=dy;
        nub.style.transform=`translate(${-50+dx*38}%,${-50+dy*38}%) translate(-0%,-0%)`;
        nub.style.left=`calc(50% + ${dx*30}px)`; nub.style.top=`calc(50% + ${dy*30}px)`;
      }
      if(t.identifier===TOUCH.cId){
        TOUCH.look.x=(t.clientX-TOUCH.cLast.x)*.06; TOUCH.look.y=(t.clientY-TOUCH.cLast.y)*.05;
        TOUCH.cLast={x:t.clientX,y:t.clientY};
      }
    }
  },{passive:true});
  addEventListener('touchend',e=>{
    for(const t of e.changedTouches){
      if(t.identifier===TOUCH.lId){ TOUCH.lId=null; TOUCH.move.x=TOUCH.move.y=0;
        stick.style.left='26px'; stick.style.top='auto'; stick.style.bottom='calc(max(14px,env(safe-area-inset-bottom)) + 30px)';
        nub.style.left='50%'; nub.style.top='50%'; nub.style.transform='translate(-50%,-50%)'; }
      if(t.identifier===TOUCH.cId){ TOUCH.cId=null; TOUCH.look.x=TOUCH.look.y=0; }
    }
  },{passive:true});
  $('jumpBtn').addEventListener('touchstart',e=>{ TOUCH.jump=true; },{passive:true});
  $('jumpBtn').addEventListener('touchend',e=>{ TOUCH.jump=false; },{passive:true});
  $('atkBtn').addEventListener('touchstart',e=>{ TOUCH.atk=true; },{passive:true});
  $('dodgeBtn').addEventListener('touchstart',e=>{ TOUCH.dodge=true; },{passive:true});
  for(let i=1;i<=4;i++){ const b=$('cd'+i); if(b) b.addEventListener('touchstart',e=>{ TOUCH['s'+i]=true; },{passive:true}); }
}
setupTouch();

/* gamepad — Xbox standard mapping (8BitDo Xbox mode) */
const PAD={prev:{},lastMove:0};
const _an={};
function edgeAnalog(i,gp){ const now=gp.buttons[i].value>.6, was=!!_an[i]; _an[i]=now; return now&&!was; }
function edge(gp,i){ const now=!!(gp.buttons[i]&&gp.buttons[i].pressed), was=!!PAD.prev[i]; PAD.prev[i]=now; return now&&!was; }
function pollPad(t){
  const gp=(navigator.getGamepads?[...navigator.getGamepads()]:[]).find(g=>g&&g.connected);
  $('padBadge').classList.toggle('on',!!gp);
  const out={mv:new THREE.Vector2(0,0),look:new THREE.Vector2(0,0),jump:false,enter:false,atk:false,heavy:false,dodge:false};
  if(!gp) return out;
  const dead=v=>Math.abs(v)>.16?v:0;
  if(edge(gp,9)) $('codeBox').classList.toggle('open');
  if($('codeBox').classList.contains('open')){ if(edge(gp,1))$('codeBox').classList.remove('open'); return out; }
  if(overlayOpen){
    const ay=gp.axes[1]||0;
    const up=edge(gp,12)||(ay<-.5&&t-PAD.lastMove>230), dn=edge(gp,13)||(ay>.5&&t-PAD.lastMove>230);
    if(up){moveSel(-1);PAD.lastMove=t;} if(dn){moveSel(1);PAD.lastMove=t;}
    if(edge(gp,0)) pressSel();
    return out;
  }
  out.mv.x=dead(gp.axes[0]||0); out.mv.y=dead(gp.axes[1]||0);
  out.look.x=dead(gp.axes[2]||0); out.look.y=dead(gp.axes[3]||0);
  if(edge(gp,0)){ out.jump=true; out.enter=true; }
  if(edge(gp,2)) out.basic=true;
  if(edge(gp,5)) out.s1=true;
  if(edge(gp,4)) out.s2=true;
  if(edge(gp,7)||(gp.buttons[7]&&gp.buttons[7].value>.6&&edgeAnalog(7,gp))) out.s3=true;
  if(edge(gp,3)) out.s4=true;
  if(edge(gp,1)) out.dodge=true;
  return out;
}

/* ==================================================================
   MAIN LOOP
   ================================================================== */
player=mkPlayer(); scene.add(player);
let started=false;
function frame(t){
  requestAnimationFrame(frame);
  try{ frameBody(t); }catch(e){ showErr('loop', e); }
}
function frameBody(t){
  const dt=Math.min(clock.getDelta(),.05);
  if(!world){ renderer.render(scene,camera); return; }
  const pad=pollPad(t||0);
  const look=new THREE.Vector2(0,0);
  if((typeof CUT!=='undefined'&&CUT.active)){
    const gp=navigator.getGamepads&&navigator.getGamepads()[0];
    if((gp&&gp.buttons[0]&&gp.buttons[0].pressed)||TOUCH.jump||KEY.Space){ TOUCH.jump=false; KEY.Space=false; skipCutscene(); }
    tickCutscene(dt); if(typeof tickFX==='function')tickFX(dt); world.dynamic.forEach(f=>f(dt)); tickSnow(dt); renderer.render(scene,camera); return; }
  if(CINE.active){
    if(pad.enter||TOUCH.jump||KEY.Space){ endCine(); TOUCH.jump=false; KEY.Space=false; }
    else { if(typeof CUT!=='undefined'&&CUT.active){tickCutscene(dt);} else {tickCine(dt);} if(typeof tickFX==='function')tickFX(dt); world.dynamic.forEach(f=>f(dt)); tickSnow(dt); renderer.render(scene,camera); return; }
  }
  if(!overlayOpen && started){
    const mv=new THREE.Vector2(pad.mv.x+TOUCH.move.x+((KEY.KeyD||KEY.ArrowRight)?1:0)-((KEY.KeyA||KEY.ArrowLeft)?1:0),
                               pad.mv.y+TOUCH.move.y+((KEY.KeyS||KEY.ArrowDown)?1:0)-((KEY.KeyW||KEY.ArrowUp)?1:0));
    look.set(pad.look.x+TOUCH.look.x, pad.look.y+TOUCH.look.y);
    TOUCH.look.x*=.5; TOUCH.look.y*=.5;
    const jump=pad.jump||TOUCH.jump||KEY.Space;
    tickPlayer(dt,mv,jump&&P.grounded);
    const k={ basic:pad.basic||TOUCH.atk||KEY.KeyJ,
              s1:pad.s1||TOUCH.s1||KEY.Digit1, s2:pad.s2||TOUCH.s2||KEY.Digit2,
              s3:pad.s3||TOUCH.s3||KEY.Digit3, s4:pad.s4||TOUCH.s4||KEY.Digit4 };
    playerCombat(dt, k, pad.dodge||TOUCH.dodge||KEY.KeyL, mv);
    tickEnemies(dt); tickBoss();
    tickGates(dt, pad.enter||TOUCH.jump);
    ['Space','KeyJ','KeyL','Digit1','Digit2','Digit3','Digit4'].forEach(c=>{ if(KEY[c])KEY[c]=false; });
    TOUCH.jump=false; TOUCH.atk=false; TOUCH.dodge=false; TOUCH.s1=TOUCH.s2=TOUCH.s3=TOUCH.s4=false;
  }
  tickCamera(dt, look);
  world.dynamic.forEach(f=>f(dt));
  if(typeof tickFX==='function') tickFX(dt);
  tickSnow(dt);
  renderer.render(scene,camera);
}
requestAnimationFrame(frame);

/* ---------------- codes / boot ---------------- */
const CODES={
  'MARKET':()=>{S.flags={}; startAt(2);},
  'ESTATE':()=>{S.flags={}; startAt(3);},
  'MASKED':()=>{S.flags={trained:true,sk3:true}; startAt(4);},
  'LAKE':()=>{S.flags={trained:true,sk3:true,dance:true}; startAt(5);},
  'RIVER':()=>{S.flags={trained:true,sk3:true,dance:true,mombow:true}; startAt(6);},
  'WAYSTATION':()=>{S.flags={trained:true,sk3:true,dance:true,mombow:true}; startAt(11);},
  'SHRINE':()=>{S.flags={trained:true,sk3:true,dance:true,mombow:true}; startAt(12);},
  'ROAD':()=>{S.flags={trained:true,sk3:true,dance:true,mombow:true}; startAt(13);},
  'CROWNS':()=>{S.flags={trained:true,sk3:true,dance:true,mombow:true}; startAt(14);},
  'SIEGE':()=>{S.flags={trained:true,sk3:true,dance:true,mombow:true}; startAt(7);},
  'LEDGER':()=>{S.flags={trained:true,sk3:true,dance:true,mombow:true}; startAt(8);},
  'YARDS':()=>{S.flags={trained:true,sk3:true,dance:true,mombow:true}; startAt(9);},
  'HOME':()=>{S.flags={trained:true,sk3:true,dance:true,mombow:true}; startAt(10);},
};function startAt(n){
  const t=$('title'); if(t) t.style.display='none'; started=true;
  renderStats(); renderSatchel();
  loadLevel(n); startCine(()=>go('ch'+n));
}
/* title backdrop: painted rooftop scene when online, ink gradient offline */
try{
  const im=new Image();
  im.onload=()=>{ try{ $('title').style.background=
    `linear-gradient(rgba(13,15,26,.55), rgba(13,15,26,.9)), url(${ART.p1}) center/cover no-repeat`; }catch(e){} };
  im.onerror=()=>{};
  im.src=ART.p1;
}catch(e){}
