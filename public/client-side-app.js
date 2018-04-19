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

  console.log(data);
  if(data.length === 0){
            console.log("There are no songs!");
            PLAYLIST.text("Please insert a song to playlist!");
          } 
	 data.map(item => {
   	        PLAYLIST.append(

   					      ` 
                    <div data-id="${item._id}" class="current-song">
                      
                        <h4>  ${item.song} </h4> 
                        <p id="Z"> ${item.artist} </p>
                        <p id ="Y"> ${item.genre} </p>
                       <button class="button update-button">UPDATE SONG</button></a>  
                      <!-- <button class="button remove-button">REMOVE</button></a> -->
                    
                   </div>
                   <hr/>
  					      `
   			    );
                console.log(item._id);

            });  
}

function asyncJS (cb) {

   return new Promise(function(resolve, reject){
     return setTimeout(function() {
      resolve('success!');
    }, 3000)
   });

}


//remove
/*
PLAYLIST.on('click', 'div button', function(event) {

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

}); */


/* 
  1. When I click on an update button, I want to get current id
  2. I want to take that id and apply it globally
  3. It has to be asynchronous 
*/
//update
function update() {
  const currentSongDiv = $('.current-song');
  const song = currentSongDiv.find('h4').text();
  const artist = currentSongDiv.find('#Z').text();
  const genre = currentSongDiv.find('#Y').text();
  //$('div').find('span').hide();
 
  currentSongDiv.append(`
    <form>
    <input class="input-song" type="text" value="${song}"> 
    <input class="input-artist" type="text" value="${artist}">
    <input class="input-genre" type="text" value="${genre}"> 
    </form>
`);
  
  currentSongDiv.find('button').text('CONFIRM');  
}

/* 
    .then(function(response){
     $('div').find('h1').text(song);
     $('div').find('h2').text(artist);
     $('div').find('h3').text(genre);
  
     that.off();
     that.click(update);
     that.text('update');
     $('div').find('span').show();
     $('div').find('form').remove();
  });
*/
function confirm() {

  const currentSongDiv = $('.current-song');
  const userSong = currentSongDiv.find('.input-song').val();
  const userArtist = currentSongDiv.find('.input-artist').val();
  const userGenre = currentSongDiv.find('.input-genre').val();
  //const data = {song, artist, genre};
  //const that = $(this);
  currentSongDiv.remove();
  //then render updated song
  $.ajax({
        url: `http://localhost:8080/api/playlist/${id}`,
        method: 'PUT',
        data: {

            song: userSong,
            artist: userArtist,
            genre: userGenre
        },
        success: function(data) {
            console.log(data);
           //continue here
           //render updated song
           currentSongDiv.find('h4').text();
           currentSongDiv.find('#Z').text();
           currentSongDiv.find('#Y').text();

        },
        error: function(err) {
          console.log(err);
        }
    });

}//confirm


let id="no entry";
PLAYLIST.on('click', 'div button', function(event) {

    console.log("Update button has been clicked");
    id = $(this).parent().attr('data-id');
    const self = this;
    console.log(self);
    console.log(`${id} :This should be the current ID`);
    //need to continue from here
    console.log("Making a PUT request");
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
            $('.js-insert').text('You have successfully added a song!');
        },
        error: function(err) {
          console.log(err);
        }
    });

});
/*
$('.confirm-update-button').on('click', function(event) {

    event.preventDefault();
    const userSong = $("#song-id").val();
    const userArtist = $("#artist-id").val();
    const userGenre = $("#genre-id").val();

    console.log("Making a PUT request");
    $.ajax({
        url: `http://localhost:8080/api/playlist/${id}`,
        contentType: 'application/json',
        method: 'PUT',
        data: {

            song: userSong,
            artist: userArtist,
            genre: userGenre
        },
        success: function(data) {
            console.log(data);
        },
        error: function(err) {
          console.log(err);
        }
    });
}); */


fetch();
