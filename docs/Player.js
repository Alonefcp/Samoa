import Entity from './Entity.js'; 
let sprite;
export default class Player extends Entity{
    
    constructor(scene, x, y) {
      super(scene,x,y,'player');

     
      scene.physics.add.existing(this);

      
      this.speedX=160;
      this.speedY=160;    
      }
      
      preload() 
      { 
      }
    
      create() 
      {
      }
    
      preupdate(time, delta) 
      {    
      }

        MoveUp() 
        {
          this.body.setVelocityY(-this.speedY);
        }

        MoveDown()
        {
          this.body.setVelocityY(this.speedY);
        }

        MoveRight()
        {
          this.body.setVelocityX(this.speedX);
        }

        MoveLeft()
        {
          this.body.setVelocityX(-this.speedX);
        }

        Stop(){
          this.body.setVelocityX(0);
          this.body.setVelocityY(0);
        }
      }
    
    
