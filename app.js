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
        this.statCharmEl = document.getElementById('stat-charm');
        this.statSerpentEl = document.getElementById('stat-serpent');

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
        this.voiceTabPackEl = document.getElementById('voice-tab-pack');
        this.voiceTabElevenLabsEl = document.getElementById('voice-tab-elevenlabs');
        this.panelVoicePackEl = document.getElementById('panel-voice-pack');
        this.panelElevenLabsVoiceEl = document.getElementById('panel-elevenlabs-voice');
        this.voiceVolSliderEl = document.getElementById('voice-vol-slider');
        this.volValEl = document.getElementById('vol-val');
        this.elevenLabsVoiceSelectEl = document.getElementById('elevenlabs-voice-select');
        this.elevenLabsKeyInputEl = document.getElementById('elevenlabs-key-input');
        this.elevenLabsTestBtnEl = document.getElementById('elevenlabs-test-btn');
        this.toggleElevenLabsKeyBtnEl = document.getElementById('toggle-elevenlabs-key-btn');
        this.elevenLabsTestStatusEl = document.getElementById('elevenlabs-test-status');
        this.voiceSaveBtnEl = document.getElementById('voice-save-btn');
        this.voiceBoostBtnEl = document.getElementById('voice-boost-btn');
        this.toggleVoicePackBtnEl = document.getElementById('toggle-voice-pack-btn');
        this.sidebarVoiceStudioBtnEl = document.getElementById('sidebar-voice-studio-btn');

        // Gemini Live Settings
        this.geminiSettingsBtnEl = document.getElementById('gemini-settings-btn');
        this.geminiModalEl = document.getElementById('gemini-modal');
        this.geminiCloseBtnEl = document.getElementById('gemini-close-btn');
        this.geminiApiKeyInputEl = document.getElementById('gemini-api-key-input');
        this.geminiModelSelectEl = document.getElementById('gemini-model-select');
        this.geminiSaveKeyBtnEl = document.getElementById('gemini-save-key-btn');
        this.geminiClearKeyBtnEl = document.getElementById('gemini-clear-key-btn');
        this.geminiTestKeyBtnEl = document.getElementById('gemini-test-key-btn');
        this.toggleGeminiKeyBtnEl = document.getElementById('toggle-gemini-key-btn');
        this.geminiTestStatusEl = document.getElementById('gemini-test-status');
        this.geminiStatusBadgeEl = document.getElementById('gemini-status-badge');

        // Dice Modal
        this.diceModalEl = document.getElementById('dice-modal');
        this.diceRollValEl = document.getElementById('dice-roll-val');
        this.diceTitleEl = document.getElementById('dice-title');
        this.diceResultTextEl = document.getElementById('dice-result-text');
        this.diceCloseBtnEl = document.getElementById('dice-close-btn');

        // Combat Power & Power Tier
        this.charCombatPowerEl = document.getElementById('char-combat-power');
        this.charPowerTierEl = document.getElementById('char-power-tier');

        // Manual Dice & Mobile Controls
        this.manualDiceBtnEl = document.getElementById('manual-dice-btn');
        this.mobileDiceBtnEl = document.getElementById('mobile-dice-btn');
        this.mobileVoiceBtnEl = document.getElementById('mobile-voice-btn');
        this.gameToastEl = document.getElementById('game-toast');
        this.appLayoutEl = document.querySelector('.app-layout');
        this.mobileNavBtns = document.querySelectorAll('.mobile-nav-btn[data-tab]');

        // BGM Music & Romance Modal Elements
        this.bgmToggleBtnEl = document.getElementById('bgm-toggle-btn');
        this.bgmLabelEl = document.getElementById('bgm-label');
        this.romanceModalEl = document.getElementById('romance-modal');
        this.romanceCloseBtnEl = document.getElementById('romance-close-btn');
        this.romanceAcceptBtnEl = document.getElementById('romance-accept-btn');
        this.romanceModalAvatarEl = document.getElementById('romance-modal-avatar');
        this.romanceModalTitleEl = document.getElementById('romance-modal-title');
        this.romanceModalSubtitleEl = document.getElementById('romance-modal-subtitle');
        this.romanceModalDialogueEl = document.getElementById('romance-modal-dialogue');
        this.romanceModalRewardEl = document.getElementById('romance-modal-reward');

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
            if (this.audio.activeAudioSource === 'voice_pack') {
                if (this.narrationStateLabelEl) this.narrationStateLabelEl.textContent = 'Playing Voice Pack (MP3)...';
            } else {
                const persona = this.audio.PERSONA_PRESETS[this.audio.currentPersona];
                const pName = persona ? (persona.gender === 'female' ? 'Kunoichi' : 'Sensei') : 'Narrator';
                if (this.narrationStateLabelEl) this.narrationStateLabelEl.textContent = `Speaking (${pName})...`;
            }
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

    updateVoiceBoostUI() {
        if (!this.voiceBoostBtnEl) return;
        const isBoost = this.audio.voiceBoost;
        this.voiceBoostBtnEl.textContent = isBoost ? 'BOOST ON' : 'BOOST OFF';
        this.voiceBoostBtnEl.style.background = isBoost ? 'var(--chakra-water)' : 'rgba(100, 116, 139, 0.4)';
        this.voiceBoostBtnEl.style.color = isBoost ? '#0f172a' : '#fff';
    }

    updateVoicePackUI() {
        if (!this.toggleVoicePackBtnEl) return;
        const active = this.audio.useStudioVoicePack;
        this.toggleVoicePackBtnEl.textContent = active ? 'VOICE PACK ON' : 'VOICE PACK OFF';
        this.toggleVoicePackBtnEl.style.background = active ? '#22c55e' : 'rgba(100, 116, 139, 0.4)';
        this.toggleVoicePackBtnEl.style.color = active ? '#0f172a' : '#fff';
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
                    this.audio.speak(node.narrative, { nodeId: node.id, audio: node.audio });
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
                const textToSpeak = (this.narrativeBodyEl && this.narrativeBodyEl.textContent) ? this.narrativeBodyEl.textContent : (node ? node.narrative : this.audio.lastSpokenText);
                const isDynamic = this.state.savedNarrative && this.state.savedNarrative === textToSpeak;
                if (textToSpeak) {
                    this.audio.speak(textToSpeak, { nodeId: isDynamic ? null : (node ? node.id : null), audio: isDynamic ? null : (node ? node.audio : null) });
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
        const openVoiceModal = () => {
            if (this.voiceModalEl) {
                this.voiceModalEl.style.display = 'flex';
                if (this.elevenLabsKeyInputEl) this.elevenLabsKeyInputEl.value = this.audio.elevenLabsKey || '';
                if (this.elevenLabsVoiceSelectEl) this.elevenLabsVoiceSelectEl.value = this.audio.elevenLabsVoiceId || 'EXAVITQu4vr4xnSDxMaL';
                if (this.voiceVolSliderEl) this.voiceVolSliderEl.value = this.audio.voiceVolume || 1.0;
                const volPct = Math.round((this.audio.voiceVolume || 1.0) * 100);
                if (this.volValEl) this.volValEl.textContent = `${volPct}% ${volPct >= 100 ? '(LOUD)' : ''}`;
                this.updateVoiceBoostUI();
                this.updateVoicePackUI();
                if (this.elevenLabsTestStatusEl) this.elevenLabsTestStatusEl.style.display = 'none';
            }
        };

        if (this.voiceSettingsBtnEl) {
            this.voiceSettingsBtnEl.addEventListener('click', openVoiceModal);
        }
        if (this.sidebarVoiceStudioBtnEl) {
            this.sidebarVoiceStudioBtnEl.addEventListener('click', openVoiceModal);
        }

        // Voice Boost Button
        if (this.voiceBoostBtnEl) {
            this.updateVoiceBoostUI();
            this.voiceBoostBtnEl.addEventListener('click', () => {
                this.audio.voiceBoost = !this.audio.voiceBoost;
                localStorage.setItem('naruto_voice_boost', this.audio.voiceBoost ? 'true' : 'false');
                this.updateVoiceBoostUI();
                const preset = this.audio.PERSONA_PRESETS[this.audio.currentPersona] || this.audio.PERSONA_PRESETS.sultry_female;
                this.audio.speak(this.audio.voiceBoost ? "Loud voice boost activated. Voice volume and presence maximized!" : "Voice boost normal.");
            });
        }

        // Master Studio Voice Pack Toggle Button
        if (this.toggleVoicePackBtnEl) {
            this.updateVoicePackUI();
            this.toggleVoicePackBtnEl.addEventListener('click', () => {
                this.audio.useStudioVoicePack = !this.audio.useStudioVoicePack;
                localStorage.setItem('naruto_use_voice_pack', this.audio.useStudioVoicePack ? 'true' : 'false');
                this.updateVoicePackUI();
                if (this.audio.useStudioVoicePack) {
                    this.audio.playCharacterClip('kunoichi_guide');
                } else {
                    this.audio.speak("Studio Voice Pack disabled. Using browser speech synthesis.");
                }
            });
        }

        // Character Voice Clip Preview Buttons
        const charClipBtns = document.querySelectorAll('.char-clip-btn');
        charClipBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const clip = btn.getAttribute('data-clip');
                if (clip) {
                    this.audio.playCharacterClip(clip);
                }
            });
        });

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

        // Voice Studio Tabs (Pack vs ElevenLabs)
        if (this.voiceTabPackEl && this.voiceTabElevenLabsEl) {
            this.voiceTabPackEl.addEventListener('click', () => {
                this.voiceTabPackEl.style.borderColor = '#22c55e';
                this.voiceTabPackEl.style.background = 'rgba(34, 197, 94, 0.15)';
                this.voiceTabPackEl.style.color = '#fff';
                this.voiceTabElevenLabsEl.style.borderColor = 'var(--border-subtle)';
                this.voiceTabElevenLabsEl.style.background = 'rgba(30, 41, 59, 0.5)';
                this.voiceTabElevenLabsEl.style.color = 'var(--text-secondary)';
                if (this.panelVoicePackEl) this.panelVoicePackEl.style.display = 'flex';
                if (this.panelElevenLabsVoiceEl) this.panelElevenLabsVoiceEl.style.display = 'none';
            });
            this.voiceTabElevenLabsEl.addEventListener('click', () => {
                this.voiceTabElevenLabsEl.style.borderColor = 'var(--chakra-water)';
                this.voiceTabElevenLabsEl.style.background = 'rgba(56, 189, 248, 0.15)';
                this.voiceTabElevenLabsEl.style.color = '#fff';
                this.voiceTabPackEl.style.borderColor = 'var(--border-subtle)';
                this.voiceTabPackEl.style.background = 'rgba(30, 41, 59, 0.5)';
                this.voiceTabPackEl.style.color = 'var(--text-secondary)';
                if (this.panelVoicePackEl) this.panelVoicePackEl.style.display = 'none';
                if (this.panelElevenLabsVoiceEl) this.panelElevenLabsVoiceEl.style.display = 'flex';
            });
        }

        // Master Volume Slider
        if (this.voiceVolSliderEl && this.volValEl) {
            this.voiceVolSliderEl.addEventListener('input', (e) => {
                const pct = Math.round(parseFloat(e.target.value) * 100);
                this.volValEl.textContent = `${pct}% ${pct >= 100 ? '(LOUD)' : ''}`;
            });
        }

        // ElevenLabs Key Visibility Toggle
        if (this.toggleElevenLabsKeyBtnEl && this.elevenLabsKeyInputEl) {
            this.toggleElevenLabsKeyBtnEl.addEventListener('click', () => {
                const isPass = this.elevenLabsKeyInputEl.type === 'password';
                this.elevenLabsKeyInputEl.type = isPass ? 'text' : 'password';
                this.toggleElevenLabsKeyBtnEl.textContent = isPass ? '🙈' : '👁️';
            });
        }

        // ElevenLabs Live Test Button
        if (this.elevenLabsTestBtnEl) {
            this.elevenLabsTestBtnEl.addEventListener('click', async () => {
                const key = (this.elevenLabsKeyInputEl ? this.elevenLabsKeyInputEl.value : '').trim();
                const voiceId = this.elevenLabsVoiceSelectEl ? this.elevenLabsVoiceSelectEl.value : 'EXAVITQu4vr4xnSDxMaL';
                if (!key) {
                    if (this.elevenLabsTestStatusEl) {
                        this.elevenLabsTestStatusEl.style.display = 'block';
                        this.elevenLabsTestStatusEl.style.background = 'rgba(239, 68, 68, 0.15)';
                        this.elevenLabsTestStatusEl.style.border = '1px solid #ef4444';
                        this.elevenLabsTestStatusEl.style.color = '#fca5a5';
                        this.elevenLabsTestStatusEl.textContent = '✕ Please paste an ElevenLabs API Key first (from elevenlabs.io).';
                    }
                    return;
                }

                if (this.elevenLabsTestStatusEl) {
                    this.elevenLabsTestStatusEl.style.display = 'block';
                    this.elevenLabsTestStatusEl.style.background = 'rgba(56, 189, 248, 0.15)';
                    this.elevenLabsTestStatusEl.style.border = '1px solid var(--chakra-water)';
                    this.elevenLabsTestStatusEl.style.color = '#bae6fd';
                    this.elevenLabsTestStatusEl.textContent = '⏳ Calling ElevenLabs AI TTS & streaming audio sample...';
                }

                const prevText = this.elevenLabsTestBtnEl.innerHTML;
                this.elevenLabsTestBtnEl.innerHTML = '<span>⏳ Testing...</span>';
                const res = await this.audio.testElevenLabs(key, voiceId);
                this.elevenLabsTestBtnEl.innerHTML = prevText;

                if (res.success) {
                    this.audio.setElevenLabsConfig(key, voiceId, 'elevenlabs');
                    if (this.elevenLabsTestStatusEl) {
                        this.elevenLabsTestStatusEl.style.background = 'rgba(34, 197, 94, 0.15)';
                        this.elevenLabsTestStatusEl.style.border = '1px solid #22c55e';
                        this.elevenLabsTestStatusEl.style.color = '#86efac';
                        this.elevenLabsTestStatusEl.textContent = `✅ ElevenLabs Connected! Latency: ${res.latencyMs}ms. Voice actor sample playing now!`;
                    }
                    this.showToast('✅ ElevenLabs AI Voice Validated & Saved!');
                } else {
                    if (this.elevenLabsTestStatusEl) {
                        this.elevenLabsTestStatusEl.style.background = 'rgba(239, 68, 68, 0.15)';
                        this.elevenLabsTestStatusEl.style.border = '1px solid #ef4444';
                        this.elevenLabsTestStatusEl.style.color = '#fca5a5';
                        this.elevenLabsTestStatusEl.textContent = `✕ ElevenLabs Error: ${res.error}`;
                    }
                }
            });
        }

        // Save Voice Settings
        if (this.voiceSaveBtnEl) {
            this.voiceSaveBtnEl.addEventListener('click', () => {
                const vol = this.voiceVolSliderEl ? parseFloat(this.voiceVolSliderEl.value) : 1.0;
                this.audio.setVoiceSettings(0.98, 1.02, vol, this.audio.voiceBoost);

                const elevenKey = this.elevenLabsKeyInputEl ? this.elevenLabsKeyInputEl.value.trim() : '';
                const elevenVoice = this.elevenLabsVoiceSelectEl ? this.elevenLabsVoiceSelectEl.value : 'EXAVITQu4vr4xnSDxMaL';
                const isElevenTab = this.panelElevenLabsVoiceEl && this.panelElevenLabsVoiceEl.style.display !== 'none';
                const engine = (isElevenTab && elevenKey) ? 'elevenlabs' : 'voice_pack';
                this.audio.setElevenLabsConfig(elevenKey, elevenVoice, engine);

                if (this.voiceModalEl) this.voiceModalEl.style.display = 'none';
                this.showToast('🎙️ Audio & Voice Preferences Saved!');
            });
        }

        // Gemini Settings Modal Open
        if (this.geminiSettingsBtnEl) {
            this.geminiSettingsBtnEl.addEventListener('click', () => {
                if (this.geminiModalEl) {
                    this.geminiModalEl.style.display = 'flex';
                    if (this.geminiApiKeyInputEl) this.geminiApiKeyInputEl.value = this.gemini.apiKey || '';
                    if (this.geminiModelSelectEl) this.geminiModelSelectEl.value = this.gemini.model || 'gemini-1.5-flash';
                    if (this.geminiTestStatusEl) this.geminiTestStatusEl.style.display = 'none';
                    this.updateGeminiStatus();
                }
            });
        }

        // Gemini Key Visibility Toggle
        if (this.toggleGeminiKeyBtnEl && this.geminiApiKeyInputEl) {
            this.toggleGeminiKeyBtnEl.addEventListener('click', () => {
                const isPass = this.geminiApiKeyInputEl.type === 'password';
                this.geminiApiKeyInputEl.type = isPass ? 'text' : 'password';
                this.toggleGeminiKeyBtnEl.textContent = isPass ? '🙈' : '👁️';
            });
        }

        // Gemini Live Test Connection Button
        if (this.geminiTestKeyBtnEl) {
            this.geminiTestKeyBtnEl.addEventListener('click', async () => {
                const key = (this.geminiApiKeyInputEl ? this.geminiApiKeyInputEl.value : '').trim();
                const model = this.geminiModelSelectEl ? this.geminiModelSelectEl.value : 'gemini-1.5-flash';
                if (!key) {
                    if (this.geminiTestStatusEl) {
                        this.geminiTestStatusEl.style.display = 'block';
                        this.geminiTestStatusEl.style.background = 'rgba(239, 68, 68, 0.15)';
                        this.geminiTestStatusEl.style.border = '1px solid #ef4444';
                        this.geminiTestStatusEl.style.color = '#fca5a5';
                        this.geminiTestStatusEl.textContent = '✕ Please paste a Google Gemini API Key first.';
                    }
                    return;
                }

                if (this.geminiTestStatusEl) {
                    this.geminiTestStatusEl.style.display = 'block';
                    this.geminiTestStatusEl.style.background = 'rgba(56, 189, 248, 0.15)';
                    this.geminiTestStatusEl.style.border = '1px solid var(--chakra-water)';
                    this.geminiTestStatusEl.style.color = '#bae6fd';
                    this.geminiTestStatusEl.textContent = `⏳ Pinging Google Gemini API (${model})...`;
                }

                const prevText = this.geminiTestKeyBtnEl.innerHTML;
                this.geminiTestKeyBtnEl.innerHTML = '<span>⏳ Testing...</span>';
                const res = await this.gemini.testConnection(key, model);
                this.geminiTestKeyBtnEl.innerHTML = prevText;

                if (res.success) {
                    this.gemini.setApiKey(key);
                    this.gemini.setModel(model);
                    this.updateGeminiStatus();
                    if (this.geminiTestStatusEl) {
                        this.geminiTestStatusEl.style.background = 'rgba(34, 197, 94, 0.15)';
                        this.geminiTestStatusEl.style.border = '1px solid #22c55e';
                        this.geminiTestStatusEl.style.color = '#86efac';
                        this.geminiTestStatusEl.textContent = `✅ SUCCESS! Connected to Google Gemini (${res.model}) in ${res.latencyMs}ms. AI DM is active and ready!`;
                    }
                    this.showToast('✅ Google Gemini API Connected & Saved!');
                } else {
                    if (this.geminiTestStatusEl) {
                        this.geminiTestStatusEl.style.background = 'rgba(239, 68, 68, 0.15)';
                        this.geminiTestStatusEl.style.border = '1px solid #ef4444';
                        this.geminiTestStatusEl.style.color = '#fca5a5';
                        this.geminiTestStatusEl.textContent = `✕ Gemini API Error: ${res.error}`;
                    }
                }
            });
        }

        // Gemini Save Key Button
        if (this.geminiSaveKeyBtnEl) {
            this.geminiSaveKeyBtnEl.addEventListener('click', () => {
                const key = this.geminiApiKeyInputEl ? this.geminiApiKeyInputEl.value.trim() : '';
                const model = this.geminiModelSelectEl ? this.geminiModelSelectEl.value : 'gemini-1.5-flash';
                this.gemini.setApiKey(key);
                this.gemini.setModel(model);
                this.updateGeminiStatus();
                if (this.geminiModalEl) this.geminiModalEl.style.display = 'none';
                this.showToast(key ? `🤖 Gemini AI DM Connected (${model})!` : '🎮 Standalone Local Campaign Mode Active');
            });
        }

        // Gemini Clear Key Button
        if (this.geminiClearKeyBtnEl) {
            this.geminiClearKeyBtnEl.addEventListener('click', () => {
                this.gemini.setApiKey('');
                if (this.geminiApiKeyInputEl) this.geminiApiKeyInputEl.value = '';
                if (this.geminiTestStatusEl) this.geminiTestStatusEl.style.display = 'none';
                this.updateGeminiStatus();
                this.showToast('Gemini API key removed. Running offline campaign.');
            });
        }

        if (this.geminiCloseBtnEl) {
            this.geminiCloseBtnEl.addEventListener('click', () => {
                if (this.geminiModalEl) this.geminiModalEl.style.display = 'none';
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

        // Manual D20 Roll Buttons
        const triggerManualD20 = () => {
            const roll = Math.floor(Math.random() * 20) + 1;
            const stats = this.state.character.stats;
            const highestStatKey = Object.entries(stats).sort((a, b) => b[1] - a[1])[0][0];
            const statVal = stats[highestStatKey] || 70;
            const mod = Math.floor((statVal - 50) / 10);
            const total = roll + mod;
            const isCrit = roll === 20;
            const isCritFail = roll === 1;
            const isSuccess = isCrit || (roll + mod >= 12 && !isCritFail);

            this.audio.playDiceRoll();
            this.showDiceModal(roll, mod, total, 12, highestStatKey.toUpperCase(), isSuccess, () => {
                const label = isCrit ? '🌟 NATURAL 20! CRITICAL SUCCESS!' : (isCritFail ? '💥 NATURAL 1! CRITICAL FAIL!' : (isSuccess ? '★ ROLL SUCCESS!' : '✕ DEFLECTED / MISSED'));
                this.showToast(`D20 Check: [${roll}] + ${mod >= 0 ? '+' : ''}${mod} = ${total} // ${label}`);
            });
        };

        if (this.manualDiceBtnEl) {
            this.manualDiceBtnEl.addEventListener('click', triggerManualD20);
        }
        if (this.mobileDiceBtnEl) {
            this.mobileDiceBtnEl.addEventListener('click', triggerManualD20);
        }

        // Mobile Voice Settings Button
        if (this.mobileVoiceBtnEl) {
            this.mobileVoiceBtnEl.addEventListener('click', () => {
                if (this.voiceModalEl) this.voiceModalEl.style.display = 'flex';
            });
        }

        // Dice Modal Close Button
        if (this.diceCloseBtnEl) {
            this.diceCloseBtnEl.addEventListener('click', () => {
                if (this.diceModalEl) this.diceModalEl.style.display = 'none';
            });
        }

        // Mobile Bottom Navigation Tab Switching
        if (this.mobileNavBtns && this.mobileNavBtns.length > 0) {
            if (this.appLayoutEl) this.appLayoutEl.classList.add('tab-story');
            this.mobileNavBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const tab = btn.dataset.tab;
                    if (!tab) return;
                    if (tab === 'audio') {
                        if (this.voiceModalEl) this.voiceModalEl.style.display = 'flex';
                        return;
                    }
                    this.mobileNavBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    if (this.appLayoutEl) {
                        this.appLayoutEl.classList.remove('tab-story', 'tab-hero', 'tab-team');
                        this.appLayoutEl.classList.add(`tab-${tab}`);
                    }
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            });
        }

        // BGM Toggle Button
        if (this.bgmToggleBtnEl) {
            this.bgmToggleBtnEl.addEventListener('click', () => {
                const active = this.audio.toggleBgm();
                if (this.bgmLabelEl) this.bgmLabelEl.textContent = active ? 'BGM ON' : 'BGM OFF';
                this.bgmToggleBtnEl.style.background = active ? 'rgba(56, 189, 248, 0.2)' : 'rgba(100, 116, 139, 0.3)';
                this.showToast(active ? '🎵 Shinobi Ambient BGM: Playing' : '🔇 Shinobi BGM: Muted');
            });
        }

        // Romance Date Modal Close / Accept
        const closeRomanceModal = () => {
            if (this.romanceModalEl) this.romanceModalEl.style.display = 'none';
        };
        if (this.romanceCloseBtnEl) this.romanceCloseBtnEl.addEventListener('click', closeRomanceModal);
        if (this.romanceAcceptBtnEl) this.romanceAcceptBtnEl.addEventListener('click', closeRomanceModal);
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
        if (this.statCharmEl) this.statCharmEl.textContent = char.stats.charm || 82;
        if (this.statSerpentEl) this.statSerpentEl.textContent = char.stats.serpentSense || 75;

        // Combat Power & Power Tier
        if (this.charCombatPowerEl) {
            this.charCombatPowerEl.textContent = this.state.calculateCombatPower().toLocaleString();
        }
        if (this.charPowerTierEl) {
            this.charPowerTierEl.textContent = this.state.getPowerTier();
        }

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

        // Interactive Inventory
        if (this.inventoryListEl) {
            this.inventoryListEl.innerHTML = '';
            char.inventory.forEach(i => {
                const chip = document.createElement('div');
                chip.className = 'item-chip';
                const isConsumable = i.heals || i.restores || i.id === 'smoke_bomb';
                chip.innerHTML = `
                    <div class="item-chip-top">
                        <span class="item-chip-name">${i.icon || '📦'} ${i.name}</span>
                        <span class="item-chip-count">x${i.count}</span>
                    </div>
                    <div class="item-chip-desc">${i.desc || ''}</div>
                    ${isConsumable ? `<button type="button" class="item-chip-use-btn" data-item-id="${i.id}">USE ITEM</button>` : ''}
                `;
                if (isConsumable) {
                    const useBtn = chip.querySelector('.item-chip-use-btn');
                    if (useBtn) {
                        useBtn.addEventListener('click', (e) => {
                            e.stopPropagation();
                            const res = this.state.useInventoryItem(i.id);
                            if (res.success) {
                                this.audio.playBellJingle();
                                this.renderCharacterPanel();
                                this.showToast(res.message);
                            } else {
                                this.showToast(res.message);
                            }
                        });
                    }
                }
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
                    ${member.affection !== undefined ? `
                        <div class="trust-row" style="margin-top: 4px;">
                            <span style="color: #fb7185;">💖 Romance Affection:</span>
                            <span style="color: #fda4af; font-weight: bold;">${member.affection}% (Rank ${member.romanceRank || 'C'})</span>
                        </div>
                        <div class="trust-bar" style="background: rgba(244, 63, 94, 0.2);">
                            <div class="trust-fill" style="width: ${member.affection}%; background: linear-gradient(90deg, #f43f5e, #fb7185);"></div>
                        </div>
                        <button type="button" class="romance-date-btn" data-kunoichi="${key}" style="margin-top: 0.45rem; width: 100%; background: linear-gradient(135deg, #f43f5e, #be123c); border: 1px solid #fda4af; color: #fff; font-size: 0.72rem; padding: 0.35rem 0.5rem; border-radius: 4px; cursor: pointer; font-family: var(--font-mono); font-weight: bold; display: flex; justify-content: center; align-items: center; gap: 0.35rem; transition: transform 0.15s ease;">
                            <span>💖</span> <span>DATE / SPEND TIME</span>
                        </button>
                    ` : ''}
                    ${member.rivalry ? `
                        <div style="font-size: 0.7rem; color: #fbbf24; margin-top: 4px; display: flex; justify-content: space-between;">
                            <span>⚔️ Rivalry: <strong>${member.rivalry}</strong></span>
                            <span>Jealousy: ${member.jealousy || 0}%</span>
                        </div>
                    ` : ''}
                `;
                this.teamContainerEl.appendChild(card);
            }

            // Bind Romance Date Buttons
            const dateBtns = this.teamContainerEl.querySelectorAll('.romance-date-btn');
            dateBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const kunoichiKey = btn.dataset.kunoichi;
                    const res = this.state.triggerRomanceDate(kunoichiKey);
                    if (res && res.success && res.event) {
                        const ev = res.event;
                        if (this.romanceModalTitleEl) this.romanceModalTitleEl.textContent = ev.title;
                        if (this.romanceModalAvatarEl) this.romanceModalAvatarEl.textContent = this.state.character.party[kunoichiKey].avatar || '💖';
                        if (this.romanceModalDialogueEl) this.romanceModalDialogueEl.textContent = ev.dialogue;
                        if (this.romanceModalRewardEl) this.romanceModalRewardEl.textContent = `🎁 REWARD: ${ev.rewardText}`;
                        if (this.romanceModalEl) this.romanceModalEl.style.display = 'flex';
                        this.audio.playBellJingle();
                        this.renderCharacterPanel();
                        this.renderTeamPanel();
                        this.showToast(`💖 Support Event Cleared with ${ev.kunoichiName}!`);
                    }
                });
            });
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
        let node = this.campaign.chapters.find(c => c.id === this.currentNode);
        if (!node) {
            console.warn(`Chapter '${this.currentNode}' not found! Transitioning forward.`);
            node = this.campaign.chapters.find(c => c.id === 'ch3_teamwork_revelation') || this.campaign.chapters[0];
            this.currentNode = node.id;
        }

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
                const isDynamic = this.state.savedNarrative && this.state.savedNarrative === textToSpeak;
                this.audio.speak(textToSpeak, { nodeId: isDynamic ? null : node.id, audio: isDynamic ? null : node.audio });
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
                let target = success ? (opt.successNode || opt.nextNode) : (opt.failNode || opt.nextNode);
                if (!this.campaign.chapters.some(c => c.id === target)) {
                    console.warn(`Target chapter '${target}' not found, advancing forward to ch3_teamwork_revelation.`);
                    target = 'ch3_teamwork_revelation';
                }
                if (success) {
                    this.state.addExperience(25);
                    this.audio.playKunaiClash();
                }
                this.state.saveCurrentLocation(target, null, null);
                this.currentNode = target;
                this.renderAll();
            });
            return;
        }

        // Direct advance
        let destination = opt.nextNode || opt.targetNode || this.currentNode;
        if (!this.campaign.chapters.some(c => c.id === destination)) {
            console.warn(`Target chapter '${destination}' not found, advancing forward to ch3_teamwork_revelation.`);
            destination = 'ch3_teamwork_revelation';
        }
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

    showToast(message) {
        if (!this.gameToastEl) return;
        this.gameToastEl.textContent = message;
        this.gameToastEl.classList.add('show');
        if (this.toastTimeout) clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => {
            if (this.gameToastEl) this.gameToastEl.classList.remove('show');
        }, 3200);
    }

    showDiceModal(roll, mod, total, dc, label, isSuccess, callback) {
        if (!this.diceModalEl) {
            if (callback) callback();
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

        if (this.diceTimeout) clearTimeout(this.diceTimeout);
        this.diceTimeout = setTimeout(() => {
            this.diceModalEl.style.display = 'none';
            if (callback) callback();
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
