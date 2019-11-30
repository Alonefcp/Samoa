import Magic from './Magic.js'
export default class WaterRay extends Magic{
    constructor(scene, x, y, sprite,damage,angle){
        super(scene,x,y,sprite,damage);

        this.angle=angle;
        this.setOrigin(.5,1);
        this.hasHit=false;
        this.cos = Math.cos(this.angle);
        this.sin = Math.sin(this.angle);
        this.setPosition(this.x+this.cos,this.y +this.sin);
        this.setRotation(this.angle);
        this.startTime=30;
        this.time=0;
        this.maxtime=50;
        this.animPart=0;
        this.play('waterStart',true);
        this.scene.enemies.getChildren().forEach(function(enemy){
                    
          if(this.AABB(this,enemy))
          {
            this.Harm(enemy);               
          }             
           
          },this);
        this.on('animationcomplete',()=>{
            this.key=this.anims.getCurrentKey();
            if(this.key==='waterStart')
                this.play('water',true);
            else if(this.key==='water')
                this.play('waterEnd');
            else
            {   
                    this.setActive(false);             
            }
            this.animPart++;
        })
    }
    preUpdate(time, delta)
    {
          super.preUpdate(time,delta);
          this.time++;
          if (this.animPart===1 && this.time >= this.maxtime)
            {
              this.anims.stop();
            }
          if(!this.active)
            this.destroy();
            

    }
    OnOverlap(waterray,enemy){
       this.Harm(enemy);
    }
    AABB(sprite1,sprite2)
  {
    this.bounds1 = sprite1.getBounds();
    this.bounds2 = sprite2.getBounds();
    this.rect1 = new Phaser.Geom.Rectangle(this.bounds1.x, this.bounds1.y, this.bounds1.width, this.bounds1.height);
    this.rect2 = new Phaser.Geom.Rectangle(this.bounds2.x, this.bounds2.y, this.bounds2.width, this.bounds2.height);
    return Phaser.Geom.Rectangle.Overlaps(this.rect1, this.rect2); 
    
  }
}