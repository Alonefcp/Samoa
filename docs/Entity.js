export default class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, img) {
   super(scene,x,y,img); 
   this. MaxHP=100;
   this. HP=100;
   this.atk;
   this.speedX=160;
   this.speedY=160;   
   scene.add.existing(this);
      
  }
  
  preload() { 
    }

  create() {
  }

  preupdate(time, delta) {    
  }

ReceiveDamage(damage){
  if  (HP-damage >0)
    HP=HP-damage;
  else HP=0;
}}