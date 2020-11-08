
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score=0;
var Background,backgroundImg;
var jump;
var iground
var st=0;
var PLAY=1;
var END=0;
var gameState=1;
var monkeyOver;
var stuck,stuckImg;
var restart,restartImg;
var life,lifeImg1,lifeImg2,lifeImg3;
var PLAY=1;
var END=0;
var gameState=1;
var life2;
var life1;
var backgroundImg;
var groundImg,ground;
//var im;

function preload(){
  
  restartImg=loadImage("zxzxxz.png")
  monkey_running =loadAnimation("sprite_0.png",
  "sprite_1.png","sprite_2.png","sprite_3.png",
  "sprite_4.png","sprite_5.png","sprite_6.png",
  "sprite_7.png","sprite_8.png")
  monkeyOver =loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jump=loadSound("js.mp3");
  stuckImg=loadImage("st.png");
  lifeImg1=loadImage("life1.png");
  lifeImg2=loadImage("life2.png");
  lifeImg3=loadImage("life3.png");
  backgroundImg=loadImage("bgv.png");
  groundImg=loadImage("gggg.png");
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  iground=createSprite(width/2,height-110,width,2);
  iground.visible=false;
  monkey=createSprite(width/9,height/4,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.2;
  //im=createSprite(width/9,height/4,10,10);
  //im.addImage("im",monkey_running);
  //im.scale=0.2;
 // im.x=monkey.x;
 // /im.y=monkey.y;
  //im.visible=false;
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  life=createSprite(width/2,height/8,10,10);
  life.addImage("life3",lifeImg3);
  life.scale=0.5; 
  life2=createSprite(width/2,height/8,10,10);
  life2.addImage("life2",lifeImg2);
  life2.scale=0.5;
  life2.visible=false;
  life1=createSprite(width/2,height/8,10,10);
  life1.addImage("life1",lifeImg1);
  life1.scale=0.4;
  life1.visible=false;
  restart=createSprite(width/2,height/2,0,0);
  restart.addImage("restart",restartImg);
  restart.scale=0.3;
  restart.visible=false;
  ground=createSprite(2000,height-50,0,0);
  ground.addImage("ground",groundImg);
  
}


function draw() {
  background(backgroundImg);
 
 
  monkey.collide(iground);
  
  if(gameState===PLAY){
    OBSTACLE();
    BANANA();

    ground.velocityX=-13;
    if(ground.x<0){
      ground.x=2000;
    }
    monkey.velocityY = monkey.velocityY +1;

    

    if((keyDown("space")||mouseIsPressed||touches.length > 0 )&& monkey.y>iground.y-150){
      monkey.velocityY=-27;
      touches = [];
    }
    monkey.collide(iground);
    if(bananaGroup.isTouching(monkey)){
      score=score+10;
      bananaGroup.destroyEach();
    }

    st = st + Math.round(getFrameRate()/60);

    if(obstacleGroup.isTouching(monkey)&&life.visible===true){
      life.visible=false;
      life2.visible=true;
      obstacleGroup.destroyEach();
    }

    if(obstacleGroup.isTouching(monkey)&&life2.visible===true){
      life2.visible=false;
      life1.visible=true;
      obstacleGroup.destroyEach();
    }
    if(obstacleGroup.isTouching(monkey)&&life1.visible===true){
      life1.visible=false;
      obstacleGroup.destroyEach();
      gameState=END;
    }

  }
  
  if(gameState===END){
    restart.visible=true;
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    monkey.collide(iground);
    monkey.visible=false;
    //im.visible=true;
    if(mousePressedOver(restart)||touches.length>0){
      gameState=PLAY;
      score=0;
      st=0;
      restart.visible=false;
      life.visible=true;
      monkey.visible=true;
      //im.visible=false;
      touches = [];
      monkey.collide(iground);
    }
  }

  

  drawSprites()

  fill("white");
  stroke("black");
  textSize(25);
  text("SCORE : "+score,width-1300,height-555);
  text("SURVIVAL TIME : "+st,width-350,height-555);
  }

function BANANA(){
  if(frameCount%180===0){
  banana=createSprite(width,Math.round(random(height-600,height-300)),10,10);
  banana.addImage("banana",bananaImage);
  banana.scale=0.5;
  banana.velocityX=-7-(st/80);
  banana.lifetime=width/banana.velocityX;
  bananaGroup.add(banana);
  }
}

function OBSTACLE(){
  if(frameCount%130===0){
   obstacle=createSprite(width,height-135,10,10);
   obstacle.addImage("obstacle",obstacleImage);
   obstacle.velocityY=10;
   obstacle.velocityX=-13-(st/80);
   obstacle.collide(iground);
   obstacle.scale=1.3;
   obstacle.lifetime=width/obstacle.velocityX;
   obstacleGroup.add(obstacle);
  }
}

