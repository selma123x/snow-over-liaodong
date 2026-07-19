/* ============ SNOW OVER LIAODONG — linear story, v2 ============
   Act 1: Uiju, Joseon — the raid, her father.
   Act 2: Guangning market — Kang, General Zhao.
   Act 3: Five years in the House of Zhao — Mingzhu, training, Jin,
          the dance, the kiss, the fall, the vow.
   Act 4: Years later — the masked mission, the recognition.
   Act 5: The lake.
   Act 6: The frozen Yalu — Kang, Batu, and the way home.
   All scenes short. No branches. The game is in the world.        */

const SCENES = {

/* ================= ACT 1 · KOREA ================= */
ch1:{
  chapter:true, mark:'一', crumb:'Uiju · Joseon', code:null,
  eyebrow:'Uiju, Joseon · Winter · Age 11',
  title:'The Archer\u2019s Daughter',
  text:`<p>You are <b>Baek Seol</b> — <span class="kr">백설</span>, <em>white snow</em>. Your father is an archer of the border garrison, and you are all he has. He teaches you the bow — dawn after dawn — and bare-handed ssireum in the threshing yard at dusk, until the boys refuse to face you.</p>`,
  choices:[{t:'Morning drill.', to:'a1_drill'}]
},
a1_drill:{
  eyebrow:'Uiju · The Last Morning', crumb:'Uiju',
  title:'His Lessons',
  speaker:'father',
  text:`<p>"Again," he says, and you draw the bow again. Then empty hands, hip and shoulder, the throw that ends arguments. He gives you both, gladly — the far fight and the near one. "A blade in front of you is a problem," he says. "A blade behind you is a funeral. <em>Never</em> stop listening behind you."</p>`,
  choices:[{t:'Again.', to:'a1_raidgo'}]
},
a1_raidgo:{
  eyebrow:'Uiju · The Last Morning', crumb:'Uiju',
  title:'Horns',
  text:`<p>Smoke on the north wind. Horns. Riders in the millet — <b>raiders</b>, crossing the frozen river. Your father is already running toward you.</p>
  <p class="whisper">He does not reach you in time. Rope. A saddle. The village burning behind.</p>`,
  choices:[{t:'They carry you toward the river.', to:'WAVE:CINE:ford:a1_rescue'}]
},
a1_rescue:{
  eyebrow:'Uiju · The River Road', crumb:'Uiju',
  title:'He Comes For You',
  speaker:'father',
  text:`<p>He catches them at the ford. One man, on foot, against seven. You watch your father take them apart — the first with an arrow, the last with his hands. Six men down in the snow.</p>
  <p>Then his arms are around you, and he is saying your name into your hair, and for one breath the world is safe —</p>
  <p>— and his arms go slack. You feel it before you understand it. The seventh man. From behind.</p>
  <p class="whisper">A blade behind you is a funeral. He taught you that. He was holding you when he stopped listening.</p>`,
  choices:[{t:'They pull you off him. The river crosses under you.', to:'ch2'}]
},

/* ================= ACT 2 · THE MARKET ================= */
ch2:{
  chapter:true, mark:'二', crumb:'Guangning', code:'MARKET',
  eyebrow:'Guangning, Liaodong · Weeks Later',
  title:'The Market of Old Kang',
  text:`<p>They sell people here between the silk and the salt fish. The fat merchant who owns the chains is called <b>Kang</b>. He smiles at buyers and counts everything.</p>
  <p class="whisper">Your wrists have learned his ropes. Today the knot is careless.</p>`,
  choices:[{t:'The knot is careless.', to:'a2_break'}]
},
a2_break:{
  eyebrow:'Guangning · The Market', crumb:'Guangning',
  title:'Loose',
  text:`<p>You slip the rope, drop the nearest handler with his own club, and run — not for the gate. For the <b>cages</b>.</p>
  <p class="whisper">Fight through the handlers. Open every cage you can reach.</p>`,
  choices:[{t:'Move.', to:'a2_close1'}]
},
a2_kang:{
  eyebrow:'Guangning · The Market', crumb:'Guangning',
  title:'Old Kang',
  speaker:'kang',
  text:`<p>The crowd parts and the fat merchant is there, breathing hard, rings on every finger. He looks at his emptied cages, then at you, almost with wonder.</p>
  <p>"Do you know," he says pleasantly, "what you have <em>cost</em> me?" — and the back of his hand puts you on the stones.</p>`,
  choices:[{t:'The stones are cold. The sky turns.', to:'a2_zhao'}]
},
a2_zhao:{
  eyebrow:'Guangning · The Market', crumb:'Guangning',
  title:'The General',
  speaker:'zhao',
  text:`<p>A shadow between you and the second blow. An officer's boots. A voice used to being obeyed.</p>
  <p>"<b>General Zhao</b>," Kang says, suddenly all silk. "This is merchandise, general. Damaged merchandise."</p>
  <p>"Then you won't mind selling it cheap." He does not look at Kang. He is looking at you the way a man looks at a blade he has found in a scrap heap. "I watched her fight," he says. "You had six men. She was winning."</p>`,
  choices:[{t:'Sold. Again. But differently.', to:'ch3'}]
},

/* ================= ACT 3 · FIVE YEARS ================= */
ch3:{
  chapter:true, mark:'三', crumb:'House of Zhao', code:'ESTATE',
  eyebrow:'The House of Zhao · Five Years',
  title:'Five Winters',
  text:`<p>A garrison house with courtyards and koi. You arrive at eleven, feral and silent. You leave at sixteen changed. These are the five winters, one by one.</p>`,
  choices:[{t:'The first winter.', to:'a3_go'}]
},
a3_go:{
  eyebrow:'House of Zhao · Year One', crumb:'House of Zhao',
  title:'Lady Mingzhu',
  speaker:'mingzhu',
  text:`<p>The general's wife does not coo at you. She puts a brush in your hand. "Characters first. Then manners. Then everything else."</p>
  <p>When a visiting magistrate's wife calls you <em>that Korean thing</em> at dinner, Mingzhu sets down her cup very quietly. "In this house," she says, "we name people or we starve. Which will you choose?"</p>
  <p>Once, walking the hills, she nods at a dark seam in the rock above the lake valley. "I love that cave," she says, to no one in particular. "For the freedom it allows." You are eleven. You file it under things grown women say.</p>
  <p class="whisper">That night, unprompted, you thank her — in Chinese. Her whole face changes.</p>`,
  choices:[{t:'Year two.', to:'a3_y2'}]
},
a3_y2:{
  eyebrow:'House of Zhao · Year Two', crumb:'House of Zhao',
  title:'The General\u2019s Yard',
  speaker:'zhao',
  text:`<p>Zhao watches you beat the dust out of a quilt and sees the footwork in it. The next dawn there is a wooden sword by your sleeping mat. Your father gave you a soldier’s knife; the general means to give you a swordsman’s forms.</p>
  <p class="whisper">He drills you like a soldier, not a ward. Praise is a nod. You would kill for the nod. Train in the yard — the standing men of straw are yours.</p>`,
  choices:[{t:'Year three.', to:'a3_y3'}]
},
a3_y3:{
  eyebrow:'House of Zhao · Year Three', crumb:'House of Zhao',
  title:'The Daughter Who Throws, the Son Who Dances',
  speaker:'lan',
  fx:()=>{ S.flags.sk3=true; },
  text:`<p><b>Lan</b>, the general's daughter, four years your senior, drills you the way winter drills a mountain. Her specialty is the counter — wait, take the enemy's force, and return it with the ground attached. "Strength borrows," she says, dumping you on your back for the ninth time. "Balance <em>owns</em>."</p>
  <p>And <b>Jin</b> — her little brother, your age, ink on his fingers, forever humming. When Zhao drills him he turns every sword form into a turning, flowing thing, and the general walks away in disgust. "My son dances."</p>
  <p>You spar Jin once, to put the slacker in his place. You lose. He was never where your blade was — like fencing smoke that smiles. "It's just listening," he says, helping you up, infuriatingly kind. "With your whole body."</p>`,
  choices:[{t:'Year four.', to:'a3_y4'}]
},
a3_y4:{
  eyebrow:'House of Zhao · Year Four', crumb:'House of Zhao',
  title:'What You Know About Kang',
  speaker:'zhao',
  text:`<p>One evening Zhao asks about your family — in Korean. Rough, careful Korean, learned from a border officer. So you tell him: the raid, the river, and the thing he does not know — <em>the raiders reported to Kang.</em> The fat merchant does not just sell what others catch. He sends the catchers. And some of what he sells is <b>information — north, to the Jurchen.</b></p>
  <p>Zhao is very still for a long time. "I thought he traded slaves," he says at last. "He trades in my country's throat." After that, the general starts keeping a second ledger, in his own hand, of everything Kang moves.</p>`,
  choices:[{t:'Year five.', to:'CINE:kiss:a3_dance'}]
},
a3_dance:{
  eyebrow:'House of Zhao · Year Five', crumb:'House of Zhao',
  title:'The Dance',
  text:`<p>Sixteen. Jin finally teaches you properly, by the pond, evenings. "Stop trying to beat me. Move <em>with</em> me." And one evening you stop fighting it — and the two of you are one turning shape in the lantern light, blade-edge to blade-edge, never touching, reading each other like a language.</p>
  <p>The form ends. Neither of you steps back. The distance closes by itself.</p>
  <p class="whisper">The kiss tastes like the beginning of something. It is actually the end of everything.</p>`,
  choices:[{t:'That same month —', to:'CINE:mingzhu:a3_fall'}]
},
a3_fall:{
  eyebrow:'House of Zhao · Year Five', crumb:'House of Zhao',
  title:'The North Falls',
  text:`<p>The funeral is white, and enormous, and wrong — she would have hated the expense. Zhao stands through all of it like a man holding a wall up with his back. Lan runs the household's grief the way she runs everything: lists, provisions, guests fed — and only you see her hands shake over the accounts her mother taught her.</p>
  <p>And you — you keep reaching for the anger you learned at eleven, the old fire that carried you out of the first loss. It doesn't come. What comes instead is quieter and worse: you had a mother again, and you knew it only long enough to lose her.</p>
  <p class="whisper">Guided by someone who knew the roads. You will remember that phrase. Later, you will understand it.</p>`,
  choices:[{t:'Jin does not speak for days.', to:'a3_window'}]
},
a3_window:{
  eyebrow:'House of Zhao · Year Five', crumb:'House of Zhao',
  title:'The Window',
  text:`<p>Jin grieves the way he does everything — in motion arrested. Days of stillness, the dancer gone stone. Then one grey dawn there is a pack on his shoulder and his father's hands on his arms in the outer court, and you understand from a window what no one told you: <em>he is leaving. To find peace, or something like it.</em></p>
  <p>At the gate he looks up. Finds your window without searching, as if he always knew which one it was. Holds your eyes for three heartbeats.</p>
  <p class="whisper">Then he is gone. He never said goodbye to you. Perhaps that was the goodbye.</p>`,
  choices:[{t:'The general summons you.', to:'a3_vow'}]
},
a3_vow:{
  eyebrow:'House of Zhao · Year Five', crumb:'House of Zhao',
  title:'The Question',
  speaker:'zhao',
  text:`<p>Zhao stands in the ruined quiet of his house — wife buried, son gone, country folding. He asks it formally, like an officer, because it is the only way he can ask anything now:</p>
  <p>"When this war comes for us — and it is coming — will you serve China? Or will you go home, to your people?"</p>
  <p>You look at him a long moment. "<b>You are my people too.</b> I'll fight with you. But when we find Koreans in chains on this road — and we will — we free them. Every one. That is my price."</p>
  <p>The general — who nods instead of praising, who has not touched anyone since the funeral — crosses the room and holds you like a daughter. And in his arms you feel other arms, at a river ford, five years gone, and the tears come without asking.</p>`,
  choices:[{t:'Years pass. The war grinds on. You become good at it.', to:'ch4'}]
},

/* ================= ACT 4 · THE MASKED MISSION ================= */
ch4:{
  chapter:true, mark:'四', crumb:'Years Later', code:'MASKED',
  eyebrow:'Liaodong · Years Later · Night',
  title:'Two Masks',
  text:`<p>You run missions for Zhao's network now — a quiet war of ledgers, safehouses, and opened cages. Tonight: a holding compound on the roofs of a fallen town. Captives inside. Guards on the walls.</p>
  <p class="whisper">You work alone. You prefer it.</p>`,
  choices:[{t:'Go in.', to:'a4_go'}]
},
a4_clash:{
  eyebrow:'The Mission · Rooftops', crumb:'Years Later',
  title:'The Other Crew',
  speaker:'jin',
  text:`<p>You are not alone. Figures on the far roofline — masked, silent, moving like a troupe of acrobats. Ribbons and hooks. They're going for <em>your</em> captives.</p>
  <p>Their leader lands opposite you — tall, masked, unhurried. "This compound is spoken for," he says. A stranger's voice, low and even.</p>
  <p>"Funny," you say. "I was about to say that."</p>`,
  choices:[{t:'Argue. Loudly. On a rooftop. Professionals, both of you.', to:'a4_team'}]
},
a4_team:{
  eyebrow:'The Mission · Rooftops', crumb:'Years Later',
  title:'Same Target, Wrong Methods',
  text:`<p>His plan is all misdirection — smoke, wires, no one touched. Yours is a knife through the dark, fast and final. You call his way slow. He calls yours loud. You split the compound down the middle out of pure spite.</p>
  <p class="whisper">It works irritatingly well. Clear the guards. Free the cages.</p>`,
  choices:[{t:'Work.', to:'a4_close'}]
},
a4_ambushcut:{
  eyebrow:'The Mission · Rooftops', crumb:'Years Later',
  title:'It Was Never a Holding Compound',
  text:`<p>The last cage opens on empty straw. The gates you came through are now closed behind soldiers. Torches on every wall. It was bait — for people exactly like the two of you.</p>
  <p>The masked stranger draws his blade with a dancer's roll of the wrist. "Do try to keep up," he says.</p>`,
  choices:[{t:'Back to back. Fight.', to:'WAVE:CINE:recognition:a4_recognize'}]
},
a4_recognize:{
  eyebrow:'The Mission · Rooftops', crumb:'Years Later',
  title:'The Shape of You',
  speaker:'seol',
  text:`<p>There are too many. Thinking stops. Your body chooses for you — and it chooses <em>the pond, the lanterns, the turning form</em> — and the stranger flows into it with you like he has been waiting years for the invitation.</p>
  <p>Blade-edge to blade-edge, never touching. Two people cutting a circle out of a crowd of enemies, and neither of you is watching the enemies at all anymore. You are watching each other. You know this dance. You know this <em>dancer</em>.</p>
  <p>It ends. Everyone else is down. Two masks in the torch smoke, breathing hard.</p>
  <p>"...<b>Jin?</b>"</p>`,
  choices:[{t:'He pulls the mask down. Taller. Older. Him.', fx:()=>{ S.flags.dance=true; }, to:'a4_leftme'}]
},
a4_leftme:{
  eyebrow:'The Mission · Rooftops', crumb:'Years Later',
  title:'You Left',
  speaker:'seol',
  text:`<p>All the years arrive at once and what comes out is small and hard:</p>
  <p>"You left us." A breath. "You left <em>me</em>."</p>
  <p>He doesn't defend himself. His eyes do something complicated and sorrowful — and then move past your shoulder and go flat, and he <em>dashes</em> — hand at your waist, pulling you hard against him, his blade going out over your shoulder in the same motion —</p>
  <p>— into the throat of a soldier who had risen behind you.</p>
  <p class="whisper">For half a heartbeat you are sixteen, by a pond, in lantern light.</p>`,
  choices:[{t:'Shove him off. Hard.', to:'a4_hadit'}]
},
a4_hadit:{
  eyebrow:'The Mission · Rooftops', crumb:'Years Later',
  title:'I Had It',
  speaker:'seol',
  text:`<p>"<b>I had it.</b>" Your voice is level and dangerous. Then, a half-second later, entirely unlevel: "And <em>don't touch me</em>. I'm mad at you."</p>
  <p>He raises both hands, steps back — and doesn't argue. "I know you don't need me to save you," he says quietly. "You never did."</p>
  <p>"I need to think. Don't follow me."</p>
  <p>He bows his head — respect, not surrender. Then, at the roof's edge, he says something that stops your breath. In Korean. Clumsy, careful, learned-word-by-word Korean:</p>
  <p class="kr">"물이 거울처럼 조용한 곳… 산이 자기를 보는 곳. 해가 제일 높을 때. 내일."</p>
  <p><em>Where the water is quiet like a mirror… where the mountain sees itself. When the sun is highest. Tomorrow.</em></p>
  <p class="whisper">He speaks Korean. When did he — he's gone.</p>`,
  choices:[{t:'The next morning.', to:'ch5'}]
},

/* ================= ACT 5 · THE LAKE ================= */
ch5:{
  chapter:true, mark:'五', crumb:'The Lake', code:'LAKE',
  eyebrow:'The Next Day',
  title:'Very Busy, Actually',
  text:`<p>You wake up annoyed at yourself. So today you are <em>busy</em>. Extremely busy. With errands.</p>
  <p class="whisper">Sharpen the blade. Repack the bag. Sharpen the blade again. Do not think about lakes.</p>`,
  choices:[{t:'Be busy.', to:'a5_go'}]
},
a5_msg:{
  eyebrow:'The Next Day', crumb:'The Lake',
  title:'Stand By',
  text:`<p>A runner brings the day's orders in the sister-network's cipher. You unfold it, already rehearsing how you'll be far too occupied to go anywhere near any body of water.</p>
  <p>It says: <b>No mission. Stand by.</b></p>
  <p>"...Aaaargh."</p>`,
  choices:[{t:'Fine. FINE.', to:'a5_lake'}]
},
a5_lake:{
  eyebrow:'The Lake · Noon', crumb:'The Lake',
  title:'Where the Mountain Sees Itself',
  text:`<p>The water is glass. The mountain stands upside down in it. He is there at the shore, unmasked, and for once not moving at all — as if stillness were the gift he prepared.</p>
  <p>"You came," he says, in Korean. Still clumsy. Still learned for you.</p>
  <p>"I had nothing better to do," you say, in Chinese, and sit down beside him anyway.</p>
  <p>You talk until the mirror turns gold. About Mingzhu. About the window. About the years. He tells you why he left; you tell him what it cost. Neither of you apologizes exactly. Both of you forgive approximately. Then he stands, offers his hand, and doesn\u2019t quite meet your eyes. \u201cThere\u2019s somewhere I want to show you.\u201d</p>`,
  speaker:'jin',
  choices:[{t:'The dark seam in the rock above the valley.', to:'a5_cavego'}]
},
a5_cavego:{
  eyebrow:'The Cave', crumb:'The Cave',
  title:'His Whole Hidden Life',
  speaker:'jin',
  text:`<p>Inside the seam, the rock opens like a held breath: lanterns, hanging silk paintings, calligraphy drying on lines, a spring pooling black and gold, moss where the light falls through a crack in the ceiling. A boy's secret, kept so long it became a man's soul, hung on stone walls.</p>
  <p>"When did you start coming here?" you ask.</p>
  <p>"Small. With friends first — for the echo." He smiles at some old noise. "Then alone, to sing. The acoustics forgive everything. Then, when I was eight — to draw. Away from them." A beat. "No one ever knew."</p>
  <p>"Mingzhu did," you say, before you think. "She told me once she loved this cave. <em>For the freedom it allowed — the freedom to express what she couldn't say.</em>"</p>
  <p>Jin does not move. Jin does not breathe. "...She <em>what?</em>"</p>
  <p class="whisper">You never pondered it then. But what did she mean by that? The lantern light catches something in the cracks of the far wall — vertical, faint, deliberate.</p>`,
  choices:[{t:'Search the walls. The dark keeps what the light misses.', to:'a5_frag_go'}]
},
a5_stone:{
  eyebrow:'The Cave · The Message', crumb:'The Cave',
  title:'Written Where No One Reads',
  speaker:'jin',
  text:()=>`<p>Five fragments, vertical in the cracks, in a woman's hand disguised as water stains. Assembled, they say:</p>
  <p><em>"I followed my son when he was eight, and found his kingdom, and said nothing — because a named freedom dies. So I came alone instead, when the house grew too small for everything I was not permitted to say. I wrote in the dark, where no one reads. It was the only freedom on offer, and it was enough, because from these walls I watched my children become themselves.</em></p>
  <p><em>If you are reading this, you learned to see in the dark, as I did. Look beneath the singing stone."</em></p>
  <p>Jin's voice, when it finally comes, is a boy's: "The singing stone. Where the echo is best. I stood on it a thousand times."</p>`,
  choices:[{t:'Lift it. Together.', to:'a5_letters'}]
},
a5_letters:{
  eyebrow:'The Cave · Beneath the Stone', crumb:'The Cave',
  title:'The Lacquered Box',
  speaker:'mingzhu',
  text:`<p>Paintings. Dozens — her own, signed with a seal neither of you has ever seen: her maiden name. She was an artist. All those years, the general's silent wife, painting in a cave in the dark. Jin holds one up to the lantern with shaking hands — it is <em>good</em>, it is where he comes from, and he never knew.</p>
  <p>Beneath the paintings: three letters. One for Lan. One for Jin — and you watch him read it, watch the lines land: <em>"You will leave, my dove. Grief will make you run, because your heart moves before your feet, it always has. Do not be ashamed of it. But go back for the girl. I watched you two by the pond — two rivers pretending they don't share a sea. What I could not say aloud, I say here: be together. Life is short; the ice is long; love loudly, for both of us."</em></p>
  <p>He looks up at you, wrecked and lit at once.</p>
  <p class="whisper">She predicted the window. She forgave him years before he did it. And so — finally, fully, out loud in your own chest — so do you.</p>`,
  choices:[{t:'"We’re alright, Jin. We were always going to be." — friends again, and more, and finally.', to:'a5_third'}]
},
a5_third:{
  eyebrow:'The Cave · The Third Letter', crumb:'The Cave',
  title:'The Daughter Winter Brought Me',
  speaker:'mingzhu',
  text:`<p>The third letter is addressed in careful characters: <em>"For the daughter winter brought me."</em></p>
  <p><em>"Seol. My father was a master blacksmith — the finest in three provinces, though the world forgot, because his daughter was only permitted to marry, not to forge. Two of his works I kept. I leave them hidden in this cave, one for each of you, where only people who see in the dark deserve to find them. Take the high ledge and the water's secret. The steel remembers what I could not say. — Your mother in everything but blood."</em></p>
  <p class="whisper">Two weapons. Hidden. Hers to give, at last.</p>`,
  choices:[{t:'Find them.', to:'a5_hunt_go'}]
},
a5_sword:{
  eyebrow:'The Cave · The High Ledge', crumb:'The Cave',
  title:'The Crane’s Wing',
  speaker:'jin',
  text:`<p>On the high ledge, wrapped in oiled silk: a sword like nothing sane — blade curved the wrong way, weighted at the tip, a hilt long as a forearm. A <em>terrible</em> sword. For anyone on earth but one person.</p>
  <p>Jin takes it and it disappears into motion — a wheel, a ribbon, a wing — built for a man who fights like water arguing with the wind. Etched down the spine, her father's hand: <span class="kr" style="color:#6c3f14">舞而不斗, 斷而不怨</span> — <em>"Dance, do not brawl; end, do not hate."</em></p>
  <p>"It's hideous," you say, honestly, a little jealous of neither the sword nor the man, obviously, shut up.</p>
  <p>"It's <em>perfect</em>," he breathes, and spins it again, showing off now, absolutely showing off for you.</p>`,
  choices:[{t:'"The water’s secret." Yours is under the spring.', to:'a5_bow'}]
},
a5_bow:{
  eyebrow:'The Cave · The Water’s Secret', crumb:'The Cave',
  title:'The Winter Bow',
  speaker:'jin',
  text:`<p>Beneath the spring, in a stone-lined dry hollow: a bow of black horn and pale birch, strung with something that sings when the air touches it. It draws like breathing out. It is, instantly and unarguably, the finest thing you have ever held — your father would have wept over the workmanship.</p>
  <p>Etched along the upper limb: <span class="kr">눈은 내리되, 활은 집으로</span> — <em>"Snow may fall; the arrow flies home."</em></p>
  <p>"She etched yours in Korean," Jin says quietly. "She must have learned the letters just to —" He stops, because you are crying, and then you are laughing, and the acoustics of the cave forgive everything.</p>
  <p class="whisper">The Winter Bow. A mother's protection, drawn taut.</p>`,
  choices:[{t:'String it. Then — to business.', to:'a5_intel'}]
},
a5_intel:{
  eyebrow:'The Cave · Dusk', crumb:'The Cave',
  title:'Kang',
  speaker:'jin',
  text:`<p>"The man we were both hunting last night," Jin says, "works for an old name. <b>Kang.</b> Fatter now, richer now — he sells captives north across the Yalu, and he sells the border's secrets with them. Tonight he moves a whole column of Koreans across the ice. His Jurchen partner rides escort. A raider captain called <b>Batu</b>."</p>
  <p>The name goes through you like river cold. <em>Batu.</em> A ford, five years old, a blade from behind.</p>
  <p>"My people are already moving," Jin says. He looks at you — beside him, this time, not in front. "Fight with us. With <em>me</em>. As equals, or not at all."</p>
  <p>"As equals," you say. "Try to keep up."</p>`,
  choices:[{t:'Tonight. The river.', to:'ch6'}]
},

/* ================= ACT 6 · THE YALU ================= */
ch6:{
  chapter:true, mark:'六', crumb:'The Yalu', code:'RIVER',
  eyebrow:'The Frozen Yalu · Night',
  title:'The Third Water',
  text:`<p>The border river, frozen bank to bank, a black channel of open water down its spine. Torches on the ice: Kang's column — chained captives, sledges of ledgers and silver, and riders in wolf-fur. On the far shore: <b>home</b>, for the first time in years, close enough to smell the woodsmoke.</p>
  <p class="whisper">Jin's dancers are shadows on the west bank. The captives are the mission. Batu is yours.</p>`,
  choices:[{t:'Onto the ice.', to:'a6_go'}]
},
a6_batu:{
  eyebrow:'The Yalu · The Column', crumb:'The Yalu',
  title:'The Seventh Man',
  speaker:'batu',
  text:`<p>He is older, broader, grey in the wolf-fur. He watches you come across the ice and something like memory moves behind his eyes.</p>
  <p>"The archer's girl," Batu says at last, and smiles. "He was good, your father. Six of mine. I still count it."</p>
  <p>"Count this," you say, and draw.</p>`,
  choices:[{t:'Finish it.', to:'WAVE:a6_win'}]
},
a6_win:{
  eyebrow:'The Yalu · The Ice', crumb:'The Yalu',
  title:'Settled',
  text:`<p>He is strong. You are <em>trained</em> — by an archer of Joseon, by a general of Ming, by a dancer who taught you to listen with your whole body. Batu commits to a line, the way linear men do. You are never on it.</p>
  <p>The ice takes him with a single black swallow, and the river — your river — closes over the seventh man.</p>
  <p>Across the ice, Kang is on his knees in the snow with a dancer's blade at his collar and his ledgers burning beside him. Jin's people are already striking chains. The column of captives stands loose on the ice, not yet believing it.</p>`,
  choices:[{t:'Speak to them. In Korean.', to:'a6_free'}]
},
a6_free:{
  eyebrow:'The Yalu · The Crossing', crumb:'The Yalu',
  title:'Go Home. Walk Tall.',
  speaker:'seol',
  text:`<p>"The far bank is Joseon," you tell them, in the language of your mother's songs. "Walk. Don't run — the ice holds if you walk."</p>
  <p>A girl your old age hesitates. "My family — what they'll say, about where I've been—"</p>
  <p>"Then say it first, and say it loud," you tell her. "You survived. That is the whole story. Anyone ashamed of you should try surviving it themselves." You say it like an order, because she needs it to be one. She squares her shoulders.</p>
  <p>"Danbi," she says, at the edge of the ice — her name, offered like a debt acknowledged. "From the mill village below Uiju. If you ever cross—" She doesn't finish it. She walks.</p>
  <p class="whisper">One by one, they cross. You count every head that reaches the far bank.</p>`,
  choices:[{t:'And then it is your turn to decide.', to:'a6_end'}]
},
a6_end:{
  eyebrow:'Epilogue', crumb:'Epilogue',
  title:'Snow over Liaodong',
  text:`<p>You stand on the ice between two countries. Behind you, a war, a general who calls you daughter in everything but blood, and a network with a hundred cages still to open. Ahead, woodsmoke and the graves of Uiju.</p>
  <p>Jin comes to stand beside you — beside, always beside now — and looks where you're looking.</p>
  <p>"We can come back across whenever you want," he says. In Korean. Getting better at it.</p>
  <p>"I know," you say. "First — we go back to work. There are more cages." You look once more at the woodsmoke of home, and turn from it, because turning from it is how you'll earn it.</p>
  <p class="whisper">End of Act One.</p>`,
  choices:[{t:'Act Two · The Woman on the River', to:'ch7w'}]
},

/* ================= ACT 2 · M7 · THE NAME THEY GAVE YOU ================= */
ch7w:{
  chapter:true, mark:'七', crumb:'The Waystation', code:'WAYSTATION',
  eyebrow:'The Borderland · A Year of Winters Later',
  title:'The Name They Gave You',
  text:`<p>A year, and the one cage on the Yalu has become a hundred cages, unlocked across a hundred nights. The freed do not vanish home the way you imagined — there is no home left to vanish to. They gather. They follow the rumour of a name.</p>
  <p class="whisper">Somewhere below the pass, in a ruined Ming waystation, the name has become a place. They are waiting for you to arrive and tell them what happens next. You do not know what happens next.</p>`,
  choices:[{t:'Come down into the valley.', to:'a7w_arrive'}]
},
a7w_arrive:{
  eyebrow:'The Waystation · Dusk', crumb:'The Waystation', speaker:'seol',
  title:'What a Name Becomes',
  text:`<p>You crest the pass and stop, because you were not ready for the size of it. A dead Ming relay post — walls half-standing, a collapsed watchtower — and around it, tents. Cook-fires. Washing on lines. Children. Hundreds of people who are alive because of a thing you did with your hands, and who now need a thing you have never done: to be <em>led</em>.</p>
  <p>An old woman looks up from a fire, sees you, and says it soft, the way you say a word in prayer: "The Woman on the River." Then everyone is looking. Not with fear. With something worse. With <em>hope</em>.</p>
  <p class="whisper">Saving one cage was courage. This — this is a country the size of a ruin, and it is yours, and you have no idea how to keep it warm.</p>`,
  choices:[{t:'Walk among them.', to:'a7w_go'}]
},
a7w_namgil:{
  eyebrow:'The Waystation · The Long Table', crumb:'The Waystation', speaker:'namgil',
  title:'The Man Who Counts the Cost',
  text:`<p>He is at the map before you reach it — broad, unhurried, a burn scar up one forearm, the calm of a man who has already done today's grieving. <b>Namgil.</b> You freed him at Guangning, that first night, the third cage from the gate. He has been freeing others ever since, and thinking, which is more dangerous.</p>
  <p>"Two hundred and six mouths," he says, without looking up. "Grain for nine days. Three passes the Qing don't watch yet — yet. And a patrol sighted north this morning." He finally meets your eyes, and there is no challenge in it, which is what makes it land. "I would follow you into any fire, Seol. I have. But I need to say a thing, and I need you to hear it as love, because it is."</p>
  <p>"Say it."</p>
  <p>"We empty a cage. The Qing fill two. We are bailing the sea with cupped hands and calling it a rescue." A breath. "Somewhere there is a granary that feeds the columns. A magistrate who signs the manifests. A bridge the whole traffic crosses. Burn those, and a thousand cages never fill. We keep saving the ones in front of us — and letting the ones behind them drown."</p>
  <p class="whisper">He is not wrong. That is the terrible part. He is not wrong, and he is not cruel, and half the camp already thinks the way he does.</p>`,
  choices:[{t:'"We are not an army, Namgil." / "Not yet," he says.', to:'a7w_song'}]
},
a7w_song:{
  eyebrow:'The Waystation · Nightfall', crumb:'The Waystation', speaker:'seol',
  title:'A Word You Had Forgotten',
  text:`<p>You walk the camp to clear the argument out of your chest, and that is when you hear it — thin, across the dark, from the women's fire near the wall. A song. In <em>Korean</em>. A planting song, the kind grandmothers sing to make the work shorter, and you have not heard it in nine years.</p>
  <p>A small girl, five or six, sings a word wrong, and an old woman gently corrects her, and the correction is a word you had forgotten you knew. It arrives in your mouth before your mind: you find yourself mouthing it. <span class="kr">고개</span>. <em>Gogae.</em> The mountain pass a traveller crosses to get home.</p>
  <p>The old woman sees your lips move. She studies your face a moment, and something in it makes her sit up. "That accent," she says, in Korean, wondering. "Uiju? The garrison villages?" You do not trust your voice to answer. She nods slowly, as if you had. "I thought so. You sing like the river."</p>
  <p class="whisper">You did not abandon China. You love that house, those graves, that man who calls you daughter. And yet a song you did not choose to remember has just opened a door in you that never fully closed, and behind it is a country, and it is also yours, and you belong completely to neither. That is the wound no one warned you about.</p>`,
  choices:[{t:'Then — the horns.', to:'a7w_patrol'}]
},
a7w_patrol:{
  eyebrow:'The Waystation · The Alarm', crumb:'The Waystation', speaker:'namgil',
  title:'Three Passes, Two Hands',
  text:`<p>The patrol did not pass. It turned. Riders on the north track, torches, coming for the rumour to see if it bleeds. And the camp cannot move as one — the old, the wounded, the children go slowly, and there are <em>three</em> ways out of the valley, and you have people enough to hold only <em>two</em>.</p>
  <p>Namgil is already beside you, hard and quiet. "West gully is fastest but narrow — if it jams, everyone in it dies. The east track is open but long. The mill road is closest to the wounded but nearest the riders." He looks at you. Not arguing now. Waiting. "You have to choose which road we don't hold. Whoever's on it, we can't cover. That is the order. Give it."</p>
  <p class="whisper">This is the thing no one tells you about the name. Somewhere in this valley, people are about to live or die by a sentence out of your mouth. Choose. Then carry it forever.</p>`,
  choices:[{t:'Hold the west and the mill. Get the wounded out first.', fx:()=>{ if(S&&S.flags){S.flags.m7order=true;} }, to:'WAVE:a7w_after'}]
},
a7w_after:{
  eyebrow:'The Waystation · After', crumb:'The Waystation', speaker:'seol',
  title:'The Cost of a Sentence',
  text:`<p>It works, mostly. The wounded live. The west gully holds. But the east track — the one you could not cover — you hear, later, from the two who made it: a family caught in the open, an old man and his grandson, a mother. The riders were thorough. Namgil's people reached the track at dawn and buried what they found.</p>
  <p>You gave the order that saved the many. You also gave the order that named the dead. Both were the same sentence. No one blames you. That is the worst of it — they look at you with the same hope as before, as if you did not just trade three lives for two hundred, as if leadership were not exactly this arithmetic performed in public with your own conscience as the coin.</p>
  <p>Namgil finds you where you have gone to be sick and does not mention it. "You chose well," he says. "That is not the same as choosing rightly. There is no rightly. Only well, and less well." He crouches beside you. "That is what I have been trying to tell you. This is what the work is now. Not courage. <em>This.</em>"</p>
  <p class="whisper">Saving one cage was an act of courage. Carrying two hundred freed people is an act of leadership, and leadership is a knife you hold by the blade.</p>`,
  choices:[{t:'Then — something in the ash by the east track.', to:'a7w_ohan'}]
},
a7w_ohan:{
  eyebrow:'The Waystation · Dawn', crumb:'The Waystation', speaker:'namgil',
  title:'Someone Is Watching the River',
  text:`<p>Namgil brings it to you wrapped in cloth, the way you carry something you do not want to touch. A field-desk, abandoned by the riders in their hurry — and inside it, not orders, not maps. <em>Observations.</em> Pages of them, in a patient red hand you have never seen and will never forget.</p>
  <p>Someone has been recording the camp for weeks. Grain estimates. The count of the freed. The three passes. A sketch of the west gully. And, near the end, underlined once: <em>"The Woman on the River will not abandon the slow. She holds the roads that protect the weak and sacrifices the road that protects herself. Predict: she gives the order she can least live with. This is not weakness. Study it. It is how she will be taken."</em></p>
  <p>Namgil reads it over your shoulder and goes very still. "This isn't a soldier," he says quietly. "Soldiers want to kill you. This one wants to <em>understand</em> you first."</p>
  <p class="whisper">He has a name, though you do not know it yet. He signs nothing. He does not need to. Somewhere across the river, a man is reading you like a ledger — and he is not wrong either.</p>`,
  choices:[{t:'Fold the pages. Keep them. Learn the shape of the shadow.', fx:()=>{ if(S&&S.flags){S.flags.m7done=true;} }, to:'ch8j'}]
},

/* ================= ACT 2 · M8 · TWO KINGS, ONE GIRL ================= */
ch8j:{
  chapter:true, mark:'八', crumb:'The Border Shrine', code:'SHRINE',
  eyebrow:'The Joseon Bank · First Thaw',
  title:'Two Kings, One Girl',
  text:`<p>Two letters reach the waystation in the same week. One in Ming military hand, from a colonel of the collapsing border army, requesting parley. One in careful court Korean, on paper finer than anything you have touched since childhood, inviting "the Woman on the River" to a mountain shrine on the Joseon bank — to discuss, it says, <em>the matter of the returned</em>.</p>
  <p class="whisper">Two dying kingdoms, and both of them have finally learned your name. You cross your own river for the first time in ten years — invited, this time. It should feel like victory. It feels like walking into a house where you no longer know which rooms you are allowed in.</p>`,
  choices:[{t:'The mountain path, at first light.', to:'a8j_go'}]
},
a8j_soldier:{
  eyebrow:'The Shrine Path · Morning', crumb:'The Border Shrine', speaker:'seol',
  title:'The Man at the First Gate',
  text:`<p>An old soldier keeps the shrine path — too old for the wall now, one shoulder higher than the other, a border man's squint. He hears you give your name to the escort, and his whole face changes the way ice changes when the river moves under it.</p>
  <p>"Baek," he says. "Of Uiju garrison. There was an archer — " He stops. Looks at you properly. At your hands, at how you stand. "There was an archer of that name who could put a shaft through a willow leaf in a crosswind. Stubborn as a stone in a boot. He had a daughter he would not stop talking about." His voice does not quite hold. "You have his draw. I watched you walk up the hill and I thought, there is Baek's draw, walking."</p>
  <p>You had not cried yet on this mountain. You had planned not to.</p>
  <p>"He was my friend," the old man says simply. "Whatever they say inside — and they will say things, girl — his daughter walks this path with her head up. That is all. Go on up."</p>`,
  choices:[{t:'Up, past the prayer ribbons.', to:'a8j_ming'}]
},
a8j_ming:{
  eyebrow:'The Shrine · The Outer Hall', crumb:'The Border Shrine', speaker:'wei',
  title:'The Colonel Who Is Losing',
  text:`<p><b>Colonel Wei</b> has crossed the river quietly, without banners, which tells you what is left of Ming pride. He is younger than his grey. He puts a map between you and speaks like a man rationing his own breath.</p>
  <p>"I will not flatter you. Liaodong is lost. I intend to lose it <em>slowly</em>, and make the losing expensive, because every month I buy is a month of villages that do not burn. Your network sees roads I cannot. Fold it into my command and I can arm you, feed you, legitimize you."</p>
  <p>"And when your war needs those roads more than the people on them?"</p>
  <p>He does not pretend to be insulted. He looks at the map for a long moment. "Then the war would win. It always does. That is an honest answer; I ask you to respect it." He rolls the map and pushes it across to you anyway — routes, garrisons, fords. "For when you refuse me. Which you are about to." A tired, real smile. "I will die correcting my betters' mistakes, girl. It is good work. It is just not yours."</p>
  <p class="whisper">He believes it completely: victory first, or the suffering never ends. He is not wrong the way villains are wrong. He is wrong the way soldiers are — from inside a duty he cannot put down.</p>`,
  choices:[{t:'The inner shrine. The court\u2019s man waits.', to:'a8j_court'}]
},
a8j_court:{
  eyebrow:'The Shrine · The Inner Hall', crumb:'The Border Shrine', speaker:'yun',
  title:'Inspector Yun',
  text:`<p><b>Inspector Yun</b> serves the Border Defense Command, which means he serves the court's fear with a scholar's manners. He pours your tea himself — a courtesy, and a message: no servants, no witnesses. He is precise, quiet, and visibly, carefully tired.</p>
  <p>"The court has heard of you. Some call you a heroine of the people. Some call you a bandit queen with an army of the shamed." He lets that word sit, watching you not react. "I am sent to offer this: legitimacy. Protection. Supply. The kingdom's quiet gratitude." A pause, the exact length of honesty. "On conditions. The women you return — the court asks that they come home <em>quietly</em>. Unannounced. Dispersed. No columns crossing the ice in daylight, no names spoken in market squares. And you will give us your lists, so the families can be… prepared."</p>
  <p>"Prepared to deny them."</p>
  <p>"Prepared to <em>survive</em> them," he says, and for one unguarded moment the mask slips and underneath is a man who hates every word of his own instructions. "You think I do not know what I am asking? I have a daughter. But I serve a court that fears scandal more than it fears the Jurchen, in a country where a rumor kills a woman as surely as a blade, only slower. I cannot change the water these families swim in. I can only offer you a way to move through it without drowning the people you carry. Change comes, Woman on the River. It comes <em>slowly</em>, or it comes over corpses."</p>
  <p>"It is already over corpses," you say. "You have only been asked not to look at them."</p>
  <p class="whisper">He does not argue. That is the worst of it. Nobody in this shrine is lying to you. They are all telling you the truth from inside walls they did not build and cannot leave.</p>`,
  choices:[{t:'No lists. No hiding. You walk out into the snow.', to:'a8j_okhui'}]
},
a8j_okhui:{
  eyebrow:'The Village Below · Dusk', crumb:'The Border Shrine', speaker:'okhui',
  title:'Ok-hui Comes Home',
  text:`<p>You did not come to the shrine alone. <b>Ok-hui</b> travelled with you — freed at Shenyang's borderposts last autumn, twenty years old, from this very valley. She has talked about this village for three hundred li: the well, the persimmon tree, her mother's hands. She practically runs the last slope, and you let her, because hope like that should be allowed to run.</p>
  <p>Her mother is at the well at dusk, exactly where Ok-hui said she would be. You watch the recognition hit the older woman like weather — the bucket set down slowly, the two steps forward, the hands rising to her daughter's face — and then you watch her <em>see the neighbours seeing</em>, and the hands stop an inch away, and fold themselves into her sleeves, and the two steps become a formal half-bow to a stranger.</p>
  <p>"You have the look of my daughter," the mother says, loudly enough for the yards around to hear. "My daughter died in the war." And then, so quietly it barely survives the distance between their bodies: <em>"Come to the back gate. After dark. Every night, my love. Every night I will be there."</em></p>
  <p>The father never comes out. Late that night, someone leaves a bundle on the wall: a child's jacket, carefully kept for ten years, and food wrapped in cloth, still warm. Her brother's footprints, already filling with snow.</p>
  <p class="whisper">No one in that house stopped loving her. That is the unbearable part. There is no cage here to cut, no slaver to throw. Only a whole village's worth of watching eyes, and a family doing the arithmetic of survival in a world that made love a liability. You stand in the dark with your hands empty. For the first time since the market at Guangning, there is nothing for your hands to do.</p>`,
  choices:[{t:'Then — horns across the water. Qing scouts, on the Joseon bank.', to:'a8j_raid'}]
},
a8j_raid:{
  eyebrow:'The Village · Night Alarm', crumb:'The Border Shrine', speaker:'seol',
  title:'Whose Country, Whose Blood',
  text:`<p>A Jurchen scouting party has crossed the thawing river — a probe, a torch-raid, the war testing Joseon's door. The village that would not look at Ok-hui is screaming. The court's escort is a mountain away. There is only you, and her, and the dark.</p>
  <p>Ok-hui is already moving — toward the village that renamed her a dead stranger an hour ago. You catch her eye. "They — " she starts, and cannot finish it, and does not need to. <em>They are still mine.</em></p>
  <p class="whisper">Inspector Yun will hear of this by morning: the bandit queen and one of her shamed, bleeding for a village that would not say their names. Fight.</p>`,
  choices:[{t:'Defend them. All of them. It was never conditional.', to:'WAVE:a8j_after'}]
},
a8j_after:{
  eyebrow:'The Village · Before Dawn', crumb:'The Border Shrine', speaker:'yun',
  title:'What Cannot Be Said Aloud',
  text:`<p>The scouts are driven back across the ice. The village stands. And in the grey before dawn, Inspector Yun comes down the mountain on foot, alone, and finds you binding a cut on Ok-hui's arm while the well-yard pretends not to watch.</p>
  <p>He looks at the village. At the blood on the snow that is yours and hers. At the mother by the well who is gripping her own sleeves so hard her knuckles have gone white — looking at her daughter, and at the eyes of her neighbours, and back, trapped precisely between.</p>
  <p>"I cannot give you the court's blessing," Yun says at last, formally, for any ears that need it. Then he takes something from his sleeve and presses it into your hand, and his voice drops below the reach of the village. "My personal seal. If a magistrate stops your people on any road in this province — you never met me, and you show him that." He straightens. Reassembles the mask. "The court will hear that a Qing incursion was repelled by persons unknown. Persons unknown have my gratitude. Change comes slowly, Woman on the River." A pause. His eyes go, once, to Ok-hui. "May it come faster than I believe it will."</p>`,
  choices:[{t:'And Ok-hui makes her choice.', to:'a8j_leave'}]
},
a8j_leave:{
  eyebrow:'The Ford Below the Village · Dawn', crumb:'The Border Shrine', speaker:'okhui',
  title:'What Home Is Not',
  text:`<p>She stands at the ford with her childhood jacket folded under her arm, looking back at the village once — at the well, the persimmon tree, the back gate where her mother will wait tonight and every night for a daughter who will not be there.</p>
  <p>"I thought home was a place," Ok-hui says. Her voice is very steady, which is how you know what it costs. "It's not. It's being <em>seen</em>. My mother sees me only in the dark. Your camp saw me at noon, by my name, the first day." She turns from the village, and her chin is up, and her father's stubbornness is in it, or maybe her own. "I'll come back for the back gate. Someday I'll come back in daylight, and I'll make them say my name in the market square. But I'm not going to stand in the dark waiting to be loved. I'm coming with you."</p>
  <p>You cross the ice together as the sun comes up behind Joseon — behind the country that is yours, and hers, and would not have either of you yet.</p>
  <p class="whisper">Home is not always where you are accepted. Sometimes home is the people who say your name in daylight — and the promise you make to the back gates: <em>someday, in daylight, all of you.</em> Word comes from the west as you reach the far bank: Liaoyang is burning. Zhao is inside.</p>`,
  choices:[{t:'West. Now.', to:'ch8c'}]
},

/* ================= ACT 2 · SIDE ARC · THE CHILD BETWEEN CROWNS ================= */
ch8c:{
  chapter:true, mark:'回', crumb:'Between Crowns', code:'CROWNS',
  eyebrow:'The Joseon Interior · One Detour',
  title:'The Child Between Crowns',
  text:`<p>West means Liaoyang, and Liaoyang is burning — but a column bound for home cannot be marched into a war. One night's detour, then: the ones returning to Joseon must be left somewhere safe first, in a dry cave above the valley road, with food and two of Jin's people and every promise you can afford.</p>
  <p>It is on that road that the rumours find you. Travellers moving the wrong way, talking low. People are disappearing in the interior. Officials arrested at night. Families punished for sons who never came home. The king — they say it in whispers, glancing at the trees — the king has decided the kingdom is full of traitors, and that everyone who survived the north <em>survived it suspiciously</em>.</p>
  <p class="whisper">You have carried these people across two wars to bring them home. And home, it seems, has begun to eat itself. The court sits in a fortress palace in the hills, two valleys east. You should not go. You go.</p>`,
  choices:[{t:'Two valleys east. Quietly.', to:'a8c_go'}]
},
a8c_court:{
  eyebrow:'The Hill Palace · Night', crumb:'Between Crowns', speaker:'jin',
  title:'A Beautiful Place Holding Its Breath',
  text:`<p>The palace is the most beautiful thing you have seen in Joseon — and the quietest. Lanterns on new snow. Curved roofs stacked up the hillside like folded hands. And wrongness everywhere, once you know how to read it: guards who watch the <em>courtiers</em> instead of the walls. Servants crossing courtyards with their eyes down, hugging the colonnades. No music. No laughter. A whole palace waiting for a blow to land.</p>
  <p>You and Jin go up and over — roofline to roofline, old habits, his hand signals and your count — until you are lying flat on the tiles above the great hall, where light spills through the lattice and voices carry.</p>
  <p>"Whatever we see," Jin breathes, "we are not here. Two masked foreigners over the throne hall — there is no version of being caught that we survive."</p>`,
  choices:[{t:'Look down through the lattice.', to:'a8c_king'}]
},
a8c_king:{
  eyebrow:'The Great Hall · Through the Lattice', crumb:'Between Crowns', speaker:'wang',
  title:'The King Who Saw Only Knives',
  text:`<p>The king is not old, and that is somehow the worst of it — a man with years left, spending them all tonight. He paces before his assembled ministers with a list in his hand, and his voice never rises, which is more frightening than shouting: every name on the list has confessed, he says. Everyone confesses. The kingdom is riddled through, sold to the Ming, sold to the Jurchen, sold by everyone he ever trusted — and if he is not ruthless <em>now</em>, Joseon disappears.</p>
  <p>An old minister — the best of them, you can tell by how the others' eyes keep going to him — kneels and says, gently, the one true thing: <em>"Jeonha, there is no plot. There is only fear, and it is eating the country faster than any enemy could."</em></p>
  <p>The king kills him. There, on the steps of his own throne, with his own hand, and stands over the body breathing hard, and orders the guards to take the rest — all of them, the whole ministry, traitors, all —</p>
  <p>Your weight is already shifting. Jin's hand closes on your arm like an iron ring. <em>"Seol. No."</em></p>
  <p>And then the doors come off their hinges.</p>`,
  choices:[{t:'The north wind walks in.', to:'a8c_general'}]
},
a8c_general:{
  eyebrow:'The Great Hall · The Reckoning', crumb:'Between Crowns',
  title:'Charges, Read Aloud',
  text:`<p>A Jurchen general, and behind him more soldiers than the hall has ever held — through gates that should have been defended, which tells you how many inside the palace decided this week whose fear they would rather live under. The king's guards die fast. The ministers, kneeling for their own execution, are spared by the men they call barbarians, and the shame of that will outlive everyone in this room.</p>
  <p>The general does not gloat. He unrolls a document and reads the charges the way a man reads weather — the broken agreements, the murdered envoys, the border villages punished for imagined treasons — and the king, surrounded, laughs, and tells his weeping ministers he <em>knew</em>, he always knew, this was the plan all along, and their tears prove it.</p>
  <p>They are crying <em>"Jeonha, jeonha"</em> — for him, still, after everything — begging mercy for the man who was killing them an hour ago. The general listens all the way through, which is its own kind of terrible courtesy. Then he shakes his head once, and it is done, and the ministers' cry comes apart into weeping.</p>
  <p>Then the family is brought in, and the hall goes truly silent, and the old ministers press their foreheads to the floor and beg — not for the adults, they are beyond it and know it — <em>for the baby. Mercy for the baby.</em></p>
  <p>Beside you, Jin has your arm again before you have moved. "Seol. Look at me. The adults — there is nothing. Anyone we pulled out of that hall, every soldier on this hill hunts us and the column in the cave dies for it. <em>There is nothing.</em>" His voice is wrecked and level at once, and he is right, and being right has never sounded worse.</p>
  <p>It is over quickly. The general stands a moment over what he has ordered. Then he says, tiredly, to the hall at large: "It is a baby. Be humane." — and lifts the child from its dead mother's arms himself, and hands it to one of his guards.</p>`,
  choices:[{t:'On the roof, in the cold, a decision.', to:'a8c_choice'}]
},
a8c_choice:{
  eyebrow:'The Rooftop · Snow Beginning', crumb:'Between Crowns', speaker:'jin',
  title:'A Symbol, A Child',
  text:`<p>"If you take that child," Jin says quietly, watching the guard carry it across the courtyard below, "every side will decide what you are. Joseon will call you a traitor who stole the old king's heir. The Ming will question where your loyalty was hiding all along. The Jurchens will see an opportunity wearing your face."</p>
  <p>"And the child?"</p>
  <p>"To them?" A pause, exactly as long as honesty. "A symbol."</p>
  <p>"To me?" You look down at the small bundle in the soldier's arms, already crying at the cold, the last of a house that saw knives everywhere and never once saw this coming.</p>
  <p>"A child."</p>
  <p>Jin closes his eyes, because he knew the answer when he started the sentence. This is who you are. It is why he is here.</p>
  <p>You pull your mask up. In the dark, you can hear him almost smile. "It's a good thing," you say, "that I won't get caught."</p>
  <p>The plan takes four breaths to make, because the good ones always do: he goes loud on the west wall — lanterns, noise, a dancer's chaos, no one touched — and you go quiet through the corridors. Take the child. Out the east water-gate. Meet at the cave above the valley road, where the column waits.</p>`,
  choices:[{t:'He drops off the roofline, and the west wall comes alive. Go.', to:'WAVE:a8c_daragul'}]
},
a8c_daragul:{
  eyebrow:'The East Corridors · The Child in Your Arms', crumb:'Between Crowns', speaker:'daragul',
  title:'The Woman at the Water-Gate',
  text:`<p>You have the baby — warm, furious, impossibly light — and the east water-gate is twenty paces away when a Jurchen woman steps out of the dark between you and it, blade already drawn, and yours comes up on pure instinct, the child braced in your off arm —</p>
  <p>— and neither of you moves.</p>
  <p>She is your age. Broad-cheeked, wind-burned, a scar through one eyebrow. She is staring at your eyes above the mask the way you are staring at hers, and the point of her blade has begun, very slowly, to drop, and you do not understand why yours is dropping too.</p>
  <p class="whisper">Somewhere far back, behind nine years of winters, a door you did not know you had opens by itself.</p>`,
  choices:[{t:'Nine years ago. The night of the ford.', to:'a8c_flash'}]
},
a8c_flash:{
  eyebrow:'Nine Years Ago · The Raiders’ Camp', crumb:'Between Crowns',
  title:'Dara',
  text:`<p>The first night, after the ford. Eleven years old, roped to a saddle-post, too empty even to cry, in a camp full of a language made of stones. One of the raiders had brought his daughter on the ride — a girl your own age in a too-big coat, who had been given, as a trinket, the small wooden horse your father carved you when you were six.</p>
  <p>In the dark, when the fires burned down, she crept over. Looked at you a long time. Then held out a waterskin — and the wooden horse, pressed into your bound hands, folding your fingers over it like a secret.</p>
  <p>You did not understand a word she said. She pointed at herself: <em>"Dara — "</em> something, the rest lost in wind and dialect. You tried to say it back and mangled it, and she laughed — clapped a hand over her own mouth, eyes huge, and laughed anyway — and you, roped to a post at the end of the world, laughed too, because it was that or die.</p>
  <p>You pointed at yourself. <em>"Seol."</em> She said it wrong. You both said everything wrong, whispering nonsense across a language neither of you would ever share, agreeing about nothing that could be named. Two girls inside a terrible machine, deciding — in the only currency children have — that the other one was a person.</p>
  <p>In the morning she was gone with the outriders, and you never saw her again. You kept it. Through the market, through five winters in a stranger's house — a small wooden horse on a shelf, and no one ever asked, and you never told.</p>`,
  choices:[{t:'Now. The water-gate.', to:'a8c_part'}]
},
a8c_part:{
  eyebrow:'The East Water-Gate · Now', crumb:'Between Crowns', speaker:'daragul',
  title:'In This Life',
  text:`<p>Neither of you says it. That is the pact, made in half a second, blade-point to blade-point: name it and you make each other traitors; leave it unnamed and it is only two women at a gate in the snow. Her eyes go once to the bundle in your arm, and something crosses her face — the general's mercy, and where it was headed anyway, and what she thinks of that — and she steps out of your path and speaks fast and low.</p>
  <p>"You cannot take it back the way you came. Every road west is watched by tomorrow." A breath. "There is a man. Noble blood. Our khan finds him… <em>reasonable</em> — wants him where the throne is, when the dust settles. Not king yet. Careful. Clever." Her mouth twists, half contempt, half respect. "He protects what is useful to him. Make the child useful." She tells you the valley, the house, the words that will open the gate, and every second of it is a thing that gets her killed if a single lantern turns this way.</p>
  <p>Horns, far off. Jin's chaos, dying down. Time is over.</p>
  <p>"In another life," you say — in her tongue, the little of it nine years taught you — and cannot finish it. "We would drink together."</p>
  <p>She grips your head, firm, two-handed, forehead almost to forehead, the way old friends do who have run out of language. "In <em>this</em> life," she says.</p>
  <p>You are ten paces gone in the dark when you cannot help it — you turn and call back, low as you dare: "I'll see what an old hag you become, Daragul!"</p>
  <p>The answer comes out of the night, delighted, already moving the other way: "And we will see you lose your good looks, <em>Seol!</em>"</p>
  <p class="whisper">Two girls who met inside a kidnapping, alive long enough to insult each other at a palace gate. Some ledgers the empires do not keep.</p>`,
  choices:[{t:'The valley. The house. The careful man.', to:'a8c_succ'}]
},
a8c_succ:{
  eyebrow:'A Quiet House · Before Dawn', crumb:'Between Crowns', speaker:'seja',
  title:'The Careful Man',
  text:`<p>He receives you at the end of a long room with two guards he pretends are servants, and studies you the way a money-changer studies a coin from a country he does not trust. He is younger than his caution. Clever moves through him like water under ice.</p>
  <p>"A masked woman of no country," he says, "carrying the most dangerous infant in the kingdom, sent to me by a route only the northerners know. Tell me why my origins should trust yours."</p>
  <p>"Tell me why mine should trust a man the khan finds <em>reasonable</em>," you say. "You have been liaising with the people who just emptied the throne hall."</p>
  <p>He does not flinch; he almost smiles. "It is not my fault I was born with noble blood and a silver tongue. One survives with the tools one is issued." He looks at the bundle in your arms and, for the first time, lets the tiredness show. "Why save it? You know what it is. A living claim. A banner for every future rebellion. That child may one day destroy every agreement keeping this country alive. Why?"</p>
  <p>"Because if a country survives by killing children," you say, "what exactly survived?"</p>
  <p>The room is quiet for a long time. When he speaks again the money-changer is gone and something older and more tired is in his place.</p>
  <p>"I will not be a good king," he says, at last, plainly, as if he has never said it aloud before. "I am too careful to be good. But I will not be a man who rules through fear — I have now seen where that road ends, on the steps of a throne, in the family's blood. I will keep this country <em>standing</em>. Stable. Breathing. When the khan's wrath comes looking for a neck, I will offer it mine before I hand it my people's." He gestures, and a nurse comes forward from the shadows — planned before you finished speaking, you realize; careful, always careful. "The child disappears tonight. A miller's family, three provinces south. It will grow up loved and ordinary and never know. That is the only mercy that keeps it alive. Acceptable?"</p>
  <p>"Acceptable."</p>
  <p>"Then we are concluded." A pause at the door, and the almost-smile again. "Woman of no country. If you ever need a careful man's memory — I have an excellent one."</p>`,
  choices:[{t:'The cave above the valley road. The column. Jin.', to:'a8c_end'}]
},
a8c_end:{
  eyebrow:'The Cave Above the Valley Road · Dawn', crumb:'Between Crowns', speaker:'jin',
  title:'What Everyone Saw',
  text:`<p>Jin is at the cave mouth with a lantern and three new holes in his coat and no holes in him, and he does not ask where the child is, because your empty arms and your face tell him it worked. The column stirs awake behind him — the ones going home, to whatever home has decided to be this year.</p>
  <p>"So," he says, falling in beside you as the wagons form up. "The old king saw people as threats. He is dead of it. The khan's men see people as leverage — you watched them weigh that baby like a coin. The Ming see people as resources; I grew up in a garrison, I know the ledgers. And the one in the red ink sees people as numbers." He glances at you sideways, and there is the old lantern-light in it. "And then there's you. You just looked at the most dangerous political object in a kingdom and saw a child that needed carrying."</p>
  <p>"That's why they'll never understand what we do next."</p>
  <p>"No," he agrees, contentedly, in Korean, getting better at it all the time. "That is why you are dangerous."</p>
  <p class="whisper">West now, truly. Liaoyang is burning, and Zhao is inside it — and behind you, in a quiet house, a careful man files away the memory of a woman who asked what exactly survives. One day, when it matters most, he will answer.</p>`,
  choices:[{t:'West. Liaoyang.', to:'ch7'}]
},

/* ================= ACT 2 · (existing) LIAOYANG ================= */

/* ================= ACT 2 · THE FALLING CITIES ================= */
ch7:{
  chapter:true, mark:'七', crumb:'Liaoyang', code:'SIEGE',
  eyebrow:'Liaoyang · The Fourth Month · Night',
  title:'The City That Held a Country',
  text:`<p>Liaoyang — the great eastern capital — is burning from the inside. Traitors opened the sluice gates; the Eight Banners are in the streets. Somewhere in the garrison quarter, an old general refuses to leave his post.</p>
  <p class="whisper">Zhao is in that city. Go get your father.</p>`,
  choices:[{t:'Into the smoke.', to:'a7_go'}]
},
a7_lan:{
  eyebrow:'Liaoyang · The Garrison Quarter', crumb:'Liaoyang', speaker:'lan',
  title:'The Daughter Holds the Door',
  text:`<p><b>Lan</b> holds the barricade with twenty exhausted soldiers and the calm of a woman balancing accounts. "He won't come," she says, in place of hello. "Li Yongfang knelt at Fushun and they made him rich. Father says he would rather be poor and <em>his own</em>."</p>
  <p>"Then we don't ask," you say. "We carry."</p>
  <p>Something like a smile. "Little sister. You did grow up." She turns to shout an order, turns back. "You know what I do now? Mother taught me sums, so I keep books. Kang counts what he takes. I count what we take <em>back</em> — every name we free goes in my ledger. When this is over, mine will be longer than his." A beat, quieter: "Her letter said I should forgive the world for being what it is. I'm starting with a barricade."</p>
  <p>Then, as you turn to go, she catches your arm — the only time tonight her calm cracks. "One more thing. There's an officer with the Banners out there. Doesn't loot. Doesn't burn. He walks the captive pens with a brush and paper and he <em>counts</em>. My scouts say the soldiers fear him more than the fire. They call him the Wolf." She lets go. "A man who counts people, little sister. You know the type. This one has an army."</p>`,
  choices:[{t:'Cut a path to the keep.', to:'WAVE:a7_zhao'}]
},
a7_zhao:{
  eyebrow:'Liaoyang · The Keep', crumb:'Liaoyang', speaker:'zhao',
  title:'The General’s Last Post',
  text:`<p>He stands in his armor in an empty command hall, gray as the smoke, writing the last dispatch no one will ever read. "I held this line eleven years," he says, without turning. "A man should die where he stood."</p>
  <p>"A man should <em>live</em> where he's loved," you say. "You taught me strategy, general. This position is lost. Your people are not. Choose the war you can still win."</p>
  <p>"You cannot save everyone," you say — and you hear whose arithmetic that is in your mouth, and hate it a little.</p>
  <p>"No," Zhao says. He looks at the empty hall — at eleven years of holding a line the strategists wrote off long ago. "But I can decide what kind of man I am when I fail. Strategy tells you what to spend, daughter. It never tells you what you <em>are</em>. That, you must decide before the bill arrives — because it always arrives, and it always asks."</p>
  <p>His brush stops. "...Mingzhu used to argue like that." He sets it down. "Very well, daughter. Carry me out of my grave."</p>`,
  choices:[{t:'Out, through the falling city.', fx:()=>{S.flags.zhaoSaved=true;}, to:'a9m_namgil'}]
},
a7_dance:{
  eyebrow:'Liaoyang · The Rooftop Road', crumb:'Liaoyang', speaker:'zhao',
  title:'What the General Sees',
  text:`<p>Above the burning streets, Jin's troupe moves the evacuees roof to roof — ribbons and hooks, children passed hand to hand over the fire, a whole rescue conducted like choreography. Zhao watches his son lift an old woman across a gap as gently as a bow across strings.</p>
  <p>"I called it dancing," the general says at last. "All those years. I said it like a small word."</p>
  <p>"It is dancing," you say.</p>
  <p>"Yes." He watches his son catch a falling boy out of the air. "It is the biggest word I know now."</p>`,
  choices:[{t:'Above the fire, the general watches his son carry a city.', to:'a9m_ledger'}]
},

a9m_namgil:{
  eyebrow:'Liaoyang · The South Gate', crumb:'Liaoyang', speaker:'namgil',
  title:'How Many Graves Does Kindness Require',
  text:`<p>Namgil stands at the south gate watching the eastern capital of a civilization burn down to its bones, and when he speaks it is quiet, which is worse than shouting.</p>
  <p>"We saved two hundred people at the waystation," he says. "The army that came after them has killed thousands this week. Look at it." He does not gesture at the fire. He doesn't need to. "How many graves does kindness require, Seol, before it becomes cruelty? We pull ten from the water while the flood takes ten thousand, and we call ourselves the good ones because our hands are full."</p>
  <p>"Say what you want to say."</p>
  <p>"Cut the supply roads. All of them — through the villages if the villages are in the way. Leave the slow columns; they cost us speed we cannot spend. Make the war expensive for the machine instead of survivable for its victims." He finally looks at you, and there is grief in it, not zeal, which is what makes him dangerous. "A surgeon cuts away flesh to save the body."</p>
  <p>"Then remember the flesh is made of people," you say. "The day you forget that, Namgil, you are not a surgeon. You are the disease with better intentions."</p>
  <p>He holds your eyes a long moment. "One of us is wrong," he says. "I genuinely do not know which. That is the part I cannot sleep through." He shoulders his pack. "Kang's hub is by the grain wharfs. The network found it this morning. Come see what the machine looks like from inside — then tell me again about flesh."</p>
  <p class="whisper">He is not your enemy. He is the person you might have become if Mingzhu had never put a brush in your hand. That is why you cannot dismiss him, and why you must answer him.</p>`,
  choices:[{t:'The grain wharfs. Kang’s hub.', to:'a9m_hub'}]
},
a9m_hub:{
  eyebrow:'Liaoyang · The Grain Wharfs', crumb:'Liaoyang', speaker:'seol',
  title:'The Machine From Inside',
  text:`<p>You expected a den. You find an <em>office</em>. Clerks' desks in rows. Manifests in triplicate. Rate tables pinned to the wall — the price of a strong man, a skilled woman, a child, adjusted seasonally, like grain. A whole bureaucracy of taking, running smoothly while its city burns, because the machine does not care where it stands.</p>
  <p>And on the master desk, corrections in a patient red hand you know now: Kang's estimates amended, his routes optimized, his sloppy sums fixed. At the margin of a page projecting next season's "yield," one note: <em>"The Woman will come here. She will spare the man and take the books. Prepare accordingly. — O."</em></p>
  <p>Namgil reads it beside you and exhales slowly. "He knows you better than the court does. Better than Wei. Maybe better than —" He stops. "Seol. He <em>planned</em> for your mercy."</p>
  <p class="whisper">Batu fought your strength. This one studies your humanity — files it, prices it, builds around it. Fight through the hub. The books are the mission. The man is not.</p>`,
  choices:[{t:'Clear the wharfs.', to:'WAVE:a9m_kang'}]
},
a9m_kang:{
  eyebrow:'Liaoyang · The Counting Room', crumb:'Liaoyang', speaker:'kang',
  title:'Only One Piece',
  text:`<p>You find Kang under a desk, and the years have not been kind, or rather they have been exactly kind enough: fatter, softer, sweating through silk, scrabbling at a strongbox he cannot lift alone. The terror of your childhood, revealed by firelight as a clerk who ate well.</p>
  <p>"You," he says — and then, seeing your face stay level, he begins to talk fast, the way he always did when the price moved against him. "You still think I was the monster. I was only the man who <em>admitted</em> what everyone wanted. The magistrates wanted their cut. The garrisons wanted their quiet. The buyers — oh, the buyers wanted, and they washed their hands with my name." His hands spread, rings loose on thinner fingers. "Kill me. Go on. He has copies of everything. He has <em>better</em> men than me already trained. You will have killed a fat old clerk, and the machine will not miss a single shipment."</p>
  <p>And the terrible thing is: the red ink on his desk already told you the same.</p>
  <p>"I'm not going to kill you," you say, and watch relief and humiliation fight in his face, because he understands the second part before you say it. "You're not worth the lesson it would unteach. Run, Kang. Run to your buyer in Shenyang and tell him his note was right. Tell him she took the books." You lift the hub's master ledger — heavy as a tombstone, thousands of pages. "Tell him she's coming for the shelf they sit on."</p>`,
  choices:[{t:'He runs. The dancers are moving the wharf captives to the rooftops.', to:'a7_dance'}]
},
a9m_ledger:{
  eyebrow:'Liaoyang · The West Road · Dawn', crumb:'Liaoyang', speaker:'namgil',
  title:'Names Are Not Weapons',
  text:`<p>Outside the walls, in the grey after, the column forms up — the wharf captives, the rooftop children, Zhao leaning on Lan and refusing to lean much. You stand with the master ledger in your arms. It is heavier than a shield.</p>
  <p>Namgil watches you hold it. "So," he says. "You spared the clerk and took his arithmetic. What will you do with it? Burn the routes it names? It would cripple them for a season. I would call that a victory."</p>
  <p>Old you would have burned it — burned the roads, the wharfs, the whole grammar of the machine, and called the fire justice.</p>
  <p>"Names are not weapons," you say. "They are promises." You open it, and the firelight moves across page after page after page — <em>thousands</em> of them. Villages. Ages. Dates taken. Prices paid. Every entry a person the machine filed and forgot, and every one of them, from this morning, a debt the network now owes. "We're not going to burn what they did, Namgil. We're going to <em>answer</em> it. Every name. Starting with the ones in Shenyang."</p>
  <p>He looks at the pages a long time. "That's not a war plan," he says at last. "That's a vow." A breath. "...I'll get the column moving." It is not agreement. It is not refusal. It is a man deciding to watch a little longer before he chooses.</p>
  <p class="whisper">The war just became bigger than one girl. Home is the values you refuse to surrender — even holding the enemy's arithmetic, even offered the easy fire.</p>`,
  choices:[{t:'West. Then north. Shenyang.', to:'ch8'}]
},
ch8:{
  chapter:true, mark:'八', crumb:'The Pass', code:'LEDGER',
  eyebrow:'The Western Hills · Weeks Later',
  title:'The Ledger Road',
  text:`<p>Bad news travels in Kang's handwriting: the fat merchant ran straight to his buyer — of course he did; grease flows downhill to money — and sold his masterwork to the conquerors: <b>the Great Ledger.</b> Every route. Every safehouse. Every name your network has.</p>
  <p class="whisper">A copy travels tonight through the pass below, under escort, to a Banner officer they call the <b>Wolf</b>. It must not arrive.</p>`,
  choices:[{t:'Hunt.', to:'a8_go'}]
},
a8_convoy:{
  eyebrow:'The Pass · Midnight', crumb:'The Pass',
  title:'Lanterns in the Cut',
  text:`<p>Below: a strongbox on a cart, riders in wolf-fur, and — marching roped behind, because Kang never wastes cargo space — a line of captives bound for the northern markets.</p>
  <p>Jin's hand finds your shoulder in the dark. "Box or people first?"</p>
  <p>"People. Always people. Then we burn his paperwork."</p>`,
  choices:[{t:'Take the convoy.', to:'WAVE:a8_ledger'}]
},
a8_ledger:{
  eyebrow:'The Pass · The Strongbox', crumb:'The Pass',
  title:'What the Wolf Wanted',
  text:`<p>The captives go west with Lan's outriders. The strongbox opens on the Great Ledger's neat, fat pages — and on top, a letter of sale, already sealed: <em>"To Ohan of the Plain Blue Banner — the whole apparatus, for services rendered. The original follows with me to Shenyang. — K."</em></p>
  <p>You turn the pages and go cold in a new way. The margins are <em>annotated</em> — a second hand, red ink, small and immaculate. Corrections. Cross-references. A question mark beside a safehouse Kang got wrong. And on the page that maps the network's methods, one entry circled twice, a single note in that patient red hand: <em>"The girl. Fights like two schools. Confirm."</em></p>
  <p>Jin reads it over your shoulder and is quiet for a moment. "Kang sells," he says finally. "This one <em>studies</em>."</p>
  <p>The original. With <em>him</em>. To the capital of the conquest, where the holding yards are — where they gather the taken before the long march north.</p>
  <p class="whisper">Shenyang, then. The belly of it.</p>`,
  choices:[{t:'Night watch, before the long road.', to:'a8_jin'}]
},

a8_jin:{
  eyebrow:'The Pass · Night Watch', crumb:'The Pass', speaker:'jin',
  title:'Two Rivers',
  text:`<p>He takes the watch beside you, and for a long time the only sound is the wind combing the pines. Then, quietly: "Shenyang frightens me." You look over. Jin does not say things like that. "All my life I've moved <em>around</em> things. Grief. My father. Walls. It's what the dance is — the art of never being where the blow lands." A breath. "There's no around, where we're going. There's only through. That's your art, not mine."</p>
  <p>"So I'm asking," he says, and he makes himself look at you when he says it. "Lead the yards. I'll put my dancers wherever you point. You cut lines. I draw circles. Shenyang needs a line."</p>
  <p>It costs him something to hand you that, and you both know it, and he hands it over anyway — the boy who once grabbed your waist to save you, asking to follow you into the conquest's belly.</p>
  <p>Later, half-asleep against your shoulder, he murmurs through a phrasebook of one: <span class="kr">안녕하십니까. 저는... 진입니다.</span> — practicing. "If I'm going to meet your village," he says, "I should greet them properly." You do not tell him his accent is terrible. You memorize it instead.</p>`,
  choices:[{t:'Act Three · The Last Road', to:'ch10r'}]
},

/* ================= ACT 3 · M10 · THE LAST ROAD TO SHENYANG ================= */
ch10r:{
  chapter:true, mark:'十', crumb:'The Last Road', code:'ROAD',
  eyebrow:'The Road to Shenyang · Late Winter',
  title:'The Last Road to Shenyang',
  text:`<p>It does not look like an army. It looks like a village that learned to walk.</p>
  <p>Freed captives with everything they own on their backs. Old garrison men who fell in beside you and never asked permission. Ok-hui, walking at the head of the women. Children. A grandmother who carries nothing but a broken loom-shuttle, because it was her mother's. A moving town, three thousand paces long, going north into the mouth of the empire because the woman at the front of it said there were still names to answer.</p>
  <p class="whisper">This is your victory. Not one li of ground taken. Only this: people, still existing, in the direction they chose.</p>`,
  choices:[{t:'Walk the column.', to:'a10r_go'}]
},
a10r_child:{
  eyebrow:'The Column · Midday', crumb:'The Last Road', speaker:'seol',
  title:'Are We Free Now?',
  text:`<p>A mother, adjusting a strap: "Where are we going, my lady?" You have no lady in you and no answer either, so you tell her the truth: "North. Then home. Then further, probably."</p>
  <p>An old soldier of Zhao's, saluting a woman thirty years his junior with no irony at all: "Orders?" And you have to remember that "walk carefully" is now a command, and that he will repeat it down the line as if it were strategy, and that it <em>is</em>.</p>
  <p>Then a boy, seven or eight, falls into step and squints up at you with the enormous seriousness of children.</p>
  <p>"Are we free now?"</p>
  <p>And you stop walking, because the honest answer is a whole life, and he deserves it. "No," you say, and watch him take it. "Not yet. Free isn't a place we walk to, and it isn't a door someone opens for you. It's a thing we build, every day, out of what we do next. Today we walk. Tomorrow we build a little of it. Some days we lose some." You crouch to his height. "But nobody owns you. That part started the moment the lock came off. The rest is ours to make."</p>
  <p>He considers this with great gravity. "Can I help build it?"</p>
  <p>"You already are," you say, and it is the truest thing you have said all winter.</p>`,
  choices:[{t:'The scouts return from the north bridge.', to:'a10r_bridge'}]
},
a10r_bridge:{
  eyebrow:'The Column · The North Bridge', crumb:'The Last Road', speaker:'namgil',
  title:'Everything We Saved Dies Later',
  text:`<p>A Qing column is coming up the valley behind you — two banners, moving faster than a walking town can. Ahead: one stone bridge over a gorge, and beyond it the last road to Shenyang. And on this side of it, straggling a half-day behind: the slow. The wounded. Three villages' worth of families who joined the column at Liaoyang and have never once been able to keep pace.</p>
  <p>Namgil lays it out flatly, because he has already done the crying. "Drop the bridge when we're across. Their banners are trapped on the far side of a gorge and this whole column lives — two thousand souls, Seol, the ledger, everything." He does not look away. "The stragglers do not make it across. That is the price. Say it out loud, both of us, so neither of us pretends afterwards."</p>
  <p>"And if we hold the bridge and wait for them?"</p>
  <p>"Then the banners reach us on open ground and we all die, and the ledger burns, and every name in it stays a number forever. I am not being cruel." His voice cracks, once, and he lets it. "If we hesitate now, everything we saved dies later."</p>
  <p>You look at the gorge a long time. He is right about the arithmetic. He has been right about the arithmetic since the waystation.</p>
  <p>"Every time we say <em>later</em>," you say, "someone has to live through <em>now</em>. Those stragglers are the now. They are always the now, Namgil — that's what the word means." You turn to the old soldiers. "We hold the bridge. Every wagon across, then the wounded, then the children, then us. Nobody drops it while a single person stands on the wrong side."</p>
  <p class="whisper">He does not argue. He takes the left flank, which is the worse one, without being asked. That is who he is. That is why this hurts.</p>`,
  choices:[{t:'Hold the bridge.', to:'WAVE:a10r_after'}]
},
a10r_after:{
  eyebrow:'The North Bridge · Dusk', crumb:'The Last Road', speaker:'namgil',
  title:'The Arithmetic of the Bridge',
  text:`<p>You hold it. It costs. Eleven of the old soldiers, four of Jin's dancers, and Namgil takes a lance through the thigh that will make him limp for the rest of his life. But every straggler crosses. The last one over is a woman carrying two children not her own, and she does not know your name, and she never will.</p>
  <p>Namgil sits against the parapet while they bind his leg, watching the far bank, where the banners have halted at a bridge they now cannot use.</p>
  <p>"I would have dropped it," he says quietly. "I would have stood here and dropped it and lived with it the rest of my life. And I would have been <em>right</em>, by every measure I know how to take." He looks up at you, and there is something new in his face — not surrender. Something more tired and more permanent. "And I would have been a smaller man in a smaller world, and none of those people would be standing behind us right now, warm, arguing about soup."</p>
  <p>"You still think I'm wrong."</p>
  <p>"I think you're <em>expensive</em>," Namgil says, and almost laughs, and winces. "I think you cost more than any commander I've ever served. And I think I would rather pay it than win the way I'd win." He shuts his eyes. "That's not agreement, Seol. That's just — I've decided which arithmetic I want to be haunted by."</p>`,
  choices:[{t:'In the abandoned Qing scout post, a satchel.', to:'a10r_ohan'}]
},
a10r_ohan:{
  eyebrow:'The Scout Post · Night', crumb:'The Last Road', speaker:'seol',
  title:'She Will Choose the Slower Road',
  text:`<p>Dispatches, in the red hand. Dated <em>eight days ago.</em></p>
  <p><em>"The column will reach the north bridge on the ninth day. She will not drop it. Do not waste the banners assaulting the crossing; she will hold it and she will win, and we will have spent men to teach her nothing. Wait. She will choose the slower road, because she always chooses the slower road."</em></p>
  <p>And below, in the same patient script, underlined once:</p>
  <p><em>"She values names over numbers. This is not sentiment. It is her entire architecture. Every prediction I have made from it has been correct. Therefore: do not fight the column. Go to the ford at Uiju and wait. She will come there last, and she will come there tired, and she will come there with everyone she loves standing behind her where she cannot use them."</em></p>
  <p>Jin reads it over your shoulder. For once he has nothing graceful to say.</p>
  <p>And beneath the dispatches, incongruous, a second letter — travel-stained, in careful court Korean, carried by three hands at least to find you on this road. No signature. Only a seal you last saw in a quiet house before dawn, and one line: <em>"A careful man's memory. Your wolf feeds through the western routes — grain and silver, past the old salt fords. Cut there and he starves at Uiju. The purges have ended. The roads home are safer than they were. — What survived, survives."</em></p>
  <p class="whisper">He did not need to beat you on the road. He never intended to. He has simply been waiting, for a year, at the end of a sentence he wrote before you began it.</p>`,
  choices:[{t:'North. Shenyang. The yards are still full.', to:'ch9'}]
},

/* ================= ACT 3 · THE WAY HOME ================= */
ch9:{
  chapter:true, mark:'九', crumb:'Shenyang', code:'YARDS',
  eyebrow:'Shenyang · The Holding Yards · Night',
  title:'The Belly of the Conquest',
  text:`<p>Shenyang under a full moon is, unforgivably, beautiful. Lantern-light on new snow. Curved tile roofs like a range of small dark hills. Somewhere a flute, practising the same phrase over and over, badly, lovingly. This is what everyone is fighting for — this exact street, this bell, this boy learning his scales — and the empire that built it keeps its yards two streets away.</p>
  <p>The yards: cage rows under torchlight, a bureaucracy of grief, clerks weighing people like rice. Somewhere in the counting house at its heart, a fat man balances his masterpiece one last time.</p>
  <p class="whisper">Over the roofs, then. Quietly. Every cage — then Kang. In that order.</p>`,
  choices:[{t:'Over the wall.', to:'a9_go'}]
},
a9_kang:{
  eyebrow:'Shenyang · The Counting House', crumb:'Shenyang', speaker:'kang',
  title:'The Man Who Counted Everything',
  text:`<p>He doesn't run. Men like Kang never run; they renegotiate. "The archer's girl," he says warmly, hands spread over the Great Ledger like a priest over scripture. "Name a price. Everyone has one. I have met <em>everyone.</em>"</p>
  <p>"You met me twice," you say. "The day you sold me, and tonight. Both times you counted wrong."</p>
  <p>Behind you, the yards stand open, and the people he priced fill the doorway — hundreds of them, silent, looking at him.</p>
  <p>"I'm not going to kill you," you say, stepping aside. "I'm not even going to judge you. <em>They</em> get to. You're going home with them — to Joseon, roped to the last cart, past every village you emptied. Let them do the counting."</p>
  <p>At the door, between two of the freed, he stops and turns his head. Not pleading now. Almost curious, the way a man is curious about a sum that will not come out.</p>
  <p>"You think removing men like me changes anything?"</p>
  <p>"No," you say.</p>
  <p>The silence goes on long enough that he begins to smile.</p>
  <p>"That," you say, "is why we change everything else."</p>`,
  choices:[{t:'The ledger burns. The column turns east.', to:'a9_out'}]
},
a9_out:{
  eyebrow:'Shenyang · Before Dawn', crumb:'Shenyang', speaker:'zhao',
  title:'Two Roads',
  text:`<p>As the last of the freed clear the wall, hooves sound in the yards behind you — unhurried hooves, which is somehow worse. On the rampart above the emptied cages, a rider in wolf-fur sits perfectly still, taking in the open doors, the cut chains, the burning counting house. He does not shout. He does not give chase. He takes out a brush, and writes.</p>
  <p>Then he looks up — across all that distance, directly at you, as if your position were an entry he had already confirmed — and inclines his head. A merchant's nod. An accountant's nod. <em>A debt, acknowledged, to be collected.</em></p>
  <p>"Ohan," Jin says quietly beside you. Nobody asks how he knows.</p>
  <p>At the walls, Zhao takes your hands. He is going west with Lan — there is a resistance to stitch together, and an old strategist is worth a regiment. You are going east, with the freed, across the river. Both of you know what this goodbye is.</p>
  <p>"You said once I was your people too," he says. "Hear the other half. You were never my servant, Seol. You were my second daughter from the day I watched you fight six men with your hands tied wrong."</p>
  <p>"They were tied fine," you manage, through the tears. "I loosened them myself."</p>
  <p>"I know." He holds your head like a blessing. "Go home, daughter. Walk tall the whole way."</p>
  <p>Lan's goodbye is a folded page pressed into your palm — a copy of the first sheet of her ledger. The first entry, in her precise hand, is your name and a date nine years old. "You were the first one we took back," she says. "The ledger starts with you. Remember that when it feels like it started with losing." Then, fierce and fast, the hug of a woman who doesn't do hugs: "Take care of my little brother. He listens to you. He has never once listened to anyone."</p>`,
  choices:[{t:'East. The river. Home.', to:'ch10'}]
},

ch10:{
  chapter:true, mark:'十', crumb:'Uiju', code:'HOME',
  eyebrow:'Uiju, Joseon · Dawn',
  title:'The Third Crossing',
  text:`<p>The ford, again. Smaller than memory, the way all first places are.</p>
  <p>Once, on this ice, there was one child, one father, and seven men. He stood between them and her and it cost him everything, and she has spent her whole life learning what he was doing when he did it.</p>
  <p>Now there is one woman, and hundreds standing behind her, and one man waiting who believes people are numbers.</p>
  <p class="whisper">He has been here for days. Of course he has. He wrote it down before you began.</p>`,
  choices:[{t:'Then he can discuss it here.', to:'a10_go'}]
},
a10_wolf:{
  eyebrow:'Uiju · The Ford', crumb:'Uiju', speaker:'batu',
  title:'Ohan of the Plain Blue Banner',
  text:`<p>He rides down the bank the way winter comes down a valley — without hurry, because winter has never once been late. He dismounts on the ice, and from his saddle he takes not a warhorn but a <em>book</em>, and holds it up: the Great Ledger, original, red-margined.</p>
  <p>"Baek Seol," he says, and your own name in his mouth is an itemization. "Entry four hundred and six. I have read you. Two schools of the sword, a bow above her weight, and a habit of striking first." He sets the ledger down on the ice between you, gently, like a wager. "Batu died charging you. Batu was an animal. I am an <em>inventory</em>. I do not charge. I wait, and I collect. The property of the Khan does not walk away."</p>
  <p>"Property doesn't," you agree, stringing the Winter Bow. "People do."</p>
  <p>He accepts this the way a scholar accepts a flawed premise — with patience, almost with affection. "You imagine I hate you. I do not. I have read you for a year and I find you admirable and entirely explicable." He steps onto the ice. "Understand my position. The world belongs to those who can measure it. Grain, distance, loyalty, grief — all of it can be weighed, and what can be weighed can be governed, and what is governed does not starve. Your Ming could not measure. That is why they are ash. Your Joseon measures only honour. That is why it will kneel. I do not conquer, Baek Seol. I <em>account</em>. It is the kindest thing anyone has ever done for this country."</p>
  <p>"Then you measured everything except what mattered," you say. "You have my routes, my habits, my mercy, my name. You wrote down what I would do at the bridge and you were right. And you never once wrote down <em>why</em> — because it doesn't weigh anything, and it is the only thing here that is real."</p>
  <p>"Sentiment is not an argument."</p>
  <p>"No," you agree, and draw. "It's a reason. Come count what it costs."</p>
  <p class="whisper">He fights like his ledger: guarded, patient, nothing wasted. Wait for the moment he spends himself — then make him pay for it. On this ford your father fought seven men. You are what he made, finished by three more hands. And you are not alone.</p>`,
  choices:[{t:'For every name in that ledger.', to:'WAVE:a10_win'}]
},
a10_win:{
  eyebrow:'Uiju · The Ford', crumb:'Uiju',
  title:'What the River Keeps',
  text:`<p>He does not charge. He guards, and waits, and counts — answering each thing you do with the thing his pages say comes next. Every habit you own, he has already read. Fighting him alone is arguing with a mirror that has studied you.</p>
  <p>So you stop fighting alone.</p>
  <p>Your <b>father's</b> bow speaks first, from farther out than he thinks you would dare — because a border archer's daughter always opens at the range the enemy has ruled out. <b>Zhao's</b> steel takes the space that opens: not elegant, brutally correct, the blade of a man who chose what he was before the bill arrived. He counters, as he must; and <b>Lan's</b> lesson answers — <em>strength borrows, balance owns</em> — his own weight returned to him with the whole river under it. And when he plants himself to guard the line his notes predict, <b>Jin</b> is simply there, on the other side, moving the way only two people who trust each other can move: the turning form, improvised, a shape that has never existed before this moment and will not exist again.</p>
  <p>No ledger holds it. It is made of trust, and trust cannot be weighed, and so he never saw it coming.</p>
  <p>He spends his stroke. You are already inside it. And in the half-second before the ice takes him, you understand that <b>Mingzhu</b> is here too — not in the bow in your hands but in the reason it is drawn: <em>be together; love loudly, for both of us.</em></p>
  <p>The margin note was wrong. You never fought like two schools. You fight like five people who loved you, and only one of them is holding the weapon.</p>
  <p>The Great Ledger goes into the black channel first. Then the river takes what it is owed, and closes.</p>`,
  choices:[{t:'The village is waking.', fx:()=>{S.flags.wolfDown=true;}, to:'a10_return'}]
},
a10_return:{
  eyebrow:'Uiju · The Village', crumb:'Uiju', speaker:'seol',
  title:'Say It First, Say It Loud',
  text:`<p>They come out to the road — and stop. You watch the village look at the returned: the sideways glances, the elder already muttering about <em>what must have happened to them out there</em>, a mother's hand hesitating an inch from her own daughter's face.</p>
  <p>And then someone pushes through the crowd from the <em>village</em> side. A young woman in miller's clothes, marching like she has rehearsed this in her head for a year — because she has. <b>Danbi.</b> From the mill village below Uiju. Word crossed the river faster than you did.</p>
  <p>She plants herself between the villagers and the returned, and says it first, and says it loud: "I am Danbi, daughter of this valley. I was taken. I walked home across the ice. I survived — <em>that is the whole story.</em>" She looks the muttering elder dead in the eye. "A woman on the river taught me to say that. Anyone who thinks there is more to ask can try surviving it themselves."</p>
  <p>She finds you in the crowd then, and the look she gives you is the entire payment: <em>see — it grew.</em> So when you step up beside her, your speech has already been given, and better than you would have given it. All you add, loud enough for both banks: "What she said. Every word. For every one of them."</p>
  <p>Silence. Then the mother's hand closes the inch. Then the whole road is arms and weeping, and the elder is very quiet, and somewhere a grandmother starts the song for homecomings that no one has needed in nine years — and Jin, beside you, greets the nearest bewildered farmer with a phrasebook bow: <span class="kr">안녕하십니까. 저는 진입니다.</span> His accent is terrible. The farmer laughs, and takes his hand anyway.</p>`,
  choices:[{t:'One more grave to visit.', to:'a10_end'}]
},
a10_end:{
  eyebrow:'Epilogue · The Ford', crumb:'Epilogue',
  title:'Snow over Liaodong',
  text:`<p>Your father's grave looks north over the ford he held. You lay the Winter Bow's first arrow on the stone — the far kill and the near one, both come home — and you tell him everything, and the wind off the river listens the whole time.</p>
  <p>Jin waits at the bank, at that respectful distance he has finally, <em>finally</em> learned. When you join him he doesn't ask if you're all right. He just settles shoulder to shoulder, facing the water, close enough that neither of you is behind the other.</p>
  <p>"A blade behind you is a funeral," you say. The old lesson. The first one.</p>
  <p>"Then it's good," he says, in Korean — barely clumsy at all anymore — "that you will never fight alone again."</p>
  <p>Spring, when it comes, comes the way it always did here: mud, then green, then the whole valley shouting with it.</p>
  <p>In the threshing yard where a girl once wrestled boys until they refused to face her, a child stands with a bow too big for her, tongue between her teeth, drawing at a straw target twenty paces off. Ok-hui is teaching her, badly, having learned only last month. Danbi is arguing about the stance. Half the village is watching and pretending not to.</p>
  <p>The child looses. The arrow goes wide — comically wide, into a persimmon tree, startling a bird into the sky.</p>
  <p>And Seol, watching from the wall where her father used to stand, smiles, and does not correct her.</p>
  <p>Because he never taught her how to hit every target. He taught her to draw at dawn and to listen at dusk, and to keep listening — to what stands behind her, to what is coming, to the ones who cannot yet draw at all. The rest, the hitting, is only practice.</p>
  <p>"Again," Seol calls, and hears her father's voice come out of her mouth, and lets it.</p>
  <p>The child nocks another arrow. Snow melts off the eaves. Somewhere the grandmothers are singing the planting song, and this time everyone knows the words.</p>
  <p class="whisper">끝 — The End</p>`,
  choices:[{t:'Begin again.', to:'RESET'}]
},

RESET:{ enter(){ location.reload(); }, text:'', choices:[] },
};
/* boot handled by 3D engine */
