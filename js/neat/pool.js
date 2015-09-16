/* require species */

function createPool(spec) {
	let {numberOfOutputs} = spec,
	species = [],
	generation = 0,
	innovation = numberOfOutputs,
	currentSpecies = 0,
	currentFrame = 0,
	maxFitness = 0,
	newInnovation = function() {
		innovation++;
		return innovation;
	},
	rankGlobally = function() {
		let global = [];

		species.forEach(function(species) {
			species.genomes.forEarch(function(genome) {
				global.push(genome);
			});
		});

		global.sort(function(a,b) {
			return (a.getFitness() < b.getFitness());
		});

		let count = 0;
		global.forEach(function(genome) {
			genome.setGlobalRank(count);
			count++;
		});
	},
	removeStaleSpecies = function() {
		let survived = [];
		species.forEach(function (species) {
			species.genomes.sort(function (a,b) {
				return (a.getFitness() > b.getFitness);
			};
			if (species.genomes[0].getFitness() > species.topFitness) {
				species.topFitness = species.genomes[0].getFitness();
				species.staleness = 0;
			} else {
				species.staleness++;
				// here we are, species.removeStale ?
	};

	return Object.freeze({
		newInnovation
	});
}
