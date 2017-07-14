var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14'},
        { title: 'Red', duration: '5:01'},
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
};

var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14'},
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

// Take the song list information from the album and dynamically create song rows
var createSongRow = function(songNumber, songName, songLength) {
    var template =
         '<tr class="album-view-song-item">'
        +'  <td class="song-item-number" data-song-number="' + songNumber +'">' + songNumber + '</td>'
        +'  <td class="song-item-title">' + songName + '</td>'
        +'  <td class="song-item-duration">' + songLength + '</td>'
        +'</tr>'
    ;
    
    return $(template);
};

// Returns a template of the passed album argument
var setCurrentAlbum = function(album) {
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
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

var findParentByClassName = function(element, targetClass) {
    // check the dom tree for the parent of the element with the given class name
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className ==! targetClass && curentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
    
};

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};

var clickHandler = function(targetElement) {
    
    var songItem = getSongItem(targetElement);
    var songItemNumber =  songItem.getAttribute('data-song-number')

    // if there is no song playing change to the pause button
    if (currentlyPlayingSong === null) {
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItemNumber;
        console.log(currentlyPlayingSong);
    // if the button clicked belongs to the playing song change the button to the play button
    } else if (currentlyPlayingSong === songItemNumber) {
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
        console.log(currentlyPlayingSong);
    // if the button belongs to a song that is not currently being played change the
    // currently playing song button back to the song number and the new song to pause
    } else if (currentlyPlayingSong !== songItemNumber) {
        var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItemNumber;
        console.log(currentlyPlayingSong);
    }
};

// Elements that will have listeners
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store current playing song
var currentlyPlayingSong = null;

window.onload = function() {
    setCurrentAlbum(albumPicasso);
    
songListContainer.addEventListener('mouseover', function(event) {
    if (event.target.parentElement.className === 'album-view-song-item') {
        // event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
        var songItem = getSongItem(event.target);

        if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
            songItem.innerHTML = playButtonTemplate;
        }
}
});
    
    for (var i = 0; i < songRows.length; i++) {
        songRows[i].addEventListener('mouseleave', function(event) {
        
            var songItem = getSongItem(event.target);
            var songItemNumber = songItem.getAttribute('data-song-number');

            console.log("songItemNumber: ", songItemNumber);
            console.log("currentlyPlayingSong:", currentlyPlayingSong);
            if (songItemNumber !== currentlyPlayingSong) {
                songItem.innerHTML = songItemNumber;
            }
            
        });
        
        songRows[i].addEventListener('click', function(event) {
            clickHandler(event.target);
        })
        
    }
    
};