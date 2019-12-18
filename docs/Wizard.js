import Enemy from './Enemy.js';
import Fireball from './Fireball.js'
export default class Wizard extends Enemy {

    constructor(scene, x, y, img, constants, hasReducedLife, player) {
        super(scene, x, y, img, hasReducedLife, player);
        this.frireRate = 0;
        this.constants = constants;
        this.atk = constants.wizardAtk;
        this.HP = constants.wizardHP;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.play('wizardIdle', true);
        if (this.timeStopped) {
            this.Stop();
        }
        else {

            if (this.knockback) this.ApplyForce(this.scene.player.AtkDirX, this.scene.player.AtkDirY);
            else this.FollowPlayer(25000, 10000);

            if (this.distanceToPlayer <= 10000) {
                this.frireRate++;
                if (this.frireRate >= 30) {
                    this.scene.enemyFireball.play();
                    this.fireball = new Fireball(this.scene, this.x, this.y, this.dirX * this.constants.fireballSpeed, this.dirY * this.constants.fireballSpeed, false, 8, this.constants);
                    this.scene.add.existing(this.fireball);
                    this.scene.physics.add.existing(this.fireball);
                    this.frireRate = 0;
                }
            }

        }

        this.StopKnockback();
    }
    ReceiveDamage(damage) {
        super.ReceiveDamage(damage);
        this.knockback = true;
    }
}