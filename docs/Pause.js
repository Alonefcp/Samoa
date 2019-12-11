export default class Pause extends Phaser.Scene{
    constructor(){
        super({key:"Pause"});
        this.mainscene=1;
    }
    create(){
        this.resume=this.add.text(700,400,"Resume",{fontsize:"1024px",fill:"#FFF"}).setInteractive();
        this.resume.on('pointerdown',()=>{
            this.scene.sleep('Pause');
            switch(this.mainscene)
            {
                case 1:
                    this.scene.resume('main');
                    break;
                case 2: 
                    this.scene.resume('level2');
                    break;
                case 3:
                    this.scene.resume('level3');
                    break;
            }        })
    }
    changeMainScene(){
        this.mainscene++;
    }
}