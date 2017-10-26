/* This version of the transfomation object stores a tale of precalculated values
 * for a limited set of angles with their sines and consines. */

(function(app) {
    var defautNumberOfRotationalIncrements = 360,
        defautShiftIncrement = .5,
        fullCircle = Math.PI * 2;

    function createAnglesLookup(numberOfIncrements) {
        var lookup = [],
            increment = fullCircle / numberOfIncrements,
            currentAngle = 0,
            i;

        for (i = numberOfIncrements - 1; i >= 0; i -= 1) {
            lookup.push({
                angle: currentAngle,
                sin: Math.sin(currentAngle),
                cos: Math.cos(currentAngle)
            });
            currentAngle += increment;
        }

        return lookup;
    }

    app.createTransformationObject = function(si, nori) {
        var shiftIncrement = si || defautShiftIncrement,
            numberOfRotationalIncrements = nori || defautNumberOfRotationalIncrements,
            angles = createAnglesLookup(numberOfRotationalIncrements);

        function trimAngle(angle) {
            if (angle >= numberOfRotationalIncrements) {
                angle %= numberOfRotationalIncrements;
            } else if (angle <= -numberOfRotationalIncrements) {
                angle %= numberOfRotationalIncrements;
            }

            if (angle < 0) {
                angle += numberOfRotationalIncrements;
            }

            return angle;
        }

        function rotatePointAboutX(point, angle) {
            var cosX = angles[angle].cos,
                sinX = angles[angle].sin,
                newY = point.y * cosX - point.z * sinX,
                newZ = point.z * cosX + point.y * sinX;
            point.y = newY;
            point.z = newZ;
            return point;
        }

        function rotatePointAboutY(point, angle) {
            var cosY = angles[angle].cos,
                sinY = angles[angle].sin,
                newX = point.x * cosY - point.z * sinY,
                newZ = point.z * cosY + point.x * sinY;
            point.x = newX;
            point.z = newZ;
            return point;
        }

        function rotatePointAboutZ(point, angle) {
            var cosZ = angles[angle].cos,
                sinZ = angles[angle].sin,
                newX = point.x * cosZ - point.y * sinZ,
                newY = point.y * cosZ + point.x * sinZ;
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
            var speed = s || 1,
                points = [],
                angle = speed,
                angleX = 0,
                angleY = 0,
                shift = shiftIncrement * speed,
                shiftX = 0,
                shiftZ = 0;

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
                angleX = trimAngle(angleX);
                angleY = trimAngle(angleY);

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

            //~ if(speed) {
            //~ angle *= speed;
            //~ }	

            solids.forEach(addPointsToTransformer)

            return {
                transform: shiftRotate
            }
        }


        function createAutoYRotationTransformer(solids, s) {
            var points = [],
                speed = s || 1,
                angle = speed;

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
        }

        return {
            trimAngle: trimAngle,
            rotatePointAboutX: rotatePointAboutX,
            rotatePointAboutY: rotatePointAboutY,
            rotatePointAboutZ: rotatePointAboutZ,
            copyPointAndShift: copyPointAndShift,
            copyPointAndRotate: copyPointAndRotate,
            createKeyboardDrivenTransformer: createKeyboardDrivenTransformer,
            createAutoYRotationTransformer: createAutoYRotationTransformer,
            numberOfRotationalIncrements: numberOfRotationalIncrements,
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));