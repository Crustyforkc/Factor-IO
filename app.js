const express = require('express')
const app = express()
const path = require('path')
const Blueprint = require('factorio-blueprint');
const host = '0.0.0.0';

var http = require('http').createServer(app);
var db = require('./db');
const { stringify } = require('querystring');



app.get('/', (req, res) => 
{
	app.use(express.static('public'))
	//app.use(express.static('public/images'))
	res.sendFile(path.join(__dirname + '/public/game.html'));
	//const myBlueprint = new Blueprint();
	//myBlueprint.createEntity('transport-belt', { x: 0, y: 0 }, Blueprint.UP);
	//console.log(myBlueprint.encode());
});

const server = app.listen(process.env.PORT || 3000, host, () => console.log("Server is running..."));
const io = require('socket.io')(server);

var maxClient = 5;
var curClient = 0;
io.on('connection', (socket) => 
{
  const myBlueprint = new Blueprint();

  curClient++;
  console.log("Current Connections: ", curClient, "/", maxClient);
  var sql = "INSERT INTO blueprints (id) VALUES ?";
  var values = [[Math.random() * Math.floor(50000)]];
  db.query(sql, [values], function (err, result)
  {
    if (err) throw err;
  });

  socket.on('printInsert', (msg) =>{
    msg.currentitem.replace('_', '-');
    console.log('Item: ', msg.currentitem);
    console.log('X: ', msg.x);
    console.log('Y: ', msg.y);
    console.log('Rotation: ', msg.rotation);
    var roation;
    switch(msg.rotation)
    {
      case 0:
        rotation = Blueprint.RIGHT;
        break
      case 90:
        rotation = Blueprint.DOWN;
        break;
      case 180:
        rotation = Blueprint.LEFT
        break;
      case 270:
        rotation = Blueprint.UP;
        break;
    }

    myBlueprint.createEntity(msg.currentitem, {x: msg.x, y: msg.y}, rotation);
  });

  socket.on('disconnect', ()=> 
  {
		console.log('user disconnected');
    curClient--;
    console.log(myBlueprint.encode());
	});
});




