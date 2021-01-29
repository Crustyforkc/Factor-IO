window.onload = function () {
	Crafty.init();
	this.LoadSprites() //load sprites
	this.GenerateGrid() //load world
	this.CameraAdjustments()//adjust viewport camera
	this.InitEvents()//add events
};
var spriterotation = 0;
var spriterotationlock = 0;
var tileSize = 32;
var currentitem = "transport_belt";
function LoadSprites()
{
	Crafty.sprite(32, "images/entities/basic-transport-belt.png", {
		transport_belt: [0, 0, 1, 1],
		empty: [0, 1, 1, 1]
	});
	Crafty.sprite(32, "images/entities/inserter.png", {
		inserter: [0, 0, 1, 1],
	});
	Crafty.sprite(32, "images/entities/burner-inserter.png", {
		burner_inserter: [0, 0, 1, 1],
	});
	Crafty.sprite(32, "images/entities/Background.png", {
		grid: [0, 0, 1, 1],
	});
	Crafty.sprite(32, "images/entities/Overlay.png", {
		overlay_valid: [1, 0, 1, 1],
		overlay_invalid: [0, 1, 1, 1],
	});
	Crafty.sprite(32, "images/entities/wooden-chest.png", {
		wooden_chest: [0, 0, 1, 1],
	});
	Crafty.sprite(32, "images/entities/iron-chest.png", {
		iron_chest: [0, 0, 1, 1],
	});
	Crafty.sprite(32, "images/entities/pipe.png", {
		pipe: [0, 0, 1, 1],
	});
	Crafty.sprite(32, "images/entities/pipe-ground.png", {
		pipe_ground: [0, 0, 1, 1],
	});
	Crafty.sprite(32, 97, "images/entities/small-electric-pole.png", {
		small_electric_pole: [0, 0, 1, 1],
	});
	Crafty.sprite(445, 420, "images/item-menu_blank.png", {
		item_menu: [0,0, 1, 1]
	});
	Crafty.sprite(38, 38, "images/menu/item-menu-belt.png", {
		item_menu_belt: [0,0, 1, 1]
	});
	Crafty.sprite(38, 38, "images/menu/item-menu-inserter.png", {
		item_menu_inserter: [0,0, 1, 1]
	});
	Crafty.sprite(38, 38, "images/menu/item-menu-burner-inserter.png", {
		item_menu_burner_inserter: [0,0, 1, 1]
	});
	Crafty.sprite(38, 38, "images/menu/item-menu-wooden-chest.png", {
		item_menu_wooden_chest: [0,0, 1, 1]
	});
	Crafty.sprite(38, 38, "images/menu/item-menu-iron-chest.png", {
		item_menu_iron_chest: [0,0, 1, 1]
	});
	Crafty.sprite(38, 38, "images/menu/item-menu-pipe.png", {
		item_menu_pipe: [0,0, 1, 1]
	});
	Crafty.sprite(38, 38, "images/menu/item-menu-pipe-ground.png", {
		item_menu_pipe_ground: [0,0, 1, 1]
	});
	Crafty.sprite(38, 38, "images/menu/item-menu-small-electric-pole.png", {
		item_menu_small_electric_pole: [0,0, 1, 1]
	});


}

var itemlist = [];
var itemmenu;
var menuopen = false;
var gridentities = [];

function GenerateGrid()
{
	iso = Crafty.isometric.size(32);
	var mouseicon;
	var mouseoverlay;

	var z = 0;
	for (var i = 105; i >= 0; i--) {
		for (var y = 0; y <= 105; y++) {
			gridentities[i] = new Array();
			var tile = Crafty.e("2D, Canvas, " + "grid" + ", Mouse").attr({ x: y, y: i + 1 * y + 1, placed: 0 }).areaMap([0, 0], [32, 32], [32, 0], [0, 0], [32, 32], [0, 32])
				.bind("Click", function (e) 
				{
					if(this.placed == 0)
					{
						switch(spriterotation)
						{
							case 0:
								gridentities[this.y / tileSize][this.x / tileSize] = Crafty.e("2D, Canvas, " + currentitem  + ", solid, bush").attr({ x: this.x, y: this.y, z: 2});
								console.log(gridentities[this.y / tileSize][this.x / tileSize]);
								break;
							case 90:
								gridentities[this.y / tileSize][this.x / tileSize] = Crafty.e("2D, Canvas," + currentitem  + ", solid, bush").attr({ x: this.x, y: this.y, z: 2})
								console.log(gridentities[this.y / tileSize][this.x / tileSize]);
								gridentities[this.y / tileSize][this.x / tileSize].origin("center").rotation = spriterotation;

								break;
							case 180:
								gridentities[this.y / tileSize][this.x / tileSize] = Crafty.e("2D, Canvas," + currentitem  + ", solid, bush").attr({ x: this.x, y: this.y, z: 2})
								console.log(gridentities[this.y / tileSize][this.x / tileSize]);
								gridentities[this.y / tileSize][this.x / tileSize].origin("center").rotation = spriterotation;
								break;
							case 270:
								gridentities[this.y / tileSize][this.x / tileSize] = Crafty.e("2D, Canvas," + currentitem  + ", solid, bush").attr({ x: this.x, y: this.y, z: 2})
								console.log(gridentities[this.y / tileSize][this.x / tileSize]);
								gridentities[this.y / tileSize][this.x / tileSize].origin("center").rotation = spriterotation;
								break;	
						}
						socket.emit('printInsert', {currentitem: currentitem,x: this.x/32, y: this.y/32, rotation: spriterotation});
						this.placed = 1;
					}

				})
				.bind("MouseUp", function(e)
				{
					if(e.mouseButton == Crafty.mouseButtons.LEFT)
					{
						console.log("Left button");
					}
					else
					{
						console.log("Right button");
						this.placed = 0;
						console.log(gridentities[this.y / tileSize][this.x / tileSize].destroy());
					}

				})
				.bind("MouseOver", function () 
				{
					if (this.placed == 1) {
						this.sprite(0, 1, 1, 1);
						mouseoverlay = Crafty.e("2D, Canvas, overlay_invalid, solid, bush").attr({ x: this.x, y: this.y, z: 3});
					} else {
						this.has
						mouseoverlay = Crafty.e("2D, Canvas, overlay_valid, solid, bush" + Crafty.math.randomInt(1, 2)).attr({ x: this.x, y: this.y, z: 3});
						switch(spriterotation)
						{
							case 0:
								mouseicon = Crafty.e("2D, Canvas, " + currentitem  + ", solid, bush").origin("center").attr({ x: this.x, y: this.y, z: 2});
								break;
							case 90:
								mouseicon = Crafty.e("2D, Canvas, " + currentitem  + ", solid, bush").origin("center").attr({ x: this.x, y: this.y, z: 2});
								mouseicon.rotation = spriterotation;
								break;
							case 180:
								mouseicon = Crafty.e("2D, Canvas, " + currentitem  + ", solid, bush").origin("center").attr({ x: this.x, y: this.y, z: 2});
								mouseicon.rotation = spriterotation;
								break;
							case 270:
								mouseicon = Crafty.e("2D, Canvas, " + currentitem  + ", solid, bush").origin("center").attr({ x: this.x, y: this.y, z: 2});
								mouseicon.rotation = spriterotation;
								break;	
						}
					}
				})
				.bind("MouseOut", function () 
				{
					if (this.has(currentitem)) {
						mouseicon.destroy();
						mouseoverlay.destroy();
						this.sprite(0, 0, 1, 1)
					} else {
						this.sprite(0, 0, 1, 1);
						mouseicon.destroy();
						mouseoverlay.destroy();
					}
				})
				.bind('KeyDown', function(e)
				{
					if(spriterotationlock == 0)
					{
						console.log(spriterotation);
						switch(e.key)
						{
							case Crafty.keys.R:
								if(currentitem != "small_electric_pole" && currentitem != "wooden_chest" && currentitem != "iron_chest")
								spriterotation += 90;
								break;
							case Crafty.keys.E:
								if(menuopen == false)
								{
									console.log("x: " + window.innerWidth);
									console.log("y: " + window.innerHeight);
									var x = Math.abs(Crafty.viewport.x) + (window.innerWidth / 2) - 222.5;
									var y = Math.abs(Crafty.viewport.y) + (window.innerHeight / 2) - 210
									itemmenu = Crafty.e("2D, Canvas, " + "item_menu").attr({ x: x, y: y, z: 4});
									menuopen = true;
									var itemx = x + 24;
									var itemy = y + 118;

									BuildMenu("item_menu_inserter", itemx, itemy, "inserter");
									BuildMenu("item_menu_burner_inserter", itemx + 38, itemy, "burner_inserter");
									BuildMenu("item_menu_belt", itemx, itemy + 38, "transport_belt");
									BuildMenu("item_menu_wooden_chest", itemx, itemy + 76, "wooden_chest");
									BuildMenu("item_menu_iron_chest", itemx + 38, itemy + 76, "iron_chest");
									BuildMenu("item_menu_pipe", itemx, itemy + 114, "pipe");
									BuildMenu("item_menu_pipe_ground", itemx + 38, itemy + 114, "pipe_ground");
									BuildMenu("item_menu_small_electric_pole", itemx, itemy + 152, "small_electric_pole");
									

								}
								else
								{
									CleanMenu();
									menuopen = false
								}
								break;
						}
						mouseicon.origin("center");
						mouseicon.rotation = spriterotation;

						spriterotationlock = 1;
						setTimeout(UnlockRotation, 50);
					}
					if(spriterotation > 270)
					{
						spriterotation = 0
					}
				});
			iso.place(i, y * 4, 0, tile);
		}
	}
}

function UnlockRotation()
{
	console.log('Unlocking rotation control');
	spriterotationlock = 0;
}
function CameraAdjustments()
{
	Crafty.viewport.scale(1);
	Crafty.viewport.x = -400;
	Crafty.viewport.y = -1100;
}

function InitEvents()
{
	Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function (e) {
		if (e.button > 1) return;
		var base = { x: e.clientX, y: e.clientY };

		function scroll(e) {
			var dx = base.x - e.clientX,
				dy = base.y - e.clientY;
			base = { x: e.clientX, y: e.clientY };

			if(Crafty.viewport.x > -1248 && dx > 0) //Bound detection on right side
			{
				Crafty.viewport.x -= dx/2;
			}

			if(Crafty.viewport.x < -96 && dx < 0) //Bound detection on right side
			{
				Crafty.viewport.x -= dx/2;
			}

			if(Crafty.viewport.y < -96 && dy < 1) //Bound detection on right side
			{
				Crafty.viewport.y -= dy/2;
			}

			if(Crafty.viewport.y > -2432 && dy > 1) //Bound detection on right side
			{
				Crafty.viewport.y -= dy/2;
			}

		};
		Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
		Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function () {
		Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
		});
	});
}

var itemcount = 0;
function BuildMenu(item, x, y, itemshorthand)
{
	itemlist[itemcount++] = Crafty.e("2D, Canvas, " + item + ", Mouse").attr({ x: x, y: y, z: 5})
	.bind("Click", function(e)
	{
		CleanMenu();
		currentitem = itemshorthand;
		if(currentitem == "small_electric_pole" || currentitem == "wooden_chest" || currentitem == "iron_chest")
			spriterotation = 0;
	});
}

function CleanMenu()
{
	for(var i = 0; i < itemcount; i++)
	{
		console.log(i);
		itemlist[i].destroy();
	}
	itemmenu.destroy();
	menuopen = false;
	itemcount = 0;
}

