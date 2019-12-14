export default class Portal extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, img, player, NextStage) {
    super(scene, x, y, img);
    this.player = player;
    this.NextStage = NextStage;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.play('portalDoor');
    this.scene.physics.add.overlap(this, this.player, () => {
      this.player.NextStage();
      this.scene.scene.sleep('main');
      this.scene.scene.sleep('HUD');
      this.scene.scene.run('Shop', { money: this.player.getMoney(), stage: this.NextStage });
      this.destroy();
    }, null, this);
  }
}