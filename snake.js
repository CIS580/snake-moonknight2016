/* Global variables */
var frontBuffer = document.getElementById('snake');
var frontCtx = frontBuffer.getContext('2d');
var backBuffer = document.createElement('canvas');
backBuffer.width = frontBuffer.width;
backBuffer.height = frontBuffer.height;
var backCtx = backBuffer.getContext('2d');
var oldTime = performance.now();


var isSnakeMoving = 0;
var timeCounter = 1;
var isThereAnApple = 0;
var stopGame = 0;

var numberOfSnakeBodyParts = 0;

var image = new Image();
image.src = "bg.jpg";

var imageApple = new Image();
imageApple.src = "apple.png";

var imageSnakeHead = new Image();
imageSnakeHead.src = "SnakeHead2.png";

var imageSnakeBody = new Image();
imageSnakeBody.src = "SnakeBody3.png";


var snakeBody = [];

var headSize = backBuffer.width/5;
var bodyPartSize = backBuffer.width/8;

var speed = 1;
var x = 5;
var y = 5;
var score = 0;
var moves = [];

 
/**
 * @function loop
 * The main game loop.
 * @param{time} the current time as a DOMHighResTimeStamp
 */
function loop(newTime) {
  var elapsedTime = newTime - oldTime;
  oldTime = newTime;
  
  update(elapsedTime);
  render(elapsedTime);

  // Flip the back buffer
  frontCtx.drawImage(backBuffer, 0, 0);

  // Run the next loop
  window.requestAnimationFrame(loop);
}

/**
 * @function update
 * Updates the game state, moving
 * game objects and handling interactions
 * between them.
 * @param {elapsedTime} A DOMHighResTimeStamp indicting
 * the number of milliseconds passed since the last frame.
 */
function update(elapsedTime) {

	if ((stopGame==0))
	{
  // TODO: Spawn an apple periodically
  moveApple();
  // TODO: Grow the snake periodically
  
	addBodyPart()
	
  
  // TODO: Move the snake
  
  animateBody();
  // TODO: Determine if the snake has moved out-of-bounds (offscreen)
  stopOffScreen();
  // TODO: Determine if the snake has eaten an apple
  eatApple();
  // TODO: Determine if the snake has eaten its tail
  eatBody();
  // TODO: [Extra Credit] Determine if the snake has run into an obstacle
  
	}
  

}

/**
  * @function render
  * Renders the current game state into a back buffer.
  * @param {elapsedTime} A DOMHighResTimeStamp indicting
  * the number of milliseconds passed since the last frame.
  */
  
  
function render(elapsedTime) {
  backCtx.clearRect(0, 0, backBuffer.width, backBuffer.height);
  
  // TODO: Draw the game objects into the backBuffer
  
  
  
  
  
  backCtx.drawImage(image, 0, 0, backBuffer.width, backBuffer.height);
  //backCtx.drawImage(image, 0, 0, backCtx.width, backCtx.height);
  
  
  
  if ((stopGame==0))
  {
  doScore();
  drawApple();
  
  drawSnakeBody();
  drawSnake(x,y);
  }
  else
  {
	  if (stopGame == 99)
	  {
	  backCtx.font = "45px Arial";
	  backCtx.fillText("Your score is:" + score,backBuffer.width/2-180,backBuffer.height/2-150);
	  backCtx.fillText("use the arrow key to move" ,backBuffer.width/2-300,backBuffer.height/2+20);
	  backCtx.fillText("don't hit the snake's body or the wall" ,backBuffer.width/2-350,backBuffer.height/2+110);
	  backCtx.fillText("gather apples to get more score!",backBuffer.width/2-350,backBuffer.height/2+150);
	  }
	  else
	  {
		  backCtx.font = "45px Arial";
		  backCtx.fillText("Your score is:" +score,backBuffer.width/2-180,backBuffer.height/2-20);
		  backCtx.fillText("Game Over" ,backBuffer.width/2-180,backBuffer.height/2-60);
		  
	  }
  }
  
 
}

//************** functions added by me ****************************

var headWidth = backBuffer.width/15;
var headLength = backBuffer.height/15;

var snakeBodyPartWidth = backBuffer.width/19 ;
var snakeBodyPartLength = backBuffer.height/19 ;

var appleWidth = backBuffer.width/20;
var appleLength = backBuffer.height/20;

var appleX = 200;
var appleY = 200;
function doScore()
{
	if (timeCounter%50==0)
		score+=50;
	backCtx.font = "15px Arial";
    backCtx.fillText("Your score is:" +score,backBuffer.width-180,20);
	backCtx.fillText("\nHold i for instructions",backBuffer.width-180,40);
}
function drawSnake(x,y)
{
	
	backCtx.drawImage(imageSnakeHead, x, y, headWidth, headLength);
	
}

function drawSnakeBody()
{
	/*
	
	*/
	
	
	
	for (i = 0; i<numberOfSnakeBodyParts; i++)
	backCtx.drawImage(imageSnakeBody, snakeBody[i].x,snakeBody[i].y, snakeBodyPartWidth, snakeBodyPartLength);
	//backCtx.drawImage(imageSnakeBody, 230, 5, backBuffer.width/8, backBuffer.height/8);
	
}

function moveApple (){
	if (isSnakeMoving == 1)
	timeCounter++;
	if ( !(isThereAnApple > 0)&& timeCounter>150)
		isThereAnApple = 1;
	//backCtx.drawImage(image, 0, 0, backBuffer.width, backBuffer.height);
	
}

function drawApple()
{
	if (isThereAnApple>0)
	backCtx.drawImage(imageApple, appleX, appleY, appleLength, appleWidth);
	
}

function snakeBodyPart (x, y, dir)
{
	 this.x = x;
	 this.y = y;
	 this.moves = [];
	 this.currentDirection = dir;
	
}

function addBodyPart()
{
	
	
	if (timeCounter%200==0)
  {
	  if (numberOfSnakeBodyParts == 0)
	{
		
		var bodyX =  x+ headWidth;
		var bodyY = y;
		var dir;
		if (input.up) {bodyX = x;bodyY = y + headLength; dir = "up";}
		if(input.down){bodyX = x;bodyY = y - headLength; dir = "down";}

		if (input.left) {bodyX = x + headWidth;bodyY = y; dir = "left";}
		if(input.right) {bodyX = x - headWidth;bodyY = y; dir = "right";}
		
		
		
		//var part = new snakeBodyPart(180,1*5);
		var part = new snakeBodyPart(bodyX,bodyY,dir);
	    snakeBody.push(part);
		numberOfSnakeBodyParts++;
	}
	
	
	else  
	{
		if (numberOfSnakeBodyParts<10)
		{
		
			var part = new snakeBodyPart(snakeBody[numberOfSnakeBodyParts-1].x+snakeBodyPartWidth,snakeBody[numberOfSnakeBodyParts-1].y,
				snakeBody[numberOfSnakeBodyParts-1].currentDirection);
			
			if (snakeBody[numberOfSnakeBodyParts-1].currentDirection == "up") 
				part = new snakeBodyPart(snakeBody[numberOfSnakeBodyParts-1].x,snakeBody[numberOfSnakeBodyParts-1].y+snakeBodyPartLength,
				snakeBody[numberOfSnakeBodyParts-1].currentDirection);
			
			if (snakeBody[numberOfSnakeBodyParts-1].currentDirection == "down")
				part = new snakeBodyPart(snakeBody[numberOfSnakeBodyParts-1].x,snakeBody[numberOfSnakeBodyParts-1].y-snakeBodyPartLength,
				snakeBody[numberOfSnakeBodyParts-1].currentDirection);
			
			if (snakeBody[numberOfSnakeBodyParts-1].currentDirection == "left") 
				part = new snakeBodyPart(snakeBody[numberOfSnakeBodyParts-1].x+snakeBodyPartWidth,snakeBody[numberOfSnakeBodyParts-1].y,
				snakeBody[numberOfSnakeBodyParts-1].currentDirection);
			
			if (snakeBody[numberOfSnakeBodyParts-1].currentDirection == "right") 
				part = new snakeBodyPart(snakeBody[numberOfSnakeBodyParts-1].x-snakeBodyPartWidth,snakeBody[numberOfSnakeBodyParts-1].y,
				snakeBody[numberOfSnakeBodyParts-1].currentDirection);
			
			//part = new snakeBodyPart(snakeBody[numberOfSnakeBodyParts-1].x+100,1*5);
			part.moves = snakeBody[numberOfSnakeBodyParts-1].moves;
			snakeBody.push(part);
			numberOfSnakeBodyParts++;
		}
	
    }
  
  }
}
function bodyPartMove (x,y,dirction)
{
	this.x = x;
	this.y = y;
	this.dirction = dirction;
	
}

function addNewDirction(x,y,dirction)
{
	
	for (i = 0; i<numberOfSnakeBodyParts; i++)
	{
		
		var newMove = new bodyPartMove(x,y,dirction);
		snakeBody[i].moves.push(newMove);
		
	}
}
function animateBody()
{
	//keeps snake moving
  if (input.up) y -= speed;
  if(input.down) y += speed;

  if (input.left) x -= speed;
  if(input.right) x += speed;
  
  /*
	for (i = 0; i<numberOfSnakeBodyParts; i++)
	{
		
		if (snakeBody[i].currentDirection == null)
		{
			if (i==0)
			{
				if (input.up) snakeBody[i].currentDirection = "up";
				if(input.down) snakeBody[i].currentDirection = "down";

				if (input.left) snakeBody[i].currentDirection = "left";
				if(input.right) snakeBody[i].currentDirection = "right";
			}
			
			else
			{
				snakeBody[i].currentDirection = snakeBody[i-1].currentDirection;
				
			}
		}
		if (snakeBody[i].moves.length>0)
		{
			
			if (snakeBody[i].moves[0].x == snakeBody[i].x&&snakeBody[i].moves[0].y == snakeBody[i].y)
				snakeBody[i].currentDirection = snakeBody[i].moves.shift().dirction;
			
		}
		
			if (snakeBody[i].currentDirection == "up") snakeBody[i].y -= speed;
			if (snakeBody[i].currentDirection == "down") snakeBody[i].y += speed;
			if (snakeBody[i].currentDirection == "left") snakeBody[i].x -= speed;
			if (snakeBody[i].currentDirection == "right") snakeBody[i].x += speed;
		
	}
	*/
	
	
	
	for (i = 0; i<numberOfSnakeBodyParts; i++)
	{
		if (snakeBody[i].moves.length>0)
		{
			var xpos = Math.abs(snakeBody[i].moves[0].x-snakeBody[i].x);
			var ypos = Math.abs(snakeBody[i].moves[0].y-snakeBody[i].y);
			if ((xpos<=speed)&&(ypos<=speed))
			{
				snakeBody[i].currentDirection = snakeBody[i].moves.shift().dirction;
			}
		}
		if (snakeBody[i].currentDirection == "up") snakeBody[i].y -= speed;
		if (snakeBody[i].currentDirection == "down") snakeBody[i].y += speed;
		if (snakeBody[i].currentDirection == "left") snakeBody[i].x -= speed;
		if (snakeBody[i].currentDirection == "right") snakeBody[i].x += speed;
	}
	
}

function stopOffScreen()
{
	
	if (x<0 || x+headWidth> backBuffer.width|| y<0 || y+headLength>backBuffer.height )
		stopGame = 1;
	
}
// input control

function eatApple()
{
	if ((!( y>(appleY+appleLength)  ||  y+headLength< appleY  ||
		x>appleX+appleWidth  ||  x+headWidth< appleX))  && isThereAnApple ==1 )
		{
			score+=500;
			isThereAnApple = 0;
			
		}
}

function eatBody()
{
	
	// this creates more forgiving head box
	
	shrinkFactor = 20;
	var smallerX = x + shrinkFactor ;
	var smallerY =  y + shrinkFactor;
	
	var smallerWidth = headWidth - shrinkFactor;
	var smallerLength = headLength - shrinkFactor;
	
	
	
		for (i = 0; i<numberOfSnakeBodyParts; i++)
		{ 
			if ((!( smallerY>(snakeBody[i].y+snakeBodyPartLength)  ||  smallerY+smallerLength< snakeBody[i].y  ||
				smallerX>snakeBody[i].x+snakeBodyPartWidth  ||  smallerX+smallerWidth< snakeBody[i].x))  )
				{
					
					stopGame = 1;
					
				}
		}
}



var input = {
up: false,//
down: false,
lef: false,
right: false
}

window.onkeydown = function(event) {

//console.log(event.keyCode);
switch(event.keyCode) {
case 38:
case 87:
addNewDirction(x,y,"up");
y-=1;
input.up = true;
input.down = false;
input.right = false;
input.left = false;

isSnakeMoving = 1;
break;

case 37:
case 65:
addNewDirction(x,y,"left");
x-=1;
input.left = true;
input.right = false;
input.up = false;
input.down = false;

isSnakeMoving = 1;
break;

case 39:
case 68:
addNewDirction(x,y,"right");
x+=1;
input.right = true;
input.left = false;
input.up = false;
input.down = false;

isSnakeMoving = 1;
break;

case 40:
case 83:
addNewDirction(x,y,"down");
y+=1;
input.down = true;
input.up = false;
input.right = false;
input.left = false;

isSnakeMoving = 1;
break;

case 73:
case 105:
stopGame = 99;

}

}

window.onkeyup = function(event) {

//console.log(event.keyCode);

event.preventDefault()
switch(event.keyCode) {
case 73:
case 105:
if (stopGame==99)
	stopGame =0;

break;
}

return false;
}

//**************** end of functions added by me *********************
/* Launch the game */
window.requestAnimationFrame(loop);
