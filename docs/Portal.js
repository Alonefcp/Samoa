export default class Portal extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, img, player, NextStage,music) {
    super(scene, x, y, img);
    this.player = player;
    this.NextStage = NextStage;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.play('portalDoor');
    this.scene.physics.add.overlap(this, this.player, () => {
      this.player.NextStage();
      this.scene.scene.sleep('level' + (this.NextStage - 1).toString());
      this.scene.scene.sleep('HUD');
      this.scene.scene.get('Combinator').NextStage();
      this.scene.music.stop();
      this.scene.scene.run('Shop', { money: this.player.getMoney(), stage: this.NextStage, unlockedMagic: this.player.getUnlockedMagic() });
      this.destroy();
    }, null, this);
  }
}