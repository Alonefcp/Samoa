export default class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, img) {
   super(scene,x,y,img); 
   this.MaxHP=100;
   this.HP=100;
   this.atk=10;
   this.speedX=160;
   this.speedY=160; 
 
   scene.add.existing(this);
      
  }
  
 
  preupdate(time, delta) {    
  }

  ReceiveDamage(damage)
  {
      if(this.HP-damage >0)
     this.HP=this.HP-damage;
     else this.HP=0; 
     if(this.HP<=0)
     this.destroy(); 
  }
  ResetHP(){
    this.HP=this.MaxHP;
  }
  

  AABB(sprite1,sprite2)
  {
    this.bounds1 = sprite1.getBounds();
    this.bounds2 = sprite2.getBounds();

    if(this.bounds1.x<this.bounds2.x+this.bounds2.width &&
      this.bounds1.x+this.bounds1.width>this.bounds2.x &&
      this.bounds1.y<this.bounds1.y+this.bounds2.height &&
      this.bounds1.y + this.bounds1.height>this.bounds2.y)
      {
        return true;
      }
   
  }

  DropItem(scene,x,y,img1,img2)
  {
     this.value = Phaser.Math.Between(0, 1);
      if(this.value===0)this.item = scene.physics.add.sprite(x, y, img1);
      else this.item = scene.physics.add.sprite(x, y, img2);
     
     this.item.setScale(2);
     this.item.body.setImmovable(true);
     scene.physics.add.collider(scene.player,this.item,this.DestroyItem,null,this);
  }

  DestroyItem()
  {
      this.item.destroy();
  }
}