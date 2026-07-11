# SNOW OVER LIAODONG — PROJECT INDEX (continuity reference)
# Maintained by Claude. Consult this INSTEAD of re-reading files. Update after every locked change.
# Deploy: repo selma123x/snow-over-liaodong, file index.html, live at selma123x.github.io/snow-over-liaodong
# Build: /home/claude/game/{story.js, engine3d.js, anim.js, snow-3d.html} → node assemble.js → deploy via GitHub API
# Validate: node graphaudit.js (must print FULLY CONSISTENT before any deploy)

## CAMPAIGN SPINE (narrative order → level → chapter scene ID → status)
M1  Uiju, the raid & ford ............ L1  ch1   LOCKED   (father's lessons; ford cutscene; Batu = 7th man)
M2  Guangning market ................. L2  ch2   LOCKED   (Kang intro; Zhao buys her; "six men, winning")
M3  Five Winters, House of Zhao ...... L3  ch3   LOCKED   (Y1 Mingzhu+cave seed; Y2 sword; Y3 Lan throw + Jin;
                                                          Y4 Kang treason; Y5 kiss→mingzhu death→window→vow)
M4  Two Masks (rooftops) ............. L4  ch4   LOCKED   (recognition cutscene; ult unlock; "I had it"; riddle)
M5  Lake & Cave ...................... L5  ch5   LOCKED   (fragments; 3 letters; Crane's Wing; Winter Bow 15→22)
M6  The Third Water (Yalu) ........... L6  ch6   LOCKED   (Batu boss/charger; Danbi NAMED; "turning from home")
M7  The Name They Gave You ........... L11 ch7w  LOCKED   (waystation; Namgil intro; fatal order; gogae/song;
                                                          Ohan field-desk "how she will be taken")
M8  Two Kings, One Girl .............. L12 ch8j  LOCKED   (shrine; Colonel Wei; Inspector Yun+seal; OK-HUI
                                                          homecoming/back gate; cairn; old soldier knew father)
SA  The Child Between Crowns ......... L14 ch8c  LOCKED   (falling court; baby rescue; DARAGUL flashback+reunion;
                                                          the careful man/"seja"; theme: sees people)
M9  The Machine, Not the Man ......... L7  ch7   LOCKED   (Liaoyang alive→burning; Zhao "what kind of man when I
                                                          fail"; Namgil graves/surgeon; Kang spared at hub;
                                                          rooftop dance = Zhao sees Jin; "names are promises")
M9b The Ledger Road (pass) ........... L8  ch8   LOCKED   (intercept copy; red-ink "two schools. Confirm.";
                                                          a8_jin night watch: leads Shenyang, Korean practice)
M10 The Last Road to Shenyang ........ L13 ch10r LOCKED   ("village that learned to walk"; "Are we free now?";
                                                          bridge dilemma; Namgil lance/limp/"which arithmetic";
                                                          Ohan trap dispatch + SEJA western-routes letter)
M10b Shenyang yards .................. L9  ch9   LOCKED   (moonlit city; cages; Kang judged "change everything
                                                          else"; Ohan rampart nod; Zhao/Lan farewell + ledger page)
M11 The Third Crossing (finale) ...... L10 ch10  LOCKED   (mirrored ford; Ohan "I account"; wolf boss; five-teacher
                                                          victory; DANBI speech; grave; child archery "Again"; 끝)

## SCENE-ID PREFIX MAP
a1_..a6_ = Act1 · a7w_=M7 · a8j_=M8 · a8c_=side arc · a7_/a9m_=M9 · a8_=pass · a10r_=M10 · a9_=yards · a10_=finale

## FLOW REWIRE POINTS (where insertions attach)
a6_end→ch7w · a7w_ohan→ch8j · a8j_leave→ch8c · a8c_end→ch7 · a7_zhao→a9m_namgil→a9m_hub→a9m_kang→a7_dance→a9m_ledger→ch8
a8_ledger→a8_jin→ch10r · a10r_ohan→ch9 · a9_out→ch10 · a10_end→RESET

## CHARACTERS (canon essentials)
SEOL    protagonist; terse voice; reflex = toward cages; "you are my people too"
JIN     partner not rescuer; Crane's Wing; clumsy-Korean-on-purpose; asked HER to lead Shenyang
ZHAO    alive; dispersed west with Lan (M10b farewell); "second daughter"; "biggest word I know now"
LAN     alive, west with Zhao; counter-ledger (counts the freed, first entry = Seol); skill ③
MINGZHU dead Y5; secret artist; cave letters; Winter Bow ("snow may fall; the arrow flies home")
KANG    ALIVE post-yards: judged by the freed, marched to Joseon; "change everything else" exchange done
BATU    DEAD (M6, ice); charger mechanic; killed her father from behind mid-embrace
OHAN    DEAD (M11, ice); Plain Blue Banner; red ink; wolf mechanic (guard/flurry/spent); "I account"
NAMGIL  ALIVE; limp from the bridge; "expensive... which arithmetic I want to be haunted by"; portrait 岗
DANBI   Yalu girl (M6) → homecoming speech (M11); mill village below Uiju
OK-HUI  M8; "my daughter died in the war"/back gate; left with Seol; teaches archery badly in epilogue
YUN     Joseon inspector; gave personal seal; sympathizer trapped by court
WEI     Ming colonel; gave maps; "the war would win, it always does"
DARAGUL Jurchen; raid-night friend (water+wooden horse, "Dara"/"Seol"); reunion unnamed-by-pact; ALIVE
SEJA    "the careful man," unnamed Joseon successor; hid the baby (miller family); sends western-routes intel

## CUTSCENES (CUTSPECS, all staged puppet + skippable; asset slots open)
ford(16s) · kiss(12s) · mingzhu(18s, 4s stillness hold) · recognition(10s) · lake(12s)

## COMBAT/SKILLS (no stats — teachers)
X fists(father)→sword(Zhao,Y2) · ①dash(Zhao) · ②bow(father)→Winter Bow(Mingzhu, 22dmg) · ③counter(Lan,Y3,flag sk3)
④Dance ult(Jin, M4 recognition; cd 20s→28s at level≥7) · kill-heal 12→6 at level≥7
Bosses: Batu charger(bwind/bcharge/bslide ×2dmg) · Ohan wolf(wguard 10%dmg no-stagger / flurry / wopen ×2)

## LEVELS 1-14 (build keys)
1 Uiju village · 2 market · 3 estate · 4 rooftops · 5 lake(+cave sub-areas) · 6 frozen Yalu · 7 Liaoyang burning
8 pass · 9 yards · 10 ford dawn · 11 waystation · 12 border shrine · 13 road/north bridge · 14 hill palace

## CHAPTER CODES (level-select)
MARKET2 ESTATE3 MASKED4 LAKE5 RIVER6 SIEGE7 LEDGER8 YARDS9 HOME10 WAYSTATION11 SHRINE12 ROAD13 CROWNS14

## PORTRAIT SLOTS (anim.js ASSETS, all url:null → glyph fallback)
seol father kang zhao mingzhu lan jin batu namgil yun okhui wei wang daragul seja

## OPEN CALLBACK THREADS (safe insertion hooks for future content)
- Daragul: unnamed-pact intact; natural return point = the ford or Shenyang
- Seja's "excellent memory": one letter used (M10); more possible
- Ok-hui's "someday in daylight" market-square promise: partially paid by Danbi scene; her own beat possible
- Namgil post-war fate: unresolved by design ("watch a little longer")
- Asset phase: portraits → VFX → cinematics via frozen injection API (nothing generated yet)

## GRAPHAUDIT LEVEL ORDER (must match narrative)
[1,2,3,4,5,6,11,12,14,7,8,13,9,10]
