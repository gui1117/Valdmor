initMonster = function() {
	var r = 10;
	var life = 1;
	world.newActive({
		name : "monster",
		svgTags : ["rect"],
		shapes : [phys2D.createPolygonShape({
			vertices : phys2D.createRectangleVertices(-r,-r,r,r)
		})],
		init : function(obj_add) {
			this.life = life;
		},
		update : function(dt) {
			if (this.life <= 0) {
				this.remove();
			}
		},
		damage : function(dl) {
			this.life -= dl;
		}
	});
};
