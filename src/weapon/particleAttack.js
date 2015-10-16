"use strict";

function particleAttack(spec) {
	var origin = spec.origin;
	var opaqueMask = spec.opaqueMask || GROUP.WALL;
	var damage = spec.damage;
	var immuneId = spec.immuneId || []; // array of id
	var immuneMask = spec.immuneMask || 0;

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

	var store = [];
	var filter = function(ray, tmpResult) {
		var body = tmpResult.shape.body;
		var userData = body.userData;
		var group = tmpResult.shape.getGroup();
		var distance;

		if (userData 
				&& !(group & immuneMask)
				&& userData.damage 
				&& (immuneId.indexOf(userData.id) === -1)) {

			distance = getDistance(body.getPosition(),origin);
			store.push([
				userData.id,
				distance,
				userData.damage
			]);
		}
		if (group & opaqueMask) {
			return true;
		}
		return false;
	};
	var result = world.rayCast(ray, true, filter);
	var wallDistance = result ? result.factor*height : height;

	var touched = [];
	store.forEach(function(elem) {
		var id = elem[0];
		if (elem[1] < wallDistance
				&& (touched.indexOf(id) === -1)) {
			elem[2](damage);
			touched.push(id);
		}
	});

	if (debugBool) {
		var debi = newIdentifier();
		var debr = rotation;
		var debf = result ? result.factor*height : height;
		var debdestination = [origin[0]+debf*Math.cos(debr),origin[1]+debf*Math.sin(debr)]
		loop.addToDraw(debi,{
			draw:function(debug){if(debug) { phys2DDebug.drawLine(origin[0],origin[1],debdestination[0],debdestination[1],[1,1,0.5,1]);}}
		});
		loop.removeOfDraw(debi);
	}

	return { 
		factor : result ? result.factor*height : height,
		touched : touched,
	};
}
