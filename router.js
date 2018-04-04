const express = require('express');
const router = express.Router();

//import model

const {MOCK_POST_PLAYLIST} = require('./database');

router.get('/', (req, res) => {

      console.log('making a GET request');
      res.json(MOCK_POST_PLAYLIST); 
      console.log(MOCK_POST_PLAYLIST);
      res.status(200).end();

});


module.exports = router;