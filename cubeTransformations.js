/* requires cueGeometry, transformations */
(function (app) {
	// config
	var	defaultWidth = 200,
	// objects from dependancies
		transformations = app.createTransformationObject(),
		rotateAboutX = transformations.rotatePointAboutX,
		rotateAboutY = transformations.rotatePointAboutY,
	// module variables
		points = [],
		tiltAngle = 0,
		rotateAlongEdgeAngle = 0,
		rotateAlongFaceDiagonalAngle = 0;

	function rotate45DegreesAboutY(point) {
		rotateAboutY(point, Math.PI / 4);
	}

	function rotateCube45DegreesAboutY() {
		points.forEach(rotate45DegreesAboutY)
	}
		
	function rotateTiltAngleAboutX(point) {
		rotateAboutX(point, tiltAngle);
	}	
		
	function tiltCubeAboutX() {
		points.forEach(rotateTiltAngleAboutX);
	}

	function rotateAlongEdgeAboutX(point) {
		rotateAboutX(point, rotateAlongEdgeAngle);
	}	

	function rotateCubeAlongEdgeAboutX() {
		points.forEach(rotateAlongEdgeAboutX);		
	}

	function rotateAlongFaceDiagonalAboutX(point) {
		rotateAboutX(point, rotateAlongFaceDiagonalAngle);
	}	
	
	function rotateCubeAlongFaceDiagonalAboutX() {
		points.forEach(rotateAlongFaceDiagonalAboutX);				
	}

	function getPoints() {
		return points;
	}

	// create and return API for this module
	app.createCubeTransformationsObject = function (w) {
		var width = w || defaultWidth,
			cubeGeometry = app.createCubeGeometryObject();
				
		points = app.getCubePoints(width);
		tiltAngle = cubeGeometry.getAngleBetweenFaceDiagonalAndCubeDiagonal(width);
		rotateAlongEdgeAngle =
			-cubeGeometry.getAngleAtCenterBetweenVerticesSeparatedByAnEdge(width);
		rotateAlongFaceDiagonalAngle =
			-cubeGeometry
				.getAngleAtCenterBetweenVerticesSeparatedByAFaceDiagonal(width);
		
		return {
			getPoints: getPoints,
			rotateCube45DegreesAboutY: rotateCube45DegreesAboutY,
			tiltCubeAboutX: tiltCubeAboutX,
			rotateCubeAlongEdgeAboutX: rotateCubeAlongEdgeAboutX,
			rotateCubeAlongFaceDiagonalAboutX: rotateCubeAlongFaceDiagonalAboutX
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
