(function(app) {
    app.createHexahedron = function() {
        function createPoints(width, height, length) {
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

        function createCubePoints(width) {
            var defaultWidth = 200;

            width = width || defaultWidth;
            return createPoints(width, width, width);
        }

        function createPrimitives(points, lineColour, fillColour, alpha) {
            var primitives = app.primitives,
                createLine = primitives.createLine,
                createFill = primitives.createFill;

            return [
                createLine(points[0], points[1], lineColour, alpha),
                createLine(points[1], points[2], lineColour, alpha),
                createLine(points[2], points[3], lineColour, alpha),
                createLine(points[3], points[0], lineColour, alpha),
                createLine(points[5], points[4], lineColour, alpha),
                createLine(points[4], points[7], lineColour, alpha),
                createLine(points[7], points[6], lineColour, alpha),
                createLine(points[6], points[5], lineColour, alpha),
                createLine(points[0], points[4], lineColour, alpha),
                createLine(points[1], points[5], lineColour, alpha),
                createLine(points[2], points[6], lineColour, alpha),
                createLine(points[3], points[7], lineColour, alpha),

                // fill points are defined clockwise
                createFill([points[0], points[1], points[2], points[3]], fillColour, alpha),
                createFill([points[5], points[4], points[7], points[6]], fillColour, alpha),
                createFill([points[4], points[0], points[3], points[7]], fillColour, alpha),
                createFill([points[1], points[5], points[6], points[2]], fillColour, alpha),
                createFill([points[4], points[5], points[1], points[0]], fillColour, alpha),
                createFill([points[3], points[2], points[6], points[7]], fillColour, alpha)
            ];
        }

        function createSolid(points, lineColour, fillColour, alpha) {
            points = points || createCubePoints();

            return {
                points: points,
                primitives: createPrimitives(points, lineColour, fillColour, alpha)
            };
        }

        return {
            createPoints: createPoints,
            createSolid: createSolid
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));