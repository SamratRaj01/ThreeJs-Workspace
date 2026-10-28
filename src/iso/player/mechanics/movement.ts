import * as THREE from "three";
import type { Player } from "../player";
import { getMoveAxis } from "../../core/inputManager";

// Screen-aligned directions on the ground plane for a camera on the (1, 1, 1) diagonal
const forward = new THREE.Vector3(-1, 0, -1).normalize();
const right = new THREE.Vector3(1, 0, -1).normalize();

export class Movement {
  speed: number;
  private move = new THREE.Vector3();

  constructor(speed = 5) {
    this.speed = speed;
  }

  update(player: Player) {
    const axis = getMoveAxis();
    this.move
      .set(0, 0, 0)
      .addScaledVector(forward, axis.y)
      .addScaledVector(right, axis.x);
    this.move.normalize(); // normalize so diagonals aren't faster
    if (this.move.lengthSq() > 0) player.facing.copy(this.move);

    player.velocity.x = this.move.x * this.speed;
    player.velocity.z = this.move.z * this.speed;
  }
}
