import * as THREE from "three";
import scene from "../../scene";

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({ color: "#9e9e9e" })
);
ground.rotation.x = -Math.PI / 2;

const grid = new THREE.GridHelper(40, 40, "#555", "#777");
grid.position.y = 0.001;

// Sky/ground tint gives the capsule some shading without a directional light
const ambientLight = new THREE.AmbientLight("white", 0.6);
const hemisphereLight = new THREE.HemisphereLight("white", "#555", 2);

export const setupWorld = () => {
  scene.background = new THREE.Color("#cfd8dc");
  scene.add(ground, grid, ambientLight, hemisphereLight);
};
