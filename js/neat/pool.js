/* require species */

function createPool(spec) {
	let {
		crossoverChance,
		numberOfInputs,
		numberOfOutputs,
		perturbChance,
		mutateConnectionsChances,
		linkMutationChance,
		nodeMutationChance,
		enableMutationChance,
		disableMutationChance,
		stepSize,
		staleSpecies
	} = spec,
	species = [],
	generation = 0,
	innovation = numberOfOutputs,
	currentSpecies = 0,
//	currentFrame = 0,
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
			});
			if (species.genomes[0].getFitness() > species.topFitness) {
				species.topFitness = species.genomes[0].getFitness();
				species.staleness = 0;
			} else {
				species.staleness++;
			}
			if (species.staleness < staleSpecies 
				|| species.topFitness >= maxFitness) {
				survived.push(species);
			}
		});

		species = survived;
	},
	totalAverageFitness = function() {
		let total = 0;
		species.forEach(function(species) {
			total += species.averageFitness;
		});
		return total;
	},
	removeWeakSpecies = function() {
		let survived = [];
		let sum = totalAverageFitness();
		species.forEach(function(species) {
			breed = Math.floor(species.averageFitness / sum * population);
			if (breed >= 1) {
				survived.push(species);
			}
		});
		species = survived;
	},
	newSpecies = function() {
		return {
			topFitness : 0,
			staleness : 0,
			genomes : 0,
			averageFitness : 0,
			calculateAverageFitness = function() {
				let total = 0;
				genomes.forEach(function(genome) {
					total += genome.getGlobalRank();
				});
				averageFitness = total / genomes.length;
			},
			breedChild = function() {
				let child;
				if (Math.random() < crossoverChance) {
					let g1 = genomes[Math.random(0,genomes.length-1)];
					let g2 = genomes[Math.random(0,genomes.length-1)];
					if (g1.getFitness > g2.getFitness) {
						g1.crossover(g2);
					} else {
						g2.crossover(g1);
					}
					//------------------------

				} 
			}
		};
	},
	cullSpecies = function(cutToZero) {
		species.forEach(function(species) {
			species.genomes.sort(function(a,b) {
				return (a.getFitness() > b.getFitness);
			});
			let remaining = Math.ceil(species.genomes.length/2);
			if (cutToZero) {
				remaining = 0;
			}
			while (species.genomes.length > remaining) {
				species.genomes.pop();
			}
		});
	},
	addToSpecies = function(child) {
		for (let s=0; s<species.length; s++) {
			let spe = species[s];
			if (sameSpecies(child, spe.genomes[0])) {
				species.genomes.push(child);
				return;
			}
		}
		childSpecies = newSpecies();
		childSpecies.genomes.push(child);
		species.push(childSpecies);
	},
	initPopulation = function(population) {
		species.length = population;
		for (let i=0; i<population; i++) {
			let basic = createGenome({
				maxneuron : numberOfInputs,
				perturbChance : perturbChance,
				mutateConnectionsChances : mutateConnectionsChances,
				linkMutationChance : linkMutationChance,
				nodeMutationChance : nodeMutateperturbChance,
				enableMutationChance : enableMutationChance,
				disableMutationChance : disableMutationChance,
				stepSize : stepSize,
			});
			basic.mutate();
			addToSpecies(basic);
		}
	},
	newGeneration = function() {
		cullSpecies(false);
		rankGlobally();
		removeStaleSpecies();
		rankGlobally();
		species.forEach(function(species) {
			species.calculateAverageFitness();
		}
		removeWeakSpecies();
		let sum = totalAverageFitness();
		let children = [];
		species.forEach(function(species) {
			breed = Math.floor(species.averageFitness / sum * population) -1;
			for (let i=0; i<breed; i++) {
				//---------------------
		});
	};

	return Object.freeze({
		newInnovation
	});
}
