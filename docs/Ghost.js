import Enemy from './Enemy.js';
import Fireball from './Fireball.js'
export default class Ghost extends Enemy{

    constructor(scene, x, y,img,damage){
        super(scene,x,y,img,damage);
       this.frireRate=0;
       this.receiveDamage = false;
    }

    preUpdate(time,delta)
    {
        super.preUpdate(time,delta);

       if(this.timeStopped)
       {
        this.Stop();
       }
       else if(this.receiveDamage)
       {
           this.value = Phaser.Math.Between(0, 2);
           this.x = this.scene.ghostPoints.objects[this.value].x;
           this.y = this.scene.ghostPoints.objects[this.value].y;
           this.receiveDamage=false;
       }
      else 
       {
          this.FollowPlayer(25000,10000);

              if(this.distanceToPlayer<=10000) this.frireRate++;
            
            if(this.frireRate>=50)
            {
               this.fireball = new Fireball(this.scene,this.x,this.y,'fireball',this.atk,150,this.dirX,this.dirY,1);
               this.frireRate=0;
            }
       } 
  }
}