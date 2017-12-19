const GLInstance = canvasId => {
  const canvas = document.getElementById(canvasId);
  const gl = canvas.getContext('webgl2');

  if (!gl) {
    console.error('WebGL context not available');
    return null;
  }

  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  gl.fClear = function() {
    this.clear(this.COLOR_BUFFER_BIT | this.DEPTH_BUFFER_BIT);
  };

  gl.fSetSize = function(w, h) {
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.canvas.width = w;
    this.canvas.height = h;

    this.viewport(0, 0, w, h);
  };

  gl.fCreateArrayBuffer = function(floatArray, isStatic = true) {
    const usage = isStatic ? this.STATIC_DRAW : this.DYNAMIC_DRAW;
    const buffer = this.createBuffer();
    this.bindBuffer(this.ARRAY_BUFFER, buffer);
    this.bufferData(this.ARRAY_BUFFER, floatArray, usage);
    this.bindBuffer(this.ARRAY_BUFFER, null);
    return buffer;
  }

  return gl;
}