export default class Menu extends Phaser.Scene {
    constructor() {
  
      super({ key: 'menu' });
      
  
    }

    preload()
    {
        this.load.audio('menu', 'Assets/audio/menu.mp3');
    }

    create()
    {
        this.music = this.sound.add('menu');
        this.music.loop = true;
        this.music.volume = 0.04;
        this.music.play(); 
        this.titleText = this.add.text(100, 100, 'The sorcerer\'s apprentice', { fontSize: '80px', fill: '#FFF' }).setInteractive();

        this.playText = this.add.text(600, 400, 'Play', { fontSize: '64px', fill: '#FFF' }).setInteractive();
        this.playText.on('pointerdown', function () {
            this.music.stop();
            this.scene.start('level1');
        }, this);
    }
}