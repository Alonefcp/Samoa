import Entity from './Entity.js'; 
export default class Player extends Entity{
    
    constructor(scene, x, y) {
      super(scene,x,y,'player');

     
      scene.physics.add.existing(this);
      this.maxMana = 100;
      this.mana = this.maxMana;
      this.dirX = 0;
      this.dirY = 1;
      this.Spawnx = x;
      this.Spawny = y;
      this.SpeedNerf =.5;
      this.speedX = 160;
      this.speedY = 160;   
      this.cont = 0; 
      this.SlowTime = 0;
      this.atkcont = 0;
      this.poisonedTime = 0;
      this.poisonIntervals = 0;
      this.slowdown = false;
      this.poison = false;
      this.currentMagic = 0; //0: fuego, 1: agua 2: viento 3:niebla 4:tornado 5: remolino
    }
      
      preload() 
      { 
      }
    
      create() 
      {
      }
    
      preupdate(time, delta) 
      {    
        if(this.slowdown===true){
    console.log("bbbb");
          this.SlowTime += 1;
              if (this.SlowTime >= 100)
            {
              this.slowdown=false; 
              this.SlowTime = 0;
            }
           
        }
        if (this.poison === true){
          console.log("aaaa");
          this.poisonDamage=this.MaxHP/20;  
          this.poisonedTime += 1;
          this.poisonIntervals += 1;
              if (this.poisonedTime >= 100){
                this.poison = false;
                this.poisonedTime = 0;
              }
              else if (this.PoisonIntervals >=20 && this.HP - this.poisonDamage > 0){
                
                ReceiveDamage(this.poisonDamage);
                console.log(this.player.HP);
                this.poisonIntervals=0;
              }
        }  
      }

        MoveUp() 
        {
          if(this.slowdown)
          this.body.setVelocityY(-this.speedY * ( 1 - this.SpeedNerf));
          else
          this.body.setVelocityY(-this.speedY);
          this.dirX = 0;
          this.dirY = -1;
        }
        MoveUpRight(){
          this.dirX = 1;
          this.dirY = -1;
          if(this.slowdown)
          {this.body.setVelocityY(Math.sin(this.dirY)*this.speedY * ( 1 - this.SpeedNerf));
          this.body.setVelocityX(Math.cos(this.dirX)*this.speedX * ( 1 - this.SpeedNerf));
          }
            else
          {
            this.body.setVelocityY(Math.sin(this.dirY)*this.speedY);
            this.body.setVelocityX(Math.cos(this.dirX)*this.speedX);
          }
      }
        MoveUpLeft(){
          this.dirX = -1;
          this.dirY = -1;
          if(this.slowdown)
          {
          this.body.setVelocityY(Math.sin(this.dirY)*this.speedY * ( 1 - this.SpeedNerf));
          this.body.setVelocityX(-Math.cos(this.dirX)*this.speedX * ( 1 - this.SpeedNerf));
          }
            else
         {
            this.body.setVelocityY(Math.sin(this.dirY)*this.speedY);
            this.body.setVelocityX(-Math.cos(this.dirX)*this.speedX);
          }
      }
        MoveDown()
        {
          if(this.slowdown)
          this.body.setVelocityY(this.speedY * (1 - this.SpeedNerf));
          else
          this.body.setVelocityY(this.speedY);
          this.dirX = 0;
          this.dirY = 1;
        }
        MoveDownRight(){
          this.dirX = 1;
          this.dirY = 1;
          if(this.slowdown)
          {
            this.body.setVelocityY(Math.sin(this.dirY)*this.speedY * ( 1 - this.SpeedNerf));
            this.body.setVelocityX(Math.cos(this.dirX)*this.speedX * ( 1 - this.SpeedNerf));
          }
            else
          {
            this.body.setVelocityY(Math.sin(this.dirY)*this.speedY);
            this.body.setVelocityX(Math.cos(this.dirX)*this.speedX);
          }
        }
        MoveDownLeft(){
          
          this.dirX = -1;
          this.dirY = 1;
          if(this.slowdown)
          {
            this.body.setVelocityY(Math.sin(this.dirY)*this.speedY * ( 1 - this.SpeedNerf));
            this.body.setVelocityX(-Math.cos(this.dirX)*this.speedX * ( 1 - this.SpeedNerf));
          }
            else {

            this.body.setVelocityY(Math.sin(this.dirY)*this.speedY);
            this.body.setVelocityX(-Math.cos(this.dirX)*this.speedX);
          }
      }
        MoveRight()
        {
          if(this.slowdown)
          this.body.setVelocityX(this.speedX * (1 - this.SpeedNerf));
          else
          this.body.setVelocityX(this.speedX);
          this.dirY = 0;
          this.dirX = 1;
        }

        MoveLeft()
        {
          if(this.slowdown)
          this.body.setVelocityX(-this.speedX * (1 - this.SpeedNerf));
          else
          this.body.setVelocityX(-this.speedX);
          this.dirX = -1;
          this.dirY = 0;
        }

        Stop(){
          this.body.setVelocityX(0);
          this.body.setVelocityY(0);
        }
        Attack(){
          
          this.trigger = this.scene.add.zone(this.x + 20*this.dirX, this.y+84*this.dirY);
          if(this.dirX != 0)
            this.trigger.setSize(16,64);
          else if(this.dirY != 0)
            this.trigger.setSize(32,16);
          this.scene.physics.world.enable(this.trigger);
          this.trigger.body.setAllowGravity(false);
          this.trigger.body.moves = false;
        }
        Spawn(){
          this.body.reset(this.Spawnx,this.Spawny);
          this.ResetHP();
        }
        
       SlowDown(){
         this.slowdown=true;
       }
       Poison(){
          this.poison=true;
       }
        
       PlayerGetDamage()
       {
           this.cont+=2;
  
          if(this.cont >= 50)
          {
            this.ReceiveDamage(10);
            console.log(this.HP);
            this.cont=0;
          }
        }
        CastMagic(){
          switch(this.currentMagic){
            case 0:
              this.fireball=new Fireball
              break;
          }
        }
        
    }
    
    
