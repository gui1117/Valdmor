/* a static generator that generate flooder
 * when activated
 */

function createManhole(spec) {
	var id = newIdentifier(),
	manhole = {},

	position = spec.position,	

	distance = MH_DISTANCE,
	deltaTime = MH_DELTA_TIME,

	nextTime = 0,
	time = 0,

	update = function(dt) {
		var d;
		time += dt;

		while (time > nextTime) {
			nextTime += deltaTime;

			d = getDistance(position,character.getPosition());
			if (d < distance) {
				createFlooder({
					position : position
				});
			}
		}
	},
	draw = function() {
		phys2DDebug.drawCircle(position[0],position[1],20,[0.5,1,0.5,1]);
	};

	loop.addToUpdate(id,manhole);
	loop.addToDraw(id,manhole);

	manhole.update = update;
	manhole.draw = draw;
	return Object.freeze(manhole);
}
