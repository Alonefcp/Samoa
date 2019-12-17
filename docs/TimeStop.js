import Magic from './Magic.js'
import Fireball from './Fireball.js'
export default class TimeStop extends Magic {
    constructor(scene, x, y, duration, enemies, manaCost, apply) {
        super(scene, x, y, 'time', 0, manaCost);
        this.apply = apply;
        this.duration = duration;
        this.enemies = enemies;
        this.cont = 0;
        if (this.apply) {

            this.enemies.getChildren().forEach(function (enemy) {
                enemy.setTimeStopped(true);
                if (enemy.fireball !== undefined)
                    enemy.fireball.SetTimeStopped(true);
            }, this);
            this.play('timeStop', true);
        }
    }
    preUpdate(time, delta) {
        if (this.apply) {

            super.preUpdate(time, delta);
            this.cont++;
            if (this.cont >= this.duration) {
                this.enemies.getChildren().forEach(function (enemy) {
                    enemy.setTimeStopped(false);
                    if (enemy.fireball !== undefined)
                        enemy.fireball.SetTimeStopped(false);
                }, this);


                this.destroy();
            }
        }

    }
    Cast(x, y, currentmana, dirX, dirY) {
        this.nMana = currentmana - this.manaCost;
        if (this.nMana >= 0) {
            this.Ts = new TimeStop(this.scene, x, y, this.duration, this.enemies, this.timestopCost, true);
            this.scene.add.existing(this.Ts);
            this.scene.physics.add.existing(this.Ts);
            return this.nMana;
        }
        else return currentmana;
    }
    Next() {
        return new Fireball(this.scene, this.x, this.y, this.fireballDamage, this.fireballSpeed, this.fireballSpeed, this.fireballSpeed, true, this.fireballCost,
            8);
    }
    GetCoolDown() {
        return this.timestopCoolDown;
    }
}