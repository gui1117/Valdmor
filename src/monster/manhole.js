/* a static generator that generate flooder
 * when activated
 */

function createManhole(spec) {
	var id = newIdentifier(),
	manhole = {},

	position = spec.position,	

	distance = MH_DISTANCE,
	deltaTime = MH_DELTA_TIME,
	rad = MH_RADIUS,
	life = MH_LIFE,

	nextTime = 0,
	time = 0,

	shape = phys2D.createCircleShape({
		radius : rad,
		group : MANHOLE_GROUP,
		mask : 0xffffffff^FLOODER_GROUP,
	}),
	body = phys2D.createRigidBody({
		type : 'static',
		shapes : [shape],
		sleeping : false,
		bullet : false,
		position : position,
		rotation : 0,
		userData : manhole,
	}),
	remove = function() {
		loop.removeOfUpdate(id);
		world.removeRigidBody(body);
	},
	update = function(dt) {
		var d;
		time += dt;

		while (time > nextTime) {
			nextTime += deltaTime;

			d = getDistance(position,character.getPosition());
			if (d < distance) {
				createFlooder({
					position : position
				});
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
	loop.addToUpdate(id,manhole);

	manhole.update = update;
	manhole.damage = damage;
	return Object.freeze(manhole);
}
