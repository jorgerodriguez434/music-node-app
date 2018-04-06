const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const mongoose = require('mongoose');

const { app, runServer, closeServer } = require('../server')
const {TEST_DATABASE_URL} = require('../config');


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
					   .get('/api/playlist')
					   .then(function (res) {

					   		expect(res).to.have.status(200);

					   });

	});
	it ('should return a json object on GET request', function() {

			return chai
					   .request(app)
					   .get('/api/playlist')
					   .then(function (res) {

					   		expect(res).to.be.json;

					   });

	});

	it ('should return a 201 status code on POST request', function() {

			return chai
					   .request(app)
					   .post('/api/playlist')
					   .then(function (res) {

					   		expect(res).to.have.status(201);

					   });

	});

	it ('should create and return created json object on POST request', function() {

			return chai
					   .request(app)
					   .post('/api/playlist')
					   .send({

					   		local_id: "002",
		              		song: "When Doves Cry",
		             	    artist: "Prince"

					   })
					   .then(function (res) {

					   		expect(res).to.be.json;

					   });

	});

	it ('should return a 200 status code on DELETE request', function() {

			return chai
					   .request(app)
					   .delete('/api/playlist/5ac532ba041f6850c1157c7a')
					   .then(function (res) {

					   		expect(res).to.have.status(200);

					   });

	});

	it ('should delete and return deleted json object on DELETE request', function() {

			return chai
					   .request(app)
					   .delete('/api/playlist/5ac532ba041f6850c1157c7a')
					   .then(function (res) {

					   		expect(res).to.be.json;

					   });

	});

	it ('should return a 200 status code on PUT request', function() {

			return chai
					   .request(app)
					   .put('/api/playlist/5ac532ba041f6850c1157c7a')
					   .then(function (res) {

					   		expect(res).to.have.status(200);

					   });

	});

	it ('should update and return updated json object on PUT request', function() {

			return chai
					   .request(app)
					   .put('/api/playlist/5ac532ba041f6850c1157c7a')
					   .then(function (res) {

					   		expect(res).to.be.json;

					   });

	});




});