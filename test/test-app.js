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
	
	it ('should return a GET status code 200 on GET request', function() {

			return chai
					   .request(app)
					   .get('/music-node-app')
					   .then(function (res) {

					   		expect(res).to.have.status(200);

					   });

	});
	it ('should return a json object on GET request', function() {

			return chai
					   .request(app)
					   .get('/music-node-app')
					   .then(function (res) {

					   		expect(res).to.be.json;

					   });

	});
	it ('should return a 201 status code on POST request', function() {

			return chai
					   .request(app)
					   .post('/music-node-app')
					   .then(function (res) {

					   		expect(res).to.have.status(201);

					   });

	});

	it ('should create and return a json object on POST request', function() {

			return chai
					   .request(app)
					   .post('/music-node-app')
					   .send({

					   		id: "002",
		              		song: "When Doves Cry",
		             	    artist: "Prince"

					   })
					   .then(function (res) {

					   		expect(res).to.be.json;

					   });

	});



});