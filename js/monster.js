function createMonster(spec) {
	var id = newIdentifier(),
	monster = {},

	position = spec.position || [10,10],

	rad = 10,
	life = 1,
	velocity = 1,
	rotation = 0,
	awake = false,
	timeBetweenDecision = 1,
	time = 0,

	shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad)
	}),
	body = phys2D.createRigidBody({
		type : 'kinetic',
		shapes : [shape],
		sleeping : false,
		bullet : false,
		position : position,
		rotation : rotation,
		userData : monster,
	}),
	remove = function() {
		loop.removeOfUpdate(id);
		world.removeRigidBody(body);
	},
	update = function(dt) {
		var dis = distance(character.getPosition(),body.getPosition());
		time += dt;

		if (time >= timeBetweenDecision) {
			time = 0;
			if (awake) {
				// if case(body == case(character)
				body.setRotation(angle(body.getPosition(),character.getPosition()));
				// else djiskrta
			} else {
				// awake function of sound on case
			}
		}

		if (life <= 0) {
			remove();
		}
	},
	damage = function(d) {
		life -= d;
	};
	world.addRigidBody(body);
	loop.addToUpdate(id,monster);

	monster.update = update;
	monster.damage = damage;
	return Object.freeze(monster);
}
