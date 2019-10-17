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
      
      preload() { 
       }
    
      create() {
      }
    
      preupdate(time, delta) {    
      }
       moveUp() {
        this.sprite.setVelocityY(-this.speedY);}

        moveDown(){
          this.sprite.setVelocityY(this.speedY);
        }
        moveRight(){
          this.sprite.setVelocityX(this.speedX);
        }
        moveLeft(){
          this.sprite.setVelocityX(-this.speedX);
        }
        stop(){
          this.sprite.setVelocityX(0);
          this.sprite.setVelocityY(0);
        }
      }
    
    
