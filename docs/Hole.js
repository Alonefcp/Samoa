import Trap from './Trap.js';
export default class Hole extends Trap {
    constructor(scene, x, y, img, player) {
        super(scene, x, y, img);
        this.player = player;
        this.cont = 0;
        this.firstTime = true;
        this.scene.physics.add.overlap(this.player, this, this.ApplyEffect, null, this);
    }
    ApplyEffect(player, hole) {
        this.setFrame(1);
        if (this.firstTime) this.cont++;
        if (this.cont > 18) {
            this.firstTime = false;
            player.Spawn();
        }
    }
}