var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
const numSquares = 20;
let squareSize = canvas.width/numSquares;
let squares = [];
let colours = ['green','red','blue','#ff00ee','yellow'];
let solved = [{x:0,y:0}];
let numColours = 5;
let turns = -1;

start();
function start(){
  setUp();
  draw(squares);
  fillSolved(squares[0][0].colour);
}

function fillSolved(currentColour){
  let sol = 0;
  function addSol(obj,x,y){
    sol = {x:obj.x+x,
           y:obj.y+y}
    if(notInSolved(sol)){
      solved.push(sol);
    }
  }

  for(let i = 0; i < solved.length; i++){
    if(checkLeft(currentColour,solved[i])){
      addSol(solved[i],-1,0);
    }
    if(checkRight(currentColour,solved[i])){
      addSol(solved[i],1,0);
    }
    if(checkUp(currentColour,solved[i])){
      addSol(solved[i],0,-1);
    }
    if(checkDown(currentColour,solved[i])){
      addSol(solved[i],0,1);
    }
  }
}

function setUp(){
  //Build arrary of "square objects"
  //Then draw objects to initialise board.
  for(let i = 0; i < numSquares; i++){
    let dummy = [];
    for(let j = 0; j < numSquares; j++){
      let colourIndex = rand(numColours); //Pick colour
      dummy[j] = {colour: colours[colourIndex],
                    xPos: i*squareSize,
                    yPos: j*squareSize}
    }
    squares[i]=dummy;
  }
  solved = [{x:0,y:0}];
}

function draw(obj){
  //
  for (let i = 0; i < numSquares; i++){
    for(let j = 0; j < numSquares; j++){
      ctx.fillStyle = obj[i][j].colour;
      ctx.fillRect(obj[i][j].xPos,obj[i][j].yPos,squareSize,squareSize);
    }
  }
  winner();
}

function notInSolved(sol){
  for(let i = 0; i < solved.length; i++){
    if((solved[i].x == sol.x) && (solved[i].y == sol.y)){
      return false;
    }
  }
  return true;
}

function redFunc(){
  whereToDraw('red');
  draw(squares);
}
function greenFunc(){
  whereToDraw('green');
  draw(squares);
}
function blueFunc(){
  whereToDraw('blue');
  draw(squares);
}
function purpleFunc(){
  whereToDraw('#ff00ee');
  draw(squares);
}
function yellowFunc(){
  whereToDraw('yellow');
  draw(squares);
}

function whereToDraw(newColour){
  updateSquares(newColour);
  fillSolved(newColour);
}

function winner(){
  if(solved.length >= numSquares*numSquares){
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Winner",100,135);
    ctx.fillText(turns,140,170);
    turns =0;
  }
  else{
    turns++;
  }
}

function updateSquares(newColour){
  for(let i = 0; i < solved.length; i++){
    squares[solved[i].x][solved[i].y].colour = newColour;
  }
}

function checkLeft(newColour,sol){
  if(sol.x > 0){
    return squares[sol.x-1][sol.y].colour == newColour;
  }
  else{
    return false;
  }
}

function checkRight(newColour,sol){
  if(sol.x < numSquares-1){
    return squares[sol.x+1][sol.y].colour == newColour;
  }
  else{
    return false;
  }
}

function checkUp(newColour,sol){
  if(sol.y > 0){
    return squares[sol.x][sol.y-1].colour == newColour;
  }
  else{
    return false;
  }
}

function checkDown(newColour,sol){
  if(sol.y < numSquares-1){
    return squares[sol.x][sol.y+1].colour == newColour;
  }
  else{
    return false;
  }
}

function rand(x){
  return Math.floor((Math.random()*x));
}
