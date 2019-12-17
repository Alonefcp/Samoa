import Magic from './Magic.js';
export default class Whirlpool extends Magic {
    constructor(scene, x, y, img, damage, enemies,manaCost) {
        super(scene, x, y, img, damage,manaCost);
        this.play('whirlpool', true);
        this.enemies = enemies;
        this.maxDistance = 25000;
        this.atkCont = 0;
        this.scene.physics.add.overlap(this, this.enemies, this.OnOverlap, null, this);
        this.time = 100;
        this.cont = 0;

    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.enemies.getChildren().forEach(function (e) {
            if (Phaser.Math.Distance.Squared(this.x, this.y, e.x, e.y) < this.maxDistance) {

                this.dirX = this.x - e.x;
                this.dirY = this.y - e.y;
                this.mod = Math.sqrt(Math.pow(this.dirX, 2) + Math.pow(this.dirY, 2));
                this.dirX /= this.mod;
                this.dirY /= this.mod;
                e.ApplyForce(this.dirX, this.dirY);
            }
        }, this);
        this.atkCont++;
        this.cont++;
        if (this.cont >= this.time)
            this.destroy();


    }
    OnOverlap(whirlpool, enemies) {
        if (this.atkCont >= 20) {
            whirlpool.Harm(enemies);
            this.atkCont = 0;
        }
    }
}