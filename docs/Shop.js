export default class Shop extends Phaser.Scene {
    constructor() {

        super({ key: 'Shop' });

    }


    preload() {
        this.load.image('maxHP', 'Assets/MaxHP.png');
        this.load.image('maxMana', 'Assets/MaxMana.png');
        this.load.image('maxAtk', 'Assets/MaxATK2.png');

    }
    init(data) {

        this.inticoins = data.money;
        this.stage = data.stage;
        this.unlockedMagic = data.unlockedMagic;
    }

    create() {
        this.buyed = 0;
        this.maxBuyed = 2;
        this.coins = this.inticoins;
        this.priceMaxMana = 10;
        this.priceDamage = 10;
        this.priceMaxHP = 10;
        this.playermaxMana = false;
        this.playerMaxHP = false;
        this.price = 0;
        this.reduceLife = false;
        this.HUDscene = this.scene.get('HUD');
        this.texts = this.add.group();
        this.coinsText = this.add.text(135, 125, 'COINS: ' + this.coins, { fontSize: '64px', fill: '#FFF' });
        this.shopText = this.add.text(500, 50, 'SHOP', { fontSize: '128px', fill: '#FFF' });
        //HP
        this.maxHPText = this.add.text(100, 400, 'Buy MaxHP', { fontSize: '64px', fill: '#FFF' }).setInteractive();
        this.hpIMG = this.add.image(this.maxHPText.getCenter().x, this.maxHPText.getBounds().y + this.maxHPText.getBounds().height + 100, 'maxHP')
            .setInteractive();
        this.maxHPText.on('pointerdown', function () {
            this.Buy(this.priceMaxHP, this.playerMaxHP, this.maxHPText);
        }, this);
        this.texts.add(this.maxHPText);
        this.hpIMG.on('pointerdown', () => {
            this.Buy(this.priceMaxHP, this.playerMaxHP, this.maxHPText);
        }, this);
        //Mana
        this.maxManaText = this.add.text(this.maxHPText.getBounds().x + this.maxHPText.getBounds().width + 50, this.maxHPText.getBounds().y, 'Buy MaxMana', { fontSize: '64px', fill: '#FFF' }).setInteractive();
        this.manaIMG = this.add.image(this.maxManaText.getCenter().x, this.maxManaText.getBounds().y + this.maxManaText.getBounds().height + 100,
            'maxMana').setInteractive();
        this.maxManaText.on('pointerdown', function () {
            this.Buy(this.priceMaxMana, this.playermaxMana, this.maxManaText);
        }, this);
        this.manaIMG.on('pointerdown', () => {
            this.Buy(this.priceMaxMana, this.playermaxMana, this.maxManaText);
        }, this);
        this.texts.add(this.maxManaText);
        //Damage
        this.damageText = this.add.text(1000, 400, 'Buy damage', { fontSize: '64px', fill: '#FFF' }).setInteractive();
        this.damageText.on('pointerdown', function () {
            this.Buy(this.priceDamage, this.reduceLife, this.damageText);
        }, this);
        this.damageIMG = this.add.image(this.damageText.getCenter().x, this.damageText.getBounds().y + this.damageText.getBounds().height + 100,
            'maxAtk').setInteractive();
        this.damageIMG.on('pointerdown', () => {
            this.Buy(this.priceDamage, this.reduceLife, this.damageText);
        }, this);
        this.texts.add(this.damageText);

        this.continueText = this.add.text(1000, 700, 'Continue', { fontSize: '64px', fill: '#FFF' }).setInteractive();
        this.continueText.on('pointerdown', function () {

            this.scene.launch('HUD', { money: this.coins, magic: this.unlockedMagic });
            this.scene.start('level' + (this.stage).toString(), {
                money: this.coins, magic: this.unlockedMagic, extraMana: this.playermaxMana, extraHP: this.playerMaxHP,
                reduceLife: this.reduceLife, stage: this.stage
            });
        }, this);
        this.cancelText = this.add.text(0, this.continueText.getBounds().y, 'Cancel', { fontSize: '64px', fill: '#FFF' }).setInteractive();
        this.cancelText.on('pointerdown', () => {
            this.Cancel();
        }, this);
    }

    Buy(price, effect, text) {
        if (this.coins >= price && !effect && this.buyed < this.maxBuyed) {
            effect = true;
            this.coins -= price;
            this.coinsText.setText('COINS: ' + (this.coins));
            text.setColor('#595656');
            this.buyed++;
        }
    }
    Cancel() {
        this.playerMaxHP = false;
        this.playermaxMana = false;
        this.reduceLife = false;
        this.coins = this.inticoins;
        this.buyed = 0;
        this.texts.getChildren().forEach(element => {
            element.setColor('white');
        });
        this.coinsText.setText('COINS: ' + (this.coins));


    }
}
