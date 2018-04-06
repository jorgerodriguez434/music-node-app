'use strict'

const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const morgan = require('morgan');

//const router = require('./router');




const { PlayList } = require('./models');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.get('/api/playlist/', (req, res) => {

      console.log('making a GET request');
      PlayList.find()
      .then(playlist => res.status(200).json(playlist))
      .catch(err => {

          console.error(err);
          res.status(500).json({error: `${err}`})

      })
});

app.post('/api/playlist/', jsonParser, (req, res) => {

    console.log('making a POST request');
    PlayList.create({

                  local_id: req.body.local_id, //it is body
                  song: req.body.song,
                  artist: req.body.artist

    })
    .then(item => res.status(201).json(item));

});

app.delete('/api/playlist/:id', (req, res) => {

    console.log('making a DELETE request');
    //need to target a specific item
    PlayList.findByIdAndRemove(req.params.id)
    .then(item => {
        console.log(item);
        res.json(item);
        res.status(200).end();
    });

});

app.put('/api/playlist/:id', jsonParser, (req, res) => {

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



const { DATABASE_URL, PORT } = require('./config');

const cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan('common'));
app.use(express.static('public'));
//app.use('/api/playlist', router)
 
let server;
// this function connects to our database, then starts the server
function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port} --April 5th, 2018`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer };