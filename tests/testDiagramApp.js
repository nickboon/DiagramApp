/* required diagrams, points, primitives, shapes, solids, fakeSpheres transformaton*/
(function(app) {
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
                    true)
            );
            labelSolids.push(primitives.toSolid(primitive))
        }

        return labelSolids;
    }

    function createSolidsList(perspective) {
        var drawing = app.createDrawingObject(perspective),
            // test primitives
            primitives = app.createPrimitivesObject(drawing),
            line = primitives.createLine({ x: -100, y: 0, z: 0 }, { x: 100, y: 0, z: 0 }),
            curve = primitives.createCurve(
                [
                    { x: -90, y: 0, z: 0 },
                    { x: -50, y: -100, z: 0 },
                    { x: 50, y: 50, z: 0 },
                    { x: 60, y: 0, z: 0 }
                ],
                '#0000ff'
            ),
            // test solids
            solids = app.createSolidsObject(primitives),
            cube = solids.createHexahedron(),
            // test shapes
            shapes = app.createShapesObject(drawing),
            radius = 141.42135623730950488016887242097,
            circle = shapes.createCircle({ x: 0, y: 0, z: -200 }, radius),
            circularFill = shapes.createCircularFill({ x: 0, y: 0, z: -200 }, radius, '#008833', .4),
            // test fake spheres
            spheres = app.createFakeSpheresObject(perspective),

            createdSolids = [
                primitives.toSolid(line),
                primitives.toSolid(curve),
                cube,
                primitives.toSolid(circle),
                primitives.toSolid(circularFill),
                spheres.create({ x: 0, y: 0, z: 0 }, radius)
            ];

        return createdSolids.concat(
            createLabelsForCubeVertices(cube.points, primitives, shapes)
        );
    }

    app.run = function() {
        var
            diagram = app.createDefaultFullScreenDiagram(),
            perspective = diagram.perspective,
            solidsList = createSolidsList(perspective),
            transformation = app.createTransformationObject(),
            autoTransformer = transformation.createAutoYRotationTransformer(solidsList),
            inputTranformer = transformation.createKeyboardDrivenTransformer(solidsList);

        diagram.stage.setSolids(solidsList);
        diagram.stage.setTransformers([autoTransformer, inputTranformer]);
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));