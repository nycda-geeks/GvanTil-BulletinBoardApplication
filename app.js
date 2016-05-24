//////////////////////////////////////////////////
/// BULLETIN BOARD APPLICATION
//////////////////////////////////////////////////

//requering
var express = require ('express')

var app = express()

app.use(express.static('./resources/'));

// View engine = PUG
app.set('view engine', 'pug');
app.set('views', './views'); 


app.get ('/', function (req, res){
	console.log('received a get request')
	res.render('index')
});


// server set up
var server = app.listen(3000, function () { 
	console.log('My Bulletin Board Application is listening on port: ' + server.address().port);
});