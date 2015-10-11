debugBool = true;

/* load Turbulenz devices */
TurbulenzEngine = WebGLTurbulenzEngine.create({
	canvas: document.getElementById("canvas")
});
canvas = document.getElementById("canvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

mathDevice = TurbulenzEngine.createMathDevice();
graphicsDevice = TurbulenzEngine.createGraphicsDevice({});
soundDevice = TurbulenzEngine.createSoundDevice({
	deviceSpecifier: "DirectSound Software",
	linearDistance: true,
});

phys2DDebug = Physics2DDebugDraw.create({
	graphicsDevice : graphicsDevice
});

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

soundSource = soundDevice.createSource({
	position : mathDevice.v3Build(0, 0, 0),
	direction : mathDevice.v3Build(0, 0, -1),
	velocity : mathDevice.v3Build(0, 0, 0),
	gain: 1.0,
	minDistance: 1.0,
	maxDistance: 100.0,
	rollOff: 1.0,
	relative: false,
	looping: false,
	pitch: 1.0
});


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
