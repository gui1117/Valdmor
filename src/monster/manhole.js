/* a static generator that generate flooder
 * when activated
 */

function createManhole(spec) {
	var id = newIdentifier(),
	manhole = {},

	position = spec.position,	

	min_distance = MH_MIN_DISTANCE,
	max_distance = MH_MAX_DISTANCE,
	deltaTime = MH_DELTA_TIME,

	nextTime = 0;
	time = 0;

	update = function(dt) {
		var d;
		time += dt;

		while (time > nextTime) {
			nextTime += deltaTime;

			d = getDistance(position,character.getPosition());
			if (alarm.isOn() && d < max_distance && d > min_distance) {
				createFlooder({
					position : position
				});
			}
		}
	}

	loop.addToUpdate(id,manhole);

	manhole.update = update;
	return Object.freeze(manhole);
}
