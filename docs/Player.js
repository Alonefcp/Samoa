import Entity from './Entity.js'; 
import Fireball from './Fireball.js';
import WaterRay from './WaterRay.js';
import Wind from './Wind.js';
export default class Player extends Entity{
    
    constructor(scene, x, y) {
      super(scene,x,y,'player');

      scene.physics.add.existing(this);
      
      this.maxMana = 100;
      this.mana = this.maxMana;
      this.isAttacking = false;
      this.atkTime = 0;
      this.Spawnx = x;
      this.Spawny = y;
      this.SpeedNerf =.5;
      this.speedX = 160;
      this.speedY = 160;  
      this.canMove=true; 
      this.cont = 0; 
      this.SlowTime = 0;
      this.atkcont = 0;
      this.poisonedTime = 0;
      this.poisonIntervals = 0;
      this.slowdown = false;
      this.poison = false;
      this.currentMagic = 0; //0: fuego, 1: agua 2: viento 3:niebla 4:tornado 5: remolino
    }
      

      preUpdate(time, delta) 
      {    
        
        super.preUpdate(time,delta);
        if(this.slowdown===true){
    
          this.SlowTime += 1;
          if (this.SlowTime >= 100)
            {
              this.slowdown=false; 
              this.SlowTime = 0;
            }
           
        }
        if (this.poison === true){
          this.poisonDamage=this.MaxHP/20;  
          this.poisonedTime += 1;
          this.poisonIntervals += 1;
           if (this.poisonedTime >= 250){
                this.poison = false;
                this.poisonedTime = 0;
              }
              else if (this.poisonIntervals >=75 && this.HP - this.poisonDamage > 0){
                
                this.ReceiveDamage(this.poisonDamage);
                console.log(this.HP);
                this.poisonIntervals=0;
              }
        }         
      }

        Move(dirX,dirY)  
        {
          if(this.canMove)
          {
            if(this.slowdown)
              {
                this.body.setVelocityY(dirY*this.speedY * ( 1 - this.SpeedNerf));
                this.body.setVelocityX(dirX*this.speedX * ( 1 - this.SpeedNerf));
              }
            else
              {
                this.body.setVelocityY(dirY*this.speedY);
                this.body.setVelocityX(dirX*this.speedX);
              }
          }
          else 
          {
            this.Stop();
          }
        }

        Stop()
        {
          this.body.setVelocityX(0);
          this.body.setVelocityY(0);
        }

        Attack()
        {
          this.CalcDir();
          this.trigger = this.scene.add.zone(this.x + 42*this.AtkDirX, this.y+60*this.AtkDirY);
          this.trigger.setSize(64,64);  
          this.scene.physics.world.enable(this.trigger);
          this.trigger.body.setAllowGravity(false);
          this.trigger.body.moves = false;
        }
        Spawn()
        {
          this.slowdown = false;
          this.poison = false;
          this.body.reset(this.Spawnx,this.Spawny);
          this.ResetHP();
        }
        
       SlowDown()
       {
         this.slowdown=true;
       }
       Poison()
       {
         this.poison=true;
       }
        
       PlayerGetDamage(player,enemy)
       {
           this.cont+=2;
  
          if(this.cont >= 50)
          {
            this.ReceiveDamage(10);
            console.log(this.HP);
            this.cont=0;
          }
        }

        CastMagic()
        {
          switch(this.currentMagic){
            case 0:
              this.fireball=new Fireball(this.scene,this.x + 80,this.y,'fireball',5,150);
              this.fireball2=new Fireball(this.scene,this.x,this.y +80,'fireball',5,150);
              this.fireball3=new Fireball(this.scene,this.x-80,this.y,'fireball',5,150,);
              this.fireball4=new Fireball(this.scene,this.x,this.y -80,'fireball',5,150);
              this.fireball5=new Fireball(this.scene,this.x-Math.cos(Math.PI/4)*80,this.y-Math.sin(Math.PI/4)*80,'fireball',5,150);
              this.fireball6=new Fireball(this.scene,this.x+Math.cos(Math.PI/4)*80,this.y-Math.sin(Math.PI/4)*80,'fireball',5,150);
              this.fireball7=new Fireball(this.scene,this.x-Math.cos(Math.PI/4)*80,this.y+Math.sin(Math.PI/4)*80,'fireball',5,150);
              this.fireball8=new Fireball(this.scene,this.x+Math.cos(Math.PI/4)*80,this.y+Math.sin(Math.PI/4)*80,'fireball',5,150);
              break;
              case 1:
                this.CalcDir();
                if(this.nDX>0)this.water=new WaterRay(this.scene,this.x  + this.AtkDirX,this.y + this.AtkDirY,'waterray',50,Math.atan(this.nDY/this.nDX) + Math.PI/2);
                else this.water=new WaterRay(this.scene,this.x  + this.AtkDirX,this.y + this.AtkDirY,'waterray',50,Math.atan(this.nDY/this.nDX) - Math.PI/2);
 
                console.log(this.scene.enemies.getChildren());               
                  this.scene.enemies.getChildren().forEach(function(enemy){

                    if(this.AABB(enemy,this.water))
                    {
                       enemy.ReceiveDamage(this.water.damage);  
                       if(enemy.HP<=0) enemy.DropItem(this.scene,enemy.x,enemy.y,'coin','mana');               
                    }             
                     
                    },this);
                   
                this.canMove=false;
                break;
              case 2:
                this.CalcDir();
                this.wind = new Wind(this.scene,this.x-100,this.y,'wind',0,0);
                this.wind.setScale(4.5);
                this.wind.alpha = 0.3;     
                         
                this.wind.Push(this.scene.enemies,this.AtkDirX,this.AtkDirY);

                break;
          }
        }
        CalcDir(){
          this.nDX=this.scene.pointer.worldX-this.x
          this.nDY=this.scene.pointer.worldY-this.y;
          this.module=Math.sqrt(Math.pow(this.nDX,2)+Math.pow(this.nDY,2));
          this.AtkDirX=this.nDX/this.module;
          this.AtkDirY=this.nDY/this.module;
        }
        setCanMove(value){
          this.canMove=value;
        }
        
    }
    
    
