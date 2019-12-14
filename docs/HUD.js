export default class HUD extends Phaser.Scene {
    constructor() {

        super({ key: 'HUD' });

    }

    preload() {
        this.load.image('greenbar', 'Assets/LifeBar.png');
        this.load.spritesheet('windB', 'Assets/AnimViento.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('fireB', 'Assets/AnimFuego.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('waterB', 'Assets/AnimAgua.png', { frameWidth: 128, frameHeight: 128 });
        this.load.image('mistB', 'Assets/MistButton.png');
        this.load.image('whirlpoolB', 'Assets/WhirlpoolButton.png');
        this.load.image('tornado', 'Assets/TornadoButton.png');
    }
    create() {
        this.mainScene = this.scene.get('main');

        //Barra de vida
        this.lifebar = this.add.sprite(135, 25, 'greenbar');
        this.initialWidth = this.lifebar.width;
        this.lifebar.setOrigin(0, 0.5);

        //Barra de maná
        this.manabar = this.add.sprite(135, 95, 'greenbar');
        this.initialWidthMana = this.manabar.width;
        this.manabar.setOrigin(0, 0.5);

        this.coinsText = this.add.text(135, 125, 'COINS: ' + this.mainScene.player.coins, { fontSize: '64px', fill: '#FFF' });

        this.ChangeMagicIcon(this.mainScene.player.GetCurrentMagic());


    }


    UpdateCoins(coins) {
        this.coinsText.setText('COINS: ' + coins);
    }

    ReduceManaBar(playerMana, playerMaxMana) {
        this.manabar.displayWidth = (this.manabar.width * playerMana) / playerMaxMana;
    }

    ReduceHealthBar(playerHP, playerMaxHP) {
        this.lifebar.displayWidth = (this.lifebar.width * playerHP) / playerMaxHP;
    }

    ChangeMagicIcon(currentMagic) {
        if (this.magicIcon !== undefined)
            this.magicIcon.destroy();

        switch (currentMagic) {
            case 0:
                this.magicIcon = this.add.image(180, 230, 'fireB').setScale(0.5);
                break;
            case 1:
                this.magicIcon = this.add.image(180, 230, 'waterB').setScale(0.5);
                break;
            case 2:
                this.magicIcon = this.add.image(180, 230, 'windB').setScale(0.5);
                break;
            case 3:
                this.magicIcon = this.add.image(180, 230, 'mistB').setScale(0.5);
                break;
            case 4:
                this.magicIcon = this.add.image(180, 230, 'tornado').setScale(0.5);
                break;
            case 5:
                this.magicIcon = this.add.image(180, 230, 'whirlpoolB').setScale(0.5);
                break;
        }
    }
}