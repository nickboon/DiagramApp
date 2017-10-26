(function(app) {
    var transformations = app.createTransformationObject(),
        rotateAboutX = transformations.rotatePointAboutX,
        rotateAboutY = transformations.rotatePointAboutY,
        cubeGeometry = app.createCubeGeometryObject(),
        tiltAngle = cubeGeometry.angleBetweenFaceDiagonalAndCubeDiagonal,
        rotateAlongEdgeAngle = -cubeGeometry.angleAtCenterBetweenVerticesSeparatedByAnEdge,
        rotateAlongFaceDiagonalAngle = -cubeGeometry.angleAtCenterBetweenVerticesSeparatedByAFaceDiagonal;

    function rotateTiltAngleAboutX(point) {
        rotateAboutX(point, tiltAngle);
    }

    function rotateMinusTiltAngleAboutX(point) {
        rotateAboutX(point, -tiltAngle);
    }

    function rotateAlongEdgeAboutX(point) {
        rotateAboutX(point, rotateAlongEdgeAngle);
    }

    function rotateAlongFaceDiagonalAboutX(point) {
        rotateAboutX(point, rotateAlongFaceDiagonalAngle);
    }

    app.createCubeTransformationsObject = function(width) {
        var points = app.createPointsObject().getCubePoints(width);

        function rotateCubeAboutY(a) {
            var angle = a || 0;

            points.forEach(function(point) {
                rotateAboutY(point, angle);
            });
        }

        function tiltCubeAboutX() {
            points.forEach(rotateTiltAngleAboutX);
        }

        function tiltBackCubeAboutX() {
            points.forEach(rotateMinusTiltAngleAboutX);
        }

        function rotateCubeAlongEdgeAboutX() {
            points.forEach(rotateAlongEdgeAboutX);
        }

        function rotateCubeAlongFaceDiagonalAboutX() {
            points.forEach(rotateAlongFaceDiagonalAboutX);
        }

        function getPoints() {
            return points;
        }

        return {
            getPoints: getPoints,
            rotateAboutY: rotateAboutY,
            rotateCubeAboutY: rotateCubeAboutY,
            rotateTiltAngleAboutX: rotateTiltAngleAboutX,
            rotateMinusTiltAngleAboutX: rotateMinusTiltAngleAboutX,
            tiltCubeAboutX: tiltCubeAboutX,
            tiltBackCubeAboutX: tiltBackCubeAboutX,
            rotateAlongEdgeAboutX: rotateAlongEdgeAboutX,
            rotateCubeAlongEdgeAboutX: rotateCubeAlongEdgeAboutX,
            rotateAlongFaceDiagonalAboutX: rotateAlongFaceDiagonalAboutX,
            rotateCubeAlongFaceDiagonalAboutX: rotateCubeAlongFaceDiagonalAboutX
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));