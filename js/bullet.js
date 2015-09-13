initGrenade = function() {
	var rad = 5;
	var damage = 1;
	var damageRadius = 30;
	var life = 100;

	world.action.launchGrenade = function(obj) {
		var p = obj.position;
		var d = obj.distance;
		var v = obj.velocity;
		var r = obj.rotation;

		world.hyperactive.grenade.add({
			rotation : r,
			position : [p[0]+(d+rad)*Math.cos(r),p[1]+(d+rad)*Math.sin(r)],
			velocity : v,
		});
	};

	world.newHyperactive({
		name : "grenade",
		gridType : "bullet",
		shapes : [phys2D.createPolygonShape({
			sensor : true,
			vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad)
		})],
		init : function(obj_add){
			this.life = life;
		},
		update : function(dt) {
			this.life -= dt;
			if (this.life <= 0) {
				store = [];
				world.physicWorld.bodyCircleQuery(this.body.getPosition(), damageRadius, store);
				if (debugBool) {
					var p = this.body.getPosition();
					world.newDebugDraw(function(){phys2DDebug.drawCircle(p[0],p[1],damageRadius,[1,1,0,1])});
				}
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
	var h = 100;
	var bw = 10;
	var fw = 40;
	var damage = 1;

	world.action.shootShotgun = function(obj) {
		var p = obj.position;
		var d = obj.distance;
		var r = obj.rotation;

		var v0 = new Physics2DDevice.prototype.floatArray(2);
		v0[0] = -h/2;
		v0[1] = -bw/2;
		var v1 = new Physics2DDevice.prototype.floatArray(2);
		v1[0] = h/2;
		v1[1] = -fw/2;
		var v2 = new Physics2DDevice.prototype.floatArray(2);
		v2[0] = h/2;
		v2[1] = fw/2;
		var v3 = new Physics2DDevice.prototype.floatArray(2);
		v3[0] = -h/2;
		v3[1] = bw/2;

		var shape = phys2D.createPolygonShape({
			sensor : true,
			vertices : [v0,v1,v2,v3]
		});

		var body = phys2D.createRigidBody({
			type : 'static',
			shapes : [shape],
			position : [p[0]+(d+h/2)*Math.cos(r),p[1]+(d+h/2)*Math.sin(r)],
			rotation : r,
		});

		if (debugBool) {
			var worldPoint = [];
			worldPoint.push(body.transformLocalPointToWorld(v0));
			worldPoint.push(body.transformLocalPointToWorld(v1));
			worldPoint.push(body.transformLocalPointToWorld(v2));
			worldPoint.push(body.transformLocalPointToWorld(v3));

			world.newDebugDraw(function() {
				var wp = worldPoint;
				phys2DDebug.drawLine(wp[0][0],wp[0][1],wp[1][0],wp[1][1],[1,1,0,1]);
				phys2DDebug.drawLine(wp[1][0],wp[1][1],wp[2][0],wp[2][1],[1,1,0,1]);
				phys2DDebug.drawLine(wp[2][0],wp[2][1],wp[3][0],wp[3][1],[1,1,0,1]);
				phys2DDebug.drawLine(wp[3][0],wp[3][1],wp[0][0],wp[0][1],[1,1,0,1]);
			});
		}

		var bounds = body.computeWorldBounds();

		var store = [];
		world.physicWorld.shapeRectangleQuery(bounds,store);

		for (var i=0; i<store.length; i++) {
			if (phys2DCollision.intersects(shape,store[i])) {
				if (store[i].body.userData 
						&& store[i].body.userData.damage) {
					store[i].body.userData.damage(damage);
				}
			}
		}
	};
};

initSubmachine = function() {
	var rad = 5;
	var damage = 1;
	var life = 100;
	var velocity = 1

	world.action.shootSubmachine= function(obj) {
		var p = obj.position;
		var d = obj.distance;
		var r = obj.rotation;

		world.hyperactive.submachine.add({
			rotation : r,
			position : [p[0]+(d+rad)*Math.cos(r),p[1]+(d+rad)*Math.sin(r)],
		});
	};

	world.newHyperactive({
		name : "submachine",
		gridType : "bullet",
		shapes : [phys2D.createPolygonShape({
			sensor : true,
			vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad)
		})],
		velocity : velocity,
		init : function(obj_add){
			this.life = life;
		},
		update : function(dt) {
			this.life -= dt;
			if (this.life <= 0) {
				this.remove();
			}
		},
	});
};

initSword = function() {
	var h = 15;
	var w = 22;
	var damage = 1;

	world.action.hitSword = function(obj) {
		var p = obj.position;
		var d = obj.distance;
		var r = obj.rotation;

		var v0 = new Physics2DDevice.prototype.floatArray(2);
		v0[0] = -h/2;
		v0[1] = -w/2;
		var v1 = new Physics2DDevice.prototype.floatArray(2);
		v1[0] = h/2;
		v1[1] = -w/2;
		var v2 = new Physics2DDevice.prototype.floatArray(2);
		v2[0] = h/2;
		v2[1] = w/2;
		var v3 = new Physics2DDevice.prototype.floatArray(2);
		v3[0] = -h/2;
		v3[1] = w/2;

		var shape = phys2D.createPolygonShape({
			sensor : true,
			vertices : [v0,v1,v2,v3]
		});

		var body = phys2D.createRigidBody({
			type : 'static',
			shapes : [shape],
			position : [p[0]+(d+h/2)*Math.cos(r),p[1]+(d+h/2)*Math.sin(r)],
			rotation : r,
		});

		if (debugBool) {
			var worldPoint = [];
			worldPoint.push(body.transformLocalPointToWorld(v0));
			worldPoint.push(body.transformLocalPointToWorld(v1));
			worldPoint.push(body.transformLocalPointToWorld(v2));
			worldPoint.push(body.transformLocalPointToWorld(v3));

			world.newDebugDraw(function() {
				var wp = worldPoint;
				phys2DDebug.drawLine(wp[0][0],wp[0][1],wp[1][0],wp[1][1],[1,1,0,1]);
				phys2DDebug.drawLine(wp[1][0],wp[1][1],wp[2][0],wp[2][1],[1,1,0,1]);
				phys2DDebug.drawLine(wp[2][0],wp[2][1],wp[3][0],wp[3][1],[1,1,0,1]);
				phys2DDebug.drawLine(wp[3][0],wp[3][1],wp[0][0],wp[0][1],[1,1,0,1]);
			});
		}

		var bounds = body.computeWorldBounds();

		var store = [];
		world.physicWorld.shapeRectangleQuery(bounds,store);

		for (var i=0; i<store.length; i++) {
			if (phys2DCollision.intersects(shape,store[i])) {
				if (store[i].body.userData 
						&& store[i].body.userData.damage) {
					store[i].body.userData.damage(damage);
				}
			}
		}
	};
};
