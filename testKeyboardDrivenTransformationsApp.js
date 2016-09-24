/* required diagrams, points, primitives, shapes, solids, cubeTransformations */
(function (app) {		
	function createLabelsForCubeVertices(points, primitives, shapes) {
		var labelSolids = [],
		i,
		copy = app.createPointsObject().copy;
			
		for (i = points.length - 1; i >= 0; i -= 1)
		{
			primitive = (
				shapes.createLabel('vertex no.' + i, 
					copy(points[i]),
					'#bb2222',
					.8,
					null,
					true
				)
			);
			labelSolids.push(primitives.toSolid(primitive))
		}
		
		return labelSolids;
	}	

	function createSolids(perspective) {
		var drawing = app.createDrawingObject(perspective),
			primitives = app.createPrimitivesObject(drawing),
			shapes = app.createShapesObject(drawing),
			solids = app.createSolidsObject(primitives),
			cube = solids.createHexahedron();
				
		return [cube].concat(
			createLabelsForCubeVertices(cube.points, primitives, shapes)		
		);
	}
	
	app.run = function () {
		var 
			diagram = app.createDefaultFullScreenDiagram(),
			stage = diagram.stage,
			perspective = diagram.perspective, 			
			solids = createSolids(perspective),
			transformer = app.createTransformationObject()
				.createKeyboardDrivenTransformer(solids);
			
		 stage.setSolids(solids);
		 stage.setTransformers([transformer]);
	}
})(window.DIAGRAM_APP || (window.DIAGRAM_APP = {}));

