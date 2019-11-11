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
    this.load.spritesheet('fireball','Assets/fireball_spritesheet32256.png',{frameWidth:32, frameHeight:32});
    this.load.spritesheet('waterray','Assets/Rayo32.png',{frameWidth:32,frameHeight:236});
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

    //this.meleeEnemy.body.setSize(45,95);
    this.physics.add.overlap(this.player,this.web,this.web.ApplyEffect,null,this.web);
    this.physics.add.overlap(this.player,this.poison,this.poison.ApplyEffect,null,this.poison);
    this.physics.add.overlap(this.player,this.hole,this.hole.ApplyEffect,null,this.hole);
    this.physics.add.overlap(this.player,this.spikes,this.spikes.ApplyEffect,null,this.spikes);
    //colision entre el enemigo y el jugador
    this.physics.add.collider(this.player,this.enemies,this.player.PlayerGetDamage,null,this.player);
     
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
      frameRate:14,
      repeat:0
    });
    this.anims.create({
      key:'attackUp',
      frames:this.anims.generateFrameNumbers('player',{start:29,end:31}),
      frameRate:14,
      repeat:0
    });this.anims.create({
      key:'attackRight',
      frames:this.anims.generateFrameNumbers('player',{start:32,end:34}),
      frameRate:14,
      repeat:0
    });this.anims.create({
      key:'attackLeft',
      frames:this.anims.generateFrameNumbers('player',{start:35,end:37}),
      frameRate:14,
      repeat:0
    });

    //animaciones de magias
    this.anims.create({
      key:'fire',
      frames: this.anims.generateFrameNumbers('fireball', { start:3, end: 7 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key:'explosion',
      frames: this.anims.generateFrameNumbers('fireball', { start:0, end: 2 }),
      frameRate: 10,
      repeat: 0

    });   
    this.anims.create({
      key:'waterStart',
      frames: this.anims.generateFrameNumbers('waterray', { start:0, end: 2 }),
      frameRate: 5,
      repeat: 0

    });
    this.anims.create({
      key:'water',
      frames: this.anims.generateFrameNumbers('waterray', { start:3, end: 5 }),
      frameRate: 5,
      repeat: -1

    }); 
    this.anims.create({
      key:'waterEnd',
      frames: this.anims.generateFrameNumbers('waterray', { start:6, end: 8 }),
      frameRate: 5,
      repeat: 0

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
        this.player.isAttacking=true;      
      }
      else if (pointer.rightButtonDown())
      this.player.CastMagic();
    });
    //grupos
    this.enemies=this.physics.add.group();
    this.enemies.create(new Enemy(this,100,200,'meleeEnemy'));
  }

  update(time, delta) 
  { 
    //comprbamos si el enemigo hace overlap con el trigger(ataque fisico) del jugador
     if(this.physics.overlap(this.enemies,this.player.trigger) && !this.enemies.damaged)
     {
       this.enemies.ReceiveDamage(this.player.atk);
       console.log('Enemey: '+this.meleeEnemy.HP);
       this.enemies.damaged = true;
       if(this.enemies.damaged)
       {
         this.player.trigger.destroy();
         this.enemies.damaged = false;
       }
     }
     else if(this.player.trigger != undefined && !this.enemies.damaged) this.player.trigger.destroy();
     

    //Movimiento del jugador y ejecucion de sus animaciones(movimiento y ataque fisico)
     this.player.Stop();

    if (this.cursors.up.isDown && this.cursors.right.isDown)
    {
       this.player.DiagonallyMoveRight(1,-1); 
       if(this.player.isAttacking) this.player.play('attackUp',true);
       else this.player.play('up',true);     
    }
    else if (this.cursors.up.isDown && this.cursors.left.isDown)
    {
        this.player.DiagonallyMoveLeft(-1,-1);
        if(this.player.isAttacking) this.player.play('attackUp',true);
        else this.player.play('up',true);
    }
    else if (this.cursors.down.isDown && this.cursors.right.isDown)
    {
      this.player.DiagonallyMoveRight(1,1);
      if(this.player.isAttacking) this.player.play('attackDown',true);
      else this.player.play('down',true);
    }
    else if (this.cursors.down.isDown && this.cursors.left.isDown)
    {
      this.player.DiagonallyMoveLeft(-1,1);
      if(this.player.isAttacking) this.player.play('attackDown',true);
      else this.player.play('down',true);
    }
    else if(this.cursors.right.isDown)
    {
       this.player.HorizontalMove(this.player.speedX);
       if(this.player.isAttacking) this.player.play('attackRight',true);
       else this.player.play('right',true);
    }
    else if(this.cursors.left.isDown)
    {
       this.player.HorizontalMove(-this.player.speedX);
       if(this.player.isAttacking) this.player.play('attackLeft',true); 
       else this.player.play('left',true);
    }
    else if (this.cursors.up.isDown) 
    {
       this.player.VerticalMove(-this.player.speedY);
       if(this.player.isAttacking) this.player.play('attackUp',true);
       else this.player.play('up',true);
    } 
    else if (this.cursors.down.isDown) 
    {
        this.player.VerticalMove(this.player.speedY);
        if(this.player.isAttacking)this.player.play('attackDown',true); 
        else this.player.play('down',true);
    }
    else
    {
      if(this.player.isAttacking && (this.player.AtkDirY>0 && (this.player.AtkDirX>0.90 && this.player.AtkDirX>-0.90)))this.player.play('attackRight',true); 
      else if(this.player.isAttacking && this.player.AtkDirY<0)this.player.play('attackUp',true); 
      else if(this.player.isAttacking && (this.player.AtkDirX<0 && (this.player.AtkDirY<0.90 && this.player.AtkDirY>-0.90))) this.player.play('attackLeft',true); 
      else if(this.player.isAttacking && this.player.AtkDirY>0)this.player.play('attackDown',true); 
      else this.player.play('idle',true); 
    }

    //Esperamos un pequeño tiempo y paramos la animacion del ataque fisico
    if(this.player.isAttacking)this.player.atkTime++;
    if(this.player.atkTime>13)
    {
      this.player.isAttacking=false;
      this.player.atkTime=0;
    }
    
    //Muerte del jugador
    if(this.player.HP<=0)this.player.Spawn();
     
    //Muerte del enemigo
    if(this.enemies.HP<=0)this.enemies.destroy();
 } 
}