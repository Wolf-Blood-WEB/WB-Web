/* =========================================
   🐺 WOLF BLOOD WEBSITE LOGIC
   Handles: Home, Forms, Tabs, Modals, AND VOTING
   ========================================= */

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

    // ---------------------------------------------
    // D. VOTING LOGIC (NEW!) 🗳️
    // ---------------------------------------------
    const voteButtons = document.querySelectorAll('.vote-trigger');

    voteButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Get the role name from the HTML
            const roleName = btn.getAttribute('data-vote-target');

            // 2. Disable button so they can't spam click
            btn.disabled = true;
            btn.innerText = "⏳ Sending...";
            btn.style.backgroundColor = "#555";

            // 3. Send to Bot
            sendVoteToBot(roleName, btn);
        });
    });

}); // End DOMContentLoaded


/* =========================================
   HELPER FUNCTIONS
   ========================================= */

// ... (openTab function remains the same) ...
function openTab(tabName, evt) {
    const contents = document.getElementsByClassName("tab-content");
    for (let content of contents) content.style.display = "none";
    const buttons = document.getElementsByClassName("nav-tab");
    for (let btn of buttons) btn.classList.remove("active");
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) selectedTab.style.display = "block";
    if (evt && evt.currentTarget) evt.currentTarget.classList.add("active");
}

// ... (submitForm function remains the same) ...
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

// --- NEW FUNCTION: SEND VOTE ---
function sendVoteToBot(roleName, btnElement) {

    // The message that appears in your Admin Group
    const text = `🗳️ **VOTE ALERT**\n\nA visitor just voted for: **${roleName}**`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${encodeURIComponent(text)}&parse_mode=Markdown`;

    fetch(url, { method: 'POST', mode: 'no-cors' })
        .then(() => {
            // Success Visuals
            btnElement.innerText = "✅ Voted!";
            btnElement.style.backgroundColor = "#4caf50"; // Green
        })
        .catch(err => {
            console.error("Vote Error:", err);
            btnElement.innerText = "❌ Error";
            btnElement.disabled = false; // Re-enable if it failed
        });
}