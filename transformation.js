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


    app.createAutoRotationTransformer = function(solids, axis, numberOfIncrements) {
        var incrementAngle = 0,
            points = [];


        function transform() {
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

        function setPoints(solids) {
            solids.forEach(function(solid) {
                points = points.concat(solid.points);
            });
        }

        solids = solids || [];
        axis = axis || 'y';
        numberOfIncrements = numberOfIncrements || 360;
        incrementAngle = Math.PI * 2 / numberOfIncrements;

        setPoints(solids);

        return {
            setPoints: setPoints,
            transform: transform
        };
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));