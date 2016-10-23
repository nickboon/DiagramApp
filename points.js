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
	
	function getHexahedronPoints(width, height, length) {
		var halfWidth = width / 2,
			halfHeight = height / 2,
			halfLength = length / 2;

		if (!width || !height || !length) {
			throw 'You must pass in a width, height and length to get hexahedrons points.'
		}					
		return [
			{ x: -halfWidth, y: -halfHeight, z: -halfLength},// 0 left top front
			{ x: halfWidth, y: -halfHeight, z: -halfLength}, // 1 right top front
			{ x: halfWidth, y: halfHeight, z: -halfLength},  // 2 right bottom front 
			{ x: -halfWidth, y: halfHeight, z: -halfLength}, // 3 left bottom front
			{ x: -halfWidth, y: -halfHeight, z: halfLength}, // 4 left top back
			{ x: halfWidth, y: -halfHeight, z: halfLength},	 // 5 right top back
			{ x: halfWidth, y: halfHeight, z: halfLength},	 // 6 right bottom back
			{ x: -halfWidth, y: halfHeight, z:  halfLength}	 // 7 left bottom back				
		];
	}
		
	function getCubePoints(width) {
		if (!width) {
			throw 'You must pass in a width to get cube points.'
		}			
		return getHexahedronPoints(width, width, width);
	}

	// create and return API for this module	
	app.createPointsObject = function () {
		return {
			create: create,
			copy: copy,
			getNearestZFromArray, getNearestZFromArray,
			getHexahedronPoints: getHexahedronPoints,
			getCubePoints: getCubePoints
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
