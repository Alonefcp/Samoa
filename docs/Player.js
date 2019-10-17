import Entity from './Entity.js'; 
let sprite;
export default class Player extends Entity{
    
    constructor(scene) {
      let x,y;
      super(scene,x,y,'player');
      this.sprite=undefined;
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
          this.sprite.setVelocityY(-this.speedY);
        }

        MoveDown()
        {
          this.sprite.setVelocityY(this.speedY);
        }

        MoveRight()
        {
          this.sprite.setVelocityX(this.speedX);
        }

        MoveLeft()
        {
          this.sprite.setVelocityX(-this.speedX);
        }

        Stop(){
          this.sprite.setVelocityX(0);
          this.sprite.setVelocityY(0);
        }
      }
    
    
