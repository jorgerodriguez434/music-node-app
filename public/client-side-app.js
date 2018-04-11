console.log("hi");
const PLAYLIST_API_ENDPOINT = 'https://lychee-shortcake-58019.herokuapp.com/api/playlist';
const PLAYLIST = $('.playlist');

$('.get-button').on('click', event => {
    
    event.preventDefault();
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
  
    event.preventDefault();
    console.log("Making a POST request");
    $.post(PLAYLIST_API_ENDPOINT, JSON.stringify({
      
            local_id: "010",
		        song: "Baby One More Time",
		        genre: "Pop",
		        artist: "Britney Spears"
      
    }))
    .then(data => {
      
            console.log(data);
      
    });
    
});

