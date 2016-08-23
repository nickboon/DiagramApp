/* requires drawing */
(function (app) {
	var drawing,
		getNearestZFromArray = app.createPointsObject().getNearestZFromArray;
	
	function toSolid(primitive) {
		return {
			points: primitive.points,
			primitives: [primitive]
		};		
	}
			
	function createLine(p, b, c, a) {
		var pointA = p,
			pointB = b,
			colour = c,
			alpha = a;
		
		if(!pointA || !pointB) {
			throw "You need at least 2 defined vertices for a line.";
		}
		
		return {
			points: [pointA, pointB],
			
			getNearestZ: function getNearestZ() {
				return Math.min(pointA.z, pointB.z);			
			},
			
			draw: function draw(drawingContext) {
				drawing.drawLine(drawingContext, pointA, pointB, colour, alpha);
			}, 	

			setColour: function (newColour) {
				colour = newColour;
			},
			
			setAlpha: function (newAlpha) {
				alpha = newAlpha;
			}
		};	
	}
	
	function createCurve(pointA, pointB, pointC, pointD, colour, alpha) {
		if(!pointA.x || !pointB.x || !pointC.x || !pointD.x) {
			throw "You need at least 4 defined vertices for a curve.";
		}

		return {
			points: [pointA, pointB, pointC, pointD],

			getNearestZ: function getNearestZ() {
				return Math.min(pointA.z, pointD.z);			
			},
			
			draw: function draw(drawingContext) {
				drawing.drawCurve(drawingContext, pointA, pointB, pointC, pointD, colour, alpha);
			}			
		};	
	}
	
	function createFill(points, colour, alpha) {
		if(points.length < 3) {
			throw "You need pass in an array of at least 3 points to create a fill.";
		}
		
		return {
			points: points,
			
			getNearestZ: function getNearestZ() {
				return getNearestZFromArray(points);
			},
			
			draw: function draw(drawingContext) {
				drawing.drawFill(drawingContext, points, colour, alpha);
			} 			
		};	
	}
		
	// create and return API for this module
	app.createPrimitivesObject = function (d) {
		drawing = d;
		
		return {
			toSolid: toSolid,
			createLine: createLine,
			createCurve: createCurve,
			createFill: createFill
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
