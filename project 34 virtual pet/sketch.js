 //Create variables here
var dog;
var dogImg, happyDogImg;
var database, foodS, foodStock;
var backgroundImg;

function preload(){
  //load images here
  getBg();
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
  
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock,Err);
  dog = createSprite(380,420,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.3;
}


function draw() {  
    if(backgroundImg)
    background(backgroundImg);
    if(foodS!== undefined){
    textSize(20);    
    fill(0);   
    text("*Press UP ARROW to feed CUTIEE D0GGO milk!!!*", 20,50);
    text("Food Remaining: "+foodS, 150,150);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }

    drawSprites();
  }
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}

function Err(){
  console.log("errors");
}

async function getBg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);

    if(hour>=06 && hour<=13){
        bg="images/hello3.png";
    }
    else if(hour>=13 && hour<=18){
        bg="images/hello2.png"
    }
    else{
        bg="images/bg.png";
    }
    backgroundImg = loadImage(bg);
}


