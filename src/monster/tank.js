function createTank(spec) {
	/* condition : position is on a big square */
	var id = newIdentifier(),
	tank = {id : id},

	position = spec.position,

	rad = TA_RADIUS,
	life = TA_LIFE,
	velocity = TA_VELOCITY,
	distance = TA_DISTANCE,
	attackDelay = TA_ATTACK_DELAY,
	activationDistance = TA_ACTIVATION_DISTANCE,

	aim = position,
	previous = "",
	timeToAttack = undefined,
	timeToDie = TurbulenzEngine.getTime() + lifeTime,
	
	shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad),
		group : TANK_GROUP,
		mask : 0xffffffff^TANK_GROUP,
	}),
	body = phys2D.createRigidBody({
		type : 'kinetic',
		shapes : [shape],
		sleeping : false,
		bullet : false,
		position : position,
		rotation : 0,
		userData : tank,
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

		if (life <= 0 || TurbulenzEngine.getTime() > timeToDie) {
			remove();
		}
	},
	attack = function(arbitrer) {
		//TODO
	},
	damage = function(d) {
		life -= d;
	};
	shape.addEventListener('begin',attack,CHARACTER_GROUP | MONSTER_GROUP);
	world.addRigidBody(body);
	loop.addToUpdate(id,tank);

	tank.update = update;
	tank.damage = damage;
	return Object.freeze(tank);
}
