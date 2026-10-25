// character_state.js - Shinobi State Management Engine with Tobirama Grandson & Hebi Snake Clan Lineage + Romance/Rivalry System
class ShinobiStateManager {
    constructor() {
        this.STORAGE_KEY = 'gemini_dnd_shinobi_save';
        this.character = this.getDefaultCharacter();
        this.mission = {
            id: 'bell_test_01',
            name: 'Survival Exercise: The Bell Test',
            location: 'Konohagakure - Training Ground 3',
            deadline: '12:00 PM (Noon)',
            bellsRequired: 1,
            bellsTotal: 3,
            bellsSecured: 0,
            status: 'IN PROGRESS'
        };
        this.currentNode = 'bell_test_start';
        this.savedNarrative = null;
        this.savedChoices = null;
        this.history = [];
        this.load();
    }

    getDefaultCharacter() {
        return {
            name: 'Shivkumar Senju',
            clan: 'Senju-Hebi Hybrid (Grandson of 2nd Hokage Tobirama × Ancient Snake Clan)',
            title: 'Grandson of Tobirama // Serpentine Water Prodigy',
            nature: 'Water Release (Suiton) + Serpentine Chakra (Hebi)',
            rank: 'Genin',
            level: 1,
            exp: 0,
            expNext: 100,
            hp: 100,
            maxHp: 100,
            chakra: 100,
            maxChakra: 100,
            ryo: 2400,
            avatar: 'assets/shivkumar_senju_portrait.jpg',
            appearance: 'Striking physical resemblance to the Second Hokage (Tobirama Senju): spiky silver hair, crimson facial marks on both cheeks and chin, piercing amber-gold serpentine slit eyes, dark blue lacquered samurai armor over black mesh, white fur collar mantle, and Konoha forehead protector with steel happuri face-guards.',
            personality: 'Calculating tactical genius with a hidden charming rogue side (reminiscent of Jiraiya); loves teasing and flirting with kunoichi while engaging in tense romantic rivalry with Naruto and Sasuke.',
            stats: {
                ninjutsu: 70,
                taijutsu: 72,
                genjutsu: 48,
                agility: 68,
                chakraReserves: 88,
                tactics: 78,
                charm: 82,        // Flirtation, charisma, persuasion, and romantic allure
                serpentSense: 75  // Thermal sensory vision, venom resistance, stealth detection
            },
            jutsus: [
                {
                    id: 'surging_fist',
                    name: 'Water Release: Surging Impact Fist',
                    cost: 20,
                    type: 'Taijutsu + Ninjutsu',
                    desc: 'Condensed hydro-chakra detonates inside the target on contact with heavy hydraulic crushing force.'
                },
                {
                    id: 'hidden_water_snakes',
                    name: 'Hidden Shadow Water Snake Hands',
                    cost: 25,
                    type: 'Hebi + Suiton Bloodline',
                    desc: 'Twin pressurized water serpents lash out from sleeves to grapple, disarm weapons, or constrict enemy ninja.'
                },
                {
                    id: 'slithering_surge',
                    name: 'Water Release: Slithering Surge',
                    cost: 15,
                    type: 'Serpentine Evasion',
                    desc: 'Liquefies movement along the ground or river, effortlessly slipping out of enemy holds with fluid serpentine agility.'
                },
                {
                    id: 'water_shadow_clone',
                    name: 'Water-Shadow Clone Jutsu',
                    cost: 25,
                    type: 'Tobirama Forbidden Variant',
                    desc: 'Ancestral forbidden clone technique that relays memories and bursts into a blinding torrent when struck.'
                },
                {
                    id: 'body_substitution',
                    name: 'Body Replacement Technique (Kawarimi)',
                    cost: 10,
                    type: 'Evasion',
                    desc: 'Instantly swaps positions with a log or decoy to avoid lethal damage.'
                }
            ],
            inventory: [
                { id: 'kunai', name: 'Shinobi Kunai', count: 5, icon: '🗡️', desc: 'Versatile steel throwing & parrying blade' },
                { id: 'shuriken', name: 'Star Shuriken', count: 5, icon: '⭐', desc: 'Precision curved throwing stars' },
                { id: 'ninja_wire', name: 'Steel Ninja Wire', count: 2, icon: '🪢', desc: 'High-tensile monofilament chakra wire' },
                { id: 'smoke_bomb', name: 'Phosphor Smoke Bomb', count: 2, icon: '💨', desc: 'Instantly creates a dense smokescreen' },
                { id: 'soldier_pill', name: 'Military Ration Pill', count: 2, icon: '💊', heals: 35, desc: 'Herbal stimulant that heals +35 HP' },
                { id: 'chakra_pill', name: 'Chakra Restoration Pill', count: 2, icon: '🧪', restores: 40, desc: 'Refined reagent that restores +40 Chakra' },
                { id: 'heaven_scroll', name: 'Heaven Scroll', count: 1, icon: '📜', desc: 'Chunin Exam trial scroll. Protect with your life!' }
            ],
            party: {
                naruto: {
                    name: 'Naruto Uzumaki',
                    role: 'Nine-Tails Jinchuriki',
                    hp: 120,
                    maxHp: 120,
                    trust: 35,
                    rivalry: 'Friendly Rival',
                    jealousy: 10,
                    status: 'Charging head-on with clones; suspicious of your smooth talk',
                    avatar: '🍜'
                },
                sasuke: {
                    name: 'Sasuke Uchiha',
                    role: 'Sharingan Heir',
                    hp: 95,
                    maxHp: 95,
                    trust: 15,
                    rivalry: 'Tense Romantic & Combat Rival',
                    jealousy: 25,
                    status: 'Stealthed in foliage; glaring coldly when you flirt',
                    avatar: '🔥'
                },
                sakura: {
                    name: 'Sakura Haruno',
                    role: 'Tactical Trainee',
                    hp: 80,
                    maxHp: 80,
                    trust: 25,
                    affection: 30,
                    romanceRank: 'C',
                    status: 'Blushing at your forward Senju charm; glancing between you and Sasuke',
                    avatar: '🌸'
                },
                hinata: {
                    name: 'Hinata Hyuga',
                    role: 'Byakugan Princess',
                    hp: 85,
                    maxHp: 85,
                    trust: 20,
                    affection: 25,
                    romanceRank: 'C',
                    status: 'Peeking shyly from behind trees; charmed by your royal presence',
                    avatar: '💜'
                },
                ino: {
                    name: 'Ino Yamanaka',
                    role: 'Mind Transmission Specialist',
                    hp: 80,
                    maxHp: 80,
                    trust: 20,
                    affection: 25,
                    romanceRank: 'C',
                    status: 'Smirking at your suave confidence; playfully teasing Sasuke about you',
                    avatar: '💐'
                },
                kakashi: {
                    name: 'Kakashi Hatake',
                    role: 'Jonin Instructor (Copy Ninja)',
                    hp: 400,
                    maxHp: 400,
                    bells: 3,
                    trust: 40,
                    status: 'Reading Icha Icha Paradise; chuckling at your womanizing charm',
                    avatar: '📖'
                }
            }
        };
    }

    addExperience(amount) {
        this.character.exp += amount;
        if (this.character.exp >= this.character.expNext) {
            this.character.level += 1;
            this.character.exp -= this.character.expNext;
            this.character.expNext = Math.floor(this.character.expNext * 1.5);
            this.character.maxHp += 15;
            this.character.maxChakra += 20;
            this.character.hp = this.character.maxHp;
            this.character.chakra = this.character.maxChakra;
            this.character.stats.ninjutsu += 3;
            this.character.stats.taijutsu += 3;
            this.character.stats.agility += 2;
            this.character.stats.chakraReserves += 4;
            this.character.stats.charm += 2;
            this.save();
            return true;
        }
        this.save();
        return false;
    }

    useChakra(amount) {
        if (this.character.chakra < amount) return false;
        this.character.chakra -= amount;
        this.save();
        return true;
    }

    modifyHp(delta) {
        this.character.hp = Math.max(0, Math.min(this.character.maxHp, this.character.hp + delta));
        this.save();
    }

    modifyPartyTrust(memberKey, delta) {
        if (this.character.party[memberKey]) {
            this.character.party[memberKey].trust = Math.max(0, Math.min(100, this.character.party[memberKey].trust + delta));
            this.save();
        }
    }

    modifyAffection(targetKey, delta) {
        if (this.character.party[targetKey] && this.character.party[targetKey].affection !== undefined) {
            this.character.party[targetKey].affection = Math.max(0, Math.min(100, this.character.party[targetKey].affection + delta));
            const aff = this.character.party[targetKey].affection;
            if (aff >= 90) this.character.party[targetKey].romanceRank = 'S';
            else if (aff >= 60) this.character.party[targetKey].romanceRank = 'A';
            else if (aff >= 30) this.character.party[targetKey].romanceRank = 'B';
            else this.character.party[targetKey].romanceRank = 'C';
            this.save();
        }
    }

    calculateCombatPower() {
        const s = this.character.stats;
        const base = (s.ninjutsu * 2.2) + (s.taijutsu * 2.0) + (s.genjutsu * 1.2) + 
                     (s.agility * 1.8) + (s.chakraReserves * 2.5) + (s.tactics * 1.8) + 
                     ((s.charm || 80) * 1.2) + ((s.serpentSense || 75) * 1.5);
        const levelMult = 1 + ((this.character.level - 1) * 0.12);
        return Math.round(base * levelMult);
    }

    getPowerTier() {
        const power = this.calculateCombatPower();
        if (power < 1000) return 'Genin Trainee';
        if (power < 1400) return 'Standard Genin';
        if (power < 1800) return 'High-Genin [Chunin Candidate]';
        if (power < 2500) return 'Chunin Elite';
        if (power < 3500) return 'Special Jonin';
        if (power < 5000) return 'Jonin Master';
        return 'Kage / Legend';
    }

    useInventoryItem(itemId) {
        const item = this.character.inventory.find(i => i.id === itemId);
        if (!item || item.count <= 0) {
            return { success: false, message: 'Item not available!' };
        }

        let message = '';
        if (itemId === 'soldier_pill') {
            const heal = item.heals || 35;
            this.character.hp = Math.min(this.character.maxHp, this.character.hp + heal);
            item.count -= 1;
            message = `Consumed Military Ration Pill! Restored +${heal} HP. Current HP: ${this.character.hp}/${this.character.maxHp}`;
        } else if (itemId === 'chakra_pill') {
            const restore = item.restores || 40;
            this.character.chakra = Math.min(this.character.maxChakra, this.character.chakra + restore);
            item.count -= 1;
            message = `Swallowed Soldier Chakra Pill! Restored +${restore} Chakra. Current Chakra: ${this.character.chakra}/${this.character.maxChakra}`;
        } else if (itemId === 'smoke_bomb') {
            item.count -= 1;
            message = `Detonated Phosphor Smoke Bomb! Created a dense smokescreen (+5 to your next Evasion roll).`;
        } else if (itemId === 'heaven_scroll' || itemId === 'earth_scroll') {
            message = `Inspecting ${item.name}: Sacred Chunin Exam sealing document. Must NOT be opened until reaching the Tower!`;
        } else {
            message = `Inspected ${item.name} (x${item.count}). Standard ninja tool ready for combat.`;
        }

        if (item.count <= 0) {
            this.character.inventory = this.character.inventory.filter(i => i.count > 0);
        }

        this.save();
        return { success: true, message };
    }

    addItem(item) {
        const existing = this.character.inventory.find(i => i.id === item.id);
        if (existing) {
            existing.count += (item.count || 1);
        } else {
            this.character.inventory.push(item);
        }
        this.save();
    }

    saveCurrentLocation(nodeId, narrativeText = null, dynamicChoices = null) {
        this.currentNode = nodeId;
        if (narrativeText) this.savedNarrative = narrativeText;
        if (dynamicChoices) this.savedChoices = dynamicChoices;
        this.save();
    }

    save() {
        try {
            const data = {
                character: this.character,
                mission: this.mission,
                history: this.history,
                currentNode: this.currentNode || 'bell_test_start',
                savedNarrative: this.savedNarrative || null,
                savedChoices: this.savedChoices || null,
                savedAt: new Date().toISOString()
            };
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Save failed:', e);
        }
    }

    load() {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed.character) {
                    // Merge with default to guarantee new stats (charm, serpentSense) and jutsus are present
                    this.character = {
                        ...this.getDefaultCharacter(),
                        ...parsed.character,
                        stats: {
                            ...this.getDefaultCharacter().stats,
                            ...(parsed.character.stats || {})
                        },
                        party: {
                            ...this.getDefaultCharacter().party,
                            ...(parsed.character.party || {})
                        }
                    };
                }
                if (parsed.mission) this.mission = parsed.mission;
                if (parsed.history) this.history = parsed.history;
                if (parsed.currentNode) this.currentNode = parsed.currentNode;
                if (parsed.savedNarrative) this.savedNarrative = parsed.savedNarrative;
                if (parsed.savedChoices) this.savedChoices = parsed.savedChoices;
            }
        } catch (e) {
            console.error('Load failed:', e);
        }
    }

    reset() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.character = this.getDefaultCharacter();
        this.mission.bellsSecured = 0;
        this.currentNode = 'bell_test_start';
        this.savedNarrative = null;
        this.savedChoices = null;
        this.history = [];
        this.save();
    }
}

window.ShinobiStateManager = ShinobiStateManager;
