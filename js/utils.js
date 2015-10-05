function createIncrement(n) {
	var i = n || 0,
	inc = function() {
		i++;
		return i;
	};
	return inc;
}

function distance(p1, p2) {
	return Math.sqrt(
			Math.pow(p1[0]-p2[0],2)
			+Math.pow(p1[1]-p2[1],2)
			);
}

function angle(p1, p2) {
	return Math.atan2(p2[1]-p1[1],p2[0]-p1[0]);
}
