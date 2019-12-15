import Enemy from './Enemy.js';
export default class Melee extends Enemy {

    constructor(scene, x, y, img, damage,hasReducedLife,player) {
        super(scene, x, y, img, damage,hasReducedLife,player);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.play('meleeIdle', true);
        if (!this.timeStopped)
        {
           if(this.knockback) this.ApplyForce(this.scene.player.AtkDirX, this.scene.player.AtkDirY);
           else this.FollowPlayer(25000, 200);  
        }      
        else this.Stop();

        this.StopKnockback();
    }
    ReceiveDamage(damage) {
        super.ReceiveDamage(damage);
        this.dX = this.x - this.player.x;
        this.dY = this.y - this.player.y;
        this.module = Math.sqrt(Math.pow(this.nDX, 2) + Math.pow(this.nDY, 2));
        this.ApplyForce(this.dX/this.module,this.dY/this.module);
    }
}