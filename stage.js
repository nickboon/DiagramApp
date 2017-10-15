(function(app) {
    // create and return API for this module
    app.createStageObject = function(canvas, perspective, background) {
        var drawingContext,
            primitives = [],
            transformers = [];

        function addSolid(solid) {
            primitives = primitives.concat(solid.primitives);
        }

        function addSolids(solidArray) {
            for (var i = solidArray.length - 1; i >= 0; i -= 1) {
                addSolid(solidArray[i]);
            }
        }

        function setSolids(solidArray) {
            primitives.length = 0;
            for (var i = solidArray.length - 1; i >= 0; i -= 1) {
                addSolid(solidArray[i]);
            }
        }

        function setTransformers(transformersArray) {
            transformers.length = 0;
            transformers = transformersArray;
        }

        function drawBackground() {
            if (background) {
                drawingContext.save();

                drawingContext.fillStyle = background.colour;
                drawingContext.fillRect(0, 0, canvas.width, canvas.height);

                if (background.image) {
                    var image = background.image,
                        htmlElement = image.getHtmlElement();

                    drawingContext.drawImage(htmlElement, image.x, image.y, image.width, image.height);
                }

                drawingContext.restore();
            }
        }

        function draw(useAtmosphericPerspective) {
            drawingContext.clearRect(0, 0, canvas.width, canvas.height);

            drawBackground();

            primitives.sort(function(a, b) {
                return a.getNearestZ() - b.getNearestZ();
            });
            primitives.reverse();

            primitives.forEach(function(primitive) {
                var primitiveZ = primitive.getNearestZ();
                if (perspective.isPointBehindViewer(primitiveZ)) {
                    primitive.draw(drawingContext, useAtmosphericPerspective ? perspective.getAtmosphericAlpha(primitiveZ) : undefined);
                }
            });
        };

        function transform() {
            transformers.forEach(function(transformer) {
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
            draw(true);
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