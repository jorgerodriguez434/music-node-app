const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

const { app, runServer, closeServer } = require('../server')

chai.use(http);


before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });


describe ('Music App', function() {
	
	it ('should return a GET status code 200', function() {

			return chai
					   .request(app)
					   .get('/music-app')
					   .then(function (res) {

					   		expect(res).to.have.status(200);

					   });

	});
	/*
	it ('should be in html', function() {

			return chai
					   .request(app)
					   .get('/music-app')
					   .then(function (res) {

					   		expect(res).to.have.text.html('Hello World');

					   });
			
	});*/


});