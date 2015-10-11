/* doesn't work because of raycast ???? */
function rayCast(spec) {
	var position = spec.position;
	var rotation = spec.rotation;
	var height = spec.height;
	var mask = spec.mask || GROUP.WALL;
	var damage = spec.damage;

	var ray = {
		origin : position,
		direction : [Math.cos(rotation),Math.sin(rotation)],
		maxFactor : height,
	};

	
	var filter = function(ray, tmpResult) {
		var group = tmpResult.shape.getGroup();

		if (group & mask) {
			return true;
		} 
		return false;
	};

	var result = world.rayCast(ray, true, filter);

	if (debugBool) {
		var id = newIdentifier();
		var f = result ? result.factor : height;
		var draw = function() {
			phys2DDebug.drawLine(
					position[0],
					position[1],
					position[0]+f*Math.cos(rotation),
					position[1]+f*Math.sin(rotation),
					[1,1,1,1]
					);
		};
		loop.addToDraw(id,{draw:draw});
		loop.removeOfDraw(id);
	}

	return result ? result.factor : height;
}
