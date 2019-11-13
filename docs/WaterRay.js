import Magic from './Magic.js'
export default class Fireball extends Magic{
    constructor(scene, x, y, sprite,damage,angle){
        super(scene,x,y,sprite,damage);

        this.angle=angle;
        this.setOrigin(.5,1);
        this.setPosition(this.x+Math.cos(this.angle),this.y + Math.sin(this.angle));
        this.setRotation(this.angle);
        this.startTime=30;
        this.time=0;
        this.maxtime=50;
        this.scene.physics.add.overlap(this.scene.enemies,this,this.Harm);
        this.play('waterStart',true);
    }
    preUpdate(time, delta)
    {

          super.preUpdate(time,delta);
          this.time++;

          if(this.time >= this.maxtime + this.startTime && this.time< this.maxtime + 30 + this.startTime){
               this.play('waterEnd',true);

          }
          else if (this.time >= this.maxtime + 30 + this.startTime)
          this.destroy();
          else if (this.time >= this.startTime)this.play('water',true);

    }
}