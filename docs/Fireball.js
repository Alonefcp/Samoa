import Magic from './Magic.js'
export default class Fireball extends Magic{
    constructor(scene, x, y, sprite,damage,speed){
        super(scene,x,y,sprite,damage);
        this.dirX=this.x-this.scene.player.x;
        this.dirY=this.y-this.scene.player.y;
        this.module=Math.sqrt(Math.pow(this.dirX,2)+Math.pow(this.dirY,2));
        this.dirX/=this.module;
        this.dirY/=this.module;
        this.speed=speed;
        this.time=0;
        this.maxtime=66;
        //overlap entre la bola de fuego y los enemigos
        this.scene.physics.add.overlap(this.scene.enemies,this,this.OnOverlap,null,this);
        this.play('fire');
        this.on('animationcomplete',()=>{
            if(this.anims.getCurrentKey()==='explosion')
            this.setActive(false);
            else {
                this.play('explosion');
            }
        });
        
    }
             
    
      preUpdate(time, delta) 
      { 
          
            super.preUpdate(time,delta);
             this.Move();
              this.time++;
             
            if(this.time >= this.maxtime && this.time< this.maxtime + 20){
                 this.Explode();
            }
            if(!this.active)
            this.destroy();

    }
    Move(){
        this.body.setVelocityX(this.dirX*this.speed);
        this.body.setVelocityY(this.dirY*this.speed);
    }
    OnOverlap(fireball,enemy){
        this.Explode();
        this.Harm(enemy);
        //así evito que dañe a los enemigos mientras se destruye
        this.damage=0;
        
              
    }
    Explode(){
    if(this.anims.getCurrentKey()==='fire')
        this.anims.stop();
        this.speed=0;
    }

}