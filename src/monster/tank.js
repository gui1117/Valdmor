/* pathfind toward the closest character 
 * have a velocity quite inferior of the charater
 * attack on touch every things
 *
 * or same velocity but stop a little when attack
 */
function createTank(spec) {
	/* condition : position is on a big square */
	var id = newIdentifier();
	var tank = {id : id};

	var position = spec.position;

	var rad = PARAM.TA_RADIUS;
	var life = PARAM.TA_LIFE;
	var velocity = PARAM.TA_VELOCITY;
	var distance = PARAM.TA_DISTANCE; // for path nodes
	//var attackDelay = PARAM.TA_ATTACK_DELAY;  // no?
	var activationDistance = PARAM.TA_ACTIVATION_DISTANCE;
	var timeBetweenPathfind = PARAM.TA_TIME_BETWEEN_PATHFIND;
	var damage = PARAM.TA_DAMAGE;
	var damageHeight = PARAM.TA_DAMAGE_HEIGHT;
	var damageWidth = PARAM.TA_DAMAGE_WIDTH;

	var aim = position; // path node aimed
	var previous = "";
	
	var shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad),
		group : GROUP.TANK,
	});

	var body = phys2D.createRigidBody({
		type : 'kinetic',
		shapes : [shape],
		sleeping : false,
		bullet : false,
		position : position,
		rotation : 0,
		userData : tank,
	});

	var remove = function() {
		loop.removeOfUpdate(id);
		world.removeRigidBody(body);
	};

	var sword = createSword({
		immuneId : [tank.id],
		innerWidth : damageWidth,
		outerWidth : damageWidth,
		height : damageHeight,
	});

	var update = function(dt) {
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
	};

	var attack = function(arbitrer) {
		sword.attack({
			position : body.getPosition(),
			rotation : body.getRotation(),
		});
	};

	var damage = function(d) {
		life -= d;
	};

	shape.addEventListener('begin',attack,GROUP.CHARACTER | GROUP.MONSTER);
	world.addRigidBody(body);
	loop.addToUpdate(id,tank);

	tank.update = update;
	tank.damage = damage;
	return Object.freeze(tank);
}
