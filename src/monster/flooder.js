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
	var id = newIdentifier(),
	flooder = {},

	position = spec.position,

	rad = 10,
	life = 1,
	velocity = 1,
	distance = 5,
	deathDistance = 800,
	aim = position,
	lastDir = "",
	//timeBetweenDecision = 1,
//	time = 0,
//	sleepingDistance = 800,
//	soundRatio = 0.1,

	shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad)
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
			} while (fd.length > 1 && fd[i]  === lastDir)

			switch (fd[i]) {
				case "up" :
					lastDir = "up";
					gp = [gp[0],gp[1]-1];
					break;
				case "down" :
					lastDir = "down";
					gp = [gp[0],gp[1]+1];
					break;
				case "left" :
					lastDir = "left";
					gp = [gp[0]-1,gp[1]];
					break;
				case "right" :
					lastDir = "right";
					gp = [gp[0]+1,gp[1]];
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
	damage = function(d) {
		life -= d;
	};
	world.addRigidBody(body);
	loop.addToUpdate(id,flooder);

	flooder.update = update;
	flooder.damage = damage;
	return Object.freeze(flooder);

}
