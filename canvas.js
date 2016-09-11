(function (app) {
	app.createCanvasObject = function () {
		var canvas = document.getElementById('canvas');

		function init(width, height) {
			canvas.width  = width;
			canvas.height = height;

			return canvas;
		}
			
		function getDrawingContext() {
			return canvas.getContext('2d');
		}	
			
		function getCenter() {
			return {x: canvas.width / 2, y: canvas.height / 2};
		}	

		return {
			init: init,
			getDrawingContext: getDrawingContext,
			getCenter: getCenter
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
