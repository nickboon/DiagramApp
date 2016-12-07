(function (app) {				
	function unitTests() {
		var	colours = app.createColourObject(),
			test = app.createTestObject(
				'Given a coloursObject test return values for the toRgb method',
				colours.toRgb,
				'colour_results'
			);
			
		test.note('Opacity over 1 should be	set to one and rgb is used instead of rbga:')	
		test.assertInputExpectedOutput(['#0000FF', 2], 'rgb(0,0,255)');			

		test.note('Opacity under 0 should be set to none:')	
		test.assertInputExpectedOutput(['#0000FF', -2], 'rgba(0,0,255,0)');			

		test.note('Opacity and colour should be set to default if no arguments passed:')	
		test.assertInputExpectedOutput([], colours.toRgb(colours.defaultColour));			

	}
	
	app.runColourTests = function () {							
		unitTests();
	}
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
