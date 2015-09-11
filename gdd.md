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
