import Entity from './Entity.js'; 
export default class Enemy extends Entity{
    
    constructor(scene, x, y,img) {
      super(scene,x,y,img);
      scene.physics.add.existing(this);
       
      }
      
    
      preUpdate(time, delta) 
      {
          
      }
    }
    
    
