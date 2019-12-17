export default class End extends Phaser.Scene {
    constructor() {
  
      super({ key: 'end' });
      
  
    }

    create()
    {
        this.titleText = this.add.text(100, 400, 'Thanks for playing', { fontSize: '80px', fill: '#FFF' }).setInteractive();
    }
}