//init
var debugBool=true;
if (debugBool){
	console.log("hello world log");
	console.debug("hello world debug");
	console.info("hello world info");
	console.warn("hello world warn");
}

var TurbulenzEngine = WebGLTurbulenzEngine.create({
	canvas: document.getElementById("canvas")
});
canvas.width=window.innerWidth;
canvas.height=window.innerWidth;

var graphicsDevice = TurbulenzEngine.createGraphicsDevice({});
var phys2DDebug = Physics2DDebugDraw.create({
	graphicsDevice : graphicsDevice
});

phys2DDebug.setPhysics2DViewport([0,0,window.innerWidth,window.innerHeight]);
phys2DDebug.setScreenViewport([0,0,window.innerWidth,window.innerHeight]);

world.loadmap("map.svg");

bgColor=[0,0,0,1];

function update() {
	if (graphicsDevice.beginFrame()){
		graphicsDevice.clear(bgColor, 1.0);
		phys2DDebug.begin();
		phys2DDebug.drawWorld(world.physicWorld);
		phys2DDebug.end();
		graphicsDevice.endFrame();
	}
}

TurbulenzEngine.setInterval(update, 1000/60);
