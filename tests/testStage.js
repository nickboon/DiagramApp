(function(app) {
    app.run = function() {
        var stage = app.createStage(),
            cube = app.createHexahedron().createSolid(),
            autoTransformer = app.createAutoRotationTransformer('y');

        stage.setPrimitives([cube]);
        autoTransformer.setPoints([cube])
        stage.setTransformers([autoTransformer]);
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));