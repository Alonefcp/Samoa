import Player from './Player.js';

export default class Trap extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, img, type) {
        super(scene, x, y, img);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.type = type;//0 = spiderWeb, 1 = spikes, 2 = Poison, 3 = Hole
        this.cont = 0;
        this.firstTime = true;
    }
    ApplyEffect(player) {
        if (this.type === 0)
            player.SlowDown();
        else if (this.type === 2)
            player.Poison();
        else if (this.type === 1) {
            player.Spikes();
            this.dirX = player.x - this.x;
            this.dirY = player.y - this.y;
            this.module = Math.sqrt(Math.pow(this.dirX, 2) + Math.pow(this.dirY, 2));
            player.setThrust(this.dirX / this.module, this.dirY / this.module);
            
        }
        else if (this.type === 3) {
            this.setFrame(1);
            console.log(this.cont);
            if (this.firstTime) this.cont++;
            if (this.cont > 18) {
                this.firstTime = false; 
                player.Spawn();
            }          
        }

    }
}