initCharacter = function(){
	var rad = 15;
	var velocity = 1;
	world.newActive({
		name : "character",
		svgTags : ["rect"],
		shapes : [phys2D.createPolygonShape({
			vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad)
		})],
		init: function(obj_add) {
			this.waitTime = 0;
		},
		update : function(dt) {
			var v = velocity;
			if (isDown.W) {
				if (isDown.A) {
					this.body.setRotation(-3*Math.PI/4);
				} else if (isDown.D) {
					this.body.setRotation(-Math.PI/4);
				} else if (!isDown.S) {
					this.body.setRotation(-Math.PI/2);
				}
			} else if (isDown.S) {
				if (isDown.A) {
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
			if (isDown.SPACE && this.waitTime <= 0) {
				this.waitTime = 10;
				var r = this.body.getRotation();
				var p = this.body.getPosition();
				//var d = rad + 5;
				var d = rad + 15;
				d *= 1.1;
				p = [p[0]+d*Math.cos(r),p[1]+d*Math.sin(r)];
				world.hyperactive.shotgun.add({
					rotation : this.body.getRotation(),
					position : p,
					//life : 100
				});
			} else if (this.waitTime > 0) {
				this.waitTime -= 1;
			}
		},
	});
};
