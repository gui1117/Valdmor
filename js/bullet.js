//TODO the position must be the position of the center of back of the bullet

initGrenade = function() {
	var rad = 5;
	var damage = 1;
	var damageRadius = 10;
	var v = 1;

	world.newHyperactive({
		name : "grenade",
		shapes : [phys2D.createPolygonShape({
			vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad)
		})],
		velocity : v,
		init : function(obj_add){
			this.life = obj_add.life;
		},
		update : function(dt) {
			this.life -= dt;
			if (this.life <= 0) {
				store = [];
				world.physicWorld.bodyCircleQuery(this.body.getPosition(), damageRadius, store);
				for (var i = 0; i < store.length; i++) {
					var ent = store[i].userData;
					if (ent.damage) {
						ent.damage(damage);
					}
				}
				this.remove();
			}
		},

	});
};

initShotgun = function() {
	var h = 30;
	var bw = 5;
	var fw = 10;
	var damage = 1;

	var v0 = new Physics2DDevice.prototype.floatArray(2);
	v0[0] = -h/2;
	v0[1] = -bw/2;
	var v1 = new Physics2DDevice.prototype.floatArray(2);
	v1[0] = -h/2;
	v1[1] = bw/2;
	var v2 = new Physics2DDevice.prototype.floatArray(2);
	v2[0] = h/2;
	v2[1] = fw/2;
	var v3 = new Physics2DDevice.prototype.floatArray(2);
	v3[0] = h/2;
	v3[1] = -fw/2;

	var shape = phys2D.createPolygonShape({
		sensor : true,
		vertices : [v0,v1,v2,v3]
	})

	var handler = function(arbitrer,otherShape) {
		if (this.body.userData 
				&& this.body.userData.damage) {
			this.body.userData.damage(damage);
		}
		otherShape.body.userData.collide = true;
	}
	shape.addEventListener("begin",handler);

	world.newHyperactive({
		name : "shotgun",
		shapes : [shape],
		eventListener : {
			begin : handler
		},
		update : function(dt) {
			if (this.collide || this.updated) {
				this.remove();
			} else {
				this.updated = true;
			}
		},
	});
};
