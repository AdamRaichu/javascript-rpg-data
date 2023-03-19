import { Effect } from "../Effect.js";

export class Resistance1 extends Effect {
  constructor() {
    super("Toughness 1", "Decrease the damage you take by 10% for 1 minute.", 60, {
      type: "resistanceMultiplier",
      multiplier: 0.9,
    });
  }
}
