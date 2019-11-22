import Magic from './Magic.js'
export default class Tornado extends Magic{
    constructor(scene,x,y,img,damage){
        super(scene,x,y,img,damage);
        this.play('tornado');
    }
}