export default class Shop extends Phaser.Scene {
    constructor() {

        super({ key: 'Shop' });

    }


    preload() {

    }
    init(data) {
        this.coins = data.money;
        this.stage = data.stage;
        this.unlockedMagic = data.unlockedMagic;
    }

    create() {
        this.playermaxMana = false;
        this.playerMaxHP = false;
        this.price = 0;
        this.reduceLife = false;
        this.HUDscene = this.scene.get('HUD');


        this.coinsText = this.add.text(135, 125, 'COINS: ' + this.coins, { fontSize: '64px', fill: '#FFF' });

        this.shopText = this.add.text(500, 50, 'SHOP', { fontSize: '128px', fill: '#FFF' });

        this.maxHPText = this.add.text(100, 400, 'Buy MaxHP', { fontSize: '64px', fill: '#FFF' }).setInteractive();

        this.maxHPText.on('pointerdown', function () {

            this.priceMaxHP = 10;

            if (this.coins >= this.priceMaxHP) {
                this.playerMaxHP = true;
                this.coins -= this.priceMaxHP;
                this.coinsText.setText('COINS: ' + (this.coins));

            }

        }, this);

        this.maxManaText = this.add.text(550, 400, 'Buy MaxMana', { fontSize: '64px', fill: '#FFF' }).setInteractive();

        this.maxManaText.on('pointerdown', function () {

            this.priceMaxMana = 10;

            if (this.coins >= this.priceMaxMana) {
                this.playermaxMana = true;
                this.coins -= this.priceMaxMana;
                this.coinsText.setText('COINS: ' + (this.coins));
            }


        }, this);


        this.damageText = this.add.text(1000, 400, 'Buy damage', { fontSize: '64px', fill: '#FFF' }).setInteractive();

        this.damageText.on('pointerdown', function () {

            this.priceDamage = 10;

            if (this.coins >= this.priceDamage) {
                this.reduceLife = true;

                this.coins -= this.priceDamage;
                this.coinsText.setText('COINS: ' + (this.coins));
            }


        }, this);

        this.continueText = this.add.text(1000, 700, 'Continue', { fontSize: '64px', fill: '#FFF' }).setInteractive();

        this.continueText.on('pointerdown', function () {

            this.scene.sleep('Shop');
            this.scene.launch('level' + this.stage, {
                money: this.coins, magic: this.unlockedMagic, extraMana: this.playermaxMana, extraHP: this.playerMaxHP,
                reduceLife: this.reduceLife
            });
            this.scene.launch('HUD');

        }, this);
    }

}
