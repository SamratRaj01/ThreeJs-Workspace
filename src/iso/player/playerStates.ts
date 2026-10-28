// Single source of truth for player states. Add a state here and the type picks it up.
export const PlayerState = {
  Grounded: "grounded",
  Airborne: "airborne",
  Dashing: "dashing",
} as const;

export type PlayerState = (typeof PlayerState)[keyof typeof PlayerState];
