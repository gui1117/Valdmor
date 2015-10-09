/* a static generator that generate flooder
 * when activated
 */

function createManhole(spec) {
	var id = newIdentifier(),
	manhole = {},

	position = spec.position,	
	distance = spec.distance || 2000,
	deltaTime = spec.deltaTime || 200,

	nextTime = 0;
	time = 0;

	update = function(dt) {
		var d;
		time += dt;

		while (time > nextTime) {
			nextTime += deltaTime;

			d = getDistance(position,character.getPosition());
			if (alarm.isOn() && d < distance) {
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
