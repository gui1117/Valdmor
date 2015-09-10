initBullet = function() {
	var rad = 5;
	var damage = 1;
	var damageRadius = 10;
	var v = 1;

	world.newHyperactive({
		name : "bullet",
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
						console.log("damage");
						ent.damage(damage);
					}
				}
				this.remove();
			}
		},

	});
};
