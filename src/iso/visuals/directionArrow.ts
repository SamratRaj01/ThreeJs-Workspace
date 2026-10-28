import * as THREE from "three";
import type { Player } from "../player/player";
import gui from "../core/gui";

const arrowSettings = {
  distance: 0.7, // how far in front of the player's center
  size: 1,
  opacity: 0.8,
};

const arrowFolder = gui.addFolder("Arrow");
arrowFolder.add(arrowSettings, "distance").min(0).max(3).step(0.01).name("Distance");
arrowFolder.add(arrowSettings, "size").min(0.1).max(3).step(0.01).name("Size");
arrowFolder.add(arrowSettings, "opacity").min(0).max(1).step(0.01).name("Opacity");

// Flat triangle pointing +Y, laid on the ground so it points +Z
const shape = new THREE.Shape()
  .moveTo(0, 0.2)
  .lineTo(-0.15, -0.1)
  .lineTo(0.15, -0.1)
  .closePath();
const geometry = new THREE.ShapeGeometry(shape);
geometry.rotateX(Math.PI / 2);

const material = new THREE.MeshBasicMaterial({
  color: "white",
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false,
});

const arrow = new THREE.Mesh(geometry, material);

// Pivot sits under the player and turns to face; the arrow is offset forward inside it
const directionArrow = new THREE.Group();
directionArrow.position.y = 0.02; // above the shadow
directionArrow.add(arrow);

export const updateDirectionArrow = (player: Player) => {
  directionArrow.position.x = player.position.x;
  directionArrow.position.z = player.position.z;
  directionArrow.rotation.y = Math.atan2(player.facing.x, player.facing.z);

  arrow.position.z = arrowSettings.distance;
  arrow.scale.setScalar(arrowSettings.size);
  material.opacity = arrowSettings.opacity;
};

export default directionArrow;
