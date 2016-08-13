/* requires perspective */
(function (app) {	
	var perspective,
		solids = [],
		primitives = [],
		transformationPoints = [],	
		transformer,
		canvas,
		drawingContext;
	
	function addSolid(solid) {
		primitives = primitives.concat(solid.primitives);
		transformationPoints = transformationPoints.concat(solid.points);
	}
		
	function addSolids(solidArray) {
		for(var i = solidArray.length - 1; i >= 0; i -= 1) {
			addSolid(solidArray[i]);
		}
	}	
			
	function setTransformer(t) {
		transformer = t;
	}		
			
	function drawPrimitive(primitive) {
		if (perspective.isPointBehindViewer(primitive.getNearestZ())) { 		
			primitive.draw(drawingContext);
		}
	}
	
	function draw() {
        drawingContext.clearRect(0, 0, canvas.width, canvas.height);
		primitives.sort(function (a, b) {
            return a.getNearestZ() - b.getNearestZ();
        });
        primitives.reverse();
        primitives.forEach(drawPrimitive);
    };
	
	function transform() {
		if(transformer) {
			transformer.transform(transformationPoints);
		}		
	}
	
	function animate() {
		window.requestAnimationFrame(animate, canvas);
			transform();
			draw();
	}
	
	// create and return API for this module
	app.createStageObject = function (c, p) {					
		canvas = c;
		perspective = p;
		drawingContext = canvas.getContext('2d');

		return {
			addSolid: addSolid,
			addSolids: addSolids,
			setTransformer: setTransformer,
			animate: animate
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
