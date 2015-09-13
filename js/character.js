initCharacter = function(){
	var rad = 12;
	var velocity = 1;
	world.newActive({
		name : "character",
		svgTags : ["rect"],
		gridType : "enemy",
		shapes : [phys2D.createPolygonShape({
			vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad)
		})],
		init: function(obj_add) {
			this.waitTime = 0;
		},
		update : function(dt) {
			var v = velocity;
			if (isDown.Z) {
				if (isDown.Q) {
					this.body.setRotation(-3*Math.PI/4);
				} else if (isDown.D) {
					this.body.setRotation(-Math.PI/4);
				} else if (!isDown.S) {
					this.body.setRotation(-Math.PI/2);
				}
			} else if (isDown.S) {
				if (isDown.Q) {
					this.body.setRotation(3*Math.PI/4);
				} else if (isDown.D) {
					this.body.setRotation(Math.PI/4);
				} else {
					this.body.setRotation(Math.PI/2);
				}
			} else if (isDown.D) {
					this.body.setRotation(0);
			} else if (isDown.Q) {
					this.body.setRotation(Math.PI);
			} else {
				v = 0;
			}
			var r = this.body.getRotation();
			this.body.setVelocity([v*Math.cos(r),v*Math.sin(r)]);
			if (this.waitTime > 0){
				this.waitTime -= 1;
			} else {
				if (isDown.SPACE) {
					this.waitTime = 10;
					var r = this.body.getRotation();
					var p = this.body.getPosition();
					var d = rad;
					d *= 1.1;
					world.action.shootShotgun({
						rotation : this.body.getRotation(),
						position : p,
						distance : d,
					});
				} else if (isDown.B) {
					this.waitTime = 10;
					var r = this.body.getRotation();
					var p = this.body.getPosition();
					var d = rad;
					d *= 1.1;
					world.action.launchGrenade({
						rotation : this.body.getRotation(),
						position : p,
						velocity : 1,
						distance : d
					});
				} else if (isDown.N) {
					this.waitTime = 10;
					var r = this.body.getRotation();
					var p = this.body.getPosition();
					var d = rad;
					d *= 1.1;
					world.action.shootSubmachine({
						rotation : this.body.getRotation(),
						position : p,
						distance : d
					});
				} else if (isDown.V) {
					this.waitTime = 10;
					var r = this.body.getRotation();
					var p = this.body.getPosition();
					var d = rad;
					d *= 1.1;
					world.action.hitSword({
						rotation : this.body.getRotation(),
						position : p,
						distance : d
					});
				}

			}
		},
	});
};
