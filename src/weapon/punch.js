function createPunch(spec) {
	var spec = spec || {};

	return createShotgun({
		immune : spec.immune,
		height : spec.height || PARAM.PU_HEIGHT,
		smallWidth : spec.width || PARAM.PU_WIDTH,
		bigWidth : spec.width || PARAM.PU_WIDTH,
		reloadTime : spec.reloadTime || PARAM.PU_RELOAD_TIME,
		magazin : 1,
		soundIntensity : spec.soundIntensity || PARAM.PU_SOUND_INTENSITY,
		damage : spec.damage || PARAM.PU_DAMAGE,
		shootSound : spec.shootSound || SOUND.PUNCH_SHOOT[0],
	});
}
