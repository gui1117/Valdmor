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

	var sprite = Draw2DSprite.create({
		width : downright[0],
		height : downright[1],
		color : COLOR.WALL,
		x : 0,
		y : 0,
		scale : [1, 1],
	});

	camera.setSpriteAttribute(sprite,position,0);

	var update = function(dt) {
		camera.setSpriteAttribute(sprite,position,0);
	};

	var draw = function(debug) {
		if (!debug) {
			draw2D.drawSprite(sprite);
		}
	};

	loop.addToDraw(id,wall);
	loop.addToUpdate(id,wall);

	world.addRigidBody(body);

	wall.body = body;
	wall.draw = draw;
	wall.update = update;

	return Object.freeze(wall);
}
