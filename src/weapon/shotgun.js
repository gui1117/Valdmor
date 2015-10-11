function createShotgun(spec) {
	var id = newIdentifier(),
	shotgun = {},
	spec = spec || {},

	immune = spec.immune,
	height = spec.height || PARAM.SH_HEIGHT,
	smallWidth = spec.smallWidth || PARAM.SH_SMALL_WIDTH,
	bigWidth = spec.bigWidth || PARAM.SH_BIG_WIDTH,
	damage = spec.damage || PARAM.SH_DAMAGE,
	reloadTime = spec.reloadTime || PARAM.SH_RELOAD_TIME,
	magazin = spec.magazin || PARAM.SH_MAGAZIN,
	soundIntensity = spec.soundIntensity || PARAM.SH_SOUND_INTENSITY,
	shootSound = spec.shootSound || SOUND.SHOTGUN_SHOOT[0],

	shape =  phys2D.createPolygonShape({
		vertices : [
			[0,-smallWidth/2],
			[height,-bigWidth/2],
			[height,bigWidth/2],
			[0,smallWidth/2 ]
		],
		group : GROUP.DAMAGE,
	}),

	bullet = 0,
	reload = 0,
	shoot = function(spec) {
		var position = spec.position,
		rotation = spec.rotation || 0;

		if (bullet) {
			bullet--;
			sound.play(shootSound);
			maze.addSound(position,soundIntensity);
			reload = reloadTime;
			shapeAttack({
				position : position,
				damage : damage,
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
