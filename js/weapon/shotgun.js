function createShotgun(spec) {
	var id = newIdentifier(),
	shotgun = {},

	height = spec.height || 320,
	smallWidth = spec.smallWidth || 15,
	bigWidth = spec.bigWidth || 100,
	immune = spec.immune,
	damage = spec.damage || 1,
	reloadTime = spec.reloadTime || 400,

	shape =  phys2D.createPolygonShape({
		vertices : [[0,-smallWidth/2],[height,-bigWidth/2],[height,bigWidth/2],[0,smallWidth/2]],
	}),

	reload = 0,
	shoot = function(spec) {
		var position = spec.position,
		rotation = spec.rotation || 0;

		if (!reload) {
			reload = reloadTime;
			shapeAttack({
				position : position,
				distance : 0,
				rotation : rotation,
				shape : shape,
				immune : [immune],
			});
		}
	},
	update = function(dt) {
		reload = Math.max(reload - dt, 0);
	};

	loop.addToUpdate(id,shotgun);

	shotgun.shoot = shoot;
	shotgun.update = update;
	return Object.freeze(shotgun);
}
