export default class Menu extends Phaser.Scene {
    constructor() {
  
      super({ key: 'menu' });
      
  
    }

    preload()
    {
        this.load.audio('menu', 'Assets/audio/menu.mp3');
        this.load.image('title','Assets/title.png');
        this.load.image('play','Assets/play.png');
    }

    create()
    {
        this.music = this.sound.add('menu');
        this.music.loop = true;
        this.music.volume = 0.04;
        this.music.play(); 

        this.add.image(700, 300, 'title').setScale(0.7);

        this.playText = this.add.image(700, 600, 'play').setScale(0.5).setInteractive();
        this.playText.on('pointerdown', function () {
            this.music.stop();
            this.scene.start('level1');
        }, this);
    }
}