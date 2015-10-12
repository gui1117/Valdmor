"use strict";

function createIncrement(n) {
	var i = n || 0;
	var inc = function() {
		i++;
		return i;
	};
	return inc;
}

function getDistance(p1, p2) {
	return Math.sqrt(
			Math.pow(p1[0]-p2[0],2)
			+Math.pow(p1[1]-p2[1],2)
			);
}

function getAngle(p1, p2) {
	return Math.atan2(p2[1]-p1[1],p2[0]-p1[0]);
}
