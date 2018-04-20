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


function update(selfButton) {
  /*var div = $(this).parent();
    console.log(`${this}: from update function`);
    var song = div.find('h1').text(); */
  console.log(selfButton);
  console.log('from update function, should be a button')
  const currentDiv = $(selfButton).parent();
  console.log(currentDiv);
  const song = currentDiv.find('.song').text();
  const artist = currentDiv.find('.artist').text();
  const genre = currentDiv.find('.genre').text();
  currentDiv.find('.remove-button').hide();
 
  currentDiv.append(`
    <form class="song-form">
      <input class="input-song" type="text" value="${song}"> 
      <input class="input-artist" type="text" value="${artist}">
      <input class="input-genre" type="text" value="${genre}"> 
    </form>
`);
  
  currentDiv.find('.update-button').text('CONFIRM');  
}

function confirm() {

  const currentDiv = $(this).parent();
  console.log('this is coming form confirm function');
  console.log(currentDiv)
  const userSong = currentDiv.find('.input-song').val();
  const userArtist = currentDiv.find('.input-artist').val();
  const userGenre = currentDiv.find('.input-genre').val();
  const that = $(this);
  console.log("Making a PUT request");
  console.log(id+" ------------coming from confirm-----------")
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
            currentDiv.find('.song').text(userSong);
            currentDiv.find('.artist').text(userArtist);
            currentDiv.find('.genre').text(userGenre);
            currentDiv.find('.update-button').text('UPDATE SONG');
            currentDiv.find('.song-form').remove();
            currentDiv.find('.remove-button').show();
            that.off();
            //continue here
        },
        error: function(err) {
          console.log(err);
        }
    });

}
//$('div button').click(update);

let id= "no entry"
PLAYLIST.on('click', '.update-button', function(event) {

    console.log("Update button has been clicked");
    id = $(this).parent().attr('data-id');
    const selfButton = this;
    console.log(self);
    console.log(`${id} :This should be the current ID`);
    //continue from here
    /* 

        this says:
        From the beginning:
            When I click on an update button,
            take the id from that current button,
            and also take the element with you
        Now for the fun part
        This is what follows next
        1. self is the button that was clicked on
        2. call update function
        3. Turn off self button
        4. Turn on self button, and when clicked on, it calls confirm function

    */
   // $(self).click(update); 
    update(selfButton);
    $(selfButton).off();
     console.log(self+" this is coming from the PLAYLIST");
    $(selfButton).click(confirm);

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
