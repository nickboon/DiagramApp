(function(app) {
    var getNearestZFromArray = app.createPointsObject().getNearestZFromArray,
        isNotAPoint = app.createPointsObject().isNotAPoint,
        draw = app.draw(),
        print = typeof app.print === 'function' ? app.print() : undefined;

    app.primitives = {};

    app.primitives.createLine = function(pointA, pointB, colour) {
        if (isNotAPoint(pointA) || isNotAPoint(pointB)) {
            throw "You need at least 2 defined vertices for a line.";
        }

        return {
            points: [pointA, pointB],

            getNearestZ: function() {
                return Math.min(pointA.z, pointB.z);
            },

            draw: function(context, perspective, alpha) {
                draw.line(context, perspective, pointA, pointB, colour, alpha);
            },

            print: function(perspective, alpha) {
                return print.line(perspective, pointA, pointB, colour, alpha);
            }
        };
    };

    app.primitives.createCurve = function(points, colour) {
        if (isNotAPoint(points[0]) || isNotAPoint(points[1]) || isNotAPoint(points[2]) || isNotAPoint(points[3])) {
            throw "You need at least 4 defined vertices for a curve.";
        }

        return {
            points: points,

            getNearestZ: function() {
                return Math.min(points[0].z, points[3].z);
            },

            draw: function(context, perspective, alpha) {
                draw.curve(context, perspective, points, colour, alpha);
            },

            print: function(perspective, alpha) {
                return print.curve(perspective, points, colour, alpha);
            }
        };
    };

    app.primitives.createCircle = function(point, radius, colour) {
        return {
            points: [point],

            getNearestZ: function() {
                return point.z;
            },

            draw: function(context, perspective, alpha) {
                draw.circle(context, perspective, point, radius, colour, alpha);
            },

            print: function(perspective, alpha) {
                return print.circle(perspective, point, radius, colour, alpha);
            }
        };
    };

    app.primitives.createFill = function(points, colour) {
        if (!points || points.length < 3) {
            throw "You need pass in an array of at least 3 points to create a fill.";
        }

        return {
            points: points,

            getNearestZ: function() {
                return getNearestZFromArray(points);
            },

            draw: function(context, perspective, alpha) {
                draw.fill(context, perspective, points, colour, alpha);
            },

            print: function(perspective, alpha) {
                return print.fill(perspective, points, colour, alpha);
            }
        };
    };

    app.primitives.createCircularFill = function(point, radius, colour) {
        return {
            points: [point],

            getNearestZ: function() {
                return point.z;
            },

            draw: function(context, perspective, alpha) {
                draw.circularFill(context, perspective, point, radius, colour, alpha);
            },

            print: function(perspective, alpha) {
                return print.circularFill(perspective, point, radius, colour, alpha);
            }
        };
    };

    app.primitives.createLabel = function(text, point, colour, alpha, font, isScaled) {
        point = point || { x: 0, y: 0, z: 0 };

        return {
            points: [point],

            getNearestZ: function() {
                return point.z;
            },

            draw: function(context, perspective, alpha) {
                draw.label(context, perspective, text, point, colour, alpha, font, isScaled);
            },

            print: function(perspective, alpha) {
                return print.label(perspective, text, point, colour, alpha, font, isScaled);
            }
        };
    };

    app.primitives.toSolid = function(primitive) {
        return {
            points: primitive.points,
            primitives: [primitive]
        };
    }
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));