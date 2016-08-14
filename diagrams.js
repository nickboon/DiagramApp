/* requires perspective, transformation, stage */
(function (app) {
	function setCanvas(width, height) {
		var canvas = document.getElementById('canvas');
		canvas.width  = width;
		canvas.height = height;

		return canvas;
	}
		
	app.createDefaultFullScreenDiagram = function() {
		var canvasWidth = window.innerWidth,
			canvasHeight = window.innerHeight,
			canvs = setCanvas(canvasWidth, canvasHeight),
			vanishingPointX = canvasWidth / 2,
			vanishingPointY = canvasHeight / 2,
			transformation = app.createTransformationObject(),
			stage;
			
		perspective = app.createPerspectiveObject(vanishingPointX, vanishingPointY);
		stage = app.createStageObject(canvas, perspective);	
		stage.setTransformer(transformation.createKeyboardIDrivenTransformer());
		stage.animate();	

		return {
			addSolids: stage.addSolids,
			perspective: perspective,
			stage: stage
		}	
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));