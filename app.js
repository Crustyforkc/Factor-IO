const express = require('express')
const app = express()

app.get('/', (req, res) => {
	app.use(express.static('public'))
	res.redirect('game.html')
	
});


app.listen(3000, console.log('Server on 3000'));

