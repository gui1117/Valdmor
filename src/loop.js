"use strict";

function createLoop(deltaTime) {
	var	toUpdate = {};
	var toDraw = {};
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
	var lastTime;
	var debugDT = [];

	/* MAIN LOOP */

	var loop = function() {
		var mp,dt,
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
		if (debugBool) {
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
			graphicsDevice.clear([0,0,0,0], 1.0);
			phys2DDebug.begin();

			maze.draw();

			Object.keys(toDraw).forEach(function(key) {
				toDraw[key].draw();
			});
			phys2DDebug.drawWorld(world);

			mp = mouse.getWorldPosition();
			phys2DDebug.drawCircle(mp[0],mp[1],METER,[1,1,0,1]);

			phys2DDebug.end();
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
		removeOfUpdate : removeOfUpdate,
		removeOfDraw : removeOfDraw,
		loop : loop,
	});
}
