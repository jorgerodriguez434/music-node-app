const express = require('express');
const router = express.Router();

const { User } = require('../models');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const formParser = bodyParser.urlencoded({ extended: true });
const queryString = require('query-string');

router.get('/', (req, res) => {

      console.log('making a GET request');
      User.find()
      .then(users => res.status(200).json(users));

});

router.post('/', jsonParser, (req, res) => {

		const {email, password} = req.body;
		const isAnyPropertyMissing = !email || !password;

		if(isAnyPropertyMissing) {
				console.log('All fields are required!');
  			return res.status(400).json({ error: "All fields are required!" });
		}

      User.find().then(users => {
          users.map(user => {

             if(req.body.email === user.email){
                  const message = 'That email is already registered!';
                  console.log(message);
                  return res.status(400).json({ error: message });
             } 
            else {
              console.log('making a POST request');
              User.create({

                      email: req.body.email,
                      password: req.body.password,

              }).then(data => {
                      User.findById(data._id, (error, user2) => res.status(201).json(user.serialize()));
              }).catch(err => console.log(err));
            }
          });
    });

    

});



module.exports = router;