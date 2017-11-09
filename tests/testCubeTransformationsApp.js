(function(app) {
    function createLabelsForCubeVertices(points) {
        var primitives = app.primitives,
            copyOf = app.createPointsObject().copyOf,
            labelSolids = [],
            primitive,
            i;

        for (i = points.length - 1; i >= 0; i -= 1) {
            primitive = (
                primitives.createLabel('vertex no.' + i,
                    copyOf(points[i]),
                    '#bb2222',
                    .8,
                    null,
                    true
                )
            );
            labelSolids.push(primitives.toSolid(primitive))
        }

        return labelSolids;
    }

    function createSolids() {
        var cube = app.createHexahedron().createSolid();
        //cubeTransformations = app.createCubeTransformationsObject(200);
        //cubePoints = cubeTransformations.getPoints();
        //cube = solids.createHexahedron(cubePoints);

        //cube.primitives = cube.primitives.concat(createLabelsForCubeVertices(cube.points, primitives));

        //cubeTransformations.rotateCubeAboutY(Math.PI / 4);
        //cubeTransformations.tiltCubeAboutX();
        //cubeTransformations.rotateCubeAlongEdgeAboutX();
        // cubeTransformations.rotateCubeAlongFaceDiagonalAboutX();
        //cubeTransformations.rotateCubeAlongEdgeAboutX();

        // cubeTransformations.rotateCubeAlongFaceDiagonalAboutX();
        // cubeTransformations.tiltBackCubeAboutX();
        // cubeTransformations.rotateCubeAboutY(Math.PI / 2);
        // cubeTransformations.tiltCubeAboutX();

        // cubeTransformations.rotateCubeAlongEdgeAboutX();
        // cubeTransformations.rotateCubeAlongFaceDiagonalAboutX();
        // cubeTransformations.rotateCubeAlongEdgeAboutX();
        //cubeTransformations.rotateCubeAlongFaceDiagonalAboutX();

        return [cube].concat(
            createLabelsForCubeVertices(cube.points)
        );
    }

    app.run = function() {
        var stage = app.createStage(),
            solids = createSolids();

        stage.setSolids(solids);
        //stage.setTransformers([app.createAutoRotationTransformer(solids, 'y')]);

    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));