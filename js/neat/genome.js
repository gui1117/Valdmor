function initConstructorGenome(spec) {
	let	{
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

	function create(spec) {
		let genes,
		fitness,
		calculateAverageFitness,
		setFitness,
		getFitness,
		adjustedFitness,
		network,
		evaluateNetwork,
		globalRank,
		getGlobalRank,
		setGlobalRank,
		copy,
		mutate,

		return Object.freeze({
			setFitness,
			getFitness,
			getGlobalRank,
			setGlobalRank,
			evaluateNetwork,
	};
	function crossover(genome1,genome2) {
	};
	return contructorGenome;
}

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
	getGlobalRank = function() {
		return globalRank;
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
//	getInnovationArray = function() {
//		/* be careful */
//		let innovation = [];
//		genes.forEach(function (gene) {
//			innovation[gene.
	crossover = function(genome) {
		if (genome.getFitness > fitness) {
			console.error("crossover with higher fitness genome");
		}
		let child = copy();
		child.genes.forEach(function(gene) {
			if (Math.random(0,1)===1 && genome.innovationPresentAndEnabled(gene.innovation)) {
				child.genes[genes.indexOf(gene)]genome.copyInnovation(gene.innovation);
			}
		});
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
		getFitness,
		getGlobalRank,
		setGlobalRank
	});
}
