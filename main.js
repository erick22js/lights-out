/*

	GAME CORE

*/

const DISPLAY = document.getElementById("display");
const CTX = DISPLAY.getContext("2d");

const CELL_WIDTH = 50;
const CELL_HEIGHT = 50;

const GAME = {
	"running": false,
	"width": 0,
	"height": 0,
	"grid": []
};

function redraw() {
	DISPLAY.width = GAME.width*CELL_WIDTH;
	DISPLAY.height = GAME.height*CELL_HEIGHT;
	CTX.strokeStyle = "black";
	CTX.lineWidth = 2;
	for (let x=0; x<GAME.width; x++){
		for (let y=0; y<GAME.height; y++){
			CTX.fillStyle = GAME.grid[x][y]? "#f80": "#630";
			CTX.fillRect(x*CELL_WIDTH, y*CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
			CTX.strokeRect(x*CELL_WIDTH, y*CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT);
		}
	}
}

function toggleIndex(x, y) {
	if (x>=0 && x<GAME.width && y>=0 && y<GAME.height){
		GAME.grid[x][y] = !GAME.grid[x][y];
	}
	if (x>=0 && x<GAME.width && (y-1)>=0 && (y-1)<GAME.height){
		GAME.grid[x][y-1] = !GAME.grid[x][y-1];
	}
	if ((x+1)>=0 && (x+1)<GAME.width && y>=0 && y<GAME.height){
		GAME.grid[x+1][y] = !GAME.grid[x+1][y];
	}
	if (x>=0 && x<GAME.width && (y+1)>=0 && (y+1)<GAME.height){
		GAME.grid[x][y+1] = !GAME.grid[x][y+1];
	}
	if ((x-1)>=0 && (x-1)<GAME.width && y>=0 && y<GAME.height){
		GAME.grid[x-1][y] = !GAME.grid[x-1][y];
	}
	redraw();
}

function checkWin(){
	for (let x=0; x<GAME.width; x++){
		for (let y=0; y<GAME.height; y++){
			if (GAME.grid[x][y]){
				return;
			}
		}
	}
	GAME.running = false;
	alert("You won!");
}

function generatePuzzle(width=3, height=3, all_filled=false) {
	GAME.width = width;
	GAME.height = height;
	GAME.grid = [];
	for (let x=0; x<GAME.width; x++){
		let collumn = [];
		for (let y=0; y<GAME.height; y++){
			collumn.push(true);
		}
		GAME.grid.push(collumn);
	}
	GAME.running = true;
	
	if (!all_filled){
		for (let i=0; i<(width*height); i++){
			toggleIndex(~~(Math.random()*width), ~~(Math.random()*height));
		}
	}
	
	redraw();
}



/*

	BINDING FUNCTIONALITY

*/

DISPLAY.onmousedown = function(ev){
	let x = ev.clientX - DISPLAY.getBoundingClientRect().left;
	let y = ev.clientY - DISPLAY.getBoundingClientRect().top;
	
	if (GAME.running){
		toggleIndex(~~(x/CELL_WIDTH), ~~(y/CELL_HEIGHT));
		checkWin();
	}
}

window.onload = function(){
	generatePuzzle(Number(prompt("Type the game width:", 3))||3, Number(prompt("Type the game height:", 3))||3, confirm("Start with every cell filled?"));
}
