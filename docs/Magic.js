
export default class Magic extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, img, damage, manaCost) {
        super(scene, x, y, img);
        this.damage = damage;
        this.manaCost = manaCost;
        this.fireballCost = 5;
        this.waterrayCost = 5;
        this.windcost = 5;
        this.fireballDamage = 5;
        this.waterRayDamage = 5;
        this.tornadoSpeed = 80;
        this.tornadoDamage = 5;
        this.fireballSpeed = 15;
        this.timestopCost = 5;
        this.tornadoCost = 5
        this.whirlpoolCost = 5;
        this.whirlpoolDamage = 5;
        this.fireballCoolDown = 110;
        this.waterRayCoolDown = 80;
        this.windCoolDown = 150;
        this.tornadoCoolDown = 150;
        this.timestopCoolDown = 120;
        this.whirlpoolCoolDown = 110;

    }

    Harm(enemy) {
        enemy.ReceiveDamage(this.damage);


        if (enemy.HP <= 0) {
            this.scene.UpdateNumEnemies(-1);
            enemy.DropItem(this.scene, enemy.x, enemy.y, 'coin', 'mana');
            enemy.destroy();
        }
    }


}