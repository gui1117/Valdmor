function createPunch(spec) {
	var spec = spec || {};

	return createShotgun({
		immune : spec.immune,
		height : spec.height || PU_HEIGHT,
		smallWidth : spec.width || PU_WIDTH,
		bigWidth : spec.width || PU_WIDTH,
		reloadTime : spec.reloadTime || PU_RELOAD_TIME,
		magazin : 1,
		soundIntensity : spec.soundIntensity || PU_SOUND_INTENSITY,
		damage : spec.damage || PU_DAMAGE,
		shootSoundName : spec.shootSoundName || PU_SHOOT_SOUND,
		soundVolume : spec.soundVolume || PU_SOUND_VOLUME,
	});
}
