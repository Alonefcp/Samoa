import Player from './Player.js';
export default class Game extends Phaser.Scene{
    constructor() {
    
        super({key:'main'});
      }
      
      preload() {   
        this.load.image('hero','../Assets/knight iso char_idle_0.png');
      }
                
    
      create() {
        this.player=new Player(this,100,100,'player');
        this.player.sprite=this.physics.add.sprite(100,100,'hero');
        this.player.sprite.setCollideWorldBounds(true);
        this.cursors=this.input.keyboard.createCursorKeys();
      }
    
      update(time, delta) { 
        this.player.stop()
        if (this.cursors.up.isDown)
        this.player.moveUp();
        else if (this.cursors.down.isDown)
        this.player.moveDown();
        if (this.cursors.right.isDown)
        this.player.moveRight();
        else if (this.cursors.left.isDown)
        this.player.moveLeft();
      }
}