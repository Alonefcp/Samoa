import Player from './Player.js';
export default class Game extends Phaser.Scene{
    constructor() {
    
        super({key:'main'});
      }
      
      preload() 
      {   
        // this.load.spritesheet('hero','Assets/knight iso char.png',{frameWidth: 84 , frameHeight: 84});
        this.load.image('hero','Assets/knight iso char.png');
      }
                
      create() 
      {
        this.player=new Player(this);
    //  let standingAnim = this.anims.create({
    //       key: 'standing-sprite',
    //       frames:this.anims.generateFrameNumbers('hero',{start: 0 , end: 3}),
    //       framerate:2,
    //       repeat:-1

    //     });
    //      this.anims.create({
    //       key: 'down',
    //       frames:this.anims.generateFrameNumbers('hero',{start: 4 , end: 6}),
    //       framerate:2,
    //       repeat:-1

    //     });
   scene.add.existing(this);
   scene.add.physics.existing(this);
        this.player.sprite.setCollideWorldBounds(true);
        this.cursors=this.input.keyboard.createCursorKeys();
      }
    
      update(time, delta) 
      { 
        this.player.Stop();
       
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