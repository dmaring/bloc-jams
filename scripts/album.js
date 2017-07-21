// Take the song list information from the album and dynamically create song rows
var createSongRow = function(songNumber, songName, songLength) {
    var template =
         '<tr class="album-view-song-item">'
        +'  <td class="song-item-number" data-song-number="' + songNumber +'">' + songNumber + '</td>'
        +'  <td class="song-item-title">' + songName + '</td>'
        +'  <td class="song-item-duration">' + songLength + '</td>'
        +'</tr>'
    ;
    
    // add jquery wrapper on template
    var $row = $(template);
    
    var clickHandler = function () {
    
        var songNumber = parseInt($(this).attr('data-song-number'));
        
        // If currentlyPlayingSongNumber !== null this means that a song is actually playing
        // so we want to turn that pause button into the song number again (everytime)

        if (currentlyPlayingSongNumber !== null) {
            /* revert to song number for currently playing song because user 
             started playing new song*/
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
                      

        }
        // if the song clicked is not the currently playing song, change the button
        // to pause, set the current song and album information, and set the playbar
        // information
        if (currentlyPlayingSongNumber !== songNumber) {
            // switch from play to pause button to indicate new song is playing
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            updatePlayerBarSong();
            // code to play song
            currentSoundFile.play();

        } else if (currentlyPlayingSongNumber === songNumber) {
            // switch from pause to play button to when pausing currently playing song
            // conditional statement
            // if song is paused
            if (currentSoundFile.isPaused()) {
                // start playing the song again
                currentSoundFile.play();
                // revert the icon in the song cell to pause
                $(this).html(pauseButtonTemplate);
                // change the control in the player bar to pause
                $('.main-controls .play-pause').html(playerBarPauseButton);
            // if song is not paused
            } else {
                // pause the song
                currentSoundFile.pause();
                // set content of the song number cell and play bar to play button
                $(this).html(playButtonTemplate);
                // change the control in the player bar to pause
                $('.main-controls .play-pause').html(playerBarPlayButton);
                
            }
    
        }
        
    };
    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
        }
    };
    
    
    // find the element with the .song-item-number class within the row that is clicked
    // and add the jquery event listener and handler
    $row.find('.song-item-number').click(clickHandler);
    
    // add the jquery mouseover and mouseleave equivaliant listener
    $row.hover(onHover, offHover);
    
    // return the $row with the event listeners attached
    return $row;
};


var setSong = function(songNumber) {
    /* sets the currentlyPlayingSongNumber, currentSongFromAlbum, and currentSoundFile*/
    
    
    if (currentSoundFile) {                         // Checks if a sound is playing
        currentSoundFile.stop();
    }
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    // create a new Buzz sound object from a file or url and set the currentSountFile variable
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
    
    setVolume(currentVolume);
};

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

var getSongNumberCell = function(number) {
    var songNumberCell = $('.song-item-number[data-song-number="' + number + '"]')
    return songNumberCell;
}

var nextSong = function() {
    // know the previous song to currently playing song

    // use trackIndex function to find the index of the current song and increment
    // the index + 1
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex = currentSongIndex + 1;


    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }

    // capture the currently playing song number to record as the previously
    // played song
    var lastSongNumber = currentlyPlayingSongNumber;

    // set a new current song with song name as string and song number as number
    // calculated from the index number
    setSong(currentSongIndex + 1);
    currentSoundFile.play();

    // update playerbar
    updatePlayerBarSong();

    // get the previous song cell and update .song-item-number to its song number
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    $lastSongNumberCell.html(lastSongNumber);

    // get the current song cell and update .song-item-number to pause template
    var $currentSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    $currentSongNumberCell.html(pauseButtonTemplate);



}
    
var previousSong = function() {

    // use trackIndex function to find the index of the current song and increment
    // the index - 1
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex = currentSongIndex - 1;


    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // capture the currently playing song number to record as the previously
    // played song
    var lastSongNumber = currentlyPlayingSongNumber;

    // set a new current song with song name as string and song number as number
    // calculated from the index number
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    

    // update playerbar
    updatePlayerBarSong();

    // get the previous song cell and update .song-item-number to its song number
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    $lastSongNumberCell.html(lastSongNumber);

    // get the current song cell and update .song-item-number to pause template
    var $currentSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber)
    $currentSongNumberCell.html(pauseButtonTemplate);



}
// Returns a template of the passed album argument
// Calls createSongRow on each created row
var setCurrentAlbum = function(album) {
    currentAlbum = album;
    // Select all the HTML elements required to display on the album page
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    // Set the nodeValue of the each element's first child to insert from the
    // album objects
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    // Clear the album-view-song-list element of any HTML for clean slate
    $albumSongList.empty();
    
    // This loop creates a song table for each of the album's songs
    // and appends the albumSongList table with new rows
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

// returns the index number of album.songs[] for given song and album
var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
}

var updatePlayerBarSong = function () {
    //select h2 for artistName and write .text with artistname
    $('.player-bar .currently-playing .artist-name').text(currentSongFromAlbum.title);
    //select h2 for songName and write .text() with songName
    $('.player-bar .currently-playing .song-name').text(currentAlbum.artist);
    //select h2 for mobile artist song and concatenate artist + song name
    var mobileString = currentSongFromAlbum.title + " - " + currentAlbum.artist;
    $('.player-bar .currently-playing .artist-song-mobile').text(mobileString);
    
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store and keep track of current playing song information
// Album name for the currently playing song
var currentAlbum = null;
// Number of the currently playing song
var currentlyPlayingSongNumber = parseInt(null);
// Name of the currently playing song object
var currentSongFromAlbum = null;
// Global variable for Buzz API
var currentSoundFile = null;
// Globaly variable to hold sound level
var currentVolume = 80;

// selectors for playerbar previous and next buttons
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function () {
    setCurrentAlbum(albumPicasso);
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
});