(function () {
    // 1. CONFIGURATION & DATE CALCULATIONS
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const currentYear = today.getFullYear();

    // --- DEBUGGING / MANUAL OVERRIDE ---
    const forceChristmas = false; 
    const forceHalloween = false;
    const forceRamadan   = false;
    const forceLunar     = false;
    const forceEaster    = false; 

    // --- DATE RANGES ---
    
    // 1. Christmas: Dec 1 to Jan 15
    const isChristmas = (month === 12) || (month === 1 && day <= 15);
    // 2. Halloween: Oct 20 to Nov 1
    const isHalloween = (month === 10 && day >= 20) || (month === 11 && day <= 1);
    // 3. Ramadan (2026 Estimate: Feb 17 - Mar 19)
    const isRamadan = (month === 2 && day >= 17) || (month === 3 && day <= 19);
    // 4. Lunar New Year (2026: Feb 17 - Year of Horse)
    const isLunar = (month === 2 && day >= 10 && day <= 25);
    // 5. Easter/Pascalya (2026: ~April 5)
    const isEaster = (month === 3 && day >= 25) || (month === 4 && day <= 15);

    // 2. THEME DISPATCHER (The Traffic Controller)
    
    if (forceChristmas || isChristmas) {
        initWinterTheme();
    } 
    else if (forceHalloween || isHalloween) {
        initHalloweenTheme();
    }
    else if (forceRamadan || isRamadan) {
        initRamadanTheme();
    }
    else if (forceLunar || isLunar) {
        initLunarTheme();
    }
    else if (forceEaster || isEaster) {
        initEasterTheme();
    }
    else {
        console.log("🐺 Standard Wolf Blood Protocol Active (No Holiday)");
    }

    // 3. THEME FUNCTIONS

    // --- WINTER / CHRISTMAS ---
    function initWinterTheme() {
        console.log("🎅 Winter Protocol: Full Synchronization ❄️");
        document.body.classList.add('theme-christmas');
        injectCSS(`
            body.theme-christmas {
                background-image: radial-gradient(circle at center, rgba(192, 57, 43, 0.15) 0%, transparent 80%), url('https://www.transparenttextures.com/patterns/dark-forest.png') !important;
                --theme-primary: #a2d9ff; /* Ice Blue */
                --theme-secondary: #ffb3b3; /* Soft Red */
                --theme-glow: #e74c3c;
            }
            body.theme-christmas .personel-resim-wrapper::after {
                content: "";
                background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Santa_Claus_hat_icon.svg/512px-Santa_Claus_hat_icon.svg.png');
                background-size: contain; background-repeat: no-repeat;
                width: 60px; height: 60px; position: absolute; top: -25px; right: -15px; transform: rotate(15deg); z-index: 20;
            }
            /* Pulse Animation specific to Christmas */
            @keyframes christmasPulse {
                0% { border-color: #e74c3c; box-shadow: 0 0 10px rgba(231, 76, 60, 0.4); }
                50% { border-color: #89cff0; box-shadow: 0 0 15px rgba(137, 207, 240, 0.6); }
                100% { border-color: #e74c3c; box-shadow: 0 0 10px rgba(231, 76, 60, 0.4); }
            }
            body.theme-christmas .tab-button, body.theme-christmas .button-container button {
                animation: christmasPulse 4s infinite ease-in-out !important;
                border: 2px solid var(--theme-primary) !important;
            }
            body.theme-christmas .update-title::before { content: "🎁 "; }
        `);
        createSnowLayer('https://www.transparenttextures.com/patterns/snow.png');
        startFallingItems(["❄️"]);
    }

    // --- HALLOWEEN ---
    function initHalloweenTheme() {
        console.log("🎃 Spooky Protocol: Halloween Mode 👻");
        document.body.classList.add('theme-halloween');
        injectCSS(`
            body.theme-halloween {
                background-image: radial-gradient(circle at center, rgba(230, 126, 34, 0.1) 0%, transparent 90%), url('https://www.transparenttextures.com/patterns/black-scales.png') !important;
                --theme-primary: #e67e22; /* Pumpkin Orange */
                --theme-secondary: #8e44ad; /* Witch Purple */
                --theme-glow: #d35400;
                font-family: 'Courier New', courier, monospace; /* Creepier font fallback */
            }
            /* Witch Hat for Profile */
            body.theme-halloween .personel-resim-wrapper::after {
                content: "";
                background-image: url('https://cdn-icons-png.flaticon.com/512/1055/1055668.png'); /* Witch Hat */
                background-size: contain; background-repeat: no-repeat;
                width: 65px; height: 65px; position: absolute; top: -30px; left: -15px; z-index: 20;
            }
            @keyframes spookPulse {
                0% { box-shadow: 0 0 5px #e67e22; border-color: #e67e22; }
                50% { box-shadow: 0 0 20px #8e44ad; border-color: #8e44ad; }
                100% { box-shadow: 0 0 5px #e67e22; border-color: #e67e22; }
            }
            body.theme-halloween .tab-button, body.theme-halloween .button-container button {
                animation: spookPulse 3s infinite alternate !important;
                border: 2px solid var(--theme-primary) !important;
                color: #ffdab9 !important;
            }
            body.theme-halloween .update-title::before { content: "🕷️ "; }
        `);
        startFallingItems(["🎃", "👻", "🦇", "🕸️"]);
    }

    // --- RAMADAN ---
    function initRamadanTheme() {
        console.log("🌙 Ramadan Protocol: Night Mode 🕌");
        document.body.classList.add('theme-ramadan');
        injectCSS(`
            body.theme-ramadan {
                background-image: radial-gradient(circle at center, rgba(241, 196, 15, 0.1) 0%, transparent 80%), url('https://www.transparenttextures.com/patterns/arabesque.png') !important;
                --theme-primary: #f1c40f; /* Gold */
                --theme-secondary: #191970; /* Midnight Blue */
                --theme-glow: #ffffff;
            }
            /* Crescent Moon for Profile */
            body.theme-ramadan .personel-resim-wrapper::after {
                content: "🌙";
                font-size: 40px;
                position: absolute; top: -25px; right: -10px; z-index: 20;
                filter: drop-shadow(0 0 5px gold);
            }
            @keyframes ramadanGlow {
                0% { box-shadow: 0 0 10px #f1c40f; border-color: #f1c40f; }
                50% { box-shadow: 0 0 20px #ffffff; border-color: #ffffff; }
                100% { box-shadow: 0 0 10px #f1c40f; border-color: #f1c40f; }
            }
            body.theme-ramadan .tab-button, body.theme-ramadan .button-container button {
                animation: ramadanGlow 5s infinite ease-in-out !important;
                border: 2px solid var(--theme-primary) !important;
                background-color: rgba(25, 25, 112, 0.6) !important;
            }
            body.theme-ramadan .update-title::before { content: "🕌 "; }
        `);
        startFallingItems(["🌙", "✨", "🏮"]);
    }

    // --- LUNAR NEW YEAR ---
    function initLunarTheme() {
        console.log("🐉 Lunar Protocol: Red & Gold 🧧");
        document.body.classList.add('theme-lunar');
        injectCSS(`
            body.theme-lunar {
                background-image: url('https://www.transparenttextures.com/patterns/shippo.png') !important;
                background-color: #2c0a0a; /* Dark Red BG */
                --theme-primary: #e74c3c; /* Red */
                --theme-secondary: #f1c40f; /* Gold */
                --theme-glow: #e67e22;
            }
            /* Dragon Icon for Profile */
            body.theme-lunar .personel-resim-wrapper::after {
                content: "";
                background-image: url('https://cdn-icons-png.flaticon.com/512/1973/1973945.png'); /* Dragon/Lantern */
                background-size: contain; background-repeat: no-repeat;
                width: 60px; height: 60px; position: absolute; top: -25px; right: -15px; z-index: 20;
            }
            @keyframes lunarPulse {
                0% { box-shadow: 0 0 5px #e74c3c; border-color: #f1c40f; }
                50% { box-shadow: 0 0 25px #f1c40f; border-color: #e74c3c; }
                100% { box-shadow: 0 0 5px #e74c3c; border-color: #f1c40f; }
            }
            body.theme-lunar .tab-button, body.theme-lunar .button-container button {
                animation: lunarPulse 2s infinite !important;
                border: 2px solid var(--theme-secondary) !important;
                background-color: rgba(139, 0, 0, 0.6) !important;
            }
            body.theme-lunar .update-title::before { content: "🐉 "; }
        `);
        startFallingItems(["🧧", "🧨", "🐉", "🏮"]);
    }

    // --- EASTER / PASCALYA ---
    function initEasterTheme() {
        console.log("🐰 Easter Protocol: Spring Awakening 🥚");
        document.body.classList.add('theme-easter');
        injectCSS(`
            body.theme-easter {
                background-image: radial-gradient(circle at center, rgba(46, 204, 113, 0.15) 0%, transparent 80%), url('https://www.transparenttextures.com/patterns/flowers.png') !important;
                --theme-primary: #2ecc71; /* Spring Green */
                --theme-secondary: #fd79a8; /* Pink */
                --theme-glow: #f1c40f;
            }
            /* Bunny Ears for Profile */
            body.theme-easter .personel-resim-wrapper::after {
                content: "";
                background-image: url('https://cdn-icons-png.flaticon.com/512/3069/3069174.png'); 
                background-size: contain; background-repeat: no-repeat;
                width: 70px; height: 70px; position: absolute; top: -35px; left: -10px; z-index: 20;
                filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.4));
            }
            @keyframes springPulse {
                0% { border-color: var(--theme-primary); box-shadow: 0 0 10px rgba(46, 204, 113, 0.4); }
                50% { border-color: var(--theme-secondary); box-shadow: 0 0 15px rgba(253, 121, 168, 0.6); }
                100% { border-color: var(--theme-primary); box-shadow: 0 0 10px rgba(46, 204, 113, 0.4); }
            }
            body.theme-easter .tab-button, body.theme-easter .button-container button {
                animation: springPulse 3s infinite ease-in-out !important;
                border: 2px solid var(--theme-primary) !important;
            }
            body.theme-easter .update-title::before { content: "🥚 "; }
        `);
        startFallingItems(["🌸", "🥚", "🌱", "🐇"]);
    }

    // 4. SHARED UTILITIES

    function injectCSS(cssContent) {
        const style = document.createElement('style');
        style.innerHTML = cssContent;
        document.head.appendChild(style);
    }

    function createSnowLayer(imgUrl) {
        const bg = document.createElement('div');
        Object.assign(bg.style, {
            position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
            backgroundImage: `url('${imgUrl}')`, opacity: '0.5', pointerEvents: 'none', zIndex: '9997',
            animation: 'snowFallBG 20s linear infinite'
        });        
        const kf = document.createElement('style');
        kf.innerHTML = `@keyframes snowFallBG { from { background-position: 0 0; } to { background-position: 0 500px; } }`;
        document.head.appendChild(kf);
        document.body.appendChild(bg);
    }
    function startFallingItems(items) {
        const container = document.createElement('div');
        Object.assign(container.style, {
            position: 'fixed', top: '0', left: '0',
            width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: '9998'
        });
        document.body.appendChild(container);
        const count = 25;
        const emojis = Array.isArray(items) ? items : [items];

        const animStyle = document.createElement('style');
        animStyle.innerHTML = `
            @keyframes universalFall {
                0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
                100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(animStyle);

        for (let i = 0; i < count; i++) {
            const flake = document.createElement('div');
            flake.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            
            const size = Math.random() * 1.5 + 1 + 'rem';
            const startLeft = Math.random() * 100 + 'vw';
            const duration = Math.random() * 5 + 8 + 's';
            const delay = Math.random() * 5 + 's';
            
            Object.assign(flake.style, {
                position: 'fixed', top: '-10%', left: startLeft,
                fontSize: size, opacity: Math.random() * 0.6 + 0.4,
                animation: `universalFall ${duration} linear infinite`,
                animationDelay: delay,
                textShadow: '0 0 5px rgba(255,255,255,0.5)'
            });            
            container.appendChild(flake);
        }
    }
})();
