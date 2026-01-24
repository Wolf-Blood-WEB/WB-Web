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

        window.addEventListener('load', () => {
            setTimeout(() => {
                initializeMechanicsPage();
            }, 50);
        });

        function initializeMechanicsPage() {
            try {
                const firstSubTab = document.querySelector('.sub-tab-button');
                if (firstSubTab) {
                    ;
                }
                const firstSubTabContent = document.getElementById('standard-points');
                if (firstSubTabContent) {
                }
                sortTable(2);
                calculateGroupPoints();
            } catch (e) {
                console.error("Bot-Mechanics.html başlatılırken hata:", e);
            }
        }

        function showMainTab(tabId, clickedButton) {
            if (!clickedButton) return;
            const isAlreadyActive = clickedButton.classList.contains('active');
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.main-tab-button').forEach(btn => btn.classList.remove('active'));

            if (!isAlreadyActive) {
                document.getElementById(tabId).classList.add('active');
                clickedButton.classList.add('active');
            }
        }
        function showSubTab(subTabId, clickedButton) {
            if (!clickedButton) return;
            const isAlreadyActive = clickedButton.classList.contains('active');
            document.querySelectorAll('.sub-tab-content').forEach(tab => tab.classList.remove('active'));
            document.querySelectorAll('.sub-tab-button').forEach(btn => btn.classList.remove('active'));
            if (!isAlreadyActive) {
                document.getElementById(subTabId).classList.add('active');
                clickedButton.classList.add('active');
            }
        }
        let currentFilter = 'all';
        let currentSearch = '';
        function filterTable(button, filter) {
            const searchInput = document.getElementById('roleSearchInput');
            const table = document.getElementById('roleBalanceTable');
            if (!table) return;
            const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
            if (button) {
                currentFilter = filter;
                document.querySelectorAll('.filter-buttons button').forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            }
            currentSearch = searchInput.value.toLowerCase().trim();
            const isSearchEmpty = currentSearch === '';

            for (let i = 0; i < rows.length; i++) {
                const team = rows[i].dataset.team;
                const roleName = rows[i].cells[0].textContent.toLowerCase();
                const note = rows[i].cells[3].textContent.toLowerCase();
                const teamMatch = (currentFilter === 'all' || team === currentFilter);
                const searchMatch = isSearchEmpty || (roleName.includes(currentSearch) || note.includes(currentSearch));
                if (teamMatch && searchMatch) {
                    rows[i].style.display = "";
                } else {
                    rows[i].style.display = "none";
                }
            }
        }

        function sortTable(columnIndex) {
            const table = document.getElementById('roleBalanceTable');
            if (!table) return;

            let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
            switching = true;
            dir = "desc";

            while (switching) {
                switching = false;
                rows = table.rows;
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[columnIndex];
                    y = rows[i + 1].getElementsByTagName("TD")[columnIndex];

                    if (!x || !y) continue;
                    let xVal, yVal;

                    if (columnIndex === 2) {
                        xVal = Number(x.innerHTML);
                        yVal = Number(y.innerHTML);
                    } else {
                        xVal = x.innerHTML.toLowerCase();
                        yVal = y.innerHTML.toLowerCase();
                    }
                    if (dir == "asc") {
                        if (xVal > yVal) {
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dir == "desc") {
                        if (xVal < yVal) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchcount++;
                } else {
                    if (switchcount == 0 && dir == "desc") {
                        dir = "asc";
                        switching = true;
                    }
                }
            }
            const headers = table.getElementsByTagName('th');
            for (let h = 0; h < headers.length; h++) {
                headers[h].innerHTML = headers[h].innerHTML.replace(' ▾', '').replace(' ▴', '');
            }
            headers[columnIndex].innerHTML += (dir === 'desc' ? ' ▾' : ' ▴');
        }

        function calculateGroupPoints() {
            const playerCountEl = document.getElementById('selectPlayerCount');
            const gameTimeEl = document.getElementById('selectGameTime');
            const roleTypeEl = document.getElementById('selectRoleType');
            const baseScoreEl = document.getElementById('inputBaseScore');
            const clanMembersEl = document.getElementById('inputClanMembers');

            if (!playerCountEl || !gameTimeEl || !roleTypeEl || !baseScoreEl || !clanMembersEl) return;

            const playerCount = playerCountEl.value;
            const gameTime = gameTimeEl.value;
            const roleType = roleTypeEl.value;
            const baseScore = parseFloat(baseScoreEl.value) || 0;
            const winningMembers = parseInt(clanMembersEl.value) || 0;

            let villageMulti = 0;
            let wolfMulti = 0;
            let soloMulti = 0;

            if (playerCount === "5-20") {
                if (gameTime === "<5") { villageMulti = 0.5; wolfMulti = 2.25; soloMulti = 2.5; }
                else if (gameTime === "5-30") { villageMulti = 0.75; wolfMulti = 4; soloMulti = 11; }
                else if (gameTime === ">=30") { villageMulti = 1; wolfMulti = 5; soloMulti = 24; }
            } else if (playerCount === "21-40") {
                if (gameTime === "<5") { soloMulti = 17; } // Sadece Tanner (👺)
                else if (gameTime === "5-30") { soloMulti = 19; } // Sadece Tanner (👺)
                else if (gameTime === ">=30") { soloMulti = 21; } // Sadece Tanner (👺)
                else if (gameTime === "<20") { villageMulti = 1; wolfMulti = 4.25; soloMulti = 28; }
                else if (gameTime === "20-40") { villageMulti = 1.25; wolfMulti = 4.75; soloMulti = 36; }
                else if (gameTime === "40-60") { villageMulti = 1.5; wolfMulti = 5.5; soloMulti = 48; }
                else if (gameTime === ">=60") { villageMulti = 1.75; wolfMulti = 6; soloMulti = 64; }
            } else if (playerCount === "41-60") {
                if (gameTime === "<60") { villageMulti = 1.75; wolfMulti = 6; soloMulti = 65; }
                else if (gameTime === "60-80") { villageMulti = 2; wolfMulti = 7; soloMulti = 75; }
                else if (gameTime === "80-100") { villageMulti = 2.25; wolfMulti = 8; soloMulti = 92; }
                else if (gameTime === ">=100") { villageMulti = 2.5; wolfMulti = 9; soloMulti = 104; }
            } else if (playerCount === "61-80") {
                if (gameTime === "<80") { villageMulti = 2.5; wolfMulti = 11; soloMulti = 120; }
                else if (gameTime === "80-110") { villageMulti = 2.75; wolfMulti = 12; soloMulti = 140; }
                else if (gameTime === ">=110") { villageMulti = 3; wolfMulti = 14; soloMulti = 155; }
            } else if (playerCount === "81-100") {
                if (gameTime === "<90") { villageMulti = 3; wolfMulti = 15; soloMulti = 175; }
                else if (gameTime === "90-120") { villageMulti = 3.5; wolfMulti = 16; soloMulti = 200; }
                else if (gameTime === ">=120") { villageMulti = 4; wolfMulti = 17; soloMulti = 225; }
            }

            let timeFactor = 0;
            let factorText = "Time/Player Factor: ";

            if (roleType === 'solo') {
                timeFactor = soloMulti;
                if (playerCount === "21-40" && (gameTime === "<5" || gameTime === "5-30" || gameTime === ">=30")) {
                    factorText = `Factor (Tanner 👺 <span style="color:var(--team-solo)">${soloMulti}</span>): `;
                } else {
                    factorText = `Factor (Solo <span style="color:var(--team-solo)">${soloMulti}</span>): `;
                }
            } else if (roleType === 'wolf') {
                timeFactor = wolfMulti;
                factorText = `Factor (Wolf <span style="color:var(--team-wolf)">${wolfMulti}</span>): `;
            } else {
                timeFactor = villageMulti;
                factorText = `Factor (Village <span style="color:var(--team-village)">${villageMulti}</span>): `;
            }

            let clanFactor = 1.0;
            let finalClanFactorNote = "Rule: Default factor.";

            if (playerCount === "41-60") {
                if (winningMembers > 35) {
                    clanFactor = 0.8;
                    finalClanFactorNote = `Rule: 41-60 Players & >35 Members. Factor x0.8 applied.`;
                } else {
                    finalClanFactorNote = `Rule: 41-60 Players. No member count factor.`;
                }
            }
            else if (playerCount === "61-80") {
                finalClanFactorNote = "Rule: 61-80 Players (Blue Field). ";
                if (winningMembers > 45) {
                    clanFactor = 0.6;
                    finalClanFactorNote += `>45 Members. Factor x0.6 applied.`;
                }
                else if (roleType === 'solo') {
                    clanFactor = 0.8;
                    finalClanFactorNote += `Solo Role. Factor x0.8 applied.`;
                }
                else if (roleType === 'wolf') {
                    if (winningMembers > 12) {
                        clanFactor = 0.7;
                        finalClanFactorNote += `Wolf Team (>12 Members). Factor x0.7 applied.`;
                    }
                    else if (winningMembers >= 10 && winningMembers <= 12) {
                        clanFactor = 0.8;
                        finalClanFactorNote += `Wolf Team (10-12 Members). Factor x0.8 applied.`;
                    }
                }
            }
            else if (playerCount === "81-100") {
                finalClanFactorNote = "Rule: 81-100 Players (Orange Field). ";
                if (winningMembers > 55) {
                    clanFactor = 0.4;
                    finalClanFactorNote += `>55 Members. Factor x0.4 applied.`;
                }
                else if (roleType === 'solo') {
                    clanFactor = 0.6;
                    finalClanFactorNote += `Solo Role. Factor x0.6 applied.`;
                }
                else if (roleType === 'wolf') {
                    if (winningMembers > 17) {
                        clanFactor = 0.4;
                        finalClanFactorNote += `Wolf Ornament (>17 Members). Factor x0.4 applied.`;
                    }
                    else if (winningMembers >= 14 && winningMembers <= 16) {
                        clanFactor = 0.45;
                        finalClanFactorNote += `Wolf Ornament (14-16 Members). Factor x0.45 applied.`;
                    }
                    else if (winningMembers >= 12 && winningMembers <= 14) {
                        clanFactor = 0.5;
                        finalClanFactorNote += `Wolf Ornament (12-14 Members). Factor x0.5 applied.`;
                    }
                }
            }
            else {
                finalClanFactorNote = "Rule: No special clan factor for this player count.";
            }
            const finalScore = baseScore * winningMembers * timeFactor * clanFactor;

            if (timeFactor === 0) {
                document.getElementById('result-team-base').innerHTML = `Team Base Score: <span>${baseScore}</span>`;
                document.getElementById('result-time-factor').innerHTML = 'Time/Player Factor: <span>N/A</span>';
                document.getElementById('result-clan-members').innerHTML = `Winning Clan Members: <span>${winningMembers}</span>`;
                document.getElementById('result-clan-factor').innerHTML = 'Clan Factor: <span>N/A</span>';
                document.getElementById('result-final-score').innerHTML = 'Final Group Score: <span>N/A</span>';
                document.getElementById('result-notes').innerText = 'Selected combination is not valid (e.g., 5-20 players with 60-80 min game) OR this team has no multiplier for this slot (see 👺).';
                highlightCell(null, null);
            } else {
                document.getElementById('result-team-base').innerHTML = `Team Base Score: <span>${baseScore.toFixed(2)}</span>`;
                document.getElementById('result-time-factor').innerHTML = `${factorText}<span>${timeFactor.toFixed(2)}</span>`;
                document.getElementById('result-clan-members').innerHTML = `Winning Clan Members: <span>${winningMembers}</span>`;
                document.getElementById('result-clan-factor').innerHTML = `Clan Factor: <span>x${clanFactor.toFixed(2)}</span>`;
                document.getElementById('result-final-score').innerHTML = `Final Group Score: <span>${finalScore.toFixed(2)}</span>`;
                document.getElementById('result-notes').innerText = `Formula: (Base) * (Members) * (Time Factor) * (Clan Factor). ${finalClanFactorNote}`;
                highlightCell(gameTime, playerCount);
            }
        }

        function highlightCell(time, players) {
            document.querySelectorAll('.heatmap-cell').forEach(cell => cell.classList.remove('highlight'));
            if (time && players) {
                const selector = `.heatmap-cell[data-time="${time}"][data-players="${players}"]`;
                const cell = document.querySelector(selector);
                if (cell) {
                    cell.classList.add('highlight');
                }
            }
        }

        function filterRoleSpecificPoints() {
            const input = document.getElementById('roleSpecificSearchInput');
            const filter = input.value.toLowerCase().trim();
            const lists = document.querySelectorAll('#role-specific-points .role-point-list');

            if (!lists.length) return;

            lists.forEach(list => {
                const items = list.getElementsByTagName('li');
                let itemsVisible = false;

                for (let i = 0; i < items.length; i++) {
                    const li = items[i];
                    const txtValue = li.textContent || li.innerText;
                    if (txtValue.toLowerCase().includes(filter)) {
                        li.style.display = "";
                        itemsVisible = true;
                    } else {
                        li.style.display = "none";
                    }
                }
            });
        }

        function closeAllTooltips() {
            document.querySelectorAll('.tooltip-bubble.active').forEach(bubble => {
                bubble.classList.remove('active');
            });
        }
        document.addEventListener('click', function (event) {
            if (event.target.classList.contains('tooltip-trigger')) {
                const bubble = event.target.nextElementSibling;
                const isAlreadyActive = bubble.classList.contains('active');
                closeAllTooltips();
                if (!isAlreadyActive) {
                    bubble.classList.add('active');
                }
            }
            else if (event.target.closest('.tooltip-bubble')) {
                return;
            }
            else {
                closeAllTooltips();
            }
        });


const modalOverlay = document.getElementById('modalOverlay');
const modalBody = document.getElementById('modalBody');

function openModal(cardElement) {
    const contentStorage = cardElement.nextElementSibling;
    if (contentStorage) {
        modalBody.innerHTML = contentStorage.innerHTML;
        modalOverlay.classList.add('visible');
    }
}
function closeModal() {
    modalOverlay.classList.remove('visible');
}
modalOverlay.addEventListener('click', (event) => {
    if (event.target === modalOverlay) {
        closeModal();
    }
});