console.log("hi, from client-side-app!");
const PLAYLIST_API_ENDPOINT = 'http://localhost:8080/api/playlist';
const PLAYLIST = $('.playlist');

function remove(id) {
    for (let i = 0; i < list.length; i += 1) {
        const fruit = list[i];
        if (id === fruit.id) {
            list.splice(i, 1);
        }
    }
    //render();
}

function handleRemove() {
    PLAYLIST.on('click', 'div button', function() {
        const id = $(this).parent().val();
        remove(id);
    });
}

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
                      <h4  ${item.song} </h4> 
                      <p> ${item.artist} </p>
                      <p> ${item.genre} </p>
                      <img src=${item.imageUrl}>
                      <div id="${item._id}"> 
                          <button class="button remove-button"> Remove </button>
                      </div>

  					      `
   			        );

                console.log(item._id)

  	      });  
   })
   .catch(err => console.log(err)); 
    
});


PLAYLIST.on('click', 'div button', event => {

    console.log("Trying to remove");
    event.preventDefault();
    console.log("Making a DELETE request");
    const id = $(this).parent().val();
    console.log(id);
    $.ajax({
        url: `http://localhost:8080/api/playlist/${id}`,
        method: 'DELETE',
        success: function(data) {
            console.log(data);
        }
    });

});

$('.add-song-button').on('click', event => {

    console.log("Making a POST request");
    const userSong = $("#song-id").val();
    const userArtist = $("#artist-id").val();
    const userGenre = $("#genre-id").val();
    const userImageUrl = $("#image-url-id").val();

    $.ajax({
        url: PLAYLIST_API_ENDPOINT,
        method: 'POST',
        data: {
            song: userSong,
            genre: userGenre,
            artist: userArtist,
            imageUrl: userImageUrl
        },
        success: function(data) {
            console.log(data);
            $('.js-insert').text('You have successfully added a song!');
        },
        error: function(err) {
          console.log(err);
        }
    });
});

$('.confirm-delete-button').click(event => {

    event.preventDefault();
    console.log("Making a DELETE request");

    const id = $('#delete-id').val();    
    console.log(id);
    $.ajax({
        url: `http://localhost:8080/api/playlist/${id}`,
        method: 'DELETE',
        success: function(data) {
            console.log(data);
        }
    });
});

$('.confirm-update-button').on('click', event => {

    console.log("Making a PUT request");
    const id = $('#update-id').val();

    $.ajax({
        url: `http://localhost:8080/api/playlist/${id}`,
        contentType: 'application/json',
        method: 'PUT',
        data: {
            artist: "Changing name again"
        },
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
          console.log(err);
        }
    });
});


