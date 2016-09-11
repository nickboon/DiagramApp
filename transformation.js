(function (app) {
	var numberOfDegrees = 360,
		incrementAngle = Math.PI * 2 / numberOfDegrees,
		defaultShift = .5;

	function rotatePointAboutX(point, angle) {
		var cosX = Math.cos(angle),
			sinX = Math.sin(angle),
			newY = point.y * cosX - point.z * sinX,
			newZ = point.z * cosX + point.y * sinX;
		point.y = newY;
		point.z = newZ;
		return point;
	};
	
	function rotatePointAboutY(point, angle) {
		var cosY = Math.cos(angle),
			sinY = Math.sin(angle),
			newX = point.x * cosY - point.z * sinY,
			newZ = point.z * cosY + point.x * sinY;
		point.x = newX;
		point.z = newZ;
		return point;
	};

	function rotatePointAboutZ(point, angle) {
		var cosZ = Math.cos(angle),
			sinZ = Math.sin(angle),
			newX = point.x * cosZ - point.y * sinZ,
			newY = point.y * cosZ + point.x * sinZ;
		point.x = newX;
		point.y = newY;
		return point;
	};
	
	function copyPointAndShift(point, axis, distance) {
		return axis === 'x' ? {x: point.x + distance, y: point.y, z: point.z} :
			axis === 'y' ? {x: point.x, y: point.y + distance, z: point.z} :
				{x: point.x, y: point.y, z: point.z + distance};
	}
	
	function copyPointAndRotate(point, axis, angle) {
		var newPoint = {x: point.x, y: point.y, z: point.z};
		
		return axis === 'x' ? rotatePointAboutX(newPoint, angle) :
			axis === 'y' ? rotatePointAboutY(newPoint, angle) :
				rotatePointAboutZ(newPoint, angle)
	}
	
	function createKeyboardDrivenTransformer(solids, s) {
		var	speed = s || 1;
			points = [],
			angle = incrementAngle * speed;
			angleX = 0,
			angleY = 0,
			shift = defaultShift * speed,
			shiftX = 0,
			shiftZ = 0,
			
		(function addKeyboardListener() {
			window.addEventListener('keydown', function (event) {
				switch (event.keyCode) {
					case 32: //SPACE
						event.preventDefault();
						break;	  
					case 37: //LEFT
						event.preventDefault();
						if (event.keyCode === 37 && event.shiftKey) {
							shiftX -= shift;
						} else {
							angleY -= angle;
						}
						break;
					case 38: //UP
						event.preventDefault();
						if (event.keyCode === 38 && event.shiftKey) {
							shiftZ -= shift;
						} else {
							angleX += angle;
						}
						break;
					case 39: //RIGHT
						event.preventDefault();
						if (event.keyCode === 39 && event.shiftKey) {
							shiftX += shift;
						} else {
							angleY += angle;
						}
						break;
					case 40: //DOWN
						event.preventDefault();
						if (event.keyCode === 40 && event.shiftKey) {
							shiftZ += shift;
						} else {
							angleX -= angle;
						}
						break;
					case 113: //F2
						graphic_objects_3d.printSVG(thisStage);
						break;
					case 112: //F1 HELP PAGE
						window.alert(
							'1. Arrow keys rotate model about the X and Y axis.\n'
								+ '2. SHIFT + UP and SHIFT + DOWN shift model along Z axis.\n'
								+ '3. SHIFT + LEFT and SHIFT + RIGHT shift model along X axis.\n'
						);
						break;
				}		
			}, false);
			window.addEventListener('keyup', function (event) {
				switch (event.keyCode) {
					case 38:        //up
					case 40:        //down
					case 37:        //left
					case 39:        //right
						angleX = angleY = 0;
						shiftZ = shiftX = 0;
						break;
				}
			}, false);		
		})();
		
		function shiftRotatePoint(point) {        
			rotatePointAboutX(point, angleX);
			rotatePointAboutY(point, angleY);
			point.x += shiftX;
			point.z += shiftZ;
		}
		
		function shiftRotate() {
			points.forEach(shiftRotatePoint);		
		}
		
		function addPointsToTransformer(solid) {
			points = points.concat(solid.points);
		}
			
		if (solids === 'undefined') {
			throw "You must an array of solids to be transformed when creating a transformer";
		}
			
		if(speed) {
			angle *= speed;
		}	
			
		solids.forEach(addPointsToTransformer)
		
		return {
			transform: shiftRotate
		}
	}
	
	
	function createAutoYRotationTransformer(solids) {		
		var points = [],
		angle = incrementAngle;
	
		function autoRotate(point) {
			rotatePointAboutY(point, angle);
		} 

		function transform() {
			points.forEach(autoRotate);
		}

		function addPointsToTransformer(solid) {
			points = points.concat(solid.points);
		}
			
		if (solids === 'undefined') {
			throw "You must an array of solids to be transformed when creating a transformer";
		}
			
		solids.forEach(addPointsToTransformer);
		
		return {
			transform: transform
		};
	};
		
	// create and return API for this module
	app.createTransformationObject = function () {
		return {
			rotatePointAboutX: rotatePointAboutX,
			rotatePointAboutY: rotatePointAboutY,
			rotatePointAboutZ: rotatePointAboutZ,
			copyPointAndShift: copyPointAndShift,
			copyPointAndRotate: copyPointAndRotate,
			createKeyboardDrivenTransformer: createKeyboardDrivenTransformer,
			createAutoYRotationTransformer: createAutoYRotationTransformer,
			incrementAngle: incrementAngle
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
