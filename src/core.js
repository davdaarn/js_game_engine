"use strict"

import * as vertexBuffer from './vertex_buffer.js';
import * as simpleShader from './shader_support.js';

/** @type {WebGLRenderingContext} */
let mGL = null;

/** @returns {WebGLRenderingContext} */
function getGL() { return mGL; }

function initWebGL() {

  const canvas = document.createElement('canvas');
  canvas.id = 'GLCanvas';
  canvas.width = 640;
  canvas.height = 480;
  document.querySelector('body').appendChild(canvas);

  mGL = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");

  if (!mGL) {
    document.write("<br>WebGL 2 is not supported");
    return;
  }

  mGL.clearColor(0.0, 0.8, 0.0, 1.0);

  vertexBuffer.init();
  simpleShader.init('VertexShader', 'FragmentShader');

}

function drawSquare() {
  simpleShader.activate();

  mGL.drawArrays(mGL.TRIANGLE_STRIP, 0, 4);
}

function clearCanvas() {
  mGL.clear(mGL.COLOR_BUFFER_BIT)
}

window.onload = function() {
  initWebGL();
  clearCanvas();
  drawSquare();
}

export { getGL }
