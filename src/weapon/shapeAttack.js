function shapeAttack(spec) {
	var shape = spec.shape,
	p = spec.position,
	d = spec.distance || 0,
	r = spec.rotation || 0,
	damage = spec.damage,
	immune = spec.immune || [],

	bounds,store,i,

	isImmuned = function(userData) {
		var result = false;
		immune.forEach(function(immune) {
			if (immune === userData) {
				result = true;
			}
		});
		return result;
	},

	body = phys2D.createRigidBody({
		type : 'static',
		shapes : [shape],
		position : [p[0]+d*Math.cos(r),p[1]+d*Math.sin(r)],
		rotation : r,
	});

	if (debugBool) {
		i = newIdentifier();
		loop.addToDraw(i,{
			draw:function(){ phys2DDebug.drawRigidBody(body); }
		});
		loop.removeOfDraw(i);
	}

	bounds = body.computeWorldBounds();

	store = [];
	world.shapeRectangleQuery(bounds,store);

	for (i=0; i<store.length; i++) {
		if (phys2DCollision.intersects(shape,store[i])) {
			if (store[i].body.userData 
					&& store[i].body.userData.damage 
					&& !isImmuned(store[i].body.userData)) {
				store[i].body.userData.damage(damage);
			}
		}
	}
}
