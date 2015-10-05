function createMaze(spec) {
	var smallSquare = spec ? spec.smallSquare : 20,
	bigSquare = spec ? spec.bigSquare : 200,

	id = newIdentifier(),
	maze = {},
	updateSoundTime = 1,
	updateSoundDelta = 1,
	time = 0,
	mazeGrid = generateMaze().grid,
	coldCoef = 0.85,

	WALL = 0,
	SOUND = 1,
	tmpGrid = [],
	grid = [],

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
	toWorld = function(pos,center) {
		var x = Math.floor(pos[0]/2)*(smallSquare+bigSquare),
		y = Math.floor(pos[1]/2)*(smallSquare+bigSquare);
		if (center) {
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
		} else {
			x += (pos[0]%2)*smallSquare;
			y += (pos[1]%2)*smallSquare;
		}
		return [x,y];
	},
	addSound = function(position, intensity) {
		var p = toGrid(position);
		grid[p[0]][p[1]][SOUND] += Math.pow(10,intensity);
	},
	getSound = function(pos) {
		var p = toGrid(pos);
		return Math.log(grid[p[0]][p[1]][SOUND]);
	},
	updateSound = function() {
		var i,j;
		for (i=1; i<grid.length-1; i++) {
			for (j=1; j<grid[i].length-1; j++) {
				tmpGrid[i][j] = coldCoef*1/6*(
						2*grid[i][j][SOUND]
						+ grid[i+1][j][SOUND]
						+ grid[i-1][j][SOUND]
						+ grid[i][j+1][SOUND]
						+ grid[i][j-1][SOUND]
						)
			}
		}
		for (i=1; i<grid.length-1; i++) {
			for (j=1; j<grid[i].length-1; j++) {
				grid[i][j][SOUND] = tmpGrid[i][j];
			}
		}
	},
	update = function(dt) {
		time += dt;
		while (time > updateSoundTime) {
			updateSoundTime = time + updateSoundDelta;
			updateSound();
		}
	},
	instantiateMaze = function() {
		var i,j,p,h2,w2;
		for (i=1; i<grid.length-1; i++) {
			for (j=1; j<grid[i].length-1; j++) {
				p = toWorld([i,j],true);

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
							position : p,
							topleft : [-w2,-h2],
							downright : [w2,h2],
						});
						break;

					case 2:
						character = createCharacter({
							position : p
						});
						break;

					case 3:
						break;

					case 4:
						break;
				}
			}
		}
	},
	draw = function() {
		var p,alpha;
		for (i=0; i<mazeGrid.length; i++) {
			for (j=0; j<mazeGrid[0].length; j++) {
				p = toWorld([i,j],true);
				alpha = Math.max(0,Math.min(Math.log(grid[i][j][SOUND]),1));
				if (alpha > 0) {
					phys2DDebug.drawCircle(p[0],p[1],5.9,[1,1,0,alpha]);
				}
			}
		}
	},
	i,j;

	grid.length = mazeGrid.length;
	tmpGrid.length = mazeGrid.length;
	for (i=0; i<mazeGrid[0].length; i++) {
		grid[i] = [];
		grid[i].length = mazeGrid[0].length;
		tmpGrid[i] = [];
		tmpGrid[i].length = mazeGrid[0].length;

		for (j=0; j<mazeGrid[0].length; j++) {
			grid[i][j] = [0,1];
			tmpGrid[i][j] = 0;
		}
	}

	instantiateMaze();
	loop.addToUpdate(id,maze);


	maze.update = update;
	maze.getSound = getSound;
	maze.addSound = addSound;
	maze.draw = draw;
	return Object.freeze(maze);
}
