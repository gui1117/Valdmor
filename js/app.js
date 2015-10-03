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
}

phys2D = Physics2DDevice.create({});
phys2DCollision = phys2D.createCollisionUtils();
/* end load Turbulenz device */

newIdentifier = createIncrement(-1);
soundGrid = createSoundGrid({
	scale : 20,
	width : 1000,
	height : 1000,
});
loop = createLoop(1000/60);
world = phys2D.createWorld({
	gravity : [0, 0],
	velocityIterations : 8,
	positionIterations : 8,
});

maze = createMaze();

soundGrid.addSound({
	position : [200,400],
	intensity : 40,
});


TurbulenzEngine.setInterval(loop.loop,1000/60);

createCharacter({});

gl = createGrenadeLauncher({});
function shoot() {
	gl.shoot({
		position : [100,100],
		distance : 1,
		velocity : 5,
		rotation : 5
	});
	window.setTimeout(shoot,1000);
}
shoot();
