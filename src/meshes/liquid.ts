import * as THREE from 'three';
import { liquidMaterial } from '../shared/materials';

// High segment count so the wobble looks smooth
const geometry = new THREE.SphereGeometry(0.5, 128, 128);
const position = geometry.attributes.position;
const basePositions = position.array.slice(); // original shape, used every frame

const liquid = new THREE.Mesh(geometry, liquidMaterial);
liquid.position.y = 1;
liquid.castShadow = true;

const v = new THREE.Vector3();

export const updateLiquid = (time: number) => {
  for (let i = 0; i < position.count; i++) {
    v.fromArray(basePositions, i * 3);

    // Layered sine waves give an organic wobble
    const wobble =
      Math.sin(v.x * 6 + time * 2.0) *
      Math.sin(v.y * 7 + time * 1.5) *
      Math.sin(v.z * 5 + time * 1.7);

    v.multiplyScalar(1 + wobble * 0.15); // push in or out from the center
    position.setXYZ(i, v.x, v.y, v.z);
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals(); // so lighting follows the new shape
};

export default liquid;
