import Player from './Player.js';
export default class Game extends Phaser.Scene {
  constructor() {

    super({ key: 'main' });
  }

  preload() {
    this.load.spritesheet('player', 'Assets/knightisochar.png', { frameWidth: 84, frameHeight: 84 });
  }

  create() {
    this.player = new Player(this, 100, 100);
    this.player.body.setCollideWorldBounds(true);
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key:'up',
      frames: this.anims.generateFrameNumbers('player', { start: 9, end: 13 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key:'right',
      frames: this.anims.generateFrameNumbers('player', { start: 14, end: 19 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key:'left',
      frames: this.anims.generateFrameNumbers('player', { start:20, end: 25 }),
      frameRate: 10,
      repeat: -1

    });
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  update(time, delta) {

    this.player.Stop()
    this.player.anims.play('idle');

    if (this.cursors.up.isDown) {
      this.player.MoveUp();
      this.player.anims.play('up');

    } else if (this.cursors.down.isDown) {
      this.player.MoveDown();
      this.player.anims.play('down');
    }
    if (this.cursors.right.isDown)
      {
      this.player.MoveRight();
    this.player.anims.play('right');
    }
        else if (this.cursors.left.isDown)
      {
        this.player.MoveLeft();
      this.player.anims.play('left');
      }
  }
}