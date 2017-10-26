(function(app) {
    app.run = function() {
        function unitTests(perspective) {
            var sut = perspective,
                test = app.createTestObject(
                    'Given a persectiveObject, set atmophericPerspetive and test return values for the getAtmosphericAlpha method',
                    sut.getAtmosphericAlpha
                ),
                vanishingDistance = 10000,
                maxAlpha = .6,
                focalLength = 500;

            sut.setAtmosphericPerspective(10000, 0.6);
            test.note("With vanishingDistance " + vanishingDistance +
                " and maxAlpha " + maxAlpha + ":");
            test.assertInputExpectedOutput([vanishingDistance], 0);
            test.assertInputExpectedOutput([-focalLength], maxAlpha);
        }

        var diagram = app.createFullScreenDiagramWithAtmosphericPerspective(),
            perspective = diagram.perspective,
            drawing = app.createDrawingObject(perspective),
            primitives = app.createPrimitivesObject(drawing),
            solids = app.createSolidsObject(primitives),
            cube = solids.createHexahedron(),
            transformation = app.createTransformationObject(),
            inputTranformer = transformation.createKeyboardDrivenTransformer([cube]);

        diagram.stage.setSolids([cube]);
        diagram.stage.setTransformers([inputTranformer]);
        unitTests(perspective);
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));