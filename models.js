const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const PlaylistSchema =  mongoose.Schema({

	song: String,
	artist: String,
	genre: String,
	video: String,
	created: {type: Date, default: Date.now}

});

PlaylistSchema.methods.serialize = function() {
	
  return {
    
    song: this.song,
    artist: this.artist,
    video: this.video,
    genre: this.genre

  };
};

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = { Playlist };

