function createCharacter(spec) {
	var id = newIdentifier(),
	character = {},

	position = spec ? spec.position : [100,100],

	rad = 12,
	life = 0,
	velocity = 1.5,
	rotation = 0,
	distance = rad*1.1,
	aim = 0,
	mousePosition = position,

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
		userData : character,
	}),
	grenadeLauncher = createGrenadeLauncher({}),
	update = function(dt) {
		var r = body.getRotation(),
		v = velocity;

		aim = angle(body.getPosition(),mousePosition);
		if (isDown.Z) {
			if (isDown.Q) {
				body.setRotation(-3*Math.PI/4);
			} else if (isDown.D) {
				body.setRotation(-Math.PI/4);
			} else if (!isDown.S) {
				body.setRotation(-Math.PI/2);
			}
		} else if (isDown.S) {
			if (isDown.Q) {
				body.setRotation(3*Math.PI/4);
			} else if (isDown.D) {
				body.setRotation(Math.PI/4);
			} else {
				body.setRotation(Math.PI/2);
			}
		} else if (isDown.D) {
			body.setRotation(0);
		} else if (isDown.Q) {
			body.setRotation(Math.PI);
		} else {
			v = 0;
		}
		body.setVelocity([v*Math.cos(r),v*Math.sin(r)]);
		if (isDown.G) {
			grenadeLauncher.shoot({
				position : body.getPosition(),
				rotation : aim,
				distance : distance,
			});
		}
		camera.setPosition(body.getPosition());
	},
	damage = function(d) {
		life -= d;
	},
	getPosition = function() {
		var p = body.getPosition();
		return [p[0],p[1]];
	};
	world.addRigidBody(body);
	loop.addToUpdate(id,character);

	inputDevice.addEventListener('mousemove', function(dx,dy) {
		mousePosition[0] += dx;
		mousePosition[1] += dy;
	});

	character.update = update;
	character.damage = damage;
	character.getPosition = getPosition; 
	return Object.freeze(character);
}
