const gl = GLInstance('WebGL')
  .fSetSize(500, 500)
  .fClear();

const vertexShader = shaderUtil.createShader(gl, shaderCode.vertex, gl.VERTEX_SHADER);
const fragmentShader = shaderUtil.createShader(gl, shaderCode.fragment, gl.FRAGMENT_SHADER);
const shaderProgram = shaderUtil.createProgram(gl, vertexShader, fragmentShader, true);

gl.useProgram(shaderProgram);

const aPositionLoc = gl.getAttribLocation(shaderProgram, 'a_position');
const uPointSizeLoc = gl.getUniformLocation(shaderProgram, 'uPointSize');
const uColorLoc = gl.getUniformLocation(shaderProgram, 'uColor');

const arrColor = new Float32Array([1, 0, 0]);
gl.uniform3fv(uColorLoc, arrColor);

const arrVerts = new Float32Array([0, -1, 0, 1, 1, 0, -1, 1, 0]);
const bufVerts = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, bufVerts);
gl.bufferData(gl.ARRAY_BUFFER, arrVerts, gl.STATIC_DRAW);
gl.uniform1f(uPointSizeLoc, 50);
gl.enableVertexAttribArray(aPositionLoc);
gl.vertexAttribPointer(aPositionLoc, 3, gl.FLOAT, false, 0, 0);
gl.bindBuffer(gl.ARRAY_BUFFER, null);
gl.drawArrays(gl.TRIANGLES, 0, 3);