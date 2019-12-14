export default class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, image, type, amount) {
        super(scene, x, y, image);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.type = type;
        this.amount = amount;
        this.scene.physics.add.overlap(this, this.scene.player, this.OnOverlap, null, this);

    }
    OnOverlap(item, player) {

        if (item.type === 0)
            player.RecoverMana(this.amount);
        else player.GetCoins(this.amount);
        console.log('mana: ' + this.scene.player.mana);
        console.log('money: ' + this.scene.player.coins);
        this.destroy();
    }
}