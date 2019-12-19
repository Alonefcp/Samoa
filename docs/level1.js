import SorcererScene from './SorcererScene.js';
import Fireball from './Fireball.js';
export default class level1 extends SorcererScene {
  constructor() {

    super({ key: 'level1' });
    this.SlowTime = 100;
    this.PoisonedTime = 100;
    this.PoisonIntervals = 20;
    this.manaRecovery = 5;
    this.coinsDropped = 5;

  }

  preload() {
    this.load.audio('musiclv1', 'Assets/audio/level1.mp3');
    this.load.audio('musiclv2', 'Assets/audio/level2.mp3');
    this.load.audio('musiclv3', 'Assets/audio/level3.mp3');
    this.load.audio('fireballfx', 'Assets/audio/fireball.mp3');
    this.load.audio('laserfx', 'Assets/audio/laser.mp3');
    this.load.audio('meleefx', 'Assets/audio/melee.mp3');
    this.load.audio('stopTime', 'Assets/audio/stopTime.mp3');
    this.load.audio('enemyFireball', 'Assets/audio/enemyFireball.mp3');
    this.load.audio('tornado', 'Assets/audio/tornado.mp3');
    this.load.audio('viento', 'Assets/audio/viento.mp3');
    this.load.spritesheet('meleeEnemy', 'Assets/melee.png', { frameWidth: 32, frameHeight: 36 });
    this.load.spritesheet('wizard', 'Assets/wizard.png', { frameWidth: 16, frameHeight: 21 });
    this.load.spritesheet('ghost', 'Assets/ghost.png', { frameWidth: 16, frameHeight: 17 });
    this.load.spritesheet('tank', 'Assets/tank.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('book', 'Assets/waterbook.png', { frameWidth: 17, frameHeight: 26 });
    this.load.image('spiderWeb', 'Assets/web.png');
    this.load.image('acid', 'Assets/acido.png');
    this.load.spritesheet('hole1', 'Assets/hoyolv1.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('spikes1', 'Assets/pinchoslv1.png');
    this.load.image('chest', 'Assets/cofre.png');
    this.load.image('coin', 'Assets/coin.png');
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
    this.load.json('constants', './Constants.json');
  }

  create() {
    this.coins = 0;
    this.playerExtraMana = false;
    this.playerExtraHP = false;
    this.reduceLife = false;
    this.stage = 1;
    this.constants = this.cache.json.get('constants');
    //Enemigos
    this.enemies = this.physics.add.group();
    this.unlockedMagic = new Fireball(this, 0, 0, this.constants.fireballSpeed, this.constants.fireballSpeed, true, 8, this.constants);
    this.magic = 0;
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
    this.createScene(this.suelo, this.paredes, this.paredes2, this.decoracion, this.spikesLayer, this.acidLayer, this.webLayer, this.holeLayer, this.bookLayer,
      this.portalLayer, this.destructibleObjectsLayer, this.meleeLayer, this.wizardLayer, this.tankLayer, this.ghostLayer, this.ghostPoints, this.playerSpawnLayer,
      this.numEnemies, this.enemies, this.unlockedMagic,this.constants,this.magic);
    //Hacemos que la escena del HUD corra en paralelo con esta
    this.scene.launch('HUD', { money: this.player.getMoney(), magic: this.player.GetCurrentMagic() });
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
  }

  update(time, delta) {
    super.update(time, delta);
  }
}