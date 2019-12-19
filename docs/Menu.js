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

        this.add.image(550, 200, 'title').setScale(0.5);

        this.playText = this.add.image(550, 500, 'play').setScale(0.4).setInteractive();
        this.playText.on('pointerdown', function () {
            this.music.stop();
            this.scene.start('level1');
        }, this);
    }
}