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
		numberOfInputs,
		maxNodes,
		numberOfOuputs,
		newInnovation,
	} = spec,

	function create(spec) {
		/* set attribut */
		genes = [];
		let MutationRates = {
				connections : mutateConnectionsChances,
				link : linkMutationChance,
				node : nodeMutationChance,
				enable : enableMutationChance,
				disable : disableMutationChance,
				bias : biasMutationChance,
				stepSize : stepSize
		}
		if (spec) {
			if (spec.genes) {
				spec.genes.forEach(function(gene) {
					genes.push({
						into : gene.into,
						out : gene.out,
						weight : gene.weight,
						enabled : gene.enabled,
						innovation : gene.innovation
					});
				});
			}
			if (spec.mutationRates) {
				let mutationRates = {
					connections : spec.connections,
					link : spec.link,
					node : spec.node,
					enable : spec.enable,
					disable : spec.disable,
					bias : spec.bias,
					stepSize : spec.stepSize
				};
			}
		}
		

		let fitness = 0,
		innovation = 0,
		maxneuron = maxneuron || numberOfInputs, // cursor representing the index of the max inner neuron, it can be calculated from genes.into et genes.out
		setFitness = function(num) {
			fitness = num,
		},
		getFitness = function() {
			return fitness;
		},
		//adjustedFitness seem not to be used
		newNeuron = function() {
			return {incoming = [],value = 0.0};
		},
		network = [],
		generateNetwork = function() {
			network = [];

			let i;
			for (i=0; i<numberOfInputs; i++) {
				network[i] = newNeuron();
			}
			for (i=0; i<numberOfOuputs; i++) {
				network[i+maxNodes] = newNeuron();
			}

			genes.sort(function(a,b) {
				return (a.out < b.out);
			});
			genes.forEach(function(gene) {
				if (gene.enabled) {
					if (network[gene.out] === undefined) {
						network[gene.out] = newNeuron();
					}
					network.neurons[gene.out].incoming.push(gene);
					if (network[gene.into] === undefined) {
						network[gene.into] = newNeuron();
					}
				}
			});
		},
		sigmoid = function(x) {
			return 1/(1+Math.exp(-x));
			//return 2/(1+math.exp(-4.9*x))-1
		},
		evaluateNetwork = function(inputs) {
			inputs.push(1);

			for (let i=0; i<numberOfInputs; i++) {
				network[i].value = inputs[i];
			}

			Object.key(network).forEach(function(key) {
				let sum = 0;
				let neuron = network[key];

				neuron.incoming.forEach(function(gene) {
					sum += gene.weight*network[gene.into].value;
				});
				if (neuron.incoming.length > 0) {
					neuron.value = sigmoid(sum);
				}
			});

			let outputs = [];
			for (let i=0; i<numberOfOuputs; i++) {
				outputs.push(network[maxNodes+i]);
			}
			return outputs;
		},
		globalRank = 0,
		setGlobalRank = function(num) {
			globalRank = num;
		},
		getGlobalRank = function() {
			return globalRank;
		},
		copy = function() {
			return create({
				genes : genes,
				maxneuron : maxneuron,
				mutationRates : mutationRates, // must be copied by constructor and not referenced
			});
		},
		mutate = function() {
			Object.key(mutationRates).forEach(function(key) {
				mutationRates[key] *= (0.95 + Math.random(0,1)*0.10263); 
			});

			if (Math.random() < mutationRates.connections) {
				pointMutate();
			}
			var p = genome.mutationRates.link;
			while (p > 0) {
				if (Math.random() < p) {
					linkMutate(false);
				}
				p--;
			}
			p = genome.mutationRates.bias;
			while (p > 0) {
				if (Math.random() < p) {
					linkMutate(true);
				}
				p--;
			}
			p = genome.mutationRates.node;
			while (p > 0) {
				if (Math.random() < p) {
					nodeMutate();
				}
				p--;
			}
			p = genome.mutationRates.enable;
			while (p > 0) {
				if (Math.random() < p) {
					enableDisableMutate(true);
				}
				p--;
			}
			p = genome.mutationRates.disable;
			while (p > 0) {
				if (Math.random() < p) {
					enableDisableMutate(false);
				}
				p--;
			}
		},
		pointMutate = function() {
			genes.forEach(function(gene) {
				if (math.random() < perturbChance) {
					let step = mutationRates.stepsize;
					gene.weight += math.random()*step*2 - step;
				} else {
					gene.weight = math.random()*4 -2;
				}
			});
		},
		randomNeuron = function(notInput) {
			let neuron = [];
			neuron.length = numberOfInputs;
			for (let i=0; i<numberOfInputs; i++) {
				neuron[i] = true;
			}
			for (let o=0; o<numberOfOuputs; o++) {
				neuron[o+maxNodes] = true;
			}
			genes.forEach(function(gene) {
				neuron[gene.out] = true;
				neuron[gene.into] = true;
			});
			let keys = Object.key(neuron);

			if (notInput) {
				let result;
				do {
					result = keys[Math.random(0,key.length)];
				} while (result < numberOfInputs)
				return result;
			} else {
				return keys[Math.random(0,key.length)];
			}
		},
		newGene = function() {
			return {
				into : 0,
				out : 0,
				weight : 0,
				enabled : true,
				innovation : 0
			};
		},
		linkMutate = function(forceBias) {
			neuron1 = randomNeuron(false);
			neuron2 = randomNeuron(true);

			if (neuron1 < numberOfInputs && neurons2 < numberOfInputs) {
				return;
			}
			if (neuron1 > neuron2) {
				let tmp = neuron1;
				neuron1 = neuron2;
				neuron2 = tmp;
			}

			newLink = newGene();
			newLink.into = neuron1;
			newLink.out = neuron2;
			if (forceBias) {
				newLink.into = numberOfInputs - 1; // WHY ?
			}
			if (containsLink(newLink)) {
				return;
			}

			newLink.innovation = newInnovation();
			newLink.weight = Math.random()*4 - 2;
			genes.push(newLink);
		},
		nodeMutate = function() {
			if (!genes.length) {return;}

			let gene = genes[Math.random(0,genes.length)];

			if (!gene.enabled) {return;}
			gene.enabled = false;

			genes.push({
				out : maxneuron,
				into : gene.into,
				weight : 1.0,
				enabled : true,
				innovation : newInnovation()
			};
			genes.push({
				out : gene.out,
				into : maxneuron,
				weight : gene.weight,
				enabled : true,
				innovation : newInnovation
			});

			maxneuron++;
		},
		enableDisableMutate = function(enable) {
			let candidates = [];
			genes.forEach(function(gene) {
				if (gene.enabled !== enable) {
					candidates.push(gene);
				}
			});
			if (candidates.length>0) {
				let gene = candidates[Math.random(0,candidates.length-1)];
				gene.enabled = !gene.enabled
			}
		},
		hasInnovationEnabled = function(innovation) {
			genes.forEach(function(gene) {
				if (gene.innovation === innovation) {
					return true;
				}
			});
			return false;
		}, 
		getInnovations = function() {
			let array = [];
			genes.forEach(function(gene) {
				array.push(gene.innovation);
			}
			return array;
		},
		copyInnovation = function() {
			genes.forEach(function(gene) {
				if (gene.innovation === innovation) {
					return {
						out : gene.out,
						into : gene.into,
						weight : gene.weight,
						enabled : gene.enabled,
						innovation : gene.innovation
					}
				}
				return undefined;
			},
		getWeightOfInnovation = function(innovation) {
			genes.forEach(function(gene) {
				if (gene.innovation === innovation) {
					return gene.weight;
				}
			});
			return undefined;
		},
		disjoint = function(genomeP) {
			let disjoint = 0;
			
			genes.forEach(function(gene) {
				if (!genomeP.hasInnovation(gene.innovation)) {
					disjoint++;
				}
			});

			let innovp = genomeP.getInnovations();
			innovp.forEach(function(innovation) {
				if (!hasInnovation(innovation)) {
					disjoint++;
				}
			});

			let n = innovp.length + genes.length;
			return disjoint/n;
		},
		weights = function(genomeP) {
			let sum = 0;
			let coincident = 0;
			genes.forEach(function(gene) {
				let weight = genomeP.getWeightOfInnovation(gene.innovation);
				if (weight !== undefined) {
					sum += Math.abs(gene.weight - weight);
					coincident++;
				}
			});

			return sum / coincident;
		},
		sameSpecies = function(genomeP) {
			let dd = deltaDisjoint*disjoint(genomeP);
			let dw = deltaWeights*weigths(geomneP);
			return dd + dw < deltaThreshold;
		},
		getMaxneuron = function() {
			return maxneuron;
		},
		crossover = function(genomeP) {
			let childGenes = [];
			genes.forEach(function(gene) {
				let geneP = genomeP.copyInnovation(gene.innovation);
				if (Math.random(2) === 1 && geneP !== undefined geneP.enabled) {
					childGenes.push(geneP);
				} else {
					childGenes.push(gene); // it must be copied be the constructor
				}
			});
			return create({
				genes : genes,
				maxneuron : Math.max(maxneuron, genomeP.getMaxneuron()),
				mutationRates : mutationRates
			});
		},
		display,
		save;
		
		/* return object */
		return Object.freeze({
			save,
			display,
			mutate,
			setFitness,
			getFitness,
			getGlobalRank,
			setGlobalRank,
			evaluateNetwork,
			generateNetwork,
			copy,
			hasInnovation,
			sameSpecies,
			getInnovations,
			copyInnovation,
			getMaxneuron,
			getWeightOfInnovation,
			crossover,
	};
	return create;
}
