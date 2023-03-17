declare class Entity {
  constructor(name: string, maxHp: number, basedamage: number, hpRegen);
  name: string;
  maxHp: number;
  health: number;
  baseDamage: number;

  inCombat: boolean;

  effects: Effect[];

  /**
   * Increase the health of the entity.
   * @param amount The amount of health to gain. Can be negative (for taking damage).
   * @returns {number} The remaining health of the entity.
   */
  gainHealth(amount: number): number;
  applyEffect(effect: Effect): void;
}

declare class Effect {
  constructor(name: string, duration: number, options: effectOptions) {}
}

interface effectOptions {
  /**
   * The stat the effect affects.
   */
  type:
    | "baseDamage"
    | "baseHealth"
    | "damageMultiplier"
    | "healthRegenBase"
    | "healthRegenMultiplier";
  /**
   * For multiplicative effects: The amount to multiply the base by.
   */
  multiplier?: number;
}

interface healthRegen {
  /**
   * The amount of health to regain when out of combat.
   */
  idle: number;
  /**
   * The amount of health to regain when in combat.
   */
  combat: number;
  /**
   * How often (in milliseconds) to gain health.
   */
  interval: number;
}
