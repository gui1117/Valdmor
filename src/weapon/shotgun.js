function createShotgun(spec) {
	var id = newIdentifier(),
	shotgun = {},
	spec = spec || {},

	immune = spec.immune,
	height = spec.height || SH_HEIGHT,
	smallWidth = spec.smallWidth || SH_SMALL_WIDTH,
	bigWidth = spec.bigWidth || SH_BIG_WIDTH,
	damage = spec.damage || SH_DAMAGE,
	reloadTime = spec.reloadTime || SH_RELOAD_TIME,
	magazin = spec.magazin || SH_MAGAZIN,
	soundIntensity = spec.soundIntensity || SH_SOUND_INTENSITY,

	shape =  phys2D.createPolygonShape({
		vertices : [[0,-smallWidth/2],[height,-bigWidth/2],[height,bigWidth/2],[0,smallWidth/2]],
		group : DAMAGE_GROUP,
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
