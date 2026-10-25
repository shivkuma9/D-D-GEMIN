// gemini_integration.js - Live Gemini AI Dungeon Master Connector with Tobirama Grandson & Snake Clan Lineage + Romance/Rivalry System
class GeminiDMConnector {
    constructor(stateManager) {
        this.state = stateManager;
        this.apiKey = localStorage.getItem('gemini_dm_api_key') || '';
        this.model = localStorage.getItem('gemini_dm_model') || 'gemini-flash-latest';
        this.enabled = !!this.apiKey;
    }

    setApiKey(key) {
        this.apiKey = (key || '').trim();
        this.enabled = !!this.apiKey;
        if (this.apiKey) {
            localStorage.setItem('gemini_dm_api_key', this.apiKey);
        } else {
            localStorage.removeItem('gemini_dm_api_key');
        }
    }

    setModel(modelName) {
        this.model = modelName || 'gemini-flash-latest';
        localStorage.setItem('gemini_dm_model', this.model);
    }

    async promptDungeonMaster(userAction, currentSceneNarrative) {
        if (!this.enabled || !this.apiKey) {
            throw new Error('Gemini API key is not configured.');
        }

        const char = this.state.character;
        const party = char.party;

        const systemPrompt = `You are the master AI Dungeon Master running an immersive, cinematic anime D&D RPG campaign set in the Naruto universe starting from the Team 7 Bell Test and progressing across the entire saga.

Player Character:
- Name: ${char.name}
- Clan & Secret Dual Lineage:
  * Paternal Grandson of the Second Hokage (Tobirama Senju) — inherits immense Senju chakra reserves, royal Shinobi prestige, and peerless Water Release (Suiton) mastery.
  * Maternal Heir of the Ancient Hebi/Snake Clan (connected to Ryuuchi Cave / Orochimaru's lineage) — inherits amber-gold slit eyes, thermal sensory perception, flexible movement, venom immunity, and Hidden Shadow Snake techniques.
- Appearance: Striking physical resemblance to Tobirama Senju with spiky silver hair, crimson facial marks on both cheeks and chin, piercing amber-gold serpentine eyes, dark blue lacquered samurai shinobi armor over ninja mesh, a white fur ruff collar mantle, and Konoha steel happuri headplate.
- Personality: A brilliant tactical prodigy with a hidden charming rogue / flirtatious side (reminiscent of Jiraiya). He loves teasing and flirting with kunoichi (Sakura, Hinata, Ino), vying for their affection, and sparking humorous and tense romantic rivalry with Naruto and Sasuke.
- Stats:
  * Ninjutsu: ${char.stats.ninjutsu} | Taijutsu: ${char.stats.taijutsu} | Genjutsu: ${char.stats.genjutsu}
  * Agility: ${char.stats.agility} | Chakra: ${char.stats.chakraReserves} | Tactics: ${char.stats.tactics}
  * Charm / Allure: ${char.stats.charm} (used for flirting, persuasion, charisma)
  * Serpent Sense: ${char.stats.serpentSense} (thermal vision, stealth detection, venom immunity)
- Rank: ${char.rank} (Level ${char.level}) | HP: ${char.hp}/${char.maxHp} | Chakra: ${char.chakra}/${char.maxChakra}
- Equipped Jutsus: ${char.jutsus.map(j => `${j.name}: ${j.desc}`).join('; ')}
- Bonds & Rivalry Dynamics:
  * Naruto Uzumaki (Trust: ${party.naruto.trust}%, Rivalry: ${party.naruto.rivalry || 'Friendly Rival'}, Jealousy: ${party.naruto.jealousy || 10}%)
  * Sasuke Uchiha (Trust: ${party.sasuke.trust}%, Rivalry: ${party.sasuke.rivalry || 'Tense Romantic Rival'}, Jealousy: ${party.sasuke.jealousy || 25}%)
  * Sakura Haruno (Trust: ${party.sakura.trust}%, Affection: ${party.sakura.affection || 30}%, Rank: ${party.sakura.romanceRank || 'C'})
  * Hinata Hyuga (Affection: ${party.hinata?.affection || 25}%, Rank: ${party.hinata?.romanceRank || 'C'})
  * Ino Yamanaka (Affection: ${party.ino?.affection || 25}%, Rank: ${party.ino?.romanceRank || 'C'})
  * Kakashi Hatake (Jonin Sensei, Bells Remaining: ${party.kakashi.bells}) — secretly observing the legendary Senju-Hebi hybrid chakra.

DM Directives:
1. Deliver dramatic, stylish anime prose matching Kishimoto's iconic storytelling style, with crisp tactical battle choreography and playful romantic banter.
2. Acknowledge and react to Shivkumar's hybrid lineage: his Tobirama-like silver hair, white fur collar, water dominance, and sudden serpentine shadow snake strikes.
3. React dynamically to flirtatious actions, teasing, and charm: show female ninja blushing, getting flustered, or teasing back, while Sasuke glares with subtle jealousy and Naruto gets hilariously defensive. Keep romance stylish, comedic, and high-quality anime drama (PG-13 / T-rated shonen romance).
4. At the end of your response, output state change tags if applicable:
   - [HP_CHANGE: +/-number]
   - [CHAKRA_CHANGE: +/-number]
   - [EXP_GAIN: number]
   - [BELLS_ACQUIRED: number]
   - [TRUST_CHANGE: naruto/sasuke/sakura/hinata/ino +/-number]
   - [AFFECTION_CHANGE: sakura/hinata/ino +/-number]
   - [JEALOUSY_CHANGE: sasuke/naruto +/-number]
5. Provide 2-3 dynamic tactical & social choice suggestions in this exact bracket format:
   [CHOICE: Action Title | Description / Approach | Stat Check DC (e.g. CHARM DC 14, TACTICS DC 13, or NINJUTSU DC 14)]
`;

        const requestBody = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: systemPrompt },
                        { text: `Scene Background & Immediate Context:\n${currentSceneNarrative}\n\nPlayer's Action / Dialogue:\n"${userAction}"\n\nNarrate the dramatic and romantic outcome as Dungeon Master:` }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.85,
                maxOutputTokens: 1200
            }
        };

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || `Gemini API (${this.model}) call failed.`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'The chakra settles into silence...';
        
        // Parse state tags from Gemini response
        this.applyStateDeltas(text);

        return text;
    }

    applyStateDeltas(text) {
        // HP Change
        const hpMatch = text.match(/\[HP_CHANGE:\s*([+-]?\d+)\]/i);
        if (hpMatch) this.state.modifyHp(parseInt(hpMatch[1], 10));

        // Chakra Change
        const chakraMatch = text.match(/\[CHAKRA_CHANGE:\s*([+-]?\d+)\]/i);
        if (chakraMatch) {
            const val = parseInt(chakraMatch[1], 10);
            if (val < 0) this.state.useChakra(Math.abs(val));
            else this.state.character.chakra = Math.min(this.state.character.maxChakra, this.state.character.chakra + val);
        }

        // EXP Gain
        const expMatch = text.match(/\[EXP_GAIN:\s*(\d+)\]/i);
        if (expMatch) this.state.addExperience(parseInt(expMatch[1], 10));

        // Trust Changes
        const trustMatches = text.matchAll(/\[TRUST_CHANGE:\s*(naruto|sasuke|sakura|hinata|ino)\s*([+-]?\d+)\]/gi);
        for (const match of trustMatches) {
            this.state.modifyPartyTrust(match[1].toLowerCase(), parseInt(match[2], 10));
        }

        // Affection Changes
        const affectionMatches = text.matchAll(/\[AFFECTION_CHANGE:\s*(sakura|hinata|ino)\s*([+-]?\d+)\]/gi);
        for (const match of affectionMatches) {
            this.state.modifyAffection(match[1].toLowerCase(), parseInt(match[2], 10));
        }

        // Jealousy Changes
        const jealousyMatches = text.matchAll(/\[JEALOUSY_CHANGE:\s*(sasuke|naruto)\s*([+-]?\d+)\]/gi);
        for (const match of jealousyMatches) {
            const target = match[1].toLowerCase();
            if (this.state.character.party[target]) {
                const cur = this.state.character.party[target].jealousy || 0;
                this.state.character.party[target].jealousy = Math.max(0, Math.min(100, cur + parseInt(match[2], 10)));
                this.state.save();
            }
        }

        // Bells Acquired
        const bellMatch = text.match(/\[BELLS_ACQUIRED:\s*(\d+)\]/i);
        if (bellMatch) {
            this.state.mission.bellsSecured = Math.min(3, this.state.mission.bellsSecured + parseInt(bellMatch[1], 10));
        }
    }

    extractChoices(text) {
        const choices = [];
        const choiceRegex = /\[(?:CHOICE|CHOICE_[A-Z]):\s*([^|\]]+)\s*\|\s*([^|\]]+)(?:\s*\|\s*([^\]]+))?\]/gi;
        let match;
        while ((match = choiceRegex.exec(text)) !== null) {
            choices.push({
                label: match[1].trim(),
                desc: match[2].trim(),
                check: match[3] ? match[3].trim() : 'PROCEED'
            });
        }
        return choices;
    }
}

window.GeminiDMConnector = GeminiDMConnector;
