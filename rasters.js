(function(app) {
    app.newImage = function(url, width, height, x, y, htmlElement) {
        var image = {
            source: url,
            width: width || 0,
            height: height || 0,
            x: x || 0,
            y: y || 0,
            htmlElement: htmlElement
        };

        image.getHtmlElement = function() {
            if (image.htmlElement)
                return image.htmlElement;
            else {
                var imgElement = document.createElement('img');
                imgElement.src = url;
                return imgElement;
            }
        }

        image.centreIn = function(container) {

            var hRatio = 0,
                vRatio = 0,
                ratio = 0;

            hRatio = container.width / image.width;
            vRatio = container.height / image.height;
            ratio = Math.min(hRatio, vRatio);
            image.width *= ratio;
            image.height *= ratio;
            image.x = (container.width - image.width) / 2;
            image.y = (container.height - image.height) / 2;
        };

        return image;
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));