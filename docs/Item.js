export default class Item extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, image, amount) {
        super(scene, x, y, image);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.amount = amount;

    }
}