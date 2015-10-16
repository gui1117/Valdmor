function createFlooder(spec) {
	/* condition : position is on a big square */
	var id = newIdentifier(),
	flooder = {id : id},

	position = spec.position,

	rad = PARAM.FL_RADIUS,
	life = PARAM.FL_LIFE,
	velocity = PARAM.FL_VELOCITY,
	distance = PARAM.FL_DISTANCE,
	lifeTime = PARAM.FL_LIFE_TIME,
	damageRadius = PARAM.FL_DAMAGE_RADIUS,
	damage = PARAM.FL_DAMAGE,

	aim = position,
	previous = "",
	timeToAttack = undefined,
	timeToDie = TurbulenzEngine.getTime() + lifeTime,
	
	damageShape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-damageRadius,-damageRadius,damageRadius,damageRadius),
		group : GROUP.DAMAGE,
	}),

	shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad),
		group : GROUP.FLOODER,
		mask : 0xffffffff^GROUP.FLOODER,
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
	sprite = Draw2DSprite.create({
		width : rad,
		height : rad,
		color : COLOR.FLOODER,
		x : position[0],
		y : position[1],
		scale : [1, 1],
	}),
	remove = function() {
		loop.removeOfUpdate(id);
		if (mode === 'timer') {
			loop.removeOfDraw(id);
		}
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

		camera.setSpriteAttribute(sprite,body.getPosition(),body.getRotation());

		if (life <= 0 || TurbulenzEngine.getTime() > timeToDie) {
			remove();
		}
	},
	draw = function(debug) {
		if (!debug) {
			draw2D.drawSprite(sprite);
		}
	},
	attack = function(arbitrer) {
		shapeAttack({
			shape : damageShape,
			position : body.getPosition(),
			damage : damage,
		});
		remove();
	},
	damage = function(d) {
		life -= d;
	};

	shape.addEventListener('begin',attack,GROUP.CHARACTER);
	world.addRigidBody(body);
	loop.addToUpdate(id,flooder);
	loop.addToDraw(id,flooder);

	flooder.update = update;
	flooder.damage = damage;
	flooder.draw = draw;
	return Object.freeze(flooder);
}
