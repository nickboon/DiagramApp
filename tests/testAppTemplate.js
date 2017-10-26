(function(app) {
    function unitTests() {
        var //sut = app.createFooObject(),
            test = app.createTestObject(
            //'Given a fooObject test return values for the bar method' ,
            //sut.bar,
            //foo_test_div_id
        );

        test.note('... should happen when you run bar with the following:')
            //test.assertInputExpectedOutput([arg1,arg2...], expected);			
            //...			
    }

    app.run = function() {
        unitTests();
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));