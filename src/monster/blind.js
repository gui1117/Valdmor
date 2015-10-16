function createBlind(spec) {
	var id = newIdentifier(),
	blind = {id : id},

	position = spec.position || [10,10],

	rad = PARAM.BL_RADIUS,
	life = PARAM.BL_LIFE,
	velocity = PARAM.BL_VELOCITY,
	timeBetweenDecision = PARAM.BL_TIME_BETWEEN_DECISION,
	sleepingDistance = PARAM.BL_SLEEPING_DISTANCE,
	soundRatio = PARAM.BL_SOUND_RATIO,
	attackDelay = PARAM.BL_ATTACK_DELAY,

	sword = createSword({
		immuneId : [blind.id],
		immuneMask : GROUP.MONSTER,
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
	sprite = Draw2DSprite.create({
		width : rad,
		height : rad,
		color : COLOR.BLIND,
		x : 0,
		y : 0,
		rotation : rotation,
		scale : [1, 1],
	}),
	remove = function() {
		loop.removeOfUpdate(id);
		if (mode === 'timer') {
			loop.removeOfDraw(id);
		}
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
			sword.attack({
				position : body.getPosition(),
				rotation : body.getRotation(),
			});
			timeToAttack = undefined;
		}

		camera.setSpriteAttribute(sprite,body.getPosition(),body.getRotation());

		if (life <= 0) {
			remove();
		}
	},
	attack = function(arbiter) {
		if (! timeToAttack) {
			timeToAttack = TurbulenzEngine.getTime()+attackDelay;
		}
	},
	draw = function(debug) {
		if (!debug) {
			draw2D.drawSprite(sprite);
		}
	},
	damage = function(d) {
		life -= d;
	};
	shape.addEventListener('begin',attack,GROUP.CHARACTER);
	world.addRigidBody(body);
	loop.addToUpdate(id,blind);
	loop.addToDraw(id,blind);

	blind.update = update;
	blind.damage = damage;
	blind.draw = draw;
	return Object.freeze(blind);
}
