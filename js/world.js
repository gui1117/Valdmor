var world = {};

world.passive = {};
world.active = {};
world.hyperactive = {};
world.debugDraw = [];
world.action = {};

world.grid = {
	scale : 20,
	array : [],
	code : {
		empty : 0,
		neutral : 1,
		bullet : 2,
		enemy : 3,
	},
	add : function(obj) {
		var p = obj.gridLastPosition = obj.body.getPosition();
		var x = Math.floor(p[0]/this.scale);
		var y = Math.floor(p[1]/this.scale);
		this.array[x][y][this.code[obj.gridType]]++;
	},
	update : function(obj) {
		var p = obj.gridLastPosition;
		var x = Math.floor(p[0]/this.scale);
		var y = Math.floor(p[1]/this.scale);
		this.array[x][y][this.code[obj.gridType]]--;

		var p = obj.gridLastPosition = obj.body.getPosition();
		var x = Math.floor(p[0]/this.scale);
		var y = Math.floor(p[1]/this.scale);
		this.array[x][y][this.code[obj.gridType]]++;
	},
	remove : function(obj) {
		var p = obj.gridLastPosition;
		var x = Math.floor(p[0]/this.scale);
		var y = Math.floor(p[1]/this.scale);
		this.array[x][y][this.code[obj.gridType]]--;
	},
	draw : function() {
		var s2 = this.scale/2
		for (var x=0; x<this.array.length; x++) {
			for (var y=0; y<this.array[x].length; y++) {
				var square = this.array[x][y];
				if (square[1] || square[2] || square[3]) {
					var color = [
						square[1] || 0,
						square[2] || 0,
						square[3] || 0,
						1
					];
					phys2DDebug.drawCircle(x*this.scale+s2,y*this.scale+s2,s2/2,color);
				}
			}
		}
	},
	addPassives : function() {
		for (var x=0; x<this.array.length; x++) {
			for (var y=0; y<this.array[x].length; y++) {
				var point = [x*this.scale+this.scale/2, y*this.scale+this.scale/2];
				var store = [];
				var count = world.physicWorld.bodyPointQuery(point, store);
				for (var i=0; i<count; i++) {
					var obj = store[i].userData;
					if (obj && obj.type === "passive") {
						this.array[x][y][this.code[obj.gridType]]++;
					}
				}
			}
		}
	},
	getView : function(position,width,height,array) {
		var p = position;
		var w2 = Math.floor(width/2);
		var h2 = Math.floor(height/2);
		p = [Math.floor(p[0]/this.scale),Math.floor(p[1]/this.scale)];

		var xp = 0;
		var yp = 0;
		for (var x=p[0]-w2; x<=p[0]+w2; x++) {
			for (var y=p[1]-h2; y<=p[1]+h2; y++) {
				array[xp][yp] = world.grid.array[x][y];
				yp++;
			}
			yp = 0;
			xp++;
		}
	},
};

world.newDebugDraw = function(func) {
	world.debugDraw.push(func);
};

world.drawDebugDraw = function() {
	for (var i=0; i<world.debugDraw.length; i++) {
		world.debugDraw[i]();
	}
	world.debugDraw = [];
};

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
				gridType : obj.gridType,
				init : obj.init,
				update : obj.update,
				remove : function() {
					world.grid.remove(this);
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
				type : 'kinetic',
				shapes : shapes,
				sleeping : false,
				bullet : false,
				position : obj_add.position || [obj_add.x, obj_add.y],
				rotation : obj_add.rotation || 0,
				userData : act
			});
			world.active[name].array.push(act);
			world.physicWorld.addRigidBody(act.body);
			world.grid.add(act);

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
					world.grid.update(this.array[i]);
					this.array[i].update(dt);
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
					world.grid.remove(this);
					world.physicWorld.removeRigidBody(this.body);
					var index = world.hyperactive[name].array.indexOf(this);
					world.hyperactive[name].array[index] = null;
				},
			};
			var shapes = [];
			for (var i = 0; i < this.shapes.length; i++) {
				shapes.push(this.shapes[i].clone());
			}
			if (obj.eventListener) {
				for (var eventType in obj.eventListener) {
					var handler = obj.eventListener[eventType];
					for (var i = 0; i < shapes.length; i++) {
						shapes[i].addEventListener(eventType,handler);
					}
				}
			}
			var v = obj_add.velocity || obj.velocity || 0;
			var r = obj_add.rotation || obj.rotation || 0;
			hyp.body = phys2D.createRigidBody({
				type : 'kinetic',
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
			world.grid.add(hyp);
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
					world.grid.update(this.array[i]);
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

	initGrenade();
	initShotgun();
	initSubmachine();
	initSword();
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
	world.grid.array = [];
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

	world.grid.array.length = 100;
	for (var i=0; i<world.grid.array.length; i++) {
		world.grid.array[i] = [];
		world.grid.array[i].length = 100;
		for (var j=0; j<world.grid.array.length; j++) {
			world.grid.array[i][j] = [0,0,0,0];
		}
	}

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
	world.grid.addPassives();
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
