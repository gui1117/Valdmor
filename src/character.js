"use strict";

function createCharacter(spec) {
	var id = newIdentifier();
	var character = {id : id};

	var position = spec ? spec.position : [100,100];

	var soundIntensity = PARAM.CHAR_SOUND_INT;
	var rad = PARAM.CHAR_RAD;
	var life = PARAM.CHAR_LIFE;
	var velocity = PARAM.CHAR_VELOCITY;
	var rotation = 0;
	var distance = PARAM.CHAR_DISTANCE;

	var aim = 0;

	var shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad),
		group : GROUP.CHARACTER,
	});

	var body = phys2D.createRigidBody({
		type : 'kinetic',
		shapes : [shape],
		sleeping : false,
		bullet : false,
		position : position,
		rotation : rotation,
		userData : character,
	});

	var grenadeLauncher = createGrenadeLauncher();
	var launchGrenade = function() {
		grenadeLauncher.shoot({
			position : body.getPosition(),
			rotation : aim,
			distance : distance,
		});
	};

	var shotgun = createShotgun({
		immuneId : [character.id],
	});
	var shootShotgun = function() {
		shotgun.shoot({
			position : body.getPosition(),
			rotation : aim,
		});
	};
	var sword = createSword({
	});
	var attackSword = function() {
		sword.attack({
			position : body.getPosition(),
			rotation : aim,
		});
	};

	var sprite = Draw2DSprite.create({
		width : rad,
		height : rad,
		color : COLOR.CHARACTER,
		x : 0,
		y : 0,
		rotation : rotation,
		scale : [1, 1],
	});

	var update = function(dt) {
		var r = body.getRotation();
		var v = velocity;
		var mp = mouse.getWorldPosition();
		var pos = body.getPosition();

		aim = getAngle(pos,mp);
		if (input.isDown.Z) {
			if (input.isDown.Q) {
				body.setRotation(-3*Math.PI/4);
			} else if (input.isDown.D) {
				body.setRotation(-Math.PI/4);
			} else if (!input.isDown.S) {
				body.setRotation(-Math.PI/2);
			}
		} else if (input.isDown.S) {
			if (input.isDown.Q) {
				body.setRotation(3*Math.PI/4);
			} else if (input.isDown.D) {
				body.setRotation(Math.PI/4);
			} else {
				body.setRotation(Math.PI/2);
			}
		} else if (input.isDown.D) {
			body.setRotation(0);
		} else if (input.isDown.Q) {
			body.setRotation(Math.PI);
		} else {
			v = 0;
		}
		body.setVelocity([v*Math.cos(r),v*Math.sin(r)]);

		if (v) {
			maze.addSound(pos,soundIntensity);
		}

		if (input.isDown.BUTTON_1) {
			launchGrenade();
		}
		if (input.isDown.BUTTON_0) {
			shootShotgun();
		}
		if (input.isDown['SPACE']) {
			attackSword();
		}

		camera.setPosition(pos);
		camera.setSpriteAttribute(sprite,pos,body.getRotation());
	};

	var	damage = function(d) {
		life -= d;
		console.log('character damaged');
	};

	var getPosition = function() {
		var p = body.getPosition();
		return [p[0],p[1]];
	};

	var keydown = function(keyCode) { 
		var key = inputDevice.ReverseKeyCodes[keyCode];
		if (key === 'M') {
			camera.multZoom(0.1);
		} else if (key === 'SPACE') {
			attackSword();
		}
	};

	var keyup = function(keyCode) { 
		if (inputDevice.ReverseKeyCodes[keyCode] === 'M') {
			camera.multZoom(10);
		}
	};

	var mousedown = function(keycode) {
		if (keycode === inputDevice.mouseCodes.BUTTON_1) {
			launchGrenade();
		} else if (keycode === inputDevice.mouseCodes.BUTTON_0) {
			shootShotgun();
		}
	};

	var draw = function(debug) {
		if (!debug) {
			draw2D.drawSprite(sprite);
		}
	};

	world.addRigidBody(body);
	loop.addToUpdate(id,character);
	loop.addToDraw(id,character);

	inputDevice.addEventListener('keydown',keydown);
	inputDevice.addEventListener('keyup',keyup);
	inputDevice.addEventListener('mousedown',mousedown);

	character.update = update;
	character.damage = damage;
	character.getPosition = getPosition; 
	character.draw = draw;
	return Object.freeze(character);
}
