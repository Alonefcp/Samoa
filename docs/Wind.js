import Magic from './Magic.js'
export default class Wind extends Magic {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite, 0);
        this.play('wind');
        this.applyForce = true;
        this.on('animationcomplete', () => {
            //tras acabar la animacion dejamos de aplicar el empuje a los enemigos
            this.scene.enemies.getChildren().forEach(function (enemy) {
                enemy.windForce = false;
            }, this);

            this.destroy();
        });
    }

    preupdate(time, delta) {

    }
}