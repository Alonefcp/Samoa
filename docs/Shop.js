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

            this.priceMaxHP = 10;

            if(this.mainScene.player.coins>=this.priceMaxHP)
            {
                this.mainScene.player.MaxHP+=20;
                console.log(this.mainScene.player.MaxHP);
                this.mainScene.player.coins-=this.priceMaxHP;
                this.coinsText.setText('COINS: ' + (this.mainScene.player.coins));
                console.log(this.mainScene.player.coins);
            }

		},this);

        this.maxManaText = this.add.text(550, 400, 'Buy MaxMana', { fontSize: '64px', fill: '#FFF' }).setInteractive();
        
        this.maxManaText.on('pointerdown', function(){

            this.priceMaxMana = 10;

            if(this.mainScene.player.coins>=this.priceMaxMana)
            {
                this.mainScene.player.maxMana+=10;
                console.log(this.mainScene.player.maxMana);
                this.mainScene.player.coins-=this.priceMaxMana;
                this.coinsText.setText('COINS: ' + (this.mainScene.player.coins));
                console.log(this.mainScene.player.coins);
            }


        },this);


        this.damageText = this.add.text(1000, 400, 'Buy damage', { fontSize: '64px', fill: '#FFF' }).setInteractive();

        this.damageText.on('pointerdown', function(){

            this.priceDamage = 10;

            if(this.mainScene.player.coins>=this.priceDamage)
            {
                this.mainScene.reduceLife = true;

                this.mainScene.player.coins-=this.priceDamage;
                this.coinsText.setText('COINS: ' + (this.mainScene.player.coins));
                console.log(this.mainScene.player.coins);
            }


        },this);

        this.continueText = this.add.text(1000, 700, 'Continue', { fontSize: '64px', fill: '#FFF' }).setInteractive();

        this.continueText.on('pointerdown', function(){

         this.scene.sleep('Shop');
         this.scene.run('main');
         this.scene.launch('HUD');

        },this);
    }


    update(time,delta)
    {
       
    }

}