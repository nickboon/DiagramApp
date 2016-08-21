/* requires canvas, perspective, transformation, stage */
(function (app) {
	app.createDefaultFullScreenDiagram = function() {
		var canvasWidth = window.innerWidth,
			canvasHeight = window.innerHeight,
			canvas= app.createCanvasObject().init(canvasWidth, canvasHeight),
			vanishingPointX = canvasWidth / 2,
			vanishingPointY = canvasHeight / 2,
			stage;
			
		perspective = app.createPerspectiveObject(vanishingPointX, vanishingPointY);
		stage = app.createStageObject(canvas, perspective);	
		stage.animate();	

		return {
			perspective: perspective,
			stage: stage
		}	
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
