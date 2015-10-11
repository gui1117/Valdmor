function createSound(spec) {
	var sound = {},
	store = {},
	source = soundDevice.createSource({
		position : mathDevice.v3Build(0, 0, 0),
		direction : mathDevice.v3Build(0, 0, -1),
		velocity : mathDevice.v3Build(0, 0, 0),
		gain: 1.0,
		minDistance: 1.0,
		maxDistance: 100.0,
		rollOff: 1.0,
		relative: false,
		looping: false,
		pitch: 1.0
	}),

	play = function(s) {
		source.play(store[s]);
	};

	for (s in SOUND) {
		store[SOUND[s][0]] = soundDevice.createSound({
			src : 'assets/sounds/'+SOUND[s][0],
			uncompress: false,
		});
	}

	sound.play = play;
	return Object.freeze(sound);
}
