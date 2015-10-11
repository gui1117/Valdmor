function createBlind(spec) {
	var id = newIdentifier(),
	blind = {},

	position = spec.position || [10,10],

	rad = PARAM.BL_RADIUS,
	life = PARAM.BL_LIFE,
	velocity = PARAM.BL_VELOCITY,
	timeBetweenDecision = PARAM.BL_TIME_BETWEEN_DECISION,
	sleepingDistance = PARAM.BL_SLEEPING_DISTANCE,
	soundRatio = PARAM.BL_SOUND_RATIO,
	attackDelay = PARAM.BL_ATTACK_DELAY,

	punch = createPunch({
		immune : blind,
	}),
	awake = false,
	rotation = 0,
	timeToDecide = TurbulenzEngine.getTime(),
	timeToAttack = undefined,

	shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad),
		group : GROUP.BLIND,
	}),
	body = phys2D.createRigidBody({
		type : 'kinetic',
		shapes : [shape],
		sleeping : false,
		bullet : false,
		position : position,
		rotation : rotation,
		userData : blind,
	}),
	remove = function() {
		loop.removeOfUpdate(id);
		world.removeRigidBody(body);
	},
	setAwake = function(bool) {
		if (bool) {
			awake = true;
		} else {
			awake = false;
		}
	},
	update = function(dt) {
		var dis = getDistance(character.getPosition(),body.getPosition()),
		chance,v,r,
		time = TurbulenzEngine.getTime();
		

		if (time >= timeToDecide) {
			while (timeToDecide <= time) {
				timeToDecide += timeBetweenDecision;
			}

			if (awake) {
				if (getDistance(body.getPosition(),character.getPosition()) 
						< sleepingDistance) {
					body.setRotation(getAngle(body.getPosition(),character.getPosition()));
				} else {
					setAwake(false);
				}
			} else {
				if (Math.random() < maze.getSound(body.getPosition())*soundRatio) {
					setAwake(true)
				}
			}
		}
		if (awake) {
			v = velocity;
			r = body.getRotation();
			body.setVelocity([v*Math.cos(r),v*Math.sin(r)]);
		}
		if (timeToAttack && time > timeToAttack) {
			punch.shoot({
				position : body.getPosition(),
				rotation : body.getRotation(),
			});
			timeToAttack = undefined;
		}

		if (life <= 0) {
			remove();
		}
	},
	attack = function(arbiter) {
		if (! timeToAttack) {
			timeToAttack = TurbulenzEngine.getTime()+attackDelay;
		}
	},
	damage = function(d) {
		life -= d;
	};
	shape.addEventListener('begin',attack,GROUP.CHARACTER);
	world.addRigidBody(body);
	loop.addToUpdate(id,blind);

	blind.update = update;
	blind.damage = damage;
	return Object.freeze(blind);
}
