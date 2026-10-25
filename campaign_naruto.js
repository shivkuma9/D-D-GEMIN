// campaign_naruto.js - The Chronicles of Team 7: The Senju Prodigy Campaign
const NarutoCampaignData = {
    TITLE: 'Naruto: The Chronicles of Team 7',
    SUBTITLE: 'LEGACY OF THE SENJU // GENIN BELL TRIAL TO LAND OF WAVES',
    INITIAL_NODE: 'ch1_bell_test_start',
    chapters: [
        // CHAPTER 1: The Bell Test Begins (Direct continuation of Gemini Chat)
        {
            id: 'ch1_bell_test_start',
            title: 'Act II: The Bell Test — Ready, Start!',
            act: 'Act II - Tactical Crucible',
            location: 'Training Ground 3, Konoha',
            atmosphere: 'Cold morning mist clinging to the pine needles, Kakashi standing relaxed with his hand on his weapon pouch, Naruto screaming a battle cry.',
            image: 'assets/team7_bell_test_arena.jpg',
            audio: 'assets/audio/narration/ch1_bell_test_start.mp3',
            illustration: {
                title: 'The Bell Test Commences',
                badge: 'BELL TRIAL ACTIVE',
                badgeClass: 'threat-extreme',
                icon: '🔔',
                quote: '"You came at me with the intent to kill. Good. Ready... START!"',
                tags: ['Kakashi Hatake', '3 Bells', 'Team 7 Crucible']
            },
            narrative: `Kakashi raises his hand and calls the start. Instantly, Sasuke and Sakura leap backward into the tree line, masking their chakra presence exactly as taught in the Academy.

Naruto, however, doesn't budge. He stands right in the open meadow, fists clenched, teeth bared, and bellows at the top of his lungs: "You and me! Fair and square! Let's go!"

Kakashi sighs deeply, slipping his right hand into his shinobi pouch. Naruto braces for a weapon throw—but instead of a kunai, Kakashi casually pulls out a small, orange paperback novel: *Make-Out Paradise*.

"Why did you pull out a book?" Naruto demands, his eyes bulging in outrage.

"Why? Because I want to know what happens next in the story," Kakashi answers calmly, flipping a page. "Don't worry about it. Facing a guy like you, reading while fighting won't make a bit of difference."

Naruto snaps. He charges Kakashi with a furious right swing!

You have seconds to decide your approach. How do you play this opening round, Shivkumar?`,
            options: [
                {
                    approach: 'force',
                    tag: '💥 COMBINED HYDRO RUSH',
                    label: 'Launch a synchronized sprint with Naruto, channeling Surging Impact Fist from Kakashi\'s flank',
                    stat: 'taijutsu',
                    dc: 14,
                    costChakra: 15,
                    actionType: 'check',
                    desc: 'Capitalize on Naruto\'s reckless frontal charge to test Kakashi\'s close-range reflexes.',
                    successNode: 'ch2_flank_success',
                    failNode: 'ch2_flank_fail'
                },
                {
                    approach: 'mind',
                    tag: '🌊 WATER-SHADOW GAMBIT',
                    label: 'Send a Water-Shadow Clone to fight beside Naruto while your real body conceals in the river bed',
                    stat: 'ninjutsu',
                    dc: 12,
                    costChakra: 25,
                    actionType: 'check',
                    desc: 'Harvest Kakashi\'s movement data via clone memory transfer without risking your physical body.',
                    successNode: 'ch2_clone_intel_success',
                    failNode: 'ch2_clone_intel_fail'
                },
                {
                    approach: 'finesse',
                    tag: '🌲 STEALTH CO-ORDINATION',
                    label: 'Leap into the canopy beside Sasuke and Sakura to propose a unified four-man ambush',
                    stat: 'tactics',
                    dc: 13,
                    costChakra: 0,
                    actionType: 'check',
                    desc: 'Attempt to break through Sasuke and Sakura\'s solo mindset before Kakashi dismantles the team.',
                    successNode: 'ch2_stealth_pact_success',
                    failNode: 'ch2_stealth_pact_fail'
                }
            ]
        },

        // BRANCH 1A: Flank Rush Success
        {
            id: 'ch2_flank_success',
            title: 'Act II: The Delayed Hydro Rupture',
            act: 'Act II - Taijutsu Clash',
            location: 'Center Stumps, Training Ground 3',
            atmosphere: 'High-speed wind turbulence, water spraying across pine needles, Kakashi\'s lone visible eye widening with sharp recognition.',
            image: 'assets/surging_impact_fist.jpg',
            audio: 'assets/audio/narration/ch2_flank_success.mp3',
            illustration: {
                title: 'Surging Impact Fist Unleashed',
                badge: 'JONIN DEFLECTION',
                badgeClass: 'threat-high',
                icon: '💥',
                quote: '"Delayed chakra dispersion?! This isn\'t standard Academy taijutsu..."',
                tags: ['Kakashi Surprised', 'Water Release', 'Bell Glanced']
            },
            narrative: `While Kakashi easily ducks beneath Naruto's clumsy wild hook, you execute an instantaneous low-profile slide across the grass, popping up directly beneath Kakashi's blind spot!

Your right fist crackles with condensed turquoise water chakra. You thrust your knuckles straight toward the three silver bells dangling from his belt:

"Water Release: Surging Impact Fist!"

Kakashi's reflexes are supernatural—his forearm snaps down to block your strike with millimeters to spare. Physical contact lands—*THUD!*

Kakashi starts to smirk—until a micro-second later, the pressurized water chakra embedded in your knuckles violently erupts! **BOOM!**

A heavy shockwave explodes across his guard. The delayed hydraulic blast actually blows Kakashi back three full paces! One of the silver bells is grazed by your fingertip, ringing shrilly as Kakashi lands gracefully on the water of the nearby pond, his orange book safely pocketed.

"Impressive," Kakashi murmurs, his eye narrowing in serious appraisal. "That delayed concussive flow... you developed that yourself, didn't you, Shivkumar?"

Naruto picks his jaw up off the floor: "Whoa, Sanju! You actually pushed him back!" (+20 Trust with Naruto!)`,
            options: [
                {
                    approach: 'force',
                    tag: '🌊 EXPAND WATER DOMAIN',
                    label: 'Pursue onto the water\'s surface, using the pond to amplify your Suiton jutsu',
                    stat: 'ninjutsu',
                    dc: 15,
                    costChakra: 20,
                    actionType: 'check',
                    desc: 'Fight where your Senju water affinity is at its absolute maximum.',
                    successNode: 'ch3_water_surface_battle',
                    failNode: 'ch3_kakashi_subterranean'
                },
                {
                    approach: 'mind',
                    tag: '📢 SIGNAL THE TEAM',
                    label: 'Call out Kakashi\'s stance to Sasuke in the trees to trigger a pincer strike',
                    stat: 'tactics',
                    dc: 13,
                    costChakra: 5,
                    actionType: 'check',
                    desc: 'Force Sasuke to capitalize on Kakashi\'s recovery frames.',
                    successNode: 'ch3_sasuke_fireball_combo',
                    failNode: 'ch3_sasuke_hesitation'
                }
            ]
        },

        // BRANCH 1B: Flank Fail
        {
            id: 'ch2_flank_fail',
            title: 'Act II: The Thousand Years of Death',
            act: 'Act II - Jonin Masterclass',
            location: 'Training Ground 3 Clearing',
            atmosphere: 'A bizarre silence, two fingers formed into a Tiger seal, Naruto launching skyward.',
            image: 'assets/team7_bell_test_arena.jpg',
            audio: 'assets/audio/narration/ch2_flank_fail.mp3',
            illustration: {
                title: 'Secret Leaf Taijutsu',
                badge: 'TACTICAL COUNTER',
                badgeClass: 'threat-moderate',
                icon: '🚀',
                quote: '"Leaf Village Secret Finger Jutsu: One Thousand Years of Death!"',
                tags: ['Naruto Launched', 'Evasion Tested', 'Jonin Speed']
            },
            narrative: `Kakashi doesn't even look up from his book. As you and Naruto charge from twin angles, Kakashi performs a lightning-quick substitution with an empty water bucket.

In the blink of an eye, he materializes directly behind Naruto, crouching low with his hands locked in the Tiger hand seal.

"Leaf Village Secret Finger Technique: ONE THOUSAND YEARS OF DEATH!"

*POW!* 

Kakashi drives his fingers into Naruto's backside with extreme kinetic velocity, catapulting Naruto screaming through the sky into the river!

You pivot immediately, using your water chakra to cushion the back-draft. Kakashi turns his head toward you with a lazy wave: "Good reaction speed, Shivkumar. But tunnel vision will get you killed on the battlefield."`,
            options: [
                {
                    approach: 'finesse',
                    tag: '💨 SMOKE DIVERSION',
                    label: 'Detonate a smoke bomb and drop into the river to pull Naruto out and regroup',
                    actionType: 'advance',
                    nextNode: 'ch3_river_regroup'
                },
                {
                    approach: 'force',
                    tag: '💥 INSTANT REACTION FIST',
                    label: 'Exploit his crouching posture to drive a Surging Impact Fist straight into his shoulder',
                    stat: 'taijutsu',
                    dc: 16,
                    costChakra: 20,
                    actionType: 'check',
                    desc: 'High-risk counter attack against an S-Rank Jonin.',
                    successNode: 'ch3_counter_graze',
                    failNode: 'ch3_kakashi_subterranean'
                }
            ]
        },

        // BRANCH 2A: Clone Intel Success
        {
            id: 'ch2_clone_intel_success',
            title: 'Act II: Memory Harvest from the Deep',
            act: 'Act II - Information Warfare',
            location: 'Underbrush of the Naka Riverbank',
            atmosphere: 'Submerged in crystal cold water, eyes watching shadows through reeds, memories crashing into the mind like a tidal surge.',
            image: 'assets/surging_impact_fist.jpg',
            audio: 'assets/audio/narration/ch2_clone_intel_success.mp3',
            illustration: {
                title: 'Water-Shadow Telemetry',
                badge: 'CLONE MEMORY SYNC',
                badgeClass: 'threat-low',
                icon: '🧠',
                quote: '"His blind spot is his right flank while reading that orange book... and the middle bell cord is fraying!"',
                tags: ['Intel Acquired', 'Bell Weakness', 'Zero Risk']
            },
            narrative: `Your Water-Shadow Clone leaps into the clearing alongside Naruto. Kakashi ducks Naruto's strike and swings a vicious sweeping roundhouse kick into your clone's torso.

*CRASH!*

Instead of popping into a puff of smoke, your clone detonates into a geyser of high-pressure river water, dousing Kakashi from head to toe!

Hidden five feet underwater in the riverbed, the sensory feedback instantly slams into your brain:
1. **Kakashi's physical weight distribution**: He puts 70% of his balance on his left heel when reading.
2. **Bell Attachment**: The center bell is tied with a quick-release shinobi slipknot—it can be sliced with a single wire or shuriken!
3. **Chakra Flow**: He hasn't tapped into even 5% of his reserves yet.

You resurface silently behind a mossy boulder, your chakra fully intact and armed with critical tactical weaknesses!`,
            options: [
                {
                    approach: 'finesse',
                    tag: '🪢 NINJA WIRE SLICER',
                    label: 'Uncoil your steel ninja wire and set a trip-snare targeting the frayed center bell',
                    stat: 'ninjutsu',
                    dc: 13,
                    costChakra: 10,
                    actionType: 'check',
                    desc: 'Slice the cord from distance without entering Kakashi\'s taijutsu zone.',
                    successNode: 'ch3_wire_bell_snag',
                    failNode: 'ch3_wire_detected'
                },
                {
                    approach: 'mind',
                    tag: '👥 RECRUIT SASUKE & SAKURA',
                    label: 'Share the intel with Sasuke and Sakura to coordinate a synchronized bell grab',
                    stat: 'tactics',
                    dc: 12,
                    actionType: 'check',
                    desc: 'Use the information advantage to unite Team 7.',
                    successNode: 'ch3_teamwork_revelation',
                    failNode: 'ch3_sasuke_pride_reject'
                }
            ]
        },

        // BRANCH 2B: Clone Intel Fail
        {
            id: 'ch2_clone_intel_fail',
            title: 'Act II: The Lightning Counter-Dispersion',
            act: 'Act II - Jonin Perception',
            location: 'Training Ground 3 River Edge',
            atmosphere: 'Crackling blue sparks of lightning chakra, water steam rising in the morning air, Kakashi standing vigilant.',
            image: 'assets/team7_bell_test_arena.jpg',
            audio: 'assets/audio/narration/ch2_clone_intel_fail.mp3',
            illustration: {
                title: 'Clone Dispersed by Lightning',
                badge: 'LIGHTNING COUNTER',
                badgeClass: 'threat-high',
                icon: '⚡',
                quote: '"Suiton clones conduct electricity easily, Shivkumar. Never let your guard down near water against a lightning user."',
                tags: ['Kakashi Lightning', 'Clone Dispersed', 'River Tactical Shift']
            },
            narrative: `Before your Water-Shadow Clone can complete its flanking sweep, Kakashi's lone visible eye narrows. With inhuman speed, he channels faint lightning chakra into a standard kunai and hurls it straight into the clone's chest!

*ZAP-CRACKLE!*

The lightning short-circuits your clone's water matrix, causing it to splash harmlessly back into the stream!

Hidden beneath the riverbed, the electric feedback tingles across your fingertips. Kakashi turns his gaze toward the water's surface:
"Water clones conduct lightning easily, Shivkumar. An impressive attempt... but you can't stay submerged forever."

You must choose your next tactical move immediately before he corners you in the water!`,
            options: [
                {
                    approach: 'force',
                    tag: '🌊 WATER DRAGON ERUPTION',
                    label: 'Burst upward from the riverbed channeling Suiton: Water Pillar to counter Kakashi\'s stance',
                    stat: 'ninjutsu',
                    dc: 14,
                    costChakra: 20,
                    actionType: 'check',
                    desc: 'Turn the surrounding river into your greatest tactical advantage.',
                    successNode: 'ch3_water_surface_battle',
                    failNode: 'ch3_river_regroup'
                },
                {
                    approach: 'finesse',
                    tag: '🌲 SPRINT FOR THE CANOPY',
                    label: 'Swim silently downstream and leap into the trees to rendezvous with Sasuke and Sakura',
                    stat: 'agility',
                    dc: 13,
                    actionType: 'check',
                    desc: 'Break line of sight and regroup with your squad members.',
                    successNode: 'ch2_stealth_pact_success',
                    failNode: 'ch3_kakashi_subterranean'
                }
            ]
        },

        // BRANCH 3A: Stealth Pact Success
        {
            id: 'ch2_stealth_pact_success',
            title: 'Act II: The Canopy Accord',
            act: 'Act II - Squad Synchronization',
            location: 'High Cedar Canopy, Training Ground 3',
            atmosphere: 'Rustling cedar leaves, shadows masking three Genin, Sasuke\'s eyes narrowing with intense calculation.',
            image: 'assets/team7_bell_test_arena.jpg',
            audio: 'assets/audio/narration/ch2_stealth_pact_success.mp3',
            illustration: {
                title: 'Canopy Pact Formed',
                badge: 'SQUAD ACCORD',
                badgeClass: 'threat-moderate',
                icon: '🌲',
                quote: '"We attack together from high ground while the dobe keeps him busy. Get ready, Senju."',
                tags: ['Sasuke Agrees', 'Sakura Coordinates', 'Ambush Staged']
            },
            narrative: `You land silently onto the cedar branch beside Sasuke and Sakura without shaking a single pine needle—a display of Senju chakra control that immediately catches Sasuke's attention.

"Sasuke, Sakura, hold your fire," you whisper in calm, measured tones. "Kakashi is reading that book because he has complete confidence in his single-target defense. If we charge him one by one, he will pick us apart. But look at his stance—his blind spot is his upper right flank while his book is held in his left."

Sasuke's dark eyes flicker with realization: "He relies on peripheral sound. If we launch an overhead elemental strike while Naruto charges the front, Kakashi will be forced to choose between defending against the fire or the bells."

Sakura nods with newfound determination: "I'll cover the retreat angle with kunai wire traps!"
(+25 Trust with Sasuke! +25 Trust with Sakura!)`,
            options: [
                {
                    approach: 'force',
                    tag: '🔥🌊 DUAL ELEMENTAL ASSAULT',
                    label: 'Execute the synchronized strike: Sasuke\'s Grand Fireball combined with your Suiton Hydro Blast!',
                    stat: 'ninjutsu',
                    dc: 13,
                    costChakra: 25,
                    actionType: 'check',
                    desc: 'Create an overwhelming thermal shockwave that Kakashi cannot evade without revealing his full speed.',
                    successNode: 'ch3_sasuke_fireball_combo',
                    failNode: 'ch3_sasuke_hesitation'
                },
                {
                    approach: 'finesse',
                    tag: '🪢 TRI-DIRECTIONAL BELL SNARE',
                    label: 'Signal Sakura to deploy steel wire while you and Sasuke drive Kakashi into the trap zone',
                    stat: 'tactics',
                    dc: 12,
                    actionType: 'check',
                    desc: 'Snare Kakashi\'s limbs and target the three silver bells directly.',
                    successNode: 'ch3_wire_bell_snag',
                    failNode: 'ch3_wire_detected'
                }
            ]
        },

        // BRANCH 3B: Stealth Pact Fail
        {
            id: 'ch2_stealth_pact_fail',
            title: 'Act II: The Fractured Pride of the Uchiha',
            act: 'Act II - Tactical Friction',
            location: 'Canopy Edge, Training Ground 3',
            atmosphere: 'Tense shinobi standoff in the branches, Sasuke clenching his shuriken holster with stubborn pride.',
            image: 'assets/team7_bell_test_arena.jpg',
            audio: 'assets/audio/narration/ch2_stealth_pact_fail.mp3',
            illustration: {
                title: 'Sasuke Rejects the Pact',
                badge: 'PRIDE CLASH',
                badgeClass: 'threat-high',
                icon: '⚡',
                quote: '"I am an avenger. I don\'t need to play house with you or the dobe to get a bell!"',
                tags: ['Solo Charge', 'Uchiha Pride', 'Tactical Split']
            },
            narrative: `You land near Sasuke and urge him to combine forces, but the young Uchiha scowls, his pride flaring up:
"I don't need a team to beat a lazy Jonin," Sasuke snaps coldly. "I'm not like Naruto. Stay out of my way, Senju!"

Before you can stop him, Sasuke leaps from the branch, hurling a volley of shuriken directly toward Kakashi!

Down in the meadow, Kakashi calmly sidesteps the shuriken, catching two between his knuckles. Within three seconds, Kakashi slides behind Sasuke's blind spot and sweeps his legs out from under him!

Sasuke is thrown toward the riverbank, his breath knocked out. You and Sakura must react immediately before Kakashi secures Sasuke in a subduing lock!`,
            options: [
                {
                    approach: 'force',
                    tag: '🌊 HYDRO SHIELD INTERVENTION',
                    label: 'Cast Suiton: Water Wall between Kakashi and Sasuke to rescue him and pull back to the river',
                    stat: 'ninjutsu',
                    dc: 13,
                    costChakra: 15,
                    actionType: 'check',
                    desc: 'Demonstrate Senju loyalty by saving your teammate despite his rejection.',
                    successNode: 'ch3_river_regroup',
                    failNode: 'ch3_kakashi_subterranean'
                },
                {
                    approach: 'mind',
                    tag: '🤝 RALLY SAKURA & CONFRONT SASUKE',
                    label: 'Urge Sakura to help you pull Sasuke back and force him to acknowledge the four-man creed',
                    stat: 'tactics',
                    dc: 12,
                    actionType: 'check',
                    desc: 'Break through Sasuke\'s stubborn shell with harsh shinobi reality.',
                    successNode: 'ch3_sasuke_pride_reject',
                    failNode: 'ch3_river_regroup'
                }
            ]
        },

        // BRANCH 4: Water Surface Battle
        {
            id: 'ch3_water_surface_battle',
            title: 'Act III: Duel on the Rushing Rapids',
            act: 'Act III - Elemental Mastery',
            location: 'Naka River Rapids, Training Ground 3',
            atmosphere: 'Foaming river spray catching the morning sun, shoes locked onto the rushing current with perfect chakra control, Kakashi pocketing his book.',
            image: 'assets/surging_impact_fist.jpg',
            audio: 'assets/audio/narration/ch3_water_surface_battle.mp3',
            illustration: {
                title: 'Water Surface Standoff',
                badge: 'SENJU DOMAIN',
                badgeClass: 'threat-high',
                icon: '🌊',
                quote: '"Standing on running water with zero ripples... Your chakra stability is identical to the Second Hokage."',
                tags: ['Water Walking', 'Suiton Dominance', 'Serious Kakashi']
            },
            narrative: `You land effortlessly onto the roaring surface of the river. By channeling pure Senju chakra into the soles of your sandals, you stand atop the rushing current without producing a single unwanted ripple!

Kakashi lands thirty paces across from you on the foaming water. He looks down at your feet, then up at your silver hair and happuri armor, his lone dark eye glinting with immense respect:
"Standing on turbulent rapids without disturbing the surface tension... Lord Tobirama possessed that exact same natural affinity with water. I see his blood runs true in you, Shivkumar."

Kakashi reaches into his pouch and finally slips *Make-Out Paradise* away. He enters a proper combat stance:
"No more reading. Let's see what the Senju legacy can do!"`,
            options: [
                {
                    approach: 'force',
                    tag: '🌊 SUITON: WATER DRAGON SURGE',
                    label: 'Draw water directly from the river to forge a roaring Water Dragon and strike at Kakashi\'s belt',
                    stat: 'ninjutsu',
                    dc: 14,
                    costChakra: 25,
                    actionType: 'check',
                    desc: 'Unleash high-tier B-Rank Suiton on your home terrain.',
                    successNode: 'ch3_counter_graze',
                    failNode: 'ch3_kakashi_subterranean'
                },
                {
                    approach: 'finesse',
                    tag: '🪢 SUB-AQUATIC WIRE AMBUSH',
                    label: 'Submerge chakra-charged ninja wires beneath the current to snag the silver bells from underneath',
                    stat: 'agility',
                    dc: 13,
                    costChakra: 10,
                    actionType: 'check',
                    desc: 'Use the flowing water as camouflage for an invisible grapple.',
                    successNode: 'ch3_wire_bell_snag',
                    failNode: 'ch3_wire_detected'
                }
            ]
        },

        // BRANCH 5: Subterranean Decapitation Evasion
        {
            id: 'ch3_kakashi_subterranean',
            title: 'Act III: The Earth Decapitation Trap!',
            act: 'Act III - Subterranean Strikeback',
            location: 'Center Stumps, Training Ground 3',
            atmosphere: 'A sudden sinking sensation underfoot, the ground cracking open, Kakashi materializing from the soil.',
            image: 'assets/team7_bell_test_arena.jpg',
            audio: 'assets/audio/narration/ch3_kakashi_subterranean.mp3',
            illustration: {
                title: 'Double Suicide Decapitation',
                badge: 'EARTH AMBUSH',
                badgeClass: 'threat-extreme',
                icon: '⛏️',
                quote: '"Earth Style: Headhunter Jutsu! Can you escape before the noon bell rings?"',
                tags: ['Doton Ambush', 'Reflex Test', 'Senju Evasion']
            },
            narrative: `*SHKKK!*
Without warning, two gloved hands burst from the soft dirt right beneath your ankles!
"Earth Release: Double Suicide Decapitation Jutsu!" Kakashi's muffled voice echoes from beneath the soil as the hands clamp onto your ankles to drag your entire body into the ground!

Standard Genin would panic and find themselves buried up to their necks. But your Senju instincts take over in a microsecond!
You immediately liquefy the lower portion of your chakra cloak into fluid water, allowing your ankles to slide effortlessly through Kakashi's grip like a flowing stream! You backflip into the air, landing cleanly on top of a nearby training stump!

Kakashi emerges from the dirt, brushing soil from his vest: "Impressive water-dispersion evasion. But notice the time—noon is only ten minutes away."`,
            options: [
                {
                    approach: 'mind',
                    tag: '🤝 RALLY TEAM 7 IMMEDIATELY',
                    label: 'Sprint back to Naruto, Sasuke, and Sakura to enact the final coordinated strike',
                    actionType: 'advance',
                    nextNode: 'ch3_teamwork_revelation'
                },
                {
                    approach: 'force',
                    tag: '💥 STUMP COUNTER-BURST',
                    label: 'Kick off the stump with Surging Impact Fist while Kakashi is brushing off the dirt',
                    stat: 'taijutsu',
                    dc: 15,
                    costChakra: 15,
                    actionType: 'check',
                    desc: 'Exploit his momentary recovery frames to swipe a bell.',
                    successNode: 'ch3_counter_graze',
                    failNode: 'ch3_river_regroup'
                }
            ]
        },

        // BRANCH 6: Sasuke Fireball Combo
        {
            id: 'ch3_sasuke_fireball_combo',
            title: 'Act III: Steam Screen of the Leaf',
            act: 'Act III - Grand Elemental Clash',
            location: 'Training Ground 3 Clearing',
            atmosphere: 'Superheated steam billowing through pine needles, blinding white fog, the rhythmic chime of silver bells ringing in the mist.',
            image: 'assets/surging_impact_fist.jpg',
            audio: 'assets/audio/narration/ch3_sasuke_fireball_combo.mp3',
            illustration: {
                title: 'Fire & Water Thermal Blast',
                badge: 'ELEMENTAL STEAM',
                badgeClass: 'threat-moderate',
                icon: '💨',
                quote: '"Fire meets water... The steam is so dense Kakashi cannot use his visual field!"',
                tags: ['Steam Veil', 'Team Synergy', 'Bells Chiming']
            },
            narrative: `Sasuke inhales deeply, his chest expanding as his fingers lock into the Tiger seal:
"Fire Release: Great Fireball Technique!"
A colossal sphere of roaring crimson flames hurtles toward Kakashi!

At that exact split second, you launch a pressurized torrent of cold river water directly into the roaring fireball:
"Water Release: Hydro Rupture!"
**HISSSSSS-BOOM!**

The opposing thermal elements detonate against one another! An enormous wall of boiling white steam erupts across the entire training field, completely blanketing the clearing in impenetrable mist!

Kakashi's visual acuity is entirely shut down. Through the thick fog, you hear the crisp *JINGLE-CHIME* of the silver bells just fifteen feet ahead!
Sasuke shouts through the steam: "Senju! Go for the bells now!"`,
            options: [
                {
                    approach: 'finesse',
                    tag: '🔔 STRIKE THROUGH THE STEAM',
                    label: 'Dash through the steam curtain following the bell chime with Surging Impact Fist',
                    stat: 'agility',
                    dc: 13,
                    actionType: 'check',
                    desc: 'Secure the bells while Kakashi is disoriented by the steam veil.',
                    successNode: 'ch4_bells_secured',
                    failNode: 'ch3_counter_graze'
                },
                {
                    approach: 'mind',
                    tag: '🤝 CALL NARUTO & SAKURA FOR PIN-DOWN',
                    label: 'Signal Naruto\'s clones to surround the sound source and Sakura to secure the perimeter',
                    actionType: 'advance',
                    nextNode: 'ch3_teamwork_revelation'
                }
            ]
        },

        // BRANCH 7: Sasuke Hesitation
        {
            id: 'ch3_sasuke_hesitation',
            title: 'Act III: The Cost of Hesitation',
            act: 'Act III - Tactical Correction',
            location: 'Forest Clearing Edge',
            atmosphere: 'Smoke dissipating, Sasuke clenching his trembling fists, realizing the limits of solo combat.',
            image: 'assets/team7_bell_test_arena.jpg',
            audio: 'assets/audio/narration/ch3_sasuke_hesitation.mp3',
            illustration: {
                title: 'Hesitation Exploited',
                badge: 'TACTICAL WAKE-UP',
                badgeClass: 'threat-moderate',
                icon: '⚠️',
                quote: '"In the field, a second of hesitation is the difference between life and death."',
                tags: ['Lesson Learned', 'Team 7 Bond', 'Closing Minutes']
            },
            narrative: `Sasuke held back his chakra for a fraction of a second, unable to fully entrust his timing to a teammate. That single split-second delay gave Kakashi all the room he needed to substitute with a fallen log!

*POOF!*

The fireball and water jet incinerated a wooden log, while Kakashi flickered safely thirty paces away, adjusting his headband:
"A brilliant combo concept... but a combo only succeeds when both ninja trust each other completely."

Sasuke falls to one knee, panting and clenching his fists in bitter self-reproach: "Dammit... I hesitated."
You walk over, extend a hand to pull Sasuke up, and point toward the approaching Naruto and Sakura:
"We still have eight minutes before the noon alarm, Sasuke. Forget individual glory. Let's do this as Team 7!"

Sasuke looks at your outstretched hand, swallows his pride, and takes it! (+30 Trust with Sasuke!)`,
            options: [
                {
                    approach: 'mind',
                    tag: '🤝 FORM THE FOUR-MAN CREED',
                    label: 'Gather Naruto and Sakura to coordinate the final all-out assault',
                    actionType: 'advance',
                    nextNode: 'ch3_teamwork_revelation'
                }
            ]
        },

        // BRANCH 8: River Regroup
        {
            id: 'ch3_river_regroup',
            title: 'Act III: Regrouping by the Water',
            act: 'Act III - The Final Stand',
            location: 'Sandy Bank of Training Ground 3',
            atmosphere: 'River water lapping against the shore, four Genin catching their breath, the ticking clock echoing.',
            image: 'assets/team7_bell_test_arena.jpg',
            audio: 'assets/audio/narration/ch3_river_regroup.mp3',
            illustration: {
                title: 'Team 7 Regroups',
                badge: 'UNITED AT LAST',
                badgeClass: 'threat-low',
                icon: '🌊',
                quote: '"We are battered, wet, and bruised... But we are together. That makes all the difference."',
                tags: ['Full Team Present', 'Noon Approaching', 'Strategy Finalized']
            },
            narrative: `You pull a sputtering Naruto out of the shallow water onto the sand. Sakura rushes over to offer chakra restoration, while Sasuke lands silently beside you, wiping soot from his jacket.

All four Genin are bruised, drenched in river water, and breathing hard.
"That guy isn't human," Naruto wheezes, coughing up water. "He's too fast!"

"Because he's an elite Jonin who has fought in world wars," you answer quietly, pointing to your Senju insignia. "He wants us to realize something vital: four Genin acting alone will always fail. But four Genin acting as one body can overcome any opponent."

Sakura looks at Sasuke, then at Naruto, and finally at you. A determined light fills her eyes:
"Shivkumar is right. We stop fighting for ourselves. We fight for each other!"

Naruto grins, giving a thumbs-up. Sasuke adjusts his shuriken holster and smirks: "Alright. Let's show him what we've got."`,
            options: [
                {
                    approach: 'mind',
                    tag: '🤝 EXECUTE THE FOUR-MAN ASSAULT',
                    label: 'Charge together as one unbreakable unit for the three silver bells!',
                    actionType: 'advance',
                    nextNode: 'ch3_teamwork_revelation'
                }
            ]
        },

        // BRANCH 9: Counter Graze
        {
            id: 'ch3_counter_graze',
            title: 'Act III: The Severed Bell Cord!',
            act: 'Act III - The Silver Chime',
            location: 'Center Meadow, Training Ground 3',
            atmosphere: 'A sharp metallic snap, two silver bells tumbling through the air, Naruto diving with arms wide open.',
            image: 'assets/surging_impact_fist.jpg',
            audio: 'assets/audio/narration/ch3_counter_graze.mp3',
            illustration: {
                title: 'Bell Cord Severed',
                badge: 'BELL DETACHED',
                badgeClass: 'threat-low',
                icon: '🔔',
                quote: '"The middle bell is loose! Naruto, grab it!"',
                tags: ['1 Bell Secured', 'Kakashi Flustered', 'Final Rush']
            },
            narrative: `Your knuckles, encased in pressurized water chakra, slice across Kakashi's waist with surgical precision!
*PING!*

The thin cord holding the center silver bell snaps! The bell launches spinning into the morning air, flashing brightly in the sunlight!

Kakashi's eye goes wide as he reaches up to snag it—but you immediately unleash a burst of Water Release: Severing Spray to block his hand!
"Naruto, NOW!" you roar.

Naruto leaps with all his might, screaming at the top of his lungs, and catches the silver bell right in his teeth before rolling across the grass!
"I GOT IT! I GOT A BELL!" Naruto shouts through his teeth, holding the bell up high!

Kakashi lands five paces back, his hand on his hip, completely taken aback: "You actually severed the cord... Not bad, Team 7. Not bad at all!"`,
            options: [
                {
                    approach: 'force',
                    tag: '🏆 PIN KAKASHI FOR THE REMAINING BELLS',
                    label: 'Coordinate with Sasuke and Sakura to claim the remaining two bells as the noon alarm sounds!',
                    actionType: 'advance',
                    nextNode: 'ch4_bells_secured'
                }
            ]
        },

        // BRANCH 10: Wire Bell Snag
        {
            id: 'ch3_wire_bell_snag',
            title: 'Act III: The Water Wire Constriction',
            act: 'Act III - Tactical Snare',
            location: 'Cedar Perimeter, Training Ground 3',
            atmosphere: 'Glistening transparent wires vibrating with water chakra, Kakashi momentarily bound, two bells dropping into your hand.',
            image: 'assets/surging_impact_fist.jpg',
            audio: 'assets/audio/narration/ch3_wire_bell_snag.mp3',
            illustration: {
                title: 'Ninja Wire Snare',
                badge: 'JONIN BOUND',
                badgeClass: 'threat-low',
                icon: '🪢',
                quote: '"Chakra-conducting steel wires soaked in river water... You anticipated my exact stepping angle!"',
                tags: ['Bells Secured', 'Wire Trap Success', 'Flawless Execution']
            },
            narrative: `You yank the invisible wires with sudden hydraulic force!
*SHINGGG-SNAP!*

The transparent wires, lubricated and strengthened with your water chakra, instantly constrict around Kakashi's legs and weapon holster! The sudden kinetic torque snaps the leather cord tethering the silver bells!

Two of the silver bells fly directly into your outstretched palm!
*JINGLE-CLINK!*

You catch them cleanly with a grin. Kakashi stands pinned by the wire mesh, his single visible eye widening in genuine amazement:
"Chakra-conducting wire laid beneath the grass while I was looking at Naruto... and the water reduced friction to zero until the moment of tension. That is Jonin-level tactical choreography, Shivkumar."

Right on cue, the noon alarm clock across the meadow begins to ring!`,
            options: [
                {
                    approach: 'mind',
                    tag: '🏆 CLAIM VICTORY & SHARE WITH TEAM',
                    label: 'Step forward with the silver bells to hear Kakashi-sensei\'s final verdict!',
                    actionType: 'advance',
                    nextNode: 'ch4_bells_secured'
                }
            ]
        },

        // BRANCH 11: Wire Detected
        {
            id: 'ch3_wire_detected',
            title: 'Act III: Steel Against Steel',
            act: 'Act III - Counter-Play',
            location: 'Clearing Center, Training Ground 3',
            atmosphere: 'A severed wire spinning to the dirt, Kakashi spinning a kunai on his index finger with effortless poise.',
            image: 'assets/team7_bell_test_arena.jpg',
            audio: 'assets/audio/narration/ch3_wire_detected.mp3',
            illustration: {
                title: 'Wire Severed by Kunai',
                badge: 'KUNAI INTERCEPT',
                badgeClass: 'threat-moderate',
                icon: '🗡️',
                quote: '"A brilliant snare, Shivkumar. But you forgot that steel reflects sunlight at this hour."',
                tags: ['Wire Cut', 'Team Opportunity', 'Noon Approaches']
            },
            narrative: `Just as your wires begin to cinch around Kakashi's boots, a silver streak flashes through the air!
*PING!*

Kakashi flips a kunai backwards without even turning around, slicing your master wire clean in half!
"A brilliant trap," Kakashi remarks smoothly. "Lord Tobirama was famous for his multi-layered wire setups. But you forgot that the morning sun is behind you—the glare gave the trap away."

However, Kakashi's focus on slicing your wire created the exact distraction Sasuke and Naruto needed!
From both flanks, Sasuke and Naruto dive in unison, their hands outstretched toward Kakashi's exposed belt!`,
            options: [
                {
                    approach: 'force',
                    tag: '🤝 COMPLETE THE TRIPLE-PINCER',
                    label: 'Surge forward alongside Naruto and Sasuke to overwhelm Kakashi before he can reset his guard!',
                    actionType: 'advance',
                    nextNode: 'ch3_teamwork_revelation'
                }
            ]
        },

        // BRANCH 12: Sasuke Pride Reject
        {
            id: 'ch3_sasuke_pride_reject',
            title: 'Act III: The Humbling of the Uchiha',
            act: 'Act III - The Wall of Reality',
            location: 'Cedar Roots, Training Ground 3',
            atmosphere: 'Sasuke breathing heavily, resting his back against tree bark, looking down at his bruised hands.',
            image: 'assets/team7_bell_test_arena.jpg',
            audio: 'assets/audio/narration/ch3_sasuke_pride_reject.mp3',
            illustration: {
                title: 'Sasuke Acknowledges the Need for Teamwork',
                badge: 'WALL OF REALITY',
                badgeClass: 'threat-low',
                icon: '🤝',
                quote: '"I can\'t beat him alone... Not yet. Alright, Senju. What is the plan?"',
                tags: ['Uchiha Humility', 'Full Team Synced', 'Victory Imminent']
            },
            narrative: `Sasuke sits against the gnarled roots of the cedar tree, nursing a bruised shoulder from Kakashi's counter-strike.
"He didn't even use a jutsu against me," Sasuke mutters, his voice trembling with anger and disbelief. "Just raw Academy taijutsu and body replacement... How am I ever going to defeat *him* if I can't even touch a lazy Leaf Jonin?!"

You walk over and sit beside him, handing him a canteen of cold spring water:
"Because no single shinobi can do everything alone, Sasuke. Even the Hokage has comrades. You have the fire and the shurikenjutsu. I have the water and sensory perception. Naruto has inexhaustible stamina. And Sakura has the sharpest tactical mind in our class. Together, Kakashi can't track all four of us."

Sasuke takes a long sip of water, then looks up at you with renewed resolve:
"Fine. You lead the strategy, Shivkumar. Let's take those bells together!" (+35 Trust with Sasuke!)`,
            options: [
                {
                    approach: 'mind',
                    tag: '🤝 INITIATE THE GRAND FOUR-MAN ATTACK',
                    label: 'Unite Team 7 and launch the synchronized master plan!',
                    actionType: 'advance',
                    nextNode: 'ch3_teamwork_revelation'
                }
            ]
        },

        // CHAPTER 3: The Climax — Team 7 United
        {
            id: 'ch3_teamwork_revelation',
            title: 'Act III: The Unbreakable Four-Man Chain',
            act: 'Act III - True Shinobi Creed',
            location: 'Training Ground 3 Forest Perimeter',
            atmosphere: 'Alarm clock ticking closer to noon, Sakura bandaging Naruto, Sasuke clenching his fists, Shivkumar drawing the battle plan in the dirt.',
            image: 'assets/team7_bell_test_arena.jpg',
            audio: 'assets/audio/narration/ch3_teamwork_revelation.mp3',
            illustration: {
                title: 'The Real Meaning of the Test',
                badge: 'TEAMWORK AWAKENED',
                badgeClass: 'threat-moderate',
                icon: '🤝',
                quote: '"Four Genin, three bells... Kakashi-sensei didn\'t want us to fight each other. He wanted to see if we would put the team first!"',
                tags: ['Four-Man Cell', 'Team 7 Bond', 'True Meaning']
            },
            narrative: `You gather Naruto, Sasuke, and Sakura together behind the thick roots of an ancient cedar tree.

"Look at the math," you whisper, drawing four circles in the soil. "Four graduates, three bells. The rules are designed to turn us against each other. If we fight as individuals, an elite Jonin will pick us apart one by one. But if we fight as a four-man unit, we can overwhelm his guard and secure the bells together!"

Sasuke looks down at your drawing, his dark eyes widening as the tactical logic clicks.
"A distraction from the front, a suppression from above, a snare from below..." Sasuke mutters, a rare smirk appearing on his lips. "Hmph. Not bad, Senju." (+30 Trust with Sasuke!)

Sakura nods eagerly: "I'll coordinate the kunai volley to keep him from substituting!" (+25 Trust with Sakura!)

Naruto grins ear to ear, wiping river mud off his cheeks: "Alright! Let's show this lazy sensei what Team 7 can really do!" (+35 Trust with Naruto!)

With only twenty minutes left before the noon alarm chimes, Team 7 prepares their grand synchronized assault!`,
            options: [
                {
                    approach: 'force',
                    tag: '🔥🌊 FIRE & WATER COMBO',
                    label: 'Execute the grand combo: Naruto Clones + Sasuke Fireball + Shivkumar Surging Impact Fist!',
                    stat: 'ninjutsu',
                    dc: 14,
                    costChakra: 30,
                    actionType: 'check',
                    desc: 'Combine elemental affinities to force Kakashi into a corner.',
                    successNode: 'ch4_bells_secured',
                    failNode: 'ch4_bells_secured'
                }
            ]
        },

        // CHAPTER 4: The Bells Secured & Kakashi's Verdict
        {
            id: 'ch4_bells_secured',
            title: 'Act IV: The Jingling Bells & The Noon Chime',
            act: 'Act IV - Passing the Rite of Passage',
            location: 'Training Ground 3 Memorial Stone',
            atmosphere: 'The noon alarm clock blaring loudly, Kakashi standing tied up in ninja wire with two bells missing from his belt, an astonished smile behind his mask.',
            image: 'assets/team7_bell_test_arena.jpg',
            audio: 'assets/audio/narration/ch4_bells_secured.mp3',
            illustration: {
                title: 'The Jonin Outmaneuvered',
                badge: 'TRIAL PASSED',
                badgeClass: 'threat-low',
                icon: '🏆',
                quote: '"Those who break the rules are scum. But those who abandon their comrades are worse than scum!"',
                tags: ['Team 7 Official', 'Genin Pass', 'Konoha Shinobi']
            },
            narrative: `The noon alarm blares across the clearing!

*BRRRRRRR-ING!*

Standing in the center of the field, Kakashi Hatake looks down at his waist. Two silver bells are in your hands, and one is clamped firmly in Naruto's teeth!

Sasuke stands breathing heavily from the trees, while Sakura jumps up and down with uncontrollable tears of joy!

Kakashi slowly untangles the wire from his wrist, his eye crinkling into a warm, genuine smile:

"In the ninja world, those who break the rules and codes are regarded as scum. But those who abandon their comrades and refuse to work together... are worse than scum."

He points at the four of you:

"Shivkumar. Naruto. Sasuke. Sakura. As of this exact second... Team 7 has officially passed! You are now full-fledged Genin of the Hidden Leaf Village!"

Naruto bursts into ecstatic cheers, throwing his arms around you in a bear hug! Sasuke offers a subtle nod of respect, and Sakura wipes her tears with a radiant smile.

Your Senju lineage remains hidden, but your power and tactical brilliance have earned the eternal loyalty of your squad. The Land of Waves, the Chunin Exams, and the fate of the shinobi world lie ahead!`,
            options: [
                {
                    approach: 'mind',
                    tag: '🚢 EMBARK ON ACT III: LAND OF WAVES',
                    label: 'Report to Lord Third at the Hokage Residence to receive your first C-Rank mission: Escorting Bridge Builder Tazuna!',
                    actionType: 'advance',
                    nextNode: 'waves_ch1_tazuna_assignment'
                }
            ]
        }
,

    // ACT III: LAND OF WAVES SAGA
    {
            "id": "waves_ch1_tazuna_assignment",
            "title": "Act III: Mission C-Rank — Escorting the Bridge Builder",
            "act": "Act III - Land of Waves: Prologue",
            "location": "Hokage Administration Office, Konoha",
            "atmosphere": "The third Hokage smoking his pipe, Naruto complaining about weed-pulling chores, and a drunken bridge builder squinting skeptically at Team 7.",
            "image": "assets/team7_bell_test_arena.jpg",
            "audio": "assets/audio/narration/waves_ch1_tazuna_assignment.mp3",
            "illustration": {
                    "title": "The Drunken Architect",
                    "badge": "C-RANK MISSION",
                    "badgeClass": "threat-moderate",
                    "icon": "📜",
                    "quote": "\"What?! A bunch of snot-nosed brats? Especially the runt with the stupid face and the pretty boy in royal blue armor.\"",
                    "tags": [
                            "Tazuna Escort",
                            "Lord Third",
                            "Leaving Konoha"
                    ]
            },
            "narrative": "Tired of chasing lost cats and pulling weeds, Naruto slams his fists on the Third Hokage's desk demanding a real mission!\nLord Third chuckles through a haze of pipe smoke: \"Very well. If you insist on testing your mettle, you are assigned a C-Rank escort mission.\"\n\nThe door swings open with a loud creak. In stumbles Tazuna, a gruff, sun-baked master bridge builder reeking of cheap rice wine:\n\"What is this? A bunch of snot-nosed brats? Especially that noisy little runt over there, and the silver-haired pretty boy in the fancy fur collar. Hey runt, are you even real ninja?\"\n\nNaruto immediately tries to tackle Tazuna, but you step forward with cool composure. Your amber-gold serpentine eyes catch the old man's gaze. Sakura sighs in relief, looking at you with admiration, while Sasuke folds his arms with quiet focus.\n\nThe Land of Waves beckons!",
            "options": [
                    {
                            "approach": "charm",
                            "tag": "💋 SUAVE SENJU REASSURANCE",
                            "label": "Step forward with royal charisma, winking at Sakura while assuring Tazuna that Team 7 will guard his life to the last breath.",
                            "actionType": "check",
                            "stat": "charm",
                            "dc": 12,
                            "successNode": "waves_ch2_demon_brothers_ambush",
                            "failNode": "waves_ch2_demon_brothers_ambush"
                    },
                    {
                            "approach": "mind",
                            "tag": "🔍 SENSORY & TACTICAL RECON",
                            "label": "Use your thermal sensory perception to notice Tazuna's shaking hands and alcohol habit, deducing he is hiding grave danger.",
                            "actionType": "check",
                            "stat": "serpentSense",
                            "dc": 13,
                            "successNode": "waves_ch2_demon_brothers_ambush",
                            "failNode": "waves_ch2_demon_brothers_ambush"
                    },
                    {
                            "approach": "force",
                            "tag": "🗡️ SHINOBI AURA INTIMIDATION",
                            "label": "Release a sliver of dense hydro-chakra that rattles the sake bottle in his grip, silencing his doubts instantly.",
                            "actionType": "check",
                            "stat": "ninjutsu",
                            "dc": 12,
                            "successNode": "waves_ch2_demon_brothers_ambush",
                            "failNode": "waves_ch2_demon_brothers_ambush"
                    }
            ]
    },

    {
            "id": "waves_ch2_demon_brothers_ambush",
            "title": "Act III: The Puddle Ambush — Demon Brothers of the Mist",
            "act": "Act III - Land of Waves: Encounter",
            "location": "Dense Woodlands on Fire Country Border",
            "atmosphere": "A glaring rain puddle on a bone-dry summer day, spiked chains whistling through the air, Kakashi shredded into pieces.",
            "image": "assets/team7_bell_test_arena.jpg",
            "audio": "assets/audio/narration/waves_ch2_demon_brothers_ambush.mp3",
            "illustration": {
                    "title": "Assassins of the Bloody Mist",
                    "badge": "CHUNIN AMBUSH",
                    "badgeClass": "threat-high",
                    "icon": "⛓️",
                    "quote": "\"One down! Now for the bridge builder and the pink-haired girl!\"",
                    "tags": [
                            "Demon Brothers",
                            "Poison Chains",
                            "First Blood"
                    ]
            },
            "narrative": "Several miles outside the village gates, the afternoon sun beats down on a bone-dry dirt path. Yet just ahead lies a solitary puddle of rainwater.\nBefore anyone can speak, the puddle erupts!\n\nTwo lethal chunin assassins from the Hidden Mist—the Demon Brothers, Gozu and Meizu—burst from the water! Their poisoned spiked chains wrap violently around Kakashi-sensei's chest!\n*SPLATTER!*\nIn a sickening spray of blood, Kakashi is torn into bloody chunks before your eyes!\n\n\"One down!\" Gozu snarls with demonic laughter, lunging straight for Tazuna and a petrified Sakura!\nNaruto freezes in sheer shock, his legs trembling! Sasuke draws his shuriken—but the assassins are closing in on Sakura within seconds!",
            "options": [
                    {
                            "approach": "ninjutsu",
                            "tag": "🐍 HIDDEN SHADOW WATER SNAKES",
                            "label": "Fire twin pressurized hydro-vipers from your sleeves to entangle the spiked chain and violently rip it away!",
                            "actionType": "check",
                            "stat": "ninjutsu",
                            "dc": 13,
                            "successNode": "waves_ch2_snake_chain_counter",
                            "failNode": "waves_ch2_snake_chain_counter"
                    },
                    {
                            "approach": "charm",
                            "tag": "🛡️ KNIGHT IN BLUE ARMOR FOR SAKURA",
                            "label": "Flash-step directly in front of Sakura with a swirling water shield: \"Stay behind me, Sakura-chan. I've got you.\"",
                            "actionType": "check",
                            "stat": "charm",
                            "dc": 13,
                            "successNode": "waves_ch2_protect_sakura_flirt",
                            "failNode": "waves_ch2_protect_sakura_flirt"
                    },
                    {
                            "approach": "force",
                            "tag": "💥 SURGING IMPACT FIST COUNTER",
                            "label": "Charge Gozu head-on and shatter his poison claw gauntlet with condensed hydraulic concussive force!",
                            "actionType": "check",
                            "stat": "taijutsu",
                            "dc": 14,
                            "successNode": "waves_ch2_snake_chain_counter",
                            "failNode": "waves_ch2_snake_chain_counter"
                    }
            ]
    },

    {
            "id": "waves_ch2_snake_chain_counter",
            "title": "Act III: Twin Serpents Snap the Chain",
            "act": "Act III - Land of Waves: Counter-Attack",
            "location": "Woodland Highway Edge",
            "atmosphere": "Hissing pressurized water serpents coiling around steel chains, Sasuke pinning the chain to a tree, Kakashi smiling from the shadows.",
            "image": "assets/team7_bell_test_arena.jpg",
            "audio": "assets/audio/narration/waves_ch2_snake_chain_counter.mp3",
            "illustration": {
                    "title": "Chains Shattered",
                    "badge": "TACTICAL COUNTER",
                    "badgeClass": "threat-moderate",
                    "icon": "🐍",
                    "quote": "\"Excellent reflexes, Shivkumar. And Sasuke, clean pinning work.\"",
                    "tags": [
                            "Chain Broken",
                            "Kakashi Feint",
                            "Team Synergy"
                    ]
            },
            "narrative": "*SHHHH-KRAK!*\nTwin serpents of solid pressurized water burst from your sleeves, coiling tightly around the Demon Brothers' spiked chain like titanium vices!\nWith a violent twist of your wrists, you channel Senju hydraulic force, wrenching the chain straight from their hands!\n\nSasuke leaps into the air with lethal precision, driving a kunai and shuriken through the chain links to pin them permanently into an ancient oak trunk!\nGozu and Meizu lunge forward unarmed—only for Kakashi to appear behind them in a blur of motion, locking both assassins in chokeholds!\n\n\"Sorry I didn't help sooner, kids,\" Kakashi winks casually. \"I was letting you show what you learned. Excellent reflexes, Shivkumar. And Sasuke, clean pinning work.\"\nNaruto drops to his knees, clutching his hand in shame, while Sakura breathes a heavy sigh of relief: \"Sensei... you're alive!\"",
            "options": [
                    {
                            "approach": "mind",
                            "tag": "🚢 CROSS THE TIDAL ESTUARY",
                            "label": "Interrogate the captured assassins and board the muffled rowboat into the fog of the Land of Waves.",
                            "actionType": "advance",
                            "nextNode": "waves_ch3_mist_crossing_recon"
                    }
            ]
    },

    {
            "id": "waves_ch2_protect_sakura_flirt",
            "title": "Act III: Knight of the Senju",
            "act": "Act III - Land of Waves: Chivalric Defense",
            "location": "Woodland Highway Edge",
            "atmosphere": "A swirling barrier of water deflecting poison claws, Sakura blushing furiously against your shoulder, Sasuke glaring with cold annoyance.",
            "image": "assets/team7_bell_test_arena.jpg",
            "audio": "assets/audio/narration/waves_ch2_protect_sakura_flirt.mp3",
            "illustration": {
                    "title": "Shielding Sakura",
                    "badge": "ROMANTIC BOND +15",
                    "badgeClass": "threat-low",
                    "icon": "💖",
                    "quote": "\"S-Shivkumar-kun...! You... protected me!\"",
                    "tags": [
                            "Sakura Affection",
                            "Sasuke Jealousy",
                            "Water Shield"
                    ]
            },
            "narrative": "*CLANG-SHHH!*\nIn a spray of mist, you slide directly between Sakura and Gozu's poisoned claws! Your hydro-cloak and steel forearm armor deflect the strike with a deafening metallic ring!\n\"Stay behind me, Sakura-chan,\" you murmur with a confident, flirtatious smirk. \"A gentleman never lets a petal fall from a cherry blossom.\"\n\nSakura's cheeks flush bright crimson, her emerald eyes glowing with heartstruck adoration: \"S-Shivkumar-kun...!\" (+15 Sakura Affection!)\nSasuke's jaw clenches with an unmistakable flash of jealousy as he flips forward to dispatch the second assassin: \"Hmph. Stop flirting and focus on the enemy.\"\n\nKakashi materializes from the brush, subduing both brothers in an instant:\n\"My, my... chivalry on the battlefield. You certainly inherited the legendary Senju charm, Shivkumar. But don't make Sasuke too jealous.\"",
            "options": [
                    {
                            "approach": "mind",
                            "tag": "🚢 CROSS THE TIDAL ESTUARY",
                            "label": "Board the muffled rowboat across the fog-shrouded river into the Land of Waves.",
                            "actionType": "advance",
                            "nextNode": "waves_ch3_mist_crossing_recon"
                    }
            ]
    },

    {
            "id": "waves_ch3_mist_crossing_recon",
            "title": "Act III: Shrouded Waters — Crossing into the Mist",
            "act": "Act III - Land of Waves: Infiltration",
            "location": "Tidal River Estuary, Land of Waves Border",
            "atmosphere": "A muffled wooden rowboat gliding through thick, ghostly white fog, the sound of oar strokes silenced, unseen predators lurking.",
            "image": "assets/team7_bell_test_arena.jpg",
            "audio": "assets/audio/narration/waves_ch3_mist_crossing_recon.mp3",
            "illustration": {
                    "title": "Silent Rowboat in Fog",
                    "badge": "MIST INFILTRATION",
                    "badgeClass": "threat-moderate",
                    "icon": "🌫️",
                    "quote": "\"Gato is a ruthless monster... without this bridge, our people will starve to death.\"",
                    "tags": [
                            "Tazuna Confession",
                            "Ryuuchi Heat Sense",
                            "Silent Waters"
                    ]
            },
            "narrative": "Under a ceiling of dense, suffocating white fog, your small wooden rowboat glides silently across the river. The boatman cuts the engine to avoid drawing patrol boats.\nSitting with his head hung in shame, Tazuna confesses everything:\n\"The truth is... a corrupt shipping magnate named Gato has placed a stranglehold on our country. He controls all maritime trade. The bridge I am building is our people's only hope for survival. When I couldn't afford B-rank protection, I had to lie to the Leaf.\"\n\nKakashi sighs: \"An escort against rogue ninja makes this a B-Rank mission at minimum. But we cannot abandon you now.\"\nSuddenly, your Hebi bloodline begins to pulse. Your thermal sensory perception detects a massive, icy chakra signature vibrating through the fog ahead!",
            "options": [
                    {
                            "approach": "mind",
                            "tag": "🐍 SERPENT THERMAL SENSING",
                            "label": "Focus your amber-gold serpentine slit eyes, tracking body heat signatures through the heavy mist to anticipate the ambush.",
                            "actionType": "check",
                            "stat": "serpentSense",
                            "dc": 13,
                            "successNode": "waves_ch4_zabuza_arrival",
                            "failNode": "waves_ch4_zabuza_arrival"
                    },
                    {
                            "approach": "tactics",
                            "tag": "📐 DIAMOND DEFENSE FORMATION",
                            "label": "Organize Naruto, Sasuke, and Sakura into an equilateral bodyguard formation around Tazuna before stepping ashore.",
                            "actionType": "check",
                            "stat": "tactics",
                            "dc": 13,
                            "successNode": "waves_ch4_zabuza_arrival",
                            "failNode": "waves_ch4_zabuza_arrival"
                    },
                    {
                            "approach": "charm",
                            "tag": "🤝 RALLY SQUAD SPIRIT",
                            "label": "Place a warm hand on Naruto and Sakura's shoulders, reassuring them that Team 7 will conquer whatever lurks in the mist.",
                            "actionType": "check",
                            "stat": "charm",
                            "dc": 12,
                            "successNode": "waves_ch4_zabuza_arrival",
                            "failNode": "waves_ch4_zabuza_arrival"
                    }
            ]
    },

    {
            "id": "waves_ch4_zabuza_arrival",
            "title": "Act III: The Demon of the Hidden Mist Appears",
            "act": "Act III - Land of Waves: Apex Threat",
            "location": "Foggy Forest Clearing near Land of Waves Coast",
            "atmosphere": "The massive Kubikiribocho cleaver spinning through mist and impaling an oak trunk, Kakashi revealing the crimson Sharingan eye.",
            "image": "assets/team7_bell_test_arena.jpg",
            "audio": "assets/audio/narration/waves_ch4_zabuza_arrival.mp3",
            "illustration": {
                    "title": "Zabuza Momochi Unleashed",
                    "badge": "S-RANK ROGUE NINJA",
                    "badgeClass": "threat-extreme",
                    "icon": "🗡️",
                    "quote": "\"Kakashi of the Sharingan eye... hand over the old man and maybe I will let your brats live.\"",
                    "tags": [
                            "Executioner Blade",
                            "Sharingan Revealed",
                            "Silent Killing"
                    ]
            },
            "narrative": "*SHRRRRRR-WHOOSH!*\nA sound like a hurricane cleaving through timber echoes above! A colossal iron broadsword—the legendary Kubikiribocho—spins horizontally through the fog!\n\"EVERYONE DUCK!\" Kakashi screams!\n\nThe massive blade bites deep into an ancient cedar tree. A figure silently lands atop its hilt—a shirtless assassin wrapped in bandages, wearing the Mist forehead protector angled sideways.\n\"Well, well...\" Zabuza Momochi rasps, his killing intent washing over you like liquid ice. \"Kakashi of the Sharingan eye. It's an honor to cross blades with the Copy Ninja.\"\n\nKakashi lifts his forehead protector, uncovering his left eye: the blazing red, three-tomoe Sharingan!\n\"Stay back, Team 7!\" Kakashi barks. \"Protect Tazuna! This man is an elite of the Seven Swordsmen of the Mist!\"\nZabuza vanishes into pure white mist: *\"Larynx, spine, lungs, liver, jugular, subclavian artery... which one should I carve open first?\"*",
            "options": [
                    {
                            "approach": "ninjutsu",
                            "tag": "🐉 WATER DRAGON BULLET DUEL",
                            "label": "Call upon your Tobirama lineage, pulling the moisture from the thick mist into a roaring water dragon to intercept Zabuza!",
                            "actionType": "check",
                            "stat": "ninjutsu",
                            "dc": 14,
                            "successNode": "waves_ch4_water_dragon_clash",
                            "failNode": "waves_ch4_water_dragon_clash"
                    },
                    {
                            "approach": "tactics",
                            "tag": "🛡️ INTERCEPT WATER CLONES",
                            "label": "Detect the faint ripple of water behind Tazuna and strike down Zabuza's clone before his blade cuts the old man down!",
                            "actionType": "check",
                            "stat": "tactics",
                            "dc": 14,
                            "successNode": "waves_ch4_water_dragon_clash",
                            "failNode": "waves_ch4_water_dragon_clash"
                    },
                    {
                            "approach": "agility",
                            "tag": "⚡ SLITHERING SHADOW FLANK",
                            "label": "Use your Serpentine Surge to slide through the mist beneath Zabuza's blind spot alongside Kakashi's Sharingan counter!",
                            "actionType": "check",
                            "stat": "agility",
                            "dc": 15,
                            "successNode": "waves_ch4_water_dragon_clash",
                            "failNode": "waves_ch4_water_dragon_clash"
                    }
            ]
    },

    {
            "id": "waves_ch4_water_dragon_clash",
            "title": "Act III: Dragons of the River Mist",
            "act": "Act III - Land of Waves: Torrential Clash",
            "location": "Riverbank Duel Ground",
            "atmosphere": "Two colossal serpentine water dragons roaring into each other, torrents of water washing over the clearing, Kakashi trapped in a floating sphere.",
            "image": "assets/team7_bell_test_arena.jpg",
            "audio": "assets/audio/narration/waves_ch4_water_dragon_clash.mp3",
            "illustration": {
                    "title": "Water Prison Sealed",
                    "badge": "SENSEI CAPTURED",
                    "badgeClass": "threat-extreme",
                    "icon": "💧",
                    "quote": "\"A Senju brat who molds water without forty seals?! What a prize!\"",
                    "tags": [
                            "Water Prison Jutsu",
                            "Kakashi Trapped",
                            "Crisis"
                    ]
            },
            "narrative": "*ROOOOAAAAR!*\nMassive geysers of water erupt from the lake! Your hydro-chakra commands the river currents with ancient Senju precision, forming a roaring dragon that smashes against Zabuza's water technique with cataclysmic force!\nZabuza's eyes widen with venomous shock:\n\"What?! A Genin brat who conjures water dragons without forty hand-seals?! You carry the blood of the Second Hokage!\"\n\nZabuza uses the blinding splash of water to execute a sinister feint. Before Kakashi can react on the slick lake surface, Zabuza surges behind him, sealing his hands into a floating, pressurized sphere of water!\n*Water Prison Jutsu!*\n\nKakashi is trapped inside the sphere, unable to breathe or weave seals! Zabuza maintains the prison with one hand, while his water clone grins menacingly at Team 7:\n\"Run, all of you!\" Kakashi shouts through the water barrier. \"You cannot defeat him! Take Tazuna and run!\"",
            "options": [
                    {
                            "approach": "force",
                            "tag": "⚡ LAUNCH TEAM 7 RESCUE PLAN",
                            "label": "Stand firm with Naruto and Sasuke to execute the ultimate cooperative feint to break Zabuza's water prison!",
                            "actionType": "advance",
                            "nextNode": "waves_ch5_water_prison_rescue"
                    }
            ]
    },

    {
            "id": "waves_ch5_water_prison_rescue",
            "title": "Act III: The Water Prison Breakthrough",
            "act": "Act III - Land of Waves: Tactical Climax",
            "location": "Lake Center, Land of Waves",
            "atmosphere": "A Demon Wind Shuriken sailing through mist, a shadow clone disguised as steel, water serpents snapping at Zabuza's wrist.",
            "image": "assets/team7_bell_test_arena.jpg",
            "audio": "assets/audio/narration/waves_ch5_water_prison_rescue.mp3",
            "illustration": {
                    "title": "The Fuma Shuriken Feint",
                    "badge": "PRISON SHATTERED",
                    "badgeClass": "threat-high",
                    "icon": "⭐",
                    "quote": "\"Senju ninja never leave their sensei behind. Naruto, Sasuke, now!\"",
                    "tags": [
                            "Fuma Shuriken Combo",
                            "Prison Broken",
                            "Kakashi Freed"
                    ]
            },
            "narrative": "\"Run?\" you shout across the water, your silver hair whipping in the wind. \"Senju ninja never abandon their comrades!\"\nNaruto grins wildly: \"Damn right! Sasuke, let's do that thing!\"\n\nSasuke unclasps a giant Demon Wind Shuriken (Fuma Shuriken). He leaps into the air and hurls it directly at Zabuza's clone!\nZabuza catches it easily with one hand—only for a second shuriken to emerge from its shadow!\nZabuza leaps to dodge—and that second shuriken transforms with a puff of smoke into Naruto, who hurls a kunai right at Zabuza's eye!\n\nAt that exact split second, your twin pressurized water serpents erupt from beneath the lake surface, snapping around Zabuza's wrist that holds the Water Prison!\nForced to let go or lose his arm, Zabuza breaks the seal!\n\n*SPLASH!*\nKakashi bursts from the water sphere, his Sharingan blazing with fury:\n\"Shivkumar, Naruto, Sasuke... outstanding work. Now it's my turn!\"",
            "options": [
                    {
                            "approach": "mind",
                            "tag": "🌲 ADVANCE TO CHAKRA TREE CLIMBING",
                            "label": "Watch Kakashi unleash the Great Waterfall Jutsu and prepare for the mysterious masked hunter-nin.",
                            "actionType": "advance",
                            "nextNode": "waves_ch6_tree_climbing_training"
                    }
            ]
    },

    {
            "id": "waves_ch6_tree_climbing_training",
            "title": "Act III: The Masked Tracker & Chakra Tree Climbing",
            "act": "Act III - Land of Waves: Training Arc",
            "location": "Tazuna's Coastal House & Deep Forest",
            "atmosphere": "Two senbon needles piercing Zabuza's neck, Kakashi collapsing from chakra exhaustion, Team 7 running vertically up giant trees.",
            "image": "assets/team7_bell_test_arena.jpg",
            "audio": "assets/audio/narration/waves_ch6_tree_climbing_training.mp3",
            "illustration": {
                    "title": "Vertical Tree Walking",
                    "badge": "CHAKRA MASTERY",
                    "badgeClass": "threat-moderate",
                    "icon": "🌲",
                    "quote": "\"Focus your chakra into the soles of your feet... not too little, not too much.\"",
                    "tags": [
                            "Haku Deception",
                            "Chakra Control",
                            "Sakura Bonding"
                    ]
            },
            "narrative": "Just as Kakashi prepares to finish Zabuza with a kunai, two senbon needles pierce Zabuza's neck! A mysterious masked Hunter-nin (Haku) appears in a tree, claiming the kill and vanishing with the body.\nMoments later, Kakashi collapses face-first into the dirt from Sharingan exhaustion!\n\nResting at Tazuna's home, Kakashi drops a bombshell: Hunter-nin dispose of bodies on the spot—Haku actually saved Zabuza using temporary death needles! Zabuza is still alive!\nTo prepare for the rematch, Kakashi sends Team 7 into the forest:\n\"You must learn vertical Tree-Climbing by focusing precise chakra to the soles of your feet.\"\n\nYou stride toward a towering oak. With your Senju chakra control, you walk smoothly up the vertical trunk all the way to the canopy, waving down at Sasuke and Naruto!\nSasuke grinds his teeth with fierce competitive fire, while Sakura cheers your name with starry eyes!",
            "options": [
                    {
                            "approach": "chakra",
                            "tag": "⚡ ADVANCED CANOPY SENSORY",
                            "label": "Perch atop the canopy and meditate, honing your thermal sensory vision to detect Haku's ice chakra signatures.",
                            "actionType": "check",
                            "stat": "chakraReserves",
                            "dc": 13,
                            "successNode": "waves_ch7_ice_mirrors_bridge",
                            "failNode": "waves_ch7_ice_mirrors_bridge"
                    },
                    {
                            "approach": "charm",
                            "tag": "🌸 PRIVATE TUTORING WITH SAKURA",
                            "label": "Help Sakura with chakra dampening under the cherry blossoms, teasing her gently about your upcoming victory.",
                            "actionType": "check",
                            "stat": "charm",
                            "dc": 14,
                            "successNode": "waves_ch7_ice_mirrors_bridge",
                            "failNode": "waves_ch7_ice_mirrors_bridge"
                    },
                    {
                            "approach": "tactics",
                            "tag": "🔥 PUSH SASUKE'S RIVALRY",
                            "label": "Challenge Sasuke to a race to the summit, fueling his Uchiha pride to awaken his Sharingan faster.",
                            "actionType": "check",
                            "stat": "tactics",
                            "dc": 13,
                            "successNode": "waves_ch7_ice_mirrors_bridge",
                            "failNode": "waves_ch7_ice_mirrors_bridge"
                    }
            ]
    },

    {
            "id": "waves_ch7_ice_mirrors_bridge",
            "title": "Act III: Blood on the Mist — Crystal Ice Mirrors",
            "act": "Act III - Land of Waves: The Final Battle",
            "location": "The Great Naruto Bridge, High Over the Sea",
            "atmosphere": "Twenty floating mirrors of solid ice, senbon needles flying faster than the eye can see, Sasuke and Naruto bleeding inside the dome.",
            "image": "assets/team7_bell_test_arena.jpg",
            "audio": "assets/audio/narration/waves_ch7_ice_mirrors_bridge.mp3",
            "illustration": {
                    "title": "Dome of Ice Mirrors",
                    "badge": "KEKKEI GENKAI",
                    "badgeClass": "threat-extreme",
                    "icon": "❄️",
                    "quote": "\"Secret Jutsu: Crystal Ice Mirrors. In here, your speed is nothing compared to light.\"",
                    "tags": [
                            "Haku Kekkei Genkai",
                            "Ice Dome",
                            "Sasuke & Naruto Trapped"
                    ]
            },
            "narrative": "One week later, a thick mist blankets the Great Bridge. The bridge workers lie unconscious, and Zabuza stands waiting alongside his masked partner, Haku!\nKakashi engages Zabuza in a furious clash of blade and Sharingan, while Haku traps Naruto and Sasuke inside an inescapable dome of twenty floating ice mirrors!\n\n*Secret Jutsu: Crystal Ice Mirrors!*\nMoving between the reflective surfaces at near light-speed, Haku unleashes a relentless barrage of senbon needles! Blood spatters against the ice as Sasuke and Naruto collapse back-to-back, punctured and bleeding!\nOutside the dome, Sakura guards Tazuna with trembling hands: \"Shivkumar-kun! Sasuke and Naruto are going to die in there!\"\n\nYour amber-gold serpentine slit eyes narrow. You can sense Haku's body heat shifting between the frozen mirrors!",
            "options": [
                    {
                            "approach": "force",
                            "tag": "💥 SERPENT SENSE & SURGING IMPACT FIST",
                            "label": "Track Haku's true thermal body heat between mirror jumps and shatter the central ice mirror with a full-power Surging Fist!",
                            "actionType": "check",
                            "stat": "taijutsu",
                            "dc": 15,
                            "successNode": "waves_ch8_bridge_triumph",
                            "failNode": "waves_ch8_bridge_triumph"
                    },
                    {
                            "approach": "ninjutsu",
                            "tag": "🌊 DUAL WATER SNAKE BREACH",
                            "label": "Channel twin hydro-vipers deep under the bridge surface, flooding the ice dome with boiling pressurized water to melt the mirrors!",
                            "actionType": "check",
                            "stat": "ninjutsu",
                            "dc": 15,
                            "successNode": "waves_ch8_bridge_triumph",
                            "failNode": "waves_ch8_bridge_triumph"
                    },
                    {
                            "approach": "charm",
                            "tag": "🕊️ APPEAL TO HAKU'S TRUE HEART",
                            "label": "Speak to Haku as a fellow orphan of war: \"You are not just a tool, Haku! Do not throw away your life for Gato's greed!\"",
                            "actionType": "check",
                            "stat": "charm",
                            "dc": 14,
                            "successNode": "waves_ch8_bridge_triumph",
                            "failNode": "waves_ch8_bridge_triumph"
                    }
            ]
    },

    {
            "id": "waves_ch8_bridge_triumph",
            "title": "Act III: The Bridge of Heroes & The Demon's Tears",
            "act": "Act III - Land of Waves: Epilogue",
            "location": "The Great Naruto Bridge (Sunlight Breaking Fog)",
            "atmosphere": "Falling snow in early summer, Zabuza cutting through Gato's mercenary army with a kunai in his teeth, the Great Bridge completed.",
            "image": "assets/team7_bell_test_arena.jpg",
            "audio": "assets/audio/narration/waves_ch8_bridge_triumph.mp3",
            "illustration": {
                    "title": "Tears of the Demon",
                    "badge": "ACT III COMPLETED",
                    "badgeClass": "threat-low",
                    "icon": "🏆",
                    "quote": "\"Boy... your words cut deeper than any blade. Farewell, Haku.\"",
                    "tags": [
                            "Zabuza Redemption",
                            "Bridge of Hope",
                            "To Chunin Exams"
                    ]
            },
            "narrative": "*SHATTER!*\nThe ice mirror dome explodes into millions of glittering crystals! Naruto unleashes the orange demonic chakra of the Nine-Tails, while Sasuke awakens the dual-tomoe Sharingan!\nAcross the bridge, Kakashi charges forward with the chirping lightning of the Chidori! Haku throws his body in front of Zabuza, taking the lethal lightning thrust through his chest to protect his master!\n\nJust then, the grotesque billionaire Gato arrives with a horde of a hundred cutthroat mercenaries! Gato laughs and kicks Haku's lifeless body!\nNaruto screams in tears: \"He loved you, Zabuza! And you treat him like an old tool?!\"\n\nTears stream down Zabuza's battle-scarred face beneath his bandages:\n\"Boy... your words cut deeper than any blade.\"\nClenching a single kunai between his teeth, the Demon of the Mist charges solo into Gato's army like an enraged dragon, slaying dozens and decapitating Gato on the edge of the bridge!\n\nAs early summer snow begins to fall gently over the sea, Kakashi places Zabuza beside Haku for their final rest.\nThe bridge is saved. Tazuna wipes tears from his eyes, carving the bridge's true name into the master pillar:\n**THE GREAT NARUTO & SENJU BRIDGE OF HOPE!**\n\nTeam 7 returns home to Konoha as legendary heroes. The Chunin Exams await!",
            "options": [
                    {
                            "approach": "mind",
                            "tag": "📜 ADVANCE TO ACT IV: THE CHUNIN EXAMS",
                            "label": "Return to the Hidden Leaf Village and register Team 7 for the Chunin Selection Exams and the Forest of Death!",
                            "actionType": "advance",
                            "nextNode": "waves_ch8_bridge_triumph"
                    }
            ]
    }
    ]
};

window.NarutoCampaignData = NarutoCampaignData;
