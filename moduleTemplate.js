(function(app) {
    app.createObject = function() {

        //if (!foo) {
        //throw 'You need to pass in a foo object to create a bar.';
        //}

        return {
            name: 'emptyModule'
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));