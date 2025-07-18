export default class DollLogicController {
  constructor(dollElement, dollContainer) {
    this.doll = dollElement;
    this.dollContainer = dollContainer;
    this.running = false;
    this.timeoutId = null;
    this.isWatching = false;
    this.onTurn = null;

    this.sounds = {
      song: new Audio("sounds/koko-song.mp3"),
    };

    this.soundLengths = [4858, 2429, 3643, 7287];
    this.pauseLengths = [4000, 6000, 5000, 3000, 2000];

    this.sounds.song.preload = "auto";
    this.sounds.song.volume = 1;
    this.sounds.song.currentTime = 0;
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.nextStep();
  }

  stop() {
    this.running = false;
    clearTimeout(this.timeoutId);
    this.sounds.song.pause();
    this.sounds.song.currentTime = 0;
  }

  setTurnHandler(callback) {
    this.onTurn = callback;
  }

  nextStep() {
    if (!this.running) return;

    const songDuration = this.getRandomItem(this.soundLengths);
    this.turnDoll(true);

    this.sounds.song.currentTime = 0;
    this.sounds.song.playbackRate = 4858 / songDuration;
    this.sounds.song.play();

    this.timeoutId = setTimeout(() => {
      this.sounds.song.pause();
      this.sounds.song.currentTime = 0;

      const pauseDuration = this.getRandomItem(this.pauseLengths);
      this.turnDoll(false);

      this.timeoutId = setTimeout(() => {
        this.nextStep(); // RECURSIVE LOOP
      }, pauseDuration);

    }, songDuration);
  }

  turnDoll(toBack = true) {
    this.doll.style.transform = "rotateY(90deg)";
    if (toBack) {
      setTimeout(() => {
        this.isWatching = false;
        this.dollContainer.classList.remove("is-watching");
        if (this.onTurn) this.onTurn();
      }, 100);
    } else {
      setTimeout(() => {
        this.isWatching = true;
        this.dollContainer.classList.add("is-watching");
        if (this.onTurn) this.onTurn();
      }, 800);
    }

    setTimeout(() => {
      this.doll.src = toBack ? "img/doll-back.png" : "img/doll-front.png";
      this.doll.style.transform = "rotateY(0deg)";
    }, 500);
  }

  getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}