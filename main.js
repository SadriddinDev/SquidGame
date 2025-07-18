
import GameController from "./modules/GameController.js";
import { applyTranslations } from "./modules/i18n.js";
import ThemeToggle from "./modules/theme-toggle.js";

document.addEventListener("DOMContentLoaded", () => {
  const game = new GameController();
  game.init();

  const languageSelect = document.getElementById("language-select");

  const savedLang = localStorage.getItem("language") || "en";
  languageSelect.value = savedLang;
  applyTranslations(savedLang);

  languageSelect.addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem("language", selectedLang);
    applyTranslations(selectedLang);
  });

  const themeToggle = new ThemeToggle(".theme-wrapper");
  themeToggle.init();
});
