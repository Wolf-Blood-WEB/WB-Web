// --- 1. CONFIGURATION ---
const BOT_TOKEN = "null";
const CHAT_ID = "null";

// --- 2. MAIN EVENT LISTENER ---
document.addEventListener('DOMContentLoaded', () => {
    // A. TAB NAVIGATION
    const tabs = document.querySelectorAll('.nav-tab');
    if (tabs.length > 0) {
        tabs.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetId = button.getAttribute('data-target');
                if (targetId) openTab(targetId, e);
            });
        });
    }
    // B. FORM SUBMISSION
    const form = document.getElementById('suggestionForm');
    if (form) {
        form.addEventListener('submit', submitForm);
    }
    // C. UNIVERSAL MODAL LOGIC
    const triggers = document.querySelectorAll('.modal-trigger');
    triggers.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal-target');
            const modalToOpen = document.getElementById(modalId);
            if (modalToOpen) modalToOpen.style.display = 'flex';
        });
    });
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) modal.style.display = 'none';
        });
    });
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.style.display = 'none';
        });
    });
    const voteButtons = document.querySelectorAll('.vote-trigger');

    voteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const roleName = btn.getAttribute('data-vote-target');

            btn.disabled = true;
            btn.innerText = "⏳ Sending...";
            btn.style.backgroundColor = "#555";

            sendVoteToBot(roleName, btn);
        });
    });

});
function openTab(tabName, evt) {
    const contents = document.getElementsByClassName("tab-content");
    for (let content of contents) content.style.display = "none";
    const buttons = document.getElementsByClassName("nav-tab");
    for (let btn of buttons) btn.classList.remove("active");
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) selectedTab.style.display = "block";
    if (evt && evt.currentTarget) evt.currentTarget.classList.add("active");
}
function submitForm(e) {
    e.preventDefault();
    const name = document.getElementById("roleName").value;
    const category = document.getElementById("roleCategory").value;
    const ability = document.getElementById("roleAbility").value;

    if (!name || !ability) { alert("Please fill in all required fields!"); return; }

    const messageText = `🐺 New Role Proposal!\n\n📛 Name: ${name}\n📂 Category: ${category}\n🧩 Ability: ${ability}`;
    const finalUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(messageText)}`;

    fetch(finalUrl, { method: 'POST', mode: 'no-cors' })
        .then(() => {
            alert("✅ Suggestion sent to the Wolf Blood team!");
            document.getElementById("roleName").value = "";
            document.getElementById("roleAbility").value = "";
        })
        .catch(error => { console.error('Error:', error); alert("❌ Error connecting to Telegram."); });
}
function sendVoteToBot(roleName, btnElement) {
    const text = `🗳️ **VOTE ALERT**\n\nA visitor just voted for: **${roleName}**`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}&parse_mode=Markdown`;

    fetch(url, { method: 'POST', mode: 'no-cors' })
        .then(() => {
            btnElement.innerText = "✅ Voted!";
            btnElement.style.backgroundColor = "#4caf50";
        })
        .catch(err => {
            console.error("Vote Error:", err);
            btnElement.innerText = "❌ Error";
            btnElement.disabled = false;
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('bg-canvas');

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;

    const posArray = new Float32Array(particlesCount * 3);
    const sizeArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }

    for (let i = 0; i < particlesCount; i++) {
        sizeArray[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));

    const sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');

    const material = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x8a0303,
        transparent: true,
        opacity: 0.8,
        map: sprite,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);

    camera.position.z = 3;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = mouseY * 0.2;
        particlesMesh.rotation.y += mouseX * 0.2;

        material.size = 0.05 + Math.sin(elapsedTime * 2) * 0.01;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.002);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1200;
    const posArray = new Float32Array(particlesCount * 3);
    const sizeArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }
    for (let i = 0; i < particlesCount; i++) {
        sizeArray[i] = Math.random();
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));

    const sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png');
    const material = new THREE.PointsMaterial({
        size: 0.06,
        color: 0xffd700,
        transparent: true,
        opacity: 0.6,
        map: sprite,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);
    camera.position.z = 3;

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    const clock = new THREE.Clock();
    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();
        particlesMesh.rotation.y = elapsedTime * 0.03;
        particlesMesh.rotation.x = mouseY * 0.1;
        particlesMesh.rotation.y += mouseX * 0.1;
        material.size = 0.06 + Math.sin(elapsedTime * 1.5) * 0.01;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});

document.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('vote-trigger')) {
        const roleName = e.target.getAttribute('data-vote-target');
        alert("Tabletop Vote Recorded: " + roleName + "\n(This helps us decide what goes into the physical deck!)");
    }
    if (e.target.closest('.modal-trigger')) {
        const trigger = e.target.closest('.modal-trigger');
        const targetId = trigger.getAttribute('data-modal-target');
        const modal = document.getElementById(targetId);
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10);
        }
    }
    if (e.target.classList.contains('close-modal')) {
        const modal = e.target.closest('.modal-overlay');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    }
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('show');
        setTimeout(() => e.target.style.display = 'none', 300);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('bg-canvas');
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020202, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const sizeArray = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 25;
    }
    for (let i = 0; i < particlesCount; i++) {
        sizeArray[i] = Math.random() * 2;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));

    const sprite = new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/spark1.png');

    const material = new THREE.PointsMaterial({
        size: 0.1,
        color: 0x39ff14,
        transparent: true,
        opacity: 0.7,
        map: sprite,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, material);
    scene.add(particlesMesh);
    camera.position.z = 4;

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        particlesMesh.rotation.y = elapsedTime * 0.1;
        particlesMesh.rotation.x = mouseY * 0.5;
        particlesMesh.rotation.z = mouseX * 0.2;

        material.size = 0.1 + Math.sin(elapsedTime * 5) * 0.05;

        material.opacity = 0.6 + Math.sin(elapsedTime * 10) * 0.2;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});

document.addEventListener('click', function (e) {
    if (e.target && e.target.closest('.modal-trigger')) {
        const trigger = e.target.closest('.modal-trigger');
        const targetId = trigger.getAttribute('data-modal-target');
        const modal = document.getElementById(targetId);
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('show'), 10);
        }
    }
    if (e.target.classList.contains('close-modal')) {
        const modal = e.target.closest('.modal-overlay');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.style.display = 'none', 300);
        }
    }
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('show');
        setTimeout(() => e.target.style.display = 'none', 300);
    }
});