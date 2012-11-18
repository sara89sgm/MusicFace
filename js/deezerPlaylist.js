var idSongs=[];
var songsProcessed=0;
function getIds(songs){
    var numberOfValidSongs=0;
    var i=0;
    for(i;i<songs.length;i++){
    DZ.api("search", {q : songs[i] }, function(response){
        processSongs(response);
    });
        //get the echonestID

}

}

function processSongs(data){
    //console.log(data.data);
    if(data.data.length>0){
    idSongs.push(data.data[0].id);
    }
    songsProcessed++;
    if(songsProcessed==(songsMe.length+songsFriend.length)){
        console.log("creatingPlaylist");
        createPlaylist();
    }
}
function showPlaylist(){
    getIds(songsFriend);
    getIds(songsMe);

}

function createPlaylist(){
    var title="MIX"+nameSelected;
    DZ.api('user/me/playlists', 'POST', {title : title}, function(response){
        //console.log(response);
        includeSongs(response.id);
    });
}

function includeSongs(id){
    var j=1;
    var songList=""+idSongs[0];
    for(j;j<idSongs.length;j++){
        songList=songList+","+idSongs[j];
    }
    DZ.api('playlist/'+id+'/tracks', 'POST', {songs: songList}, function(response){
        console.log(response);
        DZ.player.playPlaylist(id);

        alert("PLAYLIST CREATED!! and playing! (ID: "+id+")");
    });
}