'use strict'

const express = require('express');
const app = express();
app.use(express.static('public'));

const {MOCK_POST_PLAYLIST} = require('./database');


app.get('/music-app', (req, res) => {

      console.log('making a GET request');
      res.json(MOCK_POST_PLAYLIST); //how to create an object that has methods, class??
      res.status(200).end();

}); 


let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`hi jr, your port is listening, this is the terminal`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer };