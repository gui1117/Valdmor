// run the game

var debugBool=true;

function load() {
	TurbulenzEngine = WebGLTurbulenzEngine.create({
		canvas: document.getElementById("canvas")
	});
	canvas.width=window.innerWidth;
	canvas.height=window.innerWidth;


	graphicsDevice = TurbulenzEngine.createGraphicsDevice({});


	phys2DDebug = Physics2DDebugDraw.create({
		graphicsDevice : graphicsDevice
	});
	phys2DDebug.setPhysics2DViewport([0,0,window.innerWidth,window.innerHeight]);
	phys2DDebug.setScreenViewport([0,0,window.innerWidth,window.innerHeight]);


	inputDevice = TurbulenzEngine.createInputDevice();
	// isDown is an array where down keys are true and up keys false or undefined
	isDown = {};
	inputDevice.keyCodesArray = [];
	for (var i in inputDevice.keyCodes) {
		inputDevice.keyCodesArray[inputDevice.keyCodes[i]] = i;
	}
	inputDevice.addEventListener('keydown', function(keyCode){isDown[inputDevice.keyCodesArray[keyCode]] = true;});
	inputDevice.addEventListener('keyup', function(keyCode){isDown[inputDevice.keyCodesArray[keyCode]] = false;});


	phys2D = Physics2DDevice.create({});
	phys2DCollision = phys2D.createCollisionUtils();

	world.init();
	world.loadmap("map.svg");
}

function update() {
	inputDevice.update();
	world.update(1000/60);
	if (graphicsDevice.beginFrame()){
		graphicsDevice.clear([0,0,0,0], 1.0);
		phys2DDebug.begin();
		world.grid.draw();
		phys2DDebug.drawWorld(world.physicWorld);
		world.drawDebugDraw();
		phys2DDebug.end();
		graphicsDevice.endFrame();
	}
};

TurbulenzEngine.setInterval(update, 1000/60);
