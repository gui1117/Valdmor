"use strict";

function createShotgun(spec) {
	var id = newIdentifier();
	var shotgun = {};
	spec = spec || {};

	var immuneId = spec.immuneId;
	var immuneMask = spec.immuneMask;
	var height = spec.height || PARAM.SH_HEIGHT;
	var smallWidth = spec.smallWidth || PARAM.SH_SMALL_WIDTH;
	var bigWidth = spec.bigWidth || PARAM.SH_BIG_WIDTH;
	var damage = spec.damage || PARAM.SH_DAMAGE;
	var reloadTime = spec.reloadTime || PARAM.SH_RELOAD_TIME;
	var soundIntensity = spec.soundIntensity || PARAM.SH_SOUND_INTENSITY;
	var division = spec.division || PARAM.SH_DIVISION;

	var shootSound = spec.shootSound || SOUND.SHOTGUN_SHOOT[0];
	var reloadSound = spec.reloadSound || SOUND.SHOTGUN_RELOAD[0];

	var origins = [];
	var index;
	for (index = 0; index < division+1; index++) {
		origins[index] = [0,-smallWidth/2 + smallWidth/division*index];
	}

	var destinations = [];
	for (index = 0; index < division+1; index++) {
		destinations[index] = [height,-bigWidth/2 + bigWidth/division*index];
	}
	var rotations = [];
	for (index = 0; index < division+1; index++) {
		rotations[index] = getAngle(origins[index],destinations[index]);
	}

	var heights = [];
	for (index = 0; index < division+1; index++) {
		heights[index] = getDistance(origins[index],destinations[index]);
	}

	var bullet = 1;
	var reload = 0;
	var shoot = function(spec) {
		var position = spec.position;
		var rotation = spec.rotation || 0;
		var store = immuneId;
		var factor = [];

		if (bullet) {
			bullet = 0;
			sound.play(shootSound);
			maze.addSound(position,soundIntensity);
			reload = reloadTime;
			origins.forEach(function(o,index) {
				var cosr = Math.cos(rotation);
				var sinr = Math.sin(rotation);
				var origin = [o[0]*cosr-o[1]*sinr+position[0],o[0]*sinr+o[1]*cosr+position[1]];
				var result = particleAttack({
					origin : origin,
					height : heights[index],
					rotation : rotations[index]+rotation,
					damage : damage,
					immuneId : store,
					immuneMask : immuneMask,
				});
				store = result.immuneId;
				factor.push(result.factor);
			});
		}
	};
	var update = function(dt) {
		if (!bullet) {
			reload = Math.max(reload - dt, 0);
			if (!reload) {
				bullet = 1;
				reload = reloadTime;
//				sound.play(reloadSound); // must be play before and must end here
			}
		}
	};
	var getBullet = function() {
		return bullet;
	};

	loop.addToUpdate(id,shotgun);

	shotgun.shoot = shoot;
	shotgun.update = update;
	shotgun.getBullet = getBullet;
	return Object.freeze(shotgun);
}
