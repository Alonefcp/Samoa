import TimeStop from "./TimeStop.js";
import Tornado from "./Tornado.js";
import Whirlpool from "./Whirlpool.js";


export default class MagicCombinator extends Phaser.Scene {
    constructor() {
        super({ key: 'Combinator' });
        this.tamButton = 64;
        this.wind = false;
        this.fire = false;
        this.water = false;
        this.unlockedMagics = 1;
        this.stage = 1;
        this.TimeStopDuration = 200;
    }
    preload() {
        this.load.spritesheet('windB', 'Assets/AnimViento.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('fireB', 'Assets/AnimFuego.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('waterB', 'Assets/AnimAgua.png', { frameWidth: 128, frameHeight: 128 });
        this.load.spritesheet('button', 'Assets/buttons.png', { frameWidth: 128, frameHeight: 128 });
        this.load.image('mistB', 'Assets/MistButton.png');
        this.load.image('whirlpoolB', 'Assets/WhirlpoolButton.png');
        this.load.image('tornado', 'Assets/TornadoButton.png');
        this.load.json('constants', './MagicConstants.json');
    }
    create() {
        this.mainScene = this.scene.get("level" + this.stage.toString());
        this.windB = this.add.sprite(6 * this.tamButton, 2 * this.tamButton, 'windB').setInteractive();
        this.fireB = this.add.sprite(16 * this.tamButton, 2 * this.tamButton, 'fireB').setInteractive();
        this.waterB = this.add.sprite(11 * this.tamButton, 11 * this.tamButton, 'waterB').setInteractive();
        this.button = this.add.sprite(11 * this.tamButton, 6 * this.tamButton, 'button');
        this.close = this.add.text(0, 0, 'CLOSE', { fontSize: '64px', fill: '#F0F' }).setInteractive();
        this.combine = this.add.text(0, 750, 'COMBINE', { fontSize: '64px', fill: '#F0F' }).setInteractive();
        this.anims.create({
            key: 'button',
            frames: this.anims.generateFrameNumbers('button', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'mistB',
            frames: this.anims.generateFrameNumbers('button', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'tornadoB',
            frames: this.anims.generateFrameNumbers('button', { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'whirlpoolB',
            frames: this.anims.generateFrameNumbers('button', { start: 3, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'fireB',
            frames: this.anims.generateFrameNumbers('fireB', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'waterB',
            frames: this.anims.generateFrameNumbers('waterB', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'windB',
            frames: this.anims.generateFrameNumbers('windB', { start: 0, end: 12 }),
            frameRate: 10,
            repeat: -1
        }); this.anims.create({
            key: 'windNeutral',
            frames: this.anims.generateFrameNumbers('windB', { start: 13, end: 13 }),
            frameRate: 10,
            repeat: -1
        }); this.anims.create({
            key: 'fireNeutral',
            frames: this.anims.generateFrameNumbers('fireB', { start: 13, end: 13 }),
            frameRate: 10,
            repeat: -1
        }); this.anims.create({
            key: 'waterNeutral',
            frames: this.anims.generateFrameNumbers('waterB', { start: 13, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        if (this.unlockedMagics == 1) {
            this.waterB.play('waterNeutral');
            this.windB.play('windNeutral');
        }
        else if (this.unlockedMagics == 2)
            this.windB.play('windNeutral');
        //callbacks
        this.close.on('pointerdown', () => {
            this.constants = this.cache.json.get('constants');
            switch (this.button.anims.getCurrentKey()) {

                case 'mistB':
                    this.mainScene.player.setMagic(new TimeStop(this.mainScene, 0, 0, this.mainScene.enemies, false, this.constants));
                    break;
                case 'tornadoB':
                    this.mainScene.player.setMagic(new Tornado(this.mainScene, 0, 0, 0, 0, this.mainScene.enemies, this.constants));
                    break;
                case 'whirlpoolB':
                    this.mainScene.player.setMagic(new Whirlpool(this.mainScene, 0, 0, this.mainScene.enemies, this.constants));
                    break;
            }
            //this.scene.launch('HUD', { money: this.mainScene.player.getMoney(), magic: this.mainScene.player.GetCurrentMagic() });
            this.mainScene.player.UpdateMagicIcon();
            this.scene.sleep('Combinator');
            this.scene.setVisible(true, 'HUD');
            this.scene.resume('level' + this.stage.toString());

        });
        this.combine.on('pointerdown', () => {
            if (this.fire && this.water)
                this.button.play('mistB');
            else if (this.fire && this.wind)
                this.button.play('tornadoB');
            else if (this.water && this.wind)
                this.button.play('whirlpoolB');

            else this.button.play('button');
            this.fire = false;
            this.water = false;
            this.wind = false;
            if (this.waterB.anims.isPlaying)
                this.stopPlaying(this.waterB);
            if (this.fireB.anims.isPlaying)
                this.stopPlaying(this.fireB);
            if (this.windB.anims.isPlaying)
                this.stopPlaying(this.windB);

        });
        this.windB.on('pointerdown', () => {
            if (this.windB.anims.getCurrentKey() !== 'windNeutral') {
                if (!(this.fire && this.water))
                    this.wind = !this.wind;
                if (this.wind)
                    this.windB.play('windB');
                else
                    this.stopPlaying(this.windB);
            }
        });
        this.fireB.on('pointerdown', () => {
            if (!(this.wind && this.water))
                this.fire = !this.fire;
            if (this.fire)
                this.fireB.play('fireB');
            else {
                this.stopPlaying(this.fireB);
            }
        });
        this.waterB.on('pointerdown', () => {
            if (this.waterB.anims.getCurrentKey() !== 'waterNeutral') {
                if (!(this.fire && this.wind))
                    this.water = !this.water;
                if (this.water)
                    this.waterB.play('waterB');
                else {
                    this.stopPlaying(this.waterB);
                }
            }
        });
    }
    stopPlaying(animObj) {
        animObj.anims.restart();
        animObj.anims.stop();
    }
    unlockMagic() {
        this.unlockedMagics++;
        if (this.unlockedMagics > 3)
            this.unlockedMagics = 3;
    }
    NextStage() {
        this.stage++;
    }
}