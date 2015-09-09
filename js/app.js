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
var inputDevice = TurbulenzEngine.createInputDevice();
var isDown = {};
inputDevice.keyCodesArray = [];
for (var i in inputDevice.keyCodes) {
	inputDevice.keyCodesArray[inputDevice.keyCodes[i]] = i;
}
inputDevice.addEventListener('keydown', function(keyCode){isDown[inputDevice.keyCodesArray[keyCode]] = true;});
inputDevice.addEventListener('keyup', function(keyCode){isDown[inputDevice.keyCodesArray[keyCode]] = false;});

phys2DDebug.setPhysics2DViewport([0,0,window.innerWidth,window.innerHeight]);
phys2DDebug.setScreenViewport([0,0,window.innerWidth,window.innerHeight]);

world.init();
world.loadmap("map.svg");

function update() {
	inputDevice.update();
	world.update(1000/60);
	if (graphicsDevice.beginFrame()){
		graphicsDevice.clear([0,0,0,0], 1.0);
		phys2DDebug.begin();
		phys2DDebug.drawWorld(world.physicWorld);
		phys2DDebug.end();
		graphicsDevice.endFrame();
	}
};

TurbulenzEngine.setInterval(update, 1000/60);
