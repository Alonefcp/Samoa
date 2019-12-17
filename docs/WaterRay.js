import Magic from './Magic.js'
import Wind from './Wind.js';
export default class WaterRay extends Magic {
  constructor(scene, x, y, damage, angle, manaCost) {
    super(scene, x, y, 'waterray', damage, manaCost);

    this.angle = angle;
    this.setOrigin(.5, 1);
    this.hasHit = false;
    this.cos = Math.cos(this.angle);
    this.sin = Math.sin(this.angle);
    this.setPosition(this.x + this.cos, this.y + this.sin);
    this.setRotation(this.angle);
    this.startTime = 30;
    this.time = 0;
    this.maxtime = 50;
    this.animPart = 0;
    this.play('waterStart', true);
    this.scene.enemies.getChildren().forEach(function (enemy) {

      if (this.AABB(this, enemy)) {
        this.Harm(enemy);
        if (enemy.receiveDamage != undefined) enemy.receiveDamage = true;
        enemy.knockback = true;
        enemy.SetKnockbackDir(-Math.cos(angle), Math.sin(angle));
      }

    }, this);
    this.on('animationcomplete', () => {
      this.key = this.anims.getCurrentKey();
      if (this.key === 'waterStart')
        this.play('water', true);
      else if (this.key === 'water')
        this.play('waterEnd');
      else {
        this.setActive(false);
      }
      this.animPart++;
    })
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    this.time++;
    if (this.animPart === 1 && this.time >= this.maxtime) {
      this.anims.stop();
    }
    if (!this.active)
      this.destroy();


  }

  AABB(sprite1, sprite2) {
    this.bounds1 = sprite1.getBounds();
    this.bounds2 = sprite2.getBounds();
    this.rect1 = new Phaser.Geom.Rectangle(this.bounds1.x, this.bounds1.y, this.bounds1.width, this.bounds1.height);
    this.rect2 = new Phaser.Geom.Rectangle(this.bounds2.x, this.bounds2.y, this.bounds2.width, this.bounds2.height);
    return Phaser.Geom.Rectangle.Overlaps(this.rect1, this.rect2);

  }
  Cast(x, y, currentmana, dirX, dirY) {
    this.nMana = currentmana - this.manaCost;
    if (this.nMana >= 0) {
      if (dirX < 0)
        this.water = new WaterRay(this.scene, x, y, this.damage, Math.atan(dirY / dirX) - Math.PI / 2, this.manaCost);
      else this.water = new WaterRay(this.scene, x, y, this.damage, Math.atan(dirY / dirX) + Math.PI / 2, this.manaCost);
      this.scene.add.existing(this.water);
      this.scene.physics.add.existing(this.water);
      return this.nMana;
    }
    else return currentmana;
  }
  Next(){
    return new Wind(this.scene,this.x,this.y,this.windcost,false);
  }
  GetCoolDown(){
    return this.waterRayCoolDown;
  }
}