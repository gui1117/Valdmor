function createShotgun(spec) {
	var id = newIdentifier();
	var shotgun = {};
	spec = spec || {};

	var immune = spec.immune;
	var height = spec.height || PARAM.SH_HEIGHT;
	var smallWidth = spec.smallWidth || PARAM.SH_SMALL_WIDTH;
	var bigWidth = spec.bigWidth || PARAM.SH_BIG_WIDTH;
	var damage = spec.damage || PARAM.SH_DAMAGE;
	var reloadTime = spec.reloadTime || PARAM.SH_RELOAD_TIME;
	var magazin = spec.magazin || PARAM.SH_MAGAZIN;
	var soundIntensity = spec.soundIntensity || PARAM.SH_SOUND_INTENSITY;
	var division = spec.division || PARAM.SH_DIVISION;

	var shootSound = spec.shootSound || SOUND.SHOTGUN_SHOOT[0];

	var shape =  phys2D.createPolygonShape({
		vertices : [
			[0,-smallWidth/2],
			[height,-bigWidth/2],
			[height,bigWidth/2],
			[0,smallWidth/2 ]
		],
		group : GROUP.DAMAGE,
	});

	var bullet = 0;
	var reload = 0;
	var shoot = function(spec) {
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
	};
	var update = function(dt) {
		if (!bullet) {
			reload = Math.max(reload - dt, 0);
			if (!reload) {
				bullet = magazin;
				reload = reloadTime;
			}
		}
	};
	var getBullet = function() {
		return bullet;
	};
	var getMagazin = function() {
		return magazin;
	};

	loop.addToUpdate(id,shotgun);

	shotgun.shoot = shoot;
	shotgun.update = update;
	shotgun.getBullet = getBullet;
	shotgun.getMagazin = getMagazin;
	return Object.freeze(shotgun);
}
