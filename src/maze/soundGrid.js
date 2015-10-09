function createSoundGrid(spec) {
	var width = spec.width,
	height = spec.height,

	timeDelta = 100,
	coldCoef = 0.60,

	nextUpdate = timeDelta,
	time = 0,
	grid = [],
	tmpGrid = [],
	
	add = function(pos, intensity) {
		grid[pos[0]][pos[1]] += Math.pow(10,intensity);
	},
	get = function(pos) {
		return Math.log(grid[pos[0]][pos[1]]);
	},
	update = function (dt) {
		var i,j;

		time += dt;
		while (time > nextUpdate) {
			nextUpdate += timeDelta;

			for (i=1; i<grid.length-1; i++) {
				for (j=1; j<grid[i].length-1; j++) {
					tmpGrid[i][j] = coldCoef*1/6*(
							2*grid[i][j]
							+ grid[i+1][j]
							+ grid[i-1][j]
							+ grid[i][j+1]
							+ grid[i][j-1]
							)
				}
			}
			for (i=1; i<grid.length-1; i++) {
				for (j=1; j<grid[i].length-1; j++) {
					grid[i][j] = tmpGrid[i][j];
				}
			}
		}
	};

	grid.length = width;
	tmpGrid.length = width;
	for (i=0; i < width; i++) {
		grid[i] = [];
		grid[i].length = height;
		tmpGrid[i] = [];
		tmpGrid[i].length = height;

		for (j=0; j < height; j++) {
			grid[i][j] = 1;
			tmpGrid[i][j] = 1;
		}
	}

	return Object.freeze({
		add : add,
		get : get,
		update : update,
	});
}
