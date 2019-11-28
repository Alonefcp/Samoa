import Entity from './Entity.js'; 
import Fireball from './Fireball.js';
import WaterRay from './WaterRay.js';
import Wind from './Wind.js';
import TimeStop from './TimeStop.js';
import Tornado from './Tornado.js';
export default class Player extends Entity{
    
    constructor(scene, x, y) {
      super(scene,x,y,'player');

      scene.physics.add.existing(this);

      this.coins=0;

      this.maxMana = 100;
      this.mana = this.maxMana;

      this.fireballCost=5;
      this.waterrayCost=5;
      this.windcost=5;
      this.fireballDamage=5;
      this.waterRayDamage=5;
      this.tornadoSpeed=10;
      this.tornadoDamage=5;
      this.fireballSpeed=150;
      this.TimeStopDuration=200;
      this.timestopCost=5;
      this.tornadoCost=5
      
      this.isAttacking = false;
      this.atkTime = 0;
      this.Spawnx = x;
      this.Spawny = y;
      this.SpeedNerf =.5;
      this.speedX = 160;
      this.speedY = 160;  
      this.cont = 0; 
      this.SlowTime = 0;
      this.atkcont = 0;
      this.thrust=false;
      this.thrustX=0;
      this.thrustY=0;
      this.thrustCont=0;
      this.poisonedTime = 0;
      this.poisonIntervals = 0;
      this.slowdown = false;
      this.poison = false;
      this.currentMagic = 4; //0: fuego, 1: agua 2: viento 3:niebla 4:tornado 5: remolino
      
            
    }
      

      preUpdate(time, delta) 
      {           
        super.preUpdate(time,delta);
       
        
        //Aplica un empuje al jugador
       if(this.thrust){
         this.thrustCont++;
         this.ApplyForce(this.thrustX,this.thrustY);
         if(this.thrustCont>=25)
          {
            this.thrust=false;
            this.thrustCont=0;
          }
       }
       
       //Ralentizamos al jugador un tiempo
        if(this.slowdown===true){
    
          this.SlowTime += 1;
          if (this.SlowTime >= 100)
            {
              this.slowdown=false; 
              this.SlowTime = 0;
            }          
        }
       
        //El veneno resta vida al jugador un tiempo
        if (this.poison === true){
          this.poisonDamage=this.MaxHP/20;  
          this.poisonedTime += 1;
          this.poisonIntervals += 1;
           if (this.poisonedTime >= 250)
           {
              this.poison = false;
              this.poisonedTime = 0;
           }
           else if (this.poisonIntervals >=75 && this.HP - this.poisonDamage > 0)
           {               
              this.ReceiveDamage(this.poisonDamage);
              this.scene.HUDscene.ReduceHealthBar(this.HP,this.MaxHP);
              this.poisonIntervals=0;
            }
        }         
      }

        Move(dirX,dirY)  
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


        Attack()
        {
          this.CalcDir();
          this.trigger = this.scene.add.zone(this.x + this.width/4*this.AtkDirX, this.y+this.height/4*this.AtkDirY);
          this.trigger.setSize(32,32);  
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
          this.resetMana();
          this.coins=0;
          //Reseteamos las barras a 100 y las monedas a 0
          this.scene.HUDscene.lifebar.displayWidth = this.scene.HUDscene.initialWidth;
          this.scene.HUDscene.manabar.displayWidth = this.scene.HUDscene.initialWidthMana;
          this.scene.HUDscene.UpdateCoins(this.coins);
        }
        
        //Activa la ralentizacion
       SlowDown()
       {
         this.slowdown=true;
       }
       //Activa el veneno
       Poison()
       {
         this.poison=true;
       }
        //Activa los pinchos
        Spikes()
        {
            this.cont+=2;
  
           if(this.cont >= 50)
           {
             this.ReceiveDamage(10); 
             this.scene.HUDscene.ReduceHealthBar(this.HP,this.MaxHP);          
             this.cont=0;
          }
         }

        CastMagic()
        {
          switch(this.currentMagic){
            case 0:
              if(this.mana-this.fireballCost>=0)
              {this.fireball=new Fireball(this.scene,this.x + 80,this.y,'fireball',this.fireballDamage,this.fireballSpeed,1,0,0);
              this.fireball2=new Fireball(this.scene,this.x,this.y +80,'fireball',this.fireballDamage,this.fireballSpeed,0,1,0);
              this.fireball3=new Fireball(this.scene,this.x-80,this.y,'fireball',this.fireballDamage,this.fireballSpeed,-1,0,0);
              this.fireball4=new Fireball(this.scene,this.x,this.y -80,'fireball',this.fireballDamage,this.fireballSpeed,0,-1,0);
              this.fireball5=new Fireball(this.scene,this.x-Math.cos(Math.PI/4)*80,this.y-Math.sin(Math.PI/4)*80,'fireball',this.fireballDamage,this.fireballSpeed,
              -Math.cos(Math.PI/4),-Math.sin(Math.PI/4),0);
              this.fireball6=new Fireball(this.scene,this.x+Math.cos(Math.PI/4)*80,this.y-Math.sin(Math.PI/4)*80,'fireball',this.fireballDamage,this.fireballSpeed,
              Math.cos(Math.PI/4),-Math.sin(Math.PI/4),0);
              this.fireball7=new Fireball(this.scene,this.x-Math.cos(Math.PI/4)*80,this.y+Math.sin(Math.PI/4)*80,'fireball',this.fireballDamage,this.fireballSpeed,
              -Math.cos(Math.PI/4),Math.sin(Math.PI/4),0);
              this.fireball8=new Fireball(this.scene,this.x+Math.cos(Math.PI/4)*80,this.y+Math.sin(Math.PI/4)*80,'fireball',this.fireballDamage,this.fireballSpeed,
              Math.cos(Math.PI/4),Math.sin(Math.PI/4),0);
              this.mana-=this.fireballCost;  
            }
            
            break;
              case 1:
                if(this.mana - this.waterrayCost>=0)
                {
                  this.CalcDir();
                  if(this.nDX>0)this.water=new WaterRay(this.scene,this.x  + this.AtkDirX,this.y + this.AtkDirY,'waterray',this.waterRayDamage,Math.atan(this.nDY/this.nDX) + Math.PI/2);
                  else this.water=new WaterRay(this.scene,this.x  + this.AtkDirX,this.y + this.AtkDirY,'waterray',this.waterRayDamage,Math.atan(this.nDY/this.nDX) - Math.PI/2);
                  this.mana-=this.waterrayCost;
                }break;
              case 2:
                if(this.mana - this.windcost>=0)
                {
                this.CalcDir();
                this.wind = new Wind(this.scene,this.x-100,this.y,'wind');
                this.wind.setScale(4.5);
                this.wind.alpha = 0.3; 
                //hacemos que a los enemigos les afecte la magia de viento    
                this.scene.enemies.getChildren().forEach(function(enemy){                     
                  enemy.windForce = true;                       
               },this);
                this.mana-=this.windcost;
              }
                
                break;
              case 3:
                  if(this.mana - this.timestopCost>=0){
                    this.timestop=new TimeStop(this.scene,this.x,this.y,'time',this.TimeStopDuration,this.scene.enemies);   
                    this.mana-=this.timestopCost;
            }
                  break;  
               case 4:
            if(this.mana-this.tornadoCost)     
               {
                 this.CalcDir();
                 this.tornado=new Tornado(this.scene,this.x,this.y,'tornado',this.tornadoDamage,this.tornadoSpeed,this.fireballDamage,this.fireballSpeed,this.AtkDirX,
                 this.AtkDirY,this.scene.enemies);
                 this.mana-=this.tornadoCost;    
               }
                 break;
          }

           //Actualizamos la barra de mana
          this.scene.HUDscene.ReduceManaBar(this.mana,this.maxMana);
        }
        
        CalcDir(){
          this.nDX=this.scene.pointer.worldX-this.x
          this.nDY=this.scene.pointer.worldY-this.y;
          this.module=Math.sqrt(Math.pow(this.nDX,2)+Math.pow(this.nDY,2));
          this.AtkDirX=this.nDX/this.module;
          this.AtkDirY=this.nDY/this.module;
        }
        
        setThrust(ntX,ntY){
          this.thrust=true;
          this.thrustX=ntX;
          this.thrustY=ntY;
        }

        RotateMagic(){
          this.currentMagic=(this.currentMagic+1)%3;
        }

        RecoverMana(mana){
          if(mana > 0)
          if(this.mana+mana<this.maxMana)
          this.mana+=mana;
          else this.mana=this.maxMana;
         //Actualizamos la barra de mana
         this.scene.HUDscene.ReduceManaBar(this.mana,this.maxMana);
        }

        GetCoins(coins){
          if(coins > 0)
          this.coins+=coins;
          this.scene.HUDscene.UpdateCoins(this.coins);

        }
        resetMana(){
          this.mana=this.maxMana;
        }

        
    }
    
    
