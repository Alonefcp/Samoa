export default class HUD extends Phaser.Scene {
    constructor() {

        super({ key: 'HUD' });
        
    }

    preload(){
        this.load.image('greenbar','Assets/LifeBar.png');
    }
    create()
    {        
        //Barra de vida
        this.lifebar=this.add.sprite(135,25,'greenbar');
        this.initialWidth = this.lifebar.width;
        this.lifebar.setOrigin(0,0.5);

        //Barra de maná
        this.manabar=this.add.sprite(135,95,'greenbar');
        this.initialWidthMana = this.manabar.width;
        this.manabar.setOrigin(0,0.5);

        this.coinsText = this.add.text(135, 125, 'COINS: 0', { fontSize: '64px', fill: '#FFF' });
    }


    UpdateCoins(coins)
    {
        this.coinsText.setText('COINS: ' + coins);
    }

    ReduceManaBar(playerMana,playerMaxMana)
    {
        this.manabar.displayWidth = (this.manabar.width*playerMana)/playerMaxMana;
    }

    ReduceHealthBar(playerHP,playerMaxHP)
    {
        this.lifebar.displayWidth = (this.lifebar.width*playerHP)/playerMaxHP;
    }
}