(function(app) {
    var getNearestZFromArray = app.createPointsObject().getNearestZFromArray,
        isNotAPoint = app.createPointsObject().isNotAPoint;

    function toSolid(primitive) {
        return {
            points: primitive.points,
            primitives: [primitive]
        };
    }

    app.createPrimitivesObject = function(drawing, vectorDrawing) {
        function createLine(pointA, pointB, colour, alpha) {
            if (isNotAPoint(pointA) || isNotAPoint(pointB)) {
                throw "You need at least 2 defined vertices for a line.";
            }

            return {
                points: [pointA, pointB],

                getNearestZ: function() {
                    return Math.min(pointA.z, pointB.z);
                },

                draw: function(drawingContext, alpha) {
                    drawing.drawLine(drawingContext, pointA, pointB, colour, alpha);
                },

                getSvg: function() {
                    return vectorDrawing.line(pointA, pointB, colour, alpha);
                }
            };
        }

        function createCurve(points, colour, alpha) {
            if (isNotAPoint(points[0]) || isNotAPoint(points[1]) || isNotAPoint(points[2]) || isNotAPoint(points[3])) {
                throw "You need at least 4 defined vertices for a curve.";
            }

            return {
                points: points,

                getNearestZ: function() {
                    return Math.min(points[0].z, points[3].z);
                },

                draw: function(drawingContext, alpha) {
                    drawing.drawCurve(drawingContext, points, colour, alpha);
                },

                getSvg: function() {
                    return vectorDrawing.curve(points, colour, alpha);
                }
            };
        }

        function createFill(points, colour, alpha) {
            if (points.length < 3) {
                throw "You need pass in an array of at least 3 points to create a fill.";
            }

            return {
                points: points,

                getNearestZ: function() {
                    return getNearestZFromArray(points);
                },

                draw: function(drawingContext, alpha) {
                    drawing.drawFill(drawingContext, points, colour, alpha);
                },

                getSvg: function() {
                    return vectorDrawing.fill(points, colour, alpha);
                }
            };
        }

        if (!drawing) {
            throw 'You need to pass in a drawing object to create primitives.';
        }

        return {
            toSolid: toSolid,
            createLine: createLine,
            createCurve: createCurve,
            createFill: createFill
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));