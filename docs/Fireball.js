import Magic from './Magic.js'
import WaterRay from './WaterRay.js';
export default class Fireball extends Magic {
    constructor(scene, x, y, damage, speed, dirX, dirY, overlapEnemies, manaCost, numFireballs, cooldown) {
        super(scene, x, y, 'fireball', damage, manaCost);
        this.cooldown = cooldown;
        this.dirX = dirX;
        this.numFireballs = numFireballs;
        this.dirY = dirY;
        this.speed = speed;
        this.offset = 40;
        this.time = 0;
        this.timeStopped = false;
        this.maxtime = 66;
        //overlap entre la bola de fuego y los enemigos
        if (overlapEnemies) this.scene.physics.add.overlap(this.scene.enemies, this, this.OnOverlap, null, this);
        else {
            this.scene.physics.add.overlap(this.scene.player, this, this.OnOverlapPlayer, null, this);//overlap entre la bola de fuego y el jugador
            this.dirX *= -1;
            this.dirY *= -1;
        }

        this.play('fire');
        this.on('animationcomplete', () => {
            if (this.anims.getCurrentKey() === 'explosion')
                this.setActive(false);
            else if (!this.timeStopped) {
                this.play('explosion');
            }
        });

    }


    preUpdate(time, delta) {

        super.preUpdate(time, delta);
        this.cooldown += 1;
        if (this.timeStopped) {
            this.Stop();
        }
        else {
            this.Move();
            this.time++;

            if (this.time >= this.maxtime && this.time < this.maxtime + 20) {
                this.Explode();
            }
            if (!this.active)
                this.destroy();
        }
    }
    Move() {
        this.body.setVelocityX(this.dirX * this.speed);
        this.body.setVelocityY(this.dirY * this.speed);
    }
    Stop() {
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);


    }
    OnOverlap(fireball, enemy) {
        this.Explode();
        this.Harm(enemy);
        this.fireballmodule = Math.sqrt(Math.pow(fireball.dirX, 2) + Math.pow(fireball.dirY, 2));
        enemy.SetKnockbackDir(fireball.dirX / this.fireballmodule, fireball.dirY / this.fireballmodule);
        if (enemy.receiveDamage != undefined) enemy.receiveDamage = true;
        //así evito que dañe a los enemigos mientras se destruye
        this.damage = 0;
    }
    OnOverlapPlayer(player, fireball) {
        this.Explode();
        player.ReceiveDamage(this.damage);
        this.HUDscene = this.scene.scene.get('HUD');
        this.HUDscene.ReduceHealthBar(player.HP, player.MaxHP);
        //así evito que dañe a los enemigos mientras se destruye
        this.damage = 0;
    }

    Explode() {
        if (this.anims.getCurrentKey() === 'fire')
            this.anims.stop();
        this.speed = 0;
    }
    SetTimeStopped(value) {
        this.timeStopped = value;
    }
    Cast(x, y, currentmana, dirX, dirY) {
        this.nMana = currentmana - this.manaCost;
        if (this.nMana >= 0) {
            this.scene.fireballfx.play();
            this.angle = 360 / this.numFireballs;
            this.newAngle = 0;
            for (let i = 0; i < this.numFireballs; i++) {
                this.nFireBall = new Fireball(this.scene, x + this.offset * Math.cos(this.newAngle * Math.PI / 180), y + this.offset * Math.sin(this.newAngle * Math.PI / 180),
                    this.damage, this.speed, this.dirX * Math.cos(this.newAngle * Math.PI / 180) - this.dirY * Math.sin(this.newAngle * Math.PI / 180),
                    this.dirX * Math.sin(this.newAngle * Math.PI / 180) + this.dirY * Math.cos(this.newAngle * Math.PI / 180), true, this.manaCost, this.numFireballs,this.cooldown);
                this.scene.add.existing(this.nFireBall);
                this.scene.physics.add.existing(this.nFireBall);
                this.newAngle += this.angle;

            }

            return this.nMana;
        }
        else
            return currentmana;
    }
    Next() {
        return new WaterRay(this.scene, 0, 0, this.waterRayDamage, 0, this.waterrayCost);
    }
    GetCoolDown() {
        return this.cooldown;
    }

}