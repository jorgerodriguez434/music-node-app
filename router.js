const express = require('express');
const router = express.Router();

const { Playlist } = require('./models');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const formParser = bodyParser.urlencoded({ extended: true });

router.get('/', (req, res) => {

      console.log('making a GET request');
      Playlist.find()
      .then(playlist => res.status(200).json(playlist));

});

let count = 0;
router.post('/', formParser, (req, res) => {

		const requiredFields = ['song', 'artist', 'genre'];
		
		 /*for (let i = 0; i < requiredFields.length; i++) {
    		const field = requiredFields[i];
    		if (!(field in req.body)) {
      			const message = `Missing \`${field}\` in request body`;
      			console.error(message);
      			return res.status(400).send(message);
    		}
  		} */

		console.log(req.body);
        console.log('making a POST request');
        Playlist.create({

                      song: req.body.song,
                      artist: req.body.artist,
                      genre: req.body.genre,


        }).then(data => {
          Playlist.findById(data._id, (error, song) => res.status(201).json(song.serialize()));
        }).catch(err => console.log(err));

});

router.delete('/:id', (req, res) => {

		console.log('making a DELETE request');
		Playlist.findByIdAndRemove(req.params.id)
		.then( song => {
		
				res.status(200).end();
		})
		.catch(err => console.log(err));


});

router.put('/:id', formParser, (req, res) => {

		console.log('making a PUT request')
		const id = req.params.id;
		Playlist.findByIdAndUpdate(id, 
												{ 
													$set:
													{	
														song: req.body.song,
														artist: req.body.artist,
														genre: req.body.genre
													}
												}, 
												{ new: true } )
		.then(data => {
          Playlist.findById(id, (error, song) => {
	          	res.status(200).json(song);
          });
          
        }).catch(err => console.log(err));

});


module.exports = router;