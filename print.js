(function(app) {

    app.print = function() {
        var defaultLineColour = '#000000',
            defaultFillColour = '#FFFFFF',
            defaultAlpha = .8,
            alphaOffset = -.2; // svg lines seem to come out stronger than html5 canvas ones.

        function svg(primitives, background) {
            var SVG_PREFIX = '<?xml version="1.0" standalone="no"?>' +
                '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
                '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">',

                SVG_SUFFIX = '</svg>';

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
                        svgString += primitive.getSvg();
                    });
                },
                svgString = SVG_PREFIX;

            addBackground();
            addStagePrimitives();
            return svgString + SVG_SUFFIX;
        }

        function line(perspective, pointA, pointB, colour, alpha) {
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
        }

        function curve(perspective, points, colour, alpha) {
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
        }

        function fill(perspective, points, colour, alpha) {
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
        }

        return {
            line: line,
            fill: fill,
            svg: svg,
            curve: curve
        };
    };
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));