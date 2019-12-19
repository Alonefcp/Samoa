import Trap from './Trap.js';
export default class Spikes extends Trap {
    constructor(scene, x, y, img, player) {
        super(scene, x, y, img);
        this.player = player;
        this.scene.physics.add.overlap(this.player, this, this.ApplyEffect, null, this);
    }
    ApplyEffect(player, spikes) {
        player.Spikes();
        this.dirX = player.x - this.x;
        this.dirY = player.y - this.y;
        this.module = Math.sqrt(Math.pow(this.dirX, 2) + Math.pow(this.dirY, 2));
        player.setThrust(this.dirX / this.module, this.dirY / this.module);
    }
}