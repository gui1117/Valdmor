function shapeAttack(spec) {
	var shape = spec.shape,
	p = spec.position,
	d = spec.distance,
	r = spec.rotation,
	damage = spec.damage,

	bounds,store,i;

	var body = phys2D.createRigidBody({
		type : 'static',
		shapes : [shape],
		position : [p[0]+d*Math.cos(r),p[1]+d*Math.sin(r)],
		rotation : r,
	});

	if (debugBool) {
		loop.addToDraw(draw:function(){
			debug.drawRigidBody(body);
		};
	}

	bounds = body.computeWorldBounds();

	store = [];
	world.physicWorld.shapeRectangleQuery(bounds,store);

	for (i=0; i<store.length; i++) {
		if (phys2DCollision.intersects(shape,store[i])) {
			if (store[i].body.userData 
					&& store[i].body.userData.damage) {
				store[i].body.userData.damage(damage);
			}
		}
	}
}
