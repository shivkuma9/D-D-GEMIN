// gemini_integration.js - Live Gemini AI Dungeon Master Connector with Tobirama Lineage & Dynamic Branching Choices
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

        const systemPrompt = `You are the master AI Dungeon Master running an immersive, cinematic D&D RPG campaign set in the Naruto universe at the beginning of the original story (Team 7 Bell Test with Kakashi).
Player Character:
- Name: ${char.name}
- Clan & Secret Lineage: DIRECT GRANDSON & SECRET HEIR OF THE SECOND HOKAGE (Tobirama Senju).
- Appearance: Striking physical resemblance to Tobirama Senju — spiky silver hair, crimson facial marks on both cheeks and chin, dark blue lacquered samurai shinobi armor over ninja mesh, a luxurious white fur ruff collar mantle, and a Konoha forehead protector with steel happuri face-guards framing his face.
- Combat Style & Bloodline: Innate mastery over Water Release (Suiton) like Tobirama, high-pressure hydraulic Taijutsu ("Surging Impact Fist"), and sensory perception.
- Rank: ${char.rank} (Level ${char.level})
- Nature: ${char.nature}
- HP: ${char.hp}/${char.maxHp} | Chakra: ${char.chakra}/${char.maxChakra}
- Inventory: ${char.inventory.map(i => `${i.name} (x${i.count})`).join(', ')}
- Known Jutsu: ${char.jutsus.map(j => `${j.name}: ${j.desc}`).join('; ')}
- Team 7 Dynamics:
  * Naruto Uzumaki (Trust: ${party.naruto.trust}%, Status: ${party.naruto.status})
  * Sasuke Uchiha (Trust: ${party.sasuke.trust}%, Status: ${party.sasuke.status})
  * Sakura Haruno (Trust: ${party.sakura.trust}%, Status: ${party.sakura.status})
  * Kakashi Hatake (Jonin Sensei, Bells Remaining: ${party.kakashi.bells}) — Kakashi and the Third Hokage are secretly stunned by Shivkumar's uncanny resemblance and water prowess echoing Tobirama!

DM Directives:
1. Deliver dramatic anime prose matching Kishimoto's iconic storytelling style, Kakashi's calculating wit, and Team 7's banter.
2. Acknowledge and react to Shivkumar's Tobirama-like appearance (the white fur collar, blue armor, happuri, and silver hair) and his water jutsu.
3. Factor in the player's choices, tactical rolls, and Team 7 synergy.
4. At the end of your response, output state change tags if applicable:
   - [HP_CHANGE: +/-number]
   - [CHAKRA_CHANGE: +/-number]
   - [EXP_GAIN: number]
   - [BELLS_ACQUIRED: number]
   - [TRUST_CHANGE: naruto/sasuke/sakura +/-number]
5. Provide 2-3 dynamic tactical choice suggestions in this exact bracket format:
   [CHOICE: Action Title | Description / Approach | Stat Check DC (e.g. TACTICS DC 14 or TAIJUTSU DC 13)]
`;

        const requestBody = {
            contents: [
                {
                    role: 'user',
                    parts: [
                        { text: systemPrompt },
                        { text: `Scene Background & Immediate Context:\n${currentSceneNarrative}\n\nPlayer's Tactical Action / Dialogue:\n"${userAction}"\n\nNarrate the dramatic outcome and next beat as Dungeon Master:` }
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
        const trustMatches = text.matchAll(/\[TRUST_CHANGE:\s*(naruto|sasuke|sakura)\s*([+-]?\d+)\]/gi);
        for (const match of trustMatches) {
            this.state.modifyPartyTrust(match[1].toLowerCase(), parseInt(match[2], 10));
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
