export default class Shop extends Phaser.Scene {
    constructor() {

        super({ key: 'Shop' });
        
    }


    preload()
    {

    }

    create()
    {
        this.price =0;

        this.mainScene = this.scene.get('main');
        this.HUDscene = this.scene.get('HUD');

        this.mainScene.player.ResetHP();
        this.mainScene.player.resetMana();

        this.coinsText = this.add.text(135, 125, 'COINS: '+ this.mainScene.player.coins, { fontSize: '64px', fill: '#FFF' });

        this.shopText = this.add.text(500, 50, 'SHOP', { fontSize: '128px', fill: '#FFF' });

        this.maxHPText = this.add.text(100, 400, 'Buy MaxHP', { fontSize: '64px', fill: '#FFF' }).setInteractive();
       
        this.maxHPText.on('pointerdown', function(){   
            this.mainScene.player.MaxHP+=20;
            console.log(this.mainScene.player.MaxHP);
            this.price=10;
            this.mainScene.player.coins-=this.price;
            this.coinsText.setText('COINS: ' + this.mainScene.player.coins);
            console.log(this.mainScene.player.coins);
		},this);

        this.maxManaText = this.add.text(550, 400, 'Buy MaxMana', { fontSize: '64px', fill: '#FFF' }).setInteractive();
        
        this.maxManaText.on('pointerdown', function(){
            this.mainScene.player.maxMana+=10;
            console.log(this.mainScene.player.maxMana);
            this.price=10;
            
        },this);
          
    }


    update(time,delta)
    {
       if(this.powerUp1) this.mainScene.player.IncreaseMaxHP(20);
    }

}