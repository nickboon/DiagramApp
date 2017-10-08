/* requires test, diagrams, points, primitives, shapes, solids, cubeTransformations */
(function(app) {
    function trimAngleUnitTests() {
        var test = app.createTestObject(
            'Given a transformationObject with numberOfRotationalIncrements 5, test return values for the trimAngle method.',
            app.createTransformationObject(null, 5).trimAngle
        );

        test.assertInputExpectedOutput([8], 3);
        test.assertInputExpectedOutput([-2], 3);
        test.assertInputExpectedOutput([-21], 4);
        test.assertInputExpectedOutput([-20], 0);
        test.assertInputExpectedOutput([0], 0);
        test.assertInputExpectedOutput([5], 0);
    }

    function createLabelsForCubeVertices(points, primitives, shapes) {
        var labelSolids = [],
            i,
            copyOf = app.createPointsObject().copyOf;

        for (i = points.length - 1; i >= 0; i -= 1) {
            primitive = (
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
            cube = solids.createHexahedron();

        return [cube].concat(
            createLabelsForCubeVertices(cube.points, primitives, shapes)
        );
    }

    app.run = function() {
        var diagram = app.createDefaultFullScreenDiagram(),
            stage = diagram.stage,
            perspective = diagram.perspective,
            solids = createSolids(perspective),
            transformation = app.createTransformationObject(),
            transformer = transformation.createKeyboardDrivenTransformer(solids);

        trimAngleUnitTests();

        solids[0].points.forEach(function(point) {
            transformation.rotatePointAboutY(point, 45);
        });

        stage.setSolids(solids);
        stage.setTransformers([transformer]);
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));