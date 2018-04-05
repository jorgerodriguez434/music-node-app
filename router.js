const express = require('express');
const router = express.Router();

const { PlayList } = require('./models');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {

      console.log('making a GET request');
      PlayList.find()
      .then(playlist => res.status(200).json(playlist));

});

router.post('/', jsonParser, (req, res) => {

		console.log('making a POST request');
		PlayList.create({

		              id: req.body.id,
		              song: req.body.song,
		              artist: req.body.artist

		})
		.then(item => res.status(201).json(item));

});


module.exports = router;