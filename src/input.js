"use strict";

function createInput(spec) {
	var input = {};

	var isDown = {};
	var reverseKeyCodes = [];
	var reverseMouseCodes = [];

	var keydown = function(keyCode) {
		isDown[reverseKeyCodes[keyCode]] = true;
	};
	var keyup = function(keyCode) {
		isDown[reverseKeyCodes[keyCode]] = false;
	};
	var mousedown = function(mouseCode) {
		isDown[reverseMouseCodes[mouseCode]] = true;
	};
	var mouseup = function(mouseCode) {
		isDown[reverseMouseCodes[mouseCode]] = false;
	};

	for (var i in inputDevice.keyCodes) {
		reverseKeyCodes[inputDevice.keyCodes[i]] = i;
	}
	for (var i in inputDevice.mouseCodes) {
		reverseMouseCodes[inputDevice.mouseCodes[i]] = i;
	}

	inputDevice.addEventListener('keydown',keydown);
	inputDevice.addEventListener('keyup',keyup);
	inputDevice.addEventListener('mousedown',mousedown);
	inputDevice.addEventListener('mouseup',mouseup); 

	inputDevice.ReverseKeyCodes = reverseKeyCodes;
	inputDevice.ReverseMouseCodes = reverseMouseCodes;

	input.isDown = isDown;
	return Object.freeze(input);
}
