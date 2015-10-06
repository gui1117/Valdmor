/* possibilité pour améliorer :
 * 		pour une certaine proba on prend dans a salle
 * 		une salle plus petite qui relie a la meme sortie et entre
 * 		avec un couloir si il faut
 *
 * 		bof ou sinon salles préfaites :
 *
 * 		model : 
 * 		 _ _ _ _ _ _
 * 		|_|_|_|_|_|_|
 * 		|_|_|_|_|_|_|
 * 		|_|_|_|_|_|_|
 * 		|_|_|_|_|_|_|
 * 		|_|_|_|_|_|_|
 * 		|_|_|_|_|_|_|
 *
 * 		1.0 : 
 * 		 _ _ _ _ _ _
 * 		|   |   |   |
 * 		|_  |_   _ _|
 * 		|       |   |
 * 		|_ _|  _   _|
 * 		|       |   |
 * 		|_ _|_ _|_ _|
 *
 * 		1.1 : 
 * 		 _ _ _ _ _ _
 * 		|   |   |   |
 * 		|_  |    _ _|
 * 		|           |
 * 		|_ _       _|
 * 		|       |   |
 * 		|_ _|_ _|_ _|
 *
 * 		2.0 : 
 * 		 _ _ _ _ _ _
 * 		|  _     _  |
 * 		| |#|   |#| |
 * 		|           |
 * 		|  _     _  |
 * 		| |#|   |#| |
 * 		|_ _ _ _ _ _|
 *
 * 		2.1 : 
 * 		 _ _ _ _ _ _
 * 		|  _     _  |
 * 		| |#|   |#| |
 * 		|    _|_    |
 * 		|  _  |  _  |
 * 		| |#|   |#| |
 * 		|_ _ _ _ _ _|
 
 *
 * 		3.0 : 
 * 		 _ _ _ _ _ _
 * 		|           |
 * 		|    _ _    |
 * 		|   |###|   |
 * 		|   |###|   |
 * 		|           |
 * 		|_ _ _ _ _ _|
 *
 * 		3.1 : 
 * 		 _ _ _ _ _ _
 * 		|   |   |   |
 * 		|_   _ _   _|
 * 		|   |###|   |
 * 		|_  |###|  _|
 * 		|           |
 * 		|_ _|_ _|_ _|
 *
 * 
 * 		4.0 : 
 * 		 _ _ _ _ _ _
 * 		|_  | |_ _  |
 * 		| | |_  |  _|
 * 		| |_  |  _| |
 * 		| |       | |
 * 		|_ _| | |_ _|
 * 		|_ _ _|_ _ _|
 *
 * 		5.0 :
 * 		 _ _ _ _ _ _
 * 		|     |     |
 * 		|_ _  |  _ _|
 * 		|   |   |   |
 * 		|           |
 * 		|   |   |   |
 * 		|_ _|_ _|_ _|
 *
 */

initRoom = function(x,y,grid,roomSize) {
	var k,l,
	type = [];

	type.push(function() {
/* 		1.0 : 
 * 		 _ _ _ _ _ _
 * 		|   |   |   |
 * 		|_  |_   _ _|
 * 		|       |   |
 * 		|_ _|  _   _|
 * 		|       |   |
 * 		|_ _|_ _|_ _|
 */
		var k;
		for (k=1; k<roomSize*2; k++) {
			grid[x+4][y+k] = 1;
			grid[x+8][y+k] = 1;
			grid[x+k][y+4] = 1;
			grid[x+k][y+8] = 1;
		}
		grid[x+4][y+5] = 0;
		grid[x+4][y+9] = 0;
		grid[x+8][y+3] = 0;
		grid[x+8][y+7] = 0;

		grid[x+3][y+4] = 0;
		grid[x+7][y+4] = 0;
		grid[x+5][y+8] = 0;
		grid[x+9][y+8] = 0;
	});

	type.push(function() {
/*
 * 		1.1 : 
 * 		 _ _ _ _ _ _
 * 		|   |   |   |
 * 		|_  |    _ _|
 * 		|           |
 * 		|_ _       _|
 * 		|       |   |
 * 		|_ _|_ _|_ _|
 */
		var k;
		for (k=1; k<roomSize*2; k++) {
			grid[x+4][y+k] = 1;
			grid[x+8][y+k] = 1;
			grid[x+k][y+4] = 1;
			grid[x+k][y+8] = 1;
		}
		grid[x+4][y+5] = 0;
		grid[x+4][y+6] = 0;
		grid[x+4][y+7] = 0;
		grid[x+4][y+8] = 0;
		grid[x+4][y+9] = 0;

		grid[x+8][y+3] = 0;
		grid[x+8][y+4] = 0;
		grid[x+8][y+5] = 0;
		grid[x+8][y+6] = 0;
		grid[x+8][y+7] = 0;

		grid[x+3][y+4] = 0;
		grid[x+4][y+4] = 0;
		grid[x+5][y+4] = 0;
		grid[x+6][y+4] = 0;
		grid[x+7][y+4] = 0;

		grid[x+5][y+8] = 0;
		grid[x+6][y+8] = 0;
		grid[x+7][y+8] = 0;
		grid[x+8][y+8] = 0;
		grid[x+9][y+8] = 0;
	});


	type.push(function() {
/*
 * 		2.0 : 
 * 		 _ _ _ _ _ _
 * 		|  _     _  |
 * 		| |#|   |#| |
 * 		|           |
 * 		|  _     _  |
 * 		| |#|   |#| |
 * 		|_ _ _ _ _ _|
 */
		[2,3,4,8,9,10].forEach(function(k) {
			grid[x+k][y+2] = 1;
			grid[x+k][y+3] = 1;
			grid[x+k][y+4] = 1;
			grid[x+k][y+8] = 1;
			grid[x+k][y+9] = 1;
			grid[x+k][y+10] = 1;
		});

	});

	type.push(function() {
/*
 * 		2.1 : 
 * 		 _ _ _ _ _ _
 * 		|  _     _  |
 * 		| |#|   |#| |
 * 		|    _|_    |
 * 		|  _  |  _  |
 * 		| |#|   |#| |
 * 		|_ _ _ _ _ _|
 */
		[2,3,4,8,9,10].forEach(function(k) {
			grid[x+k][y+2] = 1;
			grid[x+k][y+3] = 1;
			grid[x+k][y+4] = 1;
			grid[x+k][y+8] = 1;
			grid[x+k][y+9] = 1;
			grid[x+k][y+10] = 1;
		});
		grid[x+6][y+5] = 1;
		grid[x+6][y+6] = 1;
		grid[x+6][y+7] = 1;
		grid[x+5][y+6] = 1;
		grid[x+6][y+6] = 1;
		grid[x+7][y+6] = 1;
	});

	type.push(function() {
/* 		3.0 : 
 * 		 _ _ _ _ _ _
 * 		|           |
 * 		|    _ _    |
 * 		|   |###|   |
 * 		|   |###|   |
 * 		|           |
 * 		|_ _ _ _ _ _|
 */
		var k,l;
		for (k=4; k<9; k++) {
			for (l=4; l<9; l++) {
				grid[x+k][y+l] = 1;
			}
		}
	});

	type.push(function() {
/* 		3.1 : 
 * 		 _ _ _ _ _ _
 * 		|   |   |   |
 * 		|_   _ _   _|
 * 		|   |###|   |
 * 		|_  |###|  _|
 * 		|           |
 * 		|_ _|_ _|_ _|
 */

		var k,l;
		for (k=4; k<9; k++) {
			for (l=4; l<9; l++) {
				grid[x+k][y+l] = 1;
			}
		}
		grid[x+4][y+1] = 1;
		grid[x+8][y+1] = 1;
		grid[x+4][y+11] = 1;
		grid[x+8][y+11] = 1;

		grid[x+1][y+4] = 1;
		grid[x+1][y+8] = 1;
		grid[x+11][y+4] = 1;
		grid[x+11][y+8] = 1;
	});

	type.push(function() {
/* 		4.0 : 
 * 		 _ _ _ _ _ _
 * 		|_  | |_ _  |
 * 		| | |_  |  _|
 * 		| |_  |  _| |
 * 		| |       | |
 * 		|_ _| | |_ _|
 * 		|_ _ _|_ _ _|
 */
		grid[x+1][y+2] = 1;
		grid[x+1][y+10] = 1;

		grid[x+2][y+2] = 1;
		grid[x+2][y+3] = 1;
		grid[x+2][y+4] = 1;
		grid[x+2][y+5] = 1;
		grid[x+2][y+6] = 1;
		grid[x+2][y+7] = 1;
		grid[x+2][y+8] = 1;
		grid[x+2][y+10] = 1;

		grid[x+3][y+6] = 1;
		grid[x+3][y+10] = 1;

		grid[x+4][y+1] = 1;
		grid[x+4][y+2] = 1;
		grid[x+4][y+3] = 1;
		grid[x+4][y+4] = 1;
		grid[x+4][y+8] = 1;
		grid[x+4][y+9] = 1;
		grid[x+4][y+10] = 1;

		grid[x+5][y+4] = 1;

		grid[x+6][y+1] = 1;
		grid[x+6][y+2] = 1;
		grid[x+6][y+4] = 1;
		grid[x+6][y+5] = 1;
		grid[x+6][y+6] = 1;
		grid[x+6][y+8] = 1;
		grid[x+6][y+9] = 1;
		grid[x+6][y+10] = 1;
		grid[x+6][y+11] = 1;

		grid[x+7][y+2] = 1;

		grid[x+8][y+2] = 1;
		grid[x+8][y+3] = 1;
		grid[x+8][y+4] = 1;
		grid[x+8][y+8] = 1;
		grid[x+8][y+9] = 1;
		grid[x+8][y+10] = 1;

		grid[x+9][y+2] = 1;
		grid[x+9][y+6] = 1;

		grid[x+10][y+2] = 1;
		grid[x+10][y+4] = 1;
		grid[x+10][y+5] = 1;
		grid[x+10][y+6] = 1;
		grid[x+10][y+7] = 1;
		grid[x+10][y+8] = 1;
		grid[x+10][y+10] = 1;

		grid[x+11][y+4] = 1;
		grid[x+11][y+10] = 1;
	});

	type.push(function() {
/*
 * 		5.0 :
 * 		 _ _ _ _ _ _
 * 		|     |     |
 * 		|_ _  |  _ _|
 * 		|   |   |   |
 * 		|           |
 * 		|   |   |   |
 * 		|_ _|_ _|_ _|
 */
		[1,2,3,4,6,8,9,10,11].forEach(function(k) {
			grid[x+k][y+4] = 1;
		});
		[1,2,3,4].forEach(function(k) {
			grid[x+6][y+k] = 1;
		});
		[4,5,6,8,9,10,11].forEach(function(k) {
			grid[x+4][y+k] = 1;
			grid[x+8][y+k] = 1;
		});
	});


	grid[x][y] = 1;
	for (k=0; k<roomSize; k++) {
		grid[x][y+2*k+1] = 1;
		grid[x][y+2*k+2] = 1;
		grid[x+2*k+1][y] = 1;
		grid[x+2*k+2][y] = 1;
		grid[x+2*roomSize][y+2*k+1] = 1;
		grid[x+2*roomSize][y+2*k+2] = 1;
		grid[x+2*k+1][y+2*roomSize] = 1;
		grid[x+2*k+2][y+2*roomSize] = 1;
		for (l=0; l<roomSize; l++) {
			grid[x+2*k+1][y+2*l+1] = 4;
		}
	}

	l = Math.floor(Math.random()*type.length);
	type[l]();
}
