$.getJSON('mongodb://music-app:mongoose@ds213239.mlab.com:13239/my-first-mlab-db')
.then(data => {

		data.playlist.map(item => {

   		$('body').append(

   					`
   					   <h4> ${item.song}  </h4>
   					   <p> -- ${item.artist} </p>

  					`
   			);

  	 });

})
.catch(err => console.log(err)); 







