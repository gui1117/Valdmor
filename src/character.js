function createCharacter(spec) {
	var id = newIdentifier(),
	character = {id : id},

	position = spec ? spec.position : [100,100],

	soundIntensity = PARAM.CHAR_SOUND_INT,
	rad = PARAM.CHAR_RAD,
	life = PARAM.CHAR_LIFE,
	velocity = PARAM.CHAR_VELOCITY,
	rotation = 0,
	distance = PARAM.CHAR_DISTANCE,

	aim = 0,

	shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad),
		group : GROUP.CHARACTER,
	}),
	body = phys2D.createRigidBody({
		type : 'kinetic',
		shapes : [shape],
		sleeping : false,
		bullet : false,
		position : position,
		rotation : rotation,
		userData : character,
	}),
	grenadeLauncher = createGrenadeLauncher(),
	shotgun = createShotgun({
		immune : character,
	}),
	update = function(dt) {
		var r = body.getRotation(),
		v = velocity,
		mid = newIdentifier(),
		mp = mouse.getWorldPosition();

		aim = getAngle(body.getPosition(),mp);
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
			maze.addSound(body.getPosition(),soundIntensity);
		}

		camera.setPosition(body.getPosition());
	},
	damage = function(d) {
		life -= d;
		console.log('character damaged');
	},
	getPosition = function() {
		var p = body.getPosition();
		return [p[0],p[1]];
	},
	keydown = function(keyCode) { 
		if (inputDevice.ReverseKeyCodes[keyCode] === 'M') {
			camera.multZoom(0.1);
		}
	},
	keyup = function(keyCode) { 
		if (inputDevice.ReverseKeyCodes[keyCode] === 'M') {
			camera.multZoom(10);
		}
	},
	mousedown = function(keycode,x,y) {
		if (keycode === inputDevice.mouseCodes.BUTTON_1) {
			grenadeLauncher.shoot({
				position : body.getPosition(),
				rotation : aim,
				distance : distance,
			});
		} else if (keycode === inputDevice.mouseCodes.BUTTON_0) {
			console.log(particleAttack({
				origin : body.getPosition(),
				rotation : aim,
				height : 200,
				damage : 1,
				immune : [character.id],
			}));

//			shotgun.shoot({
//				position : body.getPosition(),
//				rotation : aim,
//			});
		}
	};
	world.addRigidBody(body);
	loop.addToUpdate(id,character);

	inputDevice.addEventListener('keydown',keydown);
	inputDevice.addEventListener('keyup',keyup);
	inputDevice.addEventListener('mousedown',mousedown);

	character.update = update;
	character.damage = damage;
	character.getPosition = getPosition; 
	return Object.freeze(character);
}
