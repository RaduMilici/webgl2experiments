class RenderLoop {
  constructor(callback, requiredFps) {
    this.msLastFrame = null;
    this.callback = callback;
    this.requiredFps = requiredFps;
    this.isActive = false;
    this.fps = 0;
    this.run = requiredFps > 0 ? this.cappedRun.bind(this) : this.uncappedRun.bind(this);
  }

  start() {
    this.isActive = true;
    this.msLastFrame = performance.now();
    requestAnimationFrame(this.run);
    return this;
  }

  cappedRun() {
    this.msFpsLimit = 1000 / this.requiredFps;
    const msCurrent = performance.now();
    const msDelta = msCurrent - this.msLastFrame;
    const deltaTime = msDelta / 1000;

    if(msDelta >= this.msFpsLimit) {
      this.fps = Math.floor(1 / deltaTime);
      this.msLastFrame = msCurrent;
      this.callback(deltaTime);
    }

    if (this.isActive) requestAnimationFrame(this.run);
  }

  uncappedRun() {
    const msCurrent = performance.now();
    const deltaTime = (msCurrent - this.msLastFrame) / 1000;
    this.fps = Math.floor(1 / deltaTime);
    this.msLastFrame = msCurrent;

    this.callback(deltaTime);
    if (this.isActive) requestAnimationFrame(this.run);
  }
}