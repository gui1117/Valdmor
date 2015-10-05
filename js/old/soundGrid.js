function createSoundGrid(spec) {
	var scale = spec.scale,
	width = spec.width,
	height = spec.height,

	scalar = 10,
	grid = [[],[]],
	cur = 0,
	counter = 0,
	updateTime = 1,
	addSound = function(spec) {
		var p = spec.position,
		i = spec.intensity,

		x = Math.floor(p[0]/scale),
		y = Math.floor(p[1]/scale);
		grid[cur][x][y] += Math.pow(scalar,i);
	},
	getSound = function(p) {
		var x = Math.floor(p[0]/scale),
		y = Math.floor(p[1]/scale);

		return Math.log(grid[x][y]);
	},
	update = function(dt) {
		var i,j,
		next;

		counter = counter+dt;
		if (counter > updateTime) {
			next = (cur+1) % 2;
			cunter = 0;

			for (i=1; i<grid[0].length-1; i++) {
				for (j=1; j<grid[0][i].length-1; j++) {
					grid[next][i][j] = 1/6/5*(
							2*grid[cur][i][j]
							+ grid[cur][i+1][j]
							+ grid[cur][i-1][j]
							+ grid[cur][i][j+1]
							+ grid[cur][i][j-1]
							)
				}
			}
			cur = next;
		}
	},
	draw = function() {
		var s2 = scale/2,
		x,y,square,color;
		for (x=0; x<grid[0].length; x++) {
			for (y=0; y<grid[0][x].length; y++) {
				square = grid[cur][x][y];
				if (square > 2) {
					color = [0,1,0,Math.min(1,Math.log(square)/100)]
					phys2DDebug.drawCircle(x*scale+s2,y*scale+s2,s2/2,color);
				}
			}
		}
	},
	i,j;

	grid[0].length = Math.floor(width/scale);
	grid[1].length = Math.floor(width/scale);
	for (i=0; i<grid[0].length; i++) {
		grid[0][i] = [];
		grid[1][i] = [];
		grid[0][i].length = Math.floor(height/scale);
		grid[1][i].length = Math.floor(height/scale);
		for (j=0; j<grid[0][i].length; j++) {
			grid[0][i][j] = 1;
			grid[1][i][j] = 1;
		}
	}

	return Object.freeze({
		addSound : addSound,
		getSound : getSound,
		update : update,
		draw : draw,
	});
}
