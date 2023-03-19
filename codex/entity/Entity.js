import { Effect } from "../effect/Effect.js";

export class Entity {
  /**
   *
   * @param {String} name The display name of the entity.
   * @param {number} maxHp The maxmimum hp of the entity.
   * @param {number} baseDamage The damage the entity does with no buffs and no equipment.
   * @param {healthRegen} hpRegen Details of health regeneration. See {@link healthRegen}
   */
  constructor(name, maxHp, baseDamage, hpRegen) {
    this.name = name;
    this.maxHp = maxHp;
    this.health = maxHp;
    this.baseDamage = baseDamage;
    this.hpRegen = hpRegen;
    setInterval(() => {
      if (this.inCombat) {
        if (this.hpRegen.combat < 0) return;
        this.gainHealth(this.hpRegen.combat);
      } else {
        if (this.hpRegen.idle < 0) return;
        this.gainHealth(this.hpRegen.idle);
      }
    }, this.hpRegen.interval);
  }

  /**
   * Whether the entity is in combat.
   */
  inCombat = false;

  /**
   * An array of Effects which apply to the entity. Update with {@link clearOldEffects}.
   * @type {Effect[]}
   */
  effects = [];

  /**
   * Cause the entity to gain health.
   * @param {number} amount The amount of health to gain. Can be negative, which will result in harm instead of healing. **Important**: Do not forget to apply armor.
   * @returns
   */
  gainHealth(amount = 0) {
    console.debug(`{${this.name}} gained ${amount} health.`);
    this.health += amount;
    if (this.health > this.maxHp) {
      this.health = this.maxHp;
      console.debug(`Health cannot exceed maxHp. {${this.name}}'s current hp is ${this.health}`);
    }
    if (this.health <= 0) {
      console.debug(`{${this.name}} died.`);
      this.health = 0;
    }
    return this.health;
  }

  /**
   * Apply an effect to the entity.
   * @param {Effect} effect The effect to apply to the entity.
   */
  applyEffect(effect) {
    this.clearOldEffects();
    this.effects.push(effect);
    switch (effect.type) {
      case "baseHealth":
        this.maxHp += effect.amount;
        this.health += effect.amount;
        setTimeout(() => {
          this.maxHp -= effect.amount;
        }, effect.duration * 1000);
        break;
      case "baseDamage":
        this.baseDamage += effect.amount;
        setTimeout(() => {
          this.baseDamage -= effect.amount;
        }, effect.duration);
        break;
      case "healthRegenBase":
        this.hpRegen.combat += effect.amount;
        this.hpRegen.idle += effect.amount;
        setInterval(() => {
          this.hpRegen.combat -= effect.amount;
          this.hpRegen.idle -= effect.amount;
        }, effect.duration * 1000);
        break;
      default:
        break;
    }
  }

  /**
   * Removes expired effects from {@link effects}.
   */
  clearOldEffects() {
    this.effects = this.effects.filter((effect) => effect.activeTime < effect.duration);
  }

  /**
   * Get an array of effects of a specified type.
   * @param {effectType} type The type of effect to return.
   * @returns {Effect[]} The array of effects of the type requested.
   */
  getActiveEffects(type) {
    this.clearOldEffects();
    return this.effects.filter((effect) => effect.type === type);
  }

  /**
   * Calculate the damage of an attack this entity deals.
   * @returns {number} The calculated damage amount, including effects.
   */
  dealDamage() {
    var d = this.baseDamage;
    this.clearOldEffects();
    var baseDamageModifiers = this.getActiveEffects("baseDamage");
    for (var i = 0; i < baseDamageModifiers.length; i++) {
      d += baseDamageModifiers[i].amount;
    }
    var damageMultipliers = this.getActiveEffects("damageMultiplier");
    for (var i = 0; i < damageMultipliers.length; i++) {
      d = d * damageMultipliers[i].multiplier;
    }
    return d;
  }

  /**
   * Cause damage to the entity.
   * @param {number} amount The amount of damage for the entity to take (before armor and effects).
   * @param {takeDamageOptions} options Options controlling taking damage. See {@link takeDamageOptions}.
   */
  takeDamage(amount, options) {
    var d = amount;
    if (!options?.ignoreArmor) {
      var damageMultipliers = this.getActiveEffects("resistanceMultiplier");
      for (var i = 0; i < damageMultipliers.length; i++) {
        d = d * damageMultipliers[i].amount;
      }
    }
    this.gainHealth(-1 * d);
  }
}

// Type Definitions
/**
 * @typedef {Object} healthRegen
 * @property {number} idle The amount of health to regain when out of combat.
 * @property {number} combat The amount of health to regain when in combat.
 * @property {number} interval How often (in milliseconds) to gain health.
 */

/**
 * @typedef {import("../effect/Effect").effectType} effectType
 */
/**
 * @typedef {Object} takeDamageOptions
 * @property {boolean} ignoreArmor Whether the damage calculation should ignore armor.
 */
