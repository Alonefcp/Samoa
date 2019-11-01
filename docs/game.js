import Player from './Player.js';
import Enemy from './Enemy.js';
import Trap from './Trap.js';
export default class Game extends Phaser.Scene {
  constructor() {

    super({ key: 'main' });
  //preguntar si son variables globales
    this.SlowTime = 100;
    this.PoisonedTime = 100;
    this.PoisonIntervals = 20;
  }

  preload() {
    this.load.spritesheet('player', 'Assets/knightisochar.png', { frameWidth: 84, frameHeight: 84 });
    //this.load.spritesheet('meleeEnemy',  'Assets/Dungeons.png', { frameWidth: 72, frameHeight: 72 });
    this.load.image('meleeEnemy','Assets/star.png');
    this.load.image('spiderWeb','Assets/web.png');
    this.load.image('acid','Assets/acido.jpg');
    this.load.image('hole','Assets/hoyo.jpg');
    this.load.image('spikes','Assets/pinchos.jpg');
  }

  create() {
    this.player = new Player(this, 100, 100);
    this.player.body.setCollideWorldBounds(true);
   //Ajustamos el collider
    this.player.body.setSize(32,64);
    this.web=new Trap(this,300,150,'spiderWeb',0);
    this.poison=new Trap(this,300,400,'acid',2);
    this.hole = new Trap(this,350,500,'hole',3);
    this.spikes = new Trap(this,600,500,'spikes',1);
    this.meleeEnemy = new Enemy(this,100,200,'meleeEnemy');
    this.meleeEnemy.body.setImmovable(true);
    this.meleeEnemy.setDisplaySize(50,100);
    //this.meleeEnemy.body.setSize(45,95);
    this.physics.add.overlap(this.player,this.web,this.web.ApplyEffect,null,this.web);
    this.physics.add.overlap(this.player,this.poison,this.poison.ApplyEffect,null,this.poison);
    this.physics.add.overlap(this.player,this.hole,this.player.Spawn,null,this.player);
    this.physics.add.overlap(this.player,this.spikes,this.player.PlayerGetDamage,null,this.player);
    this.physics.add.collider(this.player,this.meleeEnemy,this.player.PlayerGetDamage,null,this.player);

  //animaciones
    this.anims.create({
      key:'melee',
      frames:this.anims.generateFrameNumbers('meleeEnemy',{start:82,end:89}),
      frameRate:10,
      repeat:-1
    });
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { start: 4, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key:'up',
      frames: this.anims.generateFrameNumbers('player', { start: 9, end: 13 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key:'right',
      frames: this.anims.generateFrameNumbers('player', { start: 14, end: 19 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key:'left',
      frames: this.anims.generateFrameNumbers('player', { start:20, end: 25 }),
      frameRate: 10,
      repeat: -1

    });
    //input
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.pointer=this.input.activePointer;
    this.input.mouse.disableContextMenu();
    //callbacks
    this.input.on('pointerdown',event=>{this.player.Attack();});
    
  }

  update(time, delta) {
   this.player.Stop()
    this.player.anims.play('idle');
    if (this.cursors.up.isDown && this.cursors.right.isDown){
      this.player.MoveUpRight();
      this.player.anims.play('up');
    }
    else if (this.cursors.up.isDown && this.cursors.left.isDown){
      this.player.MoveUpLeft();
      this.player.anims.play('up');
    }
    else if (this.cursors.down.isDown && this.cursors.right.isDown){
      this.player.MoveDownRight();
      this.player.anims.play('down');
    }
    else if (this.cursors.down.isDown && this.cursors.left.isDown){
      this.player.MoveDownLeft();
      this.player.anims.play('down');
    }
    else if (this.cursors.up.isDown) {
      this.player.MoveUp();
      this.player.anims.play('up');

    } else if (this.cursors.down.isDown) {
      this.player.MoveDown();
      this.player.anims.play('down');
    }
   else  if (this.cursors.right.isDown)
      {
      this.player.MoveRight();
    this.player.anims.play('right');
    }
   else if (this.cursors.left.isDown)
      {
        this.player.MoveLeft();
      this.player.anims.play('left');
      }
  if(this.player.HP<=0)
  this.player.Spawn();
  //preguntar como hacer dentro del player
  
  if (this.player.poison === true){
    this.poisonDamage=this.player.MaxHP/20;  
    this.player.poisonedTime += 1;
    this.player.poisonIntervals += 1;
        if (this.poisonedTime >= this.player.poisonedTime){
          this.player.poison = false;
          this.player.poisonedTime = 0;
        }
        else if (this.player.PoisonIntervals >= this.poisonIntervals && this.player.HP - this.poisonDamage > 0){
          
          this.player.ReceiveDamage(this.poisonDamage);
          console.log(this.player.HP);
          this.player.poisonIntervals=0;
        }
  }  
}
  
}