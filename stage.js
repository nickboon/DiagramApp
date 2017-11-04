(function(app) {
    app.createStage = function(set) {
        var settings = set || {},
            width = settings.width || window.innerWidth,
            height = settings.height || window.innerHeight,
            perspective = app.createPerspective({
                vanishingPointX: width / 2,
                vanishingPointY: height / 2
            }),
            useAtmosphericPerspective = settings.useAtmosphericPerspective,
            background = settings.background,
            canvas = document.getElementById(settings.canvasId || 'canvas'),
            context = canvas.getContext('2d'),
            primitives = [],
            transformers = [],
            stage = {};

        function draw() {
            context.clearRect(0, 0, width, height);

            primitives.sort(function(a, b) {
                return a.getNearestZ() - b.getNearestZ();
            });

            if (background) { // special case?
                var create = app.createPrimitives();

                if (background.image) {
                    var backgroundImage = background.image();
                    primitives.pushcreate.image(backgroundImage.url, backgroundImage.point, backgroundImage.width, backgroundImage.height, backgroundImage.htmlElement);
                }
                if (background.colour) {
                    primitives.push(create.fill());
                }
            }

            primitives.reverse();
            primitives.forEach(function(primitive) {
                var primitiveZ = primitive.getNearestZ();
                if (perspective.isPointBehindViewer(primitiveZ)) {
                    primitive.draw(context, perspective, useAtmosphericPerspective ? perspective.getAtmosphericAlpha(primitiveZ) : undefined);
                }
            });
        }

        function update() {
            transformers.forEach(function(transformer) {
                transformer.transform();
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

        stage.background = background;

        init();

        return stage;
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));