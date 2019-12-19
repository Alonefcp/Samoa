import Magic from './Magic.js'
import Fireball from './Fireball.js'
export default class TimeStop extends Magic {
    constructor(scene, x, y, enemies, apply, constants) {
        super(scene, x, y, 'time', 0, constants.timestopCost);
        this.constants = constants;
        this.apply = apply;
        this.duration = this.constants.TimeStopDuration;
        this.enemies = enemies;
        this.cont = 0;
        this.cooldown = this.constants.timestopCoolDown;
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
            this.scene.stopTimefx.play();
            this.Ts = new TimeStop(this.scene, x, y, this.enemies, true, this.constants);
            this.scene.add.existing(this.Ts);
            this.scene.physics.add.existing(this.Ts);
            return this.nMana;
        }
        else return currentmana;
    }
    
    GetCoolDown() {
        return this.cooldown;
    }
}