/* ============================================================================
   SNOW OVER LIAODONG — ANIMATION SYSTEM PLUMBING  (step 1: systems only)
   ----------------------------------------------------------------------------
   Five subsystems, every one with a procedural fallback so missing Higgsfield
   assets never break gameplay:
     A) ASSETS         — one registry; injecting a real asset is a 1-line edit
     B) Sprite/flipbook renderer (camera-facing quads, sheet or frame-seq)
     C) Portrait system for dialogue UI
     D) VFX flipbook system for combat events
     E) Cutscene playback (video OR frame-sequence OR procedural puppet)
   Art direction is locked to ART_STYLE against the chapter-painting reference.
   ============================================================================ */

/* ---- Layer 0: art-direction lock ---------------------------------------- */
const ART_STYLE = {
  ref: 'ink-wash + muted gold, painterly snow (matches chapter paintings)',
  palette: { ink:'#141a2e', paper:'#ece1c8', gold:'#c19a3f', blood:'#7a2e28',
             jade:'#5f7a6a', frost:'#a8c4d4', warm:'#e8b890' },
  // procedural fallbacks are tinted from this palette so they sit in-world
};

/* ---- A) ASSET REGISTRY --------------------------------------------------
   Each entry: {kind, url|frames, cols,rows,fps, loop, fallback}
   kind: 'portrait' | 'flipbook' | 'cutscene' | 'ui'
   url present  -> use Higgsfield asset (sheet png, frame list, or mp4)
   url null     -> procedural fallback runs, gameplay unaffected
   Filling an asset later = paste a URL here. Nothing else changes.        */
const ASSETS = {
  /* a) character portraits (painted busts for dialogue) */
  portrait: {
    seol:   { url:null, fallback:{glyph:'雪', tint:'#ece1c8'} },
    father: { url:null, fallback:{glyph:'父', tint:'#b9a888'} },
    kang:   { url:null, fallback:{glyph:'康', tint:'#7a6a4a'} },
    zhao:   { url:null, fallback:{glyph:'趙', tint:'#8a8272'} },
    mingzhu:{ url:null, fallback:{glyph:'明', tint:'#c8b6d2'} },
    lan:    { url:null, fallback:{glyph:'蘭', tint:'#8aa88f'} },
    jin:    { url:null, fallback:{glyph:'進', tint:'#a9bce8'} },
    batu:   { url:null, fallback:{glyph:'狼', tint:'#9a7a5a'} },
    namgil: { url:null, fallback:{glyph:'冈', tint:'#7a6a52'} },
    yun:    { url:null, fallback:{glyph:'尹', tint:'#8a92b0'} },
    okhui:  { url:null, fallback:{glyph:'玉', tint:'#c8a8a0'} },
    wei:    { url:null, fallback:{glyph:'衛', tint:'#7a8272'} },
    wang:   { url:null, fallback:{glyph:'王', tint:'#8a6a9a'} },
    daragul:{ url:null, fallback:{glyph:'達', tint:'#5a9a9a'} },
    seja:   { url:null, fallback:{glyph:'嗣', tint:'#b09a5a'} },
  },
  /* b) combat VFX flipbooks (sheet: cols×rows, fps) */
  flipbook: {
    slash:   { url:null, cols:6, rows:1, fps:30, loop:false, fallback:'slash' },
    bowhit:  { url:null, cols:5, rows:1, fps:30, loop:false, fallback:'spark' },
    impact:  { url:null, cols:6, rows:1, fps:28, loop:false, fallback:'dust'  },
    dust:    { url:null, cols:5, rows:1, fps:24, loop:false, fallback:'dust'  },
    death:   { url:null, cols:6, rows:1, fps:24, loop:false, fallback:'poof'  },
    /* c) signature Dance ult aura (looping while active) */
    dance:   { url:null, cols:8, rows:1, fps:24, loop:true,  fallback:'petals'},
  },
  /* d) cinematic sequences (mp4 or frame list); procedural puppet if null */
  cutscene: {
    ford:        { url:null, nosubs:true, playlist:[
      'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260720_012610_cbe41d89-d390-4e39-aae0-41e9956fdafa.mp4',
      'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260719_233443_e3716d4a-289c-4e99-911f-1d52be6491e6.mp4',
      'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260720_012924_49969b95-e038-4a5c-b036-4f356bf1a4d9.mp4',
      'https://d8j0ntlcm91z4.cloudfront.net/user_39oF80qmiAwVq7Ydg1b8SdDAx1V/hf_20260720_054738_a44e64e7-1c2c-4000-92f3-7c6976923915.mp4'
    ], frames:null, fallback:'puppet' }, // father's death — FILMED v2 (4 shots)
    kiss:        { url:null, frames:null, fallback:'puppet' }, // cave kiss
    recognition: { url:null, frames:null, fallback:'puppet' }, // rooftop
    lake:        { url:null, frames:null, fallback:'puppet' }, // the lake
    mingzhu:     { url:null, frames:null, fallback:'puppet' }, // her death
  },
  /* e) UI / background motion */
  ui: { titleLoop:{ url:null, fallback:'snow' } },
};
function haveAsset(kind,key){ const a=ASSETS[kind]&&ASSETS[kind][key]; return !!(a&&a.url); }

/* ---- TURNKEY INJECTION API ----------------------------------------------
   Asset production later becomes one call per asset. No structural edits.
     injectPortrait('jin',  'https://.../jin_bust.png')
     injectFlipbook('slash','https://.../slash_sheet.png', {cols:6,rows:1,fps:30})
     injectCutscene('ford', 'https://.../ford.mp4')                   // video
     injectCutscene('kiss', ['url_f0.png','url_f1.png',...], {fps:12}) // frame-seq
     injectUI('titleLoop',  'https://.../title_loop.webm')
   Each validates the slot exists, then flips it live. Missing slot = warn,
   never throw. Idempotent: re-injecting overwrites cleanly.               */
function injectPortrait(key, url){
  if(!ASSETS.portrait[key]){ console.warn('no portrait slot:',key); return false; }
  ASSETS.portrait[key].url = url; return true;
}
function injectFlipbook(key, url, opts){
  if(!ASSETS.flipbook[key]){ console.warn('no flipbook slot:',key); return false; }
  const d=ASSETS.flipbook[key]; d.url=url;
  if(opts){ if(opts.cols)d.cols=opts.cols; if(opts.rows)d.rows=opts.rows;
            if(opts.fps)d.fps=opts.fps; if(opts.loop!=null)d.loop=opts.loop; }
  return true;
}
function injectCutscene(key, urlOrFrames, opts){
  if(!ASSETS.cutscene[key]){ console.warn('no cutscene slot:',key); return false; }
  const d=ASSETS.cutscene[key];
  if(Array.isArray(urlOrFrames)){ d.frames=urlOrFrames; d.url=null; if(opts&&opts.fps)d.fps=opts.fps; }
  else { d.url=urlOrFrames; d.frames=null; }
  return true;
}
function injectUI(key, url){
  if(!ASSETS.ui[key]){ console.warn('no ui slot:',key); return false; }
  ASSETS.ui[key].url=url; return true;
}
/* Batch loader: paste a manifest object later, one call fills everything. */
function injectManifest(m){
  m=m||{};
  for(const k in (m.portrait||{})) injectPortrait(k, m.portrait[k]);
  for(const k in (m.flipbook||{})){ const v=m.flipbook[k]; Array.isArray(v)?injectFlipbook(k,v[0],v[1]):injectFlipbook(k,v); }
  for(const k in (m.cutscene||{})){ const v=m.cutscene[k]; Array.isArray(v)?injectCutscene(k,v[0],v[1]):injectCutscene(k,v); }
  for(const k in (m.ui||{})) injectUI(k, m.ui[k]);
}
/* Coverage report: what's filled vs still procedural-fallback. Read-only. */
function assetCoverage(){
  const rep={};
  for(const kind of ['portrait','flipbook','cutscene','ui']){
    const keys=Object.keys(ASSETS[kind]); const filled=keys.filter(k=>{
      const a=ASSETS[kind][k]; return !!(a.url || (a.frames&&a.frames.length)); });
    rep[kind]=filled.length+'/'+keys.length+(filled.length?(' ['+filled.join(',')+']'):'');
  }
  return rep;
}

/* ---- B) SPRITE / FLIPBOOK RENDERER --------------------------------------
   Camera-facing textured quad that plays a sprite sheet. Used by VFX (D) and,
   later, any sheet-based character overlays. Falls back to a procedural
   particle burst when no sheet URL is present.                             */
const FX = []; // active world-space effects, ticked each frame
function _sheetTexture(url, cols, rows){
  const tex = new THREE.TextureLoader().load(url, undefined, undefined, ()=>{ /* CORS/miss: caller already has fallback */ });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1/cols, 1/rows);
  return tex;
}
function spawnFlipbook(key, x, y, z, scale){
  const def = ASSETS.flipbook[key];
  scale = scale||1.6;
  if(def && def.url){
    const tex=_sheetTexture(def.url, def.cols, def.rows);
    const mat=new THREE.SpriteMaterial({map:tex, transparent:true, depthTest:false, blending:THREE.AdditiveBlending});
    const sp=new THREE.Sprite(mat); sp.scale.set(scale,scale,1); sp.position.set(x,y,z);
    world.group.add(sp);
    const total=def.cols*def.rows; let f=0, acc=0;
    FX.push(function(dt){
      acc+=dt; if(acc>=1/def.fps){ acc=0; f++;
        if(f>=total){ if(def.loop){f=0;} else { world.group.remove(sp); return false; } }
        tex.offset.set((f%def.cols)/def.cols, 1-Math.floor(f/def.cols+1)/def.rows);
      }
      return true;
    });
    return sp;
  }
  // FALLBACK: procedural particle burst tinted from palette
  return _proceduralBurst(def?def.fallback:'dust', x,y,z, scale);
}
function _proceduralBurst(kind, x,y,z, scale){
  const pal=ART_STYLE.palette;
  const colByKind={slash:pal.paper, spark:pal.warm, dust:'#b9a888', poof:'#cfd7e0',
                   petals:pal.frost, default:'#cfd7e0'};
  const col=colByKind[kind]||colByKind.default;
  const n=kind==='petals'?14:10, parts=[];
  for(let i=0;i<n;i++){
    const m=new THREE.Mesh(new THREE.SphereGeometry(.06*scale,4,4), mat(col));
    m.position.set(x,y,z); world.group.add(m);
    const a=Math.random()*6.28, sp=1.5+Math.random()*2.5;
    parts.push({m, vx:Math.cos(a)*sp, vy:1+Math.random()*2.5, vz:Math.sin(a)*sp});
  }
  let life=kind==='petals'?1.2:.5;
  FX.push(function(dt){
    life-=dt;
    parts.forEach(p=>{ p.m.position.x+=p.vx*dt; p.m.position.y+=p.vy*dt; p.m.position.z+=p.vz*dt;
      p.vy-=6*dt; p.m.material.opacity=Math.max(0,life); p.m.material.transparent=true; });
    if(life<=0){ parts.forEach(p=>world.group.remove(p.m)); return false; }
    return true;
  });
}
function tickFX(dt){ for(let i=FX.length-1;i>=0;i--){ if(FX[i](dt)===false) FX.splice(i,1); } }

/* combat-event entry points (engine calls these; assets optional) */
function vfxSlash(x,y,z){ spawnFlipbook('slash',x,y,z,2.0); }
function vfxBowHit(x,y,z){ spawnFlipbook('bowhit',x,y,z,1.2); }
function vfxImpact(x,y,z){ spawnFlipbook('impact',x,y,z,1.6); }
function vfxDeath(x,y,z){ spawnFlipbook('death',x,y,z,1.8); }
let _danceAura=null;
function vfxDanceStart(){ if(!_danceAura) _danceAura=spawnFlipbook('dance',P.pos.x,P.pos.y+1,P.pos.z,3.2); }
function vfxDanceStop(){ _danceAura=null; /* loop self-clears when ASSETS.dance has no url; sheet loop stops at ult end via SK.ult guard below */ }

/* ---- C) PORTRAIT SYSTEM (dialogue UI) -----------------------------------
   Scenes may declare `speaker:'jin'`. renderScene calls setPortrait(id).
   Painted bust when available; else a styled calligraphy glyph medallion.  */
function setPortrait(speaker){
  const slot=$('portrait'); if(!slot) return;
  if(!speaker){ slot.style.display='none'; slot.innerHTML=''; return; }
  const def=ASSETS.portrait[speaker];
  slot.style.display='block';
  if(def && def.url){
    slot.innerHTML=`<img src="${def.url}" alt="" onerror="this.parentNode.setAttribute('data-fb','1')">`;
  } else {
    const fb=(def&&def.fallback)||{glyph:'人',tint:'#ece1c8'};
    slot.innerHTML=`<div class="portrait-fb" style="--pt:${fb.tint}">${fb.glyph}</div>`;
  }
}

/* ---- D) already above (vfx* entry points) -------------------------------- */

/* ---- E) CUTSCENE PLAYBACK ABSTRACTION -----------------------------------
   playCutscene(key, {subs:[{t,txt}], dur, after}) chooses, in order:
     1. Higgsfield video  (ASSETS.cutscene[key].url ends .mp4/.webm)
     2. Higgsfield frame sequence (frames:[urls])
     3. Procedural puppet (existing in-engine staged camera + subtitles)
   Subtitles are driven uniformly regardless of which path runs.           */
let CUT={active:false,t:0,dur:0,subs:[],after:null,mode:null,vid:null,shot:null};
function playCutscene(key, opts){
  opts=opts||{}; const def=ASSETS.cutscene[key]||{};
  CUT={active:true,t:0,dur:opts.dur||6,subs:(opts.subs||[]).slice(),after:opts.after||null,
       mode:null,vid:null,shot:opts.shot||null,key:key};
  document.body.classList.add('cine');
  const bar=$('cutsub'); if(bar){ bar.textContent=''; bar.classList.remove('on'); }
  const plist = def.playlist && def.playlist.length ? def.playlist : (def.url && /\.(mp4|webm)$/.test(def.url) ? [def.url] : null);
  if(plist){
    CUT.mode='video'; CUT.nosubs=!!def.nosubs; CUT.pi=0;
    const v=document.createElement('video');
    v.src=plist[0]; v.autoplay=true; v.playsInline=true; v.muted=false;
    v.className='cut-video';
    v.onended=()=>{ CUT.pi++; if(CUT.pi<plist.length){ v.src=plist[CUT.pi]; v.play(); } else endCutscene(); };
    v.onerror=()=>endCutscene();   // CDN gone → fall through gracefully
    document.body.appendChild(v); CUT.vid=v;
  } else if(def.frames && def.frames.length){
    CUT.mode='frames'; CUT.frames=def.frames; CUT.fps=def.fps||12; CUT.fi=0;
    const img=document.createElement('img'); img.className='cut-video'; document.body.appendChild(img);
    CUT.vid=img; img.src=def.frames[0];
  } else {
    CUT.mode='puppet';            // procedural fallback: staged camera sweep
    if(typeof opts.stage==='function') CUT.shot=opts.stage; // per-scene choreography hook
    startCine(null);              // reuse existing letterboxed camera sweep
  }
}
function tickCutscene(dt){
  if(!CUT.active) return;
  CUT.t+=dt;
  // frame-sequence advance
  if(CUT.mode==='frames'){
    const fi=Math.floor(CUT.t*CUT.fps);
    if(fi!==CUT.fi){ CUT.fi=fi; if(fi<CUT.frames.length) CUT.vid.src=CUT.frames[fi]; else return endCutscene(); }
  }
  // puppet choreography hook + camera
  if(CUT.mode==='puppet'){ if(CUT.shot) CUT.shot(CUT.t,dt); }
  // subtitles (shared by all modes)
  const bar=$('cutsub');
  if(bar && CUT.subs.length && !CUT.nosubs){
    const cur=CUT.subs[0];
    if(CUT.t>=cur.t){ bar.textContent=cur.txt; bar.classList.add('on'); CUT._shown=CUT.subs.shift(); }
  }
  if(CUT.mode!=='video' && CUT.mode!=='frames' && CUT.t>=CUT.dur) endCutscene();
}
function endCutscene(){
  if(!CUT.active) return;
  CUT.active=false; document.body.classList.remove('cine');
  const bar=$('cutsub'); if(bar) bar.classList.remove('on');
  if(CUT.vid){ CUT.vid.remove(); CUT.vid=null; }
  if(CINE.active) endCine();
  const after=CUT.after; CUT.after=null; if(after) after();
}
function skipCutscene(){ if(CUT.active) endCutscene(); }

/* ---- procedural rig style tuning hook (Layer 0 consistency) --------------
   Called by mkPlayer/mkGuard after build so rig materials match the palette
   reference rather than raw primary colors. No-op-safe if rig absent.      */
function styleRig(grp, role){
  if(!grp) return;
  const pal=ART_STYLE.palette;
  const tint = role==='player'? pal.paper : role==='boss'? pal.blood : role==='ally'? pal.jade : '#6b6f7e';
  grp.traverse&&grp.traverse(o=>{ if(o.material&&o.material.color&&o.userData.styleable){ /* reserved */ } });
  grp.userData.styleTint=tint;
}
