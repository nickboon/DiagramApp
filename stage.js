/* requires perspective */
(function (app) {	
	var perspective,
		primitives = [],
		transformers = [],
		canvas,
		drawingContext,
		animationFunctions = [];
	
	function addSolid(solid) {
		primitives = primitives.concat(solid.primitives);
	}
		
	function addSolids(solidArray) {
		for(var i = solidArray.length - 1; i >= 0; i -= 1) {
			addSolid(solidArray[i]);
		}
	}	
	
	function setSolids(solidArray) {
		primitives.length = 0;
		for(var i = solidArray.length - 1; i >= 0; i -= 1) {
			addSolid(solidArray[i]);
		}		
	}

	function setTransformers(transformersArray) {
		transformers.length = 0;
		transformers = transformersArray;
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
	
	function runTransformation(transformer) {
		transformer.transform();		
	}
	
	function transform() {		
		transformers.forEach(runTransformation)
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
			setSolids: setSolids,
			setTransformers: setTransformers,
			animate: animate,
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
