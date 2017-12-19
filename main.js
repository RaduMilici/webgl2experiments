let uAngle;
let gRLoop;
const gl = GLInstance('WebGL');

let pointSize = 0;
const pointSizeStep = 1;

gl.fSetSize(500, 500)
gl.fClear();

const arrColor = new Float32Array([0, 1, 0]);
const vertsArray = new Float32Array([0, 0, 0]);
const gVertCount = vertsArray.length / 3;
const vertsBuffer = gl.fCreateArrayBuffer(vertsArray, true);

const shaderProgram = shaderUtil.creteShaderProgram(gl);
gl.useProgram(shaderProgram);

// locations
const aPositionLoc = gl.getAttribLocation(shaderProgram, 'a_position');
const uPointSizeLoc = gl.getUniformLocation(shaderProgram, 'uPointSize');
const uColorLoc = gl.getUniformLocation(shaderProgram, 'uColor');

gl.bindBuffer(gl.ARRAY_BUFFER, vertsBuffer);

// uniforms
gl.uniform3fv(uColorLoc, arrColor);
gl.uniform1f(uPointSizeLoc, 50);

gl.enableVertexAttribArray(aPositionLoc);
gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, null);

const renderLoop = new RenderLoop(deltaTime => {
  pointSize += pointSizeStep * deltaTime;
  const currentSize = Math.abs(Math.sin(pointSize) * 200);
  gl.uniform1f(uPointSizeLoc, currentSize);
  gl.fClear();
  gl.drawArrays(gl.POINTS, 0, gVertCount);
})

renderLoop.start();