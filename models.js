//import mongoose
//then create a schema object
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//const Schema = mongoose.Schema;

const PlayListSchema = new mongoose.Schema({

	id: String,
	song: String,
	artist: String,
	created: {type: Date, default: Date.now}


});

//now that you have the interface, 
// create a class aka model

const PlayList = mongoose.model('PlayList', PlayListSchema);

module.exports = { PlayList };

