wall = {};

wall.init = function() {
	world.passive.wall = {
		svgTags : ["rect","path"],
		material : phys2D.createMaterial({}),
		shapes : [],
		add : function(type,obj) {
			var shape;
			if (type === "rect") 
			{
				var vertices = phys2D.createRectangleVertices(
						obj.x,obj.y,obj.x+obj.width,obj.y+obj.height);
				shape = phys2D.createPolygonShape({
					vertices : vertices,
					material : this.material
				});
			} 
			else if (type === "path") 
			{
				var vertices = [];
				var data = obj.d;
				var x,y;
				var re = /^[^0-9.]*([0-9.]*)[^0-9.]*([0-9.]*)(.*)/;
				var array = re.exec(data);
				while (array[1] && array[2]) {
					data = array[3];
					vertices.push([array[1],array[2]]);
					array = re.exec(data);
				}

				shape = phys2D.createPolygonShape({
					vertices : vertices,
					material : this.material
				});
			} 
			else 
			{
				console.info("add wall but false type : "+type.toString());
				return
			}
			world.passive.wall.shapes.push(shape);
		},
		create : function() {
			if (this.body) {
				this.body.world.removeRigidBody(this.body);
				this.body = null;
			}

			this.body = phys2D.createRigidBody({
				type : 'static',
				shapes : this.shapes,
				sleeping : false,
				bullet : false,
				position : [0, 0],
				rotation : 0,
			});
			world.physicWorld.addRigidBody(world.passive.wall.body);
		},
		clear : function() {
			if (this.body) {
				this.body.world.removeRigidBody(this.body);
				this.body = null;
			}
			this.shapes = [];
		}
	}
};
