const translations = {
    en: {
        title: "Squid Game",
        q1: "Can you survive the game?",
        q2: "To win the game, reach the destination within 1 minute. You can walk while the doll is looking back. Press O to walk and X to stop.",
        q3: "Press button to start game",
        wonTitle: "You won!",
        wonMsg: "Congratulations! You survived the game.",
        lostTitle: "You lost!",
        lostMsg: "Unfortunately, you didn't survive the game.",
        again: "Do you want play again?"
    },
    uz: {
        title: "Kalmar o‘yini",
        q1: "Siz o‘yinda omon qola olasizmi?",
        q2: "Yutish uchun 1 daqiqa ichida manzilga yeting. Qo‘g‘irchoq orqasiga qaragandagina yurishingiz mumkin. Yurish uchun O, to‘xtash uchun esa X tugmasini bosing.",
        q3: "O‘yinni boshlash uchun tugmani bosing",
        wonTitle: "Siz yutdingiz!",
        wonMsg: "Tabriklaymiz! Siz o‘yinda omon qoldingiz.",
        lostTitle: "Siz yutqazdingiz!",
        lostMsg: "Afsuski, siz o‘yinda omon qola olmadingiz.",
        again: "Yana o‘ynashni xohlaysizmi?"
    }
};

export function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key] || el.textContent;
  });
}
