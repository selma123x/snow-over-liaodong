/* MISSION GRAPH INTEGRITY AUDIT + ORDER-ENFORCING WALKTHROUGH
   - Builds a static node graph from SCENES + every level's gates.
   - Flags dangling targets (referenced but undefined) and unreachable nodes.
   - Runs a bot that requires the cave chain to be visited IN ORDER before ch6. */
const V2=class{constructor(x=0,y=0){this.x=x;this.y=y;} set(x,y){this.x=x;this.y=y;return this;} copy(v){this.x=v.x;this.y=v.y;return this;} lengthSq(){return this.x*this.x+this.y*this.y;} normalize(){const m=Math.hypot(this.x,this.y)||1;this.x/=m;this.y/=m;return this;}};
const V3=class{constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z;} set(x,y,z){this.x=x;this.y=y;this.z=z;return this;} copy(v){this.x=v.x;this.y=v.y;this.z=v.z;return this;}};
function Obj(){return{position:new V3(),rotation:{x:0,y:0,z:0},scale:{set(){}},userData:{},visible:true,material:{map:{needsUpdate:false},color:{},opacity:1},children:[],add(...o){this.children.push(...o);},remove(){this.children.pop();},traverse(f){f(this);},clone(){return Obj();}};}
const Tex=function(){return{wrapS:0,wrapT:0,repeat:{set(){}},offset:{set(){}},needsUpdate:false};};
global.THREE={Vector2:V2,Vector3:V3,Color:class{},WebGLRenderer:class{setPixelRatio(){}setSize(){}setClearColor(){}render(){}},Scene:class{add(){}remove(){}},PerspectiveCamera:class{constructor(){this.position=new V3();}updateProjectionMatrix(){}lookAt(){}},Fog:class{},Group:Obj,Mesh:Obj,Points:function(){return Obj();},Sprite:function(){return Obj();},HemisphereLight:Obj,DirectionalLight:Obj,PointLight:Obj,BoxGeometry:Obj,SphereGeometry:Obj,CylinderGeometry:Obj,ConeGeometry:Obj,TorusGeometry:Obj,BufferGeometry:class{constructor(){this.attributes={};}setAttribute(){}},BufferAttribute:class{constructor(a){this.array=a;}},PointsMaterial:Obj,MeshLambertMaterial:function(){return{emissive:{},color:{}};},MeshBasicMaterial:function(){return{color:{}};},SpriteMaterial:function(){return{map:{needsUpdate:false}};},CanvasTexture:Tex,TextureLoader:class{setCrossOrigin(){}load(u,ok,p,err){return new Tex();}},RepeatWrapping:1,AdditiveBlending:1,Clock:class{constructor(){this.elapsedTime=0;}getDelta(){this.elapsedTime+=.016;return .016;}}};
const elStore={};
function fakeEl(id){return elStore[id]||(elStore[id]={id,style:{},dataset:{},classList:{_s:new Set(),add(c){this._s.add(c);},remove(c){this._s.delete(c);},toggle(){},contains(c){return this._s.has(c);}},_html:'',set innerHTML(v){this._html=v;},get innerHTML(){return this._html;},setAttribute(){},textContent:'',value:'',className:'',querySelector(){return fakeEl(id+'_q');},querySelectorAll(){return[];},appendChild(){},remove(){},offsetWidth:0,addEventListener(){},onclick:null,getContext(){return{clearRect(){},beginPath(){},arc(){},fill(){},fillRect(){},fillText(){},stroke(){},moveTo(){},lineTo(){},fillStyle:'',strokeStyle:'',lineWidth:0,font:'',textAlign:'',textBaseline:'',shadowColor:'',shadowBlur:0};},width:0,height:0,scrollTo(){},scrollIntoView(){}});}
global.document={getElementById:fakeEl,createElement:(t)=>{const e=fakeEl('new_'+t+Math.random());e.tagName=t;return e;},querySelectorAll:()=>[],body:{classList:{_s:new Set(),add(c){this._s.add(c);},remove(c){this._s.delete(c);},contains(c){return this._s.has(c);}},appendChild(){}}};
global.window={addEventListener(){}};global.innerWidth=1200;global.innerHeight=800;global.devicePixelRatio=2;
global.navigator={getGamepads:()=>[]};global.requestAnimationFrame=()=>{};global.addEventListener=()=>{};
let RESET_HIT=false;global.location={reload(){RESET_HIT=true;}};
global.matchMedia=()=>({matches:false});global.Image=class{set src(v){}};
const timers=[];global.setTimeout=(f)=>{timers.push(f);return timers.length;};global.clearTimeout=()=>{};
const fs=require('fs'),vm=require('vm');
vm.runInThisContext(fs.readFileSync('story.js','utf8'));
vm.runInThisContext(fs.readFileSync('anim.js','utf8'));
vm.runInThisContext(fs.readFileSync('engine3d.js','utf8').replace(/^'use strict';/,''));

/* ---------- STATIC GRAPH AUDIT ---------- */
const sceneIds=new Set(Object.keys(SCENES));
const SPECIAL=new Set(['RESET']);
const targets=new Map(); // target -> [sources]
function addT(t,src){ if(!t)return; if(typeof t!=='string')return; let bare=t.replace(/^WAVE:/,''); bare=bare.replace(/^CINE:[^:]+:/,''); (targets.get(bare)||targets.set(bare,[]).get(bare)).push(src); }
// from scene choices
for(const [id,sc] of Object.entries(SCENES)){
  let chs=[]; try{ chs=typeof sc.choices==='function'?sc.choices():(sc.choices||[]); }catch(e){}
  chs.forEach((c,i)=>{ const to=typeof c.to==='function'?'(fn)':c.to; if(to&&to!=='(fn)') addT(to, id+'.choice['+i+']'); });
}
// from level gates (entry + engine special targets a5_frag_go/a5_hunt_go handled in go())
const engineSpecial=new Set(['a5_frag_go','a5_hunt_go']);
// close-signals: ids used purely to close the overlay and enter gameplay
const closeSignals=new Set();
for(const n of [1,2,3,4,5,6,11,12,14,7,8,13,9,10]){ loadLevel(n); (world.closeScenes||[]).forEach(c=>closeSignals.add(c)); }
buildCaveArea('fragments'); (world.closeScenes||[]).forEach(c=>closeSignals.add(c));
buildCaveArea('weapons'); (world.closeScenes||[]).forEach(c=>closeSignals.add(c));
for(const n of [1,2,3,4,5,6,11,12,14,7,8,13,9,10]){
  loadLevel(n);
  (world.gates||[]).forEach((g,i)=>{ if(g.entry) addT(g.entry,'L'+n+'.gate['+i+']'); });

}
// also cave sub-area gates
buildCaveArea('fragments'); (world.gates||[]).forEach((g,i)=>{ if(g.entry) addT(g.entry,'cave.frag.gate['+i+']'); });
buildCaveArea('weapons');   (world.gates||[]).forEach((g,i)=>{ if(g.entry) addT(g.entry,'cave.wpn.gate['+i+']'); });

let dangling=[];
for(const [t,srcs] of targets){
  if(sceneIds.has(t)||SPECIAL.has(t)||engineSpecial.has(t)||closeSignals.has(t)) continue;
  dangling.push(t+'  <-  '+srcs.join(', '));
}
// reachability from ch1 through choices + known engine transitions
const adj=new Map();
function edge(a,b){ if(!b)return; (adj.get(a)||adj.set(a,[]).get(a)).push(b); }
for(const [id,sc] of Object.entries(SCENES)){
  let chs=[]; try{ chs=typeof sc.choices==='function'?sc.choices():(sc.choices||[]); }catch(e){}
  chs.forEach(c=>{ let to=typeof c.to==='function'?null:c.to; if(to){ to=to.replace(/^WAVE:/,'').replace(/^CINE:[^:]+:/,''); edge(id,to);} });
}
// engine bridges: chapter cards -> first gate scene; frag_go/hunt_go -> their gate entry scenes
edge('a5_cavego','a5_frag_go'); edge('a5_frag_go','a5_stone');
edge('a5_third','a5_hunt_go'); edge('a5_hunt_go','a5_sword');
// cave weapon gate: a5_sword gate then a5_bow gate (engine gates), then story continues
edge('a5_sword','a5_bow');
// Act 6 card bridges to its gates' entry scenes
edge('ch6','a6_batu');
// gate-entry scenes are reachable from their chapter card
const cardFirst={ch1:'a1_drill',ch2:'a2_break',ch3:'a3_go',ch4:'a4_clash',ch5:'a5_msg',ch6:'a6_batu',ch7w:'a7w_arrive',ch8j:'a8j_soldier',ch10r:'a10r_child',ch8c:'a8c_court'};
Object.entries(cardFirst).forEach(([c,f])=>edge(c,f));
// level gate chains -> mark entry scenes reachable from their card
for(const n of [1,2,3,4,5,6,11,12,14,7,8,13,9,10]){ loadLevel(n); const card=(n===11?'ch7w':(n===12?'ch8j':(n===13?'ch10r':(n===14?'ch8c':'ch'+n)))); (world.gates||[]).forEach(g=>{ if(g.entry) edge(card,g.entry); }); }
// close-signals that are ALSO real scenes must NOT be pre-marked (a5_stone is a real scene AND a closeScene)
const realCloseSignals=[...closeSignals].filter(c=>!sceneIds.has(c));
const seen=new Set(); const stack=['ch1']; realCloseSignals.forEach(c=>seen.add(c));
while(stack.length){ const x=stack.pop(); if(seen.has(x))continue; seen.add(x); (adj.get(x)||[]).forEach(y=>stack.push(y)); }
const unreachable=[...sceneIds].filter(id=>!seen.has(id)&&id!=='RESET');

console.log('=== STATIC GRAPH AUDIT ===');
console.log('scenes defined: '+sceneIds.size);
console.log('dangling references: '+(dangling.length?('\n  '+dangling.join('\n  ')):'NONE'));
console.log('unreachable scenes: '+(unreachable.length?unreachable.join(', '):'NONE'));

/* ---------- ORDER-ENFORCING WALKTHROUGH ---------- */
// required cave order that MUST be hit between lake and ch6:
const REQUIRED_CAVE=['a5_lake','a5_cavego','a5_stone','a5_letters','a5_third','a5_sword','a5_bow','a5_intel','a6_end','a7w_arrive','a7w_namgil','a7w_song','a7w_patrol','a7w_after','a7w_ohan','a8j_soldier','a8j_ming','a8j_court','a8j_okhui','a8j_after','a8j_leave','a8c_court','a8c_king','a8c_general','a8c_choice','a8c_daragul','a8c_flash','a8c_part','a8c_succ','a8c_end','a7_zhao','a9m_namgil','a9m_hub','a9m_kang','a7_dance','a9m_ledger','a8_ledger','a10r_child','a10r_bridge','a10r_after','a10r_ohan','a9_kang','a10_return','a10_end'];
const visited=[];
const _renderScene=renderScene;
renderScene=function(id){ visited.push(id); return _renderScene(id); };

function eC(){let n=0;while(CINE.active&&n++<10)endCine();}
function fT(){while(timers.length)timers.shift()();}
RESET_HIT=false; started=true; loadLevel(1); eC(); go('ch1'); let guard=0;
let inCave=false;
while(!RESET_HIT&&guard++<900){
  eC(); fT(); if(CUT&&CUT.active){ skipCutscene(); fT(); continue; }
  if(world.L&&world.L.wave){world.L.wave.ids.forEach(e=>e.hp=0);const w=world.L.wave;world.L.wave=null;go(w.next);continue;}
  if(overlayOpen){
    const sc=SCENES[S.scene]; if(!sc){console.log('BOT HIT MISSING SCENE: '+S.scene);break;}
    const chs=typeof sc.choices==='function'?sc.choices():(sc.choices||[]);
    if(!chs.length){console.log('DEAD-END scene '+S.scene);break;}
    const c=chs[0]; if(c.fx)c.fx();
    let to=typeof c.to==='function'?c.to():c.to; go(to); continue;
  }
  const gg=world.gates.find(x=>!x.done&&x.avail());
  if(gg){ openGate(gg); continue; }
  const al=world.enemies.filter(e=>!e.dummy&&!e.boss&&e.hp>0);
  if(al.length){al[0].hp=0;al[0].state='dead';continue;}
  console.log('STUCK L'+curLevel+' scene '+S.scene+' (no gate/wave/enemy/choice)');break;
}
console.log('\n=== ORDER-ENFORCING WALKTHROUGH ===');
console.log('reached end (RESET): '+(RESET_HIT?'YES':'NO'));
// verify cave nodes visited in order
let lastIdx=-1, ok=true, missing=[];
for(const node of REQUIRED_CAVE){
  const at=visited.indexOf(node);
  if(at===-1){ missing.push(node); ok=false; }
  else if(at<lastIdx){ console.log('OUT OF ORDER: '+node+' visited before a prior required node'); ok=false; }
  else lastIdx=at;
}
console.log('required cave chain visited in order: '+(ok?'YES':'NO'));
if(missing.length) console.log('  MISSING from playthrough: '+missing.join(', '));
console.log('cave reachable through normal flow: '+(missing.length===0?'CONFIRMED':'NO'));
const verdict = (dangling.length===0 && unreachable.length===0 && RESET_HIT && ok && missing.length===0);
console.log('\n'+(verdict?'*** MISSION GRAPH FULLY CONSISTENT ***':'*** GRAPH ISSUES REMAIN ***'));

