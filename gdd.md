valdmor: game design document
=============================

valdmor may be renamed.

It is mainly inpired by Leff4Dead and hotline miami

Left4Dead is for me for now the best cooperative game ever
(in its campaign mode)
some feature :
* special monster punish individual behavior.
* no global RPG mecanics (global level)
* choice of the difficulty.

hotline miami have a fast paced addictive gameplay
* top-down
* wqsd + mouse to move and aim

Valdmor will use hotline miami gameplay and left4dead 
enemy and map design.

#global idea

the cooperation will not be forced because monster
are very more difficult to kill alone. 
Monster behavior will not punish specially alone player.

the game is design as a maze where it's easy to lost 
your friend.
And fighting alone is difficult anyway

Or some monster aim to explode the group and some other
are difficult to fight alone like tank in l4d

Or sometime a wave of monster come from front and back
hard to defeat alone.

I like the idea of not being close everytime but have to
focus sometimes. therefore I consider the idea of a little 
global map to find your friend when necessary.

On this map will be drawn static object like wall and 
players.
Also microphone and a chat must be available. And the 
use of predefine sentences like "together ! wave in 
comming" if the information isn't globally known (like if
a player declench a trap) or "please come I'm stuck !"

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
	
#monster

basic : 
	like zombie in l4f
	weak but many
	attack when touch a player
	not very speed but not to low
	
	at a certain distance move to the closest character
	when touch a character : attack, noAttack n second


(light : 
	a special that when see a player try to escape
	if killed drop things.
		--> explode group, the guy who see it will try
		to follow it.
	
	at a certain distance (relative to character actual zoom?)
	it goes)

(tank :
a special with exact speed of player)


#Camera

Top-down view,
follow the character (with a little delta?)
(can rotate,)
can zoom,

basically, the player move with wqsd, the camera is following.
also the camera can rotate and zoom with keys,
there is a max and min zoom.

the camera is displayed on the screen first.
then are other element of the gui.

#GUI

minimalist:

(minimap : not drawn or top-right or full)
(chat : not drawn or bottom-left : bend or full)
life and ammo : top-left 

#weapon

grenade launcher : launch a grenade that explode at contact 
	the contact is at the mouse pointer
shotgun : instant shoot triangle
automaticRifle : instant shoot raycast

#map desgin

printed circuit board
(fr)
conception des niveaux prévu pour groupe de différente taille :
plusieur chemin possible plus ou moins dangereux le groupe choisit 
ou il va. et aussi des map plus ou moins difficile dont certaine sont
clairement impossible seule
ou alors un map global avec 

#flock bird

des oiseaux assez petit comparé au joueur qui se déplace dans le 
environnement assez ouvert. faible dégat lorsque superpose au hero (ou alors de suicide sur le hero) 

#son

on peut calculer le son par case :
	les arme a feu font du son 
	le son des case voisine font du son
	les monstres réveillé font du son
	et les joueur en font un peu aussi

enfin l'etat des monstres sera fonction du son. (bien qu'un monstre puisse etre reveillé sans son)

#image

très inspiré de pianitza dans une ambiance plutot pas gore, juste
un peu stressante et bizarre,

ecran qui louche avec superposition des deux image qui devie un peu l'une de l'autre parfois

grain (style film pellicule) très fort

ton de couleur a la pianitza

saturation de la lumiere basé sur le son

+ aberation géométrique des lentilles : distorsion, courbure de champ, astigmatisme

#interface 

black screen on left and right to make an almost square screen
like teleglitch

#alarm
each monster have a different behavior when alarm :
manhole : more frequence
blind : no sound just distance to the heros

#weapon
peut etre ? 
	les armes se recharge toutes seul même quand on tire
	pour le shotgun nombre de balle maxi : magazin
		mais toujours temps de chargement mini
		entre deux coups
	pour le lance grenade : 1
