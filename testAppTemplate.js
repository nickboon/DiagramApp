/* requires test */
(function (app) {				
	function unitTests() {
		var	test = app.createTestObject(
				'Given...',
				//app.createSut().functionToTest
			);
			
		//test.assertInputExpectedOutput(x, y);			
		//...			
	}
	
	app.run = function () {
		var diagram = app.createDefaultFullScreenDiagram(),
			stage = diagram.stage,
			perspective = diagram.perspective, 			
			solids = createSolids(perspective),
			transformation = app.createTransformationObject(),
			transformer = transformation.createKeyboardDrivenTransformer(solids);
							
		unitTests();
	}
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));

