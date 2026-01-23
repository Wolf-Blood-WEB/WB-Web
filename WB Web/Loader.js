let scene, camera, renderer, points, animationId;
const galaxyColors = [
    new THREE.Color(0x0d1b2a),
    new THREE.Color(0x1b263b),
    new THREE.Color(0x415a77),
    new THREE.Color(0x63b3ed)
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
        console.error("THREE.js hatası:", e);
        const canvas = document.getElementById('galaxy-bg');
        if (canvas) canvas.style.backgroundColor = "#1a202c";
    }
}

function animateGalaxy() {
    if (renderer && document.getElementById('galaxy-bg')) {
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
    if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        renderer = null;
    }
    window.removeEventListener('resize', onWindowResize, false);
}

function baslatLoader() {
    if (document.getElementById("loader")) return;

    const loader = document.createElement("div");
    loader.id = "loader";
    loader.style.opacity = "1"; 
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
    
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
        contentWrapper.classList.remove('visible');
    }

    const loadingText = document.getElementById("loading-text");
    const hintButton = document.getElementById("hint-button");

    initGalaxy();
    animateGalaxy();

    const hintKeys = [
        "loader_hint_1", "loader_hint_2", "loader_hint_3", "loader_hint_4", 
        "loader_hint_5", "loader_hint_6", "loader_hint_7", "loader_hint_8", 
        "loader_hint_9", "loader_hint_10", "loader_hint_11", "loader_hint_12", 
        "loader_hint_13", "loader_hint_14", "loader_hint_15", "loader_hint_16", 
        "loader_hint_17", "loader_hint_18", "loader_hint_19", "loader_hint_20", 
        "loader_hint_21", "loader_hint_22", "loader_hint_23", "loader_hint_24", 
        "loader_hint_25", "loader_hint_26", "loader_hint_27", "loader_hint_28", 
        "loader_hint_29", "loader_hint_30", "loader_hint_31", "loader_hint_32", 
        "loader_hint_33", "loader_hint_35", "loader_hint_36", "loader_hint_37", 
        "loader_hint_38", "loader_hint_39", "loader_hint_40", "loader_hint_41", 
        "loader_hint_42", "loader_hint_43", "loader_hint_44", "loader_hint_45", 
        "loader_hint_46", "loader_hint_47", "loader_hint_48", "loader_hint_49", 
        "loader_hint_50", "loader_hint_51", "loader_hint_52", "loader_hint_53", 
        "loader_hint_54", "loader_hint_55"
    ];

    let loaderTranslations = {};
    const currentLang = localStorage.getItem('lang') || 'en';

    const showNewHint = (e) => {
        if (e) e.preventDefault();
        const randomKey = hintKeys[Math.floor(Math.random() * hintKeys.length)];
        if (loaderTranslations[randomKey]) {
            hintButton.textContent = loaderTranslations[randomKey];
        } else {
            hintButton.textContent = "..."; 
        }
    };

    fetch(`./Languages/${currentLang}.json`)
        .then(response => {
            if (!response.ok) throw new Error("Lang file not found");
            return response.json();
        })
        .then(data => {
            loaderTranslations = data;
            if (hintButton.textContent === "..." || hintButton.textContent === "Click for a hint...") {
                showNewHint();
            }
        })
        .catch(err => {
            console.error("Loader translation fetch failed:", err);
            hintButton.textContent = "Loading..."; 
        });

    hintButton.addEventListener('click', showNewHint);

    let progress = 0;
    const fakeProgress = setInterval(() => {
        if (progress < 90) {
            progress += Math.random() * 1.5;
            loadingText.textContent = `Loading... ${Math.floor(progress)}%`;
        }
    }, 350);
        
    function finishLoading() {
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
    }

    if (document.readyState === "complete") {
        setTimeout(finishLoading, 1000); 
    } else {
        window.addEventListener("load", finishLoading, { once: true });
    }
}

document.addEventListener("DOMContentLoaded", baslatLoader);
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        stopGalaxy();
        const oldLoader = document.getElementById("loader");
        if(oldLoader) oldLoader.remove();
        baslatLoader();
    }
});