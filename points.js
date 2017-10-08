(function(app) {
    function newPoint() {
        return { x: 0, y: 0, z: 0 };
    }

    function copyOf(point) {
        return { x: point.x, y: point.y, z: point.z };
    }

    function shiftTo(point, target) {
        point.x = target.x;
        point.y = target.y;
        point.z = target.z;
    }

    function shiftBy(points, vector) {
        points.forEach(function(point) {
            point.x += vector.x;
            point.y += vector.y;
            point.z += vector.z;
        });
    }

    function getNearestZFromArray(points) {
        var numbers = points.map(function(point) {
            return point.z;
        });

        return Math.min.apply(null, numbers);
    }

    function getHexahedronPoints(width, height, length) {
        var halfWidth = width / 2,
            halfHeight = height / 2,
            halfLength = length / 2;

        if (!width || !height || !length) {
            throw 'You must pass in a width, height and length to get hexahedrons points.'
        }
        return [
            { x: -halfWidth, y: -halfHeight, z: -halfLength }, // 0 left top front
            { x: halfWidth, y: -halfHeight, z: -halfLength }, // 1 right top front
            { x: halfWidth, y: halfHeight, z: -halfLength }, // 2 right bottom front 
            { x: -halfWidth, y: halfHeight, z: -halfLength }, // 3 left bottom front
            { x: -halfWidth, y: -halfHeight, z: halfLength }, // 4 left top back
            { x: halfWidth, y: -halfHeight, z: halfLength }, // 5 right top back
            { x: halfWidth, y: halfHeight, z: halfLength }, // 6 right bottom back
            { x: -halfWidth, y: halfHeight, z: halfLength } // 7 left bottom back				
        ];
    }

    function getCubePoints(width) {
        if (!width) {
            throw 'You must pass in a width to get cube points.'
        }
        return getHexahedronPoints(width, width, width);
    }

    function getPrismPoints(height, numberOfSides, radius) {
        var topPoints = [],
            basePoints = [],
            halfHeight = height / 2,
            angle = Math.PI * 2 / numberOfSides,
            currentAngle,
            i = numberOfSides - 1,
            x,
            y;

        for (; i >= 0; i -= 1) {
            currentAngle = angle * i;
            x = Math.sin(currentAngle) * radius;
            z = Math.cos(currentAngle) * radius;

            topPoints.push(create(x, -halfHeight, z));
            basePoints.push(create(x, halfHeight, z));
        }

        return {
            topPoints: topPoints,
            basePoints: basePoints
        }
    }

    function reflectPointAcrossZero(point, axis) {
        var pointX = (axis === 'x') ? -point.x : point.x,
            pointY = (axis === 'y') ? -point.y : point.y,
            pointZ = (axis === 'z') ? -point.z : point.z;
        return { x: pointX, y: pointY, z: pointZ };
    }

    function reflectPointsAcrossZero(points, axis) {
        var reflection = [];
        points.forEach(function(point) {
            reflection.push(reflectPointAcrossZero(point, axis));
        });
        return reflection;
    }

    function createAxis(pointA, pointB) {
        var vector3d = app.createVector3dObject(),
            distance = vector3d.subtract(pointB, pointA),
            inclination = {
                x: Math.atan(distance.z / distance.y) || 0,
                y: Math.atan(distance.y / distance.z) || 0,
                z: Math.atan(distance.x / distance.y) || 0
            },
            align = function(points, initialInclination) {
                var transform = app.createTransformationObject(),
                    rotateX = transform.rotatePointAboutX,
                    rotateY = transform.rotatePointAboutY,
                    rotateZ = transform.rotatePointAboutZ,
                    difference = vector3d.subtract(initialInclination, inclination);

                points.forEach(function(point) {
                    rotateX(point, difference.x);
                    rotateY(point, difference.y);
                    rotateZ(point, difference.z);
                });
            },
            distribute = function(points) {
                var distancePerPoint = vector3d.divide(distance, points.length - 1);

                points.forEach(function(point) {
                    point.x += distance.x;
                    point.y += distance.y;
                    point.z += distance.z;
                    distance = vector3d.subtract(distance, distancePerPoint);
                });
            };

        return {
            align: align,
            distribute: distribute
        };
    }

    // create and return API for this module	
    app.createPointsObject = function() {
        return {
            newPoint: newPoint,
            copyOf: copyOf,
            shiftTo: shiftTo,
            shiftBy: shiftBy,
            getNearestZFromArray,
            getNearestZFromArray,
            getHexahedronPoints: getHexahedronPoints,
            getCubePoints: getCubePoints,
            getPrismPoints: getPrismPoints,
            reflectPointsAcrossZero: reflectPointsAcrossZero,
            createAxis: createAxis
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));