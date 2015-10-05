function createCamera() {
	var position = [0,0],
	zoom = 1.3,
	setPosition = function(p) {
		position[0] = p[0];
		position[1] = p[1];
	},
	setZoom = function(n) {
		zoom = n
	},
	getZoom = function() {
		return zoom;
	},
	multZoom = function(n) {
		zoom *= n;
	},
	setViewport = function() {
		phys2DDebug.setPhysics2DViewport([
				position[0]-canvas.width/2/zoom,
				position[1]-canvas.height/2/zoom,
				position[0]+canvas.width/2/zoom,
				position[1]+canvas.height/2/zoom
		]);
		phys2DDebug.setScreenViewport([
				0,0,canvas.width,canvas.height
		]);
	};

	return Object.freeze({
		setZoom : setZoom,
		getZoom : getZoom,
		multZoom : multZoom,
		setPosition : setPosition,
		setViewport : setViewport,
	});
}
