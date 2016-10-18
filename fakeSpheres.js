/* requires perspective, shapes */
(function (app) {				
	// create and return API for this module		
	app.createFakeSpheresObject = function (perspective) {
		var drawing = app.createDrawingObject(perspective),
			vectorDrawing = app.createVectorDrawingObject(perspective),
			shapes = app.createShapesObject(drawing, vectorDrawing);				
			
		function createFakeSphereFill(point, radius, apparentRadius, colour, alpha) {
			var fill = shapes.createCircularFill(point, apparentRadius, colour, alpha);
				//reflectionX = shapes.createCircularFill(getReflectionX(point), apparentRadius, colour, alpha - .2);
			 			
			return {			
				getNearestZ: function getNearestZ() {
					return point.z - radius;
				},
				draw: fill.draw,
				getSvg: fill.getSvg			
			};			
		}	
						
		function createFakeSphereEdge(point, apparentRadius, colour, alpha) {
			var circle = shapes.createCircle(point, apparentRadius, colour, alpha);
			
			return {			
				getNearestZ: function getNearestZ() {
					return point.z
				},
				draw: circle.draw,
				getSvg: circle.getSvg
			};			
		}	

		function create(point, radius, lineColour, fillColour, alpha) {
			var nearPoint,
				apparentRadius;
				
			point = point || app.createPointsObject().create;				
			nearPoint = {x: point.x, y: point.y, z: point.z - radius};
			apparentRadius = radius * perspective.getScale(nearPoint); 
			
			function createPrimitives() {
				return [
					createFakeSphereEdge(point, apparentRadius, lineColour, alpha),
					createFakeSphereFill(point, radius, apparentRadius, fillColour, alpha)
				]			
			}
				
			return {
				points: [point],			
				primitives: createPrimitives()
			};
		}
		
		function createStroke(point, radius, lineColour, alpha) {
			var nearPoint,
				apparentRadius;
				
			point = point || app.createPointsObject().create;				
			nearPoint = {x: point.x, y: point.y, z: point.z - radius};
			apparentRadius = radius * perspective.getScale(nearPoint); 
			
			function createPrimitives() {
				return [
					createFakeSphereEdge(point, apparentRadius, lineColour, alpha)
				]			
			}
				
			return {
				points: [point],			
				primitives: createPrimitives()
			};
		}
		
		if (!perspective) {
			throw 'You need to pass in a perspective object to create fake spheres.';
		}

		
		return {
			create: create,
			createStroke: createStroke
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
