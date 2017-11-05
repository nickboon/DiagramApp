(function(app) {
    function rotatePointAboutX(point, angle) {
        var cosX = Math.cos(angle),
            sinX = Math.sin(angle),
            newY = point.y * cosX - point.z * sinX,
            newZ = point.z * cosX + point.y * sinX;
        point.y = newY;
        point.z = newZ;
        return point;
    }

    function rotatePointAboutY(point, angle) {
        var cosY = Math.cos(angle),
            sinY = Math.sin(angle),
            newX = point.x * cosY - point.z * sinY,
            newZ = point.z * cosY + point.x * sinY;
        point.x = newX;
        point.z = newZ;
        return point;
    }

    function rotatePointAboutZ(point, angle) {
        var cosZ = Math.cos(angle),
            sinZ = Math.sin(angle),
            newX = point.x * cosZ - point.y * sinZ,
            newY = point.y * cosZ + point.x * sinZ;
        point.x = newX;
        point.y = newY;
        return point;
    }

    app.createTransformationObject = function() {
        return {
            rotatePointAboutX: rotatePointAboutX,
            rotatePointAboutY: rotatePointAboutY,
            rotatePointAboutZ: rotatePointAboutZ
        };
    }

    app.createInputTransformer = function(solids, numberOfIncrements, shiftMagnitude) {
        var angle = 0,
            angleX = 0,
            angleY = 0,
            shift = 0,
            shiftX = 0,
            shiftZ = 0,
            points = [],
            transformer = {};

        function addPointsToTransformer(solid) {
            points = points.concat(solid.points);
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
        shift = shiftMagnitude || .5
        solids.forEach(addPointsToTransformer)

        return transformer;
    }

    app.createAutoRotationTransformer = function(solids, axis, numberOfIncrements) {
        var incrementAngle = 0,
            points = [],
            transformer = {};

        function setPoints(solids) {
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

        setPoints(solids);

        return transformer;
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));