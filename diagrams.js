(function (app) {
	function getDefaultPerspective(canvas) {
		var 
			vanishingPointX = canvas.getWidth() / 2,
			vanishingPointY = canvas.getHeight() / 2;			
			return app.createPerspectiveObject(vanishingPointX, vanishingPointY);
	}
	
	// make diagrams object with arternative create digrams methods
	app.createDefaultFullScreenDiagram = function() {
		var canvas = app.createCanvasObject(),
			perspective = getDefaultPerspective(canvas);
			stage = app.createStageObject(canvas, perspective);	

		stage.animate();	

		return {
			perspective: perspective,
			stage: stage
		};	
	};
	
	app.createFullScreenDiagramWithAtmosphericPerspective = function() {
		var canvas = app.createCanvasObject(),
			perspective = getDefaultPerspective(canvas);
			stage = app.createStageObject(canvas, perspective, true);	

		stage.animate();	

		return {
			perspective: perspective,
			stage: stage
		};	
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
