$.getJSON('http://localhost:8080/api/git splaylist')
.then(data => {

		data.map(item => {

   		$('body').append(

   					`
   					   <h4> ${item.song}  </h4>
   					   <p> -- ${item.artist} </p>

  					`
   			);

  	 });

})
.catch(err => console.log(err)); 







