const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const PlaylistSchema =  mongoose.Schema({

	song: String,
	artist: String,
	genre: String,
	created: {type: Date, default: Date.now}

});

PlaylistSchema.methods.serialize = function() {
	
  return {
    
    song: this.song,
    artist: this.artist,
    genre: this.genre,

  };
};

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = { Playlist };
