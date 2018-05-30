var canvas, canvasContext;

var greenCar = new carClass();
var redCar = new carClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	colorRect(0,0, canvas.width,canvas.height, 'black');
	colorText("LOADING IMAGES", canvas.width/2, canvas.height/2, 'white');

	loadImages();
}

function imageLoadingDoneSoStartGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);

	setupInput();

	loadLevel(levelList[levelNow]);
}

function nextLevel() {
	levelNow++;
	if(levelNow >= levelList.length) {
		levelNow = 0;
	}
	loadLevel(levelList[levelNow]);
}

function loadLevel(whichLevel) {
	trackGrid = whichLevel.slice();
	redCar.reset(otherCarPic, "Red");
	greenCar.reset(carPic, "Green");
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	greenCar.move();
	redCar.move();
}

function drawAll() {
	drawTracks();
	greenCar.draw();
	redCar.draw();
}
