import Player from './Player.js';

export default class Trap extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, img, type) {
        super(scene, x, y, img);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.type = type;//0 = spiderWeb, 1 = spikes, 2 = Poison, 3 = Hole
        this.cont = 0;   
        this.firstTime=true;  
    }
    ApplyEffect(player) {
        if (this.type === 0)
            player.SlowDown();
        else if (this.type === 2)
            player.Poison();
        else if (this.type === 1)
            player.Spikes();
        else if (this.type === 3)
        {    
            this.setFrame(1);
            if(this.firstTime)this.cont++;
            if(this.cont>20)
            {            
                this.firstTime=false;
            }   
            player.Spawn();
        }
            
    }
}