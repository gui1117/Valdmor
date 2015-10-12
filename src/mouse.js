"use strict";

function createMouse() {
	var mouseCodes = inputDevice.mouseCodes;
	var position = [0,0];
	var getPosition = function() {
		return [position[0],position[1]];
	};
	var setPosition = function(p) {
		position[0] = p[0];
		position[1] = p[1];
	};
	var getWorldPosition = function() {
		var cp = camera.getPosition(),
		zoom = camera.getZoom();
		return [
			cp[0]+(-canvas.width/2 + position[0])/zoom,
			cp[1]+(-canvas.height/2 + position[1])/zoom
		];
	};

	inputDevice.addEventListener('mousemove', function(dx,dy) {
		position[0] = Math.min(canvas.width,Math.max(0,position[0]+dx));
		position[1] = Math.min(canvas.height,Math.max(0,position[1]+dy));
	});

	inputDevice.addEventListener('mousedown', function(mouseCode, x, y) {
		if (!inputDevice.isLocked()) {
			setPosition([x,y]);
			inputDevice.lockMouse();
		}
	});

	return Object.freeze({
		getPosition : getPosition,
		getWorldPosition : getWorldPosition,
	});
}
