const express = require('express');
const router = express.Router();

const { PlayList } = require('./models');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const formParser = bodyParser.urlencoded();
router.get('/', (req, res) => {

      console.log('making a GET request');
      PlayList.find()
      .then(playlist => res.status(200).json(playlist));

});

router.post('/', formParser, (req, res) => {
		console.log(req.body);
        console.log('making a POST request');
        PlayList.create({

                      local_id: req.body.local_id,
                      song: req.body.song,
                      genre: req.body.genre,
                      artist: req.body.artist


        }).then(data => {
          
          PlayList.findById(data._id, (error, song) => res.status(200).json(song));
          
        }).catch(err => console.log(err));

});

router.delete('/:id', (req, res) => {

		console.log('making a DELETE request');
		//need to target a specific item
		PlayList.findByIdAndRemove(req.params.id)
		.then(item => {
				console.log(item);
				res.json(item);
				res.status(200).end();
		});

});

router.put('/:id', jsonParser, (req, res) => {

		console.log('making a PUT request')
		PlayList.findByIdAndUpdate(req.params.id, 
												{ 
													$set:
													{
														song: `${req.body.song}`,
														artist: `${req.body.artist}`
													}
												}, 
												{ new: true } )
		.then(item => {

				console.log(item);
				res.json(item);
				res.status(200).end();

		});

});


module.exports = router;