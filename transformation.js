(function(app) {
    var numberOfDegrees = 360,
        incrementAngle = Math.PI * 2 / numberOfDegrees,
        defaultShift = .5;

    function rotatePointAboutX(point, angle) {
        var cosX = Math.cos(angle),
            sinX = Math.sin(angle),
            newY = point.y * cosX - point.z * sinX,
            newZ = point.z * cosX + point.y * sinX;
        point.y = newY;
        point.z = newZ;
        return point;
    };

    function rotatePointAboutXAtPivot(point, angle, pivot) {
        var cosX = Math.cos(angle),
            sinX = Math.sin(angle),
            newY = cosX * (point.y - pivot.y) - sinX * (point.z - pivot.z) + pivot.y,
            newZ = cosX * (point.z - pivot.z) + sinX * (point.y - pivot.y) + pivot.z;
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
    };

    function rotatePointAboutYAtPivot(point, angle, pivot) {
        var cosY = Math.cos(angle),
            sinY = Math.sin(angle),
            newX = cosY * (point.x - pivot.x) - sinY * (point.z - pivot.z) + pivot.x,
            newZ = cosY * (point.z - pivot.z) + sinY * (point.x - pivot.x) + pivot.z;
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
    };

    function rotatePointAboutZAtPivot(point, angle, pivot) {
        var cosZ = Math.cos(angle),
            sinZ = Math.sin(angle),
            newX = cosZ * (point.x - pivot.x) - sinZ * (point.y - pivot.y) + pivot.x,
            newY = sinZ * (point.x - pivot.x) + cosZ * (point.y - pivot.y) + pivot.y;
        point.x = newX;
        point.y = newY;
        return point;
    }

    function copyPointAndShift(point, axis, distance) {
        return axis === 'x' ? { x: point.x + distance, y: point.y, z: point.z } :
            axis === 'y' ? { x: point.x, y: point.y + distance, z: point.z } : { x: point.x, y: point.y, z: point.z + distance };
    }

    function copyPointAndRotate(point, axis, angle) {
        var newPoint = { x: point.x, y: point.y, z: point.z };

        return axis === 'x' ? rotatePointAboutX(newPoint, angle) :
            axis === 'y' ? rotatePointAboutY(newPoint, angle) :
            rotatePointAboutZ(newPoint, angle)
    }

    function createKeyboardDrivenTransformer(solids, s) {
        var speed = s || 1;
        points = [],
            angle = incrementAngle * speed;
        angleX = 0,
            angleY = 0,
            shift = defaultShift * speed,
            shiftX = 0,
            shiftZ = 0,

            (function addKeyboardListener() {
                window.addEventListener('keydown', function(event) {
                    switch (event.keyCode) {
                        case 32: //SPACE
                            event.preventDefault();
                            break;
                        case 37: //LEFT
                            event.preventDefault();
                            if (event.keyCode === 37 && event.shiftKey) {
                                shiftX -= shift;
                            } else {
                                angleY -= angle;
                            }
                            break;
                        case 38: //UP
                            event.preventDefault();
                            if (event.keyCode === 38 && event.shiftKey) {
                                shiftZ -= shift;
                            } else {
                                angleX += angle;
                            }
                            break;
                        case 39: //RIGHT
                            event.preventDefault();
                            if (event.keyCode === 39 && event.shiftKey) {
                                shiftX += shift;
                            } else {
                                angleY += angle;
                            }
                            break;
                        case 40: //DOWN
                            event.preventDefault();
                            if (event.keyCode === 40 && event.shiftKey) {
                                shiftZ += shift;
                            } else {
                                angleX -= angle;
                            }
                            break;
                        case 113: //F2
                            graphic_objects_3d.printSVG(thisStage);
                            break;
                        case 112: //F1 HELP PAGE
                            window.alert(
                                '1. Arrow keys rotate model about the X and Y axis.\n' +
                                '2. SHIFT + UP and SHIFT + DOWN shift model along Z axis.\n' +
                                '3. SHIFT + LEFT and SHIFT + RIGHT shift model along X axis.\n'
                            );
                            break;
                    }
                }, false);
                window.addEventListener('keyup', function(event) {
                    switch (event.keyCode) {
                        case 38: //up
                        case 40: //down
                        case 37: //left
                        case 39: //right
                            angleX = angleY = 0;
                            shiftZ = shiftX = 0;
                            break;
                    }
                }, false);
            })();

        function shiftRotatePoint(point) {
            rotatePointAboutX(point, angleX);
            rotatePointAboutY(point, angleY);
            point.x += shiftX;
            point.z += shiftZ;
        }

        function shiftRotate() {
            points.forEach(shiftRotatePoint);
        }

        function addPointsToTransformer(solid) {
            points = points.concat(solid.points);
        }

        if (solids === 'undefined') {
            throw "You must an array of solids to be transformed when creating a transformer";
        }

        if (speed) {
            angle *= speed;
        }

        solids.forEach(addPointsToTransformer)

        return {
            transform: shiftRotate
        }
    }


    function createAutoYRotationTransformer(solids) {
        var points = [],
            angle = incrementAngle;

        function autoRotate(point) {
            rotatePointAboutY(point, angle);
        }

        function transform() {
            points.forEach(autoRotate);
        }

        function addPointsToTransformer(solid) {
            points = points.concat(solid.points);
        }

        if (solids === 'undefined') {
            throw "You must an array of solids to be transformed when creating a transformer";
        }

        solids.forEach(addPointsToTransformer);

        return {
            transform: transform
        };
    };

    function createAutoRotationAbout(axis, solids) {
        var points = [];

        function transform() {
            points.forEach(function(point) {
                if (axis == 'y') {
                    rotatePointAboutY(point, incrementAngle);
                } else if (axis == 'x') {
                    rotatePointAboutX(point, incrementAngle);
                } else {
                    rotatePointAboutZ(point, incrementAngle)
                }
            });
        }

        if (solids === 'undefined') {
            throw "You must supply an array of solids to be transformed when creating a transformer";
        }

        if (axis === 'undefined') {
            throw "You must supply an axis an array of solids to be transformed when creating a transformer";
        }

        axis = axis.toLowerCase();

        solids.forEach(function(solid) {
            points = points.concat(solid.points);
        });

        return {
            transform: transform
        };
    };





    // create and return API for this module
    app.createTransformationObject = function() {
        return {
            rotatePointAboutX: rotatePointAboutX,
            rotatePointAboutY: rotatePointAboutY,
            rotatePointAboutZ: rotatePointAboutZ,
            rotatePointAboutXAtPivot: rotatePointAboutXAtPivot,
            rotatePointAboutYAtPivot: rotatePointAboutYAtPivot,
            rotatePointAboutZAtPivot: rotatePointAboutZAtPivot,
            copyPointAndShift: copyPointAndShift,
            copyPointAndRotate: copyPointAndRotate,
            createKeyboardDrivenTransformer: createKeyboardDrivenTransformer,
            createAutoYRotationTransformer: createAutoYRotationTransformer,
            createAutoRotationAbout: createAutoRotationAbout,
            incrementAngle: incrementAngle
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));