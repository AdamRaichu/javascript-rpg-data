export class Entity {
  constructor(name, maxHp, baseDamage, hpRegen) {
    this.name = name;
    this.maxHp = maxHp;
    this.health = maxHp;
    this.baseDamage = baseDamage;
    setInterval(() => {
      if (this.inCombat) {
        this.gainHealth(hpRegen.combat);
      } else {
        this.gainHealth(hpRegen.idle);
      }
    }, hpRegen.interval);
  }

  inCombat = false;

  effects = [];

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

  applyEffect(effect) {}
}

var f = new Entity("Mob 1", 10, 0, { idle: 5, combat: 1, interval: 60000 });
