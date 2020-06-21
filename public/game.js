window.onload = function () {
	Crafty.init();

	this.LoadSprites() //load sprites
	this.GenerateGrid() //load world
	this.CameraAdjustments()//adjust viewport camera
	this.InitEvents()//add events
};
function LoadSprites()
{
	Crafty.sprite(32, "images/basic-transport-belt.png", {
		belt: [0, 0, 1, 1],
		empty: [0, 1, 1, 1]
	});
	Crafty.sprite(32, "images/BackGround.png", {
		grid: [0, 0, 1, 1],
	});
}
function GenerateGrid()
{
	iso = Crafty.isometric.size(32);
	var mouseicon;
	var z = 0;
	for (var i = 105; i >= 0; i--) {
		for (var y = 0; y <= 105; y++) {
			var tile = Crafty.e("2D, Canvas, " + "grid" + ", Mouse").attr({ x: y, y: i + 1 * y + 1 }).areaMap([0, 0], [32, 32], [32, 0], [0, 0], [32, 32], [0, 32])
				.bind("Click", function (e) {

					//parseBlue();
					console.log(this.x / 32 + ' ' + this.y / 32);
					this.sprite(0, 2, 1, 1);
					Crafty.e("2D, Canvas, belt, solid, bush" + Crafty.math.randomInt(1, 2)).attr({ x: this.x + 32, y: this.y, z: 2}).rotation = 180;

				}).bind("MouseOver", function () {
					if (this.has("belt")) {
						this.sprite(0, 1, 1, 1);
					} else {
						this.sprite(0, 1, 1, 1);
						mouseicon = Crafty.e("2D, Canvas, belt, solid, bush" + Crafty.math.randomInt(1, 2)).attr({ x: this.x, y: this.y, z: 2 });
					}
				}).bind("MouseOut", function () {
					if (this.has("belt")) {
						mouseicon.sprite(0, 1, 1, 1)
						this.sprite(0, 0, 1, 1);
					} else {
						this.sprite(0, 0, 1, 1);
						mouseicon.sprite(0, 1, 1, 1)
					}
				});
			iso.place(i, y * 4, 0, tile);
		}
	}
}
function CameraAdjustments()
{
	Crafty.viewport.scale(1.25);
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
			console.log(Crafty.viewport.y);
			console.log(dy);
			if(Crafty.viewport.x > -1248 && dx > 0) //Bound detection on right side
			{
				Crafty.viewport.x -= dx;
			}

			if(Crafty.viewport.x < -96 && dx < 0) //Bound detection on right side
			{
				Crafty.viewport.x -= dx;
			}

			if(Crafty.viewport.y < -96 && dy < 1) //Bound detection on right side
			{
				Crafty.viewport.y -= dy;
			}

			if(Crafty.viewport.y > -2432 && dy > 1) //Bound detection on right side
			{
				Crafty.viewport.y -= dy;
			}

		};
		Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
		Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function () {
		Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
		});
	});
}