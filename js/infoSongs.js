var infoUserOne; //array[] of the first 5 genres for every artist
var callsFinished=0;
var validSongs=0;
var summaryUserSelected = [];
var summaryMe=[];
var genreFinished=0;
var songsMe=[];
var songsFriend=[];



//require userSongs
//returns nothing but will call calculateTopGenre() when it's finished (if the first AJAX call to Parse is not an error).
function getEchoNestIDs(userSongs, idUser) {
    genreFinished=0;
    if(idUser==meId){
        summaryMe[0]=0;
        summaryMe[1]=0;
        summaryMe[2]=0;
        summaryMe[3]=0;
        genresMe=new Array();
    }else{
        summaryUserSelected[0]=0;
        summaryUserSelected[1]=0;
        summaryUserSelected[2]=0;
        summaryUserSelected[3]=0;
        genresFriend=new Array();
    }
	//console.log("Looking for echonest");
	validSongs=0;
	callsFinished=0;

	//{id:"id",
	//app: "Spotify/Deezer"	}
	var numberOfValidSongs=0;
	var i=0;
			for (i;i<userSongs.length&&i<50;i++){
				userSong=userSongs[i];
				var app="";
    			if(userSong.app=="Spotify"){
    				app="spotify-WW";

    			}else if(userSong.app=="Deezer"){
    				app="deezer";

    			}else{
    				continue;
    			}
    			//get the echonestID
    			var url="http://developer.echonest.com/api/v4/track/profile?api_key=FILDTEOIK2HBORODV&id="+app+":track:"+userSong.id+"&bucket=audio_summary&format=jsonp";
				url=encodeURI(url);
				
				$.ajax({
					url: url,
					dataType: "jsonp",
					success: function(data, textStatus, jqXHR){
						//console.log(data.response);
    					//add the artist's genres to the global genre array
 						getAudioSummary(data.response.track.song_id, idUser);
                        validSongs++;
 						//j gets incremented only when the ajax calls are finished
 						

					},
					error: function(jqXHR, textStatus, errorThrown){
						alert('login error: ' + textStatus);
					}
				});
			}
			
  		
	}



function getAudioSummary(id, idUser){


var url="http://developer.echonest.com/api/v4/song/profile?api_key=FILDTEOIK2HBORODV&format=jsonp&id="+id+"&bucket=audio_summary";
				url=encodeURI(url);
				
				$.ajax({
					url: url,
					dataType: "jsonp",
					success: function(data, textStatus, jqXHR){
    					//add the artist's genres to the global genre array
 						storeAudioSummary(data, idUser);
 						
 						//j gets incremented only when the ajax calls are finished
 						callsFinished++;
 						
 						//when the artists are finished calculate the top genre above all
 						if (callsFinished==(validSongs)) {
    						calculateAverageOfTypes(idUser);
    					}

					},
					error: function(jqXHR, textStatus, errorThrown){
						alert('login error: ' + textStatus);
					}
				});
}

function storeAudioSummary(data, idUser){
	if(idUser==meId){
        //console.log(data);
        if(typeof(data.response.songs[0].audio_summary)!="undefined"){

            summaryMe[0]=summaryMe[0]+data.response.songs[0].audio_summary.danceability;
            summaryMe[1]+=data.response.songs[0].audio_summary.energy;
            summaryMe[2]+=data.response.songs[0].audio_summary.tempo;
            summaryMe[3]+=1;
            getArtistsGenre(data.response.songs[0].artist_id, meId);
            songsMe.push(""+data.response.songs[0].artist_name+" "+data.response.songs[0].title);
        }
    }else{
        if(typeof(data.response.songs[0].audio_summary)!="undefined"){
            summaryUserSelected[0]+=data.response.songs[0].audio_summary.danceability;
            summaryUserSelected[1]+=data.response.songs[0].audio_summary.energy;
            summaryUserSelected[2]+=data.response.songs[0].audio_summary.tempo;
            summaryUserSelected[3]+=1;
            songsFriend.push(""+data.response.songs[0].artist_name+" "+data.response.songs[0].title);
            getArtistsGenre(data.response.songs[0].artist_id, userIdSelected);
        }
    }
}

function calculateAverageOfTypes(idUser){
    if(idUser==meId){

        //console.log("printing results");
        $("#resultsMeData").append("<ul>");
        danceability=summaryMe[0]/summaryMe[3];
        $("#resultsMeData").append("<li>Danceability: "+danceability+"</li>");

        energy=summaryMe[1]/summaryMe[3];
        $("#resultsMeData").append("<li>Energy: "+energy+"</li>");

        tempo=summaryMe[2]/summaryMe[3];
        $("#resultsMeData").append("<li>Tempo: "+tempo+"</li>");
        $("#resultsMeData").append("</ul>");

    }else{
        $("#resultsFriendData").append("<ul>");
        danceability=summaryUserSelected[0]/summaryUserSelected[3];
        $("#resultsFriendData").append("<li>Danceability: "+danceability+"</li>");
        energy=summaryUserSelected[1]/summaryUserSelected[3];
        $("#resultsFriendData").append("<li>Energy: "+energy+"</li>");
        tempo=summaryUserSelected[2]/summaryUserSelected[3];
        $("#resultsFriendData").append("<li>Tempo: "+tempo+"</li>");
        $("#resultsFriendData").append("</ul>");
        $("#buttonCreateDiv").show();
    }
}

