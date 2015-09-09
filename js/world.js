var world = {};

var phys2D = Physics2DDevice.create({});

world.passive = {};
world.active = {};

world.newActive = function(obj) {
	var name = obj.name;
	if (!name) {
		console.log("newEntity no name");
		return 
	} else if (world.active.name) {
		console.log("newEntity name already used");
		return
	}

	world.active[name] = {
		svgTags : obj.svgTags || [],
		shapes : obj.shapes || [obj.shape],
		array : [],
		add : function(type,xmlObj) {
			var ent = {
				update : obj.updateEntity || function(dt){}
			};
			var shapes = [];
			for (var i = 0; i < this.shapes.length; i++) {
				shapes.push(this.shapes[i].clone());
			}
			ent.body = phys2D.createRigidBody({
				type : 'dynamic',
				shapes : shapes,
				sleeping : false,
				bullet : false,
				position : [xmlObj.x, xmlObj.y],
				rotation : xmlObj.rotation || 0,
			});
			world.active[name].array.push(ent);
			world.physicWorld.addRigidBody(ent.body);
		},
		clear : function() {
			for (var i = 0; i < this.array.length; i++) {
				var ent = this.array[i];
				ent.body.world.removeRigidBody(ent.body);
			}
			this.array = [];
		},
		update : function(dt) {
			for (var i = 0; i < this.array.length; i++) {
				this.array[i].update(dt);
			}
		}
	}
}

world.newHyperactive = function(obj) {
	var name = obj.name;
	if (!name) {
		console.log("newbullet no name");
		return 
	} else if (world.hyperactive.name) {
		console.log("newbullet name already used");
		return
	}

	var array = [];
	array.length = obj.length || 255;
	world.hyperactive[name] = {
		shapes : obj.shapes || [obj.shape],
		array : array,
		cursor : 0,
		add : function(obj_add) {
			var bullet = {
				update : obj.updateBullet || function(dt){}
			};
			var shapes = [];
			for (var i = 0; i < this.shapes.length; i++) {
				shapes.push(this.shapes[i].clone());
			}
			bullet.body = phys2D.createRigidBody({
				type : 'dynamic',
				shapes : shapes,
				sleeping : false,
				bullet : true,
				position : [obj_add.x, obj_add.y],
				rotation : obj_add.rotation || 0,
				velocity : obj_add.velocity || obj.velocity || [0,0],
				angularVelocity : obj_add.angularVelocity || obj.angularVelocity || 0,
				force : obj_add.force || obj.force || [0,0],
				torque : obj_add.torque || obj.torque || 0,
				linearDrag : obj_add.linearDrag || obj.linearDrag || 0.05,
				angularDrag : obj_add.angularDrag || obj.angularDrag || 0.05,
				surfaceVelocity : obj_add.surfaceVelocity || obj.surfaceVelocity || [0,0],
				userData : null
			});
			if (this.array[this.cursor]) {
				world.physicWorld.removeRigidBody(this.array[this.cursor]);
			}
			this.array[this.cursor] = bullet;
			this.cursor = (this.cursor + 1) % this.array.length;
			world.physicWorld.addRigidBody(bullet.body);
		},
		clear : function() {
			for (var i = 0; i < this.array.length; i++) {
				var bullet = this.array[i];
				bullet.body.world.removeRigidBody(bullet.body);
			}
			this.array = [];
		},
		update : function(dt) {
			for (var i = 0; i < this.array.length; i++) {
				this.array[i].update(dt);
			}
		}
	}
};

world.init = function() {
	monster.init();
	wall.init();
	character.init();
}

world.clear = function() {
	for (var i in world.passive) {
		world.passive[i].clear();
	}
	for (var i in world.active) {
		world.active[i].clear();
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
						world.passive[layer.id].add(tag,layer[tag][obj]);
					}
				}
			}

		} else if (world.active[layer.id]) {

			for (var t = 0; t < world.active[layer.id].svgTags.length; t++) {
				var tag = world.active[layer.id].svgTags[t];
				if (layer[tag]) {
					for (var obj = 0; obj < layer[tag].length; obj++) {
						world.active[layer.id].add(tag,layer[tag][obj]);
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
	for (var i in world.active) {
		world.active[i].update(dt);
	}
	world.physicWorld.step(dt);
};
