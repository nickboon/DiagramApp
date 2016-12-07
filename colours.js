(function (app) {
	var defaultAlpha = 0.5,
		defaultColour = '#000000'
	
	function toRgb(colour, alpha) {
		var	r, g, b, 
			a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha) || defaultAlpha,
			c = colour || defaultColour;
					
		c = window.parseInt(c.slice(1), 16);
		//parse hex values
		r = c >> 16 & 0xff;
		g = c >> 8 & 0xff;
		b = c & 0xff;

		//only use 'rgba' if needed
		if (a === 1) {
			return "rgb("+ r +","+ g +","+ b +")";
		} else {
			return "rgba("+ r +","+ g +","+ b +","+ a +")";
		}
	}
	
	// create and return API for this module
	app.createColourObject = function () {		
		return {
			defaultAlpha: defaultAlpha,
			defaultColour: defaultColour,
			toRgb: toRgb
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));