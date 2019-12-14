export default class Pause extends Phaser.Scene {
    constructor() {
        super({ key: "Pause" });

    }
    init(data) {
        this.mainscene = data.stage;
    }
    create() {
        this.resume = this.add.text(700, 400, "Resume", { fontsize: "1024px", fill: "#FFF" }).setInteractive();
        this.resume.on('pointerdown', () => {
            this.scene.sleep('Pause');
            this.scene.resume('level' + this.mainscene);
        });
    }
}