(function(app) {
    app.createStage = function(settings) {
        var
            canvas,
            width = 0,
            height = 0,
            background,
            primitives = [],
            transformers = [],
            stage = {};


        function update() {
            transformers.forEach(function(transformer) {
                transformer.transform();
            });
        }

        function drawBackground(context) {
            context.save();

            if (background.colour) {
                context.fillStyle = background.colour;
                context.fillRect(0, 0, canvas.width, canvas.height);
            }
            if (background.image) {
                var image = background.image,
                    htmlElement = image.getHtmlElement();

                context.drawImage(htmlElement, image.x, image.y, image.width, image.height);
            }
            context.restore();
        }

        function draw() {
            var perspective = app.createPerspective(settings.perspective),
                context = canvas.getContext('2d'),
                useAtmosphericPerspective = settings.useAtmosphericPerspective;

            context.clearRect(0, 0, width, height);

            if (background) {
                drawBackground(context);
            }

            primitives.sort(function(a, b) {
                    return a.getNearestZ() - b.getNearestZ();
                })
                .reverse()
                .forEach(function(primitive) {
                    var primitiveZ = primitive.getNearestZ();
                    if (perspective.isPointBehindViewer(primitiveZ)) {
                        primitive.draw(context, perspective, useAtmosphericPerspective ? perspective.getAtmosphericAlpha(primitiveZ) : undefined);
                    }
                });
        }

        function animate() {
            window.requestAnimationFrame(animate, canvas);
            update();
            draw();
        }

        function init() {
            canvas.width = width;
            canvas.height = height;
            animate();
        }

        stage.setPrimitives = function(solids) {
            var i = solids.length - 1;

            primitives.length = 0;
            for (; i >= 0; i -= 1) {
                primitives = primitives.concat(solids[i].primitives);
            }
        };

        stage.getPrimitives = function() {
            return primitives;
        }

        stage.setTransformers = function(updatedTransformers) {
            transformers.length = 0;
            transformers = updatedTransformers;
        };


        settings = settings || {};
        canvas = document.getElementById(settings.canvasId || 'canvas');
        width = settings.width || window.innerWidth;
        height = settings.height || window.innerHeight;
        background = settings.background;
        stage.background = background;

        init();

        return stage;
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));