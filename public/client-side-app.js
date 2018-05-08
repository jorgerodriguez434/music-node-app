console.log("hi, from client-side-app!");
const PLAYLIST_API_ENDPOINT = 'https://lychee-shortcake-58019.herokuapp.com//api/playlist';
const PLAYLIST = $('.playlist');

function render(data) {

  PLAYLIST.empty();
  if(data.length === 0){
            console.log("There are no songs!");
            PLAYLIST.text("Please insert a song to playlist!");
          } 
   data.map(item => {
            console.log(item.video);
            PLAYLIST.append(

                  ` 
                    <div data-id="${item._id}" class="song">
                      
                        <h2 id="display-song">  ${item.song} </h2> 
                        <p id="display-artist"> ${item.artist} </p>
                        <p id="display-genre"> ${item.genre} </p>
                        <iframe id="display-video" class="video" src=${item.video} frameborder="0" allowfullscreen></iframe>
                        <button class="button update-button">UPDATE SONG</button></a>  
                        <button class="button remove-button">REMOVE</button></a>
                      
                   </div>
                     
                  `
            );
              
        });  
}

function initiateRemoval(currentDiv) {

    currentDiv.find('.remove-button').hide();
    currentDiv.find('.update-button').hide();
    currentDiv.append(`
              <p class="are-you-sure-text"> Are you sure you want to remove this song? </p>
              <button class="button yes-button">YES</button></a>
              <button class="button cancel-button">CANCEL</button></a>     
      `)
}

function initiateUpdate(currentDiv) {
  
  const song = currentDiv.find('#display-song').text();
  const artist = currentDiv.find('#display-artist').text();
  const genre = currentDiv.find('#display-genre').text();
  const video = currentDiv.find('#display-video').text();
  currentDiv.find('.remove-button').hide();
  currentDiv.find('.update-button').hide();
 
  currentDiv.append(`
    <form class="song-form">
      <label for="input-song-id"></label>
      <input class="input-song my-text" id="input-song-id" type="text" value="${song}" placeholder="Song"> 
      <label for="input-artist-id"></label>
      <input class="input-artist my-text" id="input-artist-id" type="text" value="${artist}" placeholder="Artist">
      <label for="input-genre-id"></label>
      <input class="input-genre my-text" id="input-genre-id" type="text" value="${genre}" placeholder="Genre"> 
      <label for="input-video-id"></label>
      <input type="text" id="input-video-id"  placeholder="Video" value="${video}" class="my-text">
      <button class="button confirm-update-button">CONFIRM</button></a>
      <button class="button cancel-button">CANCEL</button></a>
    </form>
  `);
}

function manipulateSong(process, currentDiv, button, confirm, id) {

    process(currentDiv);
    $(button).click(function () {
                    confirm(id, currentDiv);  
                    
    });

    $('.cancel-button').click(function () {
                    cancel(currentDiv);
    });
}

function updateSong(event) {

    event.preventDefault();
    const thisID = $(this).parent().attr('data-id');
    const thisDiv = $(this).parent();
    manipulateSong(initiateUpdate, thisDiv, '.confirm-update-button', confirmUpdate, thisID);
}

function removeSong() {

    const thisID = $(this).parent().attr('data-id');
    const thisDiv = $(this).parent();
    manipulateSong(initiateRemoval, thisDiv, '.yes-button', yesRemove, thisID);
}

function cancel(currentDiv) {

    $('.are-you-sure-text').text("");
    currentDiv.find('.song-form').remove();
    currentDiv.find('.yes-button').hide();
    currentDiv.find('.cancel-button').hide();
    currentDiv.find('.remove-button').show();
    currentDiv.find('.update-button').show();
}

function fetch() {

   console.log("Making a GET request");
   $.getJSON(PLAYLIST_API_ENDPOINT)
   .then(render)
   .catch(err => console.log(err));
}

function addSong(event) {

    event.preventDefault();
    console.log("Making a POST request");
    const userSong = $("#song-id").val();
    const userArtist = $("#artist-id").val();
    const userGenre = $("#genre-id").val();
    const userVideo = $("#video-id").val();
    console.log(userVideo);

    $.ajax({
        url: PLAYLIST_API_ENDPOINT,
        contentType: 'application/json',
        method: 'POST',
        data: JSON.stringify({
          
              song: userSong,
              artist: userArtist,
              video: userVideo,
              genre: userGenre
        }),
        success: function(data) {
                $('.added-song-message').show();
        },
        error: function(err) {
          console.log(err);
        }
    });
}

function confirmUpdate(id, currentDiv) {

  const userSong = currentDiv.find('.input-song').val();
  const userArtist = currentDiv.find('.input-artist').val();
  const userGenre = currentDiv.find('.input-genre').val();
  const userVideo = currentDiv.find('.input-video').val();

  $.ajax({

        url: `${PLAYLIST_API_ENDPOINT}/${id}`,
        contentType: 'application/json',
        method: 'PUT',
        data: JSON.stringify({

            song: userSong,
            artist: userArtist,
            video: userVideo,
            genre: userGenre
        }),
        success: function(data) {

            console.log('SUCCESS!');
            currentDiv.find('#display-song').text(userSong);
            currentDiv.find('#display-artist').text(userArtist);
            currentDiv.find('#display-genre').text(userGenre);
            currentDiv.find('#display-video').text(userVideo);
            currentDiv.find('.song-form').remove();
            currentDiv.find('.remove-button').show();
            currentDiv.find('.update-button').show();
        },
        error: function(err) {
          console.log(err);
        }
    });
}

function yesRemove(id, currentDiv) {

    console.log("Making a DELETE request");
    $.ajax({
        url: `${PLAYLIST_API_ENDPOINT}/${id}`,
        method: 'DELETE',
        success: function(data) {
            console.log('Data has been deleted');
            currentDiv.text('Song has been deleted!');
            setTimeout(function(){
                      currentDiv.remove();
            }, 3000);
        }
    });
}

PLAYLIST.text("Internal Error: Server not running");
fetch();
$('.add-song-button').click(addSong);
PLAYLIST.on('click', '.remove-button', removeSong); 
PLAYLIST.on('click', '.update-button', updateSong);
