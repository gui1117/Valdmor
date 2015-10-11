function createGrenadeLauncher(spec) {
	var id = newIdentifier(),
	grenadeLauncher = {},
	spec = spec || {},

	rad = spec.radius || GL_RADIUS,
	damageAmount = spec.damage || GL_DAMAGE,
	damageRadius = spec.damageRadius || GL_DAMAGE_RADIUS,
	velocity = spec.velocty || GL_VELOCITY,
	velocityTime = spec.velocityTime || GL_VELOCITY_TIME,
	lifeTime = spec.lifeTime || GL_LIFE_TIME,
	soundIntensity = spec.soundIntensity || GL_SOUND_INTENSITY,
	reloadTime = spec.reloadTime || GL_RELOAD_TIME,
	bullet = spec.bullet || 0,

	shootSoundName = spec.shootSoundName || GL_SHOOT_SOUND,
	shootSoundVolume = spec.shootSoundVolume || GL_SHOOT_SOUND_VOLUME,

	shootSound  = soundDevice.createSound({
		src : 'assets/sounds/'+shootSoundName,
		uncompress: false,
	}),

	explosionSoundName = spec.explosionSoundName || GL_EXPLOSION_SOUND,
	explosionSoundVolume = spec.explosionSoundVolume || GL_EXPLOSION_SOUND_VOLUME,

	explosionSound  = soundDevice.createSound({
		src : 'assets/sounds/'+explosionSoundName,
		uncompress: false,
	}),


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
			group : BULLET_GROUP,
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
				soundSource.play(explosionSound);
				damageShape = phys2D.createCircleShape({
					sensor : true,
					radius : damageRadius,
					group : DAMAGE_GROUP,
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
			soundSource.play(shootSound);
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
