import * as THREE from "three";
import scene from "../scene";
import renderer from "../renderer";
import { resizeRendererToDisplaySize } from "../utils/resize";
import camera, { cameraOffset, updateCameraAspect } from "./core/camera";
import { setupWorld } from "./world/world";
import { createPlayer } from "./player/createPlayer";
import shadow, { updateShadow } from "./visuals/shadow";
import directionArrow, { updateDirectionArrow } from "./visuals/directionArrow";
import { updateCooldownHud } from "./ui/cooldownHud";

setupWorld();

const player = createPlayer();
scene.add(shadow, directionArrow, player);

// Anything that needs to run every frame after the player has moved
const followers = [updateShadow, updateDirectionArrow];

const timer = new THREE.Timer();
timer.connect(document);

const tick = () => {
  timer.update();
  player.update(timer.getDelta());
  for (const update of followers) update(player);
  updateCooldownHud();

  // Follow the player while keeping the isometric angle
  camera.position.copy(player.position).add(cameraOffset);
  camera.lookAt(player.position);

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    updateCameraAspect(canvas.clientWidth / canvas.clientHeight);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};

updateCameraAspect(window.innerWidth / window.innerHeight);
tick();
