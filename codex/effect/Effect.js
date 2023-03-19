export class Effect {
  /**
   * A representation of a buff or debuff which would effect an entity.
   * @param {String} name The display name of the effect.
   * @param {String} description The description of the effect.
   * @param {number} duration The time (in seconds) the effect will last.
   * @param {effectOptions} options Options controlling the effect's effectiveness.
   */
  constructor(name, description, duration, options) {
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.type = options.type;
    this.multiplier = options.multiplier;
    this.amount = options.amount;
    setInterval(() => {
      this.activeTime += 1;
    }, 1000);
  }

  activeTime = 0;
}

/**
 * @typedef {Object} effectOptions
 * @property {effectType} type The stat the effect affects.
 * @property {number|undefined} multiplier For multiplicative effects: The amount to multiply the base by.
 * @property {number|undefined} amount For additive effects: The amount to increase the base by.
 */

/**
 * @typedef {"baseDamage" | "baseHealth" | "damageMultiplier" | "healthRegenBase" | "healthRegenMultiplier" | "resistanceMultiplier"} effectType
 */
