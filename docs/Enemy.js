import Entity from './Entity.js'; 
export default class Enemy extends Entity{
    
    constructor(scene, x, y,img) {
      super(scene,x,y,img);
      scene.physics.add.existing(this);
      this.windForce=false;
      }
      
    
      preUpdate(time, delta) 
      {
        //Movimiento del enemigo
        super.preUpdate(time,delta);
        this.dirX=this.x-this.scene.player.x;
        this.dirY=this.y-this.scene.player.y;
        this.module=Math.sqrt(Math.pow(this.dirX,2)+Math.pow(this.dirY,2));
        this.dirX/=this.module;
        this.dirY/=this.module;

        this.distanceToPlayer = Phaser.Math.Distance.Squared(this.x, this.y,this.scene.player.x , this.scene.player.y);
        
        if(this.windForce)//es afectado por la magia de viento
        {
          this.ApplyForce(this.scene.player.AtkDirX,this.scene.player.AtkDirY);
        }
        else //sigue al jugador
        {
          if(this.distanceToPlayer<=50000 && this.distanceToPlayer>=1600)
          {
            this.body.setVelocityY(this.speedY*0.5*this.dirY*-1);
            this.body.setVelocityX(this.speedX*0.5*this.dirX*-1);
          }
          else
          {
            this.body.setVelocityY(0);
            this.body.setVelocityX(0);
          }
        }
           
      }
    }
    
    
