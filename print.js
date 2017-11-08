(function(app) {

    app.print = function() {
        var defaultLineColour = '#000000',
            defaultFillColour = '#FFFFFF',
            defaultAlpha = .8,
            defaultFont = {
                size: 20,
                family: 'sans-serif'
            },
            alphaOffset = -.2, // svg lines seem to come out stronger than html5 canvas ones.
            print = {};


        print.line = function(perspective, pointA, pointB, colour, alpha) {
            var getScreenX = perspective.getScreenX,
                getScreenY = perspective.getScreenY;

            colour = colour || defaultLineColour;
            alpha = alpha || defaultAlpha;
            alpha += alphaOffset;

            return '<line ' +
                'x1="' + getScreenX(pointA) + '" ' +
                'y1="' + getScreenY(pointA) + '" ' +
                'x2="' + getScreenX(pointB) + '" ' +
                'y2="' + getScreenY(pointB) + '" ' +
                'style="stroke:' + colour + '" ' +
                'opacity="' + alpha + '" />';
        };

        print.curve = function(perspective, points, colour, alpha) {
            var getScreenX = perspective.getScreenX,
                getScreenY = perspective.getScreenY;

            colour = colour || defaultLineColour;
            alpha = alpha || defaultAlpha;
            alpha += alphaOffset;

            return '<path ' +
                'd="M' + getScreenX(points[0]) +
                ',' + getScreenY(points[0]) + ' ' +
                'C' + getScreenX(points[1]) +
                ',' + getScreenY(points[1]) + ' ' +
                getScreenX(points[2]) +
                ',' + getScreenY(points[2]) + ' ' +
                getScreenX(points[3]) +
                ',' + getScreenY(points[3]) + ' ' +

                //'Z" style="stroke: ' + colour + '" />';
                '" ' +
                'stroke="' + colour + '" fill="none" ' +
                'opacity="' + alpha + '" />';
        };

        print.circle = function(perspective, center, radius, colour, alpha) {
            var getScreenX = perspective.getScreenX,
                getScreenY = perspective.getScreenY,
                scale = perspective.getScale;

            colour = colour || defaultLineColour;
            alpha = alpha || defaultAlpha;
            alpha += alphaOffset;

            return '<circle cx="' + getScreenX(center) + '" ' +
                'cy="' + getScreenY(center) + '" ' +
                'r="' + radius * scale(center) + '" ' +
                'stroke="' + colour + '" fill = "none"' + ' ' +
                'opacity="' + alpha + '" />';
        };

        print.fill = function(perspective, points, colour, alpha) {
            var getScreenX = perspective.getScreenX,
                getScreenY = perspective.getScreenY,
                lines = '',
                i = points.length - 1;

            colour = colour || defaultFillColour;
            alpha = alpha || defaultAlpha;

            for (; i >= 0; i -= 1) {
                lines += getScreenX(points[i]) + ',' + getScreenY(points[i]) + ' '
            }

            return '<polygon ' +
                'points="' + lines + '" ' +
                'style="fill:' + colour + '" ' +
                'opacity="' + alpha + '" />';
        };


        print.circularFill = function(perspective, center, radius, colour, alpha) {
            var getScreenX = perspective.getScreenX,
                getScreenY = perspective.getScreenY,
                scale = perspective.getScale;

            colour = colour || defaultFillColour;
            alpha = alpha || defaultAlpha;

            return '<circle cx="' + getScreenX(center) + '" ' +
                'cy="' + getScreenY(center) + '" ' +
                'r="' + radius * scale(center) + '" ' +
                'fill="' + colour + '" ' +
                'opacity="' + alpha + '" />';
        };

        print.label = function(perspective, text, point, colour, alpha, font, isScaled) {
            var getScreenX = perspective.getScreenX,
                getScreenY = perspective.getScreenY,
                scale = perspective.getScale,
                size,
                family;

            colour = colour || defaultLineColour;
            alpha = alpha || defaultAlpha;
            alpha += alphaOffset;
            font = font || defaultFont;
            family = font.family;
            size = font.size;
            if (isScaled) {
                size *= scale(point);
            }

            return '<text ' +
                'x="' + getScreenX(point) + '"  ' +
                'y="' + getScreenY(point) + '" ' +
                'style="' +
                'font-family: ' + family + '; ' +
                'font-size:' + size + '; ' +
                'fill:' + colour + '" ' +
                'opacity="' + alpha + '">' +
                text + '</text>';
        };

        print.stage = function(stage) {
            var SVG_PREFIX = '<?xml version="1.0" standalone="no"?>' +
                '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
                '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',

                SVG_SUFFIX = '</svg>',
                svgString = SVG_PREFIX,
                background;

            function addBackgroundColour(colour) {
                svgString += '<polygon points="' +
                    '0,0 ' + window.outerWidth + ',0 ' +
                    window.outerWidth + ',' + window.outerHeight + ' 0,' + window.outerHeight +
                    '" style="fill:' + colour + '" />';
            }

            function addBackgroundImage(image) {
                svgString += '<image ' +
                    'x="' + image.x + '" ' +
                    'y="' + image.y + '" ' +
                    'width="' + image.width + 'px" ' +
                    'height="' + image.height + 'px" ' +
                    'xlink:href="' + image.source + '" />';
            }

            function addBackground() {
                if (background.colour) {
                    addBackgroundColour(background.colour)
                }
                if (background.image) {
                    addBackgroundImage(background.image);
                }
            }

            if (!stage) {
                throw 'You need to pass a stage to print.stage method.';
            }

            background = stage.background;
            if (background) {
                addBackground();
            }

            stage.forEachPrimitive(function(primitive, perspective, alpha) {
                svgString += primitive.print(perspective, alpha);
            });

            return svgString + SVG_SUFFIX;
        }

        return print;
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));