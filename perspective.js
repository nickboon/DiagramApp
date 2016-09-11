(function (app) {
	// config
	var defaultFocalLength = 500;
	
	// create and return API for this module
	app.createPerspectiveObject = function (vanishingPointX, vanishingPointY, f) {
		if(!vanishingPointX || !vanishingPointY) {
			throw 'You need to pass in coordinates for the vanishing point to create a perspective object';
		}
		focalLength = f || defaultFocalLength;
		
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
