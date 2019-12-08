export default class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, img) {
   super(scene,x,y,img); 
   this.MaxHP=100;
   this.HP=100;
   this.atk=100;
   this.speedX=160;
   this.speedY=160; 
 
   scene.add.existing(this);
      
  }
  
 
  preupdate(time, delta) {    
  }
  Stop(){
    this.body.setVelocityY(0);
    this.body.setVelocityX(0);
  }
  ReceiveDamage(damage)
  {
    if(this.HP-damage >0)this.HP=this.HP-damage;
    else this.HP=0; 
  }
  ResetHP(){
    this.HP=this.MaxHP;
  }
  
  DropItem(){
    this.value = Phaser.Math.Between(0, 2);
    if(this.value<2) this.scene.GenerateItem(this.value,this.x,this.y);
  }

  ApplyForce(dirX,dirY)
  {
    this.body.setVelocityY(dirY*this.speedY);
    this.body.setVelocityX(dirX*this.speedX);
  }
}