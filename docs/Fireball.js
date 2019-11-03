export default class Fireball extends Magic{
    constructor(scene, x, y, sprite,damage){
        super(scene,x,y,sprite,damage);
        this.trigger=this.scene.add.zone(this.x,this.y);
        this.scene.physics.world.enable(this.trigger);
        this.trigger.body.setAllowGravity(false);
        this.trigger.body.moves = false;    }
}