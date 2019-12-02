import Player from './Player.js';
import Item from './Item.js';
import Trap from './Trap.js';
import DestructibleObject from './DestructibleObject.js';
import Melee from './Melee.js';
import Wizard from './Wizard.js';

export default class Level1 extends Phaser.Scene {
    constructor() {

        super({ key: 'level2' });
        this.SlowTime = 100;
        this.PoisonedTime = 100;
        this.PoisonIntervals = 20;
        this.manaRecovery=5;
        this.coinsDropped=5;
    }

    preload() {
        this.load.image('meleeEnemy','Assets/enemigo.png');
        this.load.image('spiderWeb','Assets/web.png');
        this.load.image('acid','Assets/acido.jpg');
        this.load.image('hole','Assets/hoyo.jpg');
        this.load.image('spikes','Assets/pinchos.jpg');
        this.load.image('chest','Assets/cofre.png');
        this.load.image('coin','Assets/moneda.png');
        this.load.image('mana','Assets/star.png');
        this.load.tilemapTiledJSON('nivel1','Assets/nivel1.json')
        this.load.spritesheet('player', 'Assets/knightisochar.png', { frameWidth: 84, frameHeight: 84 });
        this.load.image('tileset','Assets/dungeons.png');
        this.load.spritesheet('fireball','Assets/fireball_spritesheet16128.png',{frameWidth:16, frameHeight:16});
        this.load.spritesheet('waterray','Assets/Rayo16.png',{frameWidth:16,frameHeight:118});
        this.load.spritesheet('wind','Assets/animV256.png',{frameWidth:256,frameHeight:256});
    }

    create() {
       
       //Jugador
       this.shop=this.scene.get('Shop');
       this.player = this.shop.player;
       //this.player.body.setCollideWorldBounds(true);
       this.physics.add.collider(this.player,this.paredes); 
    
        //Trampas del mapa
        this.traps=this.physics.add.group();
        this.traps.add(new Trap(this,300,150,'spiderWeb',0));
        this.traps.add(new Trap(this,300,400,'acid',2));
        this.traps.add(new Trap(this,350,500,'hole',3));
        this.traps.add(new Trap(this,600,500,'spikes',1));
        this.traps.children.iterate(function(trap){
          trap.setScale(0.5);
        });
        this.physics.add.overlap(this.traps,this.player,this.OnTrapOverlap,null,this);
        
        //grupo de objetos destructibles
        this.destuctibleObjects = this.physics.add.group();
        this.destuctibleObjects.add(new DestructibleObject(this,300,300,'chest'));
        this.destuctibleObjects.add(new DestructibleObject(this,400,300,'chest'));
        this.destuctibleObjects.add(new DestructibleObject(this,500,300,'chest'));
        this.destuctibleObjects.add(new DestructibleObject(this,600,300,'chest'));
        this.destuctibleObjects.children.iterate(function(object){
          object.setScale(0.8);
          object.body.setImmovable(true);
        });
    
        //Camara
        this.camera = this.cameras.main;
        this.camera.startFollow(this.player);
        this.camera.setZoom(2);
        //this.camera.setBounds(0, 0, 800, 1400);
        //this.camera.setViewport(0, 0, 900, 900);
    
        //grupo de enemigos
        this.enemies=this.physics.add.group();
        this.enemies.add(new Melee(this,100,500,'meleeEnemy',20));
        this.enemies.add(new Melee(this,100,300,'meleeEnemy',20));
        this.enemies.add(new Wizard(this,200,300,'meleeEnemy',30));
        //this.enemies.add();
        this.enemies.children.iterate(function(enemy){
          enemy.setScale(0.7);
        });
        
       
    
        //colision entre el jugador y entre los objetos destruibles(habra qu hacer que tambien colisionen con los enemigos)
        this.physics.add.collider(this.enemies,this.destuctibleObjects);
        this.physics.add.collider(this.player,this.destuctibleObjects);
    
        //colision entre el enemigo y el jugador(el enemigo hace daño al jugador)
        this.physics.add.overlap(this.player,this.enemies,this.EnemyHitsPlayer,null,this); 
    
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
          key:'attackUp',
          frames:this.anims.generateFrameNumbers('player',{start:29,end:31}),
          frameRate:10,
          repeat:0
        });this.anims.create({
          key:'attackRight',
          frames:this.anims.generateFrameNumbers('player',{start:32,end:34}),
          frameRate:10,
          repeat:0
        });this.anims.create({
          key:'attackLeft',
          frames:this.anims.generateFrameNumbers('player',{start:35,end:37}),
          frameRate:10,
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
          frameRate: 10,
          repeat: 0
    
        });
        this.anims.create({
          key:'water',
          frames: this.anims.generateFrameNumbers('waterray', { start:3, end: 5 }),
          frameRate: 10,
          repeat: -1
    
        }); 
        this.anims.create({
          key:'waterEnd',
          frames: this.anims.generateFrameNumbers('waterray', { start:6, end: 8 }),
          frameRate: 10,
          repeat: 0
    
        });  
        this.anims.create({
          key:'wind',
          frames: this.anims.generateFrameNumbers('wind',{start:0, end: 15}),
          frameRate:15,
          repeat:0
        });  
        //input
        this.cursors = this.input.keyboard.addKeys({
          up: Phaser.Input.Keyboard.KeyCodes.W,
          down: Phaser.Input.Keyboard.KeyCodes.S,
          left: Phaser.Input.Keyboard.KeyCodes.A,
          right: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.e = this.input.keyboard.addKey('E');
        this.e.on('down',()=>{  
          this.player.RotateMagic();
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
    }

    update(time,delta)
    {
        //Movimiento del jugador y ejecucion de sus animaciones(movimiento y ataque fisico)
    if (this.cursors.up.isDown && this.cursors.right.isDown)
    {
      this.player.Move(Math.cos(1),Math.sin(-1)); 
      if(this.player.isAttacking && (this.player.AtkDirY>0 && (this.player.AtkDirX>0.90 && this.player.AtkDirX>-0.90)))this.player.play('attackRight',true); 
      else if(this.player.isAttacking && this.player.AtkDirY<0)this.player.play('attackUp',true); 
      else if(this.player.isAttacking && (this.player.AtkDirX<0 && (this.player.AtkDirY<0.90 && this.player.AtkDirY>-0.90))) this.player.play('attackLeft',true); 
      else if(this.player.isAttacking && this.player.AtkDirY>0)this.player.play('attackDown',true);
      else this.player.play('up',true);     
    }
    else if (this.cursors.up.isDown && this.cursors.left.isDown)
    {
      this.player.Move(-Math.cos(-1),Math.sin(-1));
      if(this.player.isAttacking && (this.player.AtkDirY>0 && (this.player.AtkDirX>0.90 && this.player.AtkDirX>-0.90)))this.player.play('attackRight',true); 
      else if(this.player.isAttacking && this.player.AtkDirY<0)this.player.play('attackUp',true); 
      else if(this.player.isAttacking && (this.player.AtkDirX<0 && (this.player.AtkDirY<0.90 && this.player.AtkDirY>-0.90))) this.player.play('attackLeft',true); 
      else if(this.player.isAttacking && this.player.AtkDirY>0)this.player.play('attackDown',true);
      else this.player.play('up',true);
    }
    else if (this.cursors.down.isDown && this.cursors.right.isDown)
    {
      this.player.Move(Math.cos(1),Math.sin(1));
      if(this.player.isAttacking && (this.player.AtkDirY>0 && (this.player.AtkDirX>0.90 && this.player.AtkDirX>-0.90)))this.player.play('attackRight',true); 
      else if(this.player.isAttacking && this.player.AtkDirY<0)this.player.play('attackUp',true); 
      else if(this.player.isAttacking && (this.player.AtkDirX<0 && (this.player.AtkDirY<0.90 && this.player.AtkDirY>-0.90))) this.player.play('attackLeft',true); 
      else if(this.player.isAttacking && this.player.AtkDirY>0)this.player.play('attackDown',true);
      else this.player.play('down',true);
    }
    else if (this.cursors.down.isDown && this.cursors.left.isDown)
    {
      this.player.Move(-Math.cos(-1),Math.sin(1));
      if(this.player.isAttacking && (this.player.AtkDirY>0 && (this.player.AtkDirX>0.90 && this.player.AtkDirX>-0.90)))this.player.play('attackRight',true); 
      else if(this.player.isAttacking && this.player.AtkDirY<0)this.player.play('attackUp',true); 
      else if(this.player.isAttacking && (this.player.AtkDirX<0 && (this.player.AtkDirY<0.90 && this.player.AtkDirY>-0.90))) this.player.play('attackLeft',true); 
      else if(this.player.isAttacking && this.player.AtkDirY>0)this.player.play('attackDown',true);
      else this.player.play('down',true);
    }
    else if(this.cursors.right.isDown)
    {
      this.player.Move(1,0);
      if(this.player.isAttacking && (this.player.AtkDirY>0 && (this.player.AtkDirX>0.90 && this.player.AtkDirX>-0.90)))this.player.play('attackRight',true); 
      else if(this.player.isAttacking && this.player.AtkDirY<0)this.player.play('attackUp',true); 
      else if(this.player.isAttacking && (this.player.AtkDirX<0 && (this.player.AtkDirY<0.90 && this.player.AtkDirY>-0.90))) this.player.play('attackLeft',true); 
      else if(this.player.isAttacking && this.player.AtkDirY>0)this.player.play('attackDown',true);
      else this.player.play('right',true);
    }
    else if(this.cursors.left.isDown)
    {
       this.player.Move(-1,0);
       if(this.player.isAttacking && (this.player.AtkDirY>0 && (this.player.AtkDirX>0.90 && this.player.AtkDirX>-0.90)))this.player.play('attackRight',true); 
       else if(this.player.isAttacking && this.player.AtkDirY<0)this.player.play('attackUp',true); 
       else if(this.player.isAttacking && (this.player.AtkDirX<0 && (this.player.AtkDirY<0.90 && this.player.AtkDirY>-0.90))) this.player.play('attackLeft',true); 
       else if(this.player.isAttacking && this.player.AtkDirY>0)this.player.play('attackDown',true);
       else this.player.play('left',true);
    }
    else if (this.cursors.up.isDown) 
    {
       this.player.Move(0,-1);
       if(this.player.isAttacking && (this.player.AtkDirY>0 && (this.player.AtkDirX>0.90 && this.player.AtkDirX>-0.90)))this.player.play('attackRight',true); 
       else if(this.player.isAttacking && this.player.AtkDirY<0)this.player.play('attackUp',true); 
       else if(this.player.isAttacking && (this.player.AtkDirX<0 && (this.player.AtkDirY<0.90 && this.player.AtkDirY>-0.90))) this.player.play('attackLeft',true); 
       else if(this.player.isAttacking && this.player.AtkDirY>0)this.player.play('attackDown',true);
       else this.player.play('up',true);
    } 
    else if (this.cursors.down.isDown) 
    {
        this.player.Move(0,1);
        if(this.player.isAttacking && (this.player.AtkDirY>0 && (this.player.AtkDirX>0.90 && this.player.AtkDirX>-0.90)))this.player.play('attackRight',true); 
        else if(this.player.isAttacking && this.player.AtkDirY<0)this.player.play('attackUp',true); 
        else if(this.player.isAttacking && (this.player.AtkDirX<0 && (this.player.AtkDirY<0.90 && this.player.AtkDirY>-0.90))) this.player.play('attackLeft',true); 
        else if(this.player.isAttacking && this.player.AtkDirY>0)this.player.play('attackDown',true); 
        else this.player.play('down',true);
    }
    else
    {
      this.player.Stop();
      if(this.player.isAttacking && (this.player.AtkDirY>0 && (this.player.AtkDirX>0.90 && this.player.AtkDirX>-0.90)))this.player.play('attackRight',true); 
      else if(this.player.isAttacking && this.player.AtkDirY<0)this.player.play('attackUp',true); 
      else if(this.player.isAttacking && (this.player.AtkDirX<0 && (this.player.AtkDirY<0.90 && this.player.AtkDirY>-0.90))) this.player.play('attackLeft',true); 
      else if(this.player.isAttacking && this.player.AtkDirY>0)this.player.play('attackDown',true); 
      else this.player.play('idle',true); 
    }

    //Esperamos un pequeño tiempo y paramos la animacion del ataque fisico
    if(this.player.isAttacking)this.player.atkTime++;
    if(this.player.atkTime>20)
    {
      this.player.isAttacking=false;
      this.player.atkTime=0;
    }
    }
    
}