const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../server')
const {TEST_DATABASE_URL} = require('../config');
//import model
chai.use(http);


before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  after(function() {
    return closeServer();
  });


describe ('Music App', function() {
	
	it ('should return a GET status code 200', function() {

			return chai
					   .request(app)
					   .get('/music-node-app')
					   .then(function (res) {

					   		expect(res).to.have.status(200);

					   });

	});
	it ('should return a json object', function() {

			return chai
					   .request(app)
					   .get('/music-node-app')
					   .then(function (res) {

					   		expect(res).to.be.json;

					   });

	});


});