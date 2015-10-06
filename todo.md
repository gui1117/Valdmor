list of method to add in order to manage network

* rigidbody.movePast(x)
* rigidbody.movePresent()

* physicworld.movePast(x,indexarray)
* physicworld.movePresent()
* physicworld.collidewith(shape)

when the server get an instant action : 
physicworld.movePast(x,authorOf Action)
physicworld.collidewith(damageShape)
for each : get userData apply thing end
physicworld.movePresent()

structure of entities in the world

method to use :
world.createHoverfly(...)
world.createGrenade(...)

where is it store ?
world.grenade
world.hoverfly
world.character

world.createSnapshot

structure draw 
background, world, forground, debug

#plan to develop the game

0.1 : offline game 
	mapping with svg
	action manager with network in mind
	3 weapon
	basic monster

0.2 : network game
	interpolation of entities
	instant action -> send entities touched

further improve :
	deploy to app for desktop and mobile
	improve graphism
		
#gloal object

world :
	method :
	init : instance arrays
	createGrenade
	createHoverfly
	destroyGrenade
	destroyHoverfly
	update
	draw (no z order yet)

	attribute :
	grenade : array of all the grenade
	hoverfly : ""
	toUpdate : array of attribut that are array and must 
		be updated by iterating on them
	toDraw : same for draw

#IA how to give a grid of the world

world.grid :
	set the scale (width and height of square)
	array of array
	each square is an object with elements : 
		wall : 0 no 1 yes
		monster : number (number of monster in the square
	when active entities update, they update the last square
		and the new square
	
	for an IA, just get the square visible and code it 

#interface 

black screen on left and right to make an almost square screen
like teleglitch

#monsters : 
- basic : wake up when sound, go toward the hero if no wall between
- second : some guards that go from begin to end and end to begin,
	(with findpath) if see character go kill them, (can only see in front
	of them so you can follow ? maybe not )
- third : when alarm pathfind to the character (like second almost ?)







