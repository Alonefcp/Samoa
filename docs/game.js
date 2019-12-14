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

export default class Game extends Phaser.Scene {
  constructor() {

    super({ key: 'level1' });
    this.SlowTime = 100;
    this.PoisonedTime = 100;
    this.PoisonIntervals = 20;
    this.manaRecovery = 5;
    this.coinsDropped = 5;
  }

  preload() {
    //this.load.image('redbar','Assets/redLifeBar.png')
    this.load.audio('musiclv1','Assets/audio/level1.mp3');
    this.load.audio('fireballfx','Assets/audio/fireball.mp3');
    this.load.audio('laserfx','Assets/audio/laser.mp3');
    this.load.audio('meleefx','Assets/audio/melee.mp3');
    this.load.spritesheet('meleeEnemy', 'Assets/melee.png', { frameWidth: 32, frameHeight: 36 });
    this.load.spritesheet('wizard', 'Assets/wizard.png', { frameWidth: 16, frameHeight: 21 });
    this.load.spritesheet('ghost', 'Assets/ghost.png', { frameWidth: 16, frameHeight: 17 });
    this.load.spritesheet('tank', 'Assets/tank.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('book', 'Assets/waterbook.png', { frameWidth: 17, frameHeight: 26 });
    this.load.image('spiderWeb', 'Assets/web.png');
    this.load.image('acid', 'Assets/acido.png');
    this.load.spritesheet('hole', 'Assets/hoyolv1.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.image('spikes', 'Assets/pinchoslv1.png');
    this.load.image('chest', 'Assets/cofre.png');
    this.load.image('coin', 'Assets/moneda.png');
    this.load.image('mana', 'Assets/star.png');
    this.load.tilemapTiledJSON('nivel1', 'Assets/nivel1.json')
    this.load.spritesheet('player', 'Assets/knightisochar.png', { frameWidth: 84, frameHeight: 84 });
    this.load.image('tileset', 'Assets/Dungeons.png');
    this.load.spritesheet('fireball', 'Assets/fireball_spritesheet16128.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('waterray', 'Assets/Rayo16.png', { frameWidth: 16, frameHeight: 118 });
    this.load.spritesheet('wind', 'Assets/animV256.png', { frameWidth: 256, frameHeight: 256 });
    this.load.spritesheet('time', 'Assets/reloj.png', { frameWidth: 128, frameHeight: 178 });
    this.load.spritesheet('tornado', 'Assets/tornadoAnim150.png', { frameWidth: 50, frameHeight: 49 });
    this.load.spritesheet('whirlpool', 'Assets/whirlpool32.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('portal', 'Assets/portal.png', { frameWidth: 26, frameHeight: 64 });
  }

  create() {

    //musica de fondo
    this.musiclv1 = this.sound.add('musiclv1');
    this.musiclv1.loop = true;
    this.musiclv1.volume = 0.2;
    this.musiclv1.play();
    //efectos de sonido
    this.fireballfx = this.sound.add('fireballfx');
    this.laserfx = this.sound.add('laserfx');
    this.meleefx = this.sound.add('meleefx');
    //Tilemap de prueba
    this.map = this.make.tilemap({
      key: 'nivel1',
      tileWidth: 32,
      tileHeight: 32
    });
    //Capas estaticas
    this.tiles = this.map.addTilesetImage('dungeons', 'tileset');
    this.suelo = this.map.createStaticLayer('Suelo', [this.tiles]);
    this.paredes2 = this.map.createStaticLayer('Paredes2', [this.tiles]);
    this.paredes = this.map.createStaticLayer('Paredes', [this.tiles]);
    this.decoracion = this.map.createStaticLayer('Decoracion', [this.tiles]);
    this.suelo2 = this.map.createStaticLayer('Suelo2', [this.tiles]);

    this.paredes.setCollisionByProperty({ colisiona: true });
    this.decoracion.setCollisionByProperty({ colisiona: true });
    //Capas de objetos
    this.spikesLayer = this.map.getObjectLayer('Pinchos');
    this.acidLayer = this.map.getObjectLayer('Veneno');
    this.webLayer = this.map.getObjectLayer('Telaraña');
    this.holeLayer = this.map.getObjectLayer('Hoyos');
    this.bookLayer = this.map.getObjectLayer('Libro');
    this.portalLayer = this.map.getObjectLayer('SigNivel');
    this.destructibleObjectsLayer = this.map.getObjectLayer('ObjetosDestructibles');
    this.meleeLayer = this.map.getObjectLayer('Melee');
    this.wizardLayer = this.map.getObjectLayer('Mago');
    this.tankLayer = this.map.getObjectLayer('Tanque');
    this.ghostLayer = this.map.getObjectLayer('Fantasma');
    this.ghostPoints = this.map.getObjectLayer('GhostPoints');
    this.playerSpawnLayer = this.map.getObjectLayer('playerSpawn');
    this.numEnemies = this.meleeLayer.objects.length + this.wizardLayer.objects.length + this.tankLayer.objects.length + this.ghostLayer.objects.length;

    //Trampas del mapa
    this.traps = this.physics.add.group();

    this.spikesLayer.objects.forEach(object => {
      this.spike = new Trap(this, object.x, object.y, 'spikes', 1).setScale(0.5);
      this.traps.add(this.spike);
    });

    this.acidLayer.objects.forEach(object => {
      this.acid = new Trap(this, object.x, object.y, 'acid', 2).setScale(0.5);
      this.traps.add(this.acid);
    });

    this.webLayer.objects.forEach(object => {
      this.web = new Trap(this, object.x, object.y, 'spiderWeb', 0).setScale(0.5);
      this.traps.add(this.web);
    });

    this.holeLayer.objects.forEach(object => {
      this.hole = new Trap(this, object.x, object.y, 'hole', 3).setScale(0.5);
      this.traps.add(this.hole);
    });

    //Objeto destructibles
    this.destuctibleObjects = this.physics.add.group();

    this.destructibleObjectsLayer.objects.forEach(object => {
      this.destObject = new DestructibleObject(this, object.x, object.y, 'chest').setScale(1);
      this.destuctibleObjects.add(this.destObject);
    });
    this.destuctibleObjects.children.iterate(function (object) {
      object.body.setImmovable(true);
    });

    //Jugador
    this.player = new Player(this, this.playerSpawnLayer.objects[0].x,this.playerSpawnLayer.objects[0].y);
    this.player.body.setSize(16, 60);//Ajustamos el collider
    this.player.setScale(0.5);
    

    //Camara
    this.camera = this.cameras.main;
    this.camera.startFollow(this.player);
    this.camera.setZoom(2);
    //this.camera.setBounds(0, 0, 800, 1400);
    //this.camera.setViewport(0, 0, 900, 900);

    //Enemigos
    this.enemies = this.physics.add.group();
    this.reduceLife = false;
    //libro
    this.book = new Book(this, this.bookLayer.objects[0].x, this.bookLayer.objects[0].y, 'book', this.player);


    this.meleeLayer.objects.forEach(object => {
      this.melee = new Melee(this, object.x, object.y, 'meleeEnemy', 20).setScale(0.8);
      if (this.reduceLife) this.melee.HP -= 10;
      this.enemies.add(this.melee);
    }, this);

    this.wizardLayer.objects.forEach(object => {
      this.wizard = new Wizard(this, object.x, object.y, 'wizard', 30).setScale(1.1);
      if (this.reduceLife) this.wizard.HP -= 10;
      this.enemies.add(this.wizard);
    }, this);

    this.tankLayer.objects.forEach(object => {
      this.tank = new Tank(this, object.x, object.y, 'tank', 15).setScale(1.2);
      if (this.reduceLife) this.tank.HP -= 10;
      this.enemies.add(this.tank);
    }, this);

    this.ghostLayer.objects.forEach(object => {
      this.ghost = new Ghost(this, object.x, object.y, 'ghost', 15).setScale(1.1);
      if (this.reduceLife) this.ghost.HP -= 10;
      this.enemies.add(this.ghost);
    }, this);


    //Colisiones
    this.physics.add.collider(this.enemies, this.enemies);

    //Overlap entre el jugador y las trampas
    this.physics.add.overlap(this.traps, this.player, this.OnTrapOverlap, null, this);

    //Acceso a la escena del HUD
    this.HUDscene = this.scene.get('HUD');

    //colision entre el jugador y entre los objetos destruibles
    this.physics.add.collider(this.enemies, this.destuctibleObjects);
    this.physics.add.collider(this.player, this.destuctibleObjects);

    //Colision entre las paredes y los enemigos y el jugador
    this.physics.add.collider(this.player, this.paredes);
    this.physics.add.collider(this.enemies, this.paredes);
    this.physics.add.collider(this.player, this.paredes2);
    this.physics.add.collider(this.enemies, this.paredes2);
    this.physics.add.collider(this.player, this.decoracion);
    this.physics.add.collider(this.enemies, this.decoracion);


    //colision entre el enemigo y el jugador(el enemigo hace daño al jugador)
    this.physics.add.overlap(this.player, this.enemies, this.EnemyHitsPlayer, null, this);

    //animaciones de los enemigos
    this.anims.create({
      key: 'meleeIdle',
      frames: this.anims.generateFrameNumbers('meleeEnemy', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'wizardIdle',
      frames: this.anims.generateFrameNumbers('wizard', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'ghostIdle',
      frames: this.anims.generateFrameNumbers('ghost', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'tankIdle',
      frames: this.anims.generateFrameNumbers('tank', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
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
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { start: 9, end: 13 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { start: 14, end: 19 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { start: 20, end: 25 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key: 'attackDown',
      frames: this.anims.generateFrameNumbers('player', { start: 26, end: 28 }),
      frameRate: 10,
      repeat: 0
    });
    this.anims.create({
      key: 'attackUp',
      frames: this.anims.generateFrameNumbers('player', { start: 29, end: 31 }),
      frameRate: 10,
      repeat: 0
    }); this.anims.create({
      key: 'attackRight',
      frames: this.anims.generateFrameNumbers('player', { start: 32, end: 34 }),
      frameRate: 10,
      repeat: 0
    }); this.anims.create({
      key: 'attackLeft',
      frames: this.anims.generateFrameNumbers('player', { start: 35, end: 37 }),
      frameRate: 10,
      repeat: 0
    });

    //animaciones de magias
    this.anims.create({
      key: 'fire',
      frames: this.anims.generateFrameNumbers('fireball', { start: 3, end: 7 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key: 'explosion',
      frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: 0

    });
    this.anims.create({
      key: 'waterStart',
      frames: this.anims.generateFrameNumbers('waterray', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: 0

    });
    this.anims.create({
      key: 'water',
      frames: this.anims.generateFrameNumbers('waterray', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1

    });
    this.anims.create({
      key: 'waterEnd',
      frames: this.anims.generateFrameNumbers('waterray', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: 0

    });
    this.anims.create({
      key: 'wind',
      frames: this.anims.generateFrameNumbers('wind', { start: 0, end: 15 }),
      frameRate: 15,
      repeat: 0
    });
    this.anims.create({
      key: 'timeStop',
      frames: this.anims.generateFrameNumbers('time', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'tornado',
      frames: this.anims.generateFrameNumbers('tornado', { start: 0, end: 5 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'whirlpool',
      frames: this.anims.generateFrameNumbers('whirlpool', { start: 0, end: 7 }),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({
      key: 'lockedbook',
      frames: this.anims.generateFrameNumbers('book', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0
    });
    this.anims.create({
      key: 'unlockedbook',
      frames: this.anims.generateFrameNumbers('book', { start: 1, end: 1 }),
      frameRate: 1,
      repeat: 0
    });
    this.anims.create({
      key: 'portalDoor',
      frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 3 }),
      frameRate: 15,
      repeat: -1
    });

    //input del teclado
    this.cursors = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.e = this.input.keyboard.addKey('E');
    this.e.on('down', () => {
      this.player.RotateMagic();
    });
    this.t = this.input.keyboard.addKey('T');
    this.t.on('up', () => {
      this.scene.launch('Combinator');
      this.scene.sleep('HUD');
      this.scene.pause('main');

    });
    this.escape = this.input.keyboard.addKey('ESC');
    this.escape.on('up', () => {
      this.player.Stop();
      this.scene.launch('Pause');
      this.scene.pause('main');
    });
    this.n = this.input.keyboard.addKey('N');
    this.n.on('down', () => { this.UpdateNumEnemies(-this.numEnemies); }, null, this);

    this.pointer = this.input.activePointer;
    this.input.mouse.disableContextMenu();
    //input del raton
    this.input.on('pointerdown', pointer => {
      if (pointer.leftButtonDown()) {
        this.player.Attack();
        this.meleefx.play();
        this.player.isAttacking = true;
      }
      else if (pointer.rightButtonDown())
        this.player.CastMagic();
    });


    //Hacemos que la escena del HUD corra en paralelo con esta
    this.scene.launch('HUD');
  }

  update(time, delta) {
    //Colisiones entre el trigger del jugdor y los enemigos(el jugador ataca fisicamente al enemigo) y los 
    //objetos destructibles
    if (this.physics.overlap(this.enemies, this.player.trigger)) {
      this.enemies.getChildren().forEach(function (enemy) {

        if (this.physics.overlap(enemy, this.player.trigger)) {
          enemy.ReceiveDamage(this.player.atk);

          if (enemy.receiveDamage != undefined) enemy.receiveDamage = true;
          enemy.knockback = true;
          if (enemy.HP <= 0) {
            this.UpdateNumEnemies(-1);
            enemy.DropItem();
            enemy.destroy();
          }
          this.player.trigger.destroy();
        }
      }, this);
    }
    else if (this.physics.overlap(this.destuctibleObjects, this.player.trigger)) {
      this.destuctibleObjects.getChildren().forEach(function (object) {
        if (this.physics.overlap(object, this.player.trigger)) {
          object.ReceiveDamage(50);
          if (object.HP <= 0) {
            object.DropItem();
            object.destroy();
          }
          this.player.trigger.destroy();
        }
      }, this);
    }
    else if (this.player.trigger != undefined) this.player.trigger.destroy();

    //Movimiento del jugador y ejecucion de sus animaciones(movimiento y ataque fisico)
    if (this.cursors.up.isDown && this.cursors.right.isDown) {
      this.player.Move(Math.cos(1), Math.sin(-1));
      this.player.PlayAnimation('up');
    }
    else if (this.cursors.up.isDown && this.cursors.left.isDown) {
      this.player.Move(-Math.cos(-1), Math.sin(-1));
      this.player.PlayAnimation('up');
    }
    else if (this.cursors.down.isDown && this.cursors.right.isDown) {
      this.player.Move(Math.cos(1), Math.sin(1));
      this.player.PlayAnimation('down');
    }
    else if (this.cursors.down.isDown && this.cursors.left.isDown) {
      this.player.Move(-Math.cos(-1), Math.sin(1));
      this.player.PlayAnimation('down');
    }
    else if (this.cursors.right.isDown) {
      this.player.Move(1, 0);
      this.player.PlayAnimation('right');
    }
    else if (this.cursors.left.isDown) {
      this.player.Move(-1, 0);
      this.player.PlayAnimation('left');
    }
    else if (this.cursors.up.isDown) {
      this.player.Move(0, -1);
      this.player.PlayAnimation('up');
    }
    else if (this.cursors.down.isDown) {
      this.player.Move(0, 1);
      this.player.PlayAnimation('down');
    }
    else {
      this.player.Stop();
      this.player.PlayAnimation('idle');
    }

    //Esperamos un pequeño tiempo y paramos la animacion del ataque fisico
    if (this.player.isAttacking) this.player.atkTime++;
    if (this.player.atkTime > 20) {
      this.player.isAttacking = false;
      this.player.atkTime = 0;
    }

    if (this.player.HP <= 0) this.player.Spawn();//Muerte del jugador

  }

  AddEnemies(enemy) {
    enemy.setScale(0.5);
    this.enemies.add(enemy);

  }

  OnTrapOverlap(player, trap) {
    trap.ApplyEffect(player);
  }

  EnemyHitsPlayer(player, enemy) {
    player.ReceiveDamage(enemy.atk);
    this.HUDscene.ReduceHealthBar(player.HP, player.MaxHP);
    console.log(player.HP);
    let dirX = player.x - enemy.x;
    let dirY = player.y - enemy.y;
    let module = Math.sqrt(Math.pow(dirX, 2) + Math.pow(dirY, 2));
    dirX /= module;
    dirY /= module;
    player.setThrust(dirX, dirY);

  }
  GenerateItem(item, x, y) {
    if (item === 0)
      this.item = new Item(this, x, y, 'mana', 0, this.manaRecovery);
    else
      this.item = new Item(this, x, y, 'coin', 1, this.coinsDropped);
  }
  UpdateNumEnemies(value) {
    this.numEnemies += value;
    if (this.numEnemies <= 0) {
      this.book.UnlockBook();
    }
  }
  AllEnemiesDead() {
    return this.numEnemies <= 0;
  }
  CreateExit() {
    this.portal = new Portal(this, this.portalLayer.objects[0].x, this.portalLayer.objects[0].y, 'portal', this.player, 2);

  }
}