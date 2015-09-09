bullet = {};

bullet.init = function() {
	world.newHyperactive({
		name : "bullet",
		shapes : [phys2D.createPolygonShape({
			vertices : phys2D.createRectangleVertices(-1,-1,1,1)
		})],
	});
};
