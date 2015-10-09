function createAlarm(spec) {
	var id = newIdentifier(),
	alarm = {},

	isOn = function() {
		return true;
	};

	alarm.isOn = isOn;
	return Object.freeze(alarm);
}
