import Enemy from './Enemy.js';
import Fireball from './Fireball.js'
export default class Wizard extends Enemy {

    constructor(scene, x, y, img, damage) {
        super(scene, x, y, img, damage);
        this.frireRate = 0;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.play('wizardIdle', true);
        if (this.timeStopped) {
            this.Stop();
        }
        else {
            
            if(this.knockback) this.ApplyForce(this.scene.player.AtkDirX, this.scene.player.AtkDirY);
            else this.FollowPlayer(25000, 10000);

            if (this.distanceToPlayer <= 10000) {
            this.frireRate++;
                if (this.frireRate >= 30) {
                    this.fireball = new Fireball(this.scene, this.x, this.y, 'fireball', this.atk, 150, this.dirX, this.dirY, 1);
                    this.frireRate = 0;
                }
            }

        }

        this.StopKnockback();
    }
}