function createCharacter(spec) {
	var id = newIdentifier(),
	character = {},

	position = spec ? spec.position : [100,100],

	rad = 12,
	life = 0,
	velocity = 1.5,
	rotation = 0,
	distance = rad*1.1,
	aim = 0,
	mousePosition = position,

	shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad)
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

		aim = angle(body.getPosition(),mp);
		if (isDown.Z) {
			if (isDown.Q) {
				body.setRotation(-3*Math.PI/4);
			} else if (isDown.D) {
				body.setRotation(-Math.PI/4);
			} else if (!isDown.S) {
				body.setRotation(-Math.PI/2);
			}
		} else if (isDown.S) {
			if (isDown.Q) {
				body.setRotation(3*Math.PI/4);
			} else if (isDown.D) {
				body.setRotation(Math.PI/4);
			} else {
				body.setRotation(Math.PI/2);
			}
		} else if (isDown.D) {
			body.setRotation(0);
		} else if (isDown.Q) {
			body.setRotation(Math.PI);
		} else {
			v = 0;
		}
		body.setVelocity([v*Math.cos(r),v*Math.sin(r)]);
		if (isDown.BUTTON_0) {
			grenadeLauncher.shoot({
				position : body.getPosition(),
				rotation : aim,
				distance : distance,
			});
		} 
		if (isDown.BUTTON_1) {
			shotgun.shoot({
				position : body.getPosition(),
				rotation : aim,
			});
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
	};
	world.addRigidBody(body);
	loop.addToUpdate(id,character);

	inputDevice.addEventListener(
			'keydown', 
			function(keyCode) { 
				if (inputDevice.ReverseKeyCodes[keyCode] === 'M') {
					camera.multZoom(0.1);
				}
			});

	inputDevice.addEventListener(
			'keyup', 
			function(keyCode) { 
				if (inputDevice.ReverseKeyCodes[keyCode] === 'M') {
					camera.multZoom(10);
				}
			});




	character.update = update;
	character.damage = damage;
	character.getPosition = getPosition; 
	return Object.freeze(character);
}
