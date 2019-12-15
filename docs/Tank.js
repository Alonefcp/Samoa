import Enemy from './Enemy.js';
import Melee from './Melee.js';
export default class Tank extends Enemy {

    constructor(scene, x, y, img, damage,hasReducedLife,player) {
        super(scene, x, y, img, damage,hasReducedLife,player);

        this.timeMoving = 0;
        this.timePerSpawn = 0;

        this.dirX = Phaser.Math.Between(-1, 1);
        this.dirY = Phaser.Math.Between(-1, 1);
        this.speedX = this.speedY = 55;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.play('tankIdle', true);
        this.distanceToPlayer = Phaser.Math.Distance.Squared(this.x, this.y, this.scene.player.x, this.scene.player.y);
        if (!this.timeStopped) {
            if (this.distanceToPlayer <= 10000) {
                this.Move();
                this.timePerSpawn++;

                if (this.timePerSpawn >= 100) {
                    this.scene.AddEnemies(new Melee(this.scene, this.x + 30, this.y, 'meleeEnemy', 20));
                    this.scene.AddEnemies(new Melee(this.scene, this.x, this.y + 30, 'meleeEnemy', 20));
                    this.scene.AddEnemies(new Melee(this.scene, this.x - 30, this.y, 'meleeEnemy', 20));
                    this.scene.AddEnemies(new Melee(this.scene, this.x, this.y - 30, 'meleeEnemy', 20));
                    this.scene.UpdateNumEnemies(4);

                    this.timePerSpawn = 0;
                }
            }

        }
        else this.Stop();
    }


    Move() {
        this.timeMoving++;

        this.body.setVelocityY(this.speedY * this.dirY);
        this.body.setVelocityX(this.speedX * this.dirY);

        if (this.timeMoving >= 10) {
            this.dirX = Phaser.Math.Between(-1, 1);
            this.dirY = Phaser.Math.Between(-1, 1);
            this.timeMoving = 0;
        }
    }
}