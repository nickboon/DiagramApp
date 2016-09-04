(function (app) {
	function getFaceDiagonal(width) {
		return Math.sqrt(2) * width;
	}

	function getCubeDiagonal(width) {
		return Math.sqrt(3) * width;
	}

	function getAngleBetweenFaceDiagonalAndCubeDiagonal(width) {
		return Math.atan(width / getFaceDiagonal(width));
	}

	function getAngleAtCenterBetweenVerticesSeparatedByAnEdge(width) {
		return getAngleBetweenFaceDiagonalAndCubeDiagonal(width) * 2;
	}

	function getAngleBetweenWidthAndCubeDiagonal(width) {
		return Math.atan(getFaceDiagonal(width) / width)
	}

	function getAngleAtCenterBetweenVerticesSeparatedByAFaceDiagonal(width) {
		return getAngleBetweenWidthAndCubeDiagonal(width) * 2;
	}
	
	// create and return API for this module
	app.createCubeGeometryObject = function () {
		return {
			getFaceDiagonal: getFaceDiagonal,
			getCubeDiagonal: getCubeDiagonal,
			getAngleBetweenFaceDiagonalAndCubeDiagonal: getAngleBetweenFaceDiagonalAndCubeDiagonal,
			getAngleAtCenterBetweenVerticesSeparatedByAnEdge: getAngleAtCenterBetweenVerticesSeparatedByAnEdge,
			getAngleBetweenWidthAndCubeDiagonal: getAngleBetweenWidthAndCubeDiagonal,
			getAngleAtCenterBetweenVerticesSeparatedByAFaceDiagonal: getAngleAtCenterBetweenVerticesSeparatedByAFaceDiagonal
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
