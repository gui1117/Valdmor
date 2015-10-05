function createGrenadeLauncher(spec) {
	var id = newIdentifier(),
	grenadeLauncher = {},
	rad = spec ? spec.radius : 5,
	damage = spec ? spec.damage : 1,
	damageRadius = spec ? spec.damageRadius : 30,
	lifeTime = spec ? spec.lifeTime : 100,
	reloadTime = spec ? spec.reloadTime : 30,
	velocity = spec ? spec.velocty : 10,
	sound = spec ? spec.sound : 1,

	createGrenade = function(spec) {
		var id = newIdentifier(),
		grenade = {},
		p = spec.position,
		r = spec.rotation,
		v = spec.velocity,

		shape = phys2D.createPolygonShape({
			sensor : true,
			vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad),
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
		time = 0,
		remove = function() {
			loop.removeOfUpdate(id);
			world.removeRigidBody(body);
		},
		update = function(dt) {
			var store;
			time += dt;

			if (life <= 0 || time >= lifeTime) {
				store = [];
				world.bodyCircleQuery(body.getPosition(), damageRadius, store);
				if (debugBool) {
					var p = body.getPosition(),
						id = newIdentifier();
					maze.addSound(p,sound);
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
			life -= d;
		};

		world.addRigidBody(body);
		loop.addToUpdate(id,grenade);


		grenade.damage = damage;
		grenade.update = update;
		return Object.freeze(grenade);
	},
	shoot = function(spec) {
		var p = spec.position;
		var d = spec.distance;
		var v = spec.velocity || velocity;
		var r = spec.rotation;

		createGrenade({
			rotation : r,
			position : [p[0]+(d+rad)*Math.cos(r),p[1]+(d+rad)*Math.sin(r)],
			velocity : [v*Math.cos(r),v*Math.sin(r)],

		});

	},
	update = function() {
	},
	reload = function() {
	};

	loop.addToUpdate(id,grenadeLauncher);

	grenadeLauncher.shoot = shoot;
	grenadeLauncher.update = update;
	return Object.freeze(grenadeLauncher);
}
