(function(app) {
    app.draw = function() {
        var colours = app.createColourObject(),
            defaultLineColour = '#000000',
            defaultFillColour = '#FFFFFF',
            defaultAlpha = .8,
            defaultFont = {
                size: 20,
                family: 'sans-serif'
            },
            CIRCLE_ARC = 2 * Math.PI,
            draw = {};

        draw.line = function(context, perspective, pointA, pointB, colour, alpha) {
            var getScreenX = perspective.getScreenX,
                getScreenY = perspective.getScreenY;

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

        draw.curve = function(context, perspective, points, colour, alpha) {
            var getScreenX = perspective.getScreenX,
                getScreenY = perspective.getScreenY;

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

        draw.circle = function(context, perspective, point, radius, colour, alpha) {
            var getScreenX = perspective.getScreenX,
                getScreenY = perspective.getScreenY,
                scale = perspective.getScale;

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

        draw.fill = function(context, perspective, points, colour, alpha) {
            var getScreenX = perspective.getScreenX,
                getScreenY = perspective.getScreenY,
                lastIndex = points.length - 1,
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

        draw.circularFill = function(context, perspective, point, radius, colour, alpha) {
            var getScreenX = perspective.getScreenX,
                getScreenY = perspective.getScreenY,
                scale = perspective.getScale;

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
        }

        draw.label = function(context, perspective, text, point, colour, alpha, font, isScaled) {
            var getScreenX = perspective.getScreenX,
                getScreenY = perspective.getScreenY,
                scale = perspective.getScale,
                family,
                size;

            font = font || defaultFont;
            size = font.size;
            if (isScaled) {
                size *= scale(point);
            }
            family = font.family;
            colour = colour || defaultLineColour;
            context.save();
            context.fillStyle = colours.toRgb(colour, alpha);
            context.font = size + 'px ' + family;
            context.fillText(text, getScreenX(point), getScreenY(point));
            context.restore();
        }

        return draw;
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));