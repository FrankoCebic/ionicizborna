//app.js i www se namaze u istom folderu (root)
//npm install express body-parser --save
//npm install nodemon -g
//nodemon app.js
//firefox -> localhost:3000

var express = module.require('express');
var bodyParser = module.require('body-parser')
var app = express();

var users = [
	{id: 0, firstName: "f1", lastName: "l1"}
	, {id: 1, firstName: "f2", lastName: "l2"}
]

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/www'));

app.get("/users", function(req, res) {
	res.json(users);
});

app.post("/users", function(req, res) {
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var user = {firstName: firstName, lastName: lastName};
	users.push(user);
	res.json(users);
});

app.delete("/users", function(req, res) {
	var firstName = req.query.firstName;
	var lastName = req.query.lastName;

	var userIndex = -1;
	for (index in users) {
		var user = users[index];
		if (user.firstName == firstName && user.lastName == lastName) {
			userIndex = index;
			break;
		}
	}

	if (userIndex != -1) {
		users.splice(userIndex, 1);
	}

	res.json(users);

});

app.listen(3000, function(){
	console.log("listening on 3000");
});

///////////////////////////////////////////////////////////////////

app.post("/updateUsers", function(req, res) {
	var first = req.query.first; 
	var last = req.query.last;
	var id = req.query.userId; //prosljedeni ID
	if(first!==undefined){ //ako taj parametar nije prazan
		users[id].firstName=first;
	}
	if(last!==undefined){ //ako taj parametar nije prazan
		users[id].lastName=last;
	}
	
	//res.json(users);

});