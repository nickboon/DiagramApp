/* requires primitives */
(function (app) {
	var	primitives;
				
	function createHexahedron(points, lineColour, fillColour, alpha) {
		var createPoint = app.createPointsObject().create,
			createLine = primitives.createLine,
			createFill = primitives.createFill;
		
		function createDefaultPoints() {
			return app.getCubePoints(200);
		}

		function createPrimitives() {
			return [			
				createLine(points[0], points[1], lineColour, alpha),
				createLine(points[1], points[2], lineColour, alpha),
				createLine(points[2], points[3], lineColour, alpha),
				createLine(points[3], points[0], lineColour, alpha),
				createLine(points[5], points[4], lineColour, alpha),
				createLine(points[4], points[7], lineColour, alpha),
				createLine(points[7], points[6], lineColour, alpha),
				createLine(points[6], points[5], lineColour, alpha),
				createLine(points[0], points[4], lineColour, alpha),
				createLine(points[1], points[5], lineColour, alpha),
				createLine(points[2], points[6], lineColour, alpha),
				createLine(points[3], points[7], lineColour, alpha),

				// fill points are defined clockwise
				createFill([points[0], points[1], points[2], points[3]], fillColour, alpha),
				createFill([points[5], points[4], points[7], points[6]], fillColour, alpha),
				createFill([points[4], points[0], points[3], points[7]], fillColour, alpha),
				createFill([points[1], points[5], points[6], points[2]], fillColour, alpha),
				createFill([points[4], points[5], points[1], points[0]], fillColour, alpha),
				createFill([points[3], points[2], points[6], points[7]], fillColour, alpha)	 
			];
		}
		
		if(points && points.length !== 8) {
			throw "You need 8 vertices for a hexahedron.";
		}				
		points = points || createDefaultPoints();
		
		return {
			points: points,
			primitives: createPrimitives()
		};
	}
				
	// create and return API for this module
	app.createSolidsObject = function (p) {
		primitives = p;
		
		return {
			createHexahedron: createHexahedron
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
