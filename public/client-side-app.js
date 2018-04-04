$.getJSON('http://localhost:8080/music-node-app')
.then(data => {

		data.playlist.map(item => {

   		$('body').append(

   					`
   					   <h4> ${item.song}  </h4>
   					   <p> -- ${item.artist} </p>

  					`
   			);

  	 }).catch(err => console.log(err));

});







