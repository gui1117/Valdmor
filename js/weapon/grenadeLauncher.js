/* TODO
 * vitesse remise a jour dans l'update pendant x seconde
 * puis stop et ensuite explose
 */
function createGrenadeLauncher(spec) {
	var id = newIdentifier(),
	grenadeLauncher = {},
	rad = spec ? spec.radius : 5,
	damage = spec ? spec.damage : 1,
	damageRadius = spec ? spec.damageRadius : 30,
	lifeTime = spec ? spec.lifeTime : 300,
	velocity = spec ? spec.velocty : 3,
	sound = spec ? spec.sound : 1,
	reloadTime = spec ? spec.reloadTime : 800,

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
		life = lifeTime,
		remove = function() {
			loop.removeOfUpdate(id);
			world.removeRigidBody(body);
		},
		update = function(dt) {
			var store;
			life -= dt;
			body.setVelocity(v);

			if (life <= 0) {
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
			life = 0;
		};

		world.addRigidBody(body);
		loop.addToUpdate(id,grenade);


		grenade.damage = damage;
		grenade.update = update;
		return Object.freeze(grenade);
	},
	shoot = function(spec) {
		var p = spec.position;
		d = spec.distance,
		v = spec.velocity || velocity,
		r = spec.rotation;

		if (!reload) {
			createGrenade({
				rotation : r,
				position : [p[0]+(d+rad)*Math.cos(r),p[1]+(d+rad)*Math.sin(r)],
				velocity : [v*Math.cos(r),v*Math.sin(r)],

			});
			reload = reloadTime;
		}
	},
	update = function(dt) {
		reload = Math.max(reload - dt, 0);
	};

	loop.addToUpdate(id,grenadeLauncher);

	grenadeLauncher.shoot = shoot;
	grenadeLauncher.update = update;
	return Object.freeze(grenadeLauncher);
}
