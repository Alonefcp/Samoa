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
    if(this.HP-damage >0)this.HP=this.HP-damage;
    else this.HP=0; 
  }
  ResetHP(){
    this.HP=this.MaxHP;
  }
  
//Comprueba si dos objetos se superponen
  AABB(sprite1,sprite2)
  {
    this.bounds1 = sprite1.getBounds();
    this.bounds2 = sprite2.getBounds();
    this.rect1 = new Phaser.Geom.Rectangle(this.bounds1.x, this.bounds1.y, this.bounds1.width, this.bounds1.height);
    this.rect2 = new Phaser.Geom.Rectangle(this.bounds2.x, this.bounds2.y, this.bounds2.width, this.bounds2.height);
   
    if(Phaser.Geom.Rectangle.Overlaps(this.rect1, this.rect2))
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

  ApplyForce(dirX,dirY)
  {
    this.body.setVelocityY(dirY*this.speedY);
    this.body.setVelocityX(dirX*this.speedX);
  }
}