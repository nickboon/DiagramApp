(function(app) {
    app.run = function() {
        var stage = app.createStage(),
            cube = app.createHexahedron().createSolid();

        stage.setPrimitives([cube]);
        stage.setTransformers([app.createAutoRotationTransformer([cube], 'y')]);
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));