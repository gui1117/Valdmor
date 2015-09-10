var world = {};

var phys2D = Physics2DDevice.create({});

world.passive = {};
world.active = {};
world.hyperactive = {};

world.newActive = function(obj) {
	var name = obj.name;
	if (!name) {
		console.log("error : newActive without name");
		return 
	} else if (world.active.name) {
		console.log("error : newActive name already used");
		return
	}

	world.active[name] = {
		svgTags : obj.svgTags || [],
		shapes : obj.shapes || [obj.shape],
		array : [],
		add : function(obj_add) {
			var act = {
				type : "active",
				init : obj.init,
				update : obj.update,
				remove : function() {
					world.physicWorld.removeRigidBody(this.body);
					var index = world.active[name].array.indexOf(this);
					world.active[name].array.slice(index,index);
				},
				life : obj.life,
				damage : obj.damage,
			};
			var shapes = [];
			for (var i = 0; i < this.shapes.length; i++) {
				shapes.push(this.shapes[i].clone());
			}
			act.body = phys2D.createRigidBody({
				type : 'dynamic',
				shapes : shapes,
				sleeping : false,
				bullet : false,
				position : obj_add.position || [obj_add.x, obj_add.y],
				rotation : obj_add.rotation || 0,
				userData : act
			});
			world.active[name].array.push(act);
			world.physicWorld.addRigidBody(act.body);
			if (obj.init) {
				act.init(obj_add);
			}
		},
		clear : function() {
			for (var i = 0; i < this.array.length; i++) {
				var act = this.array[i];
				act.body.world.removeRigidBody(act.body);
			}
			this.array = [];
		},
		update : function(dt) {
			for (var i = 0; i < this.array.length; i++) {
				if (this.array[i].update) {
					this.array[i].update();
				};
			}
		}
	}
}

world.newHyperactive = function(obj) {
	var name = obj.name;
	if (!name) {
		console.log("error : newhyperactive without name");
		return 
	} else if (world.hyperactive.name) {
		console.log("error : newhyperactive with name already used");
		return
	}

	world.hyperactive[name] = {
		shapes : obj.shapes || [obj.shape],
		array : [],
		cursor : 0,
		add : function(obj_add) {
			var hyp = {
				update : obj.update, 
				init : obj.init,
				remove : function() {
					world.physicWorld.removeRigidBody(this.body);
					var index = world.hyperactive[name].array.indexOf(this);
					world.hyperactive[name].array[index] = null;
				},
			};
			var shapes = [];
			for (var i = 0; i < this.shapes.length; i++) {
				shapes.push(this.shapes[i].clone());
			}
			var v = obj_add.velocity || obj.velocity || 0;
			var r = obj_add.rotation || obj.rotation || 0;
			hyp.body = phys2D.createRigidBody({
				type : 'dynamic',
				shapes : shapes,
				sleeping : false,
				bullet : true,
				position : obj_add.position || [0,0],
				rotation : r,
				velocity : [v*Math.cos(r),v*Math.sin(r)],
				linearDrag : obj_add.linearDrag || obj.linearDrag || 0,
				angularDrag : obj_add.angularDrag || obj.angularDrag || 0,
				userData : hyp 
			});
			if (this.array[this.cursor]) {
				world.physicWorld.removeRigidBody(this.array[this.cursor]);
			}
			this.array[this.cursor] = hyp;
			this.cursor = (this.cursor + 1) % (obj.length || 255);
			world.physicWorld.addRigidBody(hyp.body);
			if (obj.init) {
				hyp.init(obj_add);
			}
		},
		clear : function() {
			for (var i = 0; i < this.array.length; i++) {
				var bullet = this.array[i];
				if (bullet && bullet.body) {
					bullet.body.world.removeRigidBody(bullet.body);
				}
			}
			this.array = [];
		},
		update : function(dt) {
			for (var i = 0; i < this.array.length; i++) {
				if (this.array[i] && this.array[i].update) {
					this.array[i].update(dt);
				}
			}
		}
	}
};

world.init = function() {
	initMonster();
	initWall();
	initCharacter();
	initBullet();
}

world.clear = function() {
	for (var i in world.passive) {
		world.passive[i].clear();
	}
	for (var i in world.active) {
		world.active[i].clear();
	}
	for (var i in world.hyperactive) {
		world.hyperactive[i].clear();
	}
	world.physicWorld = phys2D.createWorld({
		gravity : [0, 0],
		velocityIterations : 8,
		positionIterations : 8,
	});
}

world.loadmap = function(map_svg) {

	world.clear();

	var arrayTags = [];
	for (var i in world.passive) {
		arrayTags = arrayTags.concat(world.passive[i].svgTags);
	}
	for (var i in world.active) {
		arrayTags = arrayTags.concat(world.active[i].svgTags);
	}

	var mapObject = parseXml(map_svg,arrayTags);
	var g = mapObject.svg.g;

	for (var i = 0; i < g.length; i++) {

		var layer = g[i];
		if (world.passive[layer.id]) {

			for (var t = 0; t < world.passive[layer.id].svgTags.length; t++) {
				var tag = world.passive[layer.id].svgTags[t];
				if (layer[tag]) {
					for (var obj = 0; obj < layer[tag].length; obj++) {
						layer[tag][obj].tag = tag;
						world.passive[layer.id].add(layer[tag][obj]);
					}
				}
			}

		} else if (world.active[layer.id]) {

			for (var t = 0; t < world.active[layer.id].svgTags.length; t++) {
				var tag = world.active[layer.id].svgTags[t];
				if (layer[tag]) {
					for (var obj = 0; obj < layer[tag].length; obj++) {
						layer[tag][obj].tag = tag;
						world.active[layer.id].add(layer[tag][obj]);
					}
				}
			}

		}
	}

	for (var i in world.passive) {
		world.passive[i].create();
	}
};

world.update = function(dt) {
	for (var i in world.hyperactive) {
		world.hyperactive[i].update(dt);
	}
	for (var i in world.active) {
		world.active[i].update(dt);
	}
	world.physicWorld.step(dt);
};
