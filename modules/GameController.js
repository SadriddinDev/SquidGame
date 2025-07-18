import Player from "./Player.js";
import DistanceMeter from "./DistanceMeter.js";
import DollLogicController from "./DollLogicController.js";


export default class GameController {
  constructor() {
    this.player = new Player(
      document.getElementById("player"),
      document.getElementById("main-container")
    );
    this.distanceMeter = new DistanceMeter(
      document.querySelector(".distance"),
      document.getElementById("main-container")
    );

    this.dollLogic = new DollLogicController(
      document.getElementById("doll"),
      document.querySelector(".doll-container")
    );

    this.container = document.getElementById("main-container");
    this.playButton = document.querySelector(".btn-play");
    this.stopButton = document.querySelector(".btn-stop");
    this.modalContainer = document.querySelector(".modal-container");
    this.timer = document.getElementById("timer");
    this.doll = document.getElementById("doll");

    this.moveInterval = null;
    this.timerInterval = null;
    this.timerStartedAt = null;

    this.finished = false;
    this.gameTime = 60; // seconds for the game

    this.sounds = {
      timer: new Audio("sounds/time-running.mp3"),
      step: new Audio("sounds/step.mp3"),
      shot: new Audio("sounds/shot.mp3")
    }
    this.sounds.timer.preload = "auto";
    this.sounds.timer.volume = 0.6;
    this.sounds.timer.loop = true;
    this.sounds.timer.currentTime = 0;

    this.sounds.step.preload = "auto";
    this.sounds.step.volume = 1.0;
    this.sounds.step.loop = true;
    this.sounds.step.currentTime = 0;

    this.sounds.shot.preload = "auto";
    this.sounds.shot.volume = 1.0;
    this.sounds.shot.currentTime = 0;

    this.maxDistance = this.container.offsetHeight - 180;
    this.calculateRefreshRate();
  }

  init() {
    this.attachEvents();
    this.defaultTimer();
    this.onResize();
    this.dollLogic.setTurnHandler(() => {
      this.distanceMeter.updateColor(this.dollLogic.isWatching);
    });
  }

  calculateRefreshRate() {
    const movementRatio = 0.45;
    this.refreshRate = Math.floor(this.gameTime * 1000 * movementRatio / (this.maxDistance - this.player.initialBottom));
  }

  attachEvents() {
    this.playButton?.addEventListener("click", () => this.startPlayerMove());
    this.stopButton?.addEventListener("click", () => this.stopPlayerMove());
    document.querySelectorAll(".btn-start").forEach(btn => {
      btn.addEventListener("click", () => this.startGame());
    });
    window.addEventListener("resize", () => this.onResize());
  }

  startPlayerMove() {
    if (this.moveInterval) return;

    if (this.finished) {
      this.player.resetPosition();
      this.distanceMeter.reset();
      this.finished = false;
    }

    this.moveInterval = setInterval(() => this.tick(), this.refreshRate);
    this.playButton.classList.add("active");
    this.stopButton.classList.remove("active");
    this.sounds.step.play();
  }

  stopPlayerMove() {
    if (this.moveInterval) {
      clearInterval(this.moveInterval);
      this.moveInterval = null;
      this.playButton.classList.remove("active");
      this.stopButton.classList.add("active");
      this.sounds.step.pause();
      this.sounds.step.currentTime = 0;
    }
  }

  tick() {
    if (this.player.bottom < this.maxDistance) {
      this.player.move();
      this.distanceMeter.update(this.player.bottom, this.maxDistance);
      if (this.dollLogic.isWatching) {
        this.stopGame();
        this.sounds.shot.currentTime = 0;
        setTimeout(() => this.sounds.shot.play(), 500);
        setTimeout(() => this.showModal("lost"), 2000);
      }
    } else {
      this.stopGame()
      this.showModal("won");
    }
  }

  defaultTimer() {
    const minutes = Math.floor(this.gameTime / 60);
    const seconds = this.gameTime % 60;
    this.timer.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  showModal(type = "start") {
    const steps = {
      start: document.querySelector(".step-start"),
      won: document.querySelector(".step-won"),
      lost: document.querySelector(".step-lost"),
    };

    Object.values(steps).forEach(el => el.classList.add("hidden"));

    if (steps[type]) {
      steps[type].classList.remove("hidden");
    }

    this.modalContainer.classList.remove("hidden");
  }

  hideModal() {
    this.modalContainer.classList.add("hidden");
  }

  startGame() {
    this.hideModal();
    this.defaultTimer()
    this.player.resetPosition();
    this.distanceMeter.reset();
    this.finished = false;
    this.startTimer()
    this.sounds.timer.play();
    this.dollLogic.start();
  }

  stopGame() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.timerStartedAt = null;
    this.stopPlayerMove();
    this.sounds.timer.pause();
    this.sounds.timer.currentTime = 0;
    this.dollLogic.stop();
  }

  startTimer() {
    if (this.timerInterval) return;

    this.timerStartedAt = Date.now();
    this.timerInterval = setInterval(() => this.updateTimer(), 1000);
  }

  updateTimer() {
    const elapsed = Math.floor((Date.now() - this.timerStartedAt) / 1000);
    const timeLeft = Math.max(this.gameTime - elapsed, 0);
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    this.timer.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if (elapsed >= this.gameTime) {
      this.timer.innerText = "00:00";
      this.stopGame();
      this.showModal("lost");
    }
  }

  isPlayerMoving() {
    return this.moveInterval !== null;
  }

  onResize() {
    this.maxDistance = this.container.offsetHeight - 180;
    this.player.resetPosition();
    this.player.constrain(this.maxDistance);
    this.distanceMeter.resize();
    this.calculateRefreshRate();
  }
}
