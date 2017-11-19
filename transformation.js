(function(app) {
    var rotationalIncrement = Math.PI / 180,
        transform = {};

    transform.setRotationalIncrement = function(numberOfIncrements) {
        rotationalIncrement = Math.PI * 2 / numberOfIncrements;
    }

    transform.rotatePointAboutX = function(point, numberOfIncrements) {
        var angle = rotationalIncrement * numberOfIncrements,
            cosX = Math.cos(angle),
            sinX = Math.sin(angle),
            newY = point.y * cosX - point.z * sinX,
            newZ = point.z * cosX + point.y * sinX;
        point.y = newY;
        point.z = newZ;
        return point;
    }

    transform.rotatePointAboutY = function(point, numberOfIncrements) {
        var angle = rotationalIncrement * numberOfIncrements,
            cosY = Math.cos(angle),
            sinY = Math.sin(angle),
            newX = point.x * cosY - point.z * sinY,
            newZ = point.z * cosY + point.x * sinY;
        point.x = newX;
        point.z = newZ;
        return point;
    }

    transform.rotatePointAboutZ = function(point, numberOfIncrements) {
        var angle = rotationalIncrement * numberOfIncrements,
            cosZ = Math.cos(angle),
            sinZ = Math.sin(angle),
            newX = point.x * cosZ - point.y * sinZ,
            newY = point.y * cosZ + point.x * sinZ;
        point.x = newX;
        point.y = newY;
        return point;
    }

    app.transformations = transform;
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));