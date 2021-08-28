var bow , arrow,  scene;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var arrowGroup, redb, blueb, greenb, pinkb
var score=0;

function preload(){
  
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  
}



function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
   score = 0    

   // moving ground
   scene.velocityX = -3;

  
  redb = createGroup();
  greenb = createGroup();
  blueb = createGroup();
  pinkb = createGroup();
  arrowGroup = createGroup();
}

function draw() {
 //background(0);
   
    if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY;
  
   // release arrow when space key is pressed
  if (keyDown("space")) {
    createArrow();
  }

  destroy(redb, 1)
  destroy(blueb, 2)
  destroy(greenb, 3)
  destroy(pinkb, 4)

  // //creating continous enemies
  var select_balloon = Math.round(random(1,4));

  if (World.frameCount % 100 === 0) {
    if (select_balloon === 1) {
      createBalloon(redb, red_balloonImage, 0.1);
    } else if (select_balloon === 2) {
      createBalloon(greenb, green_balloonImage, 0.1);
    } else if (select_balloon === 3) {
      createBalloon(blueb, blue_balloonImage, 0.1);
    } else {
      createBalloon(pinkb, pink_balloonImage, 1);
    }
  }  

  drawSprites();
  text("Score: " + score, 300,50);
  
}

// Creating  arrows for bow
 function createArrow() {
  var arrow = createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y= bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);

}

// Creating  arrows for ballon
function createBalloon(group, image, scale) {
  var ballon = createSprite(0,Math.round(random(20, 370)), 10, 10);
  ballon.addImage(image);
  ballon.velocityX = 3;
  ballon.lifetime = 150;
  ballon.scale = scale;
  group.add(ballon);
}

// Creating  arrows for destroy
function destroy(group, addScore) {
  if(arrowGroup.isTouching(group)){
    group.destroyEach()
    arrowGroup.destroyEach()
    score = score + addScore
  }
}
