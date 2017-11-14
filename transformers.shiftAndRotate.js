(function(app) {
    app.createInputTransformer = function(solids, numberOfIncrements, shiftMagnitude) {
        var transformations = app.transformations,
            rotatePointAboutX = transformations.rotatePointAboutX,
            rotatePointAboutY = transformations.rotatePointAboutY,
            angle = 0,
            angleX = 0,
            angleY = 0,
            shift = 0,
            shiftX = 0,
            shiftZ = 0,
            points = [],
            transformer = {};

        function setPoints() {
            solids.forEach(function(solid) {
                points = points.concat(solid.points);
            });
        }

        transformer.transform = function() {
            points.forEach(function(point) {
                rotatePointAboutX(point, angleX);
                rotatePointAboutY(point, angleY);
                point.x += shiftX;
                point.z += shiftZ;
            });
        }

        transformer.shiftX = function() {
            shiftX += shift;
        }

        transformer.shiftMinusX = function() {
            shiftX -= shift;
        }

        transformer.shiftZ = function() {
            shiftZ += shift;
        }

        transformer.shiftMinusZ = function() {
            shiftZ -= shift;
        }

        transformer.rotateXCW = function() {
            angleX += angle;
        }

        transformer.rotateXCCW = function() {
            angleX -= angle;
        }

        transformer.rotateYCW = function() {
            angleY += angle;
        }

        transformer.rotateYCCW = function() {
            angleY -= angle;
        }

        transformer.cease = function() {
            angleX = angleY = 0;
            shiftZ = shiftX = 0;
        }

        solids = solids || [];
        numberOfIncrements = numberOfIncrements || 360;
        angle = Math.PI * 2 / numberOfIncrements;
        shift = shiftMagnitude || .5;

        setPoints();

        return transformer;
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));