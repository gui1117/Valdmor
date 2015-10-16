"use strict";
/* pathfind toward the closest character 
 * have a velocity quite inferior of the charater
 * attack on touch every things
 *
 * or same velocity but stop a little when attack
 */ function createTank(spec) {
	/* condition : position is on a big square */
	var id = newIdentifier();
	var tank = {id : id};

	var position = spec.position;

	var rad = PARAM.TA_RADIUS;
	var life = PARAM.TA_LIFE;
	var velocity = PARAM.TA_VELOCITY;
	var distance = PARAM.TA_DISTANCE; // for path nodes
	//var attackDelay = PARAM.TA_ATTACK_DELAY;  // no?
	var activationDistance = PARAM.TA_ACTIVATION_DISTANCE;
	var timeBetweenPathfind = PARAM.TA_TIME_BETWEEN_PATHFIND;
	var damage = PARAM.TA_DAMAGE;
	var damageHeight = PARAM.TA_DAMAGE_HEIGHT;
	var damageWidth = PARAM.TA_DAMAGE_WIDTH;

	var shape = phys2D.createPolygonShape({
		vertices : phys2D.createRectangleVertices(-rad,-rad,rad,rad),
		group : GROUP.TANK,
	});

	var body = phys2D.createRigidBody({
		type : 'kinetic',
		shapes : [shape],
		sleeping : false,
		bullet : false,
		position : position,
		rotation : 0,
		userData : tank,
	});

	var sprite = Draw2DSprite.create({
		width : rad,
		height : rad,
		color : COLOR.TANK,
		x : 0,
		y : 0,
		scale : [1, 1],
	});

	var remove = function() {
		loop.removeOfUpdate(id);
		if (mode === 'timer') {
			loop.removeOfDraw(id);
		}
		world.removeRigidBody(body);
	};

	var sword = createSword({
		immuneId : [tank.id],
		innerWidth : damageWidth,
		outerWidth : damageWidth,
		height : damageHeight,
	});

	var getCharacterCorner = function () {
		var cPos = character.getPosition();
		var tPos = body.getPosition();

		if (cPos[1] >= tPos[1]) {
			if (cPos[0] >= tPos[0]) {
				return 1;
			} else {
				return 2;
			}
		} else {
			if (cPos[0] >= tPos[0]) {
				return 4;
			} else {
				return 3;
			}
		}
	};

	var nodes = [body.getPosition()];
	var current = 0;

	var active = false;
	var timeToFindPath = TurbulenzEngine.getTime();
	var nodes;
	var current;
	var update = function(dt) {
		var nextCharCorner;
		var almostNextAim;
		var nextAim;
		if (!active) {
			if (getDistance(body.getPosition(),character.getPosition()) 
						< activationDistance) {
				active = true;
			}
		} else {
			if (TurbulenzEngine.getTime() >= timeToFindPath) {
				while (TurbulenzEngine.getTime() >= timeToFindPath) {
					timeToFindPath += timeBetweenPathfind;
				}
				nodes = maze.getPath({
					a : body.getPosition(),
					b : character.getPosition(),
					coordinate : "world",
					nodesType : "center",
					attribut : "none",
				})
				current = 0;
			}

			var r;
			if (nodes.length - current <= 2) {
				r = getAngle(body.getPosition(),character.getPosition());
			} else {
				if (getDistance(body.getPosition(),nodes[current]) < distance) {
					if (current !== nodes.length-1) {
						current++;
					}
				}
				r = getAngle(body.getPosition(),nodes[current]) 
			}

			var v = velocity;
			body.setRotation(r);
			body.setVelocity([v*Math.cos(r),v*Math.sin(r)]);

			if (life <= 0) {
				remove();
			}

			if (getDistance(body.getPosition(),character.getPosition()) 
						< activationDistance) {
				active = false;
			}
		}

		camera.setSpriteAttribute(sprite,body.getPosition(),body.getRotation());
	};

	var attack = function(arbitrer) {
		sword.attack({
			position : body.getPosition(),
			rotation : body.getRotation(),
		});
	};

	var draw = function(debug) {
		if (!debug) {
			draw2D.drawSprite(sprite);
		}
	};

	var damage = function(d) {
		life -= d;
	};

	shape.addEventListener('begin',attack,GROUP.CHARACTER | GROUP.MONSTER);
	world.addRigidBody(body);
	loop.addToUpdate(id,tank);
	loop.addToDraw(id,tank);

	tank.update = update;
	tank.damage = damage;
	tank.draw = draw;
	return Object.freeze(tank);
}
