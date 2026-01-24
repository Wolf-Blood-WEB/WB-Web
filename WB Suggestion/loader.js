let scene, camera, renderer, points, animationId;
const galaxyColors = [
    new THREE.Color(0x8a0303),
    new THREE.Color(0x2a0a0a),
    new THREE.Color(0xd4af37),
    new THREE.Color(0x121212)
];
const wolfHints = [
    "Tip: The Blood Mage can sacrifice cult rate for power.",
    "Tip: Trust no one, especially not the Alpha.",
    "Tip: Dead players tell no tales... unless they are Ghouls.",
    "Tip: Check the 'Test Designs' page for experimental roles.",
    "Tip: Upvoting roles helps the developers decide what to add.",
    "Tip: The moon is full tonight...",
    "Tip: Managing your Cult Rate is key to survival.",
    "Tip: Submit your own crazy ideas in the suggestion box."
];
function initGalaxy() {
    try {
        const canvas = document.getElementById('galaxy-bg');
        if (!canvas) return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);

        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const particleCount = 2000;

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
            size: 0.5,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        });

        points = new THREE.Points(geometry, material);
        scene.add(points);

        window.addEventListener('resize', onWindowResize, false);
    } catch (e) {
        console.error("Three.js init failed:", e);
    }
}
function animateGalaxy() {
    if (renderer && document.getElementById('galaxy-bg')) {
        animationId = requestAnimationFrame(animateGalaxy);
        if (points) {
            points.rotation.y += 0.0005;
            points.rotation.x += 0.0002;
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
    if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        renderer = null;
    }
    window.removeEventListener('resize', onWindowResize, false);
}
function baslatLoader(mode = 'load') {
    if (document.getElementById("loader")) return;

    const loader = document.createElement("div");
    loader.id = "loader";
    loader.style.opacity = "1";

    loader.innerHTML = `
        <canvas id="galaxy-bg"></canvas>
        <div class="loader-content">
            <div class="loader-circle">
                <img src="WB-Idea.jpg" class="loader-logo" alt="Wolf Blood Logo">
            </div>
            <p id="loading-text">Summoning Pack... 0%</p>
            <button id="hint-button">Read the runes...</button>
        </div>
    `;

    document.body.prepend(loader);

    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.classList.remove('visible');
    }

    if (typeof THREE !== 'undefined') {
        initGalaxy();
        animateGalaxy();
    }

    const hintButton = document.getElementById("hint-button");
    const showNewHint = () => {
        const randomHint = wolfHints[Math.floor(Math.random() * wolfHints.length)];
        hintButton.textContent = randomHint;
    };
    showNewHint();
    hintButton.addEventListener('click', (e) => {
        e.preventDefault();
        showNewHint();
    });

    const loadingText = document.getElementById("loading-text");
    let progress = 0;

    const fakeProgress = setInterval(() => {
        if (mode === 'nav') {
            if (progress < 99) {
                progress += Math.random() * 5;
                if (progress > 99) progress = 99;
                loadingText.textContent = `Traveling Void... ${Math.floor(progress)}%`;
            }
        } else {
            if (progress < 30) progress += Math.random() * 2;
            else if (progress < 70) progress += Math.random() * 0.5;
            else if (progress < 99) progress += Math.random() * 0.1;
            if (progress >= 99) progress = 99;

            loadingText.textContent = `Summoning Pack... ${Math.floor(progress)}%`;
        }
    }, 50);

    window.wbFinishLoader = function () {
        clearInterval(fakeProgress);
        loadingText.textContent = `Summoning Pack... 100%`;

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
        }, 500);
    };
}

document.addEventListener("DOMContentLoaded", () => baslatLoader('load'));

window.addEventListener("load", () => {
    if (window.wbFinishLoader) window.wbFinishLoader();
});

if (document.readyState === "complete") {
    setTimeout(() => {
        if (window.wbFinishLoader) window.wbFinishLoader();
    }, 1000);
}

window.addEventListener('pageshow', function (event) {
    if (event.persisted) {
        stopGalaxy();
        const oldLoader = document.getElementById("loader");
        if (oldLoader) oldLoader.remove();
        baslatLoader('load');
        setTimeout(() => {
            if (window.wbFinishLoader) window.wbFinishLoader();
        }, 500);
    }
});

document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && link.target !== "_blank" &&
        link.origin === window.location.origin &&
        !link.getAttribute('href').startsWith('#') &&
        !link.getAttribute('href').startsWith('mailto:')) {

        e.preventDefault();
        const oldLoader = document.getElementById("loader");
        if (oldLoader) oldLoader.remove();
        baslatLoader('nav');
        setTimeout(() => {
            window.location.href = link.href;
        }, 200);
    }
});