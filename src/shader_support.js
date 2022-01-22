"use strict";

import * as core from './core.js';
import * as vertexBuffer from './vertex_buffer.js';

let mCompiledShader = null;
let mVertexPositionRef = null;

function loadAndCompileShader(id, shaderType) {
  let shaderSource = null;
  let compiledShader = null;

  let shaderText = document.getElementById(id);
  shaderSource = shaderText.firstChild.textContent;

  let gl = core.getGL();
  compiledShader = gl.createShader(shaderType);

  gl.shaderSource(compiledShader, shaderSource);
  gl.compileShader(compiledShader);

  if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
    throw new Error('A shader compiling error occurred: ' + gl.getShaderInfoLog(compiledShader));
  }

  return compiledShader;
}

function init(vertexShaderID, fragmentShaderID) {
  let gl = core.getGL();

  let vertexShader = loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
  let fragmentShader = loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);

  mCompiledShader = gl.createProgram();
  gl.attachShader(mCompiledShader, vertexShader);
  gl.attachShader(mCompiledShader, fragmentShader)
  gl.linkProgram(mCompiledShader);

  if (!gl.getProgramParameter(mCompiledShader, gl.LINK_STATUS)) {
    throw new Error("Error linking shader");
  }

  mVertexPositionRef = gl.getAttribLocation(mCompiledShader, "aVertexPosition");
}

function activate() {
  let gl = core.getGL();

  gl.useProgram(mCompiledShader);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer.get());
  gl.vertexAttribPointer(this.mVertexPositionRef, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(this.mVertexPositionRef);
}

export { init, activate }