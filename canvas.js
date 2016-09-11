(function (app) {
	app.createCanvasObject = function (width, height, canvasId) {
		
		var defaultCanvasId = 'canvas',
		htmlElement;

		function getDrawingContext() {
			return htmlElement.getContext('2d');
		}	
			
		function getCenter() {
			return {x: htmlElement.width / 2, y: htmlElement.height / 2};
		}	
		
		function getHtmlElement() {
				return htmlElement
		}
		
		htmlElement = document.getElementById(canvasId || defaultCanvasId);
		htmlElement.width  = width;
		htmlElement.height = height;
 
		return {
			getDrawingContext: getDrawingContext,
			getCenter: getCenter,
			getHtmlElement: getHtmlElement
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
