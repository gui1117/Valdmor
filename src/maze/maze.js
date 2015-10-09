function createMaze(spec) {

	var id = newIdentifier(),
	maze = {},

	smallSquare = MAZE_SMALL_SQUARE,
	bigSquare = MAZE_BIG_SQUARE,
	chanceOfBlind = MAZE_CHANCE_OF_BLIND,
	maxBlind = MAZE_MAX_BLIND,
	nbrOfLighball = MAZE_NBR_OF_LIGHTBALL,

	mazeGrid = generateMaze().grid,
	soundGrid = createSoundGrid({
		width : mazeGrid.length,
		height : mazeGrid[0].length,
	}),
	pathGrid = new PF.Grid(mazeGrid.length,mazeGrid[0].length),
	pathfinder = new PF.AStarFinder({
		allowDiagonal : true,
		dontCrossCorners : true,
	}),

	toGrid = function(pos) {
		var p0 = Math.floor(pos[0]/(smallSquare+bigSquare))*2,
		p1 = Math.floor(pos[1]/(smallSquare+bigSquare))*2;
		if (pos[0]-p0 >= smallSquare) {
			p0++;
		} 
		if (pos[1]-p1 >= smallSquare) {
			p1++;
		}
		return [p0,p1];
	},
	toWorld = function(pos,type) {
		var x = Math.floor(pos[0]/2)*(smallSquare+bigSquare),
		y = Math.floor(pos[1]/2)*(smallSquare+bigSquare);
		if (type === "center") {
			if (pos[0]%2 == 0) {
				x += smallSquare/2;
			} else {
				x += smallSquare + bigSquare/2;
			}
			if (pos[1]%2 == 0) {
				y += smallSquare/2;
			} else {
				y += smallSquare + bigSquare/2;
			}
		} else if (type === "random") {
			if (pos[0]%2 == 0) {
				x += Math.random()*smallSquare;
			} else {
				x += smallSquare + Math.random()*bigSquare;
			}
			if (pos[1]%2 == 0) {
				y += Math.random()*smallSquare;
			} else {
				y += smallSquare + Math.random()*bigSquare;
			}
		} else {
			x += (pos[0]%2)*smallSquare;
			y += (pos[1]%2)*smallSquare;
		}
		return [x,y];
	},
	update = function(dt) {
		soundGrid.update(dt);
	},
	createEntities = function() {
		var i,j,k,h2,w2,
		nbrOfBlind,
		entryPos,
		exitPos;

		for (i=1; i<mazeGrid.length-1; i++) {
			for (j=1; j<mazeGrid[i].length-1; j++) {

				switch (mazeGrid[i][j]) {
					case 1:
						if (i%2 == 0) {
							w2 = smallSquare/2;
						} else {
							w2 = bigSquare/2;
						}
						if (j%2 == 0) {
							h2 = smallSquare/2;
						} else {
							h2 = bigSquare/2;
						}

						createWall({
							position : toWorld([i,j],"center"),
							topleft : [-w2,-h2],
							downright : [w2,h2],
						});
						break;

					case 2:
						entryPos = toWorld([i,j],"center");

						character = createCharacter({
							position : toWorld([i,j],"random"),
						});

						createManhole({
							position : toWorld([i,j],"random"),
						});
						break;

					case 3:
						exitPos = toWorld([i,j],"center");
						break;

					case 4:
						if (Math.random() < chanceOfBlind) {
							nbrOfBlind = Math.floor(Math.random()*(maxBlind+1));
							for (k=0; k<nbrOfBlind; k++) {
								createBlind({
										position : toWorld([i,j],"random")
								});
							}
						}

						break;
				}
			}
		}

		for (i=0; i<nbrOfLighball; i++) {
			createLightball({
				entry : entryPos,
				exit : exitPos,
			});
		}
	},
	getPath = function(spec) {
		var a = spec.a,
		b = spec.b,
		coordinate = spec.coordinate,
		nodeType = spec.nodeType,

		ga,gb,nodes,i;

		if (coordinate === "world") {
			ga = toGrid(a);
			gb = toGrid(b);
		} else {
			ga = a;
			gb = b;
		}

		nodes = pathfinder.findPath(ga[0],ga[1],gb[0],gb[1],pathGrid);

		if (coordinate === "world") {
			for (i=0; i<nodes.length; i++) {
				nodes[i] = toWorld(nodes[i],nodeType);
			}
		}

		return nodes;
	},
	getSound = function(pos) {
		return soundGrid.get(toGrid(pos));
	},
	addSound = function(pos,intensity) {
		soundGrid.add(toGrid(pos),intensity);
	},
	getFreeDirection = function(pos) {
		var p = toGrid(pos),
		freeDir = [];

		if (mazeGrid[p[0]][p[1]-1] !== 1) {
			freeDir.push("up");
		}
		if (mazeGrid[p[0]][p[1]+1] !== 1) {
			freeDir.push("down");
		}
		if (mazeGrid[p[0]-1][p[1]] !== 1) {
			freeDir.push("left");
		}
		if (mazeGrid[p[0]+1][p[1]] !== 1) {
			freeDir.push("right");
		}

		return freeDir;
	},
	draw = function() {
		var p,alpha;
		for (i=0; i<mazeGrid.length; i++) {
			for (j=0; j<mazeGrid[0].length; j++) {
				p = toWorld([i,j],"center");
				alpha = Math.max(0,Math.min(soundGrid.get([i,j]),1));
				if (alpha > 0) {
					phys2DDebug.drawCircle(p[0],p[1],5.9,[1,1,0,alpha]);
				}
			}
		}
	},
	i,j;

	for (i=0; i<mazeGrid.length; i++) {
		for (j=0; j<mazeGrid[i].length; j++) {
			if (mazeGrid[i][j] === 1) {
				pathGrid.setWalkableAt(i, j, false);
			}
		}
	}

	loop.addToUpdate(id,maze);


	maze.update = update;
	maze.getSound = getSound;
	maze.addSound = addSound;
	maze.getPath = getPath;
	maze.getFreeDirection = getFreeDirection;
	maze.createEntities = createEntities;
	maze.toGrid = toGrid;
	maze.toWorld = toWorld;
	maze.draw = draw;
	return Object.freeze(maze);
}
