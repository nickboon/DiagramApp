(function (app) {
	// config
	var defaultDisplayDivId = 'test_results';
	
	// create and return API for this module
	app.createTestObject = function (definition, sut, displayDivId) {
		var testResultsDiv = document.getElementById(displayDivId || defaultDisplayDivId);			
	
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
			displayTestResult(
				resultText = setupText
					+ " expected: " + expected 
					+ " actual: " + actual,
				(expected === actual)
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
			assertEqual(
				getFunctionName(sut) + '(' + input + '); ', expected, sut(input)
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
		
		return {
			assertEqual: assertEqual,
			assertInputExpectedOutput: assertInputExpectedOutput
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
