var buildCollectionItemTemplate = function() {
    // #1
    var template = 
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
    
    // #2
    return $(template);
};

$(window).load(function() {
    // Select the first element with an album-covers class name
    var $collectionContainer = $('.album-covers');
    
    $collectionContainer.empty();
    
    // Create a loop that inserts 12 albums using += operator
    for (var i = 0; i < 12; i++) {
        var $newThumbnail = buildCollectionItemTemplate();
        $collectionContainer.append($newThumbnail);
    }
});