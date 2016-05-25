//////////////////////////////////////////////////
/// BULLETIN BOARD APPLICATION
//////////////////////////////////////////////////

//requering
var express = require ('express')
var app = express()

var pg = require ('pg')
var connectionString = "postgres://pgadmin:pwdaccess@localhost/bulletinboard"


app.use(express.static('./resources/'));

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
		client.query ('insert into messages (title, body) values (\'Hello World\', \'This is a third test message\')', function (err){
			if (err){
				console.log ('Apparently something went bloody wrong' + err)
			}
		done();
		pg.end();
		console.log ('a message has been added to the bulletinboard')
		});
	});
	res.redirect ('succes')
});


// server set up
var server = app.listen(3000, function () { 
	console.log('My Bulletin Board Application is listening on port: ' + server.address().port);
});