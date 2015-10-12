"use strict";

function createWall(spec) {
	var id = newIdentifier();
	var wall = {id : id};

	var position = spec.position;
	var topleft = spec.topleft;
	var downright = spec.downright;

	var shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices( topleft[0], topleft[1], downright[0], downright[1]),
		group : GROUP.WALL,
	});
	var body = phys2D.createRigidBody({
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
