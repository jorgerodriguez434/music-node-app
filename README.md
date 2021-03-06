# Song Organizer

A user can create a playlist by adding songs. Upon adding songs, a user can remove or update song. These songs will stay with you wherever you go! Check the app out here: https://lychee-shortcake-58019.herokuapp.com/


## Screenshots
 ![image](https://user-images.githubusercontent.com/18128525/39194207-cc4194ac-47a2-11e8-9a32-06630e403276.png)
 ![image](https://user-images.githubusercontent.com/18128525/39194306-0aa27202-47a3-11e8-8fd2-7a1a01919d32.png)
 ![image](https://user-images.githubusercontent.com/18128525/39194420-52966334-47a3-11e8-92c1-abaf737f2c1f.png)
 ![image](https://user-images.githubusercontent.com/18128525/39194841-25152dd6-47a4-11e8-9ec3-9fe7aa80113d.png)

## API Documentation
   ### Playlist attributes
   * Song (String)
   * Artist (String)
   * Genre (String)
   ### GET all songs
   * ${Base url}/api/playlist
   ### POST a song
   * ${Base url}/api/playlist
   * Takes a song, artist, and genre as parameters
   ### DELETE a song
   * ${Base url}/api/playlist/${id}
   ### UPDATE a song
   * ${Base url}/api/playlist/${id}

## Technology used
* JavaScript
* CSS
* HTML
* JQuery
* Express
* Node.js

## Future Components
* Search bar
* Login page
* Multiple playlists
* Play songs/videos
* Pictures of artists
* Get concert tickets
