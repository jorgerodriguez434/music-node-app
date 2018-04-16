console.log("hi, from client-side-app!");
const PLAYLIST_API_ENDPOINT = 'http://localhost:8080/api/playlist';
const ID_ENDPOINT = 'http://localhost:8080/api/playlist/:id'
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
          PLAYLIST.append(

                  `
                     <h2> <span class="black">PLAYLIST <span></h2>
                  `

            )
	 	      data.map(item => {
		
   	            PLAYLIST.append(

   					      `   
   					          <h4> ${item.song}  </h4>
   					          <ul> 
                          <li> Artist: ${item.artist} </li>
                          <li> Song: ${item.song} </li>
                          <li> ID: ${item._id}  </li>

  					      `
   			        );

  	      });  


   })
   .catch(err => console.log(err)); 
    
});

$('.confirm-post-button').on('click', event => {

    console.log("Making a POST request");
    const userSong = document.getElementById("song-id").value;
    const userArtist = document.getElementById("artist-id").value;

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

$('.confirm-delete-button').on('click', event => {

    console.log("Making a PUT request");
    const id = document.getElementById("update-id").value;

    $.ajax({
        url: `http://localhost:8080/api/playlist/:${id}`,
        contentType: 'application/json',
        method: 'DELETE',
        success: function(data) {
            console.log(data);
        }
    });
});
$('.update-button').on('click', event => {

    PLAYLIST.empty();
    PLAYLIST.append(

            `
            

              
            `


      );
  });

$('.confirm-update-button').on('click', event => {

    console.log("Making a PUT request");
    //const id = document.getElementById("update-id").value;

    $.ajax({
        url: `http://localhost:8080/api/playlist/:5ad1dd1c6aec272c2e5f6054`,
        contentType: 'application/json',
        method: 'PUT',
        data: {
            artist: "Changing name again"
        },
        success: function(data) {
            console.log(data);
        }
    });
});


