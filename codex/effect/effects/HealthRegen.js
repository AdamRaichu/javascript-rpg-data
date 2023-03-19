import { Effect } from "../Effect.js";

export class HealthRegen1 extends Effect {
  constructor() {
    super(
      "Health Regeneration Boost 1",
      "Increase your health regeneration by 50% for 1 hour.",
      3600,
      {
        type: "healthRegenMultiplier",
        multiplier: 1.5,
      }
    );
  }
}
