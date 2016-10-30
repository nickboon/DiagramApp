(function (app) {
	// config
	var defaultDisplayDivId = 'test_results';

	function getRandomNumberBetween(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}	
	
	function createNumberFixture() {
		return getRandomNumberBetween(-100, 100);			
	}
		
	function createPointFixture() {
		return {
			x: createNumberFixture(),
			y: createNumberFixture(),
			z: createNumberFixture()
		}
	}	
		

	// create and return API for this module
	app.createTestObject = function (definition, sut, displayDivId) {
		var allResultsDiv = document.getElementById(displayDivId || defaultDisplayDivId),
			testResultsDiv = document.createElement('div');
	
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
			var resultText;
			
			if (!setupText) {
				setupText = "";
			}
			
			displayTestResult(
				resultText = setupText
					+ " expected: " + expected 
					+ ". actual: " + actual,
				(expected === actual)
			);
		}	
		
		function assertGreaterThan(setupText, expectedLarger,  expectedSmaller) {
			var passed = (expectedLarger > expectedSmaller),
				resultText,
				assertionText = passed ? ' > ' : ' is not > ';
			
			if (!setupText) {
				setupText = "";
			}

			displayTestResult(
				resultText = setupText
					+ expectedLarger
					+ assertionText
					+ expectedSmaller,
				passed
			);
		}	
		
		function getFunctionName(f) {
			var name = f.toString();

			name = name.substr('function '.length);
			name = name.substr(0, name.indexOf('('));
			return name;
		}
		
		/* if the provided sut is a method check expected output from a given input */
		function assertInputExpectedOutput(input, expected) {
			if(typeof sut != "function") {
				throw "The provided sut is not a function";
			}
			
			assertEqual(
				getFunctionName(sut) + '(' + input + '); ', expected, sut.apply(null, input)
			);
		}
	
		function displayDefinition(definitionText) {
			var definitionH2 = document.createElement('h2'),
				definitionTextNode = document.createTextNode(definitionText);
			
			definitionH2.appendChild(definitionTextNode);
			testResultsDiv.appendChild(definitionH2);
		}	
		
		if (definition) {
			displayDefinition(definition);			
		}

		allResultsDiv.append(testResultsDiv);
		
		return {
			assertEqual: assertEqual,
			assertGreaterThan: assertGreaterThan,
			assertInputExpectedOutput: assertInputExpectedOutput,
			createNumberFixture: createNumberFixture,
			createPointFixture: createPointFixture
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
