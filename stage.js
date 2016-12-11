(function (app) {
	// create and return API for this module
	app.createStageObject = function (canvas, perspective) {					
		var drawingContext,
			primitives = [],
			transformers = [];
				
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
					
		function drawPrimitivesWithAtmosphericPerspective(primitive) {
			var primitiveZ = primitive.getNearestZ();			
			if (perspective.isPointBehindViewer(primitiveZ)) {
				primitive.draw(drawingContext, perspective.getAtmosphericAlpha(primitiveZ));
			}
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
			
		function drawWithAtmosphericPerspective() {
			drawingContext.clearRect(0, 0, canvas.width, canvas.height);
			primitives.sort(function (a, b) {
				return a.getNearestZ() - b.getNearestZ();
			});
			primitives.reverse();
			primitives.forEach(drawPrimitivesWithAtmosphericPerspective);
		}
			
		function transform() {		
			transformers.forEach(function (transformer) {
				transformer.transform();						
			});
		}
		
		function animate() {
			window.requestAnimationFrame(animate, canvas);
				transform();
				draw();
		}
	
		function animateWithAtmosphericPerspective() {
			window.requestAnimationFrame(animateWithAtmosphericPerspective, canvas);
				transform();
				drawWithAtmosphericPerspective();			
		}
		
		if (!canvas || !perspective) {
			throw 'To create a stage you must pass it a canvas and a perspective object.';
		}
		
		drawingContext = canvas.getDrawingContext();
		canvas = canvas.getHtmlElement();
		
		return {
			setSolids: setSolids,
			setTransformers: setTransformers,
			animate: animate,
			animateWithAtmosphericPerspective: animateWithAtmosphericPerspective
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
