import Player from './Player.js';
export default class Game extends Phaser.Scene{
    constructor() {
    
        super({key:'main'});
      }
      
      preload() 
      {   
        this.load.image('hero','../Assets/idle0.png');
      }
                
      create() 
      {
        this.player=new Player(this,100,100,'player');
        this.player.sprite=this.physics.add.sprite(100,100,'hero');
        this.player.sprite.setCollideWorldBounds(true);
        this.cursors=this.input.keyboard.createCursorKeys();
      }
    
      update(time, delta) 
      { 
        this.player.Stop()

        if (this.cursors.up.isDown)
        this.player.MoveUp();
        else if (this.cursors.down.isDown)
        this.player.MoveDown();
        
        if (this.cursors.right.isDown)
        this.player.MoveRight();
        else if (this.cursors.left.isDown)
        this.player.MoveLeft();  
      }
}