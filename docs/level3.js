import SorcererScene from './SorcererScene.js'

export default class level3 extends SorcererScene {
  constructor() {

    super({ key: 'level3' });
    this.SlowTime = 100;
    this.PoisonedTime = 100;
    this.PoisonIntervals = 20;
    this.manaRecovery = 5;
    this.coinsDropped = 5;
  }
  Init(data) {
    this.player.setMoney(data.money);
    this.player.setUnlockedMagic(data.magic);
  }

  preload() {
    //this.load.image('redbar','Assets/redLifeBar.png')
    this.load.tilemapTiledJSON('nivel3', 'Assets/nivel3.json');
    this.load.image('tilesetLevel3', 'Assets/Nivel3Tiles.png');
    this.load.spritesheet('hole3', 'Assets/hoyolv3.png',{ frameWidth: 32, frameHeight: 32 });
    this.load.image('spikes3', 'Assets/pinchoslv3.png');
  }

  create() {
    //Tilemap de prueba
    this.map = this.make.tilemap({
      key: 'nivel3',
      tileWidth: 32,
      tileHeight: 32
    });

    this.tiles = this.map.addTilesetImage('Nivel3Tiles', 'tilesetLevel3');
    this.suelo = this.map.createStaticLayer('Suelo', [this.tiles]);
    this.paredes2 = this.map.createStaticLayer('Paredes2', [this.tiles]);
    this.paredes = this.map.createStaticLayer('Paredes', [this.tiles]);
    this.deco = this.map.createStaticLayer('Decoracion', [this.tiles]);

    this.paredes.setCollisionByProperty({ colisiona: true });
    this.paredes2.setCollisionByProperty({ colisiona: true });
    this.deco.setCollisionByProperty({ colisiona: true });

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
    this.createScene(this.suelo, this.paredes, this.paredes2, this.deco, this.spikesLayer, this.acidLayer, this.webLayer, this.holeLayer, this.bookLayer,
      this.portalLayer, this.destructibleObjectsLayer, this.meleeLayer, this.wizardLayer, this.tankLayer, this.ghostLayer,
      this.ghostPoints,this.playerSpawnLayer ,this.numEnemies,);

  }

  update(time, delta) {
    super.update(time, delta);
  }

}