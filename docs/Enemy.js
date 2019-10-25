import Entity from './Entity.js'; 
export default class Enemy extends Entity{
    
    constructor(scene, x, y) {
      super(scene,x,y,'enemy');

     
      scene.physics.add.existing(this);

       
      }
      
      preload() 
      { 
        
      }
    
      create() 
      {
      }
    
      preupdate(time, delta) 
      {    
      }

        
      }
    
    
