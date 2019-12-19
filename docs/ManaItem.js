import Item from './Item.js';
export default class ManaItem extends Item {
    constructor(scene, x, y, img, amount, player) {
        super(scene, x, y, img, amount);
        this.player = player
        this.scene.physics.add.overlap(this, this.player, this.OnOverlap, null, this);

    }
    OnOverlap(item, player) {
        player.RecoverMana(item.amount);
        this.destroy();
    }
}