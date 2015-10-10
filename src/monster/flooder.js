/* each room has a flooder spawn.
 * when the alarm happen, the room where
 * the character is and the two aside create
 * flooder on their spawn.
 *
 * a flooder is an entity that go forward and
 * chose any intersection randomly (but no backward)
 * it lives in th 3-room area (for performance purpose)
 * (or in a certain distance of character)
 *
 * better : room have some 'flooderGenerator',
 * when an alarm happen : the generator are activated 
 * 		if they are visible : all in a radius
 * 		if not between two radius
 */

function createFlooder(spec) {
	/* condition : position is on a big square */
	var id = newIdentifier(),
	flooder = {},

	position = spec.position,

	rad = FL_RADIUS,
	life = FL_LIFE,
	velocity = FL_VELOCITY,
	distance = FL_DISTANCE,
	deathDistance = FL_DEATH_DISTANCE,
	attackDelay = FL_ATTACK_DELAY,

	aim = position,
	previous = "",
	timeToAttack = undefined,
	
	shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad),
		group : FLOODER_GROUP,
		mask : 0xffffffff^FLOODER_GROUP,
	}),
	body = phys2D.createRigidBody({
		type : 'kinetic',
		shapes : [shape],
		sleeping : false,
		bullet : false,
		position : position,
		rotation : 0,
		userData : flooder,
	}),
	remove = function() {
		loop.removeOfUpdate(id);
		world.removeRigidBody(body);
	},
	update = function(dt) {
		var v,r,fd,i,gp
		p = body.getPosition();

		if (getDistance(p,aim) < distance) {
			gp = maze.toGrid(p);
			fd = maze.getFreeDirection(p);
			do {
				i = Math.floor(Math.random()*fd.length);
			} while (fd.length > 1 && fd[i]  === previous)

			switch (fd[i]) {
				case "up" :
					previous = "down";
					gp = [gp[0],gp[1]-2];
					break;
				case "down" :
					previous = "up";
					gp = [gp[0],gp[1]+2];
					break;
				case "left" :
					previous = "right";
					gp = [gp[0]-2,gp[1]];
					break;
				case "right" :
					previous = "left";
					gp = [gp[0]+2,gp[1]];
					break;
			}

			aim = maze.toWorld(gp,"random");
		}

		v = velocity;
		r = getAngle(p,aim);
		body.setVelocity([v*Math.cos(r),v*Math.sin(r)]);

		if (life <= 0 || getDistance(p,character.getPosition()) > deathDistance) {
			remove();
		}
	},
	attack = function(arbitrer) {
		remove();
	},
	damage = function(d) {
		life -= d;
	};
	shape.addEventListener('begin',attack,CHARACTER_GROUP);
	world.addRigidBody(body);
	loop.addToUpdate(id,flooder);

	flooder.update = update;
	flooder.damage = damage;
	return Object.freeze(flooder);

}
