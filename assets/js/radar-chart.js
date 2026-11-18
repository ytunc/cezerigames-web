/**
 * MultiMind Intelligence Radar Chart Component
 * Direct port of Unity's RadarChartGraphic.cs and IntelligenceRadarBadgeUI.cs
 * Features:
 * - 8-Axis concentric octagonal grid (25%, 50%, 75%, 100%)
 * - 8 Outer badges with authentic in-game icons and theme colors
 * - Elastic spring tweening on profile morphing
 * - Vertex dots with pulsing effects
 * - 6-Language support (TR, EN, DE, FR, ES, PT)
 */

(function (window) {
  'use strict';

  const RADAR_INTELLIGENCES = [
    {
      id: "spatial",
      index: 0,
      angleDeg: 90,
      color: "#34495E",
      glowColor: "rgba(52, 73, 94, 0.6)",
      icon: "Spatial.png",
      names: {
        tr: "Mekânsal",
        en: "Spatial",
        de: "Räumlich",
        fr: "Spatial",
        es: "Espacial",
        pt: "Espacial"
      }
    },
    {
      id: "kinesthetic",
      index: 1,
      angleDeg: 45,
      color: "#8E44AD",
      glowColor: "rgba(142, 68, 173, 0.6)",
      icon: "Kinesthetic.png",
      names: {
        tr: "Kinestetik",
        en: "Kinesthetic",
        de: "Kinästhetisch",
        fr: "Kinesthésique",
        es: "Cinestésica",
        pt: "Cinestésica"
      }
    },
    {
      id: "musical",
      index: 2,
      angleDeg: 0,
      color: "#00B894",
      glowColor: "rgba(0, 184, 148, 0.6)",
      icon: "Musical.png",
      names: {
        tr: "Müziksel",
        en: "Musical",
        de: "Musikalisch",
        fr: "Musical",
        es: "Musical",
        pt: "Musical"
      }
    },
    {
      id: "verbal",
      index: 3,
      angleDeg: -45,
      color: "#E84393",
      glowColor: "rgba(232, 67, 147, 0.6)",
      icon: "Verbal.png",
      names: {
        tr: "Sözel",
        en: "Verbal",
        de: "Sprachlich",
        fr: "Verbal",
        es: "Verbal",
        pt: "Verbal"
      }
    },
    {
      id: "inner",
      index: 4,
      angleDeg: -90,
      color: "#FA8231",
      glowColor: "rgba(250, 130, 49, 0.6)",
      icon: "Inner.png",
      names: {
        tr: "İçsel",
        en: "Intrapersonal",
        de: "Intrapersonell",
        fr: "Intrapersonnel",
        es: "Intrapersonal",
        pt: "Intrapessoal"
      }
    },
    {
      id: "social",
      index: 5,
      angleDeg: -135,
      color: "#27AE60",
      glowColor: "rgba(39, 174, 96, 0.6)",
      icon: "Social.png",
      names: {
        tr: "Sosyal",
        en: "Interpersonal",
        de: "Interpersonell",
        fr: "Interpersonnel",
        es: "Interpersonal",
        pt: "Interpessoal"
      }
    },
    {
      id: "mathematical",
      index: 6,
      angleDeg: 180,
      color: "#2471A3",
      glowColor: "rgba(36, 113, 163, 0.6)",
      icon: "Mathematical.png",
      names: {
        tr: "Matematiksel",
        en: "Mathematical",
        de: "Mathematisch",
        fr: "Mathématique",
        es: "Matemática",
        pt: "Matemática"
      }
    },
    {
      id: "natural",
      index: 7,
      angleDeg: 135,
      color: "#9B2226",
      glowColor: "rgba(155, 34, 38, 0.6)",
      icon: "Natural.png",
      names: {
        tr: "Doğal",
        en: "Naturalist",
        de: "Naturalistisch",
        fr: "Naturaliste",
        es: "Naturalista",
        pt: "Naturalista"
      }
    }
  ];

  // 5 Canonical Archetype Profiles
  // Ordered by 8 axes: [spatial, kinesthetic, musical, verbal, inner, social, mathematical, natural]
  const RADAR_PROFILES = [
    {
      id: "can",
      names: { tr: "Can", en: "Leo", de: "Lukas", fr: "Léo", es: "Mateo", pt: "Lucas" },
      dominantTr: "Mantıksal & Mekânsal",
      dominantEn: "Mathematical & Spatial",
      dominantDe: "Mathematisch & Räumlich",
      dominantFr: "Mathématique & Spatial",
      dominantEs: "Matemático & Espacial",
      dominantPt: "Matemático & Espacial",
      scores: [0.88, 0.60, 0.55, 0.65, 0.70, 0.60, 0.95, 0.75]
    },
    {
      id: "zeynep",
      names: { tr: "Zeynep", en: "Sophia", de: "Mia", fr: "Camille", es: "Sofía", pt: "Sofia" },
      dominantTr: "Sözel & Sosyal",
      dominantEn: "Verbal & Interpersonal",
      dominantDe: "Sprachlich & Sozial",
      dominantFr: "Verbal & Social",
      dominantEs: "Verbal & Social",
      dominantPt: "Verbal & Social",
      scores: [0.60, 0.65, 0.75, 0.95, 0.80, 0.90, 0.55, 0.70]
    },
    {
      id: "ali",
      names: { tr: "Ali", en: "Lucas", de: "Finn", fr: "Jules", es: "Liam", pt: "Enzo" },
      dominantTr: "Kinestetik & Mekânsal",
      dominantEn: "Kinesthetic & Spatial",
      dominantDe: "Kinästhetisch & Räumlich",
      dominantFr: "Kinesthésique & Spatial",
      dominantEs: "Cinestésico & Espacial",
      dominantPt: "Cinestésico & Espacial",
      scores: [0.85, 0.95, 0.60, 0.50, 0.55, 0.70, 0.65, 0.80]
    },
    {
      id: "elif",
      names: { tr: "Elif", en: "Maya", de: "Emma", fr: "Inès", es: "Lucía", pt: "Clara" },
      dominantTr: "Müziksel & İçsel",
      dominantEn: "Musical & Intrapersonal",
      dominantDe: "Musikalisch & Introspektiv",
      dominantFr: "Musical & Introspectif",
      dominantEs: "Musical & Intrapersonal",
      dominantPt: "Musical & Intrapessoal",
      scores: [0.65, 0.70, 0.95, 0.75, 0.90, 0.60, 0.55, 0.70]
    },
    {
      id: "mert",
      names: { tr: "Mert", en: "Noah", de: "Jonas", fr: "Gabriel", es: "Diego", pt: "Gabriel" },
      dominantTr: "Doğal & Mantıksal",
      dominantEn: "Naturalist & Logical",
      dominantDe: "Natur & Logik",
      dominantFr: "Naturaliste & Logique",
      dominantEs: "Naturalista & Lógico",
      dominantPt: "Naturalista & Lógico",
      scores: [0.80, 0.70, 0.55, 0.60, 0.65, 0.75, 0.85, 0.95]
    }
  ];

  class IntelligenceRadar {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.getElementById(container) : container;
      if (!this.container) return;

      this.options = Object.assign({
        size: 640,
        center: 320,
        radius: 175,
        badgeRadius: 245,
        iconBasePath: '/assets/images/radar/',
        lang: 'tr',
        theme: 'dark', // 'dark' (navy blue web) or 'light' (clean white card as in game)
        initialProfileIndex: 0,
        showProfileTabs: true,
        interactive: true
      }, options);

      // Normalize icon base path relative to current document location if needed
      if (!this.options.iconBasePath.startsWith('http') && !this.options.iconBasePath.startsWith('/')) {
        // use provided
      } else if (window.location.pathname.includes('/blog/') || window.location.pathname.includes('/games/')) {
        const depth = window.location.pathname.split('/').filter(Boolean).length;
        if (depth === 2) this.options.iconBasePath = '../assets/images/radar/';
        else if (depth >= 3) this.options.iconBasePath = '../../assets/images/radar/';
      }

      this.currentLang = (this.options.lang || 'tr').toLowerCase();
      if (this.currentLang === 'pr') this.currentLang = 'pt';

      this.currentScores = RADAR_PROFILES[this.options.initialProfileIndex].scores.slice();
      this.targetScores = this.currentScores.slice();
      this.animScores = this.currentScores.slice();

      this.activeProfileIdx = this.options.initialProfileIndex;
      this.isAnimating = false;
      this.animStartTime = null;
      this.animStartScores = null;

      this.init();
    }

    setLanguage(lang) {
      if (!lang) return;
      lang = lang.toLowerCase();
      if (lang === 'pr') lang = 'pt';
      this.currentLang = lang;
      this.updateLabels();
    }

    setScores(newScores, duration = 800) {
      if (!newScores || newScores.length < 8) return;
      this.animStartScores = this.animScores.slice();
      this.targetScores = newScores.slice();
      this.animDuration = duration;
      this.animStartTime = performance.now();

      if (!this.isAnimating) {
        this.isAnimating = true;
        requestAnimationFrame((t) => this.animateFrame(t));
      }
    }

    selectProfile(profileIdx, animate = true) {
      if (profileIdx < 0 || profileIdx >= RADAR_PROFILES.length) return;
      this.activeProfileIdx = profileIdx;
      const profile = RADAR_PROFILES[profileIdx];

      // Update tabs if present
      if (this.tabsContainer) {
        this.tabsContainer.querySelectorAll('.radar-tab-btn').forEach((btn, idx) => {
          if (idx === profileIdx) {
            btn.classList.add('radar-tab-active', 'bg-cyan-500/25', 'text-cyan-300', 'border-cyan-400');
            btn.classList.remove('bg-slate-800/60', 'text-slate-300', 'border-slate-700/50');
          } else {
            btn.classList.remove('radar-tab-active', 'bg-cyan-500/25', 'text-cyan-300', 'border-cyan-400');
            btn.classList.add('bg-slate-800/60', 'text-slate-300', 'border-slate-700/50');
          }
        });
      }

      if (animate) {
        this.setScores(profile.scores, 750);
      } else {
        this.animScores = profile.scores.slice();
        this.currentScores = profile.scores.slice();
        this.targetScores = profile.scores.slice();
        this.renderPolygon();
      }

      // Dispatch event for external parent card updates
      const event = new CustomEvent('radarProfileChanged', {
        detail: {
          profileIdx: profileIdx,
          profile: profile,
          scores: profile.scores
        }
      });
      this.container.dispatchEvent(event);
    }

    easeOutBack(x) {
      const c1 = 1.4;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    }

    animateFrame(now) {
      const elapsed = now - this.animStartTime;
      const progress = Math.min(elapsed / this.animDuration, 1.0);
      const eased = this.easeOutBack(progress);

      for (let i = 0; i < 8; i++) {
        const start = this.animStartScores[i];
        const target = this.targetScores[i];
        this.animScores[i] = start + (target - start) * eased;
      }

      this.renderPolygon();

      if (progress < 1.0) {
        requestAnimationFrame((t) => this.animateFrame(t));
      } else {
        this.animScores = this.targetScores.slice();
        this.renderPolygon();
        this.isAnimating = false;
      }
    }

    getAxisCoord(index, radius) {
      const deg = 90 - index * 45;
      const rad = (deg * Math.PI) / 180;
      const x = this.options.center + radius * Math.cos(rad);
      const y = this.options.center - radius * Math.sin(rad);
      return { x, y, deg, rad };
    }

    init() {
      this.container.innerHTML = '';
      this.wrapper = document.createElement('div');
      this.wrapper.className = 'intelligence-radar-wrapper relative select-none flex flex-col items-center justify-center w-full';

      // Optional Profile Tabs on top
      if (this.options.showProfileTabs) {
        this.tabsContainer = document.createElement('div');
        this.tabsContainer.className = 'radar-tabs-nav flex flex-wrap justify-center gap-2 mb-6 w-full max-w-xl';
        RADAR_PROFILES.forEach((prof, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `radar-tab-btn px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold border transition-all duration-300 cursor-pointer ${
            idx === this.activeProfileIdx
              ? 'radar-tab-active bg-cyan-500/25 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.25)]'
              : 'bg-slate-800/60 text-slate-300 border-slate-700/50 hover:bg-slate-700/60'
          }`;
          btn.textContent = prof.names[this.currentLang] || prof.names.tr;
          btn.addEventListener('click', () => this.selectProfile(idx, true));
          this.tabsContainer.appendChild(btn);
        });
        this.wrapper.appendChild(this.tabsContainer);
      }

      // SVG Chart Container
      const chartBox = document.createElement('div');
      chartBox.className = 'relative flex items-center justify-center w-full max-w-[560px] aspect-square mx-auto';

      this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      this.svg.setAttribute('viewBox', `0 0 ${this.options.size} ${this.options.size}`);
      this.svg.setAttribute('class', 'w-full h-full drop-shadow-xl overflow-visible');

      // Defs (Gradients & Filters)
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      defs.innerHTML = `
        <radialGradient id="radarRadialGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.55" />
          <stop offset="60%" stop-color="#818cf8" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#ec4899" stop-opacity="0.25" />
        </radialGradient>
        <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      `;
      this.svg.appendChild(defs);

      // 1. Draw Concentric Octagonal Grid Rings (25%, 50%, 75%, 100%)
      const ringsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      ringsGroup.setAttribute('class', 'radar-grid-rings');
      [0.25, 0.50, 0.75, 1.0].forEach((ratio, ringIdx) => {
        const ringRadius = this.options.radius * ratio;
        const pts = [];
        for (let i = 0; i < 8; i++) {
          const pt = this.getAxisCoord(i, ringRadius);
          pts.push(`${pt.x.toFixed(1)},${pt.y.toFixed(1)}`);
        }
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', pts.join(' '));
        polygon.setAttribute('fill', ringIdx % 2 === 0 ? 'rgba(14, 165, 233, 0.04)' : 'rgba(255, 255, 255, 0.015)');
        polygon.setAttribute('stroke', 'rgba(148, 163, 184, 0.28)');
        polygon.setAttribute('stroke-width', ringIdx === 3 ? '2.0' : '1.2');
        polygon.setAttribute('stroke-dasharray', ringIdx === 3 ? 'none' : '4 3');
        ringsGroup.appendChild(polygon);
      });
      this.svg.appendChild(ringsGroup);

      // 2. Draw Radial Axis Lines (Center to 100% Radius)
      const axesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      axesGroup.setAttribute('class', 'radar-axes');
      for (let i = 0; i < 8; i++) {
        const endPt = this.getAxisCoord(i, this.options.radius);
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', this.options.center);
        line.setAttribute('y1', this.options.center);
        line.setAttribute('x2', endPt.x.toFixed(1));
        line.setAttribute('y2', endPt.y.toFixed(1));
        line.setAttribute('stroke', 'rgba(148, 163, 184, 0.35)');
        line.setAttribute('stroke-width', '1.5');
        axesGroup.appendChild(line);
      }
      this.svg.appendChild(axesGroup);

      // 3. Dynamic Data Polygon
      this.polygonEl = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
      this.polygonEl.setAttribute('fill', 'url(#radarRadialGlow)');
      this.polygonEl.setAttribute('stroke', '#38bdf8');
      this.polygonEl.setAttribute('stroke-width', '3');
      this.polygonEl.setAttribute('stroke-linejoin', 'round');
      this.polygonEl.setAttribute('filter', 'url(#radarGlow)');
      this.svg.appendChild(this.polygonEl);

      // 4. Vertex Dots (Glow Circles)
      this.vertexDotsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      this.vertexDotsGroup.setAttribute('class', 'radar-vertex-dots');
      this.vertexDots = [];
      for (let i = 0; i < 8; i++) {
        const intel = RADAR_INTELLIGENCES[i];
        const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        dot.setAttribute('r', '6');
        dot.setAttribute('fill', intel.color);
        dot.setAttribute('stroke', '#ffffff');
        dot.setAttribute('stroke-width', '2.5');
        dot.setAttribute('class', 'transition-transform duration-150');
        this.vertexDotsGroup.appendChild(dot);
        this.vertexDots.push(dot);
      }
      this.svg.appendChild(this.vertexDotsGroup);

      // 5. Outer Badges Group (HTML Elements overlaid for crispness)
      this.badgesContainer = document.createElement('div');
      this.badgesContainer.className = 'radar-badges-overlay absolute inset-0 pointer-events-auto';

      this.badgeElements = [];
      for (let i = 0; i < 8; i++) {
        const intel = RADAR_INTELLIGENCES[i];
        const coord = this.getAxisCoord(i, this.options.badgeRadius);

        // Percentage position inside chartBox
        const pctX = (coord.x / this.options.size) * 100;
        const pctY = (coord.y / this.options.size) * 100;

        const badgeWrapper = document.createElement('div');
        badgeWrapper.className = 'absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform duration-200 hover:scale-110';
        badgeWrapper.style.left = `${pctX.toFixed(2)}%`;
        badgeWrapper.style.top = `${pctY.toFixed(2)}%`;

        badgeWrapper.innerHTML = `
          <div class="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center p-1.5 shadow-lg border-2 transition-all duration-300"
               style="background-color: ${intel.color}; border-color: ${intel.color}; box-shadow: 0 4px 14px ${intel.glowColor};">
            <img src="${this.options.iconBasePath}${intel.icon}" alt="${intel.id}" class="w-full h-full object-contain filter drop-shadow brightness-110">
          </div>
          <span class="badge-title mt-1.5 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold text-white tracking-wide shadow-md whitespace-nowrap"
                style="background-color: rgba(15, 23, 42, 0.85); border: 1px solid ${intel.color}; color: #f8fafc;">
            ${intel.names[this.currentLang] || intel.names.tr}
          </span>
          <span class="badge-score mt-0.5 text-[10px] font-extrabold text-cyan-300 opacity-90">
            %${Math.round(this.currentScores[i] * 100)}
          </span>
        `;

        badgeWrapper.addEventListener('click', () => {
          // Highlight axis or pulse
          badgeWrapper.classList.add('scale-125');
          setTimeout(() => badgeWrapper.classList.remove('scale-125'), 300);
        });

        this.badgesContainer.appendChild(badgeWrapper);
        this.badgeElements.push(badgeWrapper);
      }

      chartBox.appendChild(this.svg);
      chartBox.appendChild(this.badgesContainer);
      this.wrapper.appendChild(chartBox);
      this.container.appendChild(this.wrapper);

      // Initial render
      this.renderPolygon();
    }

    renderPolygon() {
      const pts = [];
      for (let i = 0; i < 8; i++) {
        const val = Math.max(0.18, Math.min(1.0, this.animScores[i])); // visual clamp
        const radius = this.options.radius * val;
        const pt = this.getAxisCoord(i, radius);
        pts.push(`${pt.x.toFixed(1)},${pt.y.toFixed(1)}`);

        if (this.vertexDots && this.vertexDots[i]) {
          this.vertexDots[i].setAttribute('cx', pt.x.toFixed(1));
          this.vertexDots[i].setAttribute('cy', pt.y.toFixed(1));
        }

        if (this.badgeElements && this.badgeElements[i]) {
          const scoreEl = this.badgeElements[i].querySelector('.badge-score');
          if (scoreEl) {
            scoreEl.textContent = `%${Math.round(this.animScores[i] * 100)}`;
          }
        }
      }
      if (this.polygonEl) {
        this.polygonEl.setAttribute('points', pts.join(' '));
      }
    }

    updateLabels() {
      if (this.tabsContainer) {
        this.tabsContainer.querySelectorAll('.radar-tab-btn').forEach((btn, idx) => {
          const prof = RADAR_PROFILES[idx];
          btn.textContent = prof.names[this.currentLang] || prof.names.tr;
        });
      }

      if (this.badgeElements) {
        this.badgeElements.forEach((badge, i) => {
          const intel = RADAR_INTELLIGENCES[i];
          const titleEl = badge.querySelector('.badge-title');
          if (titleEl) {
            titleEl.textContent = intel.names[this.currentLang] || intel.names.tr;
          }
        });
      }
    }
  }

  // Export to window
  window.IntelligenceRadar = IntelligenceRadar;
  window.RADAR_INTELLIGENCES = RADAR_INTELLIGENCES;
  window.RADAR_PROFILES = RADAR_PROFILES;

})(window);
