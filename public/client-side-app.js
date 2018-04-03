const playlist = [


		{id: "000",
		 song: "Thriller",
		 artist: "Michael Jackson"}, 

		{id: "001",
		 song: "Like a Prayer",
		 artist: "Madonna"}


]

function getPlaylist (cb) {

	//make json get request to endpoint
	setTimeout(() => {

				cb(playlist);

	}, 1000);

}

function showPlaylist (data) {
  
   	data.map(item => {

   		$('body').append(

   					`
   					   <h4> ${item.song}  </h4>
   					   <p> -- ${item.artist} </p>

   					`
   			);

   });
  
}

getPlaylist(showPlaylist);







