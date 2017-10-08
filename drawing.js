/* requires colours, perspective */
(function(app) {
    // config
    var defaultLineColour = '#000000',
        defaultFillColour = '#FFFFFF',
        defaultAlpha = .8,
        defaultFont = {
            size: 20,
            type: 'sans-serif'
        },
        // objects from dependancies
        colours = app.createColourObject(),
        // constants
        CIRCLE_ARC = 2 * Math.PI;

    // create and return API for this module
    app.createDrawingObject = function(perspective) {
        var getScreenX = perspective.getScreenX,
            getScreenY = perspective.getScreenY,
            scale = perspective.getScale;

        function drawLabel(context, text, point, colour, alpha, f, isScaled) {
            var font = f || defaultFont,
                size = font.size || defaultFont.size,
                type = font.type || defaultFont.type

            if (isScaled) {
                size *= scale(point);
            }
            colour = colour || defaultLineColour;
            context.save();
            context.fillStyle = colours.toRgb(colour, alpha);
            context.font = size + 'px ' + type;
            context.fillText(text, getScreenX(point), getScreenY(point));
            context.restore();
        };

        function drawLine(context, pointA, pointB, colour, alpha) {
            colour = colour || defaultLineColour;
            alpha = alpha || defaultAlpha;
            context.save();
            context.beginPath();
            context.strokeStyle = colours.toRgb(colour, alpha);
            context.moveTo(getScreenX(pointA), getScreenY(pointA));
            context.lineTo(getScreenX(pointB), getScreenY(pointB));
            context.stroke();
            context.restore();
        }

        function drawCurve(context, points, colour, alpha) {
            colour = colour || defaultLineColour;
            alpha = alpha || defaultAlpha;
            context.save();
            context.beginPath();
            context.strokeStyle = colours.toRgb(colour, alpha);
            context.moveTo(getScreenX(points[0]), getScreenY(points[0]));
            context.bezierCurveTo(
                getScreenX(points[1]), getScreenY(points[1]),
                getScreenX(points[2]), getScreenY(points[2]),
                getScreenX(points[3]), getScreenY(points[3])
            );
            context.stroke();
            context.restore();
        }

        function drawCircle(context, point, radius, colour, alpha) {
            colour = colour || defaultLineColour;
            alpha = alpha || defaultAlpha;
            context.save();
            context.strokeStyle = colours.toRgb(colour, alpha);
            context.beginPath();
            context.arc(
                getScreenX(point),
                getScreenY(point),
                radius * scale(point),
                0,
                CIRCLE_ARC
            );
            context.stroke();
            context.restore();
        }

        function drawFill(context, points, colour, alpha) {
            var lastIndex = points.length - 1,
                i;

            colour = colour || defaultFillColour;
            alpha = alpha || defaultAlpha;
            context.save();
            context.fillStyle = colours.toRgb(colour, alpha);
            context.beginPath();
            context.moveTo(getScreenX(points[lastIndex]), getScreenY(points[lastIndex]));

            for (i = lastIndex; i >= 0; i -= 1) {
                context.lineTo(getScreenX(points[i]), getScreenY(points[i]));
            }
            context.closePath();
            context.fill();
            context.restore();
        }

        function drawCircularFill(context, point, radius, colour, alpha) {
            colour = colour || defaultFillColour;
            alpha = alpha || defaultAlpha;
            context.save();
            context.fillStyle = colours.toRgb(colour, alpha);
            context.beginPath();
            context.arc(
                getScreenX(point),
                getScreenY(point),
                radius * scale(point),
                0,
                CIRCLE_ARC
            );
            context.closePath();
            context.fill();
            context.restore();
        };

        if (!perspective) {
            throw 'You need to pass in a perspectie object to create 3d drawings.';
        }

        return {
            drawLabel: drawLabel,
            drawLine: drawLine,
            drawCurve: drawCurve,
            drawCircle: drawCircle,
            drawFill: drawFill,
            drawCircularFill,
            drawCircularFill
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));