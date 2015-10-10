debugBool = true;

/* load Turbulenz device */
TurbulenzEngine = WebGLTurbulenzEngine.create({
	canvas: document.getElementById("canvas")
});
canvas = document.getElementById("canvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

graphicsDevice = TurbulenzEngine.createGraphicsDevice({});

phys2DDebug = Physics2DDebugDraw.create({
	graphicsDevice : graphicsDevice
});
phys2DDebug.setPhysics2DViewport([
		0,0,window.innerWidth,window.innerHeight
]);
phys2DDebug.setScreenViewport([
		0,0,window.innerWidth,window.innerHeight
]);

inputDevice = TurbulenzEngine.createInputDevice();
{
	// isDown is an array where down keys are true and up keys false or undefined
	isDown = {};
	inputDevice.ReverseKeyCodes = [];
	for (var i in inputDevice.keyCodes) {
		inputDevice.ReverseKeyCodes[inputDevice.keyCodes[i]] = i;
	}
	inputDevice.addEventListener(
			'keydown', 
			function(keyCode) {
				isDown[inputDevice.ReverseKeyCodes[keyCode]] = true;
			});
	inputDevice.addEventListener(
			'keyup', 
			function(keyCode) { 
				isDown[inputDevice.ReverseKeyCodes[keyCode]] = false;
			});
	inputDevice.ReverseMouseCodes = [];
	for (var i in inputDevice.mouseCodes) {
		inputDevice.ReverseMouseCodes[inputDevice.mouseCodes[i]] = i;
	}
	inputDevice.addEventListener(
			'mousedown', 
			function(mouseCode) {
				isDown[inputDevice.ReverseMouseCodes[mouseCode]] = true;
			});
	inputDevice.addEventListener(
			'mouseup', 
			function(mouseCode) { 
				isDown[inputDevice.ReverseMouseCodes[mouseCode]] = false;
			});
}
mouseCodes = inputDevice.mouseCodes;

mouse = createMouse();

phys2D = Physics2DDevice.create();
phys2DCollision = phys2D.createCollisionUtils();
/* end load Turbulenz device */

newIdentifier = createIncrement(-1);

camera = createCamera();
loop = createLoop(FRAMERATE);
world = phys2D.createWorld({
	gravity : [0, 0],
	velocityIterations : 8,
	positionIterations : 8,
});

maze = createMaze();
maze.createEntities();

TurbulenzEngine.setInterval(loop.loop,FRAMERATE);
