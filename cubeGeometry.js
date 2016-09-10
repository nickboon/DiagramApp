(function (app) {		
	var angleBetweenFaceDiagonalAndCubeDiagonal = Math.atan(1 / Math.sqrt(2)),
			angleBetweenEdgeAndCubeDiagonal = Math.atan(Math.sqrt(2)),
			angleAtCenterBetweenVerticesSeparatedByAnEdge =
			  angleBetweenFaceDiagonalAndCubeDiagonal * 2,
			angleAtCenterBetweenVerticesSeparatedByAFaceDiagonal =
				angleBetweenEdgeAndCubeDiagonal * 2;

	function getFaceDiagonal(width) {
		return Math.sqrt(2) * width;
	}

	function getCubeDiagonal(width) {
		return Math.sqrt(3) * width;
	}

	// create and return API for this module
	app.createCubeGeometryObject = function () {
		return {
			getFaceDiagonal: getFaceDiagonal,
			getCubeDiagonal: getCubeDiagonal,
			angleBetweenFaceDiagonalAndCubeDiagonal: angleBetweenFaceDiagonalAndCubeDiagonal,
			angleBetweenEdgeAndCubeDiagonal: angleBetweenEdgeAndCubeDiagonal,
			angleAtCenterBetweenVerticesSeparatedByAnEdge: angleAtCenterBetweenVerticesSeparatedByAnEdge,
			angleAtCenterBetweenVerticesSeparatedByAFaceDiagonal: angleAtCenterBetweenVerticesSeparatedByAFaceDiagonal
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
