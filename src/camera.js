"use strict";

function createCamera() {
	var position = [0,0],
	zoom = PARAM.ZOOM,
	setPosition = function(p) {
		position[0] = p[0];
		position[1] = p[1];
	},
	getPosition = function() {
		return [position[0],position[1]];
	},
	setZoom = function(n) {
		zoom = n;
	},
	getZoom = function() {
		return zoom;
	},
	multZoom = function(n) {
		zoom *= n;
	},
	setSpriteAttribute = function(sprite,pos,rotation) {
		sprite.x = (pos[0]-position[0])*zoom+canvas.width/2;
		sprite.y = (pos[1]-position[1])*zoom+canvas.height/2;
		sprite.setScale([zoom*2,zoom*2]);
		sprite.rotation = rotation;
	},
	setViewport = function() {
		if (debugBool) {
			phys2DDebug.setPhysics2DViewport([
					position[0]-canvas.width/2/zoom,
					position[1]-canvas.height/2/zoom,
					position[0]+canvas.width/2/zoom,
					position[1]+canvas.height/2/zoom
			]);
			phys2DDebug.setScreenViewport([
					0,0,canvas.width,canvas.height
			]);
		}
	};

	return Object.freeze({
		setSpriteAttribute : setSpriteAttribute,
		setZoom : setZoom,
		getZoom : getZoom,
		multZoom : multZoom,
		setPosition : setPosition,
		getPosition : getPosition,
		setViewport : setViewport,
	});
}
