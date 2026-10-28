import * as THREE from "three";
import { PlayerState } from "./playerStates";

// Anything with an update() can be attached to the player (see ./mechanics)
type Mechanic = { update(player: Player, dt: number): void };


const RADIUS = 0.4;
const LENGTH = 0.8;
export const HALF_HEIGHT = RADIUS + LENGTH / 2; // capsule center sits this high when grounded

const GRAVITY = -20;

// The capsule body: holds shared state and runs physics. Behaviour comes from attached mechanics.
export class Player extends THREE.Mesh {
  velocity = new THREE.Vector3();
  // Last direction the player moved in (starts facing screen-up)
  facing = new THREE.Vector3(-1, 0, -1).normalize();
  state: PlayerState = PlayerState.Grounded;
  gravityScale = 1;
  private mechanics: Record<PlayerState, Mechanic[]> = {
    [PlayerState.Grounded]: [],
    [PlayerState.Airborne]: [],
    [PlayerState.Dashing]: [],
  };

  constructor() {
    super(
      new THREE.CapsuleGeometry(RADIUS, LENGTH, 8, 16),
      new THREE.MeshStandardMaterial({ color: "#ff7043" })
    );
    this.position.y = HALF_HEIGHT;
  }

  // Mechanics only run while the player is in this state, so they can't fight each other
  addState(state: PlayerState, mechanics: Mechanic[]) {
    this.mechanics[state] = mechanics;
    return this;
  }

  update(dt: number) {
    for (const mechanic of this.mechanics[this.state]) mechanic.update(this, dt);

    this.velocity.y += GRAVITY * this.gravityScale * dt;
    this.position.addScaledVector(this.velocity, dt);

    // Ground collision
    const onGround = this.position.y <= HALF_HEIGHT;
    if (onGround) {
      this.position.y = HALF_HEIGHT;
      this.velocity.y = 0;
    }

    // Physics drives the grounded <-> airborne transitions
    if (onGround && this.state === PlayerState.Airborne) {
      this.state = PlayerState.Grounded;
    } else if (!onGround && this.state === PlayerState.Grounded) {
      this.state = PlayerState.Airborne;
    }
  }
}
