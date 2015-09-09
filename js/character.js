var character = {
	velocity : 1
};

character.init = function(){
	world.newActive({
		name : "character",
		svgTags : ["rect"],
		shapes : [phys2D.createPolygonShape({
			vertices : phys2D.createRectangleVertices(-15,-15,15,15)
		})],
		updateEntity : function(dt) {
			var v = character.velocity;
			if (isDown.W) {
				if (isDown .A) {
					this.body.setRotation(-3*Math.PI/4);
				} else if (isDown.D) {
					this.body.setRotation(-Math.PI/4);
				} else if (!isDown.S) {
					this.body.setRotation(-Math.PI/2);
				}
			} else if (isDown.S) {
				if (isDown .A) {
					this.body.setRotation(3*Math.PI/4);
				} else if (isDown.D) {
					this.body.setRotation(Math.PI/4);
				} else {
					this.body.setRotation(Math.PI/2);
				}
			} else if (isDown.D) {
					this.body.setRotation(0);
			} else if (isDown.A) {
					this.body.setRotation(Math.PI);
			} else {
				v = 0;
			}
			var r = this.body.getRotation();
			this.body.setVelocity([v*Math.cos(r),v*Math.sin(r)]);
//			this.body.integrate(dt);
		}
	});
};
