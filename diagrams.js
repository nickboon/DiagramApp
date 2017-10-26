(function(app) {
    function getDefaultPerspective(canvas) {
        var
            vanishingPointX = canvas.getWidth() / 2,
            vanishingPointY = canvas.getHeight() / 2;
        return app.createPerspectiveObject(vanishingPointX, vanishingPointY);
    }

    app.createDefaultFullScreenDiagram = function(backgroundColour) {
        var canvas = app.createCanvasObject(),
            perspective = getDefaultPerspective(canvas),
            stage = app.createStageObject(canvas, perspective, backgroundColour);

        stage.animate();

        return {
            perspective: perspective,
            stage: stage
        };
    };

    app.createFullScreenDiagramWithAtmosphericPerspective = function(backgroundColour) {
        var canvas = app.createCanvasObject(),
            perspective = getDefaultPerspective(canvas),
            stage = app.createStageObject(canvas, perspective, backgroundColour);

        stage.animateWithAtmosphericPerspective();

        return {
            perspective: perspective,
            stage: stage
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));