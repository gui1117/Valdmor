"use strict";

/* load Turbulenz devices */
var TurbulenzEngine = WebGLTurbulenzEngine.create({
	canvas: document.getElementById("canvas")
});

var canvas = document.getElementById("canvas");
canvas.height=window.innerHeight;
canvas.width=window.innerWidth;

var mathDevice = TurbulenzEngine.createMathDevice();

var graphicsDevice = TurbulenzEngine.createGraphicsDevice({});

var soundDevice = TurbulenzEngine.createSoundDevice({
	deviceSpecifier: "DirectSound Software",
	linearDistance: true,
});

if (debugBool) {
	var phys2DDebug = Physics2DDebugDraw.create({
		graphicsDevice : graphicsDevice
	});
}

var inputDevice = TurbulenzEngine.createInputDevice();
var phys2D = Physics2DDevice.create();
var phys2DCollision = phys2D.createCollisionUtils();
var draw2D = Draw2D.create({
	graphicsDevice : graphicsDevice,
});
/* end load Turbulenz device */

/* create game device */
var newIdentifier = createIncrement(-1);
var input = createInput();
var loop = createLoop(PARAM.FRAMERATE);
var mouse = createMouse();
var sound = createSound();
var camera = createCamera();

var mode = 'timer'
//var mode = 'painter'


var world = phys2D.createWorld({
	gravity : [0, 0],
	velocityIterations : 8,
	positionIterations : 8,
});

var maze = createMaze();

maze.createEntities();

TurbulenzEngine.setInterval(loop.loop,PARAM.FRAMERATE);
