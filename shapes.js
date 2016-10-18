/* requires drawing */
(function (app) {
	// create and return API for this module	
	app.createShapesObject = function (drawing, vectorDrawing) {		
		function createLabel (text, point, colour, alpha, size, isScaled) {		
			return {
				points: [point],
				
				getNearestZ: function () {
					return point.z;			
				},
				
				draw: function (drawingContext) {
					drawing.drawLabel(drawingContext, text, point, colour, alpha, size, isScaled);
				},

				getSvg: function () {
					return vectorDrawing.label(text, point, colour, alpha, size, isScaled);
				}
			};	
		}
		
		function createCircle(point, radius, colour, alpha) {		
			return {
				points: [point],
				
				getNearestZ: function () {
					return point.z;
				},
				
				draw: function (drawingContext) {
					drawing.drawCircle(drawingContext, point, radius, colour, alpha);
				}, 			

				getSvg: function () {
					return vectorDrawing.circle(point, radius, colour, alpha);
				}
			};			
		}
		
		function getReflectionX(point) {
			return {x: point.x, y: -point.y, z: point.z};
		}

		
		function createCircularFill(point, radius, colour, alpha) {
			return {
				points: [point],
				
				getNearestZ: function () {
					return point.z;
				},
				
				draw: function (drawingContext) {
					drawing.drawCircularFill(drawingContext, point, radius, colour, alpha);
				},

				getSvg: function () {
					return vectorDrawing.circularFill(point, radius, colour, alpha);
				}		
			};			
		}			
		
		if (!drawing) {
			throw 'You need to pass in a drawing object to create shapes.';
		}
		
		return {
			createLabel: createLabel,
			createCircle: createCircle,
			createCircularFill: createCircularFill
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
