const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const PlayListSchema =  mongoose.Schema({

	playlist: [
			{
				local_id: String,
				song: String,
				artist: String,
				genre: String
			}
	],
	created: {
		type: Date, 
		default: Date.now
	}


});

const PlayList = mongoose.model('PlayList', PlayListSchema);

module.exports = { PlayList };

