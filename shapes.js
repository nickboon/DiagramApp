/* requires drawing */
(function (app) {
	// create and return API for this module	
	app.createShapesObject = function (drawing) {		
		function createLabel (text, point, colour, alpha, size, isScaled) {		
			return {
				points: [point],
				
				getNearestZ: function getNearestZ() {
					return point.z;			
				},
				
				draw: function draw(drawingContext) {
					drawing.drawLabel(drawingContext, text, point, colour, alpha, size, isScaled);
				}			
			};	
		}
		
		function createCircle(point, radius, colour, alpha) {		
			return {
				points: [point],
				
				getNearestZ: function getNearestZ() {
					return point.z;
				},
				
				draw: function draw(drawingContext) {
					drawing.drawCircle(drawingContext, point, radius, colour, alpha);
				} 			
			};			
		}
		
		function createCircularFill(point, radius, colour, alpha) {
			return {
				points: [point],
				
				getNearestZ: function getNearestZ() {
					return point.z;
				},
				
				draw: function draw(drawingContext) {
					drawing.drawCircularFill(drawingContext, point, radius, colour, alpha);
				} 			
			};			
		}			
		
		return {
			createLabel: createLabel,
			createCircle: createCircle,
			createCircularFill: createCircularFill
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
