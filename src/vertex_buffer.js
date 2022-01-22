"use strict";

import * as core from './core.js';

/** @type {WebGLRenderingContext} */
let mGLVertexBuffer = null;

function get() { return mGLVertexBuffer };

let mVerticesOfSquare = [
  0.5, 0.5, 0.0,
  -0.5, 0.5, 0.0,
  0.5, -0.5, 0.0,
  -0.5, -0.5, 0.0
];

function init() {
  let gl = core.getGL();

  mGLVertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, mGLVertexBuffer);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mVerticesOfSquare), gl.STATIC_DRAW);
}

export { get, init }