// app.js - Shinobi Chronicles RPG Main Controller
class ShinobiRPGApp {
    constructor() {
        this.state = new window.ShinobiStateManager();
        this.audio = new window.ShinobiAudioEngine();
        this.gemini = new window.GeminiDMConnector(this.state);
        this.campaign = window.NarutoCampaignData;
        this.currentNode = this.state.currentNode || this.campaign.INITIAL_NODE;
        this.isGeminiMode = false;
        this.lastD20Roll = null;

        this.initDom();
        this.bindEvents();
        this.renderAll();
        this.checkAuth();
    }

    initDom() {
        // Character Elements
        this.charNameEl = document.getElementById('char-name');
        this.charClanEl = document.getElementById('char-clan');
        this.charRankEl = document.getElementById('char-rank');
        this.charNatureEl = document.getElementById('char-nature');
        this.charAvatarImgEl = document.getElementById('char-avatar-img');

        // Vitals
        this.hpCurrentEl = document.getElementById('hp-current');
        this.hpMaxEl = document.getElementById('hp-max');
        this.hpBarFillEl = document.getElementById('hp-bar-fill');
        this.chakraCurrentEl = document.getElementById('chakra-current');
        this.chakraMaxEl = document.getElementById('chakra-max');
        this.chakraBarFillEl = document.getElementById('chakra-bar-fill');
        this.expCurrentEl = document.getElementById('exp-current');
        this.expMaxEl = document.getElementById('exp-max');
        this.expBarFillEl = document.getElementById('exp-bar-fill');
        this.charRyoEl = document.getElementById('char-ryo');

        // Stats Grid
        this.statNinjutsuEl = document.getElementById('stat-ninjutsu');
        this.statTaijutsuEl = document.getElementById('stat-taijutsu');
        this.statGenjutsuEl = document.getElementById('stat-genjutsu');
        this.statAgilityEl = document.getElementById('stat-agility');
        this.statReservesEl = document.getElementById('stat-reserves');
        this.statTacticsEl = document.getElementById('stat-tactics');

        // Jutsu & Inventory
        this.jutsuListEl = document.getElementById('jutsu-list');
        this.inventoryListEl = document.getElementById('inventory-list');

        // Story Terminal
        this.sceneVisualImgEl = document.getElementById('scene-visual-img');
        this.sceneBadgeTitleEl = document.getElementById('scene-badge-title');
        this.sceneChapterTitleEl = document.getElementById('scene-chapter-title');
        this.sceneActTagEl = document.getElementById('scene-act-tag');
        this.narrativeBodyEl = document.getElementById('narrative-body');
        this.choicesContainerEl = document.getElementById('choices-container');

        // Freeform Action
        this.freeformInputEl = document.getElementById('freeform-input');
        this.freeformBtnEl = document.getElementById('freeform-btn');

        // Team 7 Status
        this.teamContainerEl = document.getElementById('team-container');
        this.bellsCounterEl = document.getElementById('bells-counter');

        // Voice Studio Modal
        this.voiceSettingsBtnEl = document.getElementById('voice-settings-btn');
        this.voiceModalEl = document.getElementById('voice-modal');
        this.voiceCloseBtnEl = document.getElementById('voice-close-btn');
        this.voiceTabBrowserEl = document.getElementById('voice-tab-browser');
        this.voiceTabElevenLabsEl = document.getElementById('voice-tab-elevenlabs');
        this.panelBrowserVoiceEl = document.getElementById('panel-browser-voice');
        this.panelElevenLabsVoiceEl = document.getElementById('panel-elevenlabs-voice');
        this.voiceSelectEl = document.getElementById('voice-select');
        this.voiceTestBtnEl = document.getElementById('voice-test-btn');
        this.voiceRateSliderEl = document.getElementById('voice-rate-slider');
        this.voicePitchSliderEl = document.getElementById('voice-pitch-slider');
        this.voiceVolSliderEl = document.getElementById('voice-vol-slider');
        this.rateValEl = document.getElementById('rate-val');
        this.pitchValEl = document.getElementById('pitch-val');
        this.volValEl = document.getElementById('vol-val');
        this.elevenLabsVoiceSelectEl = document.getElementById('elevenlabs-voice-select');
        this.elevenLabsKeyInputEl = document.getElementById('elevenlabs-key-input');
        this.elevenLabsTestBtnEl = document.getElementById('elevenlabs-test-btn');
        this.voiceSaveBtnEl = document.getElementById('voice-save-btn');

        // Gemini Live Settings
        this.geminiSettingsBtnEl = document.getElementById('gemini-settings-btn');
        this.geminiModalEl = document.getElementById('gemini-modal');
        this.geminiCloseBtnEl = document.getElementById('gemini-close-btn');
        this.geminiApiKeyInputEl = document.getElementById('gemini-api-key-input');
        this.geminiModelSelectEl = document.getElementById('gemini-model-select');
        this.geminiSaveKeyBtnEl = document.getElementById('gemini-save-key-btn');
        this.geminiStatusBadgeEl = document.getElementById('gemini-status-badge');

        // Dice Modal
        this.diceModalEl = document.getElementById('dice-modal');
        this.diceRollValEl = document.getElementById('dice-roll-val');
        this.diceTitleEl = document.getElementById('dice-title');
        this.diceResultTextEl = document.getElementById('dice-result-text');

        // Security Gatekeeper Elements
        this.lockGateBackdropEl = document.getElementById('lock-gate-backdrop');
        this.lockGateCardEl = document.getElementById('lock-gate-card');
        this.gatePassInputEl = document.getElementById('gate-pass-input');
        this.toggleGatePassBtnEl = document.getElementById('toggle-gate-pass-btn');
        this.gateErrorMsgEl = document.getElementById('gate-error-msg');
        this.gateUnlockBtnEl = document.getElementById('gate-unlock-btn');
        this.lockTerminalBtnEl = document.getElementById('lock-terminal-btn');

        this.currentPassword = localStorage.getItem('shinobi_gate_password') || 'shiva123';
        this.isAuthenticated = localStorage.getItem('shinobi_authenticated') === 'true';

        // Narration Playback Bar Elements
        this.narratePlayBtnEl = document.getElementById('narrate-play-btn');
        this.narratePlayLabelEl = document.getElementById('narrate-play-label');
        this.narratePauseBtnEl = document.getElementById('narrate-pause-btn');
        this.narratePauseLabelEl = document.getElementById('narrate-pause-label');
        this.narrateStopBtnEl = document.getElementById('narrate-stop-btn');
        this.narrationStatusIndicatorEl = document.getElementById('narration-status-indicator');
        this.narrationStateLabelEl = document.getElementById('narration-state-label');
        this.restartSagaBtnEl = document.getElementById('restart-saga-btn');

        this.audio.onStateChange = (state) => {
            this.updateAudioPlaybackUI(state);
        };
    }

    updateAudioPlaybackUI(state) {
        if (!this.narrationStatusIndicatorEl) return;
        this.narrationStatusIndicatorEl.classList.remove('speaking', 'paused');

        if (state === 'speaking') {
            this.narrationStatusIndicatorEl.classList.add('speaking');
            const persona = this.audio.PERSONA_PRESETS[this.audio.currentPersona];
            const pName = persona ? (persona.gender === 'female' ? 'Kunoichi' : 'Sensei') : 'Narrator';
            if (this.narrationStateLabelEl) this.narrationStateLabelEl.textContent = `Speaking (${pName})...`;
            if (this.narratePlayLabelEl) this.narratePlayLabelEl.textContent = 'Replay';
            if (this.narratePauseLabelEl) this.narratePauseLabelEl.textContent = 'Pause';
            if (this.narratePauseBtnEl) this.narratePauseBtnEl.classList.remove('active');
        } else if (state === 'paused') {
            this.narrationStatusIndicatorEl.classList.add('paused');
            if (this.narrationStateLabelEl) this.narrationStateLabelEl.textContent = 'Narration Paused';
            if (this.narratePauseLabelEl) this.narratePauseLabelEl.textContent = 'Resume';
            if (this.narratePauseBtnEl) this.narratePauseBtnEl.classList.add('active');
        } else {
            // stopped or ended
            if (this.narrationStateLabelEl) this.narrationStateLabelEl.textContent = 'Audio Idle';
            if (this.narratePlayLabelEl) this.narratePlayLabelEl.textContent = 'Play';
            if (this.narratePauseLabelEl) this.narratePauseLabelEl.textContent = 'Pause';
            if (this.narratePauseBtnEl) this.narratePauseBtnEl.classList.remove('active');
        }
    }

    checkAuth() {
        if (!this.isAuthenticated) {
            this.showLockScreen();
        } else {
            this.hideLockScreen();
        }
    }

    showLockScreen() {
        if (this.lockGateBackdropEl) {
            this.lockGateBackdropEl.classList.remove('hidden');
            if (this.gatePassInputEl) {
                this.gatePassInputEl.value = '';
                setTimeout(() => this.gatePassInputEl.focus(), 120);
            }
            if (this.gateErrorMsgEl) this.gateErrorMsgEl.style.display = 'none';
        }
    }

    hideLockScreen() {
        if (this.lockGateBackdropEl) {
            this.lockGateBackdropEl.classList.add('hidden');
        }
    }

    attemptUnlock() {
        if (!this.gatePassInputEl) return;
        const entered = this.gatePassInputEl.value.trim();
        if (entered === this.currentPassword) {
            this.isAuthenticated = true;
            localStorage.setItem('shinobi_authenticated', 'true');
            if (this.gateErrorMsgEl) this.gateErrorMsgEl.style.display = 'none';
            this.audio.playBellJingle();
            this.hideLockScreen();

            // Speak current scene if voice enabled
            const node = this.campaign.chapters.find(c => c.id === this.currentNode) || this.campaign.chapters[0];
            if (this.audio.voiceEnabled && node && node.narrative) {
                setTimeout(() => {
                    this.audio.speak(node.narrative);
                }, 300);
            }
        } else {
            if (this.gateErrorMsgEl) this.gateErrorMsgEl.style.display = 'block';
            if (this.lockGateCardEl) {
                this.lockGateCardEl.classList.add('shake-error');
                setTimeout(() => this.lockGateCardEl.classList.remove('shake-error'), 450);
            }
            this.audio.playKunaiClash();
            this.gatePassInputEl.value = '';
            this.gatePassInputEl.focus();
        }
    }

    populateVoiceDropdown() {
        if (!this.voiceSelectEl) return;
        this.voiceSelectEl.innerHTML = '';
        if (this.audio.availableVoices.length === 0) {
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = 'Detecting voices... (or default Windows voice)';
            this.voiceSelectEl.appendChild(opt);
            return;
        }

        this.audio.availableVoices.forEach((voice) => {
            const opt = document.createElement('option');
            opt.value = voice.voiceURI || voice.name;
            const isNatural = /natural|online|neural/i.test(voice.name);
            const isFem = this.audio.isFemaleVoice(voice);
            let badge = '';
            if (isFem && isNatural) {
                badge = '💋🌟 [SEXY FEMALE NATURAL] ';
            } else if (isFem) {
                badge = '💋 [FEMALE] ';
            } else if (isNatural) {
                badge = '🌟 [MALE NATURAL] ';
            } else {
                badge = '🥷 [SYSTEM] ';
            }

            opt.textContent = `${badge}${voice.name} (${voice.lang})`;
            if (this.audio.selectedVoiceURI && (voice.voiceURI === this.audio.selectedVoiceURI || voice.name === this.audio.selectedVoiceURI)) {
                opt.selected = true;
            } else if (!this.audio.selectedVoiceURI && this.audio.activeVoice === voice) {
                opt.selected = true;
            }
            this.voiceSelectEl.appendChild(opt);
        });
    }

    bindEvents() {
        // Security Gatekeeper Event Listeners
        if (this.gateUnlockBtnEl) {
            this.gateUnlockBtnEl.addEventListener('click', () => this.attemptUnlock());
        }

        if (this.gatePassInputEl) {
            this.gatePassInputEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.attemptUnlock();
            });
        }

        if (this.toggleGatePassBtnEl && this.gatePassInputEl) {
            this.toggleGatePassBtnEl.addEventListener('click', () => {
                const isPass = this.gatePassInputEl.type === 'password';
                this.gatePassInputEl.type = isPass ? 'text' : 'password';
                this.toggleGatePassBtnEl.textContent = isPass ? '🙈' : '👁️';
            });
        }

        if (this.lockTerminalBtnEl) {
            this.lockTerminalBtnEl.addEventListener('click', (e) => {
                if (e.shiftKey) {
                    const newPass = prompt("Set New Shinobi Security Passcode:");
                    if (newPass && newPass.trim()) {
                        this.currentPassword = newPass.trim();
                        localStorage.setItem('shinobi_gate_password', this.currentPassword);
                        alert("Passcode updated successfully!");
                    }
                    return;
                }
                this.isAuthenticated = false;
                localStorage.removeItem('shinobi_authenticated');
                this.showLockScreen();
            });
        }

        // Narration Playback Widget Controls (Start, Pause, Resume, Stop)
        if (this.narratePlayBtnEl) {
            this.narratePlayBtnEl.addEventListener('click', () => {
                const node = this.campaign.chapters.find(c => c.id === this.currentNode) || this.campaign.chapters[0];
                const textToSpeak = (node && node.narrative) ? node.narrative : this.audio.lastSpokenText;
                if (textToSpeak) {
                    this.audio.speak(textToSpeak);
                }
            });
        }

        if (this.narratePauseBtnEl) {
            this.narratePauseBtnEl.addEventListener('click', () => {
                this.audio.togglePause();
            });
        }

        if (this.narrateStopBtnEl) {
            this.narrateStopBtnEl.addEventListener('click', () => {
                this.audio.stopSpeech();
            });
        }

        // Restart Saga Confirmation
        if (this.restartSagaBtnEl) {
            this.restartSagaBtnEl.addEventListener('click', () => {
                const confirmed = confirm("🔄 Restart your Shinobi Saga from the beginning?\n\nThis will reset your character level, bells, and story back to Act I (The Bell Test).");
                if (confirmed) {
                    this.state.reset();
                    this.currentNode = this.campaign.INITIAL_NODE;
                    this.audio.stopSpeech();
                    this.renderAll();
                    alert("Saga restarted! Team 7 stands ready before Kakashi-sensei.");
                }
            });
        }

        // Freeform action button
        if (this.freeformBtnEl && this.freeformInputEl) {
            this.freeformBtnEl.addEventListener('click', () => this.handleFreeformAction());
            this.freeformInputEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') this.handleFreeformAction();
            });
        }

        // Voice Narration Toggle
        if (this.voiceToggleBtnEl) {
            this.voiceToggleBtnEl.addEventListener('click', () => {
                this.audio.voiceEnabled = !this.audio.voiceEnabled;
                this.voiceToggleBtnEl.classList.toggle('active', this.audio.voiceEnabled);
                this.voiceToggleBtnEl.querySelector('.btn-label').textContent = this.audio.voiceEnabled ? 'VOICE ON' : 'VOICE MUTED';
                if (!this.audio.voiceEnabled) this.audio.stopSpeech();
            });
        }

        // Voice Studio Modal Open
        if (this.voiceSettingsBtnEl) {
            this.voiceSettingsBtnEl.addEventListener('click', () => {
                if (this.voiceModalEl) {
                    this.voiceModalEl.style.display = 'flex';
                    this.populateVoiceDropdown();

                    // Sync persona active button
                    const personaBtns = document.querySelectorAll('.persona-btn');
                    personaBtns.forEach(btn => {
                        const p = btn.getAttribute('data-persona');
                        if (p === this.audio.currentPersona) {
                            btn.classList.add('active');
                            if (p === 'sultry_female') {
                                btn.style.border = '1px solid #f43f5e';
                                btn.style.background = 'rgba(244, 63, 94, 0.25)';
                            } else {
                                btn.style.border = '1px solid var(--chakra-water)';
                                btn.style.background = 'rgba(56, 189, 248, 0.2)';
                            }
                        } else {
                            btn.classList.remove('active');
                            btn.style.border = '1px solid var(--border-subtle)';
                            btn.style.background = 'rgba(30, 41, 59, 0.5)';
                        }
                    });

                    if (this.elevenLabsKeyInputEl) this.elevenLabsKeyInputEl.value = this.audio.elevenLabsKey || '';
                    if (this.elevenLabsVoiceSelectEl) this.elevenLabsVoiceSelectEl.value = this.audio.elevenLabsVoiceId || 'EXAVITQu4vr4xnSDxMaL';
                    if (this.voiceRateSliderEl) this.voiceRateSliderEl.value = this.audio.voiceRate || 0.93;
                    if (this.voicePitchSliderEl) this.voicePitchSliderEl.value = this.audio.voicePitch || 0.92;
                    if (this.voiceVolSliderEl) this.voiceVolSliderEl.value = this.audio.voiceVolume || 1.0;
                    if (this.rateValEl) this.rateValEl.textContent = `${(this.audio.voiceRate || 0.93).toFixed(2)}x`;
                    if (this.pitchValEl) this.pitchValEl.textContent = (this.audio.voicePitch || 0.92).toFixed(2);
                    if (this.volValEl) this.volValEl.textContent = `${Math.round((this.audio.voiceVolume || 1.0) * 100)}%`;
                }
            });
        }

        // Persona Preset Buttons (Sultry Female, Sweet, Femme Fatale, Sensei)
        const personaBtns = document.querySelectorAll('.persona-btn');
        personaBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const persona = btn.getAttribute('data-persona');
                this.audio.setPersona(persona);

                personaBtns.forEach(b => {
                    b.classList.remove('active');
                    b.style.border = '1px solid var(--border-subtle)';
                    b.style.background = 'rgba(30, 41, 59, 0.5)';
                });
                btn.classList.add('active');
                if (persona === 'sultry_female') {
                    btn.style.border = '1px solid #f43f5e';
                    btn.style.background = 'rgba(244, 63, 94, 0.25)';
                } else {
                    btn.style.border = '1px solid var(--chakra-water)';
                    btn.style.background = 'rgba(56, 189, 248, 0.2)';
                }

                if (this.voiceRateSliderEl) this.voiceRateSliderEl.value = this.audio.voiceRate;
                if (this.voicePitchSliderEl) this.voicePitchSliderEl.value = this.audio.voicePitch;
                if (this.rateValEl) this.rateValEl.textContent = `${this.audio.voiceRate.toFixed(2)}x`;
                if (this.pitchValEl) this.pitchValEl.textContent = this.audio.voicePitch.toFixed(2);
                if (this.elevenLabsVoiceSelectEl) this.elevenLabsVoiceSelectEl.value = this.audio.elevenLabsVoiceId;

                this.populateVoiceDropdown();

                const preset = this.audio.PERSONA_PRESETS[persona];
                if (preset) {
                    this.audio.speak(preset.previewText);
                }
            });
        });

        if (this.voiceCloseBtnEl) {
            this.voiceCloseBtnEl.addEventListener('click', () => {
                if (this.voiceModalEl) this.voiceModalEl.style.display = 'none';
            });
        }

        // Voice Tabs
        if (this.voiceTabBrowserEl && this.voiceTabElevenLabsEl) {
            this.voiceTabBrowserEl.addEventListener('click', () => {
                this.voiceTabBrowserEl.style.borderColor = 'var(--chakra-water)';
                this.voiceTabBrowserEl.style.background = 'rgba(56, 189, 248, 0.15)';
                this.voiceTabBrowserEl.style.color = '#fff';
                this.voiceTabElevenLabsEl.style.borderColor = 'var(--border-subtle)';
                this.voiceTabElevenLabsEl.style.background = 'rgba(30, 41, 59, 0.5)';
                this.voiceTabElevenLabsEl.style.color = 'var(--text-secondary)';
                if (this.panelBrowserVoiceEl) this.panelBrowserVoiceEl.style.display = 'flex';
                if (this.panelElevenLabsVoiceEl) this.panelElevenLabsVoiceEl.style.display = 'none';
            });
            this.voiceTabElevenLabsEl.addEventListener('click', () => {
                this.voiceTabElevenLabsEl.style.borderColor = 'var(--chakra-water)';
                this.voiceTabElevenLabsEl.style.background = 'rgba(56, 189, 248, 0.15)';
                this.voiceTabElevenLabsEl.style.color = '#fff';
                this.voiceTabBrowserEl.style.borderColor = 'var(--border-subtle)';
                this.voiceTabBrowserEl.style.background = 'rgba(30, 41, 59, 0.5)';
                this.voiceTabBrowserEl.style.color = 'var(--text-secondary)';
                if (this.panelBrowserVoiceEl) this.panelBrowserVoiceEl.style.display = 'none';
                if (this.panelElevenLabsVoiceEl) this.panelElevenLabsVoiceEl.style.display = 'flex';
            });
        }

        // Sliders
        if (this.voiceRateSliderEl && this.rateValEl) {
            this.voiceRateSliderEl.addEventListener('input', (e) => {
                this.rateValEl.textContent = `${parseFloat(e.target.value).toFixed(2)}x`;
            });
        }
        if (this.voicePitchSliderEl && this.pitchValEl) {
            this.voicePitchSliderEl.addEventListener('input', (e) => {
                this.pitchValEl.textContent = parseFloat(e.target.value).toFixed(2);
            });
        }
        if (this.voiceVolSliderEl && this.volValEl) {
            this.voiceVolSliderEl.addEventListener('input', (e) => {
                this.volValEl.textContent = `${Math.round(parseFloat(e.target.value) * 100)}%`;
            });
        }

        // Test Voice buttons
        if (this.voiceTestBtnEl) {
            this.voiceTestBtnEl.addEventListener('click', () => {
                const selectedURI = this.voiceSelectEl ? this.voiceSelectEl.value : '';
                if (selectedURI) this.audio.setVoice(selectedURI);
                const rate = this.voiceRateSliderEl ? parseFloat(this.voiceRateSliderEl.value) : 0.93;
                const pitch = this.voicePitchSliderEl ? parseFloat(this.voicePitchSliderEl.value) : 0.92;
                const vol = this.voiceVolSliderEl ? parseFloat(this.voiceVolSliderEl.value) : 1.0;
                const preset = this.audio.PERSONA_PRESETS[this.audio.currentPersona] || this.audio.PERSONA_PRESETS.sultry_female;
                this.audio.speak(preset.previewText, { rate, pitch, volume: vol });
            });
        }

        if (this.elevenLabsTestBtnEl) {
            this.elevenLabsTestBtnEl.addEventListener('click', async () => {
                const key = this.elevenLabsKeyInputEl ? this.elevenLabsKeyInputEl.value.trim() : '';
                const voiceId = this.elevenLabsVoiceSelectEl ? this.elevenLabsVoiceSelectEl.value : 'EXAVITQu4vr4xnSDxMaL';
                if (!key) {
                    alert('Please enter an ElevenLabs API Key first to test AI voice actors.');
                    return;
                }
                this.audio.setElevenLabsConfig(key, voiceId, 'elevenlabs');
                const prev = this.elevenLabsTestBtnEl.innerHTML;
                this.elevenLabsTestBtnEl.innerHTML = '<span>⏳ Speaking...</span>';
                const preset = this.audio.PERSONA_PRESETS[this.audio.currentPersona] || this.audio.PERSONA_PRESETS.sultry_female;
                await this.audio.speak(preset.previewText);
                this.elevenLabsTestBtnEl.innerHTML = prev;
            });
        }

        // Save Voice Settings
        if (this.voiceSaveBtnEl) {
            this.voiceSaveBtnEl.addEventListener('click', () => {
                const selectedURI = this.voiceSelectEl ? this.voiceSelectEl.value : '';
                if (selectedURI) this.audio.setVoice(selectedURI);
                const rate = this.voiceRateSliderEl ? parseFloat(this.voiceRateSliderEl.value) : 1.0;
                const pitch = this.voicePitchSliderEl ? parseFloat(this.voicePitchSliderEl.value) : 1.0;
                const vol = this.voiceVolSliderEl ? parseFloat(this.voiceVolSliderEl.value) : 0.95;
                this.audio.setVoiceSettings(rate, pitch, vol);

                const elevenKey = this.elevenLabsKeyInputEl ? this.elevenLabsKeyInputEl.value.trim() : '';
                const elevenVoice = this.elevenLabsVoiceSelectEl ? this.elevenLabsVoiceSelectEl.value : 'pNInz6obpgDQGcFmaJgB';
                const isElevenTab = this.panelElevenLabsVoiceEl && this.panelElevenLabsVoiceEl.style.display !== 'none';
                const engine = (isElevenTab && elevenKey) ? 'elevenlabs' : 'browser';
                this.audio.setElevenLabsConfig(elevenKey, elevenVoice, engine);

                if (this.voiceModalEl) this.voiceModalEl.style.display = 'none';
                alert('Audio & Voice settings saved successfully!');
            });
        }

        // Gemini Settings Modal
        if (this.geminiSettingsBtnEl) {
            this.geminiSettingsBtnEl.addEventListener('click', () => {
                this.geminiModalEl.style.display = 'flex';
                this.geminiApiKeyInputEl.value = this.gemini.apiKey;
                if (this.geminiModelSelectEl) {
                    this.geminiModelSelectEl.value = this.gemini.model;
                }
            });
        }

        if (this.geminiCloseBtnEl) {
            this.geminiCloseBtnEl.addEventListener('click', () => {
                this.geminiModalEl.style.display = 'none';
            });
        }

        if (this.geminiSaveKeyBtnEl) {
            this.geminiSaveKeyBtnEl.addEventListener('click', () => {
                const key = this.geminiApiKeyInputEl.value.trim();
                const model = this.geminiModelSelectEl ? this.geminiModelSelectEl.value : 'gemini-flash-latest';
                this.gemini.setApiKey(key);
                this.gemini.setModel(model);
                this.updateGeminiStatus();
                this.geminiModalEl.style.display = 'none';
                alert(key ? `Connected! Using ${model} as AI Dungeon Master.` : 'Gemini API Key removed. Playing in local campaign mode.');
            });
        }

        // Modal backdrop dismiss
        if (this.geminiModalEl) {
            this.geminiModalEl.addEventListener('click', (e) => {
                if (e.target === this.geminiModalEl) this.geminiModalEl.style.display = 'none';
            });
        }

        if (this.voiceModalEl) {
            this.voiceModalEl.addEventListener('click', (e) => {
                if (e.target === this.voiceModalEl) this.voiceModalEl.style.display = 'none';
            });
        }

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (this.geminiModalEl) this.geminiModalEl.style.display = 'none';
                if (this.voiceModalEl) this.voiceModalEl.style.display = 'none';
                if (this.diceModalEl) this.diceModalEl.style.display = 'none';
            }
        });
    }

    renderAll() {
        this.renderCharacterPanel();
        this.renderTeamPanel();
        this.renderCurrentScene();
        this.updateGeminiStatus();
        this.populateVoiceDropdown();
    }

    renderCharacterPanel() {
        const char = this.state.character;
        if (this.charNameEl) this.charNameEl.textContent = char.name;
        if (this.charClanEl) this.charClanEl.textContent = char.clan;
        if (this.charRankEl) this.charRankEl.textContent = `RANK: ${char.rank} (LVL ${char.level})`;
        if (this.charNatureEl) this.charNatureEl.textContent = char.nature;
        if (this.charAvatarImgEl) this.charAvatarImgEl.src = char.avatar;

        // Meters
        if (this.hpCurrentEl) this.hpCurrentEl.textContent = char.hp;
        if (this.hpMaxEl) this.hpMaxEl.textContent = char.maxHp;
        if (this.hpBarFillEl) {
            const hpPct = Math.max(0, Math.min(100, (char.hp / char.maxHp) * 100));
            this.hpBarFillEl.style.width = `${hpPct}%`;
        }

        if (this.chakraCurrentEl) this.chakraCurrentEl.textContent = char.chakra;
        if (this.chakraMaxEl) this.chakraMaxEl.textContent = char.maxChakra;
        if (this.chakraBarFillEl) {
            const ckPct = Math.max(0, Math.min(100, (char.chakra / char.maxChakra) * 100));
            this.chakraBarFillEl.style.width = `${ckPct}%`;
        }

        if (this.expCurrentEl) this.expCurrentEl.textContent = char.exp;
        if (this.expMaxEl) this.expMaxEl.textContent = char.expNext;
        if (this.expBarFillEl) {
            const expPct = Math.max(0, Math.min(100, (char.exp / char.expNext) * 100));
            this.expBarFillEl.style.width = `${expPct}%`;
        }

        if (this.charRyoEl) this.charRyoEl.textContent = char.ryo.toLocaleString();

        // Attributes
        if (this.statNinjutsuEl) this.statNinjutsuEl.textContent = char.stats.ninjutsu;
        if (this.statTaijutsuEl) this.statTaijutsuEl.textContent = char.stats.taijutsu;
        if (this.statGenjutsuEl) this.statGenjutsuEl.textContent = char.stats.genjutsu;
        if (this.statAgilityEl) this.statAgilityEl.textContent = char.stats.agility;
        if (this.statReservesEl) this.statReservesEl.textContent = char.stats.chakraReserves;
        if (this.statTacticsEl) this.statTacticsEl.textContent = char.stats.tactics;

        // Jutsus
        if (this.jutsuListEl) {
            this.jutsuListEl.innerHTML = '';
            char.jutsus.forEach(j => {
                const card = document.createElement('div');
                card.className = 'jutsu-card';
                card.innerHTML = `
                    <div class="jutsu-title">
                        <span>${j.name}</span>
                        <span class="jutsu-cost">${j.cost} CK</span>
                    </div>
                    <div class="jutsu-desc">${j.desc}</div>
                `;
                this.jutsuListEl.appendChild(card);
            });
        }

        // Inventory
        if (this.inventoryListEl) {
            this.inventoryListEl.innerHTML = '';
            char.inventory.forEach(i => {
                const chip = document.createElement('div');
                chip.className = 'item-chip';
                chip.innerHTML = `<span>${i.icon || '📦'}</span> <span>${i.name} (x${i.count})</span>`;
                this.inventoryListEl.appendChild(chip);
            });
        }
    }

    renderTeamPanel() {
        const party = this.state.character.party;
        if (this.teamContainerEl) {
            this.teamContainerEl.innerHTML = '';
            for (const [key, member] of Object.entries(party)) {
                const card = document.createElement('div');
                card.className = 'team-member-card';
                card.innerHTML = `
                    <div class="member-header">
                        <span class="member-name">${member.avatar || '🥷'} ${member.name}</span>
                        <span class="member-role">${member.role}</span>
                    </div>
                    <div style="font-size: 0.72rem; color: var(--text-secondary); line-height: 1.2;">
                        Status: <em>${member.status}</em>
                    </div>
                    ${member.trust !== undefined ? `
                        <div class="trust-row">
                            <span>Trust / Affinity:</span>
                            <span style="color: var(--chakra-water); font-weight: bold;">${member.trust}%</span>
                        </div>
                        <div class="trust-bar">
                            <div class="trust-fill" style="width: ${member.trust}%;"></div>
                        </div>
                    ` : ''}
                `;
                this.teamContainerEl.appendChild(card);
            }
        }

        if (this.bellsCounterEl) {
            const count = this.state.mission.bellsSecured || 0;
            let bellsStr = '';
            for (let i = 0; i < 3; i++) {
                bellsStr += i < count ? '🔔 ' : '⚪ ';
            }
            this.bellsCounterEl.textContent = `${bellsStr} (${count}/3 Secured)`;
        }
    }

    renderCurrentScene() {
        const node = this.campaign.chapters.find(c => c.id === this.currentNode) || this.campaign.chapters[0];
        if (!node) return;

        if (this.sceneVisualImgEl && node.image) {
            this.sceneVisualImgEl.src = node.image;
        }

        if (this.sceneBadgeTitleEl && node.illustration) {
            this.sceneBadgeTitleEl.textContent = `${node.illustration.icon || '🥷'} ${node.illustration.badge || 'SHINOBI TRIAL'}`;
        }

        if (this.sceneChapterTitleEl) this.sceneChapterTitleEl.textContent = node.title;
        if (this.sceneActTagEl) this.sceneActTagEl.textContent = node.act || 'Tactical Scenario';

        // Check if there is a saved dynamic narrative for this exact location
        if (this.state.savedNarrative && this.state.currentNode === this.currentNode) {
            if (this.narrativeBodyEl) this.narrativeBodyEl.textContent = this.state.savedNarrative;
        } else {
            if (this.narrativeBodyEl) this.narrativeBodyEl.textContent = node.narrative;
        }

        // Auto speak narrative only when authenticated
        if (this.audio.voiceEnabled && this.isAuthenticated) {
            setTimeout(() => {
                const textToSpeak = (this.narrativeBodyEl && this.narrativeBodyEl.textContent) ? this.narrativeBodyEl.textContent : node.narrative;
                this.audio.speak(textToSpeak);
            }, 200);
        }

        // Check if there are saved dynamic choices
        if (this.state.savedChoices && this.state.savedChoices.length > 0 && this.state.currentNode === this.currentNode) {
            this.renderDynamicChoices(this.state.savedChoices);
            return;
        }

        // Render Options
        if (this.choicesContainerEl) {
            this.choicesContainerEl.innerHTML = '';
            if (!node.options || node.options.length === 0) {
                // Finale screen
                const finishBtn = document.createElement('button');
                finishBtn.className = 'tactical-choice-btn';
                finishBtn.innerHTML = `
                    <div class="choice-left">
                        <span class="choice-tag">🏆 SAGA COMPLETE</span>
                        <strong class="choice-label">Team 7 Ascends — Replay or Embark on Wave Country</strong>
                        <span class="choice-desc">Restart the Bell Test with different tactical decisions or continue onwards.</span>
                    </div>
                    <span class="choice-check-badge">RESTART SAGA</span>
                `;
                finishBtn.addEventListener('click', () => {
                    this.state.reset();
                    this.currentNode = this.campaign.INITIAL_NODE;
                    this.renderAll();
                });
                this.choicesContainerEl.appendChild(finishBtn);
                return;
            }

            node.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'tactical-choice-btn';
                btn.innerHTML = `
                    <div class="choice-left">
                        <span class="choice-tag">${opt.tag || 'ACTION'}</span>
                        <strong class="choice-label">${opt.label}</strong>
                        ${opt.desc ? `<span class="choice-desc">${opt.desc}</span>` : ''}
                    </div>
                    ${opt.actionType === 'check' ? `
                        <span class="choice-check-badge">${opt.stat.toUpperCase()} DC ${opt.dc}</span>
                    ` : '<span class="choice-check-badge">PROCEED</span>'}
                `;

                btn.addEventListener('click', () => {
                    this.handleOptionSelect(opt);
                });

                this.choicesContainerEl.appendChild(btn);
            });
        }
    }

    renderDynamicChoices(choices) {
        if (!this.choicesContainerEl) return;
        this.choicesContainerEl.innerHTML = '';

        choices.forEach((opt) => {
            const btn = document.createElement('button');
            btn.className = 'tactical-choice-btn';
            btn.style.borderLeft = '3px solid var(--chakra-water)';
            btn.innerHTML = `
                <div class="choice-left">
                    <span class="choice-tag" style="background: rgba(56, 189, 248, 0.2); color: #38bdf8;">${opt.tag || 'DYNAMIC TACTIC'}</span>
                    <strong class="choice-label">${opt.label}</strong>
                    ${opt.desc ? `<span class="choice-desc">${opt.desc}</span>` : ''}
                </div>
                ${opt.stat && opt.dc ? `
                    <span class="choice-check-badge">${opt.stat.toUpperCase()} DC ${opt.dc}</span>
                ` : '<span class="choice-check-badge">EXECUTE</span>'}
            `;

            btn.addEventListener('click', () => {
                if (opt.costChakra && !this.state.useChakra(opt.costChakra)) {
                    alert(`Insufficient Chakra! You need ${opt.costChakra} chakra to perform this action.`);
                    return;
                }

                if (opt.stat && opt.dc) {
                    const statVal = this.state.character.stats[opt.stat] || 50;
                    const roll = Math.floor(Math.random() * 20) + 1;
                    const mod = Math.floor((statVal - 50) / 5);
                    const total = roll + mod;
                    const success = total >= opt.dc || roll === 20;

                    this.showDiceModal(roll, mod, total, opt.dc, opt.stat.toUpperCase(), success, () => {
                        if (success) {
                            this.state.addExperience(25);
                            this.audio.playWaterSplash();
                        } else {
                            this.state.modifyHp(-5);
                            this.audio.playKunaiClash();
                        }

                        if (this.gemini.enabled) {
                            this.handleDynamicChoiceSubmit(opt.label, success);
                        } else {
                            const outcomeNarrative = `You executed: "${opt.label}".\n\n${success ? 'The tactical maneuver succeeds cleanly, shifting the momentum in your favor!' : 'Kakashi parries the maneuver cleanly, forcing you to reposition swiftly.'}`;
                            this.narrativeBodyEl.textContent = outcomeNarrative;
                            if (this.audio.voiceEnabled) this.audio.speak(outcomeNarrative);
                            this.state.saveCurrentLocation(this.currentNode, outcomeNarrative, null);
                            this.renderAll();
                        }
                    });
                } else {
                    if (this.gemini.enabled) {
                        this.handleDynamicChoiceSubmit(opt.label, true);
                    } else {
                        this.audio.playWaterSplash();
                        const outcomeNarrative = `You execute: "${opt.label}".\n\nThe clash between Team 7 and Kakashi-sensei continues to unfold with high intensity!`;
                        this.narrativeBodyEl.textContent = outcomeNarrative;
                        if (this.audio.voiceEnabled) this.audio.speak(outcomeNarrative);
                        this.state.saveCurrentLocation(this.currentNode, outcomeNarrative, null);
                        this.renderAll();
                    }
                }
            });

            this.choicesContainerEl.appendChild(btn);
        });
    }

    async handleDynamicChoiceSubmit(choiceLabel, success) {
        const text = `I choose: ${choiceLabel}. (Action check was ${success ? 'a SUCCESS' : 'DEFLECTED/FAILED'})`;
        const currentNarrative = this.narrativeBodyEl.textContent;
        this.narrativeBodyEl.textContent += `\n\n[Action Selected]: ${choiceLabel}\n\n[Dungeon Master (${this.gemini.model}) is formulating the narrative...]`;
        try {
            const response = await this.gemini.promptDungeonMaster(text, currentNarrative);
            this.narrativeBodyEl.textContent = response;
            if (this.audio.voiceEnabled) {
                this.audio.speak(response);
            }
            const dynamicChoices = this.gemini.extractChoices(response);
            if (dynamicChoices && dynamicChoices.length > 0) {
                this.renderDynamicChoices(dynamicChoices);
                this.state.saveCurrentLocation(this.currentNode, response, dynamicChoices);
            } else {
                const followUpChoices = [
                    { label: 'Press into close-quarters combat', desc: 'Use Tobirama-style Water Fist to breach his defense.', tag: 'TAIJUTSU', stat: 'taijutsu', dc: 14 },
                    { label: 'Coordinate with Sasuke\'s Fireball Jutsu', desc: 'Create steam cover to blind Kakashi\'s Sharingan.', tag: 'COMBO', stat: 'tactics', dc: 13 },
                    { label: 'Reposition and observe for bell openings', desc: 'Analyze Kakashi\'s balance and bell pouch tether.', tag: 'ANALYSIS', stat: 'tactics', dc: 12 }
                ];
                this.renderDynamicChoices(followUpChoices);
                this.state.saveCurrentLocation(this.currentNode, response, followUpChoices);
            }
            this.renderCharacterPanel();
            this.renderTeamPanel();
        } catch (err) {
            alert(`Gemini DM Error: ${err.message}`);
        }
    }

    handleOptionSelect(opt) {
        this.audio.playDiceRoll();

        if (opt.costChakra) {
            if (!this.state.useChakra(opt.costChakra)) {
                alert(`Insufficient Chakra! You need ${opt.costChakra} chakra to perform this action.`);
                return;
            }
            this.audio.playWaterSplash();
        }

        if (opt.actionType === 'check') {
            const statVal = this.state.character.stats[opt.stat] || 50;
            const roll = Math.floor(Math.random() * 20) + 1; // 1 to 20
            const mod = Math.floor((statVal - 50) / 5);
            const total = roll + mod;
            const success = total >= opt.dc || roll === 20;

            this.showDiceModal(roll, mod, total, opt.dc, opt.stat.toUpperCase(), success, () => {
                const destination = success ? (opt.successNode || opt.nextNode) : (opt.failNode || opt.nextNode);
                if (success) {
                    this.state.addExperience(25);
                    this.audio.playKunaiClash();
                }
                this.state.saveCurrentLocation(destination, null, null);
                this.currentNode = destination;
                this.renderAll();
            });
            return;
        }

        // Direct advance
        const destination = opt.nextNode || opt.targetNode || this.currentNode;
        this.state.saveCurrentLocation(destination, null, null);
        this.currentNode = destination;
        this.renderAll();
    }

    async handleFreeformAction() {
        const text = (this.freeformInputEl.value || '').trim();
        if (!text) return;
        this.freeformInputEl.value = '';

        if (text.startsWith('/setpass ')) {
            const newPass = text.slice(9).trim();
            if (newPass) {
                this.currentPassword = newPass;
                localStorage.setItem('shinobi_gate_password', newPass);
                alert("Security passcode updated successfully!");
                return;
            }
        }

        this.audio.playWaterSplash();

        if (this.gemini.enabled) {
            // Live Gemini DM invocation
            const currentNarrative = this.narrativeBodyEl.textContent;
            this.narrativeBodyEl.textContent += `\n\n[You]: ${text}\n\n[Dungeon Master (${this.gemini.model}) is formulating the narrative...]`;
            try {
                const response = await this.gemini.promptDungeonMaster(text, currentNarrative);
                this.narrativeBodyEl.textContent = response;
                if (this.audio.voiceEnabled) {
                    this.audio.speak(response);
                }

                // Extract dynamic choices generated by Gemini DM
                const dynamicChoices = this.gemini.extractChoices(response);
                if (dynamicChoices && dynamicChoices.length > 0) {
                    this.renderDynamicChoices(dynamicChoices);
                    this.state.saveCurrentLocation(this.currentNode, response, dynamicChoices);
                } else {
                    const fallbackChoices = [
                        { label: `Press the attack: Follow through on "${text.slice(0, 25)}..."`, desc: 'Capitalize on the momentary opening with a swift water or taijutsu strike.', tag: 'ADVANCE' },
                        { label: 'Coordinate with Sasuke & Naruto', desc: 'Signal Team 7 to execute a flanking maneuver while Kakashi is engaged.', tag: 'TEAM COMBO', stat: 'tactics', dc: 13 },
                        { label: 'Form Water Clone feint & reposition', desc: 'Create a fluid diversion using Tobirama-style clone technique.', tag: 'NINJUTSU', stat: 'ninjutsu', dc: 12, costChakra: 10 }
                    ];
                    this.renderDynamicChoices(fallbackChoices);
                    this.state.saveCurrentLocation(this.currentNode, response, fallbackChoices);
                }

                this.renderCharacterPanel();
                this.renderTeamPanel();
            } catch (err) {
                alert(`Gemini AI DM Error: ${err.message}`);
                this.narrativeBodyEl.textContent = currentNarrative;
            }
        } else {
            // Offline Shinobi freeform resolution
            const roll = Math.floor(Math.random() * 20) + 1;
            const mod = Math.floor((this.state.character.stats.tactics - 50) / 5);
            const total = roll + mod;
            const success = total >= 13;

            this.showDiceModal(roll, mod, total, 13, 'TACTICAL FREEFORM', success, () => {
                let outcomeText = '';
                if (success) {
                    this.state.addExperience(30);
                    this.audio.playWaterSplash();
                    outcomeText = `You execute: "${text}" with flawless Senju timing!\n\nYour water chakra flows seamlessly into the maneuver. Kakashi is momentarily forced to readjust his stance, creating a vital tactical opening for Team 7!`;
                } else {
                    this.state.modifyHp(-10);
                    this.audio.playKunaiClash();
                    outcomeText = `You attempt: "${text}"!\n\nHowever, Kakashi's copy-ninja senses instantly read the flow of your chakra. With lightning reflexes, he deflects your maneuver, brushing you back with a stinging counter-strike! (-10 HP)`;
                }
                this.narrativeBodyEl.textContent = outcomeText;
                if (this.audio.voiceEnabled) {
                    this.audio.speak(outcomeText);
                }

                const offlineChoices = [
                    { label: 'Capitalize on the tactical shift', desc: 'Launch a rapid follow-up attack.', tag: 'STRIKE', stat: 'agility', dc: 14 },
                    { label: 'Regroup with Naruto and Sakura', desc: 'Fall back behind tree cover and coordinate chakra reserves.', tag: 'TACTICS' },
                    { label: 'Channel Water Severing Wave', desc: 'Unleash high-pressure water blade to test Kakashi\'s guard.', tag: 'SENJU SECRET', stat: 'ninjutsu', dc: 15, costChakra: 15 }
                ];
                this.renderDynamicChoices(offlineChoices);
                this.state.saveCurrentLocation(this.currentNode, outcomeText, offlineChoices);
                this.renderCharacterPanel();
            });
        }
    }

    showDiceModal(roll, mod, total, dc, label, isSuccess, callback) {
        if (!this.diceModalEl) {
            callback();
            return;
        }

        this.diceModalEl.style.display = 'flex';
        this.diceTitleEl.textContent = `${label} CHECK (DC ${dc})`;
        this.diceRollValEl.textContent = roll;
        this.diceResultTextEl.innerHTML = `
            <div>Base D20: <strong>${roll}</strong> + Modifier: <strong>${mod >= 0 ? '+' : ''}${mod}</strong> = <strong>${total}</strong></div>
            <div style="font-size: 1.1rem; font-weight: bold; margin-top: 0.5rem; color: ${isSuccess ? '#4ade80' : '#f87171'};">
                ${isSuccess ? '★ SUCCESS!' : '✕ DEFLECTED / FAILED'}
            </div>
        `;

        setTimeout(() => {
            this.diceModalEl.style.display = 'none';
            callback();
        }, 1600);
    }

    updateGeminiStatus() {
        if (!this.geminiStatusBadgeEl) return;
        if (this.gemini.enabled) {
            this.geminiStatusBadgeEl.textContent = `CONNECTED // ${this.gemini.model.toUpperCase()} ACTIVE`;
            this.geminiStatusBadgeEl.style.borderColor = '#22c55e';
            this.geminiStatusBadgeEl.style.color = '#4ade80';
            this.geminiStatusBadgeEl.style.background = 'rgba(34, 197, 94, 0.2)';
        } else {
            this.geminiStatusBadgeEl.textContent = 'STANDALONE CAMPAIGN MODE (NO API KEY REQUIRED)';
            this.geminiStatusBadgeEl.style.borderColor = 'var(--border-subtle)';
            this.geminiStatusBadgeEl.style.color = 'var(--text-secondary)';
            this.geminiStatusBadgeEl.style.background = 'rgba(30, 41, 59, 0.5)';
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.app = new ShinobiRPGApp();
});
