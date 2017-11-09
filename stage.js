(function(app) {
    app.createStage = function(settings) {
        var canvas = {},
            width = 0,
            height = 0,
            background = {},
            backgroundImage = {},
            backgroundColour = 0,
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

            if (backgroundColour) {
                context.fillStyle = backgroundColour;
                context.fillRect(0, 0, canvas.width, canvas.height);
            }
            if (backgroundImage) {
                context.drawImage(backgroundImage.getHtmlElement(),
                    backgroundImage.x,
                    backgroundImage.y,
                    backgroundImage.width,
                    backgroundImage.height);
            }
            context.restore();
        }

        function draw() {
            var context = canvas.getContext('2d');

            context.clearRect(0, 0, width, height);

            if (background) {
                drawBackground(context);
            }

            stage.forEachPrimitive(function(primitive, perspective, alpha) {
                primitive.draw(context, perspective, alpha);
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

        stage.setSolids = function(solids) {
            var i = solids.length - 1;

            primitives.length = 0;
            for (; i >= 0; i -= 1) {
                primitives = primitives.concat(solids[i].primitives);
            }
        };

        stage.forEachPrimitive = function(doAction) {
            var perspective = app.createPerspective(settings.perspective),
                useAtmosphericPerspective = settings.useAtmosphericPerspective;

            primitives.sort(function(a, b) {
                    return a.getNearestZ() - b.getNearestZ();
                })
                .reverse()
                .forEach(function(primitive) {
                    var primitiveZ = primitive.getNearestZ();
                    if (perspective.isPointBehindViewer(primitiveZ)) {
                        var alpha = useAtmosphericPerspective ? perspective.getAtmosphericAlpha(primitiveZ) : undefined

                        doAction(primitive, perspective, alpha);
                    }
                });
        }

        stage.setTransformers = function(updatedTransformers) {
            transformers.length = 0;
            transformers = updatedTransformers;
        };

        stage.getCanvas = function() {
            return canvas;
        };

        settings = settings || {};
        canvas = document.getElementById(settings.canvasId || 'canvas');
        width = settings.width || window.innerWidth;
        height = settings.height || window.innerHeight;
        background = settings.background || {};
        backgroundImage = background.image;
        backgroundColour = background.colour;
        stage.background = background;

        init();

        return stage;
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));