function createGrenadeLauncher(spec) {
	var id = newIdentifier();
	var grenadeLauncher = {};
	var spec = spec || {};

	var immuneId = spec.immuneId || [];
	var immuneMask = spec.immuneMask || 0;
	var division = spec.division || PARAM.GL_DIVISION;
	var rad = spec.radius || PARAM.GL_RADIUS;
	var damageAmount = spec.damage || PARAM.GL_DAMAGE;
	var damageRadius = spec.damageRadius || PARAM.GL_DAMAGE_RADIUS;
	var velocity = spec.velocty || PARAM.GL_VELOCITY;
	var velocityTime = spec.velocityTime || PARAM.GL_VELOCITY_TIME;
	var lifeTime = spec.lifeTime || PARAM.GL_LIFE_TIME;
	var soundIntensity = spec.soundIntensity || PARAM.GL_SOUND_INTENSITY;
	var reloadTime = spec.reloadTime || PARAM.GL_RELOAD_TIME;
	var bullet = spec.bullet || 0;

	var shootSound  = spec.shootSound || SOUND.GRENADELAUNCHER_SHOOT[0];

	var explosionSound = spec.explosionSound || SOUND.GRENADELAUNCHER_EXPLOSION[0];

	var reload = 0;

	var index;
	var rotations = [];
	for (index = 0; index < division+1; index++) {
		rotations[index] = 2*Math.PI*index/(division+1);
	}

	var createGrenade = function(spec) {
		var id = newIdentifier();
		var grenade = {};
		var p = spec.position;
		var r = spec.rotation;
		var v = spec.velocity;

		var shape = phys2D.createPolygonShape({
			sensor : true,
			vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad),
			group : GROUP.BULLET,
			userData : grenade,
		});
		var body = phys2D.createRigidBody({
			type : 'kinetic',
			shapes : [shape],
			sleeping : false,
			bullet : true,
			position : p,
			velocity : v,
			rotation : r,
			userData : grenade,
		});
		var life = 1;
		var timeToStop = TurbulenzEngine.getTime() + velocityTime;
		var timeToDie = TurbulenzEngine.getTime() + lifeTime;
		var remove = function() {
			if (mode === 'timer') {
				loop.removeOfDraw(id);
			}
			loop.removeOfUpdate(id);
			world.removeRigidBody(body);
		};

		var sprite = Draw2DSprite.create({
			width : rad,
			height : rad,
			color : COLOR.BULLET,
			x : p[0],
			y : p[1],
			scale : [1, 1],
		});
		var update = function(dt) {
			var time = TurbulenzEngine.getTime();

			var store = immuneId;
			var factor = [];

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


				rotations.forEach(function(rotation) {
					var result = particleAttack({
						origin : body.getPosition(),
						height : damageRadius,
						rotation : rotation,
						damage : damageAmount,
						immuneId : store,
						immuneMask : immuneMask,
					});
					store = store.concat(result.touched);
					factor.push(result.factor);
				});
				remove();
			}
			camera.setSpriteAttribute(sprite,body.getPosition(),body.getRotation());
		};

		var draw = function(debug) {
			if (!debug) {
				draw2D.drawSprite(sprite);
			}
		};
		var damage = function(d) {
			life = 0;
		};

		shape.addEventListener('begin',damage);
		world.addRigidBody(body);
		loop.addToUpdate(id,grenade);
		loop.addToDraw(id,grenade);


		grenade.damage = damage;
		grenade.update = update;
		grenade.draw = draw;
		return Object.freeze(grenade);
	};
	var shoot = function(spec) {
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
	};
	var setBullet = function(n) {
		bullet = n;
	};
	var addBullet = function(n) {
		bullet += n;
	};
	var getBullet = function() {
		return bullet;
	};
	var update = function(dt) {
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
