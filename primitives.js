(function(app) {
    app.createPrimitives = function() {
        var getNearestZFromArray = app.createPointsObject().getNearestZFromArray,
            isNotAPoint = app.createPointsObject().isNotAPoint,
            draw = app.draw(),
            create = {};

        create.line = function(pointA, pointB, colour) {
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
                }
            };
        };

        create.curve = function(points, colour) {
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
                }
            };
        };

        create.circle = function(point, radius, colour) {
            return {
                points: [point],

                getNearestZ: function() {
                    return point.z;
                },

                draw: function(context, perspective, alpha) {
                    draw.circle(context, perspective, point, radius, colour, alpha);
                }
            };
        };

        create.fill = function(points, colour) {
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
                }
            };
        };

        create.circularFill = function(point, radius, colour) {
            return {
                points: [point],

                getNearestZ: function() {
                    return point.z;
                },

                draw: function(context, perspective, alpha) {
                    draw.circularFill(context, perspective, point, radius, colour, alpha);
                }
            };
        };

        create.label = function(text, point, colour, alpha, font, isScaled) {
            point = point || { x: 0, y: 0, z: 0 };

            return {
                points: [point],

                getNearestZ: function() {
                    return point.z;
                },

                draw: function(context, perspective, alpha) {
                    draw.label(context, perspective, text, point, colour, alpha, font, isScaled);
                }
            };
        };

        create.image = function(url, point, width, height, htmlElement) {
            function createHtmlElement() {
                var imgElement = document.createElement('img');
                imgElement.src = url;
                return imgElement;
            }

            if (!url) {
                throw "You need pass in a url points to create an image.";
            }

            point = point || { x: 0, y: 0, z: 0 };
            htmlElement = htmlElement || createHtmlElement();

            return {
                points: [point],

                getNearestZ: function() {
                    return getNearestZFromArray([point]);
                },

                draw: function(context) {
                    draw.image(context, htmlElement, width, height, point)
                },

                width: width || htmlElement ? htmlElement.width : 0,
                height: height || htmlElement ? htmlElement.height : 0,
                source: url,
                htmlElement: htmlElement
            };
        };

        return create;
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));