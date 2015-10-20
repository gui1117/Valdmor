"use strict";

function createMouse() {
	var id = newIdentifier();
	var mouse = {};

	var rad = PARAM.MOUSE_RAD;

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

	var sprite = Draw2DSprite.create({
		width : rad,
		height : rad,
		color : COLOR.MOUSE,
		x : canvas.width/2,
		y : canvas.height/2,
	});

	var update = function(dt) {
		camera.setSpriteAttribute(sprite,getWorldPosition(),0);
	};

	var draw = function(debug) {
		var mp = getWorldPosition();
		if (debug) {
			phys2DDebug.drawCircle(mp[0],mp[1],METER,[1,1,0,1]);
		} else {
			draw2D.drawSprite(sprite);
		}
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
	loop.addToUpdate(id,mouse);
	loop.addToDraw(id,mouse);

	mouse.getPosition = getPosition;
	mouse.getWorldPosition = getWorldPosition;
	mouse.draw = draw;
	mouse.update = update;
	return Object.freeze(mouse);
}
