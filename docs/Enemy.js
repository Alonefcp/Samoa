import Entity from './Entity.js';
export default class Enemy extends Entity {

  constructor(scene, x, y, img, damage, hasReducedLife, player) {
    super(scene, x, y, img);
    scene.physics.add.existing(this);
    this.player = player;
    this.windForce = false;
    this.knockback = false;
    this.knockbackTime = 0;
    this.reducedLife = 20;
    if (hasReducedLife)
      this.HP -= this.reducedLife;
    this.atk = damage;
    this.timeStopped = false;
  }

  FollowPlayer(maxDist, minDist) {
    this.dirX = this.x - this.player.x;
    this.dirY = this.y - this.player.y;
    this.module = Math.sqrt(Math.pow(this.dirX, 2) + Math.pow(this.dirY, 2));
    this.dirX /= this.module;
    this.dirY /= this.module;

    this.distanceToPlayer = Phaser.Math.Distance.Squared(this.x, this.y, this.player.x, this.player.y);

    if (this.windForce)//es afectado por la magia de viento
    {
      this.ApplyForce(this.player.AtkDirX, this.player.AtkDirY);
    }
    else //sigue al jugador
    {
      if (this.distanceToPlayer <= maxDist && this.distanceToPlayer >= minDist) {
        this.body.setVelocityY(this.speedY * 0.5 * this.dirY * -1);
        this.body.setVelocityX(this.speedX * 0.5 * this.dirX * -1);
      }
      else {
        this.Stop();
      }
    }
  }


  StopKnockback() {
    if (this.knockback) {
      this.knockbackTime++;
    }
    if (this.knockbackTime > 4) {
      this.knockbackTime = 0;
      this.knockback = false;
    }
  }

  setTimeStopped(value) {
    this.timeStopped = value;
  }
}


