var infoUserOne; //array[] of the first 5 genres for every artist
var callsFinished=0;
var validSongs=0;



//require userSongs
//returns nothing but will call calculateTopGenre() when it's finished (if the first AJAX call to Parse is not an error).
function getEchoNestIDs(userSongs) {
	console.log("Looking for echonest");
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
    				validSongs++;
    			}else if(userSong.app=="Deezer"){
    				app="deezer";
    				validSongs++;
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
						console.log(data.response);
    					//add the artist's genres to the global genre array
 						getAudioSummary(data.response.track.song_id);
 						
 						//j gets incremented only when the ajax calls are finished
 						

					},
					error: function(jqXHR, textStatus, errorThrown){
						alert('login error: ' + textStatus);
					}
				});
			}
			
  		
	}



function getAudioSummary(id){


var url="http://developer.echonest.com/api/v4/song/profile?api_key=FILDTEOIK2HBORODV&format=jsonp&id="+id+"&bucket=audio_summary";
				url=encodeURI(url);
				
				$.ajax({
					url: url,
					dataType: "jsonp",
					success: function(data, textStatus, jqXHR){
    					//add the artist's genres to the global genre array
 						storeAudioSummary(data);
 						
 						//j gets incremented only when the ajax calls are finished
 						callsFinished++;
 						
 						//when the artists are finished calculate the top genre above all
 						if (callsFinished==(validSongs)) {
    						calculateAverageOfTypes();
    					}

					},
					error: function(jqXHR, textStatus, errorThrown){
						alert('login error: ' + textStatus);
					}
				});
}

function storeAudioSummary(data){
	console.log("AUDIO_SUMMARY");
    console.log(data);
}

