function showSection(sectionId, clickedButton) {
    document.querySelectorAll('.about-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    document.querySelectorAll('.button-container button').forEach(button => {
        button.classList.remove('active');
    });
    clickedButton.classList.add('active');
}
function flipCard(cardId) {
    const card = document.getElementById(cardId);
    card.classList.toggle('flipped');
}
async function accessProtectedLink() {
    const userInput = prompt("🔒 Restricted Access\nPlease enter the access code to view Role Ideas:");

    if (!userInput) return;

    const msgBuffer = new TextEncoder().encode(userInput);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const validHash = "15b062c1a1b192e1d2f614b9478c158ad8795dee3a64431ea0e4f6f3a224b0ee";

    if (hashHex === validHash) {
        window.open("https://wolf-blood-web.github.io/WB-Web/suggestions/", "_blank");
    } else {
        alert("⛔ Access Denied!\nThe code you entered is incorrect.");
    }
}