// =========================================================================
    // 1. TYPEWRITER HERO + ORBITING PILLARS + MOBILE MENU (REC-02)
    // =========================================================================
    const TYPE_PHRASES = [
      '14+ YEARS IN IT AND QA DELIVERY · LEADING A 5-PERSON QA TEAM',
      'SENIOR TEST ANALYST & DATA MIGRATION LEAD (MBIE)',
      'GLOBAL EXPERIENCE ACROSS 9 COUNTRIES (SAUDI ARABIA → NZ)',
      'PAYMENT GATEWAYS: QUICKPAY, WINDCAVE & DATACOM 3DS 2.0',
      'ACCESSIBILITY LEAD (WCAG 2.1 AA) & CLOUD MIGRATION'
    ];
    let phraseIdx = 0;
    let charIdx = TYPE_PHRASES[0].length;
    let isDeleting = true;
    const typeEl = document.getElementById('typewriterText');

    function tickTypewriter() {
      const current = TYPE_PHRASES[phraseIdx];
      if (isDeleting) {
        charIdx--;
        typeEl.textContent = current.substring(0, charIdx);
        if (charIdx === 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % TYPE_PHRASES.length;
          setTimeout(tickTypewriter, 250);
          return;
        }
        setTimeout(tickTypewriter, 22);
      } else {
        charIdx++;
        typeEl.textContent = current.substring(0, charIdx);
        if (charIdx === current.length) {
          isDeleting = true;
          setTimeout(tickTypewriter, 2200);
          return;
        }
        setTimeout(tickTypewriter, 42);
      }
    }
    setTimeout(tickTypewriter, 1800);

    // Orbiting 6 Pillars Click Handler
    document.querySelectorAll('.orbit-badge').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickTone(600);
        document.getElementById('pillarTitle').textContent = `PILLAR: ${btn.getAttribute('data-pillar')}`;
        document.getElementById('pillarText').textContent = btn.getAttribute('data-pillar-desc');
      });
    });

    // Mobile Menu Drawer Toggle (Fixes REC-02)
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const mobileMenuBtnLabel = document.getElementById('mobileMenuBtnLabel');
    if (mobileMenuBtn && mobileNavDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        const isOpen = !mobileNavDrawer.classList.contains('hidden');
        mobileNavDrawer.classList.toggle('hidden', isOpen);
        mobileMenuBtn.setAttribute('aria-expanded', String(!isOpen));
        mobileMenuBtnLabel.textContent = isOpen ? 'Menu ☰' : 'Close ✕';
      });
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileNavDrawer.classList.add('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtnLabel.textContent = 'Menu ☰';
        });
      });
    }

    // =========================================================================
    // 2. WEB AUDIO SYNTHESIZED PROJECTOR & UI CLICK SOUND
    // =========================================================================
    let soundEnabled = false;
    let audioCtx = null;

    function playClickTone(freq = 520) {
      if (!soundEnabled) return;
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.045, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.065);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.07);
      } catch (e) {}
    }

    const soundToggleBtn = document.getElementById('soundToggleBtn');
    const soundStatusText = document.getElementById('soundStatusText');
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.setAttribute('aria-pressed', String(soundEnabled));
      soundStatusText.textContent = soundEnabled ? 'FX On' : 'FX Off';
      soundStatusText.classList.toggle('text-teal-300', soundEnabled);
      if (soundEnabled) playClickTone(660);
    });

    // =========================================================================
    // 3. GLOBAL FOOTPRINT INTERACTIVE COUNTRY DATA (SAUDI -> 7 INTL -> NZ)
    // =========================================================================
    const COUNTRY_DATA = {
      'SAUDI ARABIA': {
        title: '🇸🇦 SAUDI ARABIA — CAREER START & INFRASTRUCTURE FOUNDATION',
        text: 'Career origin in enterprise systems engineering, network & server infrastructure, business/systems analysis, and ITIL service management before expanding across international hubs.'
      },
      'USA': {
        title: '🇺🇸 USA — INTERNATIONAL VENDOR & PLATFORM COLLABORATION',
        text: 'Primary QA & Test Lead liaison with US enterprise software development partners (including eDirect / Great Walks ERP & online reservation platform delivery).'
      },
      'UAE': {
        title: '🇦🇪 UNITED ARAB EMIRATES (DUBAI) — ENTERPRISE IT & QA DELIVERY',
        text: 'Delivered systems analysis, application testing, and enterprise technology consulting across regional commercial and enterprise programmes in the UAE.'
      },
      'EGYPT': {
        title: '🇪🇬 EGYPT — REGIONAL SYSTEMS & APPLICATION ASSURANCE',
        text: 'International project delivery, stakeholder coordination, and enterprise application validation across MENA technology initiatives.'
      },
      'QATAR': {
        title: '🇶🇦 QATAR — ENTERPRISE INFRASTRUCTURE & QA CONSULTING',
        text: 'Supported regional enterprise systems, UAT governance, and technology transformation workflows in Qatar.'
      },
      'OMAN': {
        title: '🇴🇲 OMAN — ENTERPRISE TECHNOLOGY & ASSURANCE DELIVERY',
        text: 'Cross-border IT consulting, systems verification, and operational readiness support across Gulf enterprise environments.'
      },
      'SINGAPORE': {
        title: '🇸🇬 SINGAPORE — APAC DIGITAL & ENTERPRISE CONNECTIVITY',
        text: 'APAC technology corridor engagement supporting high-availability digital platforms, API integrations, and regional delivery standards.'
      },
      'MALAYSIA': {
        title: '🇲🇾 MALAYSIA — ENTERPRISE IT & SYSTEMS CONSULTING',
        text: 'Hands-on systems engineering, data migration preparation, and application testing across Southeast Asian enterprise deployments.'
      },
      'NEW ZEALAND': {
        title: '🇳🇿 NEW ZEALAND — CAREER DESTINATION & HOME BASE (2016 – PRESENT)',
        text: 'Wellington, New Zealand: Senior Test Analyst, Data Migration Lead & QA Delivery Lead across MBIE, One NZ (NZDF, MSD, NZ Police), The Co-operative Bank, DOC, and Victoria University of Wellington.'
      }
    };

    function selectCountry(name) {
      const data = COUNTRY_DATA[name];
      if (!data) return;
      playClickTone(575);
      document.getElementById('countryDetailTitle').textContent = data.title;
      document.getElementById('countryDetailText').textContent = data.text;
    }

    document.querySelectorAll('.country-card-btn, .map-pin').forEach(el => {
      el.addEventListener('click', () => selectCountry(el.getAttribute('data-country')));
    });

    // =========================================================================
    // 4. 7-STAGE CAREER EVOLUTION SCRUBBER (SCREENSHOT 2 ALIGNED)
    // =========================================================================
    const ERAS = [
      {
        num: '01',
        status: 'STAGE 01 · APR 2012 – DEC 2014 · SYSTEMS',
        title: 'IT CONSULTING / <span class="text-sky-400">SYSTEMS ANALYSIS</span>',
        org: 'International Enterprise & Consulting Delivery (Saudi Arabia & Regional Hubs)',
        desc: 'Delivered foundational enterprise systems analysis, server/network administration, ITIL service management, and structured requirements documentation across international technology environments.',
        pills: ['Systems Analysis', 'ITIL Service Management', 'Infrastructure Engineering', 'Requirements Walkthroughs']
      },
      {
        num: '02',
        status: 'STAGE 02 · MAY 2015 – MAR 2016 · APPLICATIONS',
        title: 'TEST LEAD — <span class="text-sky-400">ENTERPRISE APPLICATIONS</span>',
        org: 'International Application QA & Data Migration Preparation',
        desc: 'Transitioned into dedicated Test Leadership—defining functional test plans, coordinating UAT cycles, and validating application upgrades and data migration readiness across international client sites.',
        pills: ['Test Planning', 'UAT Coordination', 'Application Assurance', 'Defect Governance']
      },
      {
        num: '03',
        status: 'STAGE 03 · JUN 2016 – JAN 2018 · APPLICATIONS',
        title: 'SENIOR APPLICATIONS <span class="text-sky-400">TEST ANALYST</span>',
        org: 'Victoria University of Wellington · Wellington, New Zealand',
        desc: 'Led functional, integration, regression, and SQL backend data validation for the mission-critical university web application supporting mandatory Single Data Return (SDR) statutory compliance submissions to the Tertiary Education Commission (TEC) and Ministry of Education (MoE).',
        pills: ['Single Data Return (SDR)', 'SQL Backend Validation', 'TEC & MoE Compliance', 'Enterprise Web Apps']
      },
      {
        num: '04',
        status: 'STAGE 04 · JAN 2018 – JAN 2019 · DIGITAL / PAYMENTS',
        title: 'TEST LEAD / <span class="text-sky-400">QA ANALYST &amp; RELEASE MANAGER</span>',
        org: 'Department of Conservation (DOC) — National Office · Wellington, NZ',
        desc: 'Primary Test Lead and QA liaison between DOC National Office and the US development vendor for the national Great Walks & Campsites booking platform—covering an underlying ERP-based enterprise application, payment gateway APIs, visitor centre POS hardware, and Cypress automation for a high-visibility launch attended by the Prime Minister of New Zealand.',
        pills: ['ERP Enterprise App', 'Visitor Centre POS', 'Payment Gateway APIs', 'Cypress E2E Automation']
      },
      {
        num: '05',
        status: 'STAGE 05 · JAN 2019 – AUG 2019 · DIGITAL BANKING',
        title: 'BANKING + <span class="text-sky-400">TELECOM TESTING (SNR QA / SCRUM MASTER)</span>',
        org: 'The Co-operative Bank · Wellington, New Zealand',
        desc: 'Led QA delivery across manual and automated testing cycles while serving concurrently as Acting Scrum Master for the digital onboarding transformation of mobile (iOS/Android) and web credit card and personal loan portals using Cypress, Selenium WebDriver, Postman, and REST Assured.',
        pills: ['Cypress & Selenium', 'Acting Scrum Master', 'Postman & REST Assured', 'Digital Lending Portals']
      },
      {
        num: '06',
        status: 'STAGE 06 · AUG 2019 – AUG 2025 · ENTERPRISE MOBILITY',
        title: 'TECHNICAL TEST LEAD / <span class="text-sky-400">RELEASE MANAGER</span>',
        org: 'One NZ — Enterprise Programmes (NZDF, MSD & NZ Police)',
        desc: 'Directed enterprise MDM cloud migrations and release governance across three distinct agency workstreams: (1) NZDF BlackBerry UEM cutover to Microsoft Intune with no data loss and full NZISM compliance; (2) MSD VMware Workspace ONE to Intune migration and multi-stream BAU release assurance; and (3) NZ Police supervised iOS technical discovery and formal release governance.',
        pills: ['NZDF Intune Cutover', 'MSD Migration & BAU', 'NZ Police iOS Discovery', 'NZSIS *CV & Police Vetted']
      },
      {
        num: '07',
        status: 'CURRENT ROLE · SEP 2025 – PRESENT · CLOUD / DATA',
        title: 'SENIOR TEST ANALYST / <span class="text-teal-400">DATA MIGRATION LEAD</span>',
        org: 'Ministry of Business, Innovation and Employment (MBIE) · Wellington, NZ',
        desc: 'Leading data migration assurance, payment gateway security, and quality engineering across cloud transformation programmes at MBIE—including leading a five-person QA team on NZeTA Batch Portal PayNow (QuickPay/Windcave), NZeTA Web 3DS 2.0 (Datacom Gateway), IPONZ SaaS Cloud Migration (COEXYA France), Open Banking / Dow Jones CDR, and EPBR WCAG 2.1 AA accessibility.',
        pills: ['Quality Leadership (5-Person Team)', 'Data Validation & SQL', 'Reconciliation & Assurance', 'Cloud Transformation']
      }
    ];

    function selectEra(idx) {
      playClickTone(590);
      const buttons = document.querySelectorAll('.era-btn');
      buttons.forEach((b, i) => {
        if (i === idx) {
          b.className = 'era-btn p-3.5 rounded-xl bg-teal-500 text-black text-left cursor-pointer transition-all shadow-lg shadow-teal-500/20';
        } else {
          b.className = 'era-btn p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-sky-400 text-left cursor-pointer transition-all';
        }
      });
      const e = ERAS[idx];
      document.getElementById('eraNumBadge').textContent = e.num;
      document.getElementById('eraStatusPill').textContent = e.status;
      document.getElementById('eraTitle').innerHTML = e.title;
      document.getElementById('eraOrgSub').textContent = e.org;
      document.getElementById('eraDesc').textContent = e.desc;
      document.getElementById('eraFocusPills').innerHTML = e.pills.map(p => `<span class="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800">${p}</span>`).join('');
    }

    document.querySelectorAll('.era-btn').forEach(btn => {
      btn.addEventListener('click', () => selectEra(Number(btn.getAttribute('data-era'))));
    });

    // =========================================================================
    // 5. ACCESSIBLE ARCHITECTURE NODES (QA-03) & DEMO GATE SIMULATOR (QA-04)
    // =========================================================================
    const STAGES = [
      {
        val: '14+',
        unit: 'Years in IT & QA Delivery',
        stage: 'End-to-End Architecture & Release Governance',
        copy: '14+ years in IT and QA delivery across global and New Zealand enterprise programmes, including leading a five-person QA team at MBIE.'
      },
      {
        val: '5',
        unit: 'Person QA Team Led at MBIE',
        stage: 'Payments, Cloud Migration & Accessibility',
        copy: 'Leading a 5-person QA team on NZeTA Batch Portal PayNow (QuickPay/Windcave), alongside NZeTA Web 3DS 2.0 (Datacom Gateway), IPONZ SaaS Migration, Open Banking CDR, and EPBR WCAG 2.1 AA.'
      },
      {
        val: '3',
        unit: 'Distinct One NZ Agency Streams',
        stage: 'NZDF Cutover · MSD Migration & BAU · NZ Police Discovery',
        copy: 'Separated agency delivery: NZDF BlackBerry UEM cutover to Intune with no data loss, MSD Workspace ONE migration and BAU assurance, and NZ Police supervised iOS technical discovery and release governance.'
      },
      {
        val: '11+',
        unit: 'Major Programmes Delivered',
        stage: 'DOC Great Walks ERP/POS & Co-operative Bank',
        copy: 'Primary Test Lead bridging DOC and US vendor across ERP-based enterprise software and visitor centre POS terminals, plus Acting Scrum Master & Cypress lead at The Co-operative Bank.'
      }
    ];

    document.querySelectorAll('.stage-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickTone(540);
        document.querySelectorAll('.stage-btn').forEach(b => {
          b.className = 'stage-btn px-3 py-1.5 rounded-md font-mono-kicker text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-teal-500 cursor-pointer transition-all';
        });
        btn.className = 'stage-btn px-3 py-1.5 rounded-md font-mono-kicker text-[10px] bg-teal-500 text-black font-bold cursor-pointer transition-all';
        const s = STAGES[Number(btn.getAttribute('data-stage'))];
        document.getElementById('scaleValue').textContent = s.val;
        document.getElementById('scaleUnit').textContent = s.unit;
        document.getElementById('scaleStage').textContent = s.stage;
        document.getElementById('scaleCopy').textContent = s.copy;
      });
    });

    const allSvgNodes = Array.from(document.querySelectorAll('.evolve-node'));
    const accessibleNodeContainer = document.getElementById('accessibleNodeButtons');

    function activateArchitectureNode(node) {
      playClickTone(620);
      allSvgNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      document.getElementById('nodeTitle').textContent = node.getAttribute('data-node');
      document.getElementById('nodeDesc').textContent = node.getAttribute('data-detail');
    }

    // Wire both Pointer Click and Keyboard Enter/Space on every SVG node + build companion button bar (Fixes QA-03)
    allSvgNodes.forEach((node, idx) => {
      node.addEventListener('click', () => activateArchitectureNode(node));
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateArchitectureNode(node);
        }
      });

      if (accessibleNodeContainer) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 focus:border-teal-400 font-mono-kicker text-[9px] text-zinc-300 cursor-pointer transition-all';
        b.textContent = node.querySelector('text').textContent;
        b.setAttribute('aria-label', 'Inspect ' + node.getAttribute('data-node'));
        b.addEventListener('click', () => activateArchitectureNode(node));
        accessibleNodeContainer.appendChild(b);
      }
    });

    // Release Gate Simulator — Starts in "Not run" state + supports both Go and No-Go Demo Scenarios (Fixes QA-04)
    const runSimBtn = document.getElementById('runSimBtn');
    const runNoGoSimBtn = document.getElementById('runNoGoSimBtn');
    const resetSimBtn = document.getElementById('resetSimBtn');
    const simStatusLabel = document.getElementById('simStatusLabel');
    const simProgressBar = document.getElementById('simProgressBar');
    const simMetricLeft = document.getElementById('simMetricLeft');
    const simMetricRight = document.getElementById('simMetricRight');
    const evolveSvgWrapper = document.getElementById('evolveSvgWrapper');
    let simTimers = [];

    function clearSimTimers() {
      simTimers.forEach(t => clearTimeout(t));
      simTimers = [];
    }

    function resetSimulator() {
      clearSimTimers();
      evolveSvgWrapper.classList.remove('sim-running');
      allSvgNodes.forEach(n => n.classList.remove('sim-pass', 'sim-fail', 'active'));
      allSvgNodes[3].classList.add('active');
      simProgressBar.style.width = '0%';
      simProgressBar.className = 'h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300';
      simStatusLabel.textContent = 'Not run — Choose a scenario below to simulate gate checks';
      simMetricLeft.textContent = 'DEMO RTM COVERAGE: NOT RUN (0/12)';
      simMetricRight.textContent = 'GATE STATUS: NOT RUN';
      simMetricRight.className = 'text-zinc-400 font-bold';
    }

    resetSimBtn.addEventListener('click', () => {
      playClickTone(440);
      resetSimulator();
    });

    runSimBtn.addEventListener('click', () => {
      clearSimTimers();
      playClickTone(680);
      evolveSvgWrapper.classList.add('sim-running');
      allSvgNodes.forEach(n => n.classList.remove('sim-pass', 'sim-fail', 'active'));
      simProgressBar.style.width = '0%';
      simProgressBar.className = 'h-full bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-300';
      simMetricRight.textContent = 'RUNNING DEMO GATE CHECKS...';
      simMetricRight.className = 'text-amber-300 font-bold';

      allSvgNodes.forEach((node, idx) => {
        const tid = setTimeout(() => {
          playClickTone(480 + idx * 25);
          node.classList.add('sim-pass');
          const pct = Math.round(((idx + 1) / allSvgNodes.length) * 100);
          simProgressBar.style.width = pct + '%';
          simStatusLabel.textContent = `Demo Check [${idx + 1}/${allSvgNodes.length}]: ${node.getAttribute('data-node')}`;
          simMetricLeft.textContent = `DEMO RTM VERIFIED: ${pct}% (${idx + 1}/12)`;
          document.getElementById('nodeTitle').textContent = node.getAttribute('data-node');
          document.getElementById('nodeDesc').textContent = node.getAttribute('data-detail');

          if (idx === allSvgNodes.length - 1) {
            const doneId = setTimeout(() => {
              playClickTone(820);
              simStatusLabel.textContent = 'Demo Simulation Complete — All 12 Layers Verified (0 P1/P2 Blockers)';
              simMetricRight.textContent = 'DEMO VERDICT: GO FOR RELEASE ✓';
              simMetricRight.className = 'text-emerald-400 font-bold';
              evolveSvgWrapper.classList.remove('sim-running');
            }, 300);
            simTimers.push(doneId);
          }
        }, idx * 180);
        simTimers.push(tid);
      });
    });

    runNoGoSimBtn.addEventListener('click', () => {
      clearSimTimers();
      playClickTone(420);
      evolveSvgWrapper.classList.add('sim-running');
      allSvgNodes.forEach(n => n.classList.remove('sim-pass', 'sim-fail', 'active'));
      simProgressBar.style.width = '0%';
      simProgressBar.className = 'h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300';
      simMetricRight.textContent = 'RUNNING DEMO GATE CHECKS...';
      simMetricRight.className = 'text-amber-300 font-bold';

      const stopIdx = 7; // Halt at SQL Reconciliation layer to demonstrate No-Go governance
      for (let idx = 0; idx <= stopIdx; idx++) {
        const node = allSvgNodes[idx];
        const tid = setTimeout(() => {
          const pct = Math.round(((idx + 1) / allSvgNodes.length) * 100);
          simProgressBar.style.width = pct + '%';

          if (idx < stopIdx) {
            playClickTone(480 + idx * 20);
            node.classList.add('sim-pass');
            simStatusLabel.textContent = `Demo Check [${idx + 1}/12]: ${node.getAttribute('data-node')}`;
            simMetricLeft.textContent = `DEMO RTM CHECKED: ${pct}% (${idx + 1}/12)`;
          } else {
            playClickTone(260);
            node.classList.add('sim-fail');
            evolveSvgWrapper.classList.remove('sim-running');
            simStatusLabel.textContent = 'Demo Blocker Detected at Layer 08 (SQL Reconciliation): Unreconciled GST callback mismatch — Release Held';
            simMetricLeft.textContent = 'DEMO RTM HALTED AT 67% (1 P1 BLOCKER)';
            simMetricRight.textContent = 'DEMO VERDICT: NO-GO (HOLD RELEASE) ✕';
            simMetricRight.className = 'text-rose-400 font-bold';
            document.getElementById('nodeTitle').textContent = 'NO-GO GATE TRIGGERED: ' + node.getAttribute('data-node');
            document.getElementById('nodeDesc').textContent = 'Demonstrates how Mazher gates vendor handovers when a P1 reconciliation or callback defect is detected prior to cutover.';
          }
        }, idx * 190);
        simTimers.push(tid);
      }
    });

    // =========================================================================
    // 6. CASE STUDIES (C02 & C03 WORDING ALIGNED + DEEP-LINKING FOR QA-01)
    // =========================================================================
    const CASE_STUDIES = [
      {
        index: '01',
        category: 'payments',
        title: 'NZeTA Batch Portal – PayNow / Upfront Payments',
        org: 'MBIE / Immigration New Zealand · QA Delivery Lead / Test Analyst',
        tagline: 'Introducing upfront QuickPay/Windcave payment capability across incremental vendor builds without disrupting live batch processing.',
        flow: 'Batch Portal (External / Internal) → Batch API → QuickPay → Windcave Hosted Payment Page → Callback & Status Reconciliation → GST Tax Invoice PDF → Data Warehouse & Downstream NZeTA Processing',
        metrics: [
          { val: '5-Person', lbl: 'QA Team Led' },
          { val: 'Builds 1–3', lbl: 'Incremental Vendor Releases' },
          { val: 'E2E RTM', lbl: 'Build → US → AC → Test → Defect' }
        ],
        challenge: 'The initiative introduced upfront payment processing into an operational NZeTA Batch Portal across External and Internal journeys, Provider/Proxy administration, QuickPay/Windcave gateways, invoicing, GST, payment recovery, and Data Warehouse reporting—delivered incrementally across multiple vendor builds.',
        did: [
          'Led day-to-day QA delivery across a five-person QA team, coordinating test design, resource allocation, execution readiness, and build-level smoke/acceptance gates.',
          'Worked with Business Analysts in process walkthroughs to clarify Provider/Proxy/CRT rules, GST, invoicing, and recovery, translating User Stories into scenario-based ADO test suites.',
          'Validated Batch Portal → Batch API → QuickPay → Windcave → Callbacks/Reconciliation → Invoice and built interactive Excel QA operating dashboards.'
        ],
        results: [
          'Structured QA operating model across incremental vendor builds',
          'Full visibility of scope, test coverage, execution, defects & release readiness',
          'Protected existing Batch Portal behaviour across live releases'
        ]
      },
      {
        index: '02',
        category: 'payments',
        title: 'NZeTA Web – 3D Secure (3DS 2.0) Security Enhancement',
        org: 'MBIE / Immigration New Zealand · QA Lead / Senior Test Analyst',
        tagline: 'Transitioning the Datacom Payment Gateway from ATTEMPT/BYPASS to ENFORCED 3DS 2.0 authentication.',
        flow: 'NZeTA Public Web Application (EN / Simplified Chinese UI) → Upfront 3DS Traveller Guidance → Pay & Submit → Datacom Payment Gateway (ENFORCED 3DS 2.0 Challenge) → Callback & Confirmation',
        metrics: [
          { val: '3DS 2.0', lbl: 'Enforced Authentication' },
          { val: 'EN + ZH', lbl: 'Multilingual UI Validation' },
          { val: 'Datacom', lbl: 'Payment Gateway Integration' }
        ],
        challenge: 'Strengthening online payment authentication by moving the Datacom Payment Gateway from ATTEMPT/BYPASS to ENFORCED 3D Secure (3DS 2.0) required rigorous validation of redirects, callback states, and multilingual traveller guidance while protecting existing payment flows.',
        did: [
          'Led end-to-end QA planning, risk-based test design, execution, and regression coverage with full requirements traceability in Azure DevOps.',
          'Validated enforced 3DS authentication journeys, payment redirects, success/failure outcomes, error handling, and existing payment regression.',
          'Verified upfront 3DS UI instructions before Pay and Submit, English and Simplified Chinese language-toggle behaviour, and Immigration NZ 3DS guidance links.'
        ],
        results: [
          'Provided QA assurance for enforced 3DS authentication via Datacom Gateway',
          'Validated payment security, integration behaviour & multilingual guidance',
          'Validated existing NZeTA Web payment flows and assessed regression impact across release candidates'
        ]
      },
      {
        index: '03',
        category: 'migration',
        title: 'IPONZ SaaS Cloud Migration & Open Banking / Dow Jones',
        org: 'MBIE · Migration Test Lead (Vendor: COEXYA France & Payments NZ Transition)',
        tagline: 'Reconciling critical Intellectual Property records and national Open Banking API specifications into modern cloud platforms.',
        flow: 'Legacy On-Premise IPONZ & Payments NZ Repos → SQL Source-to-Target Extraction & Transformation Rules → COEXYA SaaS Cloud & MBIE GitHub Enterprise Cloud/Pages + Dow Jones Risk Screening (CDR)',
        metrics: [
          { val: 'SaaS + GitHub', lbl: 'Target Cloud Platforms' },
          { val: 'SQL + Mabl', lbl: 'Reconciliation & Automation' },
          { val: 'CDR Ready', lbl: 'Dow Jones Risk & OpenAPI' }
        ],
        challenge: 'Simultaneously leading migration assurance for transitioning IPONZ from a legacy on-premise system to SaaS Cloud with vendor COEXYA (France) and migrating New Zealand’s Open Banking Standards Platform from Payments NZ to MBIE GitHub Enterprise Cloud alongside Dow Jones Risk Screening.',
        did: [
          'Defined end-to-end migration test strategies, SQL source-to-target reconciliation queries, and transformation-rule verification across IPONZ and Open Banking schemas.',
          'Tested GitHub authoring/publishing workflows, OpenAPI artefacts, RBAC, audit logging, DR/rollback, and Dow Jones Risk Screening (SSO, search, audit trails, UAT).',
          'Implemented Mabl test automation and coordinated multi-partner UAT across MBIE business teams and international vendor COEXYA.'
        ],
        results: [
          'Verified source-to-target data integrity across legacy and cloud schemas',
          'Repeatable Mabl automated regression and GitHub publishing checks',
          'Supported Consumer Data Right (CDR) accreditation readiness'
        ]
      },
      {
        index: '04',
        category: 'enterprise',
        title: 'Earthquake-Prone Building Register (EPBR) Accessibility',
        org: 'MBIE · Accessibility Test Lead',
        tagline: 'Delivering WCAG 2.1 Level AA compliance across a high-visibility national public safety register.',
        flow: 'EPBR Public Portal → NVDA & VoiceOver Screen Reader Tree → Keyboard-Only Tab/Focus Order → Semantic ARIA & DOM Hierarchy → Colour Contrast & 200% Zoom Reflow Verification',
        metrics: [
          { val: 'WCAG 2.1 AA', lbl: 'NZ Govt Web Standard' },
          { val: '200% Reflow', lbl: 'Responsive & Zoom Audits' },
          { val: 'NVDA + ARIA', lbl: 'Assistive Tech Validation' }
        ],
        challenge: 'Public-facing government registers must be accessible to all citizens, including users relying on screen readers, keyboard-only navigation, and high-zoom viewports under mandatory New Zealand Government Web Accessibility Standards.',
        did: [
          'Defined the accessibility test plan, test scenarios, and compliance checklist aligned with WCAG 2.1 Level AA.',
          'Executed screen-reader testing (NVDA/VoiceOver), keyboard-only navigation, focus-order verification, semantic HTML/ARIA inspection, colour contrast, and 200% reflow audits.',
          'Logged prioritised defects mapped to WCAG success criteria and coached developers through remediation.'
        ],
        results: [
          'Comprehensive WCAG 2.1 Level AA compliance evidence pack',
          'Verified assistive technology compatibility across public workflows',
          'Clear developer remediation & sign-off assurance'
        ]
      },
      {
        index: '05',
        category: 'enterprise',
        title: 'One NZ Enterprise Mobility — NZDF, MSD & NZ Police Streams',
        org: 'One NZ (2019 – Aug 2025) · Technical Test Lead / Release Manager',
        tagline: 'Distinct MDM cloud migrations, technical discovery, and multi-stream BAU release governance across three national agencies.',
        flow: 'Stream 1: NZDF (BlackBerry UEM → Microsoft Intune Cutover) | Stream 2: MSD (VMware Workspace ONE → Intune Migration & BAU Assurance) | Stream 3: NZ Police (Supervised iOS Technical Discovery & Release Governance)',
        metrics: [
          { val: 'NZDF', lbl: 'Intune Cutover · No Data Loss' },
          { val: 'MSD', lbl: 'WS1 Migration & BAU Assurance' },
          { val: 'NZ Police', lbl: 'iOS Discovery & Release Gov' }
        ],
        challenge: 'Delivering enterprise mobility assurance across three distinct high-security government agencies—requiring separate test strategies for NZDF’s BlackBerry UEM cutover, MSD’s Workspace ONE migration and ongoing BAU streams, and NZ Police’s supervised iOS discovery and release management.',
        did: [
          'NZDF Stream: Directed end-to-end BlackBerry UEM to Microsoft Intune migration testing, validating NZISM security baselines, certificate authentication, VPN/Wi-Fi profiles, and conditional access.',
          'MSD Stream: Led VMware Workspace ONE to Microsoft Intune migration validation alongside continuous multi-stream BAU release assurance and regression testing.',
          'NZ Police Stream: Conducted technical discovery on iOS supervised-mode restrictions and governed Release Notes, Deployment Checklists, Rollback Plans, and Go/No-Go readiness reviews.'
        ],
        results: [
          'NZDF: Seamless Intune cutover with no data loss and full NZISM compliance',
          'MSD: Controlled Workspace ONE to Intune transition & stable BAU releases',
          'NZ Police: Actionable iOS supervision discovery & formal Go/No-Go governance'
        ]
      },
      {
        index: '06',
        category: 'enterprise',
        title: 'DOC Great Walks National Platform & The Co-operative Bank',
        org: 'Department of Conservation (2018–2019) & The Co-operative Bank (2019)',
        tagline: 'ERP-based application QA, nationwide POS hardware testing, and Cypress automation for a Prime Minister-officiated launch.',
        flow: 'Great Walks Online Booking Portal & Visitor Centre POS Hardware → Payment Gateway APIs → Underlying ERP-Based Enterprise Application (Inventory, Bookings, Payments & HR Modules)',
        metrics: [
          { val: 'PM Launch', lbl: 'National Great Walks Go-Live' },
          { val: 'ERP + POS', lbl: 'Online & Visitor Centre Hardware' },
          { val: 'Cypress E2E', lbl: 'Front-End & API Automation' }
        ],
        challenge: 'DOC redeveloped New Zealand’s national Great Walks & Campsites booking platform spanning an underlying ERP-based enterprise application, online portal, payment gateway APIs, and physical POS hardware across visitor centres; followed by digital lending transformation at The Co-operative Bank.',
        did: [
          'Served as primary Test Lead between DOC National Office and the US vendor, validating ERP inventory/bookings/payments/HR modules, visitor centre POS terminals, and Cypress E2E/accessibility suites.',
          'At The Co-operative Bank, led Agile QA and served as Acting Scrum Master for mobile/web credit card and loan portals using Cypress, Selenium, Postman, and REST Assured.'
        ],
        results: [
          'High-visibility national DOC launch attended by the Prime Minister of New Zealand',
          'Supported thousands of reservations seamlessly upon go-live',
          'Accelerated banking regression cycles with maintainable Cypress & Selenium suites'
        ]
      }
    ];

    let activeWorkFilter = 'all';
    const workContainer = document.getElementById('workListContainer');

    function setWorkFilterUI(filter) {
      activeWorkFilter = filter;
      document.querySelectorAll('.work-filter-btn').forEach(b => {
        if (b.getAttribute('data-filter') === filter) {
          b.className = 'work-filter-btn px-4 py-2 rounded-full font-mono-kicker text-xs bg-white text-black font-bold cursor-pointer transition-all';
        } else {
          b.className = 'work-filter-btn px-4 py-2 rounded-full font-mono-kicker text-xs bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-teal-400 cursor-pointer transition-all';
        }
      });
    }

    function openCaseModalByIndex(caseIdxStr) {
      const item = CASE_STUDIES.find(c => c.index === caseIdxStr);
      if (!item) return;
      document.getElementById('modalOrg').textContent = item.org;
      document.getElementById('modalTitle').textContent = `${item.index} — ${item.title}`;
      document.getElementById('modalFlow').textContent = item.flow;
      document.getElementById('modalBullets').innerHTML = item.did.map(d => `<li>${d}</li>`).join('');
      document.getElementById('modalOutcome').textContent = item.results.join(' · ');
      const modal = document.getElementById('caseModal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.getElementById('closeCaseModalBtn').focus();
    }

    function renderWorkItems(filter) {
      setWorkFilterUI(filter);
      const items = filter === 'all' ? CASE_STUDIES : CASE_STUDIES.filter(w => w.category === filter);
      workContainer.innerHTML = items.map(w => `
        <article id="case-card-${w.index}" class="py-14 space-y-8 transition-all duration-300">
          <div class="flex flex-col lg:flex-row lg:items-baseline justify-between gap-4">
            <div class="flex items-baseline gap-5">
              <span class="font-display font-black text-4xl sm:text-6xl text-teal-400/80">${w.index}</span>
              <div>
                <p class="font-mono-kicker text-[11px] text-teal-400">${w.org}</p>
                <h3 class="font-display font-black text-2xl sm:text-4xl text-white mt-1">${w.title}</h3>
                <p class="text-zinc-400 text-sm sm:text-base mt-2 max-w-3xl">${w.tagline}</p>
              </div>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              ${w.metrics.map(m => `
                <div class="px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div class="font-display font-black text-xl text-white">${m.val}</div>
                  <div class="font-mono-kicker text-[9px] text-teal-400 mt-0.5">${m.lbl}</div>
                </div>
              `).join('')}
              <button type="button" data-case-idx="${w.index}" class="open-case-modal-btn px-4 py-3 rounded-xl bg-teal-500/15 hover:bg-teal-500 hover:text-black border border-teal-400/50 font-mono-kicker text-[10px] text-teal-300 font-bold cursor-pointer transition-all">
                Inspect Architecture &amp; RTM ↗
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            <div class="p-6 rounded-2xl bg-zinc-950/90 border border-zinc-900 space-y-2">
              <p class="font-mono-kicker text-[11px] text-teal-400 font-bold">The Challenge</p>
              <p class="text-sm text-zinc-300 leading-relaxed">${w.challenge}</p>
            </div>
            <div class="p-6 rounded-2xl bg-zinc-950/90 border border-zinc-900 space-y-2">
              <p class="font-mono-kicker text-[11px] text-teal-400 font-bold">What I Did</p>
              <ul class="space-y-2 text-sm text-zinc-300 leading-relaxed list-disc pl-4">
                ${w.did.map(d => `<li>${d}</li>`).join('')}
              </ul>
            </div>
            <div class="p-6 rounded-2xl bg-teal-950/20 border border-teal-500/30 space-y-2">
              <p class="font-mono-kicker text-[11px] text-teal-300 font-bold">The Result</p>
              <ul class="space-y-2 text-sm text-zinc-100 font-medium leading-relaxed list-disc pl-4">
                ${w.results.map(r => `<li>${r}</li>`).join('')}
              </ul>
            </div>
          </div>
        </article>
      `).join('');

      document.querySelectorAll('.open-case-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          playClickTone(640);
          openCaseModalByIndex(btn.getAttribute('data-case-idx'));
        });
      });
    }
    renderWorkItems('all');

    document.getElementById('closeCaseModalBtn').addEventListener('click', () => {
      const modal = document.getElementById('caseModal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });

    document.querySelectorAll('.work-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickTone(560);
        renderWorkItems(btn.getAttribute('data-filter'));
      });
    });

    // =========================================================================
    // 7. THREE.JS 3D WIREFRAME + PARTICLE FIELD (SCENE 06) & SECTORS (SCENE 07)
    // =========================================================================
    let meshGroup = null;
    let targetRotX = 0;
    let targetRotY = 0;

    function initThreeCraft() {
      const canvas = document.getElementById('craftThreeCanvas');
      if (!canvas || typeof THREE === 'undefined') return;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
      camera.position.z = 5.2;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

      meshGroup = new THREE.Group();
      const geoOuter = new THREE.IcosahedronGeometry(1.55, 1);
      const matOuter = new THREE.MeshBasicMaterial({ color: 0x14b8a6, wireframe: true, transparent: true, opacity: 0.55 });
      meshGroup.add(new THREE.Mesh(geoOuter, matOuter));

      const geoInner = new THREE.OctahedronGeometry(0.95, 0);
      const matInner = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.9 });
      meshGroup.add(new THREE.Mesh(geoInner, matInner));

      const pCount = 90;
      const pGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount * 3; i++) positions[i] = (Math.random() - 0.5) * 4.5;
      pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const pMat = new THREE.PointsMaterial({ color: 0x5eead4, size: 0.04, transparent: true, opacity: 0.75 });
      meshGroup.add(new THREE.Points(pGeo, pMat));

      scene.add(meshGroup);

      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        targetRotY = ((e.clientX - rect.left) / rect.width - 0.5) * 1.4;
        targetRotX = ((e.clientY - rect.top) / rect.height - 0.5) * 1.4;
      });

      function animate() {
        requestAnimationFrame(animate);
        meshGroup.rotation.y += 0.0045 + (targetRotY - meshGroup.rotation.y) * 0.03;
        meshGroup.rotation.x += 0.002 + (targetRotX - meshGroup.rotation.x) * 0.03;
        renderer.render(scene, camera);
      }
      animate();

      window.addEventListener('resize', () => {
        if (!canvas.clientWidth) return;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      });
    }
    window.addEventListener('load', initThreeCraft);

    document.querySelectorAll('.craft-beat-card').forEach(card => {
      const activateBeat = () => {
        playClickTone(580);
        document.querySelectorAll('.craft-beat-card').forEach(c => c.classList.remove('is-on'));
        card.classList.add('is-on');
        const idx = Number(card.getAttribute('data-beat')) + 1;
        const title = card.querySelector('h3').textContent;
        document.getElementById('terminalHeader').textContent = `// ACTIVE BEAT: 0${idx} ${title}`;
        document.getElementById('terminalLiveLine').textContent = card.getAttribute('data-terminal');
        if (meshGroup) {
          meshGroup.rotation.y += 0.7;
          meshGroup.rotation.x += 0.4;
        }
      };
      card.addEventListener('click', activateBeat);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateBeat();
        }
      });
    });

    const DOMAINS = [
      {
        count: 'DOMAIN 01 / 05',
        org: 'MBIE · Immigration New Zealand',
        title: 'DIGITAL PAYMENTS & 3DS 2.0 SECURITY',
        desc: 'Leading a 5-person QA team on the NZeTA Batch Portal PayNow upfront payment integration (QuickPay/Windcave) and directing QA assurance for the Datacom Payment Gateway transition to enforced 3D Secure (3DS 2.0) authentication across English and Simplified Chinese user journeys.',
        tags: ['QuickPay & Windcave', 'Datacom 3DS 2.0', '5-Person QA Team Lead', 'ADO Traceability & Dashboards']
      },
      {
        count: 'DOMAIN 02 / 05',
        org: 'MBIE · IPONZ & Consumer Data Right',
        title: 'CLOUD, SaaS & OPEN BANKING MIGRATION',
        desc: 'Directing end-to-end migration test strategy, SQL source-to-target data reconciliation, and Mabl automation for IPONZ’s legacy-to-SaaS transformation (with COEXYA France) and New Zealand’s Open Banking Standards & Dow Jones Risk Screening migration to GitHub Enterprise Cloud.',
        tags: ['SQL Data Reconciliation', 'COEXYA (France)', 'GitHub Enterprise Cloud', 'Dow Jones Risk & CDR']
      },
      {
        count: 'DOMAIN 03 / 05',
        org: 'One NZ · NZDF, MSD & NZ Police',
        title: 'DEFENCE, MSD & POLICING ENTERPRISE MOBILITY',
        desc: 'Separated enterprise mobility delivery: (1) NZDF BlackBerry UEM cutover to Microsoft Intune with no data loss and NZISM compliance; (2) MSD Workspace ONE migration and multi-stream BAU assurance; and (3) NZ Police supervised iOS technical discovery and formal release governance.',
        tags: ['NZDF Intune Cutover', 'MSD Migration & BAU', 'NZ Police iOS Discovery', 'NZSIS *CV & Police Vetted']
      },
      {
        count: 'DOMAIN 04 / 05',
        org: 'DOC National Office & The Co-operative Bank',
        title: 'NATIONAL ERP, POS & DIGITAL LENDING',
        desc: 'Acted as primary Test Lead for DOC’s Great Walks national booking platform, ERP-based enterprise application, and visitor centre POS hardware (launched by the Prime Minister of New Zealand), and served as Senior Test Analyst / Acting Scrum Master at The Co-operative Bank.',
        tags: ['ERP-Based Enterprise App', 'Visitor Centre POS', 'Cypress E2E Automation', 'Acting Scrum Master']
      },
      {
        count: 'DOMAIN 05 / 05',
        org: 'MBIE EPBR & Victoria University of Wellington',
        title: 'ACCESSIBILITY (WCAG 2.1 AA) & STATUTORY DATA',
        desc: 'Led WCAG 2.1 Level AA accessibility testing (NVDA screen reader, keyboard navigation, 200% zoom reflow) for MBIE’s Earthquake-Prone Building Register (EPBR) and validated statutory Single Data Return (SDR) submissions to TEC and the Ministry of Education.',
        tags: ['WCAG 2.1 Level AA', 'NVDA Screen Reader', 'Single Data Return (SDR)', 'SQL Backend Verification']
      }
    ];

    document.querySelectorAll('.dom-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        playClickTone(550);
        document.querySelectorAll('.dom-btn').forEach(b => {
          b.className = 'dom-btn w-full text-left p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 flex items-center justify-between cursor-pointer transition-all';
        });
        btn.className = 'dom-btn w-full text-left p-3.5 rounded-xl bg-teal-500/15 border border-teal-400/50 flex items-center justify-between cursor-pointer transition-all';
        const d = DOMAINS[Number(btn.getAttribute('data-dom'))];
        document.getElementById('domCount').textContent = d.count;
        document.getElementById('domOrgBadge').textContent = d.org;
        document.getElementById('domTitle').textContent = d.title;
        document.getElementById('domDesc').textContent = d.desc;
        document.getElementById('domTags').innerHTML = d.tags.map(t => `<span class="px-2.5 py-1 rounded bg-zinc-900/90 border border-zinc-700">${t}</span>`).join('');
      });
    });

    // =========================================================================
    // 8. KEYBOARD-ACCESSIBLE COMMAND PALETTE WITH CASE ROUTING (QA-01 & QA-02)
    // =========================================================================
    function jumpToCaseStudy(caseIdxStr) {
      // If active filter hides the target case study, automatically reset filter to 'all' (Fixes QA-01)
      const targetCase = CASE_STUDIES.find(c => c.index === caseIdxStr);
      if (targetCase && activeWorkFilter !== 'all' && activeWorkFilter !== targetCase.category) {
        renderWorkItems('all');
      }
      const cardEl = document.getElementById(`case-card-${caseIdxStr}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        cardEl.classList.add('ring-2', 'ring-teal-400', 'rounded-2xl', 'px-4');
        setTimeout(() => cardEl.classList.remove('ring-2', 'ring-teal-400', 'rounded-2xl', 'px-4'), 2600);
      }
      openCaseModalByIndex(caseIdxStr);
    }

    const CMD_ITEMS = [
      { label: '01 · NZeTA Batch Portal – PayNow / Upfront Payments (QuickPay / Windcave / 5-Person QA Team)', tag: 'Case Study 01', href: '#work', action: () => jumpToCaseStudy('01') },
      { label: '02 · NZeTA Web – 3D Secure (3DS 2.0) Datacom Payment Gateway Enhancement', tag: 'Case Study 02', href: '#work', action: () => jumpToCaseStudy('02') },
      { label: '03 · IPONZ SaaS Cloud Migration (COEXYA) & Open Banking / Dow Jones CDR', tag: 'Case Study 03', href: '#work', action: () => jumpToCaseStudy('03') },
      { label: '04 · Earthquake-Prone Building Register (EPBR) WCAG 2.1 AA Accessibility', tag: 'Case Study 04', href: '#work', action: () => jumpToCaseStudy('04') },
      { label: '05 · One NZ Enterprise Mobility — NZDF Cutover, MSD Migration & NZ Police Discovery', tag: 'Case Study 05', href: '#work', action: () => jumpToCaseStudy('05') },
      { label: '06 · DOC Great Walks ERP/POS Platform & The Co-operative Bank Cypress QA', tag: 'Case Study 06', href: '#work', action: () => jumpToCaseStudy('06') },
      { label: 'Explore Global Experience Map (Saudi Arabia Start → 7 Countries → New Zealand)', tag: 'Global Scene 02', href: '#global-footprint' },
      { label: 'Explore 7-Stage Career Evolution (Apr 2012 – Present) & ETL Pipeline', tag: 'Timeline Scene 03', href: '#timeline' },
      { label: 'Run Live Go/No-Go Release Gate Simulator (Demo Data)', tag: 'Simulator Scene 04', href: '#story', action: () => document.getElementById('runSimBtn').click() },
      { label: 'View / Download Executive Master CV (PDF)', tag: 'Recruiter Action', href: '#hero', action: () => openCvModal() },
      { label: 'Email Mazher Hussain (mazher.khaja313@outlook.co.nz)', tag: 'Direct Contact', href: 'mailto:mazher.khaja313@outlook.co.nz' }
    ];

    const cmdModal = document.getElementById('cmdPaletteModal');
    const cmdInput = document.getElementById('cmdSearchInput');
    const cmdList = document.getElementById('cmdResultsList');
    const openCmdBtn = document.getElementById('openCmdPaletteBtn');
    let filteredCmdItems = [...CMD_ITEMS];
    let activeCmdIndex = 0;
    let lastCmdTrigger = openCmdBtn;

    function openCmdPalette(triggerEl) {
      playClickTone(650);
      lastCmdTrigger = triggerEl || openCmdBtn;
      cmdModal.classList.remove('hidden');
      cmdModal.classList.add('flex');
      openCmdBtn.setAttribute('aria-expanded', 'true');
      cmdInput.value = '';
      activeCmdIndex = 0;
      renderCmdList('');
      setTimeout(() => cmdInput.focus(), 40);
    }

    function closeCmdPalette() {
      cmdModal.classList.add('hidden');
      cmdModal.classList.remove('flex');
      openCmdBtn.setAttribute('aria-expanded', 'false');
      if (lastCmdTrigger && typeof lastCmdTrigger.focus === 'function') {
        lastCmdTrigger.focus();
      }
    }

    function executeCmdItem(item) {
      if (!item) return;
      closeCmdPalette();
      if (item.download) {
        const a = document.createElement('a');
        a.href = item.href;
        a.download = 'Mazher_Hussain_Executive_Master_CV.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }
      if (item.href && item.href.startsWith('mailto:')) {
        window.location.href = item.href;
        return;
      }
      if (item.action) {
        item.action();
        return;
      }
      if (item.href) {
        const target = document.querySelector(item.href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    }

    function updateCmdHighlight() {
      const options = cmdList.querySelectorAll('[role="option"]');
      options.forEach((opt, idx) => {
        const isSelected = idx === activeCmdIndex;
        opt.setAttribute('aria-selected', String(isSelected));
        if (isSelected) {
          opt.className = 'cmd-item-link flex items-center justify-between p-3 rounded-xl bg-teal-500/20 border border-teal-400/60 text-white transition-colors cursor-pointer';
          opt.scrollIntoView({ block: 'nearest' });
        } else {
          opt.className = 'cmd-item-link flex items-center justify-between p-3 rounded-xl hover:bg-zinc-900 border border-transparent text-zinc-200 transition-colors cursor-pointer';
        }
      });
    }

    function renderCmdList(q) {
      const term = q.trim().toLowerCase();
      filteredCmdItems = !term
        ? [...CMD_ITEMS]
        : CMD_ITEMS.filter(item => (item.label + ' ' + item.tag).toLowerCase().includes(term));

      activeCmdIndex = 0;

      if (filteredCmdItems.length === 0) {
        cmdList.innerHTML = `<div class="p-4 text-center text-xs text-zinc-500 font-mono-kicker">No matching results found. Press ESC to close.</div>`;
        return;
      }

      cmdList.innerHTML = filteredCmdItems.map((item, idx) => `
        <div role="option" id="cmd-opt-${idx}" aria-selected="${idx === 0 ? 'true' : 'false'}" data-cmd-idx="${idx}" class="cmd-item-link flex items-center justify-between p-3 rounded-xl transition-colors cursor-pointer">
          <span class="text-xs sm:text-sm font-medium">${item.label}</span>
          <span class="font-mono-kicker text-[9px] text-teal-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 shrink-0 ml-2">${item.tag}</span>
        </div>
      `).join('');

      updateCmdHighlight();

      cmdList.querySelectorAll('[role="option"]').forEach((opt, idx) => {
        opt.addEventListener('mouseenter', () => {
          activeCmdIndex = idx;
          updateCmdHighlight();
        });
        opt.addEventListener('click', () => {
          executeCmdItem(filteredCmdItems[idx]);
        });
      });
    }

    openCmdBtn.addEventListener('click', () => openCmdPalette(openCmdBtn));
    document.getElementById('closeCmdPaletteBtn').addEventListener('click', closeCmdPalette);
    cmdInput.addEventListener('input', (e) => renderCmdList(e.target.value));

    // Full Keyboard Navigation inside Quick Search (Fixes QA-02: Down/Up arrows + Enter activates result + Escape restores focus)
    cmdInput.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (filteredCmdItems.length > 0) {
          activeCmdIndex = (activeCmdIndex + 1) % filteredCmdItems.length;
          updateCmdHighlight();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (filteredCmdItems.length > 0) {
          activeCmdIndex = (activeCmdIndex - 1 + filteredCmdItems.length) % filteredCmdItems.length;
          updateCmdHighlight();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCmdItems.length > 0) {
          executeCmdItem(filteredCmdItems[activeCmdIndex]);
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeCmdPalette();
      }
    });

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCmdPalette(document.activeElement);
      } else if (e.key === 'Escape') {
        if (!cmdModal.classList.contains('hidden')) {
          closeCmdPalette();
        }
        const cModal = document.getElementById('caseModal');
        if (!cModal.classList.contains('hidden')) {
          cModal.classList.add('hidden');
          cModal.classList.remove('flex');
        }
      }
    });

    // =========================================================================
    // 9. SCROLL PROGRESS, SPINNING REELS & SCENE COUNTER TELEMETRY
    // =========================================================================
    const progressBar = document.getElementById('progressBar');
    const reelLeft = document.getElementById('reelLeft');
    const reelRight = document.getElementById('reelRight');
    const sceneCounterNum = document.getElementById('sceneCounterNum');
    const sceneCounterLabel = document.getElementById('sceneCounterLabel');
    const sceneSections = document.querySelectorAll('section[data-scene]');

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      progressBar.style.width = pct + '%';

      const angle = scrollTop * 0.35;
      reelLeft.style.transform = `rotate(${angle}deg)`;
      reelRight.style.transform = `rotate(${-angle}deg)`;

      let activeNum = '01';
      let activeName = 'Hero';
      sceneSections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          activeNum = sec.getAttribute('data-scene');
          activeName = sec.getAttribute('data-scene-name');
        }
      });
      sceneCounterNum.textContent = activeNum;
      sceneCounterLabel.textContent = '/ ' + activeName;
    }, { passive: true });

    // =========================================================================
    // 10. ONE-CLICK COPY EMAIL & PHONE HANDLERS
    // =========================================================================
    function copyTextWithFeedback(text, labelEl, originalText) {
      playClickTone(700);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }
      labelEl.textContent = 'Copied ✓';
      setTimeout(() => { labelEl.textContent = originalText; }, 2000);
    }

    function fallbackCopy(val) {
      const ta = document.createElement('textarea');
      ta.value = val;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
    }

    document.getElementById('heroCopyEmailBtn').addEventListener('click', () => {
      copyTextWithFeedback('mazher.khaja313@outlook.co.nz', document.getElementById('heroCopyEmailLabel'), 'Copy Email');
    });
    document.getElementById('footerCopyEmailBtn').addEventListener('click', () => {
      copyTextWithFeedback('mazher.khaja313@outlook.co.nz', document.getElementById('footerEmailLabel'), 'Copy Email Address');
    });
    document.getElementById('footerCopyPhoneBtn').addEventListener('click', () => {
      copyTextWithFeedback('+64 211 842 439', document.getElementById('footerPhoneLabel'), '+64 211 842 439');
    });

    // Executive CV Modal & Direct Download Handler (REC-01)
    const cvPreviewModal = document.getElementById('cvPreviewModal');
    function openCvModal() {
      playClickTone(640);
      cvPreviewModal.classList.remove('hidden');
      cvPreviewModal.classList.add('flex');
      document.getElementById('closeCvModalBtn').focus();
    }
    function closeCvModal() {
      cvPreviewModal.classList.add('hidden');
      cvPreviewModal.classList.remove('flex');
    }
    document.querySelectorAll('.download-cv-trigger').forEach(btn => {
      btn.addEventListener('click', openCvModal);
    });
    document.getElementById('closeCvModalBtn').addEventListener('click', closeCvModal);
    document.getElementById('printCvSummaryBtn').addEventListener('click', () => window.print());
    document.getElementById('directPdfDownloadBtn').addEventListener('click', () => {
      const pdfFile = 'Mazher_' + 'Hussain_Executive_Master_CV.pdf';
      const link = document.createElement('a');
      link.href = pdfFile;
      link.download = pdfFile;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });