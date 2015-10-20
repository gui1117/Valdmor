"use strict";

function createLoop(deltaTime) {
	var	toUpdate = {};
	var toDraw = [];
	var toRemoveOfUpdate = [];
	var toRemoveOfDraw = [];
	var addToUpdate = function(id,obj) {
		toUpdate[id] = obj;
	};
	var addToDraw = function(id,obj) {
		toDraw[id] = obj;
	};
	var removeOfUpdate = function(id) {
		toRemoveOfUpdate.push(id);
	};
	var removeOfDraw = function(id) {
		toRemoveOfDraw.push(id);
	};

	var toDrawDamage = [];
	toDrawDamage.length = PARAM.DAMAGE_DRAW_LENGTH;
	toDrawDamage.forEach(function(elem,index,array) {
		array[index] = [];
	});

	var addToDrawDamage = function(p,w,h,r) {
		toDrawDamage[PARAM.DAMAGE_DRAW_LENGTH-1].push([p,w,h,r]);
	};

	var sprite = Draw2DSprite.create({
		width : 100,
		height : 100,
		color : COLOR.DAMAGE,
		x : 0,
		y : 0,
	});

	var lastTime;
	var debugDT = [];

	/* MAIN LOOP */

	var loop = function() {
		var dt,
		avg = 0,
		min = Infinity,
		max = -Infinity;

		if (!lastTime) {
			lastTime = TurbulenzEngine.getTime();
			dt = deltaTime;
		} else {
			dt = TurbulenzEngine.getTime()- lastTime;
			lastTime = TurbulenzEngine.getTime();
		}
		if (true) {
			debugDT.push(dt);
			if (debugDT.length >= 100) {
				debugDT.forEach(function(t) {
					if (min > t) {
						min = t;
					} 
					if (max < t) {
						max = t;
					}
					avg += t;
				});
				avg /= debugDT.length;
				min = Math.round(1000/min);
				max = Math.round(1000/max);
				avg = Math.round(1000/avg);
				console.info("last 100 fps : min",max,"max",min,"avg",avg);
				debugDT = [];
			}
		}


		/* UPDATE  */
		world.step(dt);

		Object.keys(toUpdate).forEach(function(key) {
			toUpdate[key].update(dt);
		});
		toRemoveOfUpdate.forEach(function(id) {
			delete toUpdate[id];
		});
		toRemoveOfUpdate = [];

		/* DRAW */
		if (window.innerWidth !== canvas.width
				|| window.innerHeigth !== canvas.height) {
			canvas.width = window.innerWidth;
			canvas.heigth = window.innerHeight;
		}
		camera.setViewport();

		if (graphicsDevice.beginFrame()){
			graphicsDevice.clear(COLOR.BACKGROUND, 1.0);
			draw2D.begin();

				maze.draw(false);

				toDrawDamage.forEach(function(elem) {
					elem.forEach(function(e) {
						sprite.setWidth(e[1]);
						sprite.setHeight(e[2]);
						camera.setSpriteAttribute(sprite,e[0],e[3]);
						draw2D.drawSprite(sprite);
					});
				});
				toDrawDamage.splice(0,1);
				toDrawDamage.push([]);

				Object.keys(toDraw).forEach(function(key) {
					toDraw[key].draw(false);
				});
				mouse.draw(false);

			draw2D.end();

			if (debugBool) {
				phys2DDebug.begin();

				maze.draw(true);

				Object.keys(toDraw).forEach(function(key) {
					toDraw[key].draw(true);
				});

				phys2DDebug.drawWorld(world);
				mouse.draw(true);

				phys2DDebug.end();
			}
			graphicsDevice.endFrame();
		}
		toRemoveOfDraw.forEach(function(id) {
			delete toDraw[id];
		});
		toRemoveOfDraw = [];
	};

	/* END MAIN LOOP */

	return Object.freeze({
		addToUpdate : addToUpdate,
		addToDraw : addToDraw,
		addToDrawDamage : addToDrawDamage,
		removeOfUpdate : removeOfUpdate,
		removeOfDraw : removeOfDraw,
		loop : loop,
	});
}
