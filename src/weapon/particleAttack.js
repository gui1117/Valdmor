"use strict";

function particleAttack(spec) {
	var origin = spec.origin;
	var mask = spec.mask || GROUP.WALL;
	var damage = spec.damage;
	var immuneId = spec.immuneId || []; // array of id

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
	immuneId.forEach(function(id) {
		ignored[id] = true;
	});

	var wallTouched = false;
	var filter = function(ray, tmpResult) {
		if (!wallTouched) {
			var userData = tmpResult.shape.body.userData;
			if (userData && userData.damage && !ignored[userData.id]) {
				userData.damage(damage);
				ignored[userData.id] = true;
			}
			var group = tmpResult.shape.getGroup();

			if (group & mask) {
				wallTouched = true;
				return true;
			} 
		}
		return false;
	};
	var result = world.rayCast(ray, true, filter);

	immuneId = [];
	Object.keys(ignored).forEach(function(key) {
		immuneId.push(key);
	});

	if (debugBool) {
		var debi = newIdentifier();
		var debr = rotation;
		var debf = result ? result.factor*height : height;
		var debdestination = [origin[0]+debf*Math.cos(debr),origin[1]+debf*Math.sin(debr)]
		loop.addToDraw(debi,{
			draw:function(){ phys2DDebug.drawLine(origin[0],origin[1],debdestination[0],debdestination[1],[1,1,0.5,1]); }
		});
		loop.removeOfDraw(debi);
	}



	return { 
		factor : result ? result.factor*height : height,
		immuneId : immuneId, // actually touched + immunedId
	};
}
