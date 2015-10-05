function createWall(spec) {
	var id = newIdentifier(),
	wall = {},

	position = spec.position,
	topleft = spec.topleft,
	downright = spec.downright,

	shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices( topleft[0], topleft[1], downright[0], downright[1])
	}),
	body = phys2D.createRigidBody({
		type : 'static',
		shapes : [shape],
		sleeping : false,
		bullet : false,
		position : position,
		userData : wall,
	});

	world.addRigidBody(body);

	wall.body = body;

	return Object.freeze(wall);
}
