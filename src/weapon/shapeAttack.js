"use strict";

function shapeAttack(spec) {
	/* specification */
	var shapes = spec.shapes || [spec.shape];
	var p = spec.position;
	var d = spec.distance || 0;
	var r = spec.rotation || 0;
	var width = spec.width;
	var height = spec.height;
	var damage = spec.damage;
	var immuneId = spec.immuneId || [];
	var immuneMask = spec.immuneMask || 0;
	//	var opaqueMask = spec.opaqueMask || GROUP.WALL; // not implemented
	/* end specification */

	var body = phys2D.createRigidBody({
		type : 'static',
		shapes : shapes,
		position : [p[0]+d*Math.cos(r),p[1]+d*Math.sin(r)],
		rotation : r,
	});

	var intersect = function(otherShape) {
		return body.shapes.some(function(shape) {
			return phys2DCollision.intersects(shape,otherShape);
		});
	}

	if (debugBool) {
		var debi = newIdentifier();
		loop.addToDraw(debi,{draw:function(debug){if(debug){phys2DDebug.drawRigidBody(body);}}});
		loop.removeOfDraw(debi);
	}

	loop.addToDrawDamage(p,width/2,height/2,r);

	var store = [];
	var bounds = body.computeWorldBounds();
	world.shapeRectangleQuery(bounds,store);

	store.forEach(function(otherShape) {
		var userData = otherShape.body.userData;

		if (userData && userData.damage
				&& !(otherShape.getGroup() & immuneMask)
				&& (!userData.id || immuneId.indexOf(userData.id) === -1)
				&& intersect(otherShape)) {

			userData.damage(damage);
		}
	});
}
