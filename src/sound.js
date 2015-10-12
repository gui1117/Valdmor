"use strict";

function createSound(spec) {
	var sound = {};
	var store = {};
	var source = soundDevice.createSource({
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
	});

	var play = function(s) {
		source.play(store[s]);
	};

	Object.keys(SOUND).forEach(function(key) {
		store[SOUND[key][0]] = soundDevice.createSound({
			src : 'assets/sounds/'+SOUND[key][0],
			uncompress: false,
		});
	});

	sound.play = play;
	return Object.freeze(sound);
}
