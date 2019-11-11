import Player from './Player.js'
export default class Magic extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, img, damage) {
        super(scene,x,y,img); 
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.damage=damage;
        
    }
    Harm(enemy,magic){
        this.scene.enemies.kiillandHide(enemy);
        magic.body.enable =false;
       console.log(magic.damage);
        enemy.getDamage(this.damage);
        console.log(enemy.HP);
    }
}