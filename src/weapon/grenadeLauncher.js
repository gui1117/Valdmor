function createGrenadeLauncher(spec) {
	var id = newIdentifier(),
	grenadeLauncher = {},

	rad = spec ? spec.radius : GL_RADIUS,
	damage = spec ? spec.damage : GL_DAMAGE,
	damageRadius = spec ? spec.damageRadius : GL_DAMAGE_RADIUS,
	velocity = spec ? spec.velocty : GL_VELOCITY,
	velocityTime = spec ? spec.velocityTime : GL_VELOCITY_TIME,
	lifeTime = spec ? spec.lifeTime : GL_LIFE_TIME,
	soundIntensity = spec ? spec.soundIntensity : GL_SOUND_INTENSITY,
	reloadTime = spec ? spec.reloadTime : GL_RELOAD_TIME,
	bullet = spec ? spec.bullet : 0,

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
			var store,
			time = TurbulenzEngine.getTime();

			if (time < timeToStop) {
				body.setVelocity(v);
			}

			if (life === 0 || time > timeToDie) {
				store = [];
				world.bodyCircleQuery(body.getPosition(), damageRadius, store);
				if (debugBool) {
					var p = body.getPosition(),
						id = newIdentifier();
					maze.addSound(p,soundIntensity);
					loop.addToDraw(id, { draw : function(){ phys2DDebug.drawCircle(p[0],p[1],damageRadius,[1,1,0,1])}});
					loop.removeOfDraw(id);
				}
				store.forEach(function(ent) {
					if (ent.damage) {
						ent.damage(damage);
					}
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
