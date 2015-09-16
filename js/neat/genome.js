/* require gene */

function createGenome(spec) {
	let mutationRates = {},
	{
		perturbChance,
		mutateConnectionsChances,
		linkMutationChance,
		nodeMutationChance,
		enableMutationChance,
		disableMutationChance,
		biasMutationChance,
		stepSize,
		maxneuron
	} = spec,
	genes = [],
	fitness = 0,
	adjustedFitness = 0,
	network = {},
	globalRank = 0,
	setGlobalRank = function(rank) {
		globalRank = rank;
	},
	getFitness = function() {
		return fitness;
	},
	copy = function() {
		let genome2 = createGenome({
			perturbChance : perturbChance,
			mutateConnectionsChances : mutateConnectionsChances,
			linkMutationChance : linkMutationChance,
			nodeMutationChance : nodeMutationChance,
			enableMutationChance : enableMutationChance, 
			biasMutationChance : biasMutationChance,
			disableMutationChance : disableMutationChance,
			stepSize : stepSize
		});
		genome2.genes = genes.copy();

		return genome2;
	},
	mutate = function() {
		mutateConnectionsChances *= (Math.random(0,1)*0.10263+0.95);
		linkMutationChance *= (Math.random(0,1)*0.10263+0.95);
		nodeMutationChance *= (Math.random(0,1)*0.10263+0.95);
		enableMutationChance *= (Math.random(0,1)*0.10263+0.95);
		disableMutationChance *= (Math.random(0,1)*0.10263+0.95);
		biasMutationChance *= (Math.random(0,1)*0.10263+0.95);
		stepSize *= (Math.random(0,1)*0.10263+0.95);

		if (Math.random() < mutateConnectionsChances) {
			genes.forEach(function (gene) {
				gene.mutate(stepSize);
			});
		}

		let p;
		for (p=linkMutationChance; p>0; p--) {
			if (Math.random() < p) {
				linkMutate();
			}
		}

		for (p=biasMutationChance; p>0; p--) {
			if (Math.random() < p) {
				linkMutate();
			}
		}

		for (p=nodeMutationChance; p>0; p--) {
			if (Math.random() < p) {
				nodeMutate();
			}
		}

		for (p=enableMutationChance; p>0; p--) {
			if (Math.random() < p) {
				enableDisableMutate(true);
			}
		}

		for (p=disableMutationChance; p>0; p--) {
			if (Math.random() < p) {
				enableDisableMutate(false);
			}
		}
	},

	return Object.freeze({
		copy,
		mutate,
		getFitness
	});
}
