import type { Player } from "../player";
import { isActionDown } from "../../core/inputManager";

export class Jump {
  velocity: number;

  constructor(velocity = 7) {
    this.velocity = velocity;
  }

  // Only attached to the grounded state, so no ground check needed here
  update(player: Player) {
    if (isActionDown("jump")) player.velocity.y = this.velocity;
  }
}
