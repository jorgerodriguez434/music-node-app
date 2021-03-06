const express = require('express');
const router = express.Router();

const { Playlist } = require('../models');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const formParser = bodyParser.urlencoded({ extended: true });
const queryString = require('query-string');

router.get('/', (req, res) => {

      console.log('making a GET request');
      Playlist.find()
      .then(playlist => res.status(200).json(playlist));

});

router.post('/', jsonParser, (req, res) => {

		const {song, genre, artist} = req.body;
		const isAnyPropertyMissing = !song || !genre || !artist;

		if(isAnyPropertyMissing) {
				console.log('All fields are required!');
  				return res.status(400).json({ error: "All fields are required!" });
		}

        console.log('making a POST request');
        Playlist.create({

                      song: req.body.song,
                      artist: req.body.artist,
                      genre: req.body.genre,


        }).then(song => res.status(201).json(song.serialize())).catch(err => console.log(err))


        /*.then(data => {
          Playlist.findById(data._id, (error, song) => res.status(201).json(song.serialize()));
        })
        .catch(err => console.log(err)); */

});

router.delete('/:id', (req, res) => {

		console.log('making a DELETE request');
		Playlist.findByIdAndRemove(req.params.id)
		.then( song => {

				res.status(200).end();
		})
		.catch(err => console.log(err));


});

router.put('/:id', jsonParser, (req, res) => {

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
												{ upsert: true, new: true })
		.then(data => {
          Playlist.findById(data._id, (error, song) => res.status(200).json(song.serialize()));
        })
        .catch(err => console.log(err));



});


module.exports = router;
