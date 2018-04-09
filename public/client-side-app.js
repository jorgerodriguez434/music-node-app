console.log("hi");

$('.playlist').on('click', event => {
    event.preventDefault();
    $.getJSON('https://lychee-shortcake-58019.herokuapp.com/api/playlist')
    .then(data => {
    console.log(data);
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
});
