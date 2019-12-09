import Player from './Player.js';
import Item from './Item.js';
import Trap from './Trap.js';
import DestructibleObject from './DestructibleObject.js';
import Melee from './Melee.js';
import Wizard from './Wizard.js';
import Tank from './Tank.js';
import Ghost from './Ghost.js';
import Book from './book.js';
import Portal from './Portal.js';
export default class level2 extends Phaser.Scene {
  constructor() {

    super({ key: 'level2' });
    this.SlowTime = 100;
    this.PoisonedTime = 100;
    this.PoisonIntervals = 20;
    this.manaRecovery=5;
    this.coinsDropped=5;
  }

  preload() {
    //this.load.image('redbar','Assets/redLifeBar.png')
    this.load.tilemapTiledJSON('nivel2','Assets/nivel2.json')
    this.load.image('tilesetLevel2','Assets/LEVEL2TILES.png');
      }

  create() {
    //Tilemap de prueba
    this.map=this.make.tilemap({
      key:'nivel2',
      tileWidth:32,
      tileHeight:32
    });

   this.tiles= this.map.addTilesetImage('LEVEL2TILES','tilesetLevel2');
   this.suelo=this.map.createStaticLayer('suelo',[this.tiles]);
   this.paredes2=this.map.createStaticLayer('paredes2',[this.tiles]);
   this.paredes=this.map.createStaticLayer('paredes',[this.tiles]);
   this.deco=this.map.createStaticLayer('Decoracion',[this.tiles]);
   
   this.paredes.setCollisionByProperty({colisiona:true});
   this.paredes2.setCollisionByProperty({colisiona:true});
   this.deco.setCollisionByProperty({colisiona:true});

   this.spikesLayer = this.map.getObjectLayer('Pinchos');
   this.acidLayer = this.map.getObjectLayer('Veneno');
   this.webLayer = this.map.getObjectLayer('Telarañas');
   this.holeLayer = this.map.getObjectLayer('Hoyos');
   this.bookLayer=this.map.getObjectLayer('Libro');
   this.portalLayer=this.map.getObjectLayer('SigNivel');
   this.destructibleObjectsLayer = this.map.getObjectLayer('Destructibles');
   this.meleeLayer = this.map.getObjectLayer('Melee');
   this.wizardLayer = this.map.getObjectLayer('Mago');
   this.tankLayer = this.map.getObjectLayer('Tanque');
   this.ghostLayer = this.map.getObjectLayer('Fantasma');
   this.ghostPoints = this.map.getObjectLayer('GhostPoints');
   this.numEnemies=this.meleeLayer.objects.length+this.wizardLayer.objects.length+this.tankLayer.objects.length+this.ghostLayer.objects.length;

    //Trampas del mapa
    this.traps=this.physics.add.group();
    this.spikesLayer.objects.forEach(element => {
      this.spike=new Trap(this,element.x,element.y,'spikes',1).setScale(.5);
      this.traps.add(this.spike);
    });
      

    this.acidLayer.objects.forEach(object=>{
      this.acid = new Trap(this,object.x,object.y,'acid',2).setScale(0.5);
      this.traps.add(this.acid);
    });

    this.webLayer.objects.forEach(object=>{
      this.web = new Trap(this,object.x,object.y,'spiderWeb',0).setScale(0.5);
      this.traps.add(this.web);
    });

    this.holeLayer.objects.forEach(object=>{
      this.hole = new Trap(this,object.x,object.y,'hole',3).setScale(0.5);
      this.traps.add(this.hole);
    });

    //Objeto destructibles
    this.destuctibleObjects = this.physics.add.group();
     
    this.destructibleObjectsLayer.objects.forEach(object=>{
      this.destObject = new DestructibleObject(this,object.x,object.y,'chest').setScale(1);
      this.destuctibleObjects.add(this.destObject);
    });
    this.destuctibleObjects.children.iterate(function(object){
      object.body.setImmovable(true);
    });
     
    
    this.shop=this.scene.get('Shop');
     //Jugador
     this.player = this.shop.player;
     this.player.Spawn();
    //  this.player.body.setSize(16,60);//Ajustamos el collider
    //  this.player.setScale(0.5);

    //Camara
    this.camera = this.cameras.main;
    this.camera.startFollow(this.player);
    this.camera.setZoom(2);
    //this.camera.setBounds(0, 0, 800, 1400);
    //this.camera.setViewport(0, 0, 900, 900);

    //Enemigos
    this.enemies=this.physics.add.group();
    this.reduceLife = false;
    //libro
    this.book=new Book(this,this.bookLayer.objects[0].x,this.bookLayer.objects[0].y,'book',this.player);
   
this.meleeLayer.objects.forEach(object=>{
  this.melee = new Melee(this,object.x,object.y,'meleeEnemy',20).setScale(0.8);
  if(this.reduceLife)this.melee.HP-=10;
  this.enemies.add(this.melee);
},this);

this.wizardLayer.objects.forEach(object=>{
  this.wizard = new Wizard(this,object.x,object.y,'wizard',30).setScale(1.1);
  if(this.reduceLife)this.wizard.HP-=10;
  this.enemies.add(this.wizard);
},this);

this.tankLayer.objects.forEach(object=>{
  this.tank = new Tank(this,object.x,object.y,'tank',15).setScale(1.2);
  if(this.reduceLife)this.tank.HP-=10;
  this.enemies.add(this.tank);
},this);

this.ghostLayer.objects.forEach(object=>{
  this.ghost = new Ghost(this,object.x,object.y,'ghost',15).setScale(1.1);
  if(this.reduceLife)this.ghost.HP-=10;
  this.enemies.add(this.ghost);
},this);


    // Colisiones
    this.physics.add.collider(this.enemies,this.enemies);

    // //Overlap entre el jugador y las trampas
    this.physics.add.overlap(this.traps,this.player,this.OnTrapOverlap,null,this);

    // //Acceso a la escena del HUD
    this.HUDscene = this.scene.get('HUD');

    //colision entre el jugador y entre los objetos destruibles
    this.physics.add.collider(this.enemies,this.destuctibleObjects);
    this.physics.add.collider(this.player,this.destuctibleObjects);

    //Colision entre las paredes y los enemigos y el jugador
    this.physics.add.collider(this.player,this.paredes);
    this.physics.add.collider(this.enemies,this.paredes);
    this.physics.add.collider(this.player,this.paredes2);
    this.physics.add.collider(this.enemies,this.paredes2);
    this.physics.add.collider(this.enemies,this.deco);
    this.physics.add.collider(this.player,this.deco);

    // //colision entre el enemigo y el jugador(el enemigo hace daño al jugador)
    this.physics.add.overlap(this.player,this.enemies,this.EnemyHitsPlayer,null,this); 

   

    //input del teclado
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
    this.t=this.input.keyboard.addKey('T');
    this.t.on('up',()=>{
      this.scene.launch('Combinator');
      this.scene.sleep('HUD');
      this.scene.pause('main');

    });
    this.n=this.input.keyboard.addKey('N');
    this.n.on('down',()=>{this.UpdateNumEnemies(-this.numEnemies);},null,this);

    this.pointer=this.input.activePointer;
    this.input.mouse.disableContextMenu();
    //input del raton
    this.input.on('pointerdown',pointer=>{
      if(pointer.leftButtonDown())
      {
        this.player.Attack(); 
        this.player.isAttacking=true;      
      }
      else if (pointer.rightButtonDown())
      this.player.CastMagic();
      });

      
    //Hacemos que la escena del HUD corra en paralelo con esta
    this.scene.launch('HUD');
    
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
        
        if(enemy.receiveDamage != undefined)enemy.receiveDamage=true;

        if(enemy.HP<=0)
        {
          this.UpdateNumEnemies(-1);
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
        
    if(this.player.HP<=0)this.player.Spawn();//Muerte del jugador
    
 } 

 AddEnemies(enemy)
 {
    enemy.setScale(0.5);
    this.enemies.add(enemy);
     
 }

 OnTrapOverlap(player,trap)
 {
  trap.ApplyEffect(player);
 }

EnemyHitsPlayer(player,enemy)
{
  player.ReceiveDamage(enemy.atk);
  this.HUDscene.ReduceHealthBar(player.HP,player.MaxHP);
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
UpdateNumEnemies(value){
  this.numEnemies+=value;
  if(this.numEnemies<=0)
  {
    this.book.UnlockBook();
  }
}
AllEnemiesDead(){
  return this.numEnemies<=0;
}
CreateExit(){
  this.portal=new Portal(this,this.portalLayer.objects[0].x,this.portalLayer.objects[0].y,'portal',this.player);
  
}
}