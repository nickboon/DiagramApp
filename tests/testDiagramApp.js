(function(app) {
    function createLabelsForCubeVertices(points, primitives) {
        var copyOf = app.createPointsObject().copyOf,
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

    function createSolidsList() {
        var primitives = app.primitives,
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
            cube = app.createHexahedron().createSolid(),
            radius = 141.42135623730950488016887242097,
            circle = primitives.createCircle({ x: 0, y: 0, z: -200 }, radius),
            circularFill = primitives.createCircularFill({ x: 0, y: 0, z: -200 }, radius, '#008833', .4),
            spheres = app.createFakeSpheresObject(),

            createdSolids = [
                primitives.toSolid(line),
                primitives.toSolid(curve),
                cube,
                primitives.toSolid(circle),
                primitives.toSolid(circularFill),
                spheres.create({ x: 0, y: 0, z: 0 }, radius)
            ];

        return createdSolids.concat(
            createLabelsForCubeVertices(cube.points, primitives)
        );
    }

    app.run = function() {
        var solidsList = createSolidsList(),
            autoTransformer = app.createAutoRotationTransformer(solidsList, 'y'),
            inputTranformer = app.createInputTransformer(solidsList),
            stage = app.createStage();

        stage.setSolids(solidsList);
        stage.setTransformers([autoTransformer, inputTranformer]);
        app.createUiObject().setDefaultTransformationKeyListeners(inputTranformer);
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));