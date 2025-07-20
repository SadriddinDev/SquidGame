export default class Player {
  constructor(playerElement, containerElement) {
    this.el = playerElement;
    this.container = containerElement;
    this.speed = 1;
    this.initialBottom = 180;
    this.width = 50;
    this.resetPosition();
  }

  get bottom() {
    return parseInt(this.el.style.bottom || 0, 10);
  }

  set bottom(value) {
    this.el.style.bottom = `${value}px`;
  }

  move() {
    this.bottom = this.bottom + this.speed;
  }

  resetPosition() {
    this.bottom = this.initialBottom;
    this.el.style.left = `${(this.container.offsetWidth / 2 - this.width / 2)}px`;
  }

  constrain(maxBottom) {
    if (this.bottom > maxBottom) {
      this.bottom = maxBottom;
    }
  }
}