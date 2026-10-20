// audio_engine.js - High Fidelity Shinobi Sound FX & Voice Studio Engine
class ShinobiAudioEngine {
    constructor() {
        this.ctx = null;
        this.voiceEnabled = true;
        this.sfxEnabled = true;
        this.engineType = localStorage.getItem('naruto_voice_engine') || 'browser'; // 'browser' or 'elevenlabs'
        this.elevenLabsKey = localStorage.getItem('naruto_elevenlabs_key') || '';
        this.elevenLabsVoiceId = localStorage.getItem('naruto_elevenlabs_voice_id') || 'pNInz6obpgDQGcFmaJgB'; // Adam
        this.selectedVoiceURI = localStorage.getItem('naruto_selected_voice_uri') || '';
        
        this.voiceRate = parseFloat(localStorage.getItem('naruto_voice_rate')) || 1.0;
        this.voicePitch = parseFloat(localStorage.getItem('naruto_voice_pitch')) || 1.0;
        this.voiceVolume = parseFloat(localStorage.getItem('naruto_voice_volume')) || 0.95;
        this.sfxVolume = parseFloat(localStorage.getItem('naruto_sfx_volume')) || 0.8;

        this.availableVoices = [];
        this.activeVoice = null;
        this.currentAudio = null;

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
            this.sortAndSelectBestVoice();
            if (window.app && window.app.populateVoiceDropdown) {
                window.app.populateVoiceDropdown();
            }
        };

        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }

    sortAndSelectBestVoice() {
        if (this.availableVoices.length === 0) return;

        // Rank English voices: Natural/Online first, then Google, then SAPI
        const scoreVoice = (v) => {
            let score = 0;
            const name = v.name.toLowerCase();
            if (v.lang.startsWith('en')) score += 50;
            if (name.includes('natural')) score += 100;
            if (name.includes('online')) score += 80;
            if (name.includes('neural')) score += 70;
            if (name.includes('guy')) score += 40;
            if (name.includes('christopher')) score += 35;
            if (name.includes('jenny')) score += 30;
            if (name.includes('aria')) score += 25;
            if (name.includes('google')) score += 20;
            if (name.includes('enhanced')) score += 15;
            return score;
        };

        this.availableVoices.sort((a, b) => scoreVoice(b) - scoreVoice(a));

        if (this.selectedVoiceURI) {
            const found = this.availableVoices.find(v => v.voiceURI === this.selectedVoiceURI || v.name === this.selectedVoiceURI);
            if (found) {
                this.activeVoice = found;
                return;
            }
        }

        // Default to highest ranked natural voice
        this.activeVoice = this.availableVoices[0];
        if (this.activeVoice) {
            this.selectedVoiceURI = this.activeVoice.voiceURI || this.activeVoice.name;
        }
    }

    setVoice(voiceURI) {
        this.selectedVoiceURI = voiceURI;
        localStorage.setItem('naruto_selected_voice_uri', voiceURI);
        const found = this.availableVoices.find(v => v.voiceURI === voiceURI || v.name === voiceURI);
        if (found) this.activeVoice = found;
    }

    setVoiceSettings(rate, pitch, volume) {
        this.voiceRate = rate;
        this.voicePitch = pitch;
        this.voiceVolume = volume;
        localStorage.setItem('naruto_voice_rate', rate);
        localStorage.setItem('naruto_voice_pitch', pitch);
        localStorage.setItem('naruto_voice_volume', volume);
    }

    setElevenLabsConfig(key, voiceId, engine) {
        this.elevenLabsKey = key.trim();
        this.elevenLabsVoiceId = voiceId;
        this.engineType = engine || (this.elevenLabsKey ? 'elevenlabs' : 'browser');
        localStorage.setItem('naruto_elevenlabs_key', this.elevenLabsKey);
        localStorage.setItem('naruto_elevenlabs_voice_id', this.elevenLabsVoiceId);
        localStorage.setItem('naruto_voice_engine', this.engineType);
    }

    async speak(text, options = {}) {
        if (!this.voiceEnabled) return;
        this.stopSpeech();

        // Clean markdown and prompt tags
        const cleanText = text
            .replace(/\[.*?\]/g, '')
            .replace(/[*_#`~>]/g, '')
            .replace(/\n+/g, '. ')
            .replace(/\s{2,}/g, ' ')
            .trim();

        if (!cleanText) return;

        // Try ElevenLabs AI Voice if configured
        if (this.engineType === 'elevenlabs' && this.elevenLabsKey) {
            const success = await this.playElevenLabs(cleanText);
            if (success) return;
        }

        // Native Natural SpeechSynthesis
        if (!('speechSynthesis' in window)) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        if (this.activeVoice) {
            utterance.voice = this.activeVoice;
        }

        utterance.rate = options.rate || this.voiceRate || 1.0;
        utterance.pitch = options.pitch || this.voicePitch || 1.0;
        utterance.volume = options.volume !== undefined ? options.volume : this.voiceVolume;

        window.speechSynthesis.speak(utterance);
    }

    async playElevenLabs(text) {
        if (!this.elevenLabsKey) return false;
        try {
            const voiceId = this.elevenLabsVoiceId || 'pNInz6obpgDQGcFmaJgB'; // Adam
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                method: 'POST',
                headers: {
                    'xi-api-key': this.elevenLabsKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text.slice(0, 500), // Cap length for speed & quota
                    model_id: 'eleven_turbo_v2_5',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75
                    }
                })
            });

            if (!response.ok) {
                console.warn('ElevenLabs API returned status:', response.status);
                return false;
            }

            const blob = await response.blob();
            const audioUrl = URL.createObjectURL(blob);
            if (this.currentAudio) {
                this.currentAudio.pause();
            }
            this.currentAudio = new Audio(audioUrl);
            this.currentAudio.volume = this.voiceVolume;
            await this.currentAudio.play();
            return true;
        } catch (err) {
            console.error('ElevenLabs playback error, falling back to neural speech:', err);
            return false;
        }
    }

    stopSpeech() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
        }
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
        gain.gain.setValueAtTime(0.4 * this.sfxVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);

        const sub = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        sub.type = 'sine';
        sub.frequency.setValueAtTime(120, t + 0.08);
        sub.frequency.exponentialRampToValueAtTime(30, t + 0.35);

        subGain.gain.setValueAtTime(0, t);
        subGain.gain.setValueAtTime(0.5 * this.sfxVolume, t + 0.08);
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

        gain.gain.setValueAtTime(0.3 * this.sfxVolume, t);
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

        gain.gain.setValueAtTime(0.35 * this.sfxVolume, t);
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

        const notes = [1760, 2093, 2637];
        notes.forEach((freq, idx) => {
            const t = this.ctx.currentTime + idx * 0.08;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t);

            gain.gain.setValueAtTime(0.25 * this.sfxVolume, t);
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

            gain.gain.setValueAtTime(0.18 * this.sfxVolume, t);
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

        const chords = [523.25, 659.25, 783.99, 1046.50];
        chords.forEach((freq, idx) => {
            const t = this.ctx.currentTime + idx * 0.1;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t);

            gain.gain.setValueAtTime(0.3 * this.sfxVolume, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(t);
            osc.stop(t + 0.5);
        });
    }
}

window.ShinobiAudioEngine = ShinobiAudioEngine;
