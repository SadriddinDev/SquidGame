export default class DistanceMeter {
  constructor(labelElement, containerElement) {
    this.el = labelElement;
    this.container = containerElement;
    this.initialHeight = this.container.offsetHeight - 280;
    this.el.style.height = `${this.initialHeight}px`;
    this.updateLabel(100);
  }

  update(currentBottom, maxDistance) {
    const usedDistance = currentBottom - 100;
    const newHeight = Math.max(this.initialHeight - usedDistance, 0);
    this.el.style.height = `${newHeight}px`;
    const metersLeft = (newHeight / (maxDistance - 100)) * 100;
    this.updateLabel(metersLeft);
  }

  updateLabel(value) {
    this.el.innerText = `${value.toFixed(2)} m`;
  }

  updateColor(isWatching) {
    if (isWatching) {
      this.el.classList.add("is-watching")
    } else {
      this.el.classList.remove("is-watching")
    }
  }

  reset() {
    this.el.style.height = `${this.initialHeight}px`;
    this.updateLabel(100);
  }

  resize() {
    this.initialHeight = this.container.offsetHeight - 280;
    this.el.style.height = `${this.initialHeight}px`;
  }
}