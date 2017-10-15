/* requires */
(function(app) {
    var colours = app.createColourObject(),

        defaultLineColour = '#000000',
        defaultFillColour = '#FFFFFF',
        defaultAlpha = .8,
        defaultFont = {
            size: 20,
            family: 'sans-serif'
        },

        alphaOffset = -.2, // svg lines seem to come out stronger than html5 canvas ones.

        SVG_PREFIX = '<?xml version="1.0" standalone="no"?>' +
        '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
        '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',

        SVG_SUFFIX = '</svg>';

    app.printSvg = function(primitives, background) {
        var addBackgroundColour = function(colour) {
                svgString += '<polygon points="' +
                    '0,0 ' + window.outerWidth + ',0 ' +
                    window.outerWidth + ',' + window.outerHeight + ' 0,' + window.outerHeight +
                    '" style="fill:' + colour + '" />';
            },
            addBackgroundImage = function(image) {
                svgString += '<image ' +
                    'x="' + image.x + '" ' +
                    'y="' + image.y + '" ' +
                    'width="' + image.width + 'px" ' +
                    'height="' + image.height + 'px" ' +
                    'xlink:href="' + image.source + '" />';
            },
            addBackground = function() {
                if (background && background.colour) {
                    addBackgroundColour(background.colour)
                }
                if (background && background.image) {
                    addBackgroundImage(background.image);
                }
            },
            sortPrimitives = function() {
                primitives.sort(function(a, b) {
                    return a.getNearestZ() - b.getNearestZ();
                });
                primitives.reverse();
            },

            addStagePrimitives = function() {
                sortPrimitives();

                primitives.forEach(function(primitive) {
                    svgString += primitive.getSvg();;
                });
            },
            svgString = SVG_PREFIX;

        addBackground();
        addStagePrimitives();
        return svgString + SVG_SUFFIX;
    }

    // create and return API for this module
    app.createVectorDrawingObject = function(perspective) {
        var getScreenX = perspective.getScreenX,
            getScreenY = perspective.getScreenY,
            scale = perspective.getScale;

        function line(pointA, pointB, colour, alpha) {
            colour = colour || defaultLineColour;
            alpha = alpha || defaultAlpha;
            alpha += alphaOffset;

            return '<line x1="' + getScreenX(pointA) +
                '" y1="' + getScreenY(pointA) +
                '" x2="' + getScreenX(pointB) +
                '" y2="' + getScreenY(pointB) +
                '" style="stroke:' + colour +
                '" opacity="' + alpha + '" />';
        }

        function curve(points, colour, alpha) {
            colour = colour || defaultLineColour;
            alpha = alpha || defaultAlpha;
            alpha += alphaOffset;

            return '<path d="M' + getScreenX(points[0]) + ',' + getScreenY(points[0]) + ' ' +
                'C' + getScreenX(points[1]) + ',' + getScreenY(points[1]) + ' ' +
                getScreenX(points[2]) + ',' + getScreenY(points[2]) + ' ' +
                getScreenX(points[3]) + ',' + getScreenY(points[3]) + ' ' +

                //'Z" style="stroke: ' + colour + '" />';
                '" stroke="' + colour + '" fill="none"' +
                ' opacity="' + alpha + '" />';
        }

        function fill(points, colour, alpha) {
            var lines = '',
                i;

            colour = colour || defaultFillColour;
            alpha = alpha || defaultAlpha;

            for (i = points.length - 1; i >= 0; i -= 1) {
                lines += getScreenX(points[i]) + ',' + getScreenY(points[i]) + ' '
            };

            return '<polygon ' +
                'points="' + lines + '" ' +
                'style="fill:' + colour + '" ' +
                'opacity="' + alpha + '" />';
        }

        function circularFill(center, radius, colour, alpha) {
            colour = colour || defaultFillColour;
            alpha = alpha || defaultAlpha;

            return '<circle cx="' + getScreenX(center) +
                '" cy="' + getScreenY(center) +
                '" r="' + radius * scale(center) +
                '" fill="' + colour +
                '" opacity="' + alpha + '" />';
        }

        function circle(center, radius, colour, alpha) {
            colour = colour || defaultLineColour;
            alpha = alpha || defaultAlpha;
            alpha += alphaOffset;

            return '<circle cx="' + getScreenX(center) +
                '" cy="' + getScreenY(center) +
                '" r="' + radius * scale(center) +
                '" stroke="' + colour + '" fill = "none"' +
                ' opacity="' + alpha + '" />';
        }

        function label(text, point, colour, alpha, size, isScaled) {
            colour = colour || defaultLineColour;
            alpha = alpha || defaultAlpha;
            alpha += alphaOffset;
            size = size || defaultFont.size;

            if (isScaled) {
                size *= scale(point);
            };

            return '<text ' +
                'x="' + getScreenX(point) + '"  ' +
                'y="' + getScreenY(point) + '" ' +
                'style="' +
                'font-family: ' + defaultFont.family + '; ' +
                'font-size:' + size + '; ' +
                'fill:' + colour + '" ' +
                'opacity="' + alpha + '">' +
                text + '</text>';
        }

        if (!perspective) {
            throw 'You need to pass in a perspectie object to create 3d vector drawings.';
        }

        return {
            line: line,
            curve: curve,
            fill: fill,
            circularFill: circularFill,
            circle: circle,
            label: label
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));