import Magic from './Magic.js'
export default class Wind extends Magic{
    constructor(scene, x, y, sprite,damage,speed){
        super(scene,x,y,sprite,damage);
        this.dirX=this.x-this.scene.player.x;
        this.dirY=this.y-this.scene.player.y;
        this.module=Math.sqrt(Math.pow(this.dirX,2)+Math.pow(this.dirY,2));
        this.dirX/=this.module;
        this.dirY/=this.module;
        this.speed=speed;
        this.play('wind');
        this.applyForce = true;
        this.on('animationcomplete',()=>{ 
             
            this.scene.enemies.getChildren().forEach(function(enemy){
               enemy.ApplyForce(0,0);                          
            },this);   

            this.destroy();
        });
    }

    preupdate(time,delta)
    {
        
    }
}