// audio_engine.js - High Fidelity Shinobi Sound FX & Voice Studio Engine with Sexy Female Narrator Options
class ShinobiAudioEngine {
    constructor() {
        this.ctx = null;
        this.voiceEnabled = true;
        this.sfxEnabled = true;

        this.PERSONA_PRESETS = {
            sultry_female: {
                name: '💋 Sultry Kunoichi (Seductive & Alluring Female DM)',
                gender: 'female',
                pitch: 1.02,
                rate: 0.96,
                volume: 1.0,
                elevenVoiceId: 'EXAVITQu4vr4xnSDxMaL', // Bella - soft, intimate, seductive female
                voiceFilterRegex: /jenny|aria|sonia|michelle|samantha|zira|victoria|female/i,
                previewText: "Welcome, shinobi... I will be your personal guide through the shadows. Shall we begin our trial?"
            },
            sweet_kunoichi: {
                name: '🌸 Sweet Anime Maiden (Playful & Gentle Female)',
                gender: 'female',
                pitch: 1.08,
                rate: 1.0,
                volume: 1.0,
                elevenVoiceId: '21m00Tcm4TlvDq8ikWAM', // Rachel
                voiceFilterRegex: /jenny|aria|natasha|samantha|female/i,
                previewText: "Hey there! Ready to show Kakashi-sensei what Team Seven can do? Let's go!"
            },
            femme_fatale: {
                name: '👑 Femme Fatale (Dominant & Alluring Mistress)',
                gender: 'female',
                pitch: 0.98,
                rate: 0.95,
                volume: 1.0,
                elevenVoiceId: 'AZnzlk1XvdvUeBnXmlld', // Domi - assertive, alluring
                voiceFilterRegex: /aria|sonia|zira|female/i,
                previewText: "Listen closely, ninja... In this world, only those with true resolve survive. Follow my lead."
            },
            shinobi_sensei: {
                name: '🥷 Shinobi Sensei (Deep Tactical Male DM)',
                gender: 'male',
                pitch: 0.98,
                rate: 0.96,
                volume: 1.0,
                elevenVoiceId: 'pNInz6obpgDQGcFmaJgB', // Adam
                voiceFilterRegex: /guy|christopher|david|male/i,
                previewText: "Team Seven, focus! The Bell Test has officially begun."
            }
        };

        this.currentPersona = localStorage.getItem('naruto_voice_persona') || 'sultry_female'; // Default to sultry female!
        this.engineType = localStorage.getItem('naruto_voice_engine') || 'browser'; // 'browser' or 'elevenlabs'
        this.elevenLabsKey = localStorage.getItem('naruto_elevenlabs_key') || '';
        this.elevenLabsVoiceId = localStorage.getItem('naruto_elevenlabs_voice_id') || this.PERSONA_PRESETS[this.currentPersona].elevenVoiceId;
        this.selectedVoiceURI = localStorage.getItem('naruto_selected_voice_uri') || '';
        this.voiceBoost = localStorage.getItem('naruto_voice_boost') !== 'false'; // Default TRUE for loud, crystal-clear voice!
        this.useStudioVoicePack = localStorage.getItem('naruto_use_voice_pack') !== 'false'; // Default TRUE for high-quality recorded studio MP3s!
        this.activeAudioSource = 'voice_pack'; // 'voice_pack', 'browser', 'elevenlabs'
        
        const preset = this.PERSONA_PRESETS[this.currentPersona] || this.PERSONA_PRESETS.sultry_female;
        this.voiceRate = parseFloat(localStorage.getItem('naruto_voice_rate')) || preset.rate;
        this.voicePitch = parseFloat(localStorage.getItem('naruto_voice_pitch')) || preset.pitch;
        this.voiceVolume = parseFloat(localStorage.getItem('naruto_voice_volume')) || 1.0;
        this.sfxVolume = parseFloat(localStorage.getItem('naruto_sfx_volume')) || 0.8;

        this.availableVoices = [];
        this.activeVoice = null;
        this.currentAudio = null;

        this.isSpeaking = false;
        this.isPaused = false;
        this.lastSpokenText = '';
        this.onStateChange = null;

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

    isFemaleVoice(voice) {
        const name = voice.name.toLowerCase();
        return /jenny|aria|sonia|michelle|natasha|ana|zira|heera|samantha|victoria|karen|female|woman|girl|bella|rachel|domi/i.test(name);
    }

    sortAndSelectBestVoice() {
        if (this.availableVoices.length === 0) return;

        const preset = this.PERSONA_PRESETS[this.currentPersona] || this.PERSONA_PRESETS.sultry_female;
        const wantFemale = preset.gender === 'female';

        // Score voices based on user persona preference
        const scoreVoice = (v) => {
            let score = 0;
            const name = v.name.toLowerCase();
            const isFem = this.isFemaleVoice(v);

            if (v.lang.startsWith('en')) score += 50;
            if (name.includes('natural')) score += 120;
            if (name.includes('online')) score += 100;
            if (name.includes('neural')) score += 90;

            // Persona gender bonus
            if (wantFemale && isFem) score += 200;
            if (!wantFemale && !isFem) score += 200;

            // Preferred female voices (Microsoft Jenny, Aria, Sonia, Google Female)
            if (name.includes('jenny')) score += 60;
            if (name.includes('aria')) score += 55;
            if (name.includes('sonia')) score += 40;
            if (name.includes('samantha')) score += 35;
            if (name.includes('zira')) score += 20;

            // Preferred male voices
            if (name.includes('guy')) score += 45;
            if (name.includes('christopher')) score += 40;
            if (name.includes('david')) score += 20;

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

        // Default to highest ranked voice for current persona
        this.activeVoice = this.availableVoices[0];
        if (this.activeVoice) {
            this.selectedVoiceURI = this.activeVoice.voiceURI || this.activeVoice.name;
        }
    }

    setPersona(personaKey) {
        const preset = this.PERSONA_PRESETS[personaKey];
        if (!preset) return;
        this.currentPersona = personaKey;
        this.voicePitch = preset.pitch;
        this.voiceRate = preset.rate;
        this.voiceVolume = preset.volume;
        this.elevenLabsVoiceId = preset.elevenVoiceId;

        localStorage.setItem('naruto_voice_persona', personaKey);
        localStorage.setItem('naruto_voice_pitch', preset.pitch);
        localStorage.setItem('naruto_voice_rate', preset.rate);
        localStorage.setItem('naruto_voice_volume', preset.volume);
        localStorage.setItem('naruto_elevenlabs_voice_id', preset.elevenVoiceId);

        // Re-sort voices to match new persona (e.g. prioritize female voices)
        this.sortAndSelectBestVoice();
    }

    setVoice(voiceURI) {
        this.selectedVoiceURI = voiceURI;
        localStorage.setItem('naruto_selected_voice_uri', voiceURI);
        const found = this.availableVoices.find(v => v.voiceURI === voiceURI || v.name === voiceURI);
        if (found) this.activeVoice = found;
    }

    setVoiceSettings(rate, pitch, volume, boost = true) {
        this.voiceRate = rate;
        this.voicePitch = pitch;
        this.voiceVolume = volume;
        this.voiceBoost = boost;
        localStorage.setItem('naruto_voice_rate', rate);
        localStorage.setItem('naruto_voice_pitch', pitch);
        localStorage.setItem('naruto_voice_volume', volume);
        localStorage.setItem('naruto_voice_boost', boost ? 'true' : 'false');
    }

    setElevenLabsConfig(key, voiceId, engine) {
        this.elevenLabsKey = (key || '').trim();
        this.elevenLabsVoiceId = voiceId || 'EXAVITQu4vr4xnSDxMaL';
        this.engineType = engine || (this.elevenLabsKey ? 'elevenlabs' : 'voice_pack');
        if (this.elevenLabsKey) {
            localStorage.setItem('naruto_elevenlabs_key', this.elevenLabsKey);
        } else {
            localStorage.removeItem('naruto_elevenlabs_key');
        }
        localStorage.setItem('naruto_elevenlabs_voice_id', this.elevenLabsVoiceId);
        localStorage.setItem('naruto_voice_engine', this.engineType);
    }

    async testElevenLabs(testKey, testVoiceId) {
        const key = (testKey || this.elevenLabsKey || '').trim();
        const voiceId = testVoiceId || this.elevenLabsVoiceId || 'EXAVITQu4vr4xnSDxMaL';
        if (!key) {
            return { success: false, error: 'Please enter an ElevenLabs API Key first.' };
        }
        const start = Date.now();
        try {
            const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                method: 'POST',
                headers: {
                    'xi-api-key': key,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: "I am ready, shinobi... Team Seven's trial begins now.",
                    model_id: 'eleven_turbo_v2_5',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.8
                    }
                })
            });
            const latencyMs = Date.now() - start;
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                const msg = errData.detail?.message || errData.message || `ElevenLabs HTTP ${res.status}`;
                return { success: false, error: msg, status: res.status };
            }
            const blob = await res.blob();
            const audioUrl = URL.createObjectURL(blob);
            if (this.currentAudio) {
                this.currentAudio.pause();
            }
            this.currentAudio = new Audio(audioUrl);
            this.currentAudio.volume = Math.min(1.0, this.voiceVolume || 1.0);
            await this.currentAudio.play();
            return { success: true, latencyMs, voiceId };
        } catch (err) {
            return { success: false, error: err.message };
        }
    }

    notifyState(state) {
        if (typeof this.onStateChange === 'function') {
            this.onStateChange(state);
        }
    }

    pause() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.isPaused = true;
            this.notifyState('paused');
            return;
        }
        if ('speechSynthesis' in window && (window.speechSynthesis.speaking || this.isSpeaking)) {
            window.speechSynthesis.pause();
            this.isPaused = true;
            this.notifyState('paused');
        }
    }

    resume() {
        if (this.currentAudio && this.isPaused) {
            this.currentAudio.play();
            this.isPaused = false;
            this.notifyState('speaking');
            return;
        }
        if ('speechSynthesis' in window && (window.speechSynthesis.paused || this.isPaused)) {
            window.speechSynthesis.resume();
            this.isPaused = false;
            this.notifyState('speaking');
        }
    }

    togglePause() {
        if (this.isPaused) {
            this.resume();
            return false;
        } else if (this.isSpeaking) {
            this.pause();
            return true;
        } else if (this.lastSpokenText) {
            this.speak(this.lastSpokenText);
            return false;
        }
        return false;
    }

    replay() {
        if (this.lastSpokenText) {
            this.speak(this.lastSpokenText);
        }
    }

    playAudioFile(filePath, onEndCallback = null) {
        this.stopSpeech();
        try {
            this.currentAudio = new Audio(filePath);
            
            if (this.ctx) {
                this.ensureContext();
                try {
                    const source = this.ctx.createMediaElementSource(this.currentAudio);
                    const gainNode = this.ctx.createGain();
                    gainNode.gain.value = (this.voiceVolume || 1.0) * (this.voiceBoost ? 1.5 : 1.1);
                    source.connect(gainNode);
                    gainNode.connect(this.ctx.destination);
                } catch (e) {
                    this.currentAudio.volume = Math.min(1.0, this.voiceVolume || 1.0);
                }
            } else {
                this.currentAudio.volume = Math.min(1.0, this.voiceVolume || 1.0);
            }

            this.currentAudio.onplay = () => {
                this.isSpeaking = true;
                this.isPaused = false;
                this.notifyState('speaking');
            };
            this.currentAudio.onpause = () => {
                if (this.isPaused) {
                    this.notifyState('paused');
                }
            };
            this.currentAudio.onended = () => {
                this.isSpeaking = false;
                this.isPaused = false;
                this.notifyState('ended');
                if (typeof onEndCallback === 'function') onEndCallback();
            };
            this.currentAudio.onerror = (e) => {
                console.warn('Voice package audio file fallback to TTS:', filePath);
                this.isSpeaking = false;
                this.isPaused = false;
                this.notifyState('stopped');
                if (this.lastSpokenText) {
                    this.speakTTS(this.lastSpokenText);
                }
            };

            const p = this.currentAudio.play();
            if (p && p.catch) {
                p.catch(err => {
                    console.warn('Audio play catch:', err.message);
                    if (this.lastSpokenText) {
                        this.speakTTS(this.lastSpokenText);
                    }
                });
            }
            return true;
        } catch (err) {
            console.error('playAudioFile error:', err);
            return false;
        }
    }

    playCharacterClip(clipName) {
        const path = `assets/audio/characters/${clipName}.mp3`;
        return this.playAudioFile(path);
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
        this.lastSpokenText = cleanText;

        // 1. If Studio Voice Pack is enabled and chapter/node is available
        const nodeId = options.nodeId || options.chapterId;
        if (this.useStudioVoicePack && nodeId) {
            const audioPath = options.audio || `assets/audio/narration/${nodeId}.mp3`;
            this.activeAudioSource = 'voice_pack';
            const started = this.playAudioFile(audioPath);
            if (started) return;
        }

        // 2. Try ElevenLabs AI Voice if configured
        if (this.engineType === 'elevenlabs' && this.elevenLabsKey) {
            this.activeAudioSource = 'elevenlabs';
            const success = await this.playElevenLabs(cleanText);
            if (success) return;
        }

        // 3. Fallback to Natural SpeechSynthesis
        this.activeAudioSource = 'browser';
        this.speakTTS(cleanText, options);
    }

    speakTTS(cleanText, options = {}) {
        if (!('speechSynthesis' in window)) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        if (this.activeVoice) {
            utterance.voice = this.activeVoice;
        }

        utterance.rate = options.rate || this.voiceRate || 0.98;
        utterance.pitch = options.pitch || this.voicePitch || 1.02;
        utterance.volume = 1.0;

        utterance.onstart = () => {
            this.isSpeaking = true;
            this.isPaused = false;
            this.notifyState('speaking');
        };

        utterance.onpause = () => {
            this.isPaused = true;
            this.notifyState('paused');
        };

        utterance.onresume = () => {
            this.isPaused = false;
            this.notifyState('speaking');
        };

        utterance.onend = () => {
            this.isSpeaking = false;
            this.isPaused = false;
            this.notifyState('ended');
        };

        utterance.onerror = (e) => {
            if (e.error !== 'interrupted' && e.error !== 'canceled') {
                console.warn('SpeechSynthesis error:', e.error);
            }
            this.isSpeaking = false;
            this.isPaused = false;
            this.notifyState('stopped');
        };

        this.isSpeaking = true;
        this.isPaused = false;
        this.notifyState('speaking');

        window.speechSynthesis.speak(utterance);
    }

    async playElevenLabs(text) {
        if (!this.elevenLabsKey) return false;
        try {
            const voiceId = this.elevenLabsVoiceId || 'EXAVITQu4vr4xnSDxMaL'; // Bella (Sultry Female)
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
                method: 'POST',
                headers: {
                    'xi-api-key': this.elevenLabsKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text.slice(0, 500),
                    model_id: 'eleven_turbo_v2_5',
                    voice_settings: {
                        stability: 0.45,
                        similarity_boost: 0.80
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

            // Connect through Web Audio API GainNode for loud volume boost
            if (this.ctx) {
                this.ensureContext();
                try {
                    const source = this.ctx.createMediaElementSource(this.currentAudio);
                    const gainNode = this.ctx.createGain();
                    gainNode.gain.value = (this.voiceVolume || 1.0) * (this.voiceBoost ? 1.5 : 1.1);
                    source.connect(gainNode);
                    gainNode.connect(this.ctx.destination);
                } catch (e) {
                    this.currentAudio.volume = Math.min(1.0, this.voiceVolume || 1.0);
                }
            } else {
                this.currentAudio.volume = Math.min(1.0, this.voiceVolume || 1.0);
            }

            this.currentAudio.onplay = () => {
                this.isSpeaking = true;
                this.isPaused = false;
                this.notifyState('speaking');
            };
            this.currentAudio.onpause = () => {
                if (this.isPaused) {
                    this.notifyState('paused');
                }
            };
            this.currentAudio.onended = () => {
                this.isSpeaking = false;
                this.isPaused = false;
                this.notifyState('ended');
            };
            this.currentAudio.onerror = () => {
                this.isSpeaking = false;
                this.isPaused = false;
                this.notifyState('stopped');
            };

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
        this.isSpeaking = false;
        this.isPaused = false;
        this.notifyState('stopped');
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

    // 7. Chidori Lightning Chirp
    playChidoriLightning() {
        if (!this.sfxEnabled) return;
        this.ensureContext();
        if (!this.ctx) return;
        for (let i = 0; i < 6; i++) {
            const t = this.ctx.currentTime + i * 0.04;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(2800 + Math.random() * 1200, t);
            osc.frequency.exponentialRampToValueAtTime(600, t + 0.08);
            gain.gain.setValueAtTime(0.25 * this.sfxVolume, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t);
            osc.stop(t + 0.08);
        }
    }

    // 8. Sand Coffin Crushing Impact
    playSandCoffin() {
        if (!this.sfxEnabled) return;
        this.ensureContext();
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, t);
        osc.frequency.exponentialRampToValueAtTime(20, t + 0.6);
        gain.gain.setValueAtTime(0.6 * this.sfxVolume, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.6);
    }

    // 9. Procedural Ambient Shinobi BGM Synthesizer (Zero download lag)
    startBgm() {
        if (!this.bgmEnabled) return;
        this.ensureContext();
        if (!this.ctx || this.bgmActive) return;
        this.bgmActive = true;

        if (!this.bgmGain) {
            this.bgmGain = this.ctx.createGain();
            this.bgmGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
            this.bgmGain.connect(this.ctx.destination);
        }

        const kotoScale = [220, 246.94, 261.63, 329.63, 349.23, 440, 493.88, 523.25, 659.25];
        let step = 0;

        const playKotoNote = () => {
            if (!this.bgmActive || !this.ctx) return;
            const t = this.ctx.currentTime;
            const freq = kotoScale[step % kotoScale.length];
            step = (step + Math.floor(Math.random() * 3) + 1) % kotoScale.length;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t);

            gain.gain.setValueAtTime(0.08, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);

            osc.connect(gain);
            gain.connect(this.bgmGain);

            osc.start(t);
            osc.stop(t + 1.25);

            const nextInterval = 400 + Math.random() * 450;
            this.bgmTimer = setTimeout(playKotoNote, nextInterval);
        };

        playKotoNote();
    }

    stopBgm() {
        this.bgmActive = false;
        if (this.bgmTimer) clearTimeout(this.bgmTimer);
    }

    toggleBgm() {
        this.bgmEnabled = !this.bgmEnabled;
        localStorage.setItem('naruto_bgm_enabled', this.bgmEnabled);
        if (this.bgmEnabled) {
            this.startBgm();
        } else {
            this.stopBgm();
        }
        return this.bgmEnabled;
    }
}

window.ShinobiAudioEngine = ShinobiAudioEngine;

