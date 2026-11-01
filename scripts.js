/**
 * Farooq Mohammed Shafeeq & Aysha Shalofa – Nikah Invitation
 * Interactive Script
 * Exact match to Invytor Mughal Arch reference architecture
 */

document.addEventListener('DOMContentLoaded', () => {
  // Target Nikah Date: Thursday, 10 December 2026, 19:00:00 IST (UTC+05:30)
  const TARGET_DATE = new Date('2026-12-10T19:00:00+05:30');

  // DOM Elements
  const envelopeScreen = document.getElementById('envelope-screen');
  const envelopeStage = document.querySelector('.envelope-stage');
  const mainInvitation = document.getElementById('main-invitation');
  const bgAudio = document.getElementById('bg-audio');
  const audioToggle = document.getElementById('audio-toggle');
  const petalsLayer = document.getElementById('petals-layer');
  const butterfliesLayer = document.getElementById('butterflies-layer');
  const calendarToggle = document.getElementById('calendar-toggle');
  const calendarDropdown = document.getElementById('calendar-dropdown');
  const downloadIcsBtn = document.getElementById('download-ics-btn');

  // State Variables
  let isEnvelopeOpen = false;
  let isAudioPlaying = false;
  let countdownRolled = false;

  // ==========================================================================
  // 1. BACKGROUND AUDIO CONTROLLER
  // ==========================================================================
  function playAudio() {
    if (!bgAudio) return;
    bgAudio.volume = 0;
    const promise = bgAudio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          isAudioPlaying = true;
          if (audioToggle) audioToggle.classList.add('is-playing');
          // Smooth volume fade-in up to 0.75
          let vol = 0;
          const fadeTimer = setInterval(() => {
            if (vol < 0.75) {
              vol = Math.min(0.75, vol + 0.05);
              bgAudio.volume = vol;
            } else {
              clearInterval(fadeTimer);
            }
          }, 70);
        })
        .catch(err => {
          console.log('Audio autoplay prevented:', err);
          isAudioPlaying = false;
          if (audioToggle) audioToggle.classList.remove('is-playing');
        });
    }
  }

  function pauseAudio() {
    if (!bgAudio) return;
    bgAudio.pause();
    isAudioPlaying = false;
    if (audioToggle) audioToggle.classList.remove('is-playing');
  }

  if (audioToggle) {
    audioToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isAudioPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });
  }

  // ==========================================================================
  // 2. ENVELOPE TAP-TO-OPEN INTERACTION
  // ==========================================================================
  function handleOpenEnvelope() {
    if (isEnvelopeOpen) return;
    isEnvelopeOpen = true;

    // Start background music immediately
    playAudio();

    // Trigger visual opening sequence on envelope
    if (envelopeStage) {
      envelopeStage.classList.add('is-opening');
    }

    // Step 1: Flap flips, wax seal breaks, inner card slides up (at 1340ms)
    setTimeout(() => {
      if (envelopeScreen) {
        envelopeScreen.classList.add('is-fading');
      }
      if (mainInvitation) {
        mainInvitation.classList.add('is-active');
      }
      // Initialize ambient particles
      initPetals();
      initButterflies();
      initScrollReveal();
    }, 1340);

    // Step 2: Remove envelope from DOM flow after crossfade finishes (2090ms)
    setTimeout(() => {
      if (envelopeScreen) {
        envelopeScreen.style.display = 'none';
      }
    }, 2090);
  }

  if (envelopeScreen) {
    envelopeScreen.addEventListener('click', handleOpenEnvelope);
    envelopeScreen.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleOpenEnvelope();
      }
    });
  }

  // ==========================================================================
  // 3. AMBIENT FALLING PASTEL PETALS (Matching Template Z component)
  // ==========================================================================
  function initPetals() {
    if (!petalsLayer) return;
    petalsLayer.innerHTML = '';

    const colors = ['#FFFFFF', '#B8C9A0', '#FDF6E3', '#D4E0C4', '#F5EDD0'];
    const petalCount = 24;

    for (let t = 0; t < petalCount; t++) {
      const left = (67 * t + 11) % 95 + 2;
      const dx = (11 * t + 7) % 44 * (t % 2 === 0 ? 1 : -1);
      const dr = (t % 2 === 0 ? 180 : -180) + (23 * t) % 140;
      const dur = 6.5 + (t % 6) * 0.7;
      const del = (0.55 * t) % 10;
      const w = 9 + (t % 4) * 3;
      const h = Math.round(1.6 * w);
      const color = colors[t % colors.length];

      const petal = document.createElement('div');
      petal.style.position = 'absolute';
      petal.style.left = `${left}%`;
      petal.style.top = '0';
      petal.style.width = `${w}px`;
      petal.style.height = `${h}px`;
      petal.style.setProperty('--dx', `${dx}px`);
      petal.style.setProperty('--dr', `${dr}deg`);
      petal.style.animation = `fa-fall ${dur}s ease-in ${del}s infinite`;
      petal.style.opacity = '0';
      petal.style.pointerEvents = 'none';

      petal.innerHTML = `
        <svg width="${w}" height="${h}" viewBox="0 0 20 32" fill="none">
          <path d="M 10 1 C 16 5, 18 13, 15 22 C 13 28, 10 32, 10 32 C 10 32, 7 28, 5 22 C 2 13, 4 5, 10 1 Z" fill="${color}" opacity="0.92"/>
          <path d="M 10 3 Q 10 15, 10 30" stroke="rgba(200,180,150,0.2)" stroke-width="0.6" fill="none"/>
        </svg>
      `;

      petalsLayer.appendChild(petal);
    }
  }

  // ==========================================================================
  // 4. AMBIENT FLYING BUTTERFLIES (Matching Template K component)
  // ==========================================================================
  function initButterflies() {
    if (!butterfliesLayer) return;
    butterfliesLayer.innerHTML = '';

    const configs = [
      { left: 8,  top: 18, kf: 'fa-bfly-0', dur: 26, del: 0 },
      { left: 74, top: 14, kf: 'fa-bfly-1', dur: 30, del: 5 },
      { left: 12, top: 64, kf: 'fa-bfly-2', dur: 23, del: 2.5 },
      { left: 70, top: 72, kf: 'fa-bfly-3', dur: 34, del: 8 }
    ];

    configs.forEach((cfg, t) => {
      const scale = 0.4 + (t % 3) * 0.07;
      const w = Math.round(40 * scale);
      const h = Math.round(28 * scale);
      const wingDur = 0.42 + 0.06 * t;
      const wingDel = 0.2 * t;
      const opacity = 0.92 + (t % 2) * 0.06;

      const bfly = document.createElement('div');
      bfly.style.position = 'absolute';
      bfly.style.left = `${cfg.left}%`;
      bfly.style.top = `${cfg.top}%`;
      bfly.style.opacity = `${opacity}`;
      bfly.style.animation = `${cfg.kf} ${cfg.dur}s ease-in-out ${cfg.del}s infinite`;
      bfly.style.willChange = 'transform';
      bfly.style.filter = 'drop-shadow(0 1px 4px rgba(168, 104, 32, 0.4))';
      bfly.style.pointerEvents = 'none';

      bfly.innerHTML = `
        <svg width="${w}" height="${h}" viewBox="0 0 40 28" fill="none">
          <g style="transform-box: fill-box; transform-origin: right center; animation: fa-bfly-wing ${wingDur}s ease-in-out ${wingDel}s infinite;">
            <path d="M20 13 C17 7, 9 2, 3 5 C-1 8, 2 14, 8 16 C13 18, 18 15, 20 13Z" fill="#FBE8BC" opacity="0.92"/>
            <path d="M20 15 C15 15, 6 18, 5 22 C4 25, 11 26, 16 23 C19 21, 20 18, 20 15Z" fill="#F5D090" opacity="0.80"/>
            <path d="M20 13 C15 9, 8 5, 5 8" stroke="#D4A050" stroke-width="0.5" fill="none" opacity="0.45"/>
            <path d="M20 15 C15 16, 9 20, 8 23" stroke="#D4A050" stroke-width="0.5" fill="none" opacity="0.45"/>
          </g>
          <g style="transform-box: fill-box; transform-origin: left center; animation: fa-bfly-wing ${wingDur}s ease-in-out ${(wingDel + 0.04).toFixed(2)}s infinite;">
            <path d="M20 13 C23 7, 31 2, 37 5 C41 8, 38 14, 32 16 C27 18, 22 15, 20 13Z" fill="#FBE8BC" opacity="0.92"/>
            <path d="M20 15 C25 15, 34 18, 35 22 C36 25, 29 26, 24 23 C21 21, 20 18, 20 15Z" fill="#F5D090" opacity="0.80"/>
            <path d="M20 13 C25 9, 32 5, 35 8" stroke="#D4A050" stroke-width="0.5" fill="none" opacity="0.45"/>
            <path d="M20 15 C25 16, 31 20, 32 23" stroke="#D4A050" stroke-width="0.5" fill="none" opacity="0.45"/>
          </g>
          <path d="M19 14.2 C19.5 12, 20.5 12, 21 14.2 C21 16, 19 16, 19 14.2 Z" fill="#A86820"/>
        </svg>
      `;

      butterfliesLayer.appendChild(bfly);
    });
  }

  // ==========================================================================
  // 5. COUNTDOWN TIMER WITH ROLLING NUMBER ANIMATION
  // ==========================================================================
  const countDays = document.getElementById('count-days');
  const countHours = document.getElementById('count-hours');
  const countMins = document.getElementById('count-mins');
  const countSecs = document.getElementById('count-secs');

  function getRemainingTime() {
    const diff = TARGET_DATE.getTime() - Date.now();
    if (diff <= 0) {
      return { d: 0, h: 0, m: 0, s: 0 };
    }
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000)
    };
  }

  function updateDisplay(vals) {
    if (countDays) countDays.textContent = String(vals.d).padStart(2, '0');
    if (countHours) countHours.textContent = String(vals.h).padStart(2, '0');
    if (countMins) countMins.textContent = String(vals.m).padStart(2, '0');
    if (countSecs) countSecs.textContent = String(vals.s).padStart(2, '0');
  }

  function rollCountdownEntrance() {
    if (countdownRolled) return;
    countdownRolled = true;

    const targetVals = getRemainingTime();
    const startTime = Date.now();
    const duration = 1200; // 1.2s smooth cubic ease-out roll

    function animateRoll() {
      const progress = Math.min((Date.now() - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      updateDisplay({
        d: Math.round(easeOut * targetVals.d),
        h: Math.round(easeOut * targetVals.h),
        m: Math.round(easeOut * targetVals.m),
        s: Math.round(easeOut * targetVals.s)
      });

      if (progress < 1) {
        requestAnimationFrame(animateRoll);
      } else {
        // Start live ticking
        setInterval(() => {
          const liveVals = getRemainingTime();
          updateDisplay(liveVals);
          if (countSecs) {
            countSecs.classList.remove('is-flipping');
            void countSecs.offsetWidth; // re-flow
            countSecs.classList.add('is-flipping');
          }
        }, 1000);
      }
    }

    requestAnimationFrame(animateRoll);
  }

  // ==========================================================================
  // 6. CALENDAR DROPDOWN & .ICS FILE GENERATION
  // ==========================================================================
  if (calendarToggle && calendarDropdown) {
    calendarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = calendarDropdown.classList.contains('is-open');
      if (isOpen) {
        calendarDropdown.classList.remove('is-open');
        calendarToggle.setAttribute('aria-expanded', 'false');
      } else {
        calendarDropdown.classList.add('is-open');
        calendarToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!calendarDropdown.contains(e.target) && !calendarToggle.contains(e.target)) {
        calendarDropdown.classList.remove('is-open');
        calendarToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  if (downloadIcsBtn) {
    downloadIcsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Farooq & Aysha//Nikah Invitation//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:shafeeq-shalofa-nikah-20261210@wedding',
        'DTSTAMP:20261031T180000Z',
        'DTSTART:20261210T133000Z', // 7:00 PM IST is 13:30 UTC
        'DTEND:20261210T170000Z',   // 10:30 PM IST is 17:00 UTC
        'SUMMARY:Nikah Ceremony — Farooq Mohammed Shafeeq & Aysha Shalofa',
        'DESCRIPTION:Join us to celebrate the Nikah of Farooq Mohammed Shafeeq with Aysha Shalofa.\\nNikah followed by Dinner.\\nDress Code: Soft Pastel Colours.',
        'LOCATION:Royal Garden Beach Resort\\, 16-91/4\\, Caico Beach Road\\, Mukkachery\\, Ullal\\, Mangaluru\\, Karnataka 575020\\, India',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.setAttribute('download', 'Farooq-Shafeeq-Aysha-Shalofa-Nikah.ics');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(url);

      if (calendarDropdown) {
        calendarDropdown.classList.remove('is-open');
      }
    });
  }

  // ==========================================================================
  // 7. SCROLL REVEAL OBSERVER
  // ==========================================================================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-item');
    const countdownSection = document.getElementById('countdown-section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Trigger countdown roll once countdown section comes into view
          if (countdownSection && (entry.target === countdownSection || countdownSection.contains(entry.target))) {
            rollCountdownEntrance();
          }
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }
});
