function createNeat(spec) {
	let {
		population,
		deltaDisjoint,
		deltaWeights,
		deltaThreshold,
		staleSpecies,
		mutateConnectionsChance,
		perturbChance,
		crossoverChance,
		linkMutationChance,
		nodeMutationChance,
		biasMutationChance,
		stepSize,
		disableMutationChance,
		enableMutationChance,
		timeoutConstant,
		maxNodes,
		numberOfOutputs,
		numberOfInputs
	} = spec,
	input = [],
	setInputs = function(inputs) {
		input = inputs;
	}
	getInputs = function() {
		return input;
	}


	let setInputs = function(inputs) {

}
neat = {};
{
	population : 300,
	deltaDisjoint : 2.0,
	deltaWeights : 0.4,
	deltaThreshold : 1.0,

	staleSpecies : 15,

	mutateConnectionsChance : 0.25,
	perturbChance : 0.90,
	crossoverChance : 0.75,
	linkMutationChance : 2.0,
	nodeMutationChance : 0.50,
	biasMutationChance : 0.40,
	stepSize : 0.1,
	disableMutationChance : 0.4,
	enableMutationChance : 0.2,

	timeoutConstant : 20,

	maxNodes : 1000000,

	numberOfOutputs = 4;
	numberOfInputs = 100;
};

neat.setInputs = function(inputs) {
	this.inputs = inputs;
}
neat.getInputs = function() {
	return this.inputs;
}

neat.sigmoid = function(x) {
	return 1/(1+Math.exp(-x));
	//return 2/(1+math.exp(-4.9*x))-1
}

neat.pool = {};

neat.pool.newInnovation = function() {
	this.innovation ++;
	return this.innovation;
}

function newPool() {
	var pool = {
		species : [],
		generation : 0,
		innovation : outputsCard,
		currentSpecies : 0,
		currentGenome : 0,
		currentFrame : 0,
		maxFitness : 0
	};

	return pool;
}

function newSpecies() {
	var species = {
		topFitness : 0,
		staleness : 0,
		genomes : [],
		averageFitness : 0
	};

	return species;
}

function newGenome() {
	var genome = {
		genes : [],
		fitness : 0,
		adjustedFitness : 0,
		network : {},
		maxneuron : 0,
		globalRank : 0,
		mutationRates : {
			connections : mutateConnectionsChance,
			links : linkMutationChance,
			node : nodeMutationChance,
			enable : enableMutationChance,
			disable : disableMutationChance,
			step : stepSize
		},
	};

	return genome;
}

function copyGenome(genome) {
	var genome2 = newGenome();

	genome2.genes.length = genome.genes.length;
	for (var g=0; g<genome.genes.length; g++) {
		genome2.genes[g] = copyGene(genome.genes[g]);
	}

	genome2.maxneuron = genome.maxneuron;
	genome2.mutationRates["connections"] = genome.mutationRates["connections"];
	genome2.mutationRates["link"] = genome.mutationRates["link"];
	genome2.mutationRates["bias"] = genome.mutationRates["bias"];
	genome2.mutationRates["node"] = genome.mutationRates["node"];
	genome2.mutationRates["enable"] = genome.mutationRates["enable"];
	genome2.mutationRates["disable"] = genome.mutationRates["disable"];

	return genome2;
}

function basicGenome() {
	var genome = newGenome();
	var innovation = 1;

	genome.maxneuron = inputsCard;
	mutate(genome);

	return genome;
}

function newGene() {
	var gene = {
		into : 0,
		out : 0,
		weight : 0.0,
		enabled : true,
		innovation : 0
	}

	return gene;
}

function copyGene(gene) {
	var gene2 = newGene();
	gene2.into = gene.into;
	gene2.out = gene.out;
	gene2.weight = gene.weight;
	gene2.enabled = gene.enabled;
	gene2.innovation = gene.innovation;

	return gene2
}

function newNeuron() {
	var neuron = {
		incoming : [],
		value : 0.0
	}

	return neuron;
}

function generateNetwork(genome) {
	var i;
	var network = {};
	network.neurons = {};

	for (i=0; i<inputsCard; i++) {
		network.neurons[i] = newNeuron();
	}

	for (i=0; i<outputsCard; i++) {
		network.neurons[i+maxNodes] = newNeuron();
	}

	genome.genes.sort( function(a,b) { return (a.out<b.out) });

	for (i=0; i<genome.genes.length; i++) {
		var gene = genome.genes[i];
		if (gene.enabled) {
			if (!network.neurons[gene.out]) {
				network.neurons[genes.out] = newNeuron();
			}
			network.neurons[genes.out].push(gene);
			if (!network.neurons[gene.into]) {
				network.neurons[genes.into] = newNeuron();
			}
		}
	}

	genome.network = network;
}

function evaluateNetwork(network, inputs) {
	var i,j,sum,neuron,incoming,other;
	inputs.push(1);
	if (inputs !== inputsCard) {
		console.error("evaluateNetwork : Incorrect number of input");
		return [];
	}

	for (i=0; i<inputsCard; i++) {
		network.neurons[i].value = inputs[i];
	}

	for (i in network.neurons) {
		if (network.neurons.hasOwnProperty(i)) {
			neuron = netowrk.neurons[i];
			sum = 0;
			for (j=0; j<neuron.incoming.length; j++) {
				incoming = neuron.incoming[j];
				other = network.neurons[incoming.into];
				sum = sum + incoming.weight*other.value;
			}

			if (neuron.incoming.length > 0) {
				neuron.value = sigmoid(sum)
			}

		}
	}
}

var outputs = [];
for (i=0; i<outputsCard; i++) {
	if (network.neurons[maxNodes+i].value > 0) {
		outputs[i] = true;
	} else {
		outputs[i] = false;
	}
}

return outputs;
}

function crossover(g1, g2) {
	var tmp,child,innovations2,gene,gene1,gene2;
	if (g2.fitness > g1.fitness) {
		tmp = g1;
		g1 = g2;
		g2 = tmp;
	}

	child = newGenome();

	innovations2 = [];
	for (i=0; i<g2.genes.length; i++) {
		gene = g2.genes[i];
		innovations2[gene.innovation] = gene;
	}

	for (i=0; i<g1.genes.length; i++) {
		gene1 = g1.genes[i];
		gene2 = innovations2[gene1.innovation];
		if (gene2 && math.random(2) == 1 && gene2.enabled) {
			child.genes.push(copyGene(gene2));
		} else {
			child.genes.push(copyGene(gene1));
		}
	}

	child.maxneuron = Math.max(g1.maxneuron, g2.maxneuron);

	child.mutationRates["connections"] = g1.mutationRates["connections"];
	child.mutationRates["link"] = g1.mutationRates["link"];
	child.mutationRates["bias"] = g1.mutationRates["bias"];
	child.mutationRates["node"] = g1.mutationRates["node"];
	child.mutationRates["enable"] = g1.mutationRates["enable"];
	child.mutationRates["disable"] = g1.mutationRates["disable"];

	return child;
}

function randomNeuron(genes, nonInput) {
	var i;
	var count;
	var rdm;
	var neurons = [];

	neurons.length = maxNodes + outputsCard;
	if (!nonInput) {
		for (i=0; i<inputsCard; i++) {
			neurons[i] = true;
		}
	}

	for (i=0; i<outputsCard; i++) {
		neurons[maxNodes + i] = true;
	}

	for (i=0; i<genes.length; i++) {
		if (!nonInput || genes[i].into>inputsCard) {
			neurons[genes[i].into] = true;
		}
		if (!nonInput || genes[i].out>inputsCard) {
			neurons[genes[i].out] = true;
		}
	}

	count = 0;
	for (i in neurons) {
		if (neurons.hasOwnProperty(i)) {
			count++;
		}
	}

	rdm = Math.random(1,count);

	for (i in neurons) {
		if (neurons.hasOwnProperty(i)) {
			rdm--;
			if (rdm === 1) {
				return i;
			}
		}
	}

	return 0;
}

function containsLink(genes, link) {
	for (var i=0; i<genes.length; i++) {
		var gene = genes[i];
		if (gene.into === link.into && gene.out === link.out) {
			return true;
		}
	}
}

function pointMutate(genom) {
	var step = genome.mutationRates["step"];

	for (var i=0; i<genome.genes.length; i++) {
		var gene = genome.genes[i];
		if (Math.random() < PerturbChance) {
			gene.weight = gene.wieght + Math.random()*step*2 - step;
		} else {
			gene.weight = math.random()*4 - 2;
		}
	}
}

function linkMutate(genome, forceBias) {
	var tmp 
		var neuron1 = randomNeuron(genome.genes, false);
	var neuron2 = randomNeuron(genome.genes, true);

	var newLink = newGene();
	if (neuron1 <= inputsCard && neuron2 <= inputsCard) {
		/* Both input nodes */
		return;
	}
	if (neuron2 <= inputsCard) {
		/* Swap output and input */
		tmp = neuron1;
		neuron1 = neuron2;
		neuron2 = tmp;
	}

	newLink.into = neuron1;
	newLink.out = neuron2;
	if (forceBias) {
		newLink.into = inputsCard;
	}

	if (containsLink(genome.genes, newLink)) {
		return;
	}
	newLink.innovation = newInnovation();
	newLink.weight = Math?random()*4 - 2;

	genome.genes.push(newLink);
}

function nodeMutate(genome) {
	if (genome.genes.length === 0) {
		return;
	}

	genome.maxneuron = genome.maxneuron+1;

	var gene = genome.genes[Math.random(0,genome.genes.length-1)]
	if (!gene.enabled) {
		return;
	}
	gene.enabled = false;

	var gene1 = copyGene(gene);
	gene1.out = genome.maxneuron;
	gene1.weight = 1.0;
	gene1.innovation = newInnovation();
	gene1.enabled = true;
	genome.genes.push(gene1);

	var gene2 = copyGene(gene);
	gene2.into = genome.maxneuron;
	gene2.innovation = newInnovation();
	gene2.enabled = true;
	genome.genes.push(gene2);
}

function enableDisableMutate(genome, enable) {
	var candidates = [];
	var gene;
	for (var i in genome.genes) {
		if (genome.genes.hasOwnProperty(i)) {
			gene = genome.genes[i];
			if (gene.enabled === !enable) {
				candidates.push(gene);
			}
		}
	}

	if (candidates.length === 0 ) {
		return;
	}

	gene = candidates[Math.random(0,candidates.length-1)];
	gene.enabled = !gene.enabled
}

function mutate(genome) {
	var rate,mutate;
	for (mutate in genome.mutationRates) {
		var rate = genome.mutationRates[mutate];
		if (Math.radom(1,2)===1) {
			genome.mutationRates[mutation] = 0.95*rate;
		} else { 
			genome.mutationRates[mutation] = 1.05263*rate;
		}
	}

	if (Math.random() < genome.mutationRates["connections"]) {
		pointMutate(genome)
	}

	var p = genome.mutationRates["link"];
	while (p > 0) {
		if (Math.random() < p) {
			linkMutate(genome, false);
		}
		p--;
	}

	p = genome.mutationRates["bias"]
	while (p > 0) {
		if (Math.random() < p) {
			linkMutate(genome, true);
		}
		p--;
	}

	p = genome.mutationRates["node"]
	while (p > 0) {
		if (Math.random() < p) {
			nodeMutate(genome);
		}
		p--;
	}

	p = genome.mutationRates["enable"]
	while (p > 0) {
		if (Math.random() < p) {
			enableDisableMutate(genome, true);
		}
		p--;
	}


	p = genome.mutationRates["disable"]
	while (p > 0) {
		if (Math.random() < p) {
			enableDisableMutate(genome, false);
		}
		p--;
	}
}

function disjoint(genes1, genes2) {
	var i,gene;

	var i1 = {};
	for (i=0; i<genes1.length, i++) {
		gene = genes1[i];
		i1[gene.innovation] = true;
	}

	var i2 = {};
	for (i=0; i<genes2.length, i++) {
		gene = genes2[i];
		i2[gene.innovation] = true;
	}

	var disjointGenes = 0;
	for (i=0; i<gene1.length; i++) {
		gene = genes1[i];
		if (!i2[gene.innovation]) {
			disjointGenes++;
		}
	}

	for (i=0; i<gene2.length; i++) {
		gene = genes2[i];
		if (!i1[gene.innovation]) {
			disjointGenes++;
		}
	}

	var n = Math.max(genes1.length, gene2.length);

	return disjointGenes / n;
}

function weights(genes1, genes2) {
	var i,gene;
	var i2 = {};

	for (i=0; i<genes2.length; i++) {
		gene = genes2[i];
		i2[gene.innovation] = gene;
	}

	var sum = 0;
	var coincident = 0;
	for (i=0; i<genes1.length; i++) {
		gene = genes1[i];
		if (i2[gene.innovation]) {
			var gene2 = i2[gene.innovation];
			sum = sum + Math.abs(gene.weight-gene2.weight);
			coincident++;
		}
	}

	return sum / coincident;
}

function sameSpecies(genome1, genome2) {
	var dd = deltaDisjoint*disjoint(genome1.genes, genome2.genes);
	var dw = deltaWeights*weights(genome1.genes, genome2.genes);
	return dd+dw < deltaThreshold;
}

function rankGlobally() {
	var i,species;
	var g;
	var global = [];

	for (i=0; i<pool.species.length; i++) {
		species = pool.species[i];
		for (g=0; g<species.genomes.length; g++) {
			global.push(species.genomes[g]);
		}
	}

	global.sort(function(a,b){
		return (a.fitness < b.fitness);
	});

	for (g=0; g<global.length; g++) {
		global[g].globalRank = g;
	}
}

function calculateAverageFitness(species) {
	var total = 0;
	var g,genome;

	for (g=0; g < species.genomes.length; g++) {
		genome = species.genomes[g];
		total += genome.globalRank;
	}

	species.averageFitness = total / species.genomes.length;
}

function totalAverageFitness() {
	var total = 0;
	var s,species;

	for (s=0; s<pool.species.length; s++) {
		species = pool.species[s];
		total += species.averageFitness;
	}

	return total;
}

function cullSpecies(cutToZero) {
	var s,species,remaining;
	for(s=0; s<pool.species.length; s++) {
		species = pool.species[s];

		species.genoms.sort(function (a,b) {
			return (a.fitness > b.fitness);
		});

		remaining = Math.ceil(species.genomes.length/2);

		if (cutToZero) {
			remaining = 0;
		}

		while (species.genomes.length > remaining) {
			species.genomes.pop();
		}
	}
}

function breedChild(species) {
	var child = {};
	if (Math.random() < crossoverChance) {
		g1 = species.genomes[math.random(0, species.genomes.length-1)];
		g2 = species.genomes[math.random(0, species.genomes.length-1)];
		child = crossover(g1, g2);
	} else {
		g = species.genomes[math.random(0, species.genomes.length-1)];
		child = copyGenome(g);
	} 
	mutate(child);

	return child;
}

function removeStaleSpecies() {
	var survived = [];
	var s,species;

	for (s=0; s<pool.species.length; s++) {
		species = pool.species[s];

		species.genomes.sort(function (a,b) {
			return (a.fitness > b.fitness);
		});

		if (species.genome[0].fitness > species.topFitness) {
			species.topFitness = species.genome[0].fitness;
			species.staleness = 0;
		} else {
			species.staleness++;
		}

		if (species.staleness < staleSpecies || species.topFitness >= pool.maxFitness) {
			survived.push(species);
		}
	}

	pool.species = survived;
}

function removeWeakSpecies() {
	var survived = [];

	var sum = totalAverageFitness();

	var s,species;
	for (s=0; s<pool.species.length; s++) {
		species = pool.species[s];
		breed = Math.floor(species.averageFitness / sum * population);
		if (breed >= 1) {
			survived.push(species);
		}
	}

	pool.species = survived;
}

function addToSpecies(child) {
	var foundSpecies = false;

	var s,species;
	for (s=0; s<pool.species.length; s++) {
		species = pool.species[s];
		if (!foundSpecies && sameSpecies(child, species.genomes[0])) {
			species.genomes.push(child);
			foundSpecies = true;
		}
	}

	if (!foundSpecies) {
		var childSpecies = newSpecies();
		childSpecies.genomes.push(child);
		pool.species.push(childSpecies);
	}
}

function newGeneration() {
	var s,species;
	var i;
	var c,child;

	cullSpecies(false); // Cull the bottom hald of each species
	rankGlobally();
	removeStaleSpecies();
	randGlobally();

	for (s=0; s<pool.species.length; s++) {
		species = pool.species[s];
		calculateAverageFitness(species);
	}
	removeWeakSpecies();

	var sum = totalAverageFitness();
	var children = [];

	for (s=0; s<pool.species.length; s++) {
		species = pool.species[s];
		breed = Math.floor(species.averageFitness / sum * population) -1;
		if (i=0; i < breed; i++) {
			children.push(breedChild(species));
		}
	}

	cullSpecies(true); // Cull all but the top member of each species

	while (children.length + pool.species.length < population) {
		species = pool.species[Math.random(0, pool.species.length-1)]
		children.push(breedChild(species));
	}

	for (c=0; c<children.length; c++) {
		child = children[c];
		addToSpecies(child);
	}
	pool.generation = pool.generation + 1;

	//writeFile("backup."+pool.generation.toString()+"."+forms.gettext(saveLoadFile))
}

function initializePool() {
	pool = newPool();

	for (var i=0; i<population; i++) {
		basic = basicGenome();
		addToSpecies(basic);
	}

	initializeRun();
}

function clearJoypad () {
}

function initializeRun() {
	savestate.load(Filename);
	rightmost = 0;
	pool.currentFrame = 0;
	timeout = timeoutConstant;
	clearJoypad();

	var species = pool.species[pool.currentSpecies];
	var genome = species.genomes[pool.currentGenome];
	generateNetwork(genome);
	evaluateCurrent();
}

function evaluateCurrent() {
	var species = pool.species[pool.currentSpecies];
	var genome = species.genomes[pool.currentGenome];

	inputs = getInputs();
	controller = evaluateNetwork(genome.network, inputs);

	//        if controller["P1 Left"] and controller["P1 Right"] then
	//                controller["P1 Left"] = false
	//                controller["P1 Right"] = false
	//        end
	//        if controller["P1 Up"] and controller["P1 Down"] then
	//                controller["P1 Up"] = false
	//                controller["P1 Down"] = false
	//        end
	// 
	//        joypad.set(controller)
}

if (!pool) {
	initializePool();
}

function nextGenome() {
	pool.currentGenome++;

	if (pool.currentGenome > pool.species[pool.currentSpecies].genomes) {
		pool.currentGenome = 0;
		pool.currentSpecies++;
		if (pool.currentSpecies > pool.species.length) {
			newGeneration();
			pool.currentSpecies = 1;
		}
	}
}

function fitnessAlreadyMeasured() {
	var species = pool.species[pool.currentSpecies];
	var genome = species.genomes[pool.currentGenome];

	return genome.fitness !== 0;
}

function displayGenome(genome) {
}

function writeFile(filename) {
}

function savePool() {
}

function loadFile(filename) {
}

function loadPool() {
}

function playTop() {
}

function onExite() {
}

writeFile("temp.pool")

event.onexit(onExit);

form = forms.newForm(200,260,"Fitness");

//maxFitnessLabel = forms.label(form, "Max Fitness: " .. math.floor(pool.maxFitness), 5, 8)
//showNetwork = forms.checkbox(form, "Show Map", 5, 30)
//showMutationRates = forms.checkbox(form, "Show M-Rates", 5, 52)
//restartButton = forms.button(form, "Restart", initializePool, 5, 77)
//saveButton = forms.button(form, "Save", savePool, 5, 102)
//loadButton = forms.button(form, "Load", loadPool, 80, 102)
//saveLoadFile = forms.textbox(form, Filename .. ".pool", 170, 25, nil, 5, 148)
//saveLoadLabel = forms.label(form, "Save/Load:", 5, 129)
//playTopButton = forms.button(form, "Play Top", playTop, 5, 170)
//hideBanner = forms.checkbox(form, "Hide Banner", 5, 190)
// 
// 
//while true do
//        local backgroundColor = 0xD0FFFFFF
//        if not forms.ischecked(hideBanner) then
//                gui.drawBox(0, 0, 300, 26, backgroundColor, backgroundColor)
//        end
// 
//        local species = pool.species[pool.currentSpecies]
//        local genome = species.genomes[pool.currentGenome]
//       
//        if forms.ischecked(showNetwork) then
//                displayGenome(genome)
//        end
//       
//        if pool.currentFrame%5 == 0 then
//                evaluateCurrent()
//        end
// 
//        joypad.set(controller)
// 
//        getPositions()
//        if marioX > rightmost then
//                rightmost = marioX
//                timeout = TimeoutConstant
//        end
//       
//        timeout = timeout - 1
//       
//       
//        local timeoutBonus = pool.currentFrame / 4
//        if timeout + timeoutBonus <= 0 then
//                local fitness = rightmost - pool.currentFrame / 2
//                if gameinfo.getromname() == "Super Mario World (USA)" and rightmost > 4816 then
//                        fitness = fitness + 1000
//                end
//                if gameinfo.getromname() == "Super Mario Bros." and rightmost > 3186 then
//                        fitness = fitness + 1000
//                end
//                if fitness == 0 then
//                        fitness = -1
//                end
//                genome.fitness = fitness
//               
//                if fitness > pool.maxFitness then
//                        pool.maxFitness = fitness
//                        forms.settext(maxFitnessLabel, "Max Fitness: " .. math.floor(pool.maxFitness))
//                        writeFile("backup." .. pool.generation .. "." .. forms.gettext(saveLoadFile))
//                end
//               
//                console.writeline("Gen " .. pool.generation .. " species " .. pool.currentSpecies .. " genome " .. pool.currentGenome .. " fitness: " .. fitness)
//                pool.currentSpecies = 1
//                pool.currentGenome = 1
//                while fitnessAlreadyMeasured() do
//                        nextGenome()
//                end
//                initializeRun()
//        end
// 
//        local measured = 0
//        local total = 0
//        for _,species in pairs(pool.species) do
//                for _,genome in pairs(species.genomes) do
//                        total = total + 1
//                        if genome.fitness ~= 0 then
//                                measured = measured + 1
//                        end
//                end
//        end
//        if not forms.ischecked(hideBanner) then
//                gui.drawText(0, 0, "Gen " .. pool.generation .. " species " .. pool.currentSpecies .. " genome " .. pool.currentGenome .. " (" .. math.floor(measured/total*100) .. "%)", 0xFF000000, 11)
//                gui.drawText(0, 12, "Fitness: " .. math.floor(rightmost - (pool.currentFrame) / 2 - (timeout + timeoutBonus)*2/3), 0xFF000000, 11)
//                gui.drawText(100, 12, "Max Fitness: " .. math.floor(pool.maxFitness), 0xFF000000, 11)
//        end
//               
//        pool.currentFrame = pool.currentFrame + 1
// 
//        emu.frameadvance();
//end
