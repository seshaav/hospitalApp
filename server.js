var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db=mongojs('mongodb://admin:admin@ds137040.mlab.com:37040/patientlist', ['patientlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public") );
app.use(bodyParser.json());
app.get('/patientlist', function(req,res){
	console.log("I received a GET request")
	
	db.patientlist.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/patientlist', function(req,res){
	console.log(req.body);
	db.patientlist.insert(req.body, function(err,doc){
		res.json(doc);
	});
});

app.delete('/patientlist/:id', function(req,res){
	var id = req.params.id;
	console.log(id);
	db.patientlist.remove({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});

app.get('/patientlist/:id', function(req,res){
	var id = req.params.id;
	console.log(id);
	db.patientlist.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});

app.put('/patientlist/:id', function(req,res){
	var id = req.params.id;
	console.log(req.body.familyId);
	db.patientlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
			update : {$set: {familyId :  req.body.familyId,memberName : req.body.memberName,contactNumber : req.body.contactNumber,
			email : req.body.email,height : req.body.height,weight : req.body.weight,	
			bloodGroup : req.body.bloodGroup,bloodPressure : req.body.bloodPressure,consultingDoctor : req.body.consultingDoctor,
			treatmentTaken: req.body.treatmentTaken,previousVisit : req.body.previousVisit,	
			additionalInformation : req.body.additionalInformation,}},
			new: true}, function(err,doc){
				res.json(doc);
			});
});


app.listen(3000);
console.log("Server running on port 3000");
