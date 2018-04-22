console.log("hi, from client-side-app!");
const PLAYLIST_API_ENDPOINT = 'http://localhost:8080/api/playlist/';
const PLAYLIST = $('.playlist');

function fetch () {

   console.log("Making a GET request");
   $.getJSON(PLAYLIST_API_ENDPOINT)
   .then(render)
   .catch(err => console.log(err));

}

function render(data) {

  PLAYLIST.empty();
  console.log(data);
  if(data.length === 0){
            console.log("There are no songs!");
            PLAYLIST.text("Please insert a song to playlist!");
          } 
	 data.map(item => {
   	        PLAYLIST.append(

   					      ` 
                    <div data-id="${item._id}" class="current-song">
                      
                        <h4 class="song">  ${item.song} </h4> 
                        <p class="artist"> ${item.artist} </p>
                        <p class="genre"> ${item.genre} </p>
                       <button class="button update-button">UPDATE SONG</button></a>  
                      <button class="button remove-button">REMOVE</button></a>
                    
                   </div>
                   <hr/>
  					      `
   			    );

        });  
}

PLAYLIST.on('click', '.remove-button', function(event) {

    console.log("Making a DELETE request");
    event.preventDefault();
    const id = $(this).parent().attr('data-id');
    const self = this;

    $.ajax({
        url: `${PLAYLIST_API_ENDPOINT}${id}`,
        method: 'DELETE',
        success: function(data) {
            console.log('Data has been deleted');
            $(self).parent().remove();
            $('.deleted-text').text('Song has been deleted')
        }
    });

}); 


function update(currentDiv) {

  console.log(currentDiv);
  const song = currentDiv.find('.song').text();
  const artist = currentDiv.find('.artist').text();
  const genre = currentDiv.find('.genre').text();
  currentDiv.find('.remove-button').hide();
  currentDiv.find('.update-button').hide();
 
  currentDiv.append(`
    <form class="song-form">
      <input class="input-song" type="text" value="${song}"> 
      <input class="input-artist" type="text" value="${artist}">
      <input class="input-genre" type="text" value="${genre}"> 
      <button class="button confirm-button">CONFIRM</button></a>
    </form>
  `);
  

}

function confirm(id, currentDiv) {

  console.log(currentDiv);
  const userSong = currentDiv.find('.input-song').val();
  const userArtist = currentDiv.find('.input-artist').val();
  const userGenre = currentDiv.find('.input-genre').val();
 
  $.ajax({
        url: `${PLAYLIST_API_ENDPOINT}${id}`,
        method: 'PUT',
        data: {

            song: userSong,
            artist: userArtist,
            genre: userGenre

        },
        success: function(data) {

            console.log(id)
            console.log(data);
            console.log('SUCCESS!');
            currentDiv.find('.song').text(userSong);
            currentDiv.find('.artist').text(userArtist);
            currentDiv.find('.genre').text(userGenre);
            currentDiv.find('.update-button').text('UPDATE SONG');
            currentDiv.find('.song-form').remove();
            currentDiv.find('.remove-button').show();
            currentDiv.find('.update-button').show();
        },
        error: function(err) {
          console.log(err);
        }
    });

}

PLAYLIST.on('click', '.update-button', function(event) {

    console.log("update-button has been clicked");
    const thisID = $(this).parent().attr('data-id');
    const thisDiv = $(this).parent();

    update(thisDiv);
    $('.confirm-button').click(function () {
                    console.log('confirm-button has been clicked!')
                    confirm(thisID, thisDiv);
    });


});

$('.add-song-button').on('click', function (event) {

    console.log("Making a POST request");
    const userSong = $("#song-id").val();
    const userArtist = $("#artist-id").val();
    const userGenre = $("#genre-id").val();

    $.ajax({
        url: PLAYLIST_API_ENDPOINT,
        method: 'POST',
        data: {
            song: userSong,
            artist: userArtist,
            genre: userGenre
        },
        success: function(data) {
            console.log(data);
            $('.added-song-message').show();
        },
        error: function(err) {
          console.log(err);
        }
    });

});

fetch();
