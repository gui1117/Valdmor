function createGene(spec) {
	let {perturbChance} = spec,
	into = 0,
	out = 0,
	weight = 0.0,
	enabled = true,
	innovation = 0,
	copy = function() {
		let gene2 = createGene();
		gene2.out = out;
		gene2.weight = weight;
		gene2.enabled = enabled;
		gene2.innovation = innovation;

		return gene2;
	},
	mutate = function(step) {
		if (Math.random() < PerturbChance) {
			weight += (Math.random()*2-1)*step;
		} else {
			weight = math.random()*4 - 2;
		}
	};

	return Object.freeze({
		copy,
		mutate,
	});
}
