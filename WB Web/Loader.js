let scene, camera, renderer, points, animationId;
const galaxyColors = [
    new THREE.Color(0x0d1b2a),
    new THREE.Color(0x1b263b),
    new THREE.Color(0x415a77),
    new THREE.Color(0x63b3ed)
];
function initGalaxy() {
    try {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        const canvas = document.getElementById('galaxy-bg');
        if (!canvas) return;

        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x1a202c, 1);

        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const particleCount = 10000;

        for (let i = 0; i < particleCount; i++) {
            positions.push((Math.random() - 0.5) * 200);
            positions.push((Math.random() - 0.5) * 200);
            positions.push((Math.random() - 0.5) * 200);

            const color = galaxyColors[Math.floor(Math.random() * galaxyColors.length)];
            colors.push(color.r, color.g, color.b);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        });

        points = new THREE.Points(geometry, material);
        scene.add(points);

        window.addEventListener('resize', onWindowResize, false);
    } catch (e) {
        console.error("THREE.js animasyonu başlatılamadı. Kütüphane HTML'de mi?", e);
        const canvas = document.getElementById('galaxy-bg');
        if (canvas) canvas.style.backgroundColor = "#1a202c";
    }
}
function animateGalaxy() {
    if (renderer) {
        animationId = requestAnimationFrame(animateGalaxy);
        if (points) {
            points.rotation.y += 0.0002;
            points.rotation.x += 0.0001;
        }
        renderer.render(scene, camera);
    }
}
function onWindowResize() {
    if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
function stopGalaxy() {
    if (animationId) cancelAnimationFrame(animationId);
    if (points) {
        try {
            points.geometry.dispose();
            points.material.dispose();
            scene.remove(points);
        } catch (e) { }
    }
    if (renderer) renderer.dispose();
    window.removeEventListener('resize', onWindowResize, false);
}

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.createElement("div");
    loader.id = "loader";
    loader.innerHTML = `
        <canvas id="galaxy-bg"></canvas>
        <div class="loader-content">
            <div class="loader-circle">
                <img src="image/WB.jpg" class="loader-logo" alt="Wolfblood Logo">
            </div>
            <p id="loading-text">Loading... 0%</p>
            <button id="hint-button">Click for a hint...</button>
        </div>
    `;
    document.body.prepend(loader);
    const loadingText = document.getElementById("loading-text");
    const hintButton = document.getElementById("hint-button");
    const contentWrapper = document.querySelector('.content-wrapper');

    initGalaxy();
    animateGalaxy();

    const hints = [
        "💡 Hint: Trust no one. Especially the quiet ones...",
        "🐺 Hint: Wolves always hunt together. Don't leave the pack.",
        "👁️ Hint: Someone is watching you tonight... Are they a friend, or a foe?",
        "🔮 Hint: What the Seer sees might only be a piece of the truth.",
        "🌙 Hint: The silence of the night hides the darkest secrets...",
        "💡 Hint: The loudest one in the group often has the most to hide.",
        "🗳️ Hint: When the lynch vote is over, it's not always just one person who dies...",
        "🕊️ Hint: Even the most innocent-looking player can hide a dark secret.",
        "🥀 Hint: A village divided will surely fall. Stick together.",
        "🧑‍💻 Hint: Main DEV knows only coding. He can't see the roles in the game, or can he?",
        "🦇 Hint: A Bat never sleep. They always watching you!",
        "👺 Hint: Not everyone fears the lynch. Some... desire it.",
        "💋 Hint: Being out at night is dangerous. The house you visit might be your last.",
        "🔪 Hint: Wolves aren't the only problem. Some just want to watch the village burn.",
        "👤 Hint: A single whisper can convert the most loyal villager. The cult grows in silence.",
        "⚡️ Hint: A wolf's bite doesn't always mean death. Sometimes... it means family.",
        "🔥 Hint: Some don't hunt. They just wait for the perfect moment... to set everyone ablaze.",
        "💂 Hint: There's a hunter in the village, but they aren't looking for wolves... they're looking for the converted.",
        "🔫 Hint: Justice isn't always decided by a vote. Sometimes, a bullet is faster.",
        "🍻 Hint: Even the village Drunk serves a purpose... especially as a bad meal for the wolves.",
        "👑 Hint: Some blood is too royal to be spilled by the mob. The lynch will fail.",
        "🎭 Hint: Some are born with no identity, only to steal the fate of another.",
        "🛡️ Hint: The best defense is sometimes a sacrifice. Your guardian may die, but you will live.",
        "🐺🌝 Hint: The enemy sometimes wears the face of a friend. Don't even trust the Seer's vision.",
        "☃️ Hint: A freezing cold is creeping in... Some won't wake up, and some will just be... frozen.",
        "🧑‍⚕️ Hint: Death is not always permanent. The Doctor may be near.",
        "⛏️ Hint: The paths are confusing tonight. Your visit might not land where you expect...",
        "🦸‍♂ Hint: Justice is different today. The crowd can only vote 'Yes' or 'No'.",
        "🧪 Hint: Don't accept every potion offered. Some bring life, others bring poison.",
        "🦜 Hint: Some secrets are revealed even in death. The Snitch's last words are always revealing.",
        "✨ Hint: Watch the vote! The one with the fewest votes might be the one who dies...",
        "🪄 Hint: If you lynch an Illusionist, you might just drag an innocent soul to the grave with them.",
        "😈 Hint: Don't get too comfortable with your powers. You might wake up as a simple Villager.",
        "😵‍💫 Hint: You have only one goal: get them lynched. At any cost."
    ];

    let progress = 0;
    let hintsShown = false;

    const showNewHint = (e) => {
        if (e) e.preventDefault();
        const randomHint = hints[Math.floor(Math.random() * hints.length)];
        hintButton.textContent = randomHint;
    };
    showNewHint();
    hintButton.addEventListener('click', showNewHint);
    const fakeProgress = setInterval(() => {
        if (progress < 100) {
            progress += Math.random() * 1.5;
            loadingText.textContent = `Loading... ${Math.floor(progress)}%`;
        }
    }, 350);

    window.addEventListener("load", () => {
        clearInterval(fakeProgress);
        loadingText.textContent = `Loading... 100%`;
        if (contentWrapper) {
            contentWrapper.classList.add('visible');
        }
        setTimeout(() => {
            if (loader) {
                loader.style.opacity = "0";
                setTimeout(() => {
                    loader.remove();
                    stopGalaxy();
                }, 800);
            }
        }, 600);

        hintsShown = true;
    });

    setTimeout(() => {
        if (hintsShown === false) {
            hintsShown = true;
            let i = 0;
            const showHintInterval = setInterval(() => {
                // GÜVENLİK: Butonun hala var olduğunu kontrol et
                if (i < hints.length && hintButton && loader.style.opacity !== "0") {
                    hintButton.style.opacity = 1;
                    hintButton.textContent = hints[i++];
                } else {
                    clearInterval(showHintInterval);
                }
            }, 5000);
        }
    }, 30000);


    /*
    // --- SAYFADAN AYRILIRKEN (LİNKE TIKLANDIĞINDA) ---
    // DÜZELTME: Bu bölüm, masaüstünde (file:///) sayfa geçişlerini
    // engellediği için yorum satırı haline getirildi.
    // Artık <nav> linkleri normal şekilde çalışacak.
    
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || href === '#' || href.startsWith('#') || link.target === '_blank') {
                return;
            }
            e.preventDefault();
            
            let loader = document.getElementById('loader');
            if (loader) {
                loader.style.opacity = "1";
            } else {
                // Eğer loader yoksa (ki bu olmamalı), 
                // güvenli olarak linke git
                window.location.href = href;
                return;
            }
            
            setTimeout(() => {
                window.location.href = href;
            }, 500);
        });
    });
    */
});