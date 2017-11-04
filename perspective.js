(function(app) {
    app.createPerspective = function(settings) {
        var focalLength,
            vanishingDistance,
            maxAlpha,
            vanishingPointX,
            vanishingPointY,
            perspective = {};

        perspective.getScale = function(point) {
            return focalLength / (focalLength + point.z);
        }

        perspective.getScreenX = function(point) {
            var scale = focalLength / (focalLength + point.z);
            return vanishingPointX + point.x * scale;
        }

        perspective.getScreenY = function(point) {
            var scale = focalLength / (focalLength + point.z);
            return vanishingPointY + point.y * scale;
        }

        perspective.isPointBehindViewer = function(pointZ) {
            return pointZ > -focalLength;
        }

        perspective.getAtmosphericAlpha = function(primitiveZ) {
            var range = primitiveZ + focalLength;
            return (1 - (range / vanishingDistance)) * maxAlpha;
        }

        settings = settings || {};
        focalLength = settings.focalLength || 500;
        vanishingDistance = settings.vanishingDistance || 1000;
        maxAlpha = settings.maxAlpha || 1;
        vanishingPointX = settings.vanishingPointX || window.innerWidth / 2;
        vanishingPointY = settings.vanishingPointY || window.innerHeight / 2;

        return perspective;
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));