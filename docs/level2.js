import Player from './Player.js';
import SorcererScene from './SorcererScene.js';
import Item from './Item.js';
import Portal from './Portal.js';
export default class level2 extends SorcererScene {
  constructor() {
    super({ key: 'level2' });
    this.SlowTime = 100;
    this.PoisonedTime = 100;
    this.PoisonIntervals = 20;
    this.manaRecovery = 5;
    this.coinsDropped = 5;
  }
  init(data) {
    this.coins = data.money;
    this.unlockedMagic = data.magic;
  }
  preload() {
    //this.load.image('redbar','Assets/redLifeBar.png')
    this.load.tilemapTiledJSON('nivel2', 'Assets/nivel2.json');
    this.load.image('tilesetLevel2', 'Assets/LEVEL2TILES.png');
  }

  create() {
    //Tilemap de prueba
    this.map = this.make.tilemap({
      key: 'nivel2',
      tileWidth: 32,
      tileHeight: 32
    });

    this.tiles = this.map.addTilesetImage('LEVEL2TILES', 'tilesetLevel2');
    this.suelo = this.map.createStaticLayer('suelo', [this.tiles]);
    this.paredes2 = this.map.createStaticLayer('paredes2', [this.tiles]);
    this.paredes = this.map.createStaticLayer('paredes', [this.tiles]);
    this.deco = this.map.createStaticLayer('Decoracion', [this.tiles]);

    this.paredes.setCollisionByProperty({ colisiona: true });
    this.paredes2.setCollisionByProperty({ colisiona: true });
    this.deco.setCollisionByProperty({ colisiona: true });

    this.spikesLayer = this.map.getObjectLayer('Pinchos');
    this.acidLayer = this.map.getObjectLayer('Veneno');
    this.webLayer = this.map.getObjectLayer('Telarañas');
    this.holeLayer = this.map.getObjectLayer('Hoyos');
    this.bookLayer = this.map.getObjectLayer('Libro');
    this.portalLayer = this.map.getObjectLayer('SigNivel');
    this.destructibleObjectsLayer = this.map.getObjectLayer('Destructibles');
    this.meleeLayer = this.map.getObjectLayer('Melee');
    this.wizardLayer = this.map.getObjectLayer('Mago');
    this.tankLayer = this.map.getObjectLayer('Tanque');
    this.ghostLayer = this.map.getObjectLayer('Fantasma');
    this.ghostPoints = this.map.getObjectLayer('GhostPoints');
    this.numEnemies = this.meleeLayer.objects.length + this.wizardLayer.objects.length + this.tankLayer.objects.length + this.ghostLayer.objects.length;
    this.createScene(this.suelo, this.paredes, this.paredes2, this.deco, this.spikesLayer, this.acidLayer, this.webLayer, this.holeLayer, this.bookLayer,
      this.portalLayer, this.destructibleObjectsLayer, this.meleeLayer, this.wizardLayer, this.tankLayer, this.ghostLayer, this.ghostPoints, this.numEnemies);



  }

  update(time, delta) {
    super.update(time, delta);
  }
}