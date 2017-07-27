// file: register.js
const request 	= require('supertest');
const app 		= require('../server');
const expect 	= require('chai').expect;
const validator = require("email-validator");
const argv 		= require('optimist').demand('email').argv;

var email 		= argv.email

describe("One-password Register", function() {
	
	describe('Validate Email', function() {
		it('Should success if email is valid', function(done) {
			var ok = validator.validate(email);
			expect( ok )
			.to.equal( true );
			done();
		}); 
	});
			
	describe('Register API', function() {
		it('Should success if server sent password', function(done) {
			request(app)
			   .post('/register')
			   .set('Accept', 'application/json')
			   .set('Content-Type', 'application/json')
			   .send({ email: email})
			   .expect(200)
			   .expect('Content-Type', /json/)
			   .expect(function(response) {
				  expect(response.body).not.to.be.empty;
				  expect(response.body).to.be.an('object');
				  expect(response.body.response).to.not.have.property('code');
			   })
			   .end(done);
		}); 
	});

	
});