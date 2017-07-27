// file: login.js
const request 	= require('supertest');
const app 		= require('../server');
const expect 	= require('chai').expect;
const validator = require("email-validator");
const argv 		= require('optimist').demand('email').argv;

var email 		= argv.email;
var pswrd 		= argv.pswrd;

describe("One-password Login", function() {
	describe('Validate Email', function() {
		it('Should success if email is valid', function(done) {
			var ok = validator.validate(email);
			expect( ok )
			.to.equal( true );
			done();
		}); 
		
		it('Should success if password is not empty', function(done) {
			var ok = pswrd.length > 0;
			expect( ok )
			.to.equal( true );
			done();
		}); 
	});
	
	describe('Login API', function() {
		it('Should success if authentication successed', function(done) {
			request(app)
			   .post('/login')
			   .set('Accept', 'application/json')
			   .set('Content-Type', 'application/json')
			   .send({ email: email, pswrd: pswrd})
			   .expect(200)
			   .expect('Content-Type', /json/)
			   .expect(function(response) {
				  expect(response.body).not.to.be.empty;
				  expect(response.body).to.be.an('object');
				  expect(response.body.status).to.equal( 'success' );
			   })
			   .end(done);
		}); 
	});
	
});