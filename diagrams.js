/* requires canvas, perspective, transformation, stage */
(function (app) {
	app.createDefaultFullScreenDiagram = function() {
		var canvas = app.createCanvasObject(),
			vanishingPointX = canvas.getWidth() / 2,
			vanishingPointY = canvas.getHeight() / 2,
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
