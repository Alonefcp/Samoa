import Magic from './Magic.js'
import Fireball from './Fireball.js'
export default class Tornado extends Magic {
    constructor(scene, x, y, dirX, dirY, enemy, constants) {
        super(scene, x, y, 'tornado', constants.tornadoDamage, constants.tornadoCost);
        this.play('tornado');
        this.constants = constants;
        this.dirX = dirX;
        this.dirY = dirY;
        this.enemy = enemy;
        this.speed = this.constants.tornadoSpeed;
        this.scene.physics.add.overlap(this, enemy, this.OnOverlap, null, this);
        this.spawncont = 0;
        this.fireballdamage = this.constants.fireballDamage;
        this.fireballspeed = this.constants.fireballSpeed;
        this.time = 0;
        this.maxTime = 100;
        this.coolDown = this.constants.tornadoCoolDown;
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.body.setVelocityX(this.speed * this.dirX);
        this.body.setVelocityY(this.speed * this.dirY);
        this.spawncont++;
        if (this.spawncont >= 10) {
            //crea una bola de fuego con dirección aleatoria entre[-1,1]
            this.fireballs = new Fireball(this.scene, this.x, this.y, (Math.random() * (1.001 + 1.001) - 1.001) *
                this.constants.fireballSpeed, this.constants.fireballSpeed * (Math.random() * (1.001 + 1.001) - 1.001), true, 0, this.constants);
            this.scene.add.existing(this.fireballs);
            this.scene.physics.add.existing(this.fireballs);
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
            this.nTornado = new Tornado(this.scene, x, y, dirX, dirY, this.enemy, this.constants);
            this.scene.add.existing(this.nTornado);
            this.scene.physics.add.existing(this.nTornado);
            return this.nMana;
        }
        else return currentmana;
    }
    Next() {
        return new Fireball(this.scene, this.x, this.y, this.constants.fireballSpeed, this.constants.fireballSpeed, true, 8, this.constants);
    }
    GetCoolDown() {
        return this.coolDown;
    }
}