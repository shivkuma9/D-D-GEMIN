// character_state.js - Shinobi State Management Engine
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
        this.history = [];
        this.load();
    }

    getDefaultCharacter() {
        return {
            name: 'Shivkumar Sanju',
            clan: 'Senju Bloodline',
            title: 'Water Release Tactician',
            nature: 'Water (Suiton)',
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
            stats: {
                ninjutsu: 68,
                taijutsu: 72,
                genjutsu: 45,
                agility: 66,
                chakraReserves: 85,
                tactics: 78
            },
            jutsus: [
                {
                    id: 'surging_fist',
                    name: 'Water Release: Surging Impact Fist',
                    cost: 20,
                    type: 'Taijutsu + Ninjutsu',
                    desc: 'Condensed hydro-chakra detonates a split-second after impact, bypassing guards with heavy crushing force.'
                },
                {
                    id: 'water_shadow_clone',
                    name: 'Water-Shadow Clone Jutsu',
                    cost: 25,
                    type: 'Ninjutsu Forbidden Variant',
                    desc: 'Physical clone that transmits combat memories upon dispelling, exploding into a tidal wave when hit.'
                },
                {
                    id: 'body_substitution',
                    name: 'Body Replacement Technique (Kawarimi)',
                    cost: 10,
                    type: 'Evasion',
                    desc: 'Rapidly swaps position with a training log to avoid lethal direct damage.'
                }
            ],
            inventory: [
                { id: 'kunai', name: 'Shinobi Kunai', count: 5, icon: '🗡️' },
                { id: 'shuriken', name: 'Star Shuriken', count: 5, icon: '⭐' },
                { id: 'ninja_wire', name: 'Steel Ninja Wire', count: 2, icon: '🪢' },
                { id: 'smoke_bomb', name: 'Phosphor Smoke Bomb', count: 2, icon: '💨' },
                { id: 'soldier_pill', name: 'Military Ration Pill', count: 2, icon: '💊', heals: 25 }
            ],
            party: {
                naruto: {
                    name: 'Naruto Uzumaki',
                    role: 'Nine-Tails Jinchuriki',
                    hp: 120,
                    maxHp: 120,
                    trust: 35,
                    status: 'Charging head-on with clones',
                    avatar: '🍜'
                },
                sasuke: {
                    name: 'Sasuke Uchiha',
                    role: 'Sharingan Heir',
                    hp: 95,
                    maxHp: 95,
                    trust: 15,
                    status: 'Stealthed in tree foliage',
                    avatar: '🔥'
                },
                sakura: {
                    name: 'Sakura Haruno',
                    role: 'Tactical Trainee',
                    hp: 80,
                    maxHp: 80,
                    trust: 20,
                    status: 'Hidden in underbrush',
                    avatar: '🌸'
                },
                kakashi: {
                    name: 'Kakashi Hatake',
                    role: 'Jonin Instructor (Copy Ninja)',
                    hp: 400,
                    maxHp: 400,
                    bells: 3,
                    status: 'Reading Icha Icha Paradise',
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
            return true; // Leveled up
        }
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

    addItem(item) {
        const existing = this.character.inventory.find(i => i.id === item.id);
        if (existing) {
            existing.count += (item.count || 1);
        } else {
            this.character.inventory.push(item);
        }
        this.save();
    }

    save() {
        try {
            const data = {
                character: this.character,
                mission: this.mission,
                history: this.history
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
                if (parsed.character) this.character = parsed.character;
                if (parsed.mission) this.mission = parsed.mission;
                if (parsed.history) this.history = parsed.history;
            }
        } catch (e) {
            console.error('Load failed:', e);
        }
    }

    reset() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.character = this.getDefaultCharacter();
        this.mission.bellsSecured = 0;
        this.history = [];
        this.save();
    }
}

window.ShinobiStateManager = ShinobiStateManager;
