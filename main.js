var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//anim stuff
const createAnimDuration = 500;
const createDelay = 25;
const transitionSpeed = 1000; //idk what unit its in, it controls offset transition speed though.


//calculations for hex drawing and size
const a = 2 * Math.PI / 6;
const sqrt3 = Math.sqrt(3);
const radius = 50;
const buffer = 1;


//debug
var debug = true;

//mouse positions
var mouseX = 5000;
var mouseY = 5000;
var mouseDown = false;

var biomes = [
	"plains",
	"hills",
	"forest",
	"stream",
	"shelter",
	"mountain",
	"goal",
	"start",
]

//game
var seed = Math.random();

var board = new hexBoard();


function handleMouseMove(e) {
	mouseX = parseInt(e.clientX - canvas.offsetLeft) - canvas.width / 2;
	mouseY = parseInt(e.clientY - canvas.offsetTop) - canvas.height / 2;
}


canvas.addEventListener("mousemove", e => {
	handleMouseMove(e);
});

document.addEventListener("mousedown", e => {
	mouseDown = true;
})

document.addEventListener("mouseup", e => {
	mouseDown = false;
})


board.createTiles(2);

console.log(board.hexTiles);

var bgColor = "black";

function update() {
	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
  	board.draw();

  	window.requestAnimationFrame(update)
}

update();