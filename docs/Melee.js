import Enemy from './Enemy.js';
export default class Melee extends Enemy {

    constructor(scene, x, y, img, damage, hasReducedLife, player) {
        super(scene, x, y, img, damage, hasReducedLife, player);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.play('meleeIdle', true);
        if (this.timeStopped) {
            this.Stop();
            // if (this.knockback) this.ApplyForce(this.knockbackDirX, this.knockbackDirY);
            // else this.FollowPlayer(25000, 200);
        }
        else
        {
            if (this.knockback) this.ApplyForce(this.knockbackDirX, this.knockbackDirY);
            else this.FollowPlayer(25000, 200);
        }

        this.StopKnockback();
    }
    ReceiveDamage(damage) {
        super.ReceiveDamage(damage);
        this.knockback = true;
    }
}