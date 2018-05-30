const groundSpeedDecayMult = 0.94;
const drivePower = 0.5;
const reversePower = 0.2;
const turnRate = 0.06;
const minSpeedToTurn = 0.5;

function carClass() {
	this.x = 75;
	this.y = 75;
	this.ang = 0;
	this.speed = 0;
	this.myCarPic; // which picture to use
	this.name = "Untitled Car";

	this.keyHeld_Gas = false;
	this.keyHeld_Reverse = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;

	this.controlKeyUp;
	this.controlKeyRight;
	this.controlKeyDown;
	this.controlKeyLeft;

	this.setupInput = function(upKey, rightKey, downKey, leftKey) {
		this.controlKeyUp = upKey;
		this.controlKeyRight = rightKey;
		this.controlKeyDown = downKey;
		this.controlKeyLeft = leftKey;
	}

	this.reset = function(whichImage, carName) {
		this.name = carName;
		this.myCarPic = whichImage;
		this.speed = 0;

		for(var eachRow=0;eachRow<trackRows;eachRow++) {
			for(var eachCol=0;eachCol<trackCols;eachCol++) {
				var arrayIndex = rowColToArrayIndex(eachCol, eachRow);
				if(trackGrid[arrayIndex] == trackPlayerStart) {
					trackGrid[arrayIndex] = trackRoad;
					this.ang = -Math.PI/2;
					this.x = eachCol * trackWidth + trackWidth/2;
					this.y = eachRow * trackHeight + trackHeight/2;
					return;
				} // end of player start if
			} // end of col for
		} // end of row for
		console.log("NO PLAYER START FOUND!");
	} // end of carReset func

	this.move = function() {
		this.speed *= groundSpeedDecayMult;

		if(this.keyHeld_Gas) {
			this.speed += drivePower;
		}
		if(this.keyHeld_Reverse) {
			this.speed -= reversePower;
		}
		if(Math.abs(this.speed) > minSpeedToTurn) {
			if(this.keyHeld_TurnLeft) {
				this.ang -= turnRate;
			}
			if(this.keyHeld_TurnRight) {
				this.ang += turnRate;
			}
		}

		this.x += Math.cos(this.ang) * this.speed;
		this.y += Math.sin(this.ang) * this.speed;

		carTrackHandling(this);
	}

	this.draw = function() {
		drawBitmapCenteredWithRotation(this.myCarPic, this.x,this.y, this.ang);
	}
}
