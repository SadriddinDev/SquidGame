export default class ThemeToggle {
  constructor(toggleWrapperSelector) {
    this.wrapper = document.querySelector(toggleWrapperSelector);
    this.body = document.body;
    this.LIGHT_CLASS = 'theme-light';

    this.iconLight = this.wrapper.querySelector('.light');
    this.iconDark = this.wrapper.querySelector('.dark');
  }

  init() {
    const isLight = localStorage.getItem('theme') === 'light';
    if (isLight) this.enableLight();
    else this.enableDark();

    this.wrapper.addEventListener('click', () => {
      const nowLight = this.body.classList.contains(this.LIGHT_CLASS);
      if (nowLight) this.enableDark();
      else this.enableLight();
    });
  }

  enableLight() {
    this.body.classList.add(this.LIGHT_CLASS);
    localStorage.setItem('theme', 'light');
    this.iconDark.classList.remove('hidden');
    this.iconLight.classList.add('hidden');
  }

  enableDark() {
    this.body.classList.remove(this.LIGHT_CLASS);
    localStorage.removeItem('theme');
    this.iconLight.classList.remove('hidden');
    this.iconDark.classList.add('hidden');
  }
}
