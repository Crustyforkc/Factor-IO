const express = require('express')
const app = express()
const path = require('path')
const Blueprint = require('factorio-blueprint');
const host = '0.0.0.0';

var http = require('http').createServer(app);
var db = require('./db');
const { stringify } = require('querystring');
const e = require('express');



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
const myBlueprint = new Blueprint();
io.on('connection', (socket) => 
{
  curClient++;
  console.log("Current Connections: ", curClient, "/", maxClient);


  socket.on('printInsert', (msg) =>{
    
    try{
      msg.currentitem.replace('_', '-');
    }
    catch(err){

    }
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
    if(myBlueprint.findEntity({x: msg.x,y: msg.y}) == null)
    {
      myBlueprint.createEntity(msg.currentitem, {x: msg.x, y: msg.y}, rotation);
      io.emit("MultiplayerPrint", msg);
    }
  });

  socket.on('printDelete', (msg) =>{
    myBlueprint.removeEntity(myBlueprint.findEntity({x: msg.x, y: msg.y}));
  });

  socket.on('disconnect', ()=> 
  {
		console.log('user disconnected');
    curClient--;

  });
  
  socket.on('savePrint', (msg) => 
  {
    console.log("Saving Print");
    var sql = "INSERT INTO blueprints (Blueprint, UserId) VALUES ?";
    var values = [[myBlueprint.encode(), 1]]
    db.query(sql, [values], function (err, result)
    {
      if (err) throw err;
    });

  });

  socket.on('getPrint', (msg) => 
  {
    socket.emit("returnPrint", myBlueprint.encode());
  });

  socket.on('LoadPrint', (msg) =>
  {
    myBlueprint.entities.forEach(element => {
      element.currentitem = element.name;
        socket.emit('LoadingPrint', element);   
    });
  });
  
});




