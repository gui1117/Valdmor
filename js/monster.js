monster = {};

monster.init = function() {
	world.newActive({
		name : "monster",
		svgTags : ["rect"],
		shapes : [phys2D.createPolygonShape({
			vertices : phys2D.createRectangleVertices(-10,-10,10,10)
		})],
	});
};
