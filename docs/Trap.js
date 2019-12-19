import Player from './Player.js';

export default class Trap extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, img) {
        super(scene, x, y, img);

        scene.add.existing(this);
        scene.physics.add.existing(this);
    }
}