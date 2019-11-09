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
    this.load.image('meleeEnemy','Assets/star.png');
    this.load.image('spiderWeb','Assets/web.png');
    this.load.image('acid','Assets/acido.jpg');
    this.load.image('hole','Assets/hoyo.jpg');
    this.load.image('spikes','Assets/pinchos.jpg');
    this.load.tilemapTiledJSON('mapa_pruebas','Assets/mapa_pruebas.json')
    this.load.spritesheet('player', 'Assets/knightisochar.png', { frameWidth: 84, frameHeight: 84 });
    //this.load.spritesheet('meleeEnemy',  'Assets/Dungeons.png', { frameWidth: 72, frameHeight: 72 });
    this.load.spritesheet('fireball','Assets/fireball_spritesheet.png',{frameWidth:512, frameHeight:512});
  }

  create() {
    this.map=this.make.tilemap({
      key:'mapa_pruebas',
      tileWidth:32,
      tileHeight:32
    });
   this.webT= this.map.addTilesetImage('web','spiderWeb');
   this.acidT=this.map.addTilesetImage('acido','acid');
   this.holeT=this.map.addTilesetImage('hoyo','hole');
  this.spikeT=this.map.addTilesetImage('pinchos','spikes');
    this.trapslayer=this.map.createStaticLayer('prueba',[this.webT,this.acidT,this.holeT,this.spikeT]);
    // this.trapslayer=this.map.createStaticLayer('Traps',[this.webT,this.acidT,this.holeT,this.spikeT]);
    // this.date=new Date();
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
    this.physics.add.overlap(this.player,this.hole,this.hole.ApplyEffect,null,this.hole);
    this.physics.add.overlap(this.player,this.spikes,this.spikes.ApplyEffect,null,this.spikes);
    //colision entre el enemigo y el jugador
    this.physics.add.collider(this.player,this.meleeEnemy,this.player.PlayerGetDamage,null,this.player);
     
    this.anims.create({
      key:'melee',
      frames:this.anims.generateFrameNumbers('meleeEnemy',{start:82,end:89}),
      frameRate:10,
      repeat:-1
    });

    //animaciones el jugador
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
    this.anims.create({
      key:'attackDown',
      frames:this.anims.generateFrameNumbers('player',{start:26,end:28}),
      frameRate:10,
      repeat:0
    });


    this.anims.create({
      key:'fire',
      frames: this.anims.generateFrameNumbers('fireball', { start:0, end: 4 }),
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
    this.input.on('pointerdown',pointer=>{
      if(pointer.leftButtonDown())
      {
        this.player.Attack();        
      }
      else if (pointer.rightButtonDown())
      this.player.CastMagic();
    });
   
  }

  update(time, delta) 
  {
     
    //comprbamos si el enemigo hace overlap con el trigger(ataque fisico) del jugador
     if(this.physics.overlap(this.meleeEnemy,this.player.trigger) && !this.meleeEnemy.damaged)
     {
       this.meleeEnemy.ReceiveDamage(this.player.atk);
       console.log('Enemey: '+this.meleeEnemy.HP);
       this.meleeEnemy.damaged = true;
       if(this.meleeEnemy.damaged)
       {
         this.player.trigger.destroy();
         this.meleeEnemy.damaged = false;
       }
     }
     else if(this.player.trigger != undefined && !this.meleeEnemy.damaged) this.player.trigger.destroy();


    //movemos el jugador y ejecutamos su animacion en funcion de la tecla que pulsemos
      this.player.Stop();

    if (this.cursors.up.isDown && this.cursors.right.isDown){
      this.player.MoveUpRight();
      this.player.play('up',true);
    }
    else if (this.cursors.up.isDown && this.cursors.left.isDown){
      this.player.MoveUpLeft();
      this.player.play('up',true);
    }
    else if (this.cursors.down.isDown && this.cursors.right.isDown){
      this.player.MoveDownRight();
      this.player.play('down',true);
    }
    else if (this.cursors.down.isDown && this.cursors.left.isDown){
      this.player.MoveDownLeft();
      this.player.play('down',true);
    }
    else if (this.cursors.up.isDown) {
      this.player.MoveUp();
      this.player.play('up',true);

    } else if (this.cursors.down.isDown) {
      this.player.MoveDown();
      this.player.play('down',true);
    }
   else  if (this.cursors.right.isDown)
    {
      this.player.MoveRight();
      this.player.play('right',true);
    }
   else if (this.cursors.left.isDown)
    {
      this.player.MoveLeft();
      this.player.play('left',true);
    }
    else this.player.play('idle',true);
      
    if(this.player.HP<=0)
     this.player.Spawn();
 
    if(this.meleeEnemy.HP<=0)this.meleeEnemy.destroy();
 }
  
}