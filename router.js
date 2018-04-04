const express = require('express');
const router = express.Router();

//const {MOCK_POST_PLAYLIST} = require('./database');
const { PlayList } = require('./models');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {

      console.log('making a GET request');
      //res.json(MOCK_POST_PLAYLIST); 
      PlayList.find()
      .then(playlist => {

      			res.status(200).json(playlist.map(item => {

      					/*return data*/

      			})); //res

      })//then

});

router.post('/', jsonParser, (req, res) => {

		console.log('making a POST request');
		PlayList.create({

		              id: req.body.id,
		              song: req.body.song,
		              artist: req.body.artist

		})//create
		.then(playlist => res.json(playlist));

});


module.exports = router;