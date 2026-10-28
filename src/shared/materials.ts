import * as THREE from "three";
import { cobbleDiffTexture, earthTexture, woodTexture } from "./textures";
const cubeMaterial = new THREE.MeshStandardMaterial({
  map: woodTexture,
});

cubeMaterial.side = THREE.DoubleSide;

const floorMaterial = new THREE.MeshStandardMaterial({
  map: cobbleDiffTexture,
  displacementMap: cobbleDiffTexture,
  displacementScale: 1.2,
});

floorMaterial.side = THREE.DoubleSide;

if (floorMaterial.map) {
  floorMaterial.map.repeat.set(8, 8);
  floorMaterial.map.wrapS = THREE.RepeatWrapping;
  floorMaterial.map.wrapT = THREE.RepeatWrapping;
}

const normalMaterial = new THREE.MeshNormalMaterial();

const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});

const liquidMaterial = new THREE.MeshPhysicalMaterial({
  color: "#4fc3f7",
  transmission: 1, // fully see-through, refracts the scene behind it
  thickness: 0.8, // how "deep" the refraction looks
  roughness: 0.05,
  ior: 1.33, // index of refraction of water
  clearcoat: 1,
  clearcoatRoughness: 0,
  attenuationColor: new THREE.Color("#0077be"), // tint gets deeper through thicker parts
  attenuationDistance: 1,
});

export { cubeMaterial, floorMaterial, normalMaterial, earthMaterial, liquidMaterial };

