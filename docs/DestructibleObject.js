import Entity from './Entity.js'

export default class DestructibleObject extends Entity
{
    constructor(scene,x,y,img)
    {
        super(scene,x,y,img);
        scene.physics.add.existing(this);
    }

    DropItem(scene,x,y,img1,img2)
    {
       this.value = Phaser.Math.Between(0, 1);
        if(this.value===0)this.item = scene.physics.add.sprite(x, y, img1);
        else this.item = scene.physics.add.sprite(x, y, img2);
       
       this.item.setScale(2);
       this.item.body.setImmovable(true);
       scene.physics.add.collider(scene.player,this.item,this.DestroyItem,null,this);
    }

    DestroyItem()
    {
        this.item.destroy();
    }
}