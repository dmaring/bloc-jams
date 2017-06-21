var collectionItemTemplate =
    '<div class="collection-album-container column fourth">'
    +'   <img src="assets/images/album_covers/01.png"/>'
    +'   <div class="collection-album-info caption">'
    +'       <p>'
    +'          <a class="album-name" href="album.html"> The Colors </a>'
    +'          <br/>'
    +'          <a href="album.html"> Pablo Picasso </a>'
    +'          <br/>'
    +'          X songs'
    +'          <br/>'
    +'      </p>'
    +'   </div>'
    +'</div>'
    ;

window.onload = function () {
    // Select the first element with an album-covers class name
    var collectionContainer = document.getElementsByClassName('album-covers')[0];
    
    // Assign an empty string to collectionContainer 's innerHTML property to clear
    // its content.  This ensures we are working with a clean slate before we
    // insert content with JavaScript
    collectionContainer.innerHTML = '';
    
    // Create a loop that inserts 12 albums using += operator
    for (var i = 0; i < 12; i++) {
        collectionContainer.innerHTML += collectionItemTemplate;
    }
}