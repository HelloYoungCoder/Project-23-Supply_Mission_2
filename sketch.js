//PROJECT - 24: SUPPLY MISSION - 2

//Create Variables
var helicopterIMG, helicopterSprite;
var packageSprite, packageIMG, packageBody;
var ground;

var leftBoxSprite, leftBoxBody;
var rightBoxSprite, rightBoxBody;
var bottomBoxSprite, bottomBoxBody;

var boxPosition, boxY;

//Create namespaces
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	//Load Images
	helicopterIMG=loadImage("helicopter.png");
	packageIMG=loadImage("package.png");
}

function setup() {
	//Create canvas
	createCanvas(800, 700);

	//Place objects in center
	rectMode(CENTER);

	//Assign box position
	boxPosition=width/2-100
 	boxY=610;
	
	//Create sprites for package, helicopter, ground & boxes 
	packageSprite = createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG);
	packageSprite.scale = 0.2;

	helicopterSprite = createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG);
	helicopterSprite.scale = 0.6;

	groundSprite = createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor = rgb(59, 54, 54);

	leftBoxSprite = createSprite(boxPosition, boxY, 15,100);
	leftBoxSprite.shapeColor = rgb(240, 65, 79);
	 
	rightBoxSprite = createSprite(boxPosition+200 , boxY, 15,100);
	rightBoxSprite.shapeColor = rgb(240, 65, 79);

	bottomBoxSprite = createSprite(boxPosition+100, boxY+40, 200,15);
	bottomBoxSprite.shapeColor = rgb(240, 65, 79);

	//Create Physics Engine
	engine = Engine.create();
	//Create Physics World to add objects
	world = engine.world;

	//Assign static state
	var static_object = {isStatic:true};

	//Create package object & add it to world
	packageBody = Bodies.circle(width/2 , 200 , 5 ,static_object);
	World.add(world, packageBody);
	
	//Create ground object & add it to world
	ground = Bodies.rectangle(width/2, 650, width, 10 ,static_object);
	World.add(world, ground);
	
	//Create a box on left & add it to world
	leftBoxBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , static_object );
	World.add(world, leftBoxBody);
	
	//Create a box on right & add it to world
	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , static_object );
	World.add(world, boxRightBody);

	//Create a box on center & add it to world
	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , static_object );
 	World.add(world, boxBottomBody);

	//The Matter.Runner module is an optional utility which provides a game loop, that handles continuously updating a Matter.Engine for you within a browser.
	Engine.run(engine);
  
}


function draw() {

	//Place objects in center
	rectMode(CENTER);

	//Clear the screen
	background(100, 178, 209);

	//Make the package sprite position as package object position
	packageSprite.x= packageBody.position.x;
	packageSprite.y= packageBody.position.y; 

	//Display sprites on screen
	drawSprites();
 
}

function keyPressed() {

	if (keyCode === LEFT_ARROW) {

		//Move in left direction
		helicopterSprite.x = helicopterSprite.x - 20;

		//Translation acts as Vector - A vector is an object that has both a magnitude and a direction.
		translation={x:-20,y:0}; 

		//Moves a body by a given vector relative to its current position, without imparting any velocity.
    	Matter.Body.translate(packageBody, translation);
	}

	if (keyCode === RIGHT_ARROW) {

		//Move in right direction
		helicopterSprite.x = helicopterSprite.x + 20;

		//Translation acts as Vector - A vector is an object that has both a magnitude and a direction.
		translation={x:20,y:0}; 

		//Moves a body by a given vector relative to its current position, without imparting any velocity.
    	Matter.Body.translate(packageBody, translation);
	}

	if (keyCode === DOWN_ARROW) {

		//Sets the body as static, including isStatic flag and setting mass and inertia to Infinity.
		Matter.Body.setStatic(packageBody,false);
	}
}



