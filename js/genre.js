var genresMe; //array[] of the first 5 genres for every artist
var genresFriend;


//require venueID
//returns nothing but will call calculateTopGenre() when it's finished (if the first AJAX call to Parse is not an error).
function getArtistsGenre(idArtist, userId) {

    			//console.log(userId);
    			//get the artist's genres
    			var url="http://developer.echonest.com/api/v4/artist/terms?api_key=MXG5OCMN63QJ1C5OM&id="+idArtist+"&format=jsonp";
				url=encodeURI(url);

				$.ajax({
					url: url,
					dataType: "jsonp",
					success: function(data, textStatus, jqXHR){
    					//add the artist's genres to the global genre array
 						fillGenresArray(data, userId);
 						
 						//j gets incremented only when the ajax calls are finished
                        genreFinished++;
 						
 						//when the artists are finished calculate the top genre above all
 						if (genreFinished==(validSongs)) {
                             console.log("calculate Top Genre for"+userId);
    						calculateTopGenre(userId);
    					}

					},
					error: function(jqXHR, textStatus, errorThrown){
						alert('login error: ' + textStatus);
					}
				});
					

}


function fillGenresArray(data, userId) {
	
	//console.log(userId);
	
	var terms=data.response.terms;
	//console.log("terms length: "+terms.length);
	
	var i=0;
	while (i<5 && i<terms.length) {
        if(userId=meId){
		genresMe.push(terms[i].name);
        }else{
            genresFriend.push(terms[i].name);
        }
		i++;
	}
	
}


function calculateTopGenre(userId) {
    var idUser=userId;
    //console.log("Calculating:"+idUser);
	var availableGenres = new Array();
	
	availableGenres["pop"]=0;
	availableGenres["rock"]=0;
	availableGenres["punk"]=0;
	availableGenres["rap"]=0;
	availableGenres["country"]=0;
	availableGenres["techno"]=0;
	availableGenres["jazz"]=0;
	availableGenres["dance"]=0;
	
	//count which genre has more occurrences

	String.prototype.contains = function(it) { return this.indexOf(it) != -1; }; //hacky.
	var i=0;
    var genres=null
var resultsTab=null;
    if(idUser==meId){
        resultsTab=$("#style");
        genres=genresMe;
    }else{
        resultsTab=$("#styleFriend");
        genres=genresFriend;
    }
	//for all the genres in the big array
	while (i<genres.length) {
			
		if (genres[i].contains("pop"))
			availableGenres["pop"]++;
		if (genres[i].contains("rock"))
			availableGenres["rock"]++;
		if (genres[i].contains("punk"))
			availableGenres["punk"]++;
		if (genres[i].contains("rap"))
			availableGenres["rap"]++;
		if (genres[i].contains("country"))
			availableGenres["country"]++;
		if (genres[i].contains("techno"))
			availableGenres["techno"]++;
		if (genres[i].contains("dance"))
			availableGenres["dance"]++;
		if (genres[i].contains("dance"))
			availableGenres["dance"]++;
		if (genres[i].contains("jazz"))
			availableGenres["jazz"]++;

		i++;	
	}
	
	//find the maximum in the array
	var i=0;
	var maxkey="pop";
	var maxnumber=availableGenres["pop"];
	
	for (i in availableGenres) {
		if (availableGenres[i] > maxnumber) {
			maxnumber = availableGenres[i];
			maxkey = i;
		}
			
	}
	var genre = maxkey;
resultsTab.empty();
    resultsTab.append("<h4>Your style is: "+genre+"</h4>")
	console.log("and the most popular genre for " + idUser + " is:" + genre);
		
	//put it into VenuesGenre table (venueID, genre, time)
	//var time = new Date().getTime();
	

}


