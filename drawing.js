/* requires colours, perspective */
(function (app) {
	// config
	var	defaultLineColour = '#000000',
		defaultFillColour = '#FFFFFF',
		defaultAlpha = .5,
		defaultFont = {
			size: 20,
			type: 'sans-serif'
		},	
	// objects from dependancies
		colours = app.createColourObject(),
	// module variables
		circleArc = 2 * Math.PI,
		getScreenX,
		getScreenY,
		scale;

	function drawLabel (context, text, point, colour, alpha, f, isScaled) {
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

	function drawCurve(context, pointA, pointB, pointC, pointD, colour, alpha) {
		colour = colour || defaultLineColour;		
		alpha = alpha || defaultAlpha;			
		context.save();
		context.beginPath();
		context.strokeStyle = colours.toRgb(colour, alpha);
		context.moveTo(perspective.getScreenX(pointA), perspective.getScreenY(pointA));
		context.bezierCurveTo(
			getScreenX(pointB), getScreenY(pointB),
			getScreenX(pointC), getScreenY(pointC),
			getScreenX(pointD), getScreenY(pointD)
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
			circleArc
		);
		context.stroke();
		context.restore();
	}
	
	function drawFill(context, points, colour, alpha) {
		var lastPoint = points.length -1,
			i;
			
		colour = colour || defaultFillColour;
		alpha = alpha || defaultAlpha;			
		context.save();
		context.fillStyle = colours.toRgb(colour, alpha);
		context.beginPath();
		context.moveTo(getScreenX(points[lastPoint]), getScreenY(points[lastPoint]));
		
		for(i = lastPoint - 1 ; i >= 0; i -= 1) {
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
			circleArc
		);
		context.closePath();
		context.fill();
		context.restore();
	};
	
	// create and return API for this module
	app.createDrawingObject = function (perspective) {
		getScreenX = perspective.getScreenX;
		getScreenY = perspective.getScreenY;
		scale = perspective.getScale;
		
		return {
			drawLabel: drawLabel,
			drawLine: drawLine,
			drawCurve: drawCurve,
			drawCircle: drawCircle,
			drawFill: drawFill,
			drawCircularFill, drawCircularFill
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
