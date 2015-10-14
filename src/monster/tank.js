"use strict";
/* pathfind toward the closest character 
 * have a velocity quite inferior of the charater
 * attack on touch every things
 *
 * or same velocity but stop a little when attack
 */
function createTank(spec) {
	/* condition : position is on a big square */
	var id = newIdentifier();
	var tank = {id : id};

	var position = spec.position;

	var rad = PARAM.TA_RADIUS;
	var life = PARAM.TA_LIFE;
	var velocity = PARAM.TA_VELOCITY;
	var distance = PARAM.TA_DISTANCE; // for path nodes
	var activationDistance = PARAM.ACTIVATION_DISTANCE;
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

	var remove = function() {
		loop.removeOfUpdate(id);
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
	var nextDir = [0,0];
	var characterCorner;
	var aim = body.getPosition();
	var update = function(dt) {
		var nextCharCorner;
		var almostNextAim;
		var nextAim;
		if (!active) {
			if (getDistance(body.getPosition(),character.getPosition()) 
						< activationDistance) {
				active = true;
				nextDir = [0,0];
				characterCorner = getCharacterCorner();
			}
		} else {
			nextCharCorner = getCharacterCorner();
			if (nextCharCorner !== characterCorner) {
				switch (characterCorner) {
					case 1: 
						if (nextCharCorner === 2) {
							nextDir = [-1,0];
						} else {
							nextDir = [0,-1];
						}
						break;
					case 2:
						if (nextCharCorner === 3) {
							nextDir = [0,-1];
						} else {
							nextDir = [1,0];
						}
						break;
					case 3:
						if (nextCharCorner === 4) {
							nextDir = [1,0];
						} else {
							nextDir = [0,1];
						}
						break;
					case 4:
						if (nextCharCorner === 1) {
							nextDir = [0,1];
						} else {
							nextDir = [-1,0];
						}
						break;
				}
				characterCorner = nextCharCorner;
			}
			console.log(nextCharCorner);

			// or something out of the grid !!
//			if (getDistance(body.getPosition(),aim) < distance) {
//				aim = maze.toGrid(aim);
//				almostNextAim = [aim[0]+nextDir[0],aim[1]+nextDir[1]];
//				nextAim = [aim[0]+nextDir[0]*2,aim[1]+nextDir[1]*2];
//				console.log(nextAim,aim);
//				if (maze.isWalkable(nextAim,"grid")
//						&& maze.isWalkable(almostNextAim,"grid")) {
//					aim = nextAim;
//				}
//				aim = maze.toWorld(aim,"center");
//			}

			var r = getAngle(body.getPosition(),aim) 
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
	};

	var attack = function(arbitrer) {
		sword.attack({
			position : body.getPosition(),
			rotation : body.getRotation(),
		});
	};

	var damage = function(d) {
		life -= d;
	};

	shape.addEventListener('begin',attack,GROUP.CHARACTER | GROUP.MONSTER);
	world.addRigidBody(body);
	loop.addToUpdate(id,tank);

	tank.update = update;
	tank.damage = damage;
	return Object.freeze(tank);
}
