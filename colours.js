(function (app) {
	function toRgb (colour, alpha) {
		var defaultAlpha = 0.5,
			r,
			g,
			b,
			a = a || defaultAlpha;
		
		colour = window.parseInt(colour.slice(1), 16);
		//parse hex values
		r = colour >> 16 & 0xff;
		g = colour >> 8 & 0xff;
		b = colour & 0xff;
		a = (alpha < 0) ? 0 : ((alpha > 1) ? 1 : alpha);
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
			toRgb: toRgb
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));