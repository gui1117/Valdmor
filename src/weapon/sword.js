function createSword(spec) {
	var id = newIdentifier();
	var sword = {};
	var spec = spec || {};

	var immuneId = spec.immuneId; //array of id
	var immuneMask = spec.immuneMask;
	var height = spec.height || PARAM.SW_HEIGHT;
	var distance = spec.distance || PARAM.SW_DISTANCE;
	var width = spec.width || PARAM.SW_INNER_WIDTH;
	var recoveryTime = spec.recovery || PARAM.SW_RECOVERY;
	var damage = spec.damage || PARAM.SW_DAMAGE;
	var soundIntensity = spec.soundIntensity || PARAM.SW_SOUND_INTENSITY;

	var attackSound = spec.attackSound || SOUND.SWORD_ATTACK[0];

	var shape = phys2D.createPolygonShape({
		vertices : [
			[-height/2,-width/2],
			[height/2,-width/2],
			[height/2,width/2],
			[-height/2,width/2]
		],
		group : GROUP.DAMAGE,
	});

	var recovery = 0;
	var attack = function(spec) {
		var position = spec.position;
		var rotation = spec.rotation;

		if (!recovery) {
			recovery = recoveryTime;
			maze.addSound(position,soundIntensity);
			sound.play(attackSound);
			shapeAttack({
				immuneId : immuneId,
				immuneMask : immuneMask,
				shape : shape,
				width : width,
				height : height,
				position : position,
				rotation : rotation,
				distance : distance,
				damage : damage,
			});
		}
	};

	var update = function(dt) {
		if (recovery) {
			recovery = Math.max(recovery - dt, 0);
			if (recovery === 0) {
				// play sound ?
			}
		}
	};

	loop.addToUpdate(id,sword);

	sword.attack = attack;
	sword.update = update;
	return Object.freeze(sword);
}
