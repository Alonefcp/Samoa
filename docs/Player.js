import Entity from './Entity.js'; 
let sprite;
export default class Player extends Entity{
    
    constructor(scene) {
      let x,y;
      super(scene,x,y,'player');
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
          this.setVelocityY(-this.speedY);
        }

        MoveDown()
        {
          this.setVelocityY(this.speedY);
        }

        MoveRight()
        {
          this.setVelocityX(this.speedX);
        }

        MoveLeft()
        {
          this.setVelocityX(-this.speedX);
        }

        Stop(){
          this.setVelocityX(0);
          this.setVelocityY(0);
        }
      }
    
    
