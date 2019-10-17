export default class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene) {
   let x,y;
   super(scene,x,y,'entity'); 
   this.sprite=undefined;
      
  }
  
  preload() { 
    }

  create() {
  }

  preupdate(time, delta) {    
  }
}
let HP;
let atk;
function ReceiveDamage(damage){
  if  (HP-damage >0)
    HP=HP-damage;
  else HP=0;
}