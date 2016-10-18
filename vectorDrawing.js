/* requires */
(function (app) {
	// config
	var	defaultLineColour = '#000000',
		defaultFillColour = '#FFFFFF',
		defaultAlpha = .8,
		defaultFont = {
			size: 20,
			family: 'sans-serif'
		},
		defaultKeyCode = 113; // F2		
	// objects from dependancies
		colours = app.createColourObject(),
	// constants
		SVG_PREFIX = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" '
				+ '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'
				+ '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">',
		SVG_SUFFIX = '</svg>';
		
	function printSvg(primitives) {
		var  svgString = SVG_PREFIX,
			i;
		
		primitives.forEach(function (primitive) {
			var primitiveSvg = primitive.getSvg();
			svgString += primitiveSvg;
		});
		
		svgString += SVG_SUFFIX;

		window.console.log(svgString); // send a copy of the SVG string to the console

		// open SVG in a new window. User can then use browser Save File Dialog to download a copy.
		// suggested by cuixiping. 
		// Works in Chrome, Firefox and Safari. Might not work in IE.
		//http://stackoverflow.com/questions/16460933/using-window-open-document-open-and-document-write-to-display-xml-xml-renderi		
		window.open(
			'data:text/xml,' + encodeURIComponent(svgString),
			"Test",
			"width=" + window.innerWidth + ",height=" + window.innerHeight
				+ ",scrollbars=1,resizable=1"
		);
	}
	
	function setKeyListenerForPrintSvg(primitives, keyCode) {
		window.addEventListener('keydown', function (event) {
			keyCode = keyCode || defaultKeyCode;
			
			if (event.keyCode === keyCode) {
				printSvg(primitives);
			}
		});
	}		
	
	// create and return API for this module
	app.createVectorDrawingObject = function (perspective) {
		var getScreenX = perspective.getScreenX,
			getScreenY = perspective.getScreenY,
			scale = perspective.getScale;
		
		function line(pointA, pointB, colour, alpha) {
			colour = colour || defaultLineColour;		
			alpha = alpha || defaultAlpha;			

			return '<line x1="' + getScreenX(pointA)
				+ '" y1="' + getScreenY(pointA)
				+ '" x2="' + getScreenX(pointB)
				+ '" y2="' + getScreenY(pointB)
				+ '" style="stroke:' + colour
				+ '" opacity="' + alpha + '" />';			
		}

		function curve(pointA, pointB, pointC, pointD, colour, alpha) {
			colour = colour || defaultLineColour;		
			alpha = alpha || defaultAlpha;			
  
			throw "Curve vector drawing not implemented!";
		}
		
		function fill(points, colour, alpha) {
			var lines = '', 
				i;
			
			colour = colour || defaultFillColour;		
			alpha = alpha || defaultAlpha;			

			for(i = points.length - 1; i >= 0; i -= 1) {
				lines += getScreenX(points[i]) + ',' + getScreenY(points[i]) + ' '
			};
			
			return '<polygon points="'
				+ lines
				+ '" style="fill:' + colour
				+ '" opacity="' + alpha + '" />';
		}
		
		function circularFill(center, radius, colour, alpha) {
			colour = colour || defaultFillColour;		
			alpha = alpha || defaultAlpha;			
    
			return '<circle cx="' + getScreenX(center)
				+ '" cy="' + getScreenY(center)
				+ '" r="' + radius * scale(center)
				+ '" fill="' + colour
				+ '" opacity="' + alpha + '" />';
		}
		
		function circle(center, radius, colour, alpha) {
			colour = colour || defaultLineColour;		
			alpha = alpha || defaultAlpha;			

			return '<circle cx="' + getScreenX(center)
			+ '" cy="' + getScreenY(center)
			+ '" r="' + radius * scale(center)
			+ '" stroke="' + colour + '" fill = "none"'
			+ ' opacity="' + alpha + '" />';
		}
		
		function label(text, point, colour, alpha, size, isScaled) {
			colour = colour || defaultLineColour;		
			alpha = alpha || defaultAlpha;
			size = size || defaultFont.size;

			if (isScaled) {
				fontSize *= scale(point);
			};
			
			return '<text x="' + getScreenX(point)
				+ '"  y="' + getScreenY(point)
				+ '" style="font-family: ' + defaultFont.family
				+ '; font-size:' + size
				+ '; fill:' +  colour
				+ '" opacity="' + alpha + '">'
				+ text + '</text>';						
		}
		
		if (!perspective) {
			throw 'You need to pass in a perspectie object to create 3d vector drawings.';
		}
		
		return {
			printSvg: printSvg,
			setKeyListenerForPrintSvg: setKeyListenerForPrintSvg,
			line: line,
			fill: fill,
			circularFill: circularFill,
			circle: circle,
			label: label
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));