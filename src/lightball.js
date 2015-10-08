function createLightball(spec) {
/* ball that goes from the entry to the exit
 * at the speed of the characters
 *
 * may not have life
 */
	var id = newIdentifier(),
	lightball = {},

	entry = spec.entry,
	exit = spec.exit,

	rad = 10,
	life = 1,
	velocity = 1,
	rotation = 0,

	nodes = [],
	current,

	shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad)
	}),
	body = phys2D.createRigidBody({
		type : 'kinetic',
		shapes : [shape],
		sleeping : false,
		bullet : false,
		position : [0,0],
		rotation : rotation,
		userData : lightball,
	}),
	remove = function() {
		loop.removeOfUpdate(id);
		world.removeRigidBody(body);
	},
	update = function(dt) {
		if (life <= 0) {
			remove();
		}
	},
	draw = function() {
		if (debugBool) {
			nodes.forEach(function(node) {
				phys2DDebug.drawCircle(node[0],node[1],20,[0,1,1,1]);
			});
		}
	},
	damage = function(d) {
		life -= d;
	};

	nodes = maze.getPath({
		a : entry,
		b : exit,
		coordinate : "world",
		nodeType : "center",
	});
	current = Math.floor(Math.random()*nodes.length);

	body.setPosition(nodes[current][0],nodes[current][1]);

	world.addRigidBody(body);
	loop.addToUpdate(id,lightball);
	loop.addToDraw(id,lightball);

	lightball.update = update;
	lightball.damage = damage;
	lightball.draw = draw;
	return Object.freeze(lightball);
}
