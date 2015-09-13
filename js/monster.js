initMonster = function() {
	var r = 10;
	var life = 1;
	var timeDecision = 10;
	var viewWidth = 20;
	var viewHeight = 20;

	world.newActive({
		name : "monster",
		gridType : "neutral",
		svgTags : ["rect"],
		shapes : [phys2D.createPolygonShape({
			vertices : phys2D.createRectangleVertices(-r,-r,r,r)
		})],
		init : function(obj_add) {
			this.life = life;
			this.timeDecision = timeDecision;
			this.view = [];
			for (var i=0; i<=viewWidth; i++) {
				this.view[i] = [];
				this.view[i].length = viewHeight + 1;
			}
		},
		update : function(dt) {
			if (this.life <= 0) {
				this.remove();
				return;
			}
			if (this.timeDecision <=0) {
				world.grid.getView(
						this.body.getPosition(),
						viewWidth,viewHeight,
						this.view);
			} else {
				this.timeDecision--;
			}
			
		},
		damage : function(dl) {
			this.life -= dl;
		}
	});
};
