/* ==========================================================================
   Excellence Car Film & Auto Center - JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '5521967804794';

  // 1. Live Opening Hours Status Indicator
  const updateStoreStatus = () => {
    const statusBadge = document.getElementById('live-status');
    const statusText = document.getElementById('status-text');

    if (!statusBadge || !statusText) return;

    const now = new Date();
    const day = now.getDay(); // 0 = Dom, 1 = Seg, ..., 6 = Sab
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hour + minutes / 60;

    let isOpen = false;
    let closesAt = '';

    if (day >= 1 && day <= 5) {
      // Seg a Sex: 08:00 às 18:00
      if (currentTime >= 8 && currentTime < 18) {
        isOpen = true;
        closesAt = '18h';
      }
    } else if (day === 6) {
      // Sábado: 08:00 às 17:00
      if (currentTime >= 8 && currentTime < 17) {
        isOpen = true;
        closesAt = '17h';
      }
    }

    if (isOpen) {
      statusBadge.classList.remove('closed');
      statusText.textContent = `Aberto agora (fecha às ${closesAt})`;
    } else {
      statusBadge.classList.add('closed');
      if (day === 0) {
        statusText.textContent = 'Fechado hoje (abre seg às 08h)';
      } else if (currentTime < 8) {
        statusText.textContent = 'Fechado agora (abre hoje às 08h)';
      } else {
        const nextDay = day === 6 ? 'segunda às 08h' : 'amanhã às 08h';
        statusText.textContent = `Fechado agora (abre ${nextDay})`;
      }
    }
  };
  updateStoreStatus();

  // 2. Rim Filter (Aros de Pneus)
  const rimButtons = document.querySelectorAll('.hud-filter-btn');
  const tireCards = document.querySelectorAll('.cyber-tire-card');

  rimButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      rimButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedRim = btn.getAttribute('data-rim');

      tireCards.forEach(card => {
        const cardRim = card.getAttribute('data-rim');
        if (selectedRim === 'all' || cardRim === selectedRim) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 3. Quick Measure / Vehicle Consultation Box
  const btnQuickConsult = document.getElementById('btn-quick-consult');
  const inputQuickTire = document.getElementById('quick-tire-car');

  if (btnQuickConsult && inputQuickTire) {
    const handleQuickConsult = () => {
      const vehicle = inputQuickTire.value.trim();
      let message = 'Olá! Gostaria de consultar os preços e marcas de pneus disponíveis na Excellence Auto Center.';
      if (vehicle) {
        message = `Olá! Gostaria de consultar as opções de pneus, marcas e valores para o seguinte veículo: *${vehicle}*.`;
      }
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    };

    btnQuickConsult.addEventListener('click', handleQuickConsult);
    inputQuickTire.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleQuickConsult();
    });
  }

  // 4. Interactive Service Package Builder (Simulador)
  const btnSendSimulador = document.getElementById('btn-send-simulador');
  const inputSimCar = document.getElementById('sim-car');

  if (btnSendSimulador) {
    btnSendSimulador.addEventListener('click', () => {
      const carModel = inputSimCar ? inputSimCar.value.trim() : '';
      const checkedBoxes = document.querySelectorAll('input[name="services"]:checked');

      if (checkedBoxes.length === 0 && !carModel) {
        alert('Por favor, informe seu veículo ou marque pelo menos um serviço que deseja cotar!');
        if (inputSimCar) inputSimCar.focus();
        return;
      }

      let msg = '👋 Olá, Excellence Auto Center! Gostaria de um orçamento personalizado:\n\n';

      if (carModel) {
        msg += `🚗 *Veículo:* ${carModel}\n`;
      }

      if (checkedBoxes.length > 0) {
        msg += `🔧 *Serviços / Produtos Solicitados:*\n`;
        checkedBoxes.forEach(box => {
          msg += ` • ${box.value}\n`;
        });
      }

      msg += '\nPoderiam me passar valores, disponibilidade e formas de pagamento? Obrigado!';

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    });
  }

  // 5. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerItems = document.querySelectorAll('.drawer-item');

  const openDrawer = () => {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerItems.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 6. Header Glow Shadow on Scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(229, 37, 42, 0.15)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // 7. Active Navigation Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // 8. Laser Alignment Sound Synthesizer (Web Audio API)
  class LaserAlignmentAudio {
    constructor() {
      this.ctx = null;
      this.isPlaying = false;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playServo(t, dur = 0.35) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(1300, t + dur);
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.12, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + dur);
    }

    playLaserPulse(t, freqStart = 2400, freqEnd = 380, dur = 0.14) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freqStart, t);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, t + dur);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3200, t);
      filter.frequency.exponentialRampToValueAtTime(600, t + dur);
      filter.Q.value = 6;

      gain.gain.setValueAtTime(0.16, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + dur);
    }

    playLockBeep(t, freq = 1760, dur = 0.07) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + dur);
    }

    playSuccessChime(t) {
      const notes = [659.25, 830.61, 987.77, 1318.51];
      notes.forEach((freq, idx) => {
        const time = t + (idx * 0.07);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.12, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(time);
        osc.stop(time + 0.65);
      });
    }

    runCalibrationSequence(onStep, onDone) {
      this.init();
      if (this.isPlaying) return;
      this.isPlaying = true;

      const now = this.ctx.currentTime + 0.05;

      // 1. Servo Power Up
      this.playServo(now, 0.4);

      // 2. Optical Laser Scan Pulses (FL, FR, RL, RR)
      const scanDelays = [0.45, 0.8, 1.15, 1.5];
      scanDelays.forEach(d => {
        this.playLaserPulse(now + d, 2600, 320, 0.15);
      });

      // 3. Sensor Target Locks (Beeps)
      this.playLockBeep(now + 1.85, 1760, 0.08);
      this.playLockBeep(now + 2.0, 1975, 0.08);

      // 4. Success Completion Chime
      this.playSuccessChime(now + 2.2);

      // UI Timers
      if (onStep) {
        onStep('Iniciando sensores óticos a laser...', 0);
        setTimeout(() => onStep('Escaneando alinhamento dianteiro (FL / FR)...', 1), 450);
        setTimeout(() => onStep('Aferindo câmber e cáster traseiro (RL / RR)...', 2), 1150);
        setTimeout(() => onStep('Travando alvos óticos milimétricos...', 3), 1850);
        setTimeout(() => onStep('✅ 100% Calibrado a Laser! Tolerância 0.00°', 4), 2200);
      }

      setTimeout(() => {
        this.isPlaying = false;
        if (onDone) onDone();
      }, 3100);
    }
  }

  const laserAudio = new LaserAlignmentAudio();
  const btnPlayLaser = document.getElementById('btn-play-laser');
  const laserStatusMsg = document.getElementById('laser-status-msg');
  const laserAudioContainer = document.querySelector('.laser-audio-controller');
  const carLaserSim = document.querySelector('.car-laser-simulation');
  const hudLaserDisplay = document.querySelector('.hud-laser-display');
  const laserBtnText = document.getElementById('laser-btn-text');

  // Pre-unlock AudioContext on first user interaction anywhere on the page
  const unlockAudio = () => {
    laserAudio.init();
    ['click', 'pointerdown', 'keydown', 'touchstart'].forEach(evt => {
      window.removeEventListener(evt, unlockAudio);
    });
  };
  ['click', 'pointerdown', 'keydown', 'touchstart'].forEach(evt => {
    window.addEventListener(evt, unlockAudio, { passive: true });
  });

  let lastTriggerTime = 0;
  const triggerLaserSequence = () => {
    const now = Date.now();
    // Cooldown of 3.5s to allow full sequence to play without overlapping
    if (laserAudio.isPlaying || (now - lastTriggerTime < 3500)) return;
    lastTriggerTime = now;

    laserAudio.init();

    if (btnPlayLaser) btnPlayLaser.classList.add('active');
    if (laserAudioContainer) laserAudioContainer.classList.add('playing');
    if (carLaserSim) carLaserSim.classList.add('scanning-active');
    if (laserBtnText) laserBtnText.textContent = 'Calibrando a Laser...';

    laserAudio.runCalibrationSequence(
      (msg) => {
        if (laserStatusMsg) laserStatusMsg.textContent = msg;
      },
      () => {
        if (btnPlayLaser) btnPlayLaser.classList.remove('active');
        if (laserAudioContainer) laserAudioContainer.classList.remove('playing');
        if (carLaserSim) carLaserSim.classList.remove('scanning-active');
        if (laserBtnText) laserBtnText.textContent = 'Passe o mouse para ouvir o Laser';
        if (laserStatusMsg) laserStatusMsg.textContent = 'Alinhamento concluído! Passe o mouse para ouvir novamente.';
      }
    );
  };

  // Trigger on click
  if (btnPlayLaser) {
    btnPlayLaser.addEventListener('click', triggerLaserSequence);
  }

  // Trigger on hover (mouseenter) over the laser simulation card or display
  if (carLaserSim) {
    carLaserSim.addEventListener('mouseenter', triggerLaserSequence);
  }
  if (hudLaserDisplay) {
    hudLaserDisplay.addEventListener('mouseenter', triggerLaserSequence);
  }
});
