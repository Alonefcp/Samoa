export default class HUD extends Phaser.Scene {
    constructor() {

        super({ key: 'HUD' });
        
    }

    create()
    {
        this.healthBar = this.add.text(100, 100, 'Health: 0', { fontSize: '32px', fill: '#FFF'});
    }
}