// audio_engine.js - High Fidelity Shinobi Sound FX & Voice Narration Engine
class ShinobiAudioEngine {
    constructor() {
        this.ctx = null;
        this.voiceEnabled = true;
        this.sfxEnabled = true;
        this.activeVoice = null;
        this.voicePack = 'studio_neural'; // 'studio_neural', 'shinobi_lorekeeper', 'browser_natural'
        this.availableVoices = [];
        this.initAudioContext();
        this.initSpeechEngine();
    }

    initAudioContext() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            this.ctx = new AudioContext();
        }
    }

    ensureContext() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    initSpeechEngine() {
        if (!('speechSynthesis' in window)) return;
        const loadVoices = () => {
            this.availableVoices = window.speechSynthesis.getVoices();
            this.selectBestVoice();
        };

        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }

    selectBestVoice() {
        if (this.availableVoices.length === 0) return;

        // Prioritize natural neural English voices (Google US English, Microsoft Jenny / Guy / Natural, Samantha, Daniel)
        const naturalPatterns = [
            /natural/i,
            /neural/i,
            /google.*english/i,
            /enhanced/i,
            /daniel/i,
            /samantha/i,
            /guy/i,
            /jenny/i
        ];

        for (const pattern of naturalPatterns) {
            const found = this.availableVoices.find(v => v.lang.startsWith('en') && pattern.test(v.name));
            if (found) {
                this.activeVoice = found;
                return;
            }
        }

        this.activeVoice = this.availableVoices.find(v => v.lang.startsWith('en')) || this.availableVoices[0];
    }

    speak(text, options = {}) {
        if (!this.voiceEnabled || !('speechSynthesis' in window)) return;
        window.speechSynthesis.cancel(); // Cancel any existing speech

        // Clean markdown symbols from spoken text
        const cleanText = text
            .replace(/[*_#`~>]/g, '')
            .replace(/\[.*?\]\(.*?\)/g, '')
            .replace(/\n+/g, '. ')
            .trim();

        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        if (this.activeVoice) utterance.voice = this.activeVoice;

        // Adjust cadence for cinematic ninja storytelling
        if (this.voicePack === 'shinobi_lorekeeper') {
            utterance.rate = 0.92;
            utterance.pitch = 0.88;
        } else {
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
        }

        utterance.volume = options.volume !== undefined ? options.volume : 0.95;
        window.speechSynthesis.speak(utterance);
    }

    stopSpeech() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }

    // --- Synthesized Sound Effects (Pure Web Audio API) ---

    // 1. Water Jutsu Explosion / Surging Impact Fist
    playWaterSplash() {
        if (!this.sfxEnabled) return;
        this.ensureContext();
        if (!this.ctx) return;

        const t = this.ctx.currentTime;
        // White noise node for surging splash
        const bufferSize = this.ctx.sampleRate * 0.45;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.15));
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, t);
        filter.frequency.exponentialRampToValueAtTime(150, t + 0.45);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.4, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);

        // Sub-bass thump for the delayed impact
        const sub = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(120, t + 0.08);
        sub.frequency.exponentialRampToValueAtTime(30, t + 0.35);

        subGain.gain.setValueAtTime(0, t);
        subGain.gain.setValueAtTime(0.5, t + 0.08);
        subGain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

        sub.connect(subGain);
        subGain.connect(this.ctx.destination);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(t);
        sub.start(t + 0.08);
        sub.stop(t + 0.42);
    }

    // 2. Clone Poof / Smoke Burst
    playClonePoof() {
        if (!this.sfxEnabled) return;
        this.ensureContext();
        if (!this.ctx) return;

        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(350, t);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.25);

        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.25);
    }

    // 3. Metallic Kunai / Shuriken Clash
    playKunaiClash() {
        if (!this.sfxEnabled) return;
        this.ensureContext();
        if (!this.ctx) return;

        const t = this.ctx.currentTime;
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(2200, t);
        osc1.frequency.exponentialRampToValueAtTime(800, t + 0.3);

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(3100, t);
        osc2.frequency.exponentialRampToValueAtTime(1200, t + 0.25);

        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + 0.35);
        osc2.stop(t + 0.35);
    }

    // 4. Kakashi's Silver Bell Jingle
    playBellJingle() {
        if (!this.sfxEnabled) return;
        this.ensureContext();
        if (!this.ctx) return;

        const notes = [1760, 2093, 2637]; // High crystal bells
        notes.forEach((freq, idx) => {
            const t = this.ctx.currentTime + idx * 0.08;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t);

            gain.gain.setValueAtTime(0.25, t);
            gain.gain.exponentialRampToValueAtTime(0.005, t + 0.45);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(t);
            osc.stop(t + 0.48);
        });
    }

    // 5. Shinobi Dice Roll
    playDiceRoll() {
        if (!this.sfxEnabled) return;
        this.ensureContext();
        if (!this.ctx) return;

        for (let i = 0; i < 5; i++) {
            const t = this.ctx.currentTime + i * 0.05;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(400 + Math.random() * 300, t);

            gain.gain.setValueAtTime(0.18, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.04);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(t);
            osc.stop(t + 0.04);
        }
    }

    // 6. Success / Level Up Fanfare
    playLevelUp() {
        if (!this.sfxEnabled) return;
        this.ensureContext();
        if (!this.ctx) return;

        const chords = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - High C
        chords.forEach((freq, idx) => {
            const t = this.ctx.currentTime + idx * 0.1;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t);

            gain.gain.setValueAtTime(0.3, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(t);
            osc.stop(t + 0.5);
        });
    }
}

window.ShinobiAudioEngine = ShinobiAudioEngine;
