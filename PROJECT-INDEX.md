# SNOW OVER LIAODONG — MASTER PROJECT INDEX
Maintained by Claude. Purpose: after any context reset, locate anything without scanning.
RULE: this file references WHERE things live, never copies contents. Update on every locked change.

## 1 · PROJECT OVERVIEW
Single-page offline 3D action-RPG, Three.js r128, iPad Safari + 8BitDo (Xbox mode) + touch.
Setting: Ming–Qing transition, Liaodong 1618–1620s. Heroine Baek Seol (백설), Joseon-born.
Live: https://selma123x.github.io/snow-over-liaodong/  ·  Repo: selma123x/snow-over-liaodong
Deployed artifact: /index.html (assembled single file, ~807 KB). Sources mirrored in repo /src/.
Working dir this container: /home/claude/game/

## 2 · ACT STRUCTURE
Act 1 "The Taken" M1–M6 · Act 2 "The Name" M7–M9b + side arc · Act 3 "The Return" M10–M11.
Narrative order == graphaudit LEVEL ORDER [1,2,3,4,5,6,11,12,14,7,8,13,9,10] (graphaudit.js).

## 3 · MISSION LIST (mission → chapter scene id → level → entry scene)
M1 Uiju raid/ford            ch1   L1  · M2 Guangning market   ch2  L2 · M3 Five Winters ch3 L3
M4 Two Masks                 ch4   L4  · M5 Lake & Cave        ch5  L5 · M6 Third Water  ch6 L6
M7 Waystation                ch7w  L11 · M8 Shrine/Ok-hui      ch8j L12
SA Child Between Crowns      ch8c  L14 · M9 Liaoyang           ch7  L7 · M9b Ledger pass ch8 L8
M10 Last Road/bridge         ch10r L13 · M10b Shenyang yards   ch9  L9 · M11 Finale      ch10 L10
All scene text: story.js (keys above). First scene per chapter: graphaudit.js `cardFirst`.

## 4 · QUEST LIST (in-level objective chains)
Defined per level as `gates:[...]` arrays inside LEVELS (engine3d.js:~627). Quick-gates carry
`quick:` text; entry-gates open story scenes; `avail()` encodes ordering; `tag:` groups counters.
Waves: `to:'WAVE:<next>'` in story.js choices → level `wave()`/`spawnWave()`.
Side quest SA: gates in LEVELS[14]; flag S.flags.m8crescue gates the succ house.

## 5 · CUTSCENES (all staged-puppet, skippable; video slots empty)
Registry: CUTSPECS (engine3d.js:498) — keys: ford 16s/5, kiss 12s/5, recognition 10s/4,
mingzhu 18s/6 (4s stillness), lake 12s/4. Player: playCutscene (engine3d.js:~83–130).
Trigger syntax from story: `to:'CINE:<key>:<next>'` (e.g. story.js → CINE:kiss:a3_dance,
CINE:mingzhu:a3_fall); remaining keys triggered at level entries — grep 'CINE:' + 'playCutscene('.
Asset upgrade path: playCutscene asset-priority logic (comment engine3d.js:~496) — a video URL
injected into ASSETS.cine[key] bypasses staging automatically.

## 6 · CHARACTER LIST (canon status)
Alive: Seol · Jin · Zhao (west, w/ Lan) · Lan · Kang (judged, marched to Joseon) · Namgil (limp)
· Danbi · Ok-hui · Yun · Wei · Daragul · Seja ("careful man") · the baby (miller family).
Dead: father (M1, by Batu) · Mingzhu (M3 Y5) · Batu (M6) · Ohan (M11) · old king (SA).
Full bios: dialogue itself; per-character thumbnails in §7.

## 7 · CHARACTER ARCS (one-line + where the beats live in story.js)
Seol: property→weapon→name→liberator; beats a1_*, a3_vow, a6_*, a8j_*, a10_win/end.
Jin: partner-not-rescuer; a3_dance(Y3 intro), ch4 recognition, a8_jin, a8c_choice, a10r/a10.
Zhao: duty→doubt→"second daughter"; a3_sword, a7_zhao, a9_zhao farewell.
Lan: discipline→counter-ledger; a3_lan, a9_zhao (ledger page).
Mingzhu: secret artist; a3_mingzhu, cave letters a5_*, bow etching.
Kang: profit-machine; a2_*, a3_y4, a9m_kang(spared), a9_kang(judged).
Ohan: accountant of conquest; a7w_ohan, red-ink a8_ledger, a10r_ohan, a10_wolf/win.
Namgil: arithmetic of care; a7w_*, a9m_namgil, a10r_namgil.
Daragul: unnamed pact; a8c_daragul/flash/part (+open thread).
Seja: careful stability; a8c_succ, letter in a10r_ohan.
Ok-hui: grief→back gate→epilogue archery; a8j_okhui, a10_end.
Danbi: named child→speech; a6_danbi, a10_danbi.

## 8 · DIALOGUE / SCRIPT LOCATIONS
ALL prose+dialogue: story.js (89 scene objects; prefix map: a1_–a6_ acts1, a7w_ M7, a8j_ M8,
a8c_ SA, a7_/a9m_ M9, a8_ M9b, a10r_ M10, a9_ M10b, a10_ M11). Cutscene subtitle scripts:
CUTSPECS.subs (engine3d.js). Boss hint subtitles: wolf/charger handlers in combat section.
Chapter-card text: chN keys in story.js. NOTHING narrative lives anywhere else.

## 9 · GAMEPLAY SYSTEMS (all engine3d.js)
Movement/physics/camera: PLAYER PHYSICS & CAMERA section (post-LEVELS, ~1100+).
Skills: SK const (engine3d.js:1235) — [dash, bow, counter(sk3), Dance ult]; teacher-gated by
S.flags{trained,sk3,dance,mombow}; late-war tuning in startAt (ult cd 20→28 lvl≥7, kill-heal 12→6).
Weapons: setWeapon() — Fists&Bow / Zhao Steel / Winter Bow(22).
Enemy AI: mkGuard state machine patrol/chase/windup/strike; knockback; stagger.
Progression: LEVEL_CARDS (engine3d.js:74) + CODES level-select (engine3d.js:1667).
Flags/state: global S; save via localStorage key (search 'snowSave').

## 10 · BOSS FIGHTS
Batu (L6): charger — states bwind/bcharge/bslide, ×2 charge dmg; search 'bwind'.
Ohan (L10): wolf — wguard (10% dmg, no stagger)/3-strike flurry/wopen (×2 window); search 'wguard'.
Both spawn via their level's wave(); first-encounter hint subtitles inline in handlers.

## 11 · LEVELS / ENVIRONMENTS (LEVELS keys, engine3d.js:627)
1 Uiju village+ford · 2 market · 3 Zhao estate · 4 rooftops · 5 lake (+buildCaveArea sub-rooms,
engine3d.js:~134) · 6 frozen Yalu · 7 Liaoyang (burning) · 8 mountain pass · 9 Shenyang yards ·
10 dawn ford (finale) · 11 waystation · 12 border shrine · 13 north road/bridge · 14 hill palace.
Builders use helpers: ground/box/building/wallRun/lantern/tree/mkSnow (top of LEVELS section).

## 12 · ASSET LIST (current state: ALL procedural/placeholder)
Injection API: ASSETS const (anim.js:28) — 15 portrait slots (seol father kang zhao mingzhu lan
jin batu namgil yun okhui wei wang daragul seja, all url:null→glyph fallback), cine video slots,
chapter art CHAPTER_ART (real, generated, engine3d.js — keys ch1..ch8c).
3D: no generated assets yet. Rung 0 proof deployed: /rung0/ (index.html, GLTFLoader.js,
three.min.js copy, assets/Soldier.glb 2.1MB) — normalize() wrapper + STATE2CLIP pattern =
the replacement workflow reference implementation.

## 12b · PAID ASSET LEDGER (never regenerate these)
Raider GLB idle: d794c00d...glb · run: 10bedbab...glb (CDN; mirror task open)
FORD FILM (live in ASSETS.cutscene.ford.playlist, captions off): S1 fight+embrace cbe41d89 ·
S2 strike e3716d4a · S3 Batu line 49969b95 · S4 Seol zoom→toy a44e64e7. Seol child ref media
02e162c5 · user ford frame e77af69e / 16:9 crop 2dfcaadf. Spent ≈218cr; bal ≈386.
RULES: user writes/approves all Higgsfield prompts verbatim BEFORE spend · stills made FREE in
Gemini by user, imported · FILM FROZEN until next credit refresh · remaining budget = 3D cast.

## 13 · ART / STYLE BIBLE
repo /docs/SNOW-STYLE-GUIDE.md — "a Joseon ink painting
that learned to move"; 5 pillars; palette hexes; silhouette law; 4 lighting recipes; style tests.
Production plan: repo /docs/SNOW-CINEMATIC-PRODUCTION-PLAN.md. Verified pipeline costs:
concept 1.5cr · multi_image_to_3d(tex+rig+clip) 38cr · extra clip 8cr · char≈74cr.

## 14 · MUSIC / SFX (nothing exists — requirements)
Music: 1 bed/act (Act1 gayageum sparse · Act2 strings+drum · Act3 elegy) + finale/ford theme.
SFX minimum: sword hit ×2, bow release, footstep-snow, dash whoosh, ult flourish, gate chime,
enemy hit/death, UI tick. Hook points: playCutscene, hitEnemies, bowShot, SK triggers, go().
No audio engine yet — add tiny WebAudio wrapper when assets exist.

## 15 · UI SYSTEMS (shell: snow-3d.html; logic: engine3d.js + anim.js)
HUD ids: chapname, objtxt, hp bar (hpUI), skill chips. Overlay dialogue: showScene/closeOverlay
(anim.js) — portrait glyph, title, eyebrow, crumb, choices. Chapter cards: chapter:true scenes +
CHAPTER_ART. Cutscene UI: letterbox+subs in playCutscene. Touch: stick+buttons (snow-3d.html);
gamepad map in input section; codes menu: CODES + level-select UI.

## 16 · ENGINE ARCHITECTURE (dependency order)
snow-3d.html (shell/CSS/UI) → inlines three.min.js → anim.js (ASSETS, portraits, overlay,
cutscene player) → story.js (pure data: 89 scenes) → engine3d.js (go() router, LEVELS, combat,
physics, input, saves). go(id) routes: scene | WAVE: | CINE: | RESET | cave swaps.
Collision = world.solids AABBs (visual-independent). Enemies = e.grp contents (swappable).
Coupling point for 3D swap: animPlayer + guard limb code (~150 lines) → AnimationMixer.

## 17 · TECHNICAL PIPELINE
Build: edit /home/claude/game/{story,engine3d,anim}.js + snow-3d.html → node assemble.js →
snow-over-liaodong-3d.html → deploy as index.html via GitHub Contents API (GET sha→PUT b64;
token pasted per session, never stored). Validate BEFORE deploy: node graphaudit.js must print
FULLY CONSISTENT. After lock: push changed sources to repo /src/ + update this index.
Headless tests: THREE/DOM stubs + vm (see graphaudit.js pattern). Known test artifact:
knockback shoves stub enemies out of range — place test actors on open ground.
3D asset path (proven Rung 0): GLB → container gltf-transform (npm) → /assets/ in repo →
GLTFLoader + normalize() + STATE2CLIP. Sandbox egress CANNOT fetch *.github.io (verify via
api.github.com); upload.higgsfield.ai also blocked.

## 18 · OUTSTANDING TASKS
▢ Rung 1: styled Jurchen raider through Higgsfield 3D (preflight→confirm→generate; needs top-up,
  balance ~4cr vs ~50–75 needed) → answers skeleton-consistency + style-fidelity.
▢ Mission 1 vertical slice (env kit + Seol + raider + lighting/post) → iPad judgment → scale.
▢ Audio pass (§14). ▢ Combat depth (enemy variety, hit-feel). ▢ Portraits (deprioritised by user
  until asked). ▢ Playtest notes from user.
Open story threads: Daragul return · Seja's memory · Ok-hui daylight · Namgil fate.
TOY THREAD (locked): ford drop → unexplained shelf horse in L3 room (prop pending) → a8c_flash
reveal ('kept it ever since'). Act1 film treatments: /docs/ACT1-CINEMATICS.md.

## 19 · FILE DEPENDENCY MAP
story.js ← standalone data (edited most).
engine3d.js ← depends on story.js keys (go targets), anim.js overlay fns, CUTSPECS↔CINE links.
anim.js ← ASSETS injection; consumed by engine3d + cutscenes.
snow-3d.html ← shell; ids referenced by engine3d ($ helpers).
assemble.js ← concatenation order: html shell splice(three.min.js, anim, story, engine3d).
graphaudit.js ← reads story.js+engine3d.js; its level order + required chain MUST be extended
whenever missions are added. rung0/* ← fully standalone. PROJECT-INDEX.md ← this file; repo /src/.

## 20 · PROTECTED CONTENT RULES (binding on all future work)
LOCKED unless the user explicitly requests otherwise:
story structure · mission order · original cutscene scripts (CUTSPECS.subs) · character arcs ·
dialogue beats · existing emotional moments.
Visual upgrades MAY change: models · animation · lighting · camera · environments · effects.
Visual upgrades MUST NOT: summarise scenes · remove dialogue · replace cinematic moments with
text · rewrite character motivations.
PRINCIPLE: this is a graphical evolution of the existing game, not a narrative rewrite.
Enforcement: any edit touching story.js or CUTSPECS requires explicit user instruction naming
the scene; graphaudit.js + §8 dialogue spot-check run before every deploy that touches them.
