import gui from "../core/gui";
import { registerCooldown } from "../ui/cooldownHud";
import { Player } from "./player";
import { PlayerState } from "./playerStates";
import { Movement } from "./mechanics/movement";
import { Jump } from "./mechanics/jump";
import { Dash } from "./mechanics/dash";

// Composition root for the player: which mechanics exist and which states run them.
// New mechanic = create it, expose its tuning/cooldown here, list it under the states it works in.
export const createPlayer = () => {
  const movement = new Movement();
  const jump = new Jump();
  const dash = new Dash();

  const dashFolder = gui.addFolder("Dash");
  dashFolder.add(dash, "speed").min(1).max(50).step(0.1).name("Speed");
  dashFolder.add(dash, "duration").min(0.05).max(1).step(0.01).name("Duration");
  dashFolder.add(dash, "cooldown").min(0).max(3).step(0.01).name("Cooldown");
  registerCooldown("Dash", dash);

  // dash runs last so it can take over velocity on the frame it starts
  return new Player()
    .addState(PlayerState.Grounded, [movement, jump, dash])
    .addState(PlayerState.Airborne, [movement, dash])
    .addState(PlayerState.Dashing, [dash]);
};
