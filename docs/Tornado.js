import Magic from './Magic.js'
import Fireball from './Fireball.js'
export default class Tornado extends Magic {
    constructor(scene, x, y, img, damage, speed, fireballdamage, fireballspeed, dirX, dirY, enemy,manaCost) {
        super(scene, x, y, img, damage,manaCost);
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
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.body.setVelocityX(this.speed * this.dirX);
        this.body.setVelocityY(this.speed * this.dirY);
        this.spawncont++;
        if (this.spawncont >= 10) {
            //crea una bola de fuego con dirección aleatoria entre[-1,1]
            this.fireball = new Fireball(this.scene, this.x, this.y, 'fireball', this.fireballdamage, this.fireballspeed, Math.random() * (1.001 + 1.001) - 1.001,
                Math.random() * (1.001 + 1.001) - 1.001, true);
            this.spawncont = 0;
        }
        this.time++;
        if (this.time >= this.maxTime)
            this.destroy();
    }
    OnOverlap(tornado, enemy) {

        if(enemy.knockbackTank != undefined) enemy.knockbackTank=true;
    
        if(!enemy.knockbackTank)tornado.Harm(enemy);
        
        if (enemy.receiveDamage != undefined) enemy.receiveDamage = true;
        
        enemy.SetKnockbackDir(tornado.dirX,tornado.dirY);
    }
}