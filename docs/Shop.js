export default class Shop extends Phaser.Scene {
    constructor() {

        super({ key: 'Shop' });
        
    }


    preload()
    {

    }

    create()
    {
        this.mainScene = this.scene.get('main');
        this.mainScene.player.ResetHP();


        this.coinsText = this.add.text(135, 125, 'COINS: '+ this.mainScene.player.coins, { fontSize: '64px', fill: '#FFF' });

        this.shopText = this.add.text(500, 50, 'SHOP', { fontSize: '128px', fill: '#FFF' });

        this.maxHPText = this.add.text(150, 400, 'Buy MaxHP', { fontSize: '64px', fill: '#FFF' }).setInteractive();

        this.maxHPText.on('pointerdown', function(event){
			console.log('comprada');
		});

    }


    update(time,delta)
    {
    
    }

    Increase
}