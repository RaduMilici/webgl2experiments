const shaderCode = {
  vertex: `#version 300 es
    in vec3 a_position;    
    uniform float uPointSize;
    
    void main() {
      gl_PointSize = uPointSize;
      gl_Position = vec4(a_position, 1.0);
    }
  `,
  fragment: `#version 300 es
    precision mediump float;
    uniform vec3 uColor;
    out vec4 finalColor;
    
    void main() {
      finalColor = vec4(uColor, 1.0);
    }    
  `
};

const shaderUtil = {
  createShader(gl, src, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(`error compiling shader: ${src}`, gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  },
  createProgram(gl, vShader, fShader, doValidate) {
    const program = gl.createProgram();
    gl.attachShader(program, vShader);
    gl.attachShader(program, fShader);
    gl.linkProgram(program);

    const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);

    if(!linkStatus) {
      console.error('error compiling program', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    if(doValidate) {
      gl.validateProgram(program);
      const validateStatus = gl.getProgramParameter(program, gl.VALIDATE_STATUS);
      if(!validateStatus) {
        console.error('error validating program', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
    }

    gl.detachShader(program, vShader);
    gl.detachShader(program, fShader);
    gl.deleteShader(vShader);
    gl.deleteShader(fShader);

    return program;
  }
}

