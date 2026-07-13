# SNOW OVER LIAODONG — Cinematic 3D Evolution: Technical Assessment & Production Plan
### No assets generated, no edits made. This is the honest feasibility study you asked for.

---

## 1. How far can the current Three.js engine realistically be pushed?

Further than you might expect on *style*, and less far than you might hope on *fidelity*. The distinction matters.

**What "Arcane-inspired" actually means technically.** Arcane is offline-rendered film — every frame took minutes on a render farm, with hand-painted textures over 3D and 2D effects composited on top. No engine renders that in real time. What games achieve is the *visual grammar* of that style: painterly hand-authored textures, flat-ish stylised lighting with hard color ramps instead of physically-correct shading, strong silhouettes, rim light, heavy color grading, and painterly skies. That grammar is absolutely achievable in Three.js. Games with this vibe ship on far weaker renderers than a modern iPad's GPU.

**Concretely available in Three.js (r128 or upgraded):**
- Toon/ramp shading (MeshToonMaterial or a small custom shader) — the single biggest step toward painterly. Cheap.
- Inverted-hull or post-process outlines for the Castlevania silhouette read. Cheap.
- Post-processing stack: bloom (lanterns, fire, snow-glow), color grading LUTs per level (dawn gold, siege red, moonlight blue), vignette, film grain. This is where "cinematic" mostly lives, and it's a solved problem in Three.js.
- Skinned GLB characters with animation clips — full support via GLTFLoader + AnimationMixer.
- Painted skyboxes (your existing chapter paintings point the way), fog volumes faked with layered planes, particle snow with depth.

**The real ceilings, honestly:**
1. **iPad Safari WebGL.** Real-time shadows for many casters, high-poly skinned crowds, and heavy post chains will eat the frame budget. Budget realistically: 2–4 hero-quality characters on screen, 6–10 simplified enemies, one shadow-casting light, 2–3 post passes. Within that budget, 60fps stylised is achievable; outside it, it isn't.
2. **The single-file offline architecture.** This is the bigger constraint than the GPU. Real 3D assets (GLB models, texture sets, audio) are megabytes each; base64-inlining them into one HTML file inflates them ~33% and would push the file toward 50–200MB, which Safari will hate. Going cinematic almost certainly means **abandoning single-file**: a normal site (index.html + /assets folder) on the same GitHub Pages, with a service worker for offline caching. Same link, same offline capability on iPad after first load, but a real asset pipeline. This is a deliberate architecture decision, and it should be made once, at the start.
3. **r128 is old** (2021). An upgrade to a current release is advisable before serious asset work — better GLTF handling, better post-processing. It's a half-day of breakage-fixing, done once.

**Verdict:** the *style target* is reachable in Three.js on iPad. The *film-frame fidelity* of Arcane is not, in any engine. If you hold the target as "stylised, painterly, dramatic, strong silhouettes at 60fps" rather than "looks like the Netflix show," this engine can do it.

---

## 2. Can AI-assisted workflows create the assets?

Yes for some categories, partially for others, and one honest "mostly no."

**Textures — YES, the strongest case.** Tileable painterly materials (weathered timber, palace tile, snow-crusted stone, silk, ice) generate well, and hand-painted-texture style is exactly what makes 3D read as painterly. This is the highest AI leverage in the whole pipeline.

**Concept art — YES.** Character sheets, environment paintings, prop sheets, lighting studies. Essential for consistency: every downstream 3D asset gets judged against these. Cheap and fast.

**Props & environment assets — MOSTLY YES.** Image-to-3D services (Meshy, Tripo) are genuinely usable for static props: lanterns, carts, cauldrons, shrine cairns, weapon racks, roof ornaments. Output needs cleanup (poly reduction, re-texturing to the style) but saves real modelling time. Modular architecture kits (wall/roof/door pieces) are borderline — often faster to model simple geometry by hand in Blender and let the painterly *textures* carry the style.

**Characters — PARTIAL, and this is the pipeline's hardest truth.** AI image-to-3D produces character *statues*: fused geometry, messy topology, no rig-friendly edge flow. For a game character that must deform through hundreds of animations, you need retopology and rigging — which is manual Blender work or semi-automated (Mixamo auto-rigger works on clean humanoids). Realistic path: AI concept sheet → AI 3D as a *proportions/sculpt reference* → manual (or heavily cleaned) game mesh → Mixamo auto-rig. Budget the most human hours here. Hero characters (Seol, Jin, Ohan) justify it; rank enemies should be one shared rig with material/gear swaps.

**Animations — PARTIAL.** Mixamo's free library covers locomotion, dodges, generic sword swings out of the box, retargeted onto your rigs — that's 70% of needs at zero cost. The *signature* moves (the Dance ult, the turning form, Lan's counter-throw, Ohan's flurry) are exactly what libraries don't have; those are hand-keyed in Cascadeur/Blender, or stylised procedural layering on top of base clips. AI text-to-animation exists but is not yet dependable for combat-critical timing.

---

## 3. Tool fit per stage

| Stage | Tool | Verdict |
|---|---|---|
| Concept art & style bible | **Higgsfield** (already connected), Midjourney | Either works; Higgsfield preferred since I can drive it directly. One locked style prompt for everything. |
| Textures | Higgsfield / Stable Diffusion tileables | High leverage, cheap. |
| Props/env 3D | **Meshy or Tripo** | Cheap per-asset, good for props. Kaedim is enterprise-priced — skip. |
| Character 3D | Meshy/Tripo *as reference only* → **Blender** for game mesh | Do not expect game-ready rigs from AI. |
| Rigging | **Mixamo auto-rig** | Free, works on clean humanoids, exports FBX→GLB. |
| Animation | **Mixamo library** first; **Cascadeur** for signature moves | Skip **Rokoko** — it's a mocap product needing a suit/camera setup; wrong tool for this project. |
| Cleanup/export | **Blender** (+ gltfpack/Draco compression) | Non-negotiable hub of the pipeline. Human-operated. |
| Integration | Three.js GLTFLoader, AnimationMixer, custom toon shader, post stack | My side. |

**Division of labour, stated plainly:** I can drive Higgsfield, write every line of engine/shader/loader code, build the integration and state-machine retrofit, and validate. **Meshy/Tripo, Blender, Mixamo, and Cascadeur run outside this chat — that's you** (or the two of us in a loop where I write exact specs/checklists and you execute the clicks). This project stops being "Claude builds while you review" and becomes a two-person pipeline. That's the honest operational change.

---

## 4. The workflow, concept → asset → engine

1. **Style bible first** (one session): 6–10 Higgsfield pieces — Seol turnaround, Jin, one enemy, the Yalu environment, a lighting study, a props sheet — all under one locked prompt. Everything downstream is judged against these. Nothing else is generated until this is approved.
2. **Character:** concept sheet → (optional) Meshy reference sculpt → Blender game mesh (~8–15k tris, clean topology) → painterly texture (AI-assisted, hand-fixed) → Mixamo auto-rig → animation set (Mixamo base + hand-keyed signatures) → export GLB (Draco).
3. **Environment:** blockout already exists (the current levels ARE the blockout — that work is not wasted) → modular kit pieces in Blender → AI tileable textures → dress with AI-generated props → bake simple AO.
4. **Engine integration (my side):** upgrade Three.js; asset loader + manifest; replace mkPlayer/mkGuard procedural puppets with skinned meshes driven by the *existing combat state machine* (states→clips: chase→run, windup→attack_anticipation, wopen→stagger_open, etc. — the game logic survives intact, only the presentation layer swaps); toon shader + outline + post stack; per-level grading LUTs; hit-feel pass (hit-pause, shake, camera punch).
5. **Ship loop:** per-level conversion → iPad FPS check → lock → next level.

The critical architectural note: because the combat/mission logic is already a clean state machine separated from rendering, **the entire story and gameplay graph survives this transformation untouched.** We are re-skinning a working game, not rebuilding one.

---

## 5. The vertical slice — what proves the direction

One level, full target quality, before anything else is converted. **Recommendation: the Yalu ford (Level 10)** — it's the emotional and mechanical climax, it's an open ice plain (cheapest environment to make beautiful: sky, ice reflections, snow, light — almost no architecture), and it contains the best boss.

**Slice contents:** Seol hero model with ~8 clips (idle, run, dodge, 2 attacks, bow, ult, hurt) · Ohan model with his guard/flurry/spent clips · one rank enemy · the ford environment re-dressed (painted sky, reflective ice shader, volumetric-feel snow, lantern bloom) · full post stack + dawn grading · hit-feel pass · runs 45–60fps on your iPad.

**Success criteria, decided in advance:** you play it and it *feels* like the game you imagine; stable framerate on the actual device; the style bible and the in-game result visibly match. If any of the three fails, we learn it after one level's investment, not fourteen.

**Estimated effort for the slice, honestly:** several working sessions of my code + several hours of your Blender/Mixamo execution, spread over days-to-weeks depending on your pace. Not an afternoon.

---

## 6. What to avoid (time and token sinks)

- **Generating any asset before the style bible is locked.** Inconsistent one-offs are the #1 way AI art budgets die.
- **Expecting game-ready characters from image-to-3D.** Plan the Blender cleanup or plan disappointment.
- **Converting all 14 levels before the slice is judged.** One level proves everything.
- **Rokoko / mocap** — wrong scale for this project.
- **Voice acting now** — a huge consistency project; decide after the visual direction lands.
- **Base64-inlining heavy assets to preserve single-file** — accept the architecture change to a cached multi-file site instead.
- **Switching engines preemptively** — see below.
- **AI video for the playable world** — it cannot become interactive 3D; video is for cutscenes only.
- **Bespoke rigs per rank enemy** — one shared enemy rig, gear/material variants.

---

## The engine question, answered directly

Could Godot or Unity do this more comfortably? Yes — real editors, asset pipelines, animation tooling. Would switching now be right? No. A switch costs a total rewrite of a *finished, validated* game, forfeits the browser-link/no-install distribution that makes the iPad experience frictionless, and buys comfort rather than capability at this scope. Crucially, **every asset this plan produces (GLB models, rigs, clips, textures, the style bible) is engine-portable** — if the vertical slice someday reveals a hard ceiling, the asset investment transfers to Godot intact. So the rational sequence is: prove the slice in Three.js; switch only if the slice fails for engine reasons, which I judge unlikely within the stated fidelity target.

## Bottom line

The prototype can evolve into the stylised cinematic action game you're imagining — *provided* the target is painterly-stylised at 60fps rather than literal Arcane frames, the single-file architecture is retired in favour of a cached asset pipeline, and you're in for a genuine two-person production loop over weeks. The story, mission graph, and combat logic all survive untouched; this is a presentation-layer transformation of a finished game, which is the best possible starting position.

**Proposed first step when you're ready (still zero assets):** lock the style bible spec — I draft the exact Higgsfield prompts for the 6–10 bible pieces, you approve the wording, then we generate only those and judge.
