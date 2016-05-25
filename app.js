//////////////////////////////////////////////////
/// BULLETIN BOARD APPLICATION
//////////////////////////////////////////////////

//requering express and bodyparser
var express = require ('express')
var bodyParser = require('body-parser')

var app = express()
app.use(express.static('./resources/'));
app.use(bodyParser.urlencoded({ extended: true }));

// requering postgreSQL and creating a connection string
var pg = require ('pg')
var connectionString = "postgres://pgadmin:pwdaccess@localhost/bulletinboard"


// View engine = PUG
app.set('view engine', 'pug');
app.set('views', './views'); 


app.get ('/', function (req, res){
	console.log('received a get request')
	res.render('index')
});

app.post ('/submitbulletin', function (req, res){
	console.log('received a post request')
	pg.connect(connectionString, function (err, client, done){
		client.query ('insert into messages (title, body) values (\'Hello World\', \'This is a fifth test message\')', function (err){
			if (err){
				console.log ('Apparently something went bloody wrong' + err)
			}
		done();
		pg.end();
		console.log ('a message has been added to the bulletinboard')
		});
	});
	res.render ('succes')
});


// server set up
var server = app.listen(3000, function () { 
	console.log('My Bulletin Board Application is listening on port: ' + server.address().port);
});