export default class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, img) {
   super(scene,x,y,img); 
   scene.add.existing(this);
      
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