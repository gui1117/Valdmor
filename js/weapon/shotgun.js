function createShotgun(spec) {
	var id = newIdentifier(),
	shotgun = {},

	height = spec.height || 320,
	smallWidth = spec.smallWidth || 15,
	bigWidth = spec.bigWidth || 100,
	immune = spec.immune,
	damage = spec.damage || 1,
	reloadTime = spec.reloadTime || 800,
	magazin = spec.magazin || 8,
	soundIntensity = spec.soundIntensity || 2,

	shape =  phys2D.createPolygonShape({
		vertices : [[0,-smallWidth/2],[height,-bigWidth/2],[height,bigWidth/2],[0,smallWidth/2]],
	}),

	bullet = 0,
	reload = 0,
	shoot = function(spec) {
		var position = spec.position,
		rotation = spec.rotation || 0;

		if (bullet) {
			bullet--;
			maze.addSound(position,soundIntensity);
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
		if (!bullet) {
			reload = Math.max(reload - dt, 0);
			if (!reload) {
				bullet = magazin;
				reload = reloadTime;
			}
		}
	},
	getBullet = function() {
		return bullet;
	},
	getMagazin = function() {
		return magazin;
	};

	loop.addToUpdate(id,shotgun);

	shotgun.shoot = shoot;
	shotgun.update = update;
	shotgun.getBullet = getBullet;
	shotgun.getMagazin = getMagazin;
	return Object.freeze(shotgun);
}
