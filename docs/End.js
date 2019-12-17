export default class End extends Phaser.Scene {
    constructor() {
  
      super({ key: 'end' });
      
  
    }

    preload()
    {
      this.load.image('endText','Assets/endText.png');
    }

    create()
    {
        this.endText = this.add.image(800, 400, 'endText').setScale(0.5);
    }
}