(function(app) {
    var transform = {};

    transform.rotatePointAboutX = function(point, angle) {
        var cosX = Math.cos(angle),
            sinX = Math.sin(angle),
            newY = point.y * cosX - point.z * sinX,
            newZ = point.z * cosX + point.y * sinX;
        point.y = newY;
        point.z = newZ;
        return point;
    }

    transform.rotatePointAboutY = function(point, angle) {
        var cosY = Math.cos(angle),
            sinY = Math.sin(angle),
            newX = point.x * cosY - point.z * sinY,
            newZ = point.z * cosY + point.x * sinY;
        point.x = newX;
        point.z = newZ;
        return point;
    }

    transform.rotatePointAboutZ = function(point, angle) {
        var cosZ = Math.cos(angle),
            sinZ = Math.sin(angle),
            newX = point.x * cosZ - point.y * sinZ,
            newY = point.y * cosZ + point.x * sinZ;
        point.x = newX;
        point.y = newY;
        return point;
    }

    app.transformations = transform;
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));