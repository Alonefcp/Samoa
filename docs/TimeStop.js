import Magic from './Magic.js'
export default class TimeStop extends Magic{
    constructor(scene,x,y,img,duration,enemies){
        super(scene,x,y,img,0);
        this.duration=duration;
        this.enemies=enemies;
        this.cont=0;
        this.enemies.getChildren().forEach(function(enemy){
            enemy.setTimeStopped(true);
            if(enemy.fireball!==undefined)
             enemy.fireball.SetTimeStopped(true);
        },this);
        this.play('timeStop',true);
    }
    preUpdate(time,delta){
       super.preUpdate(time,delta);
        this.cont++;
        if (this.cont>=this.duration)
        {           
            this.enemies.getChildren().forEach(function(enemy){
                enemy.setTimeStopped(false);
                if(enemy.fireball!==undefined)
                enemy.fireball.SetTimeStopped(false);
            },this);
                
            
            this.destroy();
        }
    }
}