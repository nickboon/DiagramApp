(function (app) {
	//config
	var defaultWidth = 200;
	
	app.getCubePoints = function (w) {		
		var width = w || defaultWidth,
			halfWidth = width / 2;
	
		return [
			{ x: -halfWidth, y: -halfWidth, z: -halfWidth},	// 0 left top front
			{ x: halfWidth, y: -halfWidth, z: -halfWidth}, 	// 1 right top front
			{ x: halfWidth, y: halfWidth, z: -halfWidth},  	// 2 right bottom front 
			{ x: -halfWidth, y: halfWidth, z: -halfWidth},	// 3 left bottom front
			{ x: -halfWidth, y: -halfWidth, z: halfWidth},	// 4 left top back
			{ x: halfWidth, y: -halfWidth, z: halfWidth},	// 5 right top back
			{ x: halfWidth, y: halfWidth, z: halfWidth},	// 6 right bottom back
			{ x: -halfWidth, y: halfWidth, z:  halfWidth}	// 7 left bottom back				
		];
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
