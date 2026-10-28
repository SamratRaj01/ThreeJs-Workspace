import * as THREE from "three";

// How many world units fit vertically on screen
const viewSize = 10;
// Classic isometric angle: camera sits on the (1, 1, 1) diagonal
export const cameraOffset = new THREE.Vector3(10, 10, 10);

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);
camera.position.copy(cameraOffset);
camera.lookAt(0, 0, 0);

export const updateCameraAspect = (aspect: number) => {
  camera.left = (-viewSize * aspect) / 2;
  camera.right = (viewSize * aspect) / 2;
  camera.top = viewSize / 2;
  camera.bottom = -viewSize / 2;
  camera.updateProjectionMatrix();
};

export default camera;
