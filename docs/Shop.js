export default class Shop extends Phaser.Scene {
    constructor() {

        super({ key: 'Shop' });
        
    }


    preload()
    {

    }
    init(data){
        this.player=data.player;
        this.stage=data.stage;
    }

    create()
    {
        this.price =0;
        this.reduceLife=false;
        this.HUDscene = this.scene.get('HUD');

        this.player.ResetHP();
        this.player.resetMana();

        this.coinsText = this.add.text(135, 125, 'COINS: '+ this.player.coins, { fontSize: '64px', fill: '#FFF' });

        this.shopText = this.add.text(500, 50, 'SHOP', { fontSize: '128px', fill: '#FFF' });

        this.maxHPText = this.add.text(100, 400, 'Buy MaxHP', { fontSize: '64px', fill: '#FFF' }).setInteractive();
       
        this.maxHPText.on('pointerdown', function(){ 

            this.priceMaxHP = 10;

            if(this.player.coins>=this.priceMaxHP)
            {
                this.player.MaxHP+=20;
                console.log(this.player.MaxHP);
                this.player.coins-=this.priceMaxHP;
                this.coinsText.setText('COINS: ' + (this.player.coins));
                console.log(this.player.coins);
            }

		},this);

        this.maxManaText = this.add.text(550, 400, 'Buy MaxMana', { fontSize: '64px', fill: '#FFF' }).setInteractive();
        
        this.maxManaText.on('pointerdown', function(){

            this.priceMaxMana = 10;

            if(this.player.coins>=this.priceMaxMana)
            {
                this.player.maxMana+=10;
                console.log(this.player.maxMana);
                this.player.coins-=this.priceMaxMana;
                this.coinsText.setText('COINS: ' + (this.player.coins));
                console.log(this.player.coins);
            }


        },this);


        this.damageText = this.add.text(1000, 400, 'Buy damage', { fontSize: '64px', fill: '#FFF' }).setInteractive();

        this.damageText.on('pointerdown', function(){

            this.priceDamage = 10;

            if(this.player.coins>=this.priceDamage)
            {
                this.reduceLife = true;

                this.player.coins-=this.priceDamage;
                this.coinsText.setText('COINS: ' + (this.player.coins));
                console.log(this.player.coins);
            }


        },this);

        this.continueText = this.add.text(1000, 700, 'Continue', { fontSize: '64px', fill: '#FFF' }).setInteractive();

        this.continueText.on('pointerdown', function(){

         this.scene.sleep('Shop');
         switch(this.stage)
         {
             case 1:
                 this.scene.run('level2',{player:this.player,reducelife:this.reduceLife});
                 
             break;
         }
         this.scene.launch('HUD');

        },this);
    }
    
}
