const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const PlayListSchema =  mongoose.Schema({

	local_id: String,
	song: String,
	artist: String,
	genre: String,
	created: {type: Date, default: Date.now}


});

PlayListSchema.methods.serialize = function() {
	
  return {
    
    song: this.song,
    artist: this.artist,
    genre: this.genre,

  };
};

const PlayList = mongoose.model('PlayList', PlayListSchema);

module.exports = { PlayList };

