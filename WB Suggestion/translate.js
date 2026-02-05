document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.language-dropdown');
    const toggleButton = document.querySelector('.dropdown-toggle');
    const menuLinks = document.querySelectorAll('.dropdown-menu a');
    const selectedFlag = document.getElementById('selected-lang-flag');
    const selectedCode = document.getElementById('selected-lang-code');

    const defaultLang = 'en';
    const jsonPath = './Languages/';
    let currentLanguage = localStorage.getItem('lang') || defaultLang;

    if (toggleButton && dropdown) {
        toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });

        document.addEventListener('click', (event) => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('open');
            }
        });
    }

    async function translatePage(lang) {
        try {
            const response = await fetch(`${jsonPath}${lang}.json`);

            if (!response.ok) {
                throw new Error(`Dil dosyasý yüklenemedi: ${response.statusText}`);
            }

            const translations = await response.json();

            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[key]) {
                    element.innerHTML = translations[key];
                }
            });

            document.querySelectorAll('[data-key-placeholder]').forEach(element => {
                const key = element.getAttribute('data-key-placeholder');
                if (translations[key]) {
                    element.placeholder = translations[key];
                }
            });

            document.documentElement.lang = lang;

            updateToggleButton(lang);

        } catch (error) {
            console.error('Çeviri hatasý:', error);
        }
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const selectedLanguage = link.getAttribute('data-lang');

            localStorage.setItem('lang', selectedLanguage);
            translatePage(selectedLanguage);

            if (dropdown) dropdown.classList.remove('open');
        });
    });

    function updateToggleButton(lang) {
        const link = document.querySelector(`.dropdown-menu a[data-lang="${lang}"]`);

        if (link && selectedFlag && selectedCode) {
            const content = link.textContent.trim().split(' ');

            if (content.length > 0) {
                selectedFlag.textContent = content[0];
            }
            selectedCode.textContent = lang.toUpperCase();
        }
    }

    translatePage(currentLanguage);
});