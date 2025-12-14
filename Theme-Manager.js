(function () {
    const forceChristmas = true;

    const today = new Date();
    const month = today.getMonth() + 1;

    if (month === 12 || forceChristmas) {
        initWinterTheme();
    }
    function initWinterTheme() {
        console.log("🎅 Winter Protocol: Double Snow & Hats ❄️");
        document.body.classList.add('theme-christmas');
        const style = document.createElement('style');
        style.innerHTML = `
            body.theme-christmas {
                background-image: 
                    radial-gradient(circle at center, rgba(192, 57, 43, 0.15) 0%, transparent 80%),
                    url('https://www.transparenttextures.com/patterns/dark-forest.png') !important;
                
                --ice-blue: #a2d9ff;
                --ice-mint: #a2ffc2; 
                --ice-rose: #ffb3b3; 
            }
            body.theme-christmas .update-card,
            body.theme-christmas .group-link,
            body.theme-christmas .group-link-rules,
            body.theme-christmas nav a {
                border: 2px solid var(--ice-blue) !important;
                border-radius: 12px;
                box-shadow: 0 0 15px rgba(162, 217, 255, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.1) !important;
                position: relative;
                overflow: hidden;
            }
            body.theme-christmas .update-card::before,
            body.theme-christmas .group-link::before {
                content: "";
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: url('https://www.transparenttextures.com/patterns/snow.png');
                opacity: 0.15;
                pointer-events: none;
                z-index: 1;
            }
            body.theme-christmas .update-card:hover {
                border-color: #ffffff !important;
                box-shadow: 0 0 25px rgba(162, 217, 255, 0.9) !important;
            }
            body.theme-christmas .update-title::before,
            body.theme-christmas .update-card h3::before { content: "🎁 "; }
            body.theme-christmas .personel-resim-wrapper {
                position: relative; 
                overflow: visible !important; 
            }            
            body.theme-christmas .personel-resim-wrapper::after {
                content: "";
                background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Santa_Claus_hat_icon.svg/512px-Santa_Claus_hat_icon.svg.png');
                background-size: contain;
                background-repeat: no-repeat;                
                width: 60px;
                height: 60px;                
                position: absolute;
                top: -25px;
                right: -15px;
                left: auto;                
                transform: rotate(15deg);
                z-index: 20;
                filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.6));
            }
            body.theme-christmas .kadir-card .flip-card-front,
            body.theme-christmas .kadir-card .flip-card-back {
                animation: none !important;
                border-color: var(--ice-mint) !important;
                box-shadow: 0 0 15px var(--ice-mint), inset 0 0 10px var(--ice-mint) !important;
                background-color: rgba(0, 20, 0, 0.6) !important; 
            }
            body.theme-christmas .kadir-card .personel-unvan {
                color: var(--ice-mint) !important;
                text-shadow: 0 0 5px var(--ice-mint);
            }
            body.theme-christmas .ismet-card .flip-card-front,
            body.theme-christmas .ismet-card .flip-card-back {
                animation: none !important;
                border-color: var(--ice-rose) !important;
                box-shadow: 0 0 15px var(--ice-rose), inset 0 0 10px var(--ice-rose) !important;
                background-color: rgba(20, 0, 0, 0.6) !important;
            }
            body.theme-christmas .ismet-card .personel-unvan {
                color: var(--ice-rose) !important;
                text-shadow: 0 0 5px var(--ice-rose);
            }
            .snow-layer-bg {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background-image: url('https://www.transparenttextures.com/patterns/snow.png');
                animation: snowFallBG 20s linear infinite;
                opacity: 0.5;
                pointer-events: none;
                z-index: 9997; /* Behind the emojis */
            }
            @keyframes snowFallBG {
                from { background-position: 0 0; }
                to { background-position: 0 500px; }
            }
            .snowflake {
                position: fixed;
                top: -10%;
                z-index: 9999; /* In front of everything */
                user-select: none;
                pointer-events: none;
                cursor: default;
                animation-name: fall;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
            }
            @keyframes fall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
            }
            @media (max-width: 768px) {
                body.theme-christmas .personel-resim-wrapper::after {
                    width: 50px;
                    height: 50px;
                    top: -20px;
                    right: -10px;
                }
            }
        `;
        document.head.appendChild(style);
        const bgSnow = document.createElement('div');
        bgSnow.className = 'snow-layer-bg';
        document.body.appendChild(bgSnow);
        startEmojiSnowfall();
    }

    function startEmojiSnowfall() {
        const snowContainer = document.createElement('div');
        Object.assign(snowContainer.style, {
            position: 'fixed', top: '0', left: '0',
            width: '100%', height: '100%',
            pointerEvents: 'none', zIndex: '9998'
        });
        document.body.appendChild(snowContainer);

        const snowflakeCount = 20;
        for (let i = 0; i < snowflakeCount; i++) {
            createFlake(snowContainer);
        }
    }

    function createFlake(container) {
        const flake = document.createElement('div');
        flake.innerHTML = "❄️";
        flake.className = 'snowflake';

        const size = Math.random() * 1.2 + 0.5 + 'rem';
        const startLeft = Math.random() * 100 + 'vw';
        const duration = Math.random() * 5 + 8 + 's';
        const delay = Math.random() * 5 + 's';

        flake.style.fontSize = size;
        flake.style.left = startLeft;
        flake.style.animationDuration = duration;
        flake.style.animationDelay = delay;
        flake.style.opacity = Math.random() * 0.6 + 0.4;
        flake.style.color = "#ffffff";
        flake.style.textShadow = "0 0 5px #89cff0";

        container.appendChild(flake);
    }
})();