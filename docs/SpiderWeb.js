import Trap from './Trap.js';
export default class SpiderWeb extends Trap {
    constructor(scene, x, y, img, player) {
        super(scene, x, y, img);
        this.player = player;
        this.scene.physics.add.overlap(player, this, this.ApplyEffect, null, this);
    }
    ApplyEffect(player, web) {
        player.SlowDown();
    }
}