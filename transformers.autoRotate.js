(function(app) {
    app.createAutoRotationTransformer = function(solids, axis, isClockwise, numberOfIncrements) {
        var transformations = app.transformations,
            rotatePointAboutX = transformations.rotatePointAboutX,
            rotatePointAboutY = transformations.rotatePointAboutY,
            rotatePointAboutZ = transformations.rotatePointAboutZ,
            incrementAngle = 0,
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
                    rotatePointAboutY(point, incrementAngle);
                } else if (axis === 'x') {
                    rotatePointAboutX(point, incrementAngle);
                } else {
                    rotatePointAboutZ(point, incrementAngle)
                }
            });
        }

        solids = solids || [];
        axis = axis || 'y';
        numberOfIncrements = numberOfIncrements || 360;
        incrementAngle = Math.PI * 2 / numberOfIncrements;
        if (isClockwise) {
            incrementAngle = -incrementAngle;
        }

        setPoints();

        return transformer;
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));