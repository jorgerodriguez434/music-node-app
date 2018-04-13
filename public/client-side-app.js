console.log("hi");
const PLAYLIST_API_ENDPOINT = 'http://localhost:8080/api/playlist';
const PLAYLIST = $('.playlist');

$('.get-button').on('click', event => {
    
    PLAYLIST.empty();
    console.log("Making a GET request");
    $.getJSON(PLAYLIST_API_ENDPOINT)
    .then(data => {
      
          console.log(data);
          if(data.length === 0){
            console.log("There are no songs!");
            PLAYLIST.text("Error: There are no songs!");
          } 
          
	 	      data.map(item => {
		
   	            PLAYLIST.append(

   					      ` 
   					          <h4> ${item.song}  </h4>
   					          <p> -- ${item.artist} </p>

  					      `
   			        );

  	      });  


   })
   .catch(err => console.log(err)); 
    
});

$('.post-button').on('click', event => {

    const userSong = document.getElementById("song-name").value;
    const userArtist = document.getElementById("artist-name").value;

    $.ajax({
        url: PLAYLIST_API_ENDPOINT,
        method: 'POST',
        data: {

            song: userSong,
            genre: "Pop",
            artist: userArtist
        },
        success: function(data) {
            console.log(data);
        }
    });
});

