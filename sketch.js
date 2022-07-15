var invisibleGround, BackGround,backGround, BackGround2, backGround22;
var playerStop, PlayerStop;
var player,playerRun;
var playerJump, Jump;
var SuperJump, SJump;
var SuperSpeed, SSpeed;
var PlayerDown, Down;
var money, Money;
var obstacle1,obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstaclesDownGroup, obstaclesUpGroup;

function preload(){
  BackGround=loadImage("BackGround.jpeg");
  BackGround2 = loadImage("floor.jpg");

  player=loadAnimation("playerRun1.jpeg","Run2.jpeg","Run3.jpeg");
  playerStop = loadImage("player.jpeg");
  playerJump = loadImage("Jump.jpeg");
  PlayerDown = loadImage("down.jpeg");

  money = loadImage("Money.jpeg");
  SuperJump = loadImage("SuperJump.jpeg");
  SuperSpeed = loadImage("SuperSpeed.jpeg");

  obstacle1 = loadImage("obstacle1.jpeg");
  obstacle2 = loadImage("obstacle2.jpeg");
  obstacle3 = loadImage("grandMother.jpeg");
  obstacle4 = loadImage("stroller.jpeg");
  obstacle5 = loadImage("badBird.jpeg");
  obstacle6 = loadImage("bomb.jpeg");

}

function setup(){
  createCanvas(950,950)
  backGround = createSprite(400,200);
  backGround.addImage(BackGround);
  backGround.velocityX=-2;

  backGround22 = createSprite(100,1200);
  backGround22.addImage(BackGround2);
  backGround22.velocityX=-2;

  invisibleGround = createSprite(500,695,950,10);
  invisibleGround.visible = false;
  
  playerRun = createSprite(150,630);
  playerRun.addAnimation("Run",player);
  playerRun.addAnimation("Down",PlayerDown);
  
  obstaclesDownGroup = new Group();
  obstaclesUpGroup = new Group();
}


function draw(){

  if(backGround.x < 0){
    backGround.x = width/4;
  }
  
  if(backGround22.x < 0){
    backGround22.x = width/4;
  }

  if(keyDown("UP_ARROW") && playerRun.y > 600){
    playerRun.velocityY = -20;
    playerRun.changeAnimation("Run")
  }

  if(keyDown("DOWN_ARROW")){
    playerRun.changeAnimation("Down");
  }

  if(obstaclesDownGroup.isTouching(playerRun) || obstaclesUpGroup.isTouching(playerRun)){
    BackGround.velocityX = 0;
    BackGround22.velocityX = 0;
    obstaclesDownGroup.setVelocityXEach(0);
    obstaclesUpGroup.setVelocityXEach(0);
  }
  
  playerRun.velocityY = playerRun.velocityY +0.8;
  spawnObstacles();
  spawnUpObstacles();
  drawSprites();
  playerRun.collide(invisibleGround);
}

function spawnObstacles (){
  if(frameCount % 300 === 10) { 
    var obstacle = createSprite(950,650,10,40);
    obstacle.velocityX = -6 // + score/100;

    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = 0.6
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.scale = 0.5
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.scale = 0.07
              break;
      case 4: obstacle.addImage(obstacle4);
              obstacle.scale = 0.07
              break;
      
      
      default: break;
    }
    obstacle.lifetime = 200;
    obstaclesDownGroup.add(obstacle);
  }
}

function spawnUpObstacles (){
  if(frameCount % 200 === 0) { 
    var obstacle = createSprite(950,565 ,10,40);
    obstacle.velocityX = -6 // + score/100;

    var rand = Math.round(random(1,2));
    switch(rand) {

      case 1: obstacle.addImage(obstacle5);
              obstacle.scale = 0.07
              break;
      case 2: obstacle.addImage(obstacle6);
              obstacle.scale = 0.07
              break;
      default: break;
    }
    obstacle.lifetime = 200;

    obstaclesUpGroup.add(obstacle);
  }
}