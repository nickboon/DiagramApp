(function(app) {
    app.createCanvasObject = function(width, height, canvasId) {
        var defaultWidth = window.innerWidth,
            defaultHeight = window.innerHeight,
            defaultCanvasId = 'canvas',
            htmlElement;

        function getDrawingContext() {
            return htmlElement.getContext('2d');
        }

        function getCenter() {
            return { x: htmlElement.width / 2, y: htmlElement.height / 2 };
        }

        function getHtmlElement() {
            return htmlElement
        }

        function getWidth() {
            return htmlElement.width;
        }

        function getHeight() {
            return htmlElement.height;
        }

        htmlElement = document.getElementById(canvasId || defaultCanvasId);
        htmlElement.width = width || defaultWidth;
        htmlElement.height = height || defaultHeight;

        return {
            getDrawingContext: getDrawingContext,
            getWidth: getWidth,
            getHeight: getHeight,
            getCenter: getCenter,
            getHtmlElement: getHtmlElement
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));