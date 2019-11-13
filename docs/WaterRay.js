import Magic from './Magic.js'
export default class Fireball extends Magic{
    constructor(scene, x, y, sprite,damage,angle){
        super(scene,x,y,sprite,damage);

        this.angle=angle;
        this.setOrigin(.5,1);
        this.hasHit=false;
        this.setPosition(this.x+Math.cos(this.angle),this.y + Math.sin(this.angle));
        this.setRotation(this.angle);
        this.startTime=30;
        this.time=0;
        this.maxtime=50;
        this.animPart=0;
        this.scene.physics.add.overlap(this.scene.enemies,this,this.OnOverlap,null,this);
        this.play('waterStart',true);
        this.on('animationcomplete',()=>{
            this.key=this.anims.getCurrentKey();
            if(this.key==='waterStart')
                this.play('water',true);
            else if(this.key==='water')
                this.play('waterEnd');
            else
                {
                    this.setActive(false);
                    this.scene.player.setCanMove(true);
                    
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
}