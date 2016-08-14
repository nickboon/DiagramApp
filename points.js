(function (app) {
	function create(x, y, z) {		
		return {
			x : x || 0,
			y : y || 0,
			z : z || 0		
		};
	}
	
	function copy(point) {
		return {
			x: point.x,
			y: point.y,
			z: point.z
		};		
	}

	function getNearestZFromArray(points) {
		var numbers = points.map(function(point) {
			return point.z;
		});

		return Math.min.apply(null, numbers);
	}	

	// create and return API for this module	
	app.createPointsObject = function () {
		return {
			create: create,
			copy: copy,
			getNearestZFromArray, getNearestZFromArray
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));