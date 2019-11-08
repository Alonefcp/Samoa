import Magic from './Magic.js'
export default class Fireball extends Magic{
    constructor(scene, x, y, sprite,damage,speed){
        super(scene,x,y,sprite,damage);
        this.trigger=this.scene.add.zone(this.x,this.y);
        this.scene.physics.world.enable(this.trigger);
        this.trigger.body.setAllowGravity(false);
        this.trigger.body.moves = false;    
        this.speedX=speed;
        this.speedY=speed;
    }
      preload() 
      { 
      }
    
      create() 
      {
      }
    
      preUpdate(time, delta) 
      {    
        super.preUpdate(time,delta);
        this.Move();
    }
    Move(){
        this.body.setVelocityX(Math.cos(this.speedX));
        this.body.setVelocityY(Math.sin(this.speedY));
    }
}