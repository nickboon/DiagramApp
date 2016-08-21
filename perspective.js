(function (app) {
	// config
	var defaultFocalLength = 500,
	// module variables	
		focalLength,
		vanishingPointX,
		vanishingPointY;
	
	function getScale(point) {
		return focalLength / (focalLength + point.z);
	}
		
	function getScreenX(point) {
	  var scale = focalLength / (focalLength + point.z);
	  return vanishingPointX + point.x * scale;
	}

	function getScreenY(point) {
	  var scale = focalLength / (focalLength + point.z);
	  return vanishingPointY + point.y * scale;
	}

	function isPointBehindViewer(pointZ) {
		return pointZ > -focalLength;		
	}
		
	function shiftVanishingPointX(shiftX) {	
		vanishingPointX += shiftX;	
	}
	
	function shiftVanishingPointY(shiftY) {	
		vanishingPointY += shiftY;	
	}	
		
	// create and return API for this module
	app.createPerspectiveObject = function (vpx, vpy, f) {
		if(!vpx && !vpy) {
			throw 'You need to pass in coordinates for the vanishing point to create a perspective object';
		}
		vanishingPointX = vpx;
		vanishingPointY = vpy;
		focalLength = f || defaultFocalLength;
		
		return {
			getScale: getScale,
			getScreenX: getScreenX,
			getScreenY: getScreenY,
			isPointBehindViewer: isPointBehindViewer,
			shiftVanishingPointX: shiftVanishingPointX,
			shiftVanishingPointY: shiftVanishingPointY
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
