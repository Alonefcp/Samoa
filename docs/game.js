import Player from './Player.js';
import Item from './Item.js';
import Trap from './Trap.js';
import DestructibleObject from './DestructibleObject.js';
import Melee from './Melee.js';
import Wizard from './Wizard.js';

export default class Game extends Phaser.Scene {
  constructor() {

    super({ key: 'main' });
    this.SlowTime = 100;
    this.PoisonedTime = 100;
    this.PoisonIntervals = 20;
    this.manaRecovery=5;
    this.coinsDropped=5;
  }

  preload() {
    this.load.image('greenbar','Assets/LifeBar.png');
    this.load.image('redbar','Assets/redLifeBar.png')
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
    this.load.spritesheet('time','Assets/reloj.png',{frameWidth:128,frameHeight:178});
    this.load.spritesheet('tornado','Assets/tornadoAnim.png',{frameWidth:250,frameHeight:247});
  }

  create() {
    //Tilemap de prueba
    this.map=this.make.tilemap({
      key:'nivel1',
      tileWidth:32,
      tileHeight:32
    });
   this.tiles= this.map.addTilesetImage('dungeons','tileset');
   this.suelo=this.map.createStaticLayer('Suelo',[this.tiles]);
   this.paredes=this.map.createStaticLayer('Paredes',[this.tiles]);
   //HUD
  //  this.lifebar=this.add.sprite(0,0,'greenbar');
   
   //Jugador
   this.player = new Player(this, 100, 100);
   //this.player.body.setCollideWorldBounds(true);
   this.player.body.setSize(16,32);//Ajustamos el collider
   this.player.setScale(0.5);
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
    this.anims.create({
      key:'timeStop',
      frames: this.anims.generateFrameNumbers('time',{start:0, end: 7}),
      frameRate:10,
      repeat:-1
    });  
    this.anims.create({
      key:'tornado',
      frames: this.anims.generateFrameNumbers('tornado',{start:0, end: 5}),
      frameRate:10,
      repeat:-1
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

  update(time, delta) 
  { 
   
    
    
         //Colisiones entre el trigger del jugdor y los enemigos(el jugador ataca fisicamente al enemigo) y los 
         //objetos destructibles
    if(this.physics.overlap(this.enemies,this.player.trigger))
   { 
    this.enemies.getChildren().forEach(function(enemy){

      if(this.physics.overlap(enemy,this.player.trigger))
      {
        enemy.ReceiveDamage(this.player.atk);
        
        if(enemy.HP<=0)
        {
          enemy.DropItem();
          enemy.destroy();
        }   
        this.player.trigger.destroy();    
      }
     },this);
   }  
   else if(this.physics.overlap(this.destuctibleObjects,this.player.trigger))
   {
       this.destuctibleObjects.getChildren().forEach(function(object)
      {
       if(this.physics.overlap(object,this.player.trigger))
       {
         object.ReceiveDamage(50);
         if(object.HP<=0) 
         {
           object.DropItem();
           object.destroy();
         }
         this.player.trigger.destroy();
       }   
     },this);
   }
   else if(this.player.trigger != undefined)this.player.trigger.destroy();

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
    
    
    if(this.player.HP<=0)this.player.Spawn(); //Muerte del jugador
    
    
   
 } 
 OnTrapOverlap(player,trap){

  trap.ApplyEffect(player);

}
EnemyHitsPlayer(player,enemy){
  player.ReceiveDamage(enemy.atk);
  console.log(player.HP);
  let dirX=player.x-enemy.x;
  let dirY=player.y-enemy.y;
  let module=Math.sqrt(Math.pow(dirX,2)+Math.pow(dirY,2));
  dirX/=module;
  dirY/=module;
  player.setThrust(dirX,dirY);
  
}
GenerateItem(item,x,y)
    {
     if (item===0)
     this.item=new Item(this,x,y,'mana',0,this.manaRecovery);
     else 
     this.item=new Item(this,x,y,'coin',1,this.coinsDropped);
    }


}