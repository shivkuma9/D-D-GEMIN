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

        // CHAPTER 3: The Climax — Team 7 United
        {
            id: 'ch3_teamwork_revelation',
            title: 'Act III: The Unbreakable Four-Man Chain',
            act: 'Act III - True Shinobi Creed',
            location: 'Training Ground 3 Forest Perimeter',
            atmosphere: 'Alarm clock ticking closer to noon, Sakura bandaging Naruto, Sasuke clenching his fists, Shivkumar drawing the battle plan in the dirt.',
            image: 'assets/team7_bell_test_arena.jpg',
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
            options: [] // Saga complete screen
        }
    ]
};

window.NarutoCampaignData = NarutoCampaignData;
