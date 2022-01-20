const chai = require('chai'); //testing 4
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


	it ('should return a json object on GET request with 200 status code', function() {

			return chai
					   .request(app)
					   .get('/api/playlist')
					   .then(function (res) {

					   		expect(res).to.be.json;
					   		expect(res).to.have.status(200);

					   });

	});

	it ('should create and return created json object on POST request with 201 status code', function() {

			return chai
					   .request(app)
					   .post('/api/playlist')
					   .send({

		              		"song": "When Doves Cry",
		             	    "artist": "Prince",
		             	    "genre": "Pop"

					   })
					   .then(function (res) {

					   		expect(res).to.be.json;
					   		expect(res.body).to.not.be.null;
					   		expect(res.body.song).to.equal("When Doves Cry");
        					expect(res.body.artist).to.equal("Prince");
        					expect(res.body.genre).to.equal("Pop");
        					expect(res).to.have.status(201);

					   });

	});

	it ('should return a 200 status code on DELETE request', function() {

			return chai
					   .request(app)
					   .delete('/api/playlist/5addb204c085b2b0ed8173c1')
					   .then(function (res) {

					   		expect(res).to.have.status(200);

					   });

	});

	it ('should update and return updated json object on PUT request with 200 status code', function() {

			return chai
					   .request(app)
					   .put('/api/playlist/5addb204c085b2b0ed8173c1')
					   .send({

		              		"song": "When Doves Cry",
		             	    "artist": "Michael Jackson",
		             	    "genre": "Pop"

					   })
					   .then(function (res) {

					   		expect(res).to.be.json;
					   		expect(res).to.have.status(200);
					   		expect(res.body).to.not.be.null;
					   		expect(res.body.song).to.equal("When Doves Cry");
        					expect(res.body.artist).to.equal("Michael Jackson");
        					expect(res.body.genre).to.equal("Pop");

					   });

	});

});
