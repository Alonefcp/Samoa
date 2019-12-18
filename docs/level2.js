
import SorcererScene from './SorcererScene.js';
import WaterRay from './WaterRay.js';

export default class level2 extends SorcererScene {
  constructor() {
    super({ key: 'level2' });
    this.SlowTime = 100;
    this.PoisonedTime = 100;
    this.PoisonIntervals = 20;
    this.manaRecovery = 5;
    this.coinsDropped = 5;
  }

  preload() {
    //this.load.image('redbar','Assets/redLifeBar.png')
    this.load.tilemapTiledJSON('nivel2', 'Assets/nivel2.json');
    this.load.image('tilesetLevel2', 'Assets/LEVEL2TILES.png');
    this.load.spritesheet('hole2', 'Assets/hoyolv2.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('spikes2', 'Assets/pinchoslv2.png');
    this.load.json('constants', './MagicConstants.json');
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
    this.playerSpawnLayer = this.map.getObjectLayer('playerSpawn');
    //Enemigos
    this.enemies = this.physics.add.group();
    this.numEnemies = this.meleeLayer.objects.length + this.wizardLayer.objects.length + this.tankLayer.objects.length + this.ghostLayer.objects.length;
    this.constants = this.chache.json.get('constants');
    this.unlockedMagic = new WaterRay(this, 0, 0, this.constants.waterRayDamage, 0, this.constants.waterrayCost, this.constants.waterRayCoolDown)
    this.createScene(this.suelo, this.paredes, this.paredes2, this.deco, this.spikesLayer, this.acidLayer, this.webLayer, this.holeLayer, this.bookLayer,
      this.portalLayer, this.destructibleObjectsLayer, this.meleeLayer, this.wizardLayer, this.tankLayer, this.ghostLayer, this.ghostPoints, this.playerSpawnLayer,
      this.numEnemies, this.enemies,this.unlockedMagic);
    this.scene.launch('HUD', { money: this.player.getMoney(), magic: this.player.GetCurrentMagic() });


  }

  update(time, delta) {
    super.update(time, delta);
  }
}