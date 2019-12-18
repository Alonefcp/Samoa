import Magic from './Magic.js'
import Fireball from './Fireball.js';
export default class Wind extends Magic {
    constructor(scene, x, y, manaCost, applyForce) {
        super(scene, x, y, 'wind', 0, manaCost);
        this.play('wind');
        if (applyForce)
            this.scene.enemies.getChildren().forEach(el => {
                el.windForce = true;
                this.dir=this.scene.player.CalcDir();
                el.ApplyForce(this.dir.x, this.dir.y);
            },this);
        this.on('animationcomplete', () => {
            //tras acabar la animacion dejamos de aplicar el empuje a los enemigos
            this.scene.enemies.getChildren().forEach(function (enemy) {
                enemy.windForce = false;
            }, this);

            this.destroy();
        });
    }

    Cast(x, y, currentmana, dirX, dirY) {
        this.nMana = currentmana - this.manaCost;
        if (this.nMana >= 0) {
            this.scene.windfx.play();
            this.nwind = new Wind(this.scene, x, y, this.manaCost,true);
            this.scene.add.existing(this.nwind);
            this.scene.physics.add.existing(this.nwind);
            return this.nMana;
        }
        else return currentmana;
    }
    Next(){
        return new Fireball(this.scene,this.x,this.y,this.fireballDamage,this.fireballSpeed,this.fireballSpeed,this.fireballSpeed,true,this.fireballCost,
            8);
    }
    GetCoolDown(){
        return this.windCoolDown;
    }
}