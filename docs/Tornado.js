import Magic from './Magic.js'
import Fireball from './Fireball.js'
export default class Tornado extends Magic {
    constructor(scene, x, y, damage, speed, fireballdamage, fireballspeed, dirX, dirY, enemy, manaCost, coolDown) {
        super(scene, x, y, 'tornado', damage, manaCost);
        this.play('tornado');
        this.dirX = dirX;
        this.dirY = dirY;
        this.enemy = enemy;
        this.speed = speed;
        this.scene.physics.add.overlap(this, enemy, this.OnOverlap, null, this);
        this.spawncont = 0;
        this.fireballdamage = fireballdamage;
        this.fireballspeed = fireballspeed;
        this.time = 0;
        this.maxTime = 100;
        this.coolDown = coolDown;
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.body.setVelocityX(this.speed * this.dirX);
        this.body.setVelocityY(this.speed * this.dirY);
        this.spawncont++;
        if (this.spawncont >= 10) {
            //crea una bola de fuego con dirección aleatoria entre[-1,1]
            this.fireball = new Fireball(this.scene, this.x, this.y, this.fireballdamage, this.fireballspeed, (Math.random() * (1.001 + 1.001) - 1.001) *
                this.fireballSpeed, this.fireballSpeed * (Math.random() * (1.001 + 1.001) - 1.001), true, 0, 0);
            this.scene.add.existing(this.fireball);
            this.scene.physics.add.existing(this.fireball);
            this.spawncont = 0;
        }
        this.time++;
        if (this.time >= this.maxTime)
            this.destroy();
    }
    OnOverlap(tornado, enemy) {

        if (enemy.knockbackTank != undefined) enemy.knockbackTank = true;

        if (!enemy.knockbackTank) tornado.Harm(enemy);

        if (enemy.receiveDamage != undefined) enemy.receiveDamage = true;

        enemy.SetKnockbackDir(tornado.dirX, tornado.dirY);
    }
    Cast(x, y, currentmana, dirX, dirY) {
        this.nMana = currentmana - this.manaCost;
        if (this.nMana >= 0) {
            this.scene.tornadofx.play();
            this.nTornado = new Tornado(this.scene, x, y, this.damage, this.speed, this.fireballdamage,
                this.fireballspeed, dirX, dirY, this.enemy, this.manaCost, this.coolDown);
            this.scene.add.existing(this.nTornado);
            this.scene.physics.add.existing(this.nTornado);
            return this.nMana;
        }
        else return currentmana;
    }
    Next() {
        return new Fireball(this.scene, this.x, this.y, this.fireballDamage, this.fireballSpeed, this.fireballSpeed, this.fireballSpeed, true, this.fireballCost,
            8);
    }
    GetCoolDown() {
        return this.coolDown;
    }
}