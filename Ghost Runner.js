var endGroup;
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;

var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");         
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);

  
          
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;       
  
  
  doorsGroup = new Group();
  climbersGroup = new Group();  
  endGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){  
      ghost.x = ghost.x - 3;
    }                            
     if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;     
    }
    
    if(ghost.isTouching(climbersGroup))
      {
        ghost.velocityY =0
      }
    
    ghost.velocityY = ghost.velocityY + 0.1
    
    if(tower.y > 400){
      tower.y = 300       
    }
    spawnDoors();

    
   
   
    
    
    if(endGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"  
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
 
  if (frameCount % 100 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var end = createSprite(200,50,80,2)
 
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    end.x=door.x
    
        
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 3;
    climber.velocityY = 3;   
    end.velocityY = 3;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
 
    door.lifetime = 800;
    climber.lifetime = 800;
    end.lifetime = 800

    
  
    doorsGroup.add(door);
 
    climbersGroup.add(climber);
    
    endGroup.add(end);
  }
}
