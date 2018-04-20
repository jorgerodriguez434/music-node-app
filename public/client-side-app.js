console.log("hi, from client-side-app!");
const PLAYLIST_API_ENDPOINT = 'http://localhost:8080/api/playlist';
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
                console.log(item._id);

            });  
}

PLAYLIST.on('click', '.remove-button', function(event) {

    console.log("Making a DELETE request");
    event.preventDefault();
    const id = $(this).parent().attr('data-id');
    const self = this;

    $.ajax({
        url: `http://localhost:8080/api/playlist/${id}`,
        method: 'DELETE',
        success: function(data) {
            console.log('Data has been deleted');
            $(self).parent().remove();
            $('.deleted-text').text('Song has been deleted')
        }
    });

}); 

function update() {

  
  const song = $('.song').text();
  const artist = $('.artist').text();
  const genre = $('.genre').text();
  $('.remove-button').hide();
 
  $('.current-song').append(`
    <form id="F" class="song-form">
      <input class="input-song" type="text" value="${song}"> 
      <input class="input-artist" type="text" value="${artist}">
      <input class="input-genre" type="text" value="${genre}"> 
    </form>
`);
  
  $('.update-button').text('CONFIRM');  
}

function confirm() {
  const currentDiv = $(this).parent();
  const userSong = $('.input-song').val();
  const userArtist = $('.input-artist').val();
  const userGenre = $('.input-genre').val();
  const that = $(this);
  console.log("Making a PUT request");
  $.ajax({
        url: `http://localhost:8080/api/playlist/${id}`,
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
            $('.song').text(userSong);
            $('.artist').text(userArtist);
            $('.genre').text(userGenre);
            $('.update-button').text('UPDATE SONG');
            $('.song-form').remove();
            $('.remove-button').show();
            that.off();
            //continue here
        },
        error: function(err) {
          console.log(err);
        }
    });

}

let id= "no entry"
PLAYLIST.on('click', '.update-button', function(event) {

    console.log("Update button has been clicked");
    id = $(this).parent().attr('data-id');
    const self = this;
    console.log(self);
    console.log(`${id} :This should be the current ID`);
    //continue from here
    update();
    $(self).off();
     console.log(self);
    $(self).click(confirm);

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
