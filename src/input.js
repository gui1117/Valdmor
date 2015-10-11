function createInput(spec) {
	var input = {},

	isDown = {},
	reverseKeyCodes = [],
	reverseMouseCodes = [],

	keydown = function(keyCode) {
		isDown[reverseKeyCodes[keyCode]] = true;
	},
	keyup = function(keyCode) {
		isDown[reverseKeyCodes[keyCode]] = false;
	},
	mousedown = function(mouseCode) {
		isDown[reverseMouseCodes[mouseCode]] = true;
	},
	mouseup = function(mouseCode) {
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
