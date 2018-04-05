const express = require('express');
const router = express.Router();

const { PlayList } = require('./models');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {

      console.log('making a GET request');
      PlayList.find()
      .then(playlist => res.status(200).json(playlist))
      .catch(err => {

      		console.error(err);
      		res.status(500).json({error: `${err}`})

      })
});

router.post('/', jsonParser, (req, res) => {

		console.log('making a POST request');
		PlayList.create({

		              local_id: req.body.id, //it is body
		              song: req.body.song,
		              artist: req.body.artist

		})
		.then(item => res.status(201).json(item));

});

router.delete('/:id', (req, res) => {

		console.log('making a DELETE request');
		//need to target a specific item
		PlayList.findByIdAndRemove(req.params.id)
		.then(  () => {

				res.status(204).json(req.params.id);

		});

});


module.exports = router;