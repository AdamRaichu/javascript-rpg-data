import { Entity } from "../Entity.js";
import { Resistance1 } from "../../effect/effects/Resistance.js";

export class RockMonster extends Entity {
  constructor() {
    super("Simple Rock Monster", 10, 0.5, { combat: 0, idle: 2, interval: 60000 });
    this.applyEffect(new Resistance1());
  }
}
