(function(app) {
    app.createAutoRotationTransformer = function(solids, axis, isClockwise, numberOfIncrements) {
        var transformations = app.transformations,
            rotatePointAboutX = transformations.rotatePointAboutX,
            rotatePointAboutY = transformations.rotatePointAboutY,
            rotatePointAboutZ = transformations.rotatePointAboutZ,
            points = [],
            transformer = {};

        function setPoints() {
            solids.forEach(function(solid) {
                points = points.concat(solid.points);
            });
        }

        transformer.transform = function() {
            points.forEach(function(point) {
                if (axis === 'y') {
                    rotatePointAboutY(point, numberOfIncrements);
                } else if (axis === 'x') {
                    rotatePointAboutX(point, numberOfIncrements);
                } else {
                    rotatePointAboutZ(point, numberOfIncrements)
                }
            });
        }

        solids = solids || [];
        axis = axis || 'y';
        numberOfIncrements = numberOfIncrements || 1;
        if (isClockwise) {
            numberOfIncrements = -numberOfIncrements;
        }

        setPoints();

        return transformer;
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));