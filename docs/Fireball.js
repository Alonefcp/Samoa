import Magic from './Magic.js'
import Enemy from './Enemy.js';
export default class Fireball extends Magic{
    constructor(scene, x, y, sprite,damage,speed){
        super(scene,x,y,sprite,damage);
        this.trigger=this.scene.add.zone(this.x,this.y);
        this.scene.physics.world.enable(this.trigger);
        this.trigger.setSize(32,32);
        this.trigger.body.setAllowGravity(false);
        this.trigger.body.moves = false;    
        this.dirX=this.x-this.scene.player.x;
        this.dirY=this.y-this.scene.player.y;
        this.module=Math.sqrt(Math.pow(this.dirX,2)+Math.pow(this.dirY,2));
        this.dirX/=this.module;
        this.dirY/=this.module;
        this.speed=speed;
        this.time=0;
        this.maxtime=66;
        this.scene.physics.add.overlap(this.scene.enemies,this,this.Harm);
    }
             
    
      preUpdate(time, delta) 
      { 
          
            super.preUpdate(time,delta);
             this.Move();
              this.time++;
             
            if(this.time >= this.maxtime && this.time< this.maxtime + 30){
                 this.play('explosion',true);
                 this.body.setVelocityX(0);
                 this.body.setVelocityY(0);
            }
            else if (this.time >= this.maxtime + 30)
            this.destroy();
            else this.play('fire',true);
    

    }
    Move(){
        this.body.setVelocityX(this.dirX*this.speed);
        this.body.setVelocityY(this.dirY*this.speed);
    }
    Harm(){
        this.scene.enemies.ReceiveDamage(this.damage);
        if(!this.enemies.IsAlive())
        this.enemies.destroy();
        
        
    }
}