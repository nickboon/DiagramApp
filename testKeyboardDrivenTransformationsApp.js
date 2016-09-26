/* required diagrams, points, primitives, shapes, solids, cubeTransformations */
(function (app) {
	var testResultsDiv;
				
	function functionName(fun) {
	  var name = fun.toString();

	  name = name.substr('function '.length);
	  name = name.substr(0, name.indexOf('('));
	  return name;
	}
			
	function getTestResultClass(isPassed) {
		return isPassed ? 'passed': 'failed';
	}	
		
	function displayTestResult(resultText, isPassed) {
		var resultDiv = document.createElement('div'),
			resultTextNode = document.createTextNode(resultText);

		resultDiv.setAttribute('class', getTestResultClass(isPassed));
		resultDiv.appendChild(resultTextNode);
		testResultsDiv.appendChild(resultDiv);
	}	
		
	function assertEqual(setupText, expected, actual) {
		var	isPassed = (expected === actual),
			resultText = setupText
				+ ", expected: " + expected 
				+ " actual: " + actual;
		
			displayTestResult(resultText, isPassed)					
	}	
		
	function createTransformationObject_trimAngle() {
		var	input,
			expected,
			actual,
			numberOfRotationalIncrements = 5,
			transformation = app.createTransformationObject(
				null, numberOfRotationalIncrements
			),			
			sut = transformation.trimAngle;
			
		// test
		input = 8
		actual = sut(input);
		
		//assert
		expected =  3;
		assertEqual(
			functionName(sut) + ": Given an input of " + input, expected, actual
		);			
	}
	
	function runUnitTests() {
		createTransformationObject_trimAngle();
		
	}
	
			
	function createLabelsForCubeVertices(points, primitives, shapes) {
		var labelSolids = [],
		i,
		copy = app.createPointsObject().copy;
			
		for (i = points.length - 1; i >= 0; i -= 1)
		{
			primitive = (
				shapes.createLabel('vertex no.' + i, 
					copy(points[i]),
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
	
	app.run = function () {
		var 
			diagram = app.createDefaultFullScreenDiagram(),
			stage = diagram.stage,
			perspective = diagram.perspective, 			
			solids = createSolids(perspective),
			transformation = app.createTransformationObject(),
			transformer = transformation.createKeyboardDrivenTransformer(solids);
				
				solids[0].points.forEach(function (point) {					
					transformation.rotatePointAboutY(point, 45);					
				}); 
			

		// unit tests
		testResultsDiv = document.getElementById('test_results');
		runUnitTests();

		// acceptance tests
		stage.setSolids(solids);
		stage.setTransformers([transformer]);
	}
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));

