export default class Book extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, img, player) {
        super(scene, x, y, img);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.player = player;
        this.scene.physics.add.overlap(this, this.player, this.EndLevel, null, this);
        this.play('lockedbook');
    }
    UnlockBook() {
        if(this != undefined)this.play('unlockedbook');
    }
    EndLevel() {
        if (this.scene.AllEnemiesDead()) {
            this.scene.CreateExit();
            this.combinator = this.scene.scene.get('Combinator');
            this.combinator.unlockMagic();
            this.destroy();
        }
    }
}