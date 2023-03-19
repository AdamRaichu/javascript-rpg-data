import Entity from "./Entity.js";

export class Player extends Entity {
  constructor(name) {
    super(name, 100, 5, { combat: 2, idle: 10, interval: 60000 });
  }
}
