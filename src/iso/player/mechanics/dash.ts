import type { Player } from "../player";
import { isActionDown } from "../../core/inputManager";
import { PlayerState } from "../playerStates";

// Attach to the states that can start a dash, and to Dashing so it can run the dash itself.
// Dashes along player.facing, so with no movement input it goes where the arrow points.
export class Dash {
  speed: number;
  duration: number; // seconds the dash lasts
  cooldown: number; // seconds after a dash ends before the next one

  private timeLeft = 0;
  private cooldownLeft = 0;

  get cooldownRemaining() {
    return Math.max(0, this.cooldownLeft);
  }

  constructor(speed = 18, duration = 0.15, cooldown = 0.4) {
    this.speed = speed;
    this.duration = duration;
    this.cooldown = cooldown;
  }

  update(player: Player, dt: number) {
    if (player.state === PlayerState.Dashing) {
      this.timeLeft -= dt;
      if (this.timeLeft > 0) {
        player.velocity.copy(player.facing).multiplyScalar(this.speed);
      } else {
        this.end(player);
      }
      return;
    }

    this.cooldownLeft -= dt;
    if (this.cooldownLeft <= 0 && isActionDown("dash")) this.start(player);
  }

  private start(player: Player) {
    player.state = PlayerState.Dashing;
    player.gravityScale = 0; // hold height during an air dash
    player.velocity.copy(player.facing).multiplyScalar(this.speed);
    this.timeLeft = this.duration;
  }

  private end(player: Player) {
    // Physics turns this into Grounded on the same frame if we're on the floor
    player.state = PlayerState.Airborne;
    player.gravityScale = 1;
    player.velocity.set(0, 0, 0);
    this.cooldownLeft = this.cooldown;
  }
}
