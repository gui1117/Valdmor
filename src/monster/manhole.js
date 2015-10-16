/* a static generator that generate flooder
 * when activated
 */

function createManhole(spec) {
	var id = newIdentifier(),
	manhole = {id : id},

	position = spec.position,	

	distance = PARAM.MH_DISTANCE,
	deltaTime = PARAM.MH_DELTA_TIME,
	rad = PARAM.MH_RADIUS,
	life = PARAM.MH_LIFE,

	nextTime = 0,
	time = 0,

	shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad),
		group : GROUP.MANHOLE,
		mask : 0xffffffff^GROUP.FLOODER,
	}),
	body = phys2D.createRigidBody({
		type : 'static',
		shapes : [shape],
		sleeping : false,
		bullet : false,
		position : position,
		rotation : 0,
		userData : manhole,
	}),
	sprite = Draw2DSprite.create({
		width : rad,
		height : rad,
		color : COLOR.MANHOLE,
		x : 0,
		y : 0,
		scale : [1, 1],
	}),
	remove = function() {
		loop.removeOfUpdate(id);
		if (mode === 'timer') {
			loop.removeOfDraw(id);
		}
		world.removeRigidBody(body);
	},
	update = function(dt) {
		var d;
		time += dt;

		while (time > nextTime) {
			nextTime += deltaTime;

			d = getDistance(position,character.getPosition());
			if (d < distance) {
				createFlooder({
					position : position
				});
			}
		}

		camera.setSpriteAttribute(sprite,body.getPosition(),body.getRotation());
		
		if (life <= 0) {
			remove();
		}
	},
	draw = function(debug) {
		if (!debug) {
			draw2D.drawSprite(sprite);
		}
	},
	damage = function(d) {
		life -= d;
	};

	world.addRigidBody(body);
	loop.addToUpdate(id,manhole);
	loop.addToDraw(id,manhole);

	manhole.update = update;
	manhole.damage = damage;
	manhole.draw = draw;
	return Object.freeze(manhole);
}
