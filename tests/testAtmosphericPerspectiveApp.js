(function(app) {
    app.run = function() {
        var perspectiveSettings = {
                vanishingDistance: 10000,
                maxAlpha: .6,
                focalLength: 500
            },
            stageSettings = {
                useAtmosphericPerspective: true,
                perspective: perspectiveSettings
            },
            stage = app.createStage(stageSettings),
            cube = app.createHexahedron().createSolid(),
            inputTranformer = app.createInputTransformer([cube]),
            perspective = app.createPerspective(perspectiveSettings);

        function unitTests(perspective) {
            var sut = perspective,
                test = app.createTestObject(
                    'Given a persectiveObject with known settings, test return values for the getAtmosphericAlpha method',
                    sut.getAtmosphericAlpha
                );

            test.note("With vanishingDistance " + perspectiveSettings.vanishingDistance +
                " and maxAlpha " + perspectiveSettings.maxAlpha +
                " and focalLength " + perspectiveSettings.focalLength + ":");
            test.assertInputExpectedOutput([perspectiveSettings.vanishingDistance], 0);
            test.assertInputExpectedOutput([-perspectiveSettings.focalLength], perspectiveSettings.maxAlpha);
        }

        stage.setSolids([cube]);
        stage.setTransformers([inputTranformer]);
        unitTests(perspective);
        app.createUiObject().setDefaultTransformationKeyListeners(inputTranformer);

    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));