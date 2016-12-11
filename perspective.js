(function (app) {
	// config
	var defaultFocalLength = 500;
		defaultVanishingDistance = 1000,
		defaultMaxAlpha = 1;
	
	// create and return API for this module
	app.createPerspectiveObject = function (vanishingPointX, vanishingPointY, f) {
		var focalLength = f || defaultFocalLength,
			vanishingDistance =  defaultVanishingDistance,
			maxAlpha = defaultMaxAlpha;
			
		
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
		
		function getAtmosphericAlpha(primitiveZ) {
			var range = primitiveZ + focalLength;
			return (1 - (range / vanishingDistance)) * maxAlpha;
		}
		
		function setAtmosphericPerspective(v, m) {
			vanishingDistance = v || defaultVanishingDistance,
			maxAlpha = m || defaultMaxAlpha;			
		}
		
		if(!vanishingPointX || !vanishingPointY) {
			throw 'You need to pass in coordinates for the vanishing point to create a perspective object';
		}
		
		return {
			getScale: getScale,
			getScreenX: getScreenX,
			getScreenY: getScreenY,
			isPointBehindViewer: isPointBehindViewer,
			shiftVanishingPointX: shiftVanishingPointX,
			shiftVanishingPointY: shiftVanishingPointY,
			focalLength: focalLength,
			setAtmosphericPerspective: setAtmosphericPerspective,
			getAtmosphericAlpha: getAtmosphericAlpha
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
