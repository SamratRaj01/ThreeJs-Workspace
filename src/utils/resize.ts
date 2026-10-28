import type { WebGLRenderer } from "three";

function resizeRendererToDisplaySize(renderer: WebGLRenderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  // canvas.width/height are in device pixels, so compare against the scaled CSS size
  const pixelRatio = renderer.getPixelRatio();
  const needResize =
    canvas.width !== Math.floor(width * pixelRatio) ||
    canvas.height !== Math.floor(height * pixelRatio);
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

export { resizeRendererToDisplaySize };
