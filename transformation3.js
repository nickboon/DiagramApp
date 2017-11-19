(function(app) {
    var numberOfIncrements = 360,
        angleLookup = [],
        transform = {};

    function buildAngleLookup() {
        var increment = Math.PI * 2 / numberOfIncrements,
            currentAngle = 0,
            i;

        angleLookup.length = 0;

        for (i = numberOfIncrements - 1; i >= 0; i -= 1) {
            angleLookup.push({
                angle: currentAngle,
                sin: Math.sin(currentAngle),
                cos: Math.cos(currentAngle)
            });
            currentAngle += increment;
        }
    }

    transform.setNumberOfIncrements = function(number) {
        numberOfIncrements = number;
        buildAngleLookup();
    }

    transform.rotatePointAboutX = function(point, numberOfIncrements) {
        var cosX = angleLookup[numberOfIncrements].cos,
            sinX = angleLookup[numberOfIncrements].sin,
            newY = point.y * cosX - point.z * sinX,
            newZ = point.z * cosX + point.y * sinX;
        point.y = newY;
        point.z = newZ;
        return point;
    }

    transform.rotatePointAboutY = function(point, numberOfIncrements) {
        var cosY = angleLookup[numberOfIncrements].cos,
            sinY = angleLookup[numberOfIncrements].sin,
            newX = point.x * cosY - point.z * sinY,
            newZ = point.z * cosY + point.x * sinY;
        point.x = newX;
        point.z = newZ;
        return point;
    }

    transform.rotatePointAboutZ = function(point, numberOfIncrements) {
        var cosZ = angleLookup[numberOfIncrements].cos,
            sinZ = angleLookup[numberOfIncrements].sin,
            newX = point.x * cosZ - point.y * sinZ,
            newY = point.y * cosZ + point.x * sinZ;
        point.x = newX;
        point.y = newY;
        return point;
    }


    buildAngleLookup();

    app.transformations = transform;
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));