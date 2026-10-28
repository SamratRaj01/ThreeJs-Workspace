import * as THREE from "three";
import { HALF_HEIGHT } from "../player/player";
import gui from "../core/gui";

const shadowSettings = {
  radius: 0.4,
  opacity: 0.5,
  shrink: 0.45, // how much the shadow shrinks per unit of jump height
  minScale: 0.3, // shadow never gets smaller than this fraction of its size
};

const shadowFolder = gui.addFolder("Shadow");
shadowFolder.add(shadowSettings, "radius").min(0.1).max(2).step(0.01).name("Radius");
shadowFolder.add(shadowSettings, "opacity").min(0).max(1).step(0.01).name("Opacity");
shadowFolder.add(shadowSettings, "shrink").min(0).max(2).step(0.01).name("Shrink");
shadowFolder.add(shadowSettings, "minScale").min(0).max(1).step(0.01).name("Min Scale");

const material = new THREE.MeshBasicMaterial({
  color: "black",
  transparent: true,
  depthWrite: false,
});

// Unit circle, sized by radius * scale every frame
const shadow = new THREE.Mesh(new THREE.CircleGeometry(1, 32), material);
shadow.rotation.x = -Math.PI / 2;
shadow.position.y = 0.01; // just above the ground and grid

export const updateShadow = (target: THREE.Object3D) => {
  const height = target.position.y - HALF_HEIGHT;
  const scale = THREE.MathUtils.clamp(
    1 - height * shadowSettings.shrink,
    shadowSettings.minScale,
    1
  );

  shadow.position.x = target.position.x;
  shadow.position.z = target.position.z;
  shadow.scale.setScalar(shadowSettings.radius * scale);
  material.opacity = shadowSettings.opacity * scale;
};

export default shadow;
