(function (app) {		
	var ANGLE_BETWEEN_FACE_DAIGONAL_AND_CUBE_DIAGONAL = Math.atan(1 / Math.sqrt(2)),
			ANGLE_BETWEEN_EDGE_AND_CUBE_DIAGONAL = Math.atan(Math.sqrt(2)),			
			angleAtCenterBetweenVerticesSeparatedByAnEdge =
			  ANGLE_BETWEEN_FACE_DAIGONAL_AND_CUBE_DIAGONAL * 2,
			angleAtCenterBetweenVerticesSeparatedByAFaceDiagonal =
				ANGLE_BETWEEN_EDGE_AND_CUBE_DIAGONAL * 2;

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
			angleBetweenFaceDiagonalAndCubeDiagonal: ANGLE_BETWEEN_FACE_DAIGONAL_AND_CUBE_DIAGONAL,
			angleBetweenEdgeAndCubeDiagonal: ANGLE_BETWEEN_EDGE_AND_CUBE_DIAGONAL,
			angleAtCenterBetweenVerticesSeparatedByAnEdge: angleAtCenterBetweenVerticesSeparatedByAnEdge,
			angleAtCenterBetweenVerticesSeparatedByAFaceDiagonal: angleAtCenterBetweenVerticesSeparatedByAFaceDiagonal
		};
	};
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));
