export default class MagicCombinator extends Phaser.Scene{
    constructor(){
        super({key:'Combinator'});
        this.tamButton=64;
        this.wind = false;
        this.fire = false;
        this.water = false;
    }
    preload(){
        this.load.image('windB','Assets/WindButton.png');
        this.load.image('fireB','Assets/FireButton.png');
        this.load.image('waterB','Assets/WaterButton.png');
        this.load.spritesheet('button','Assets/buttons.png',{frameWidth:128,frameHeight:128});
        this.load.image('mistB','Assets/MistButton.png');
        this.load.image('whirlpoolB','Assets/WhirlpoolButton.png');
        this.load.image('tornado','Assets/TornadoButton.png');
    }
    create(){
        this.mainScene=this.scene.get("main");
        this.windB = this.add.sprite(6*this.tamButton,2*this.tamButton,'windB').setInteractive();
        this.fireB = this.add.sprite(16*this.tamButton,2*this.tamButton,'fireB').setInteractive();
        this.waterB = this.add.sprite(11*this.tamButton,11*this.tamButton,'waterB').setInteractive();
        this.button = this.add.sprite(11*this.tamButton,6*this.tamButton,'button');
        this.windB.alpha = .75;
        this.fireB.alpha = .75;
        this.waterB.alpha = .75;
        this.button.alpha = .75;
        this.close = this.add.text(0,0,'CLOSE',{fontSize:'64px',fill:'#F0F'}).setInteractive();
        this.combine = this.add.text(0,750,'COMBINE',{fontSize:'64px',fill:'#F0F'}).setInteractive();
        //callbacks
        this.close.on('pointerdown',()=>{
            this.scene.sleep('Combinator');
            this.scene.launch('HUD');
            this.scene.resume('main');
        });
        this.combine.on('pointerdown',()=>{
            if(this.fire && this.water)
                {
                    this.mainScene.player.setMagic(3);
                    this.button.setCurrentFrame(1);
                }
        });
        this.windB.on('pointerdown',()=>{
            if(!(this.fire && this.water))
                this.wind =! this.wind;
        });
        this.fireB.on('pointerdown',()=>{
            if(!(this.wind && this.water))
                this.fire =! this.fire;
        });
        this.waterB.on('pointerdown',()=>{
            if(!(this.fire && this.wind))
                this.water =! this.water;
        });
    }
}