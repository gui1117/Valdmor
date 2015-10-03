/* possibilité pour améliorer :
 * 		pour une certaine proba on prend dans a salle
 * 		une salle plus petite qui relie a la meme sortie et entre
 * 		avec un couloir si il faut
 */

function createMaze() {
	var maxRoom = 5,
	roomSize = 6,
	generateRoomGrid = function() {
		/* 0: void
		 * 1: first room
		 * 2: second
		 * 3: third 
		 * ....
		 */
		var grid = [],
		n = 0,
		i,j,k,forbidden;
		grid.length = maxRoom*2-1;
		for (i=0; i<grid.length; i++) {
			grid[i] = [];
			grid[i].length = maxRoom*2+1;
			for (j=0; j<grid[i].length; j++) {
				grid[i][j] = 0;
			}
		}

		i = maxRoom-1;
		j = maxRoom-1;
		while (!grid[i][j] && n<maxRoom) {
			n++;
			grid[i][j] = n;

			do {
				k = Math.floor(Math.random()*4);
			} while (k === forbidden)
			switch (k) { 
				case 0:
					i++;
					forbidden = 1;
					break;
				case 1:
					i--;
					forbidden = 0;
					break;
				case 2:
					j++;
					forbidden = 3;
					break;
				case 3:
					j--;
					forbidden = 2;
					break;
			}
		}

		return {grid : grid, numberOfRoom : n};
	},
	generateGrid = function(roomObj) {
		/* 0 : empty
		 * 1 : wall
		 */
		var grid = [],
		i,j,k,l,x,y,
		rg,room,
		entrance,exit;

		/* init empty grid */
		grid.length = (maxRoom*2-1)*(roomSize+1)*2+1
			for (i=0; i<grid.length; i++) {
				grid[i] = []
				grid[i].length = grid.length;
				for (j=0; j<grid.length; j++) {
					if (i%2 === 0 && j%2 === 0) {
						grid[i][j] = 1;
					} else {
						grid[i][j] = 0;
					}
				}
			}
		/* end init empty grid */

		/* set rooms */
		rg = roomObj.grid;
		room = [];
		room.length = roomObj.numberOfRoom;
		for (i=0; i<rg.length; i++) {
			for (j=0; j<rg[i].length; j++) {
				if (rg[i][j]) {
					room[rg[i][j]] = [i,j];
				}
			}
		}
		for (i=1; i<room.length; i++) {
			entrance = Math.floor(Math.random()*roomSize);
			exit = entrance;
			room[i].exit = exit;
			x = 2*room[i][0]*(roomSize +1);
			y = 2*room[i][1]*(roomSize +1);

			for (k=0; k<roomSize; k++) {
				grid[x][y+2*k+1] = 1;
				grid[x+2*k+1][y] = 1;
				grid[x+2*roomSize][y+2*k+1] = 1;
				grid[x+2*k+1][y+2*roomSize] = 1;
			}

			/* SORRY this code is ugly as hell */
			if (i !== 1) {
				if (entrance > room[i-1].exit) {
					l = true;
				} else {
					l = false;
				}

				if        (room[i-1][0] === room[i][0] && room[i-1][1] <= room[i][1]) {
					grid[x+1+entrance*2][y] = 0;
					if (l) {
						grid[x+2+entrance*2][y-1] = 1;
						grid[x+0+room[i-1].exit*2][y-1] = 1;
					} else {
						grid[x+0+entrance*2][y-1] = 1;
						grid[x+2+room[i-1].exit*2][y-1] = 1;
					}

				} else if (room[i-1][0] === room[i][0] && room[i-1][1] >= room[i][1]) {
					grid[x+1+entrance*2][y+roomSize*2] = 0;
					if (l) {
						grid[x+2+entrance*2][y+roomSize*2+1] = 1;
						grid[x+0+room[i-1].exit*2][y+roomSize*2+1] = 1;
					} else {
						grid[x+0+entrance*2][y+roomSize*2+1] = 1;
						grid[x+2+room[i-1].exit*2][y+roomSize*2+1] = 1;
					}


				} else if (room[i-1][0] <= room[i][0] && room[i-1][1] === room[i][1]) {
					grid[x][y+1+entrance*2] = 0;
					if (l) {
						grid[x-1][y+2+entrance*2] = 1;
						grid[x-1][y+0+room[i-1].exit*2] = 1;
					} else {
						grid[x-1][y+0+entrance*2] = 1;
						grid[x-1][y+2+room[i-1].exit*2] = 1;
					}


				} else if (room[i-1][0] >= room[i][0] && room[i-1][1] === room[i][1]) {
					grid[x+roomSize*2][y+1+entrance*2] = 0;
					if (l) {
						grid[x+roomSize*2+1][y+2+entrance*2] = 1;
						grid[x+roomSize*2+1][y+0+room[i-1].exit*2] = 1;
					} else {
						grid[x+roomSize*2+1][y+0+entrance*2] = 1;
						grid[x+roomSize*2+1][y+2+room[i-1].exit*2] = 1;
					}
				}
			}
			if (i !== room.length-1) {
				if 		  (room[i+1][0] === room[i][0] && room[i+1][1] <= room[i][1]) {
					grid[x+1+entrance*2][y] = 0;

				} else if (room[i+1][0] === room[i][0] && room[i+1][1] >= room[i][1]) {
					grid[x+1+entrance*2][y+roomSize*2] = 0;

				} else if (room[i+1][0] <= room[i][0] && room[i+1][1] === room[i][1]) {
					grid[x][y+1+entrance*2] = 0;

				} else if (room[i+1][0] >= room[i][0] && room[i+1][1] === room[i][1]) {
					grid[x+roomSize*2][y+1+entrance*2] = 0;

				}
			}
			/* end SORRY */
		}
		/* end set rooms */

		return grid;
	},
	grid,
	draw = function() {
		var x,y,square,color,
		s2,scale = 6;
		s2=scale/2;
		for (x=0; x<grid.length; x++) {
			for (y=0; y<grid[x].length; y++) {
				square = grid[x][y];
				if (square > 0) {
					color = [0,1,1,1];
					phys2DDebug.drawCircle(x*scale+s2,y*scale+s2,s2/2,color);
				}
			}
		}

	};


	grid = generateGrid(generateRoomGrid());;

	return Object.freeze({
		draw : draw
	});
}
