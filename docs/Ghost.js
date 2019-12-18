import Enemy from './Enemy.js';
import Fireball from './Fireball.js'
export default class Ghost extends Enemy {

    constructor(scene, x, y, img, constants, hasReducedLife, player) {
        super(scene, x, y, img, hasReducedLife, player);
        this.frireRate = 0;
        this.receiveDamage = false;
        this.HP = 50;
        this.atk = 30;
        this.constants = constants;
        this.atk = constants.ghostAtk;
        this.HP = constants.ghostHP;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.play('ghostIdle', true);
        if (this.timeStopped) {
            this.Stop();
        }
        else if (this.receiveDamage) {
            this.value = Phaser.Math.Between(0, this.scene.ghostPoints.objects.length - 1);
            this.x = this.scene.ghostPoints.objects[this.value].x;
            this.y = this.scene.ghostPoints.objects[this.value].y;
            this.receiveDamage = false;
        }
        else {
            this.FollowPlayer(25000, 10000);

            if (this.distanceToPlayer <= 10000) this.frireRate++;

            if (this.frireRate >= 50) {
                this.scene.enemyFireball.play();
                this.fireball = new Fireball(this.scene, this.x, this.y, this.dirX * this.constants.fireballSpeed, this.dirY * this.constants.fireballSpeed,
                    false, 8, this.constants);
                this.scene.add.existing(this.fireball);
                this.scene.physics.add.existing(this.fireball);
                this.frireRate = 0;
            }
        }
    }
}