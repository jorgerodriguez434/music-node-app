console.log("hi");

const MOCK_POST_PLAYLIST = {

		playlist: [ 
		  
		            {
		              id: "000",
		              song: "Thriller",
		              artist: "Michael Jackson"
		            }, 
		  
		            {
		              id: "001",
		              song: "Like a Prayer",
		              artist: "Madonna"
		            }, 
		            
		            {
		              id: "002",
		              song: "When Doves Cry",
		              artist: "Prince"
		            }, 
		            
		            {
		              id: "003",
		              song: "I Wanna Dance With Somebody",
		              artist: "Whitney Houston"
		            }, 
		    ]


}


function getPlaylist(cb) {
  
  setTimeout ( () => {
    
    cb(MOCK_POST_PLAYLIST)
    
  }, 100);
  
}

function showPlaylist (data) {
  
   data.playlist.map(item => {

   		$('body').append(

   					`
   					   <h4> ${item.song}  </h4>
   					   <p> -- ${item.artist} </p>

   					`
   			);

   });
  
}

getPlaylist(showPlaylist);




