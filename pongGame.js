const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

   const backImage = new Image();
  backImage.src= "a.png";

  const RectsIntersection = function(rect1X, rect1Y, rect1W, rect1H, rect2X, rect2Y, rect2W, rect2H) {
    return rect1X < rect2X + rect2W && rect1X + rect1W > rect2X && rect1Y < rect2Y + rect2H && rect1H + rect1Y > rect2Y;
  };
  var audio = new Audio('song.mp3');
audio.play();
const rand = function(num) {
  return Math.floor(Math.random() * num) + 1;
};
  const createPoint = function(num, canvasWidth, canvasHeight){
    const a = [];
    const r = function(n){
    if(n<=0){
      return "";
    }  
    const b = 5;
    a.push({
      x: rand(canvasWidth - 60),
      y: rand(canvasHeight - 60),
      width: 30,
      height: 30,
      xDelta: b,
      yDelta: b,
      color: "red"
    })
    r(n-1);
    }
    r(num);
    return a;
  };
  const point = createPoint(1, canvas.width,canvas.height);
  const player = {
      x: 50,
      y:10,
      width:26,
      height:70,
      score: 0
  };
  const player2 = {
    x: 1270,
    y: 10,
    width:26,
    height:70,
    score: 0
  };
  const draw = function(){  
context.clearRect(0,0,canvas.width,canvas.height);   
    const drawEvery = function(arr,i){
      if(i === arr.length){
        return "";
      }
      context.drawImage(backImage, 0, 0, canvas.width, canvas.height);
      context.fillStyle = arr[i].color;
    context.fillRect(arr[i].x,arr[i].y, arr[i].width,arr[i].height);
    context.fillRect(player.x,player.y,player.width,player.height);
    context.fillRect(player2.x,player2.y,player2.width,player2.height);
    context.font = "40px Storybook";
      context.fillText(Math.floor(player.score), 300,50);
       context.fillText(Math.floor(player2.score), 900,50);
      drawEvery(arr,i+1);
    };
    drawEvery(point,0);
  };
 
  
  const updateData = function(){
    const forevery = function(arr, i){
      if(i === arr.length){
        return "";
      }
      if(arr[i].x >= canvas.width-arr[i].width){
      arr[i].x=player2.x-arr[i].width;
      arr[i].y=player2.y;
      player.score+=1;
      arr[i].xDelta = -arr[i].xDelta;
    }else if(arr[i].x<=0){
      arr[i].x=player.x+player.width;
      arr[i].y=player.y;
      player2.score+=1;
      arr[i].xDelta = -arr[i].xDelta;
    }
    
    if(arr[i].y >= canvas.height-arr[i].height){
      arr[i].yDelta = -arr[i].yDelta;
    }else if(arr[i].y<=0){
      arr[i].yDelta = -arr[i].yDelta;
    }
    arr[i].x =   arr[i].x + arr[i].xDelta;
    arr[i].y = arr[i].y + arr[i].yDelta;
    
    forevery(arr,i+1);
    };
    forevery(point,0);
  };
  const updateData1 = function(){
      if(RectsIntersection(player.x,player.y,player.width,player.height,point[0].x,point[0].y,point[0].width,point[0].height)){
        point[0].xDelta = - point[0].xDelta;
        point[0].yDelta = - point[0].yDelta;
      }else if(RectsIntersection(player2.x,player2.y,player2.width,player2.height,point[0].x,point[0].y,point[0].width,point[0].height)){
        point[0].xDelta = - point[0].xDelta;
         point[0].yDelta = - point[0].yDelta;
      } 
  }

  const upKey = 38;
  const downKey = 40;
  const w = 87;
  const s = 83;
  const keyPressed = {}
  
document.addEventListener('keydown', function(event) {
        keyPressed[event.keyCode] = true;
        event.preventDefault()   
      }, false);
      document.addEventListener('keyup', function(event) {
        keyPressed[event.keyCode] = false;
        event.preventDefault()
      }, false);


const loop = function(){


      if(keyPressed[upKey] && player2.y > 0 ) {
        player2.y = player2.y - 15;
      }

       
      if(keyPressed[downKey] && player2.y < canvas.height-player2.height){
        player2.y= player2.y +  15;    
      }


      if(keyPressed[w] && player.y > 0 ) {
        player.y = player.y - 15;
      }

       
      if(keyPressed[s] && player.y < canvas.height-player2.height){
        player.y= player.y + 15;    
      }
      

    
    draw();
    updateData();
    updateData1();
    window.requestAnimationFrame(loop);
  };
  
  loop();