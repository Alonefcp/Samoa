import Trap from './Trap.js';
export default class Acid extends Trap {
    constructor(scene, x, y, img, player) {
        super(scene, x, y, img);
        this.player = player;
        this.scene.physics.add.overlap(this.player, this, this.ApplyEffect, null, this);
    }
    ApplyEffect(player, acid) {
        player.Acid();
    }
}