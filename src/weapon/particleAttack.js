function particleAttack(spec) {
	var origin = spec.origin;
	var mask = spec.mask || GROUP.WALL;
	var damage = spec.damage;
	var immune = spec.immune; // array of id

	var destination = spec.destination; // this or the two below must be given
	var rotation = spec.rotation;
	var height = spec.height;

	var direction;

	if (spec.destination) {
		direction = [origin[0]-destination[0],origin[1]-destination[1]];
		height = getDistance(direction,origin);
	} else {
		direction = [height*Math.cos(rotation),height*Math.sin(rotation)];
	}

	var ray = {
		origin : origin,
		direction : direction,
		maxFactor : 1,
	};

	
	var ignored = {};
	immune.forEach(function(id) {
		ignored[id] = true;
	});

	var filter = function(ray, tmpResult) {
		var userData = tmpResult.shape.body.userData;
		if (userData && userData.damage && !ignored[userData.id]) {
			userData.damage(damage);
			ignored[userData.id] = true;
		}
		var group = tmpResult.shape.getGroup();

		if (group & mask) {
			return true;
		} 
		return false;
	};


	var result = world.rayCast(ray, true, filter);

	immune = [];
	Object.keys(ignored).forEach(function(key) {
		immune.push(key);
	});

	return { 
		factor : result ? result.factor*height : height,
		immune : immune,
	};
}
