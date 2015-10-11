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
phys2D = Physics2DDevice.create();
phys2DCollision = phys2D.createCollisionUtils(); //Needed ?
/* end load Turbulenz device */

/* create game device */
input = createInput();
mouse = createMouse();
sound = createSound();
camera = createCamera();
loop = createLoop(PARAM.FRAMERATE);

newIdentifier = createIncrement(-1);

world = phys2D.createWorld({
	gravity : [0, 0],
	velocityIterations : 8,
	positionIterations : 8,
});

maze = createMaze();
maze.createEntities();

TurbulenzEngine.setInterval(loop.loop,PARAM.FRAMERATE);
