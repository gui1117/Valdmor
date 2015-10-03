function createIncrement(n) {
	var i = n || 0,
	inc = function() {
		i++;
		return i;
	};
	return inc;
}
