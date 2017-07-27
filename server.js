// file: server.js
const express 		= require('express');
const app 			= express();
const nodemailer 	= require('nodemailer');
const bodyParser 	= require('body-parser');
const generator		= require('generate-password');
const fs 			= require('fs');
const path 			= require('path');
const validator 	= require("email-validator");
var from = {email:'xxxxx@gmail.com', pass:'xxxx'};

app.use( bodyParser.json({limit: '50mb'}) );
app.use(express.static(__dirname + '/pub'));

app.get('/register', function(req, res)
{
	res.sendFile(path.join(__dirname + '/public/register.html'));
});
app.post('/register', function(req, res)
{
	if(req.body.email && validator.validate(req.body.email)==true)
	{
		
		var password = generator.generate({
			length: 10,
			numbers: true
		});
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: from.email,
				pass: from.pass,
			}
		});
		var mailOptions = {
			from: from.email,
			to: req.body.email, 
			subject: 'Your password', 
			text: password
		};
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				res.json({response: error, status:'error'});
			}else{
				fs.writeFileSync(req.body.email, password);
				res.json({response: info.response, status:'ok'});
			};
		});
	}
	else
	{
		res.json({response: 'e-mail invalid', status:'error'});
	}
	

});
app.get('/login', function(req, res)
{
	res.sendFile(path.join(__dirname + '/public/login.html'));
});
app.post('/login', function(req, res)
{
	var pswrd = fs.readFileSync(req.body.email).toString();
	if(req.body.password === pswrd){
		res.json({response: "Welcome "+req.body.email, status: 'ok'});
	}else{
		res.json({response: "Bad authentication", status: 'error'});
	};

});
/*
app.get('/private', function(req, res)
{
	// stuff to do
});
*/
const server = app.listen(8000, () => {
    console.log('Server is listening on port 8000');
});

module.exports = app;