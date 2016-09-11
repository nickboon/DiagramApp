/* requires perspective, shapes */
(function (app) {				
	// create and return API for this module		
	app.createFakeSpheresObject = function (perspective) {
		var drawing = app.createDrawingObject(perspective),
			shapes = app.createShapesObject(drawing);				

		function createFakeSphereFill(point, radius, apparentRadius, colour, alpha) {
			return {			
				getNearestZ: function getNearestZ() {
					return point.z - radius;
				},
				draw: shapes.createCircularFill(point, apparentRadius, colour, alpha).draw
			};			
		}	
						
		function createFakeSphereEdge(point, apparentRadius, colour, alpha) {
			return {			
				getNearestZ: function getNearestZ() {
					return point.z
				},
				draw: shapes.createCircle(point, apparentRadius, colour, alpha).draw
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
		
		return {
			create: create,
			createStroke: createStroke
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
