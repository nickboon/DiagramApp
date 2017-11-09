(function(app) {
    app.createFakeSpheresObject = function() {
        var draw = app.draw(),
            print = typeof app.print === 'function' ? app.print() : undefined;

        function createFakeSphereFill(point, radius, colour) {
            var nearestPoint = { x: point.x, y: point.y, z: point.z - radius };

            return {
                getNearestZ: function getNearestZ() {
                    return point.z - radius;
                },

                draw: function(context, perspective, alpha) {
                    var apparentRadius = radius * perspective.getScale(nearestPoint);

                    draw.circularFill(context, perspective, point, apparentRadius, colour, alpha);
                },

                print: function(perspective, alpha) {
                    var apparentRadius = radius * perspective.getScale(nearestPoint);

                    return print.circularFill(perspective, point, apparentRadius, colour, alpha);
                }
            };
        }

        function createFakeSphereEdge(point, radius, colour) {
            var nearestPoint = { x: point.x, y: point.y, z: point.z - radius };

            return {

                getNearestZ: function getNearestZ() {
                    return point.z
                },

                draw: function(context, perspective, alpha) {
                    var apparentRadius = radius * perspective.getScale(nearestPoint);

                    draw.circle(context, perspective, point, apparentRadius, colour, alpha);
                },

                print: function(perspective, alpha) {
                    var apparentRadius = radius * perspective.getScale(nearestPoint);

                    return print.circle(perspective, point, apparentRadius, colour, alpha);
                }
            };
        }

        function create(point, radius, lineColour, fillColour, alpha) {
            point = point || { x: 0, y: 0, z: 0 };

            return {
                points: [point],
                primitives: [
                    createFakeSphereEdge(point, radius, lineColour, alpha),
                    createFakeSphereFill(point, radius, fillColour, alpha)
                ]
            };
        }

        function createStroke(point, radius, lineColour, alpha) {
            point = point || app.createPointsObject().create;

            return {
                points: [point],
                primitives: createFakeSphereEdge(point, lineColour, alpha)
            };
        }

        return {
            create: create,
            createStroke: createStroke
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));