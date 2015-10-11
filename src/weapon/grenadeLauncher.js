function createGrenadeLauncher(spec) {
	var id = newIdentifier(),
	grenadeLauncher = {},
	spec = spec || {},

	rad = spec.radius || PARAM.GL_RADIUS,
	damageAmount = spec.damage || PARAM.GL_DAMAGE,
	damageRadius = spec.damageRadius || PARAM.GL_DAMAGE_RADIUS,
	velocity = spec.velocty || PARAM.GL_VELOCITY,
	velocityTime = spec.velocityTime || PARAM.GL_VELOCITY_TIME,
	lifeTime = spec.lifeTime || PARAM.GL_LIFE_TIME,
	soundIntensity = spec.soundIntensity || PARAM.GL_SOUND_INTENSITY,
	reloadTime = spec.reloadTime || PARAM.GL_RELOAD_TIME,
	bullet = spec.bullet || 0,

	shootSound  = spec.shootSound || SOUND.GRENADELAUNCHER_SHOOT[0],

	explosionSound = spec.explosionSound || SOUND.GRENADELAUNCHER_EXPLOSION[0],

	reload = 0,
	createGrenade = function(spec) {
		var id = newIdentifier(),
		grenade = {},
		p = spec.position,
		r = spec.rotation,
		v = spec.velocity,

		shape = phys2D.createPolygonShape({
			sensor : true,
			vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad),
			group : GROUP.BULLET,
			userData : grenade,
		}),
		body = phys2D.createRigidBody({
			type : 'kinetic',
			shapes : [shape],
			sleeping : false,
			bullet : true,
			position : p,
			velocity : v,
			rotation : r,
			userData : grenade,
		}),
		life = 1,
		timeToStop = TurbulenzEngine.getTime() + velocityTime,
		timeToDie = TurbulenzEngine.getTime() + lifeTime,
		remove = function() {
			loop.removeOfUpdate(id);
			world.removeRigidBody(body);
		},
		update = function(dt) {
			var store,damageShape,
			time = TurbulenzEngine.getTime();

			if (time < timeToStop) {
				body.setVelocity(v);
			}

			if (life === 0 || time > timeToDie) {
				sound.play(explosionSound);
				damageShape = phys2D.createCircleShape({
					sensor : true,
					radius : damageRadius,
					group : GROUP.DAMAGE,
				}),

				shapeAttack({
					shape : damageShape,
					position : body.getPosition(),
					damage : damageAmount,
				});
				remove();
			}
		},
		damage = function(d) {
			life = 0;
		};

		shape.addEventListener('begin',damage);
		world.addRigidBody(body);
		loop.addToUpdate(id,grenade);


		grenade.damage = damage;
		grenade.update = update;
		return Object.freeze(grenade);
	},
	shoot = function(spec) {
		var p = spec.position;
		d = spec.distance+rad*1.45,
		v = spec.velocity || velocity,
		r = spec.rotation;

		if (!reload) {
			sound.play(shootSound);
			createGrenade({
				rotation : r,
				position : [p[0]+d*Math.cos(r),p[1]+d*Math.sin(r)],
				velocity : [v*Math.cos(r),v*Math.sin(r)],

			});
			reload = reloadTime;
		}
	},
	setBullet = function(n) {
		bullet = n;
	},
	addBullet = function(n) {
		bullet += n;
	},
	getBullet = function() {
		return bullet;
	},
	update = function(dt) {
		reload = Math.max(reload - dt, 0);
	};

	loop.addToUpdate(id,grenadeLauncher);

	grenadeLauncher.shoot = shoot;
	grenadeLauncher.update = update;
	grenadeLauncher.setBullet = setBullet;
	grenadeLauncher.addBullet = addBullet;
	grenadeLauncher.getBullet = getBullet;
	return Object.freeze(grenadeLauncher);
}
