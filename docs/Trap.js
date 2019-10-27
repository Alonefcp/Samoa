import Player from './Player.js';

export default class Trap extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, img,type) {
        super(scene,x,y,img); 
  
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.type=type;//0 = spiderWeb, 1 = spikes, 2 = Poison, 3 = Hole, 4 = CoveredHole
        this.Slowtime=100;
    }
    ApplyEffect()
    {
       //preguntar cómo meterlo con colisiones en vez de buscar al player en la escena
        if (this.type == 0)
           this.scene.player.SlowDown();

        else if (this.type == 2)
            this.scene.player.Poison();   
    }
}