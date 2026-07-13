# SNOW OVER LIAODONG — VISUAL STYLE GUIDE
### The creative constitution. Every character, environment, prop, texture, and frame is judged against this document. If an asset contradicts it, the asset is wrong.

---

# 1. THE EXACT VISUAL STYLE

## The one-sentence definition
**A Joseon ink painting that learned to move.**

Not "anime," not "western stylised," not "painterly grunge." The game looks like the East Asian brush-painting tradition — Korean *sumukhwa* ink-wash and true-view landscape painting (the Jeong Seon lineage), with Ming court painting's controlled colour — brought into three dimensions and lit like cinema.

## The five pillars (memorise these; everything else derives from them)

**I. SNOW IS THE PAPER.** In ink painting, the untouched paper does the most work. In this game, snow and mist are the untouched paper: vast, clean, bright negative space that everything else is drawn onto. Levels are 60–70% "empty" light-value field. Detail is *spent*, deliberately, where the eye should go — never distributed evenly. If a scene is busy everywhere, it is off-style.

**II. INK DEFINES, COLOUR CONFESSES.** Form comes from dark ink values — silhouettes, structural lines, shadow masses in warm-black. Colour appears the way it does in ink painting: sparingly, meaningfully, like an emotion breaking through composure. A red sash in a grey-white world is an event. Full-saturation scenes do not exist; when a level "goes colourful" (burning Liaoyang), it is ONE colour flooding, not many.

**III. EVERY FRAME COULD HANG ON A WALL.** Composition rules from scroll painting apply in-engine: strong diagonals, asymmetry, one dominant mass balanced by emptiness, horizon high or low but never centred. The camera and level dressing are composed, not filled.

**IV. BEAUTY BESIDE VIOLENCE.** The world is never grim-dark. It is heartbreakingly beautiful *and* terrible things happen in it — that contrast IS the story's thesis rendered visually. Blood on snow reads as calligraphy, not gore. Destruction is elegiac (embers drifting like blossom), never gross.

**V. RESTRAINT IS THE STYLE.** When in doubt: fewer colours, fewer details, more atmosphere, more silhouette. The style guide's most important word is *no*.

## The master palette
The world lives on a controlled base with faction accents (a disciplined use of the Korean *obangsaek* five-colour idea — accents carry meaning, never decoration):

**Base world (90% of every frame):**
- Paper-snow whites: `#e8ecf2`, `#dfe4ee` (cool, never pure #fff)
- Mist greys: `#c9d2de`, `#8a8496`
- Ink blacks (warm, never pure #000): `#1a1d24`, `#2c2430`
- Weathered timber/earth: `#6a5f52`, `#8a7a6a`

**Meaning accents (used singly, small, deliberate):**
- **Seol / the freed — snow-white + deep indigo** `#2c3a5c` (her identity colour; the river at night)
- **The dead & memory / Mingzhu — muted gold** `#c8a44a` (lantern light, the letters, the bow's etching)
- **Jin / the dance — faded crane-red** `#a84a3c` (ribbons, the Crane's Wing tassel)
- **Joseon — undyed hemp + celadon hint** `#9ab8a8`
- **Ming — vermilion-going-to-rust** `#8a3a3a` (a great colour dying, literally)
- **The Jurchen/Qing machine — plain blue-slate + wolf-fur umber** `#4a5a78`, `#5a4a3a`
- **Ohan specifically — red ink** `#b03a2e`, appearing ONLY as writing, never as clothing
- **Danger/blood — one red** `#8e2f28`, used like a brushstroke

**Hard rule:** no more than ONE meaning-accent dominant per shot. Two accents may coexist only when the story is about their meeting (Seol and Jin together: indigo + crane-red).

---

# 2. CHARACTER DESIGN RULES

## Realism dial (the most important calibration)
**70% real / 30% drawn.** Grounded human proportions and historically-credible dress, pushed by: simplified planar faces, exaggerated silhouette shapes, hand-painted (not photographic) surfaces, and gravity-defying grace only in *motion*, never in anatomy. Test: a character should look like a person from a museum scroll, not a cartoon and not a photo scan. If it reads "anime," soften the eyes and drop the chin sharpness. If it reads "mocap realistic," flatten the face planes and strengthen the costume shapes.

## Face style
- **Planar, sculptural faces**: clearly defined cheek/jaw planes like a confident brush would state them; minimal micro-detail (no pores, no photoreal skin shader — skin is a soft matte wash with a single warm rim).
- **Eyes carry everything.** Slightly enlarged (10–15%, no more), dark, wet-ink irises with one sharp highlight. Eyebrows are deliberate brushstrokes — they are the face's main actor.
- **Mouths small and understated** — this cast underplays; faces must be able to say almost-nothing beautifully.
- **Age is painted honestly**: Zhao's grey, the old soldier's weathering, Kang's soft jowls. No airbrushed cast.
- East Asian facial structure rendered with respect and specificity — Korean, Ming Chinese, and Jurchen characters are distinct individuals, never interchangeable.

## Proportions
- **7 heads tall** (real-adjacent; not 8-head heroic, never chibi).
- Hands slightly large (+10%) — this is a game about what hands do: drawing bows, opening cages, folding letters.
- Weight is real: fabric hangs, fur is heavy, armour tires people. No floating hair physics; hair moves like it's winter.
- Silhouette exaggeration lives in COSTUME, not body: hat brims, sleeve volumes, fur collars, ribbon lengths — pushed 20–30% past historical for readability.

## The silhouette law (Castlevania's lesson, our way)
Every character must be identifiable as a black shape at 50 meters:
- **Seol** — compact vertical; short quilted *jeogori*-derived fighting dress over trousers, one long indigo sash-tail, the Winter Bow's distinct recurve on her back. Reads as: *an arrow standing upright.*
- **Jin** — all curves and diagonals; asymmetric robe, crane-red ribbon at the wrist, the reverse-curved Crane's Wing making an unmistakable wrong-way arc. Reads as: *a brushstroke mid-turn.*
- **Zhao** — a rectangle; massive shoulder line, Ming officer's cross-collar coat. Reads as: *a wall.*
- **Lan** — narrow verticals + the ledger satchel's hard diagonal strap.
- **Namgil** — broad triangle, low centre, the burn-scarred forearm bare even in winter; after M10, the limp is IN the silhouette.
- **Ohan** — long unbroken vertical, wolf-fur collar the only mass; carries a book where others carry weapons. Reads as: *a drawn line.*
- **Rank enemies** — one shared body, faction read via headgear + coat colour block only.

## Clothing philosophy
- **History as vocabulary, drama as grammar.** Every garment starts from real 1620s dress — Joseon jeogori/durumagi/gat, Ming cross-collar robes and brigandine, Jurchen fur-trimmed riding coats — then simplifies detail and amplifies shape. Nothing invented from fantasy-costume cliché (no armour bikinis, no impossible pauldrons, no gratuitous belts).
- **Fabric tells class and story**: the freed wear patched, re-dyed, mismatched layers (survival as texture); the court wears controlled silk; the machine wears uniform.
- **Wear is painted in**: hems fray, dye fades at shoulders, snow crusts on boots. Clean clothing is a statement (the careful man), not a default.
- **Layering beats decoration**: visual richness comes from garment-over-garment, never from surface ornament.

---

# 3. ENVIRONMENT RULES

## Lighting (where "cinematic" actually lives)
- **One story-light per scene.** Every level has a single dominant motivated source — dawn behind Joseon, the fire-glow of Liaoyang, one moon over Shenyang, lantern-pools in the palace — and everything else is fill. Never two competing key lights.
- **The canonical lighting recipes:**
  - *Snow-dawn* (Yalu, the road): low warm key `#ffd8a8` raking across cool `#c8cede` field; long soft shadows; the game's signature look.
  - *Siege* (Liaoyang): the sky itself is the light — ember-orange dome, everything below in silhouette; the one level where ink values invert (dark figures on bright ground becomes bright fire behind dark world).
  - *Moon-blue* (Shenyang, Two Masks): single cold key, warm lantern pools as counterpoint — the indigo/gold duet.
  - *Shrine-white* (M8): overcast shadowless snow-light, the quietest recipe; colour almost leaves the world.
- **Rim light is grammar**: characters get a consistent cool rim separating them from the field — the "drawn outline" made of light.
- **Grading per level, always**: filmic contrast curve, lifted blacks (ink, not void), gentle vignette. Bloom reserved for meaning-lights (lanterns, fire, the ult).

## Materials
- **Hand-painted, low-frequency, matte-first.** Textures look brushed, with visible stroke direction, at LOW detail frequency (big confident value shapes, not photographic noise). Roughness high by default.
- **Only four things shine**: ice, blades, silk, wet ink. Specularity is rationed exactly like colour — a shine is an event.
- **Ice is the hero material** of the whole game: milky depth, faint blue-green interior, soft mirror of sky and lanterns. Get ice right and the fords carry the finale alone.
- Stone/timber/plaster carry big painted value gradients (dark base to light top) faking bounced snow-light — cheap and painterly.

## Atmosphere
- **Air is a character.** Every scene has depth-haze; distance dissolves into mist exactly as in landscape scroll painting — 3–4 visible depth layers (foreground crisp → mid softened → far as flat painted value → sky as paper).
- **Falling snow in three depths** (near large/slow, mid, far shimmer). Snow behaviour is emotional weather: still air in grief scenes, driving lateral snow in battle.
- **Particles as brushwork**: embers, breath in cold air, ribbon trails, disturbed snow from a dash — all rendered as calligraphic strokes, not physical simulation.

## Architecture
- **Three building languages, instantly readable:**
  - *Joseon*: low, horizontal, earth-hugging; giwa tile curves gentle; ondol stone bases; natural timber + white plaster; the seonangdang cairns and prayer poles as punctuation. Feels: humble, held, home.
  - *Ming*: axial, symmetrical, walled; vermilion columns whose paint is peeling (the empire's state rendered in maintenance level); grand gates that dwarf people. Feels: magnificent, ending.
  - *Jurchen/Qing*: pragmatic, modular, new; timber palisades, felt and hide, banner poles; in Shenyang, Ming grandeur being efficiently re-occupied — conquest as renovation. Feels: relentless, functional.
- **Scale rule**: architecture frames people small against power (court, yards) and shelters them close in refuge (waystation, cave, village). The camera should feel the difference.
- Roofscapes are the game's "second ground" — rooftop traversal levels treat tile planes as terrain, so roof silhouettes must be generous, readable, and beautiful against sky.

---

# 4. WHAT MAKES IT NOT-ARCANE, NOT-CASTLEVANIA

**Taken from Arcane, transformed:** the conviction that painterly surfacing + cinematic lighting can carry emotion in 3D. **Rejected from Arcane:** its entire palette logic (neon-industrial saturation, urban grime, teal-magenta punch). Arcane's colour shouts in a machine city; ours withholds on a snowfield. Arcane texture is dense grunge; ours is sparse brush. If a frame of this game could be mistaken for Piltover, saturation and detail density are both too high.

**Taken from Castlevania, transformed:** the silhouette-first character read and elegant violence. **Rejected from Castlevania:** gothic maximalism (ornament, blacks-on-blacks, vampiric reds), 2D-anime line language, and grimdark palette. Castlevania is night-ornate; we are day-empty. Their violence is baroque; ours is calligraphic — one stroke, then stillness.

**The differentiators nobody else owns:**
1. **The negative-space doctrine** — no comparable game treats emptiness as the primary compositional material. Snow-as-paper is *the* identity.
2. **The Korean painting lineage** — sumukhwa values, true-view landscape depth-mist, obangsaek accent logic, dancheong used only where temples earn it. East Asian-historical games skew to Japanese or Chinese visual traditions; a Joseon-rooted visual identity is genuinely unclaimed territory.
3. **Colour as narrative system** — accents are literally the theme (each faction sees people as threats/leverage/resources/numbers; each faction *is* a colour discipline; Seol's indigo moves freely through all of them).
4. **Elegy, not grit.** Arcane is tragic-electric, Castlevania tragic-gothic; Snow over Liaodong is tragic-*serene* — the tone of a poem written after the war by someone who survived it. That emotional temperature, held visually, is the thing players will remember.

---

## THE STYLE TESTS (apply to every future asset)
1. **Squint test** — as a blurred thumbnail, is it 60%+ light-value field with one dark composed mass? 
2. **Silhouette test** — pure black shape: is the character/building instantly identifiable?
3. **Accent test** — is there ONE meaning-colour, and does it mean something?
4. **Museum test** — could this frame hang beside a Joseon landscape scroll without embarrassment?
5. **Restraint test** — what can still be removed? Remove it.

*End of style guide. Next step when approved: translate this document into the locked Higgsfield prompt set for the style bible (6–10 pieces), generating nothing until the prompts are signed off.*
