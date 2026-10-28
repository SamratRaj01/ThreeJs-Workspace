import * as THREE from "three";

// Action -> keys. Rebind here; gameplay code only knows action names.
const bindings = {
  forward: ["KeyW", "ArrowUp"],
  backward: ["KeyS", "ArrowDown"],
  left: ["KeyA", "ArrowLeft"],
  right: ["KeyD", "ArrowRight"],
  jump: ["Space"],
  dash: ["ShiftLeft", "ShiftRight"],
} satisfies Record<string, string[]>;

export type Action = keyof typeof bindings;

const keys = new Set<string>();

window.addEventListener("keydown", (e) => keys.add(e.code));
window.addEventListener("keyup", (e) => keys.delete(e.code));
window.addEventListener("blur", () => keys.clear());

export const isActionDown = (action: Action) =>
  bindings[action].some((code) => keys.has(code));

const moveAxis = new THREE.Vector2();

// x: right (+) / left (-), y: forward (+) / backward (-). Opposite keys cancel out.
export const getMoveAxis = () =>
  moveAxis.set(
    Number(isActionDown("right")) - Number(isActionDown("left")),
    Number(isActionDown("forward")) - Number(isActionDown("backward"))
  );
