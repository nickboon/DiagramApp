/* required diagrams, points, primitives, shapes, solids, cubeTransformations */
(function(app) {
    function createLabelsForCubeVertices(points, primitives, shapes) {
        var labelSolids = [],
            i,
            copyOf = app.createPointsObject().copyOf;

        for (i = points.length - 1; i >= 0; i -= 1) {
            var primitive = (
                shapes.createLabel('vertex no.' + i,
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

    function createSolids(perspective) {
        var drawing = app.createDrawingObject(perspective),
            primitives = app.createPrimitivesObject(drawing),
            shapes = app.createShapesObject(drawing),
            solids = app.createSolidsObject(primitives),
            cubeTransformations = app.createCubeTransformationsObject(200),
            cubePoints = cubeTransformations.getPoints(),
            cube = solids.createHexahedron(cubePoints);

        cubeTransformations.rotateCubeAboutY(Math.PI / 4);
        cubeTransformations.tiltCubeAboutX();
        cubeTransformations.rotateCubeAlongEdgeAboutX();
        cubeTransformations.rotateCubeAlongFaceDiagonalAboutX();
        cubeTransformations.rotateCubeAlongEdgeAboutX();

        cubeTransformations.rotateCubeAlongFaceDiagonalAboutX();
        cubeTransformations.tiltBackCubeAboutX();
        cubeTransformations.rotateCubeAboutY(Math.PI / 2);
        cubeTransformations.tiltCubeAboutX();

        cubeTransformations.rotateCubeAlongEdgeAboutX();
        cubeTransformations.rotateCubeAlongFaceDiagonalAboutX();
        cubeTransformations.rotateCubeAlongEdgeAboutX();
        //cubeTransformations.rotateCubeAlongFaceDiagonalAboutX();

        return [cube].concat(
            createLabelsForCubeVertices(cube.points, primitives, shapes)
        );
    }

    app.run = function() {
        var
            diagram = app.createDefaultFullScreenDiagram(),
            perspective = diagram.perspective,

            solids = createSolids(perspective);

        diagram.stage.setSolids(solids);
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));