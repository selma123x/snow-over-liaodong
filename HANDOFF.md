# SNOW OVER LIAODONG — SESSION HANDOFF

## 1. READ FIRST (do this before replying to me)
1. Fetch and read `PROJECT-INDEX.md` at the root of repo `selma123x/snow-over-liaodong`.
2. Read `/docs/SNOW-OVER-LIAODONG-STORY-BIBLE.md` and `/docs/SNOW-OVER-LIAODONG-ACTS-DETAILED.md`.
3. Read `/docs/SNOW-STYLE-GUIDE.md` (visual constitution).
4. Download `/src/` (story.js, engine3d.js, anim.js, snow-3d.html, assemble.js, graphaudit.js)
   plus `/rung0/three.min.js` into your working dir, then run `node graphaudit.js`.
   It must print "MISSION GRAPH FULLY CONSISTENT" before you touch anything.

## 2. THEN PROVE YOU READ IT
Summarise each Act back to me — Act 1, Act 2, the side arc, Act 3 — mission by mission,
naming the key beats, who lives, who dies, and Seol's age through each. Do not skip this.
I need to know you have the story right before you touch the project.
Known traps previous sessions got wrong:
- The kiss is JIN and SEOL, Year 5 of the Five Winters, she is 16. Mingzhu DIES that same
  month — separate scene. Do not fuse these.
- Ages: taken at 11 · Five Winters run 11→16 · war years ~20 (nine years after the ford).
- Kang is ALIVE at the end (judged, marched to Joseon). Batu and Ohan die. Zhao lives.

## 3. HARD RULES
- Story, missions, dialogue, cutscene scripts, character arcs = PROTECTED. Visual upgrades only.
  See §20 of the index. Never summarise, cut, or rewrite them.
- Use the index to locate things. Do NOT scan the whole project. Ask me a short question if
  continuity is unclear.
- Targeted modular edits only. Validate with graphaudit before every deploy.
- After any locked change: deploy index.html, sync changed files to /src/, update PROJECT-INDEX.md.
- Deploy via GitHub Contents API (GET sha -> PUT base64). I paste a token per session; never store it.
- Your sandbox CANNOT fetch *.github.io or the Higgsfield CDN. Verify via api.github.com.

## 4. HIGGSFIELD — MONEY RULES (READ TWICE)
Plan: Pro (~600 credits/month). SPENT SO FAR ~256. REMAINING ~348.

### Verified prices (preflight anything else with get_cost:true — free)
| Job | Cost |
|---|---|
| Concept image (nano_banana_2) | 1.5 |
| 3D char: mesh+texture+rig+1 clip (image_to_3d / multi_image_to_3d) | 38 |
| 3D bare mesh, no texture | 20 |
| 3D textured, no rig | 30 |
| Extra animation clip (3d_rigging) | 8 |
| Video (Kling 3.0) | 2 per second (5s=10, 10s=20) |
| TTS line (seed_audio) | 0.5 |

### THE GATE — non-negotiable
Before ANY generation: show me (a) the exact prompt text, (b) the cost, (c) what asset it
produces, (d) how it enters the Three.js game. Then WAIT for my approval. Every single job,
including 3D. I have been burned by this already.

### How not to waste credits
- I make still frames FREE in Gemini. You write the prompt, I generate and upload, you import
  via media_import_url and use it. Do not pay 1.5 for stills unless I say so.
- Iterate at the cheap tier. Never re-roll a 38-credit 3D job or a 20-credit film to fix
  something a still would have shown.
- Prompts must be LITERAL AND DETAILED, not atmospheric. Specify ethnicity, exact clothing,
  number of people, who does what to whom, camera position, direction of travel. Vague prompts
  = the model guesses wrong = paid re-rolls. Style goes in a short tail: "muted colours,
  painterly ink-wash style. No text."
- One locked storyboard version per scene. Never assemble shots from different drafts
  (a previous session mixed a horse version with a cart version and wasted the shot).
- FILM IS FROZEN. Cutscenes will be re-shot IN-ENGINE with the real 3D models once the cast
  exists — free, reshootable, and no continuity drift. Credits go to 3D characters only.
- Reuse instead of rebuying: one enemy body serves all factions via free engine tinting,
  height scaling, and prop attachments (hats, beards, weapons parented to bones). Weapons must
  NEVER be in the source image — they fuse into the mesh.
- No PBR (enable_pbr:false) — the style is matte, and PBR costs quality and file size.
- Lighting, fog, colour grading, hit-feel, camera work, snow = FREE CODE. Do this before
  spending anything.
- Log every paid asset in the index ledger (§12b) so nothing is ever regenerated.

### Known API gotchas
- "Media input not found" = the input job is still rendering. Wait ~60s and retry.
- If a preset is detected, retry with `declined_preset_id: <id>` to generate literally.
- NSFW filter trips on adult-child physical contact framings. Reframe (e.g. child seated on a
  horse with the adult at the rein) rather than abandoning the shot.

## 5. WHAT WE OWN (never regenerate — see index §12b)
- Jurchen raider 3D: idle GLB + run GLB (rung1 test page proves engine integration works)
- Child Seol 3D: job 8d89ba4f — BUILT, NOT YET INTEGRATED
- Ford opening film, 3 shots, live in-game with captions off
- Seol concept sheet crops in /concepts/
- Rung 0 + Rung 1 test pages proving GLB + AnimationMixer + state-machine->clip mapping

## 6. OPEN QUESTION I STILL OWE YOU
The rung1 test page (https://selma123x.github.io/snow-over-liaodong/rung1/) shows a
"retarget test: X%" line. I need that number. If ~100%, one animation library is bought ONCE
and shared by the entire cast (huge saving). If low, clips are per-character. Ask me for it.

## 7. NEXT STEPS (do not start until §2 is done and I approve)
FREE work first: integrate child Seol into missions 1-3, lighting/atmosphere pass on levels
1-6, hit-feel (screen shake, hit-pause, snow puffs).
THEN, with approval, the Act 1 cast at 38 each: teen Seol (15-16 panel — the dance/kiss age),
young Jin, Mingzhu, Zhao, Lan, Kang, Batu (needs a UNIQUE boss silhouette — I will design him),
plus the raider moveset (attack/hit/death, 24). I supply reference sheets from Gemini.
