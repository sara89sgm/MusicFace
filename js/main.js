var userIdSelected;
var nameSelected;
var meId;
var songsMe=[];
var songsFriend=[];
window.fbAsyncInit = function () {
    // init the FB JS SDK
    FB.init({
        appId:'138288166319808', // App ID from the App Dashboard
        channelUrl:'http://local.com/~saragozalo/MusicFace/channelFB.html', // Channel File for x-domain communication
        status:true, // check the login status upon init?
        cookie:true, // set sessions cookies to allow your server to access the session?
        xfbml:true  // parse XFBML tags on this page?
    });

    DZ.init({
        appId  : '108761',
        channelUrl : 'http://local.com/~saragozalo/MusicFace/channel.html',

    });

    DZ.ready(function(){
        DZ.canvas.setSize(3000);
    });

$("#buttonCreateDiv").hide();

    var makeItems = function (fbresponse) {
        return $.map(fbresponse, function (item) {

            return {

                label:item.name,
                value:item.id,
                picture:item.picture
            }
        });
    };

    var setAutoComplete = function (parsed_items) {

        $("#selector").autocomplete({
            source:parsed_items,
            select:function (event, ui) {
                $("#selector").val(ui.item.label);
                userIdSelected=ui.item.value;
                $("#buttonSelect").text("Compare!");
                //$("#selectorID").val(ui.item.value);
                nameSelected=ui.item.label;
                FB.api('/' + ui.item.value + '?fields=picture.type(large)', function (fbresponse) {

                    setPicture(fbresponse);

                });
                return false;
            }
        }).data("autocomplete")._renderItem = function (ul, item) {
            return $("<li>")
                .data("item.autocomplete", item)
                .append("<a>" + item.label + "</a>")
                .appendTo(ul);
        };
    };
    // Additional initialization code such as adding Event Listeners goes here
    FB.Event.subscribe('auth.statusChange', function (response) {
        switch (response.status) {
            case 'unknown':
            // Fall through
            case 'not_authorized':
                console.debug('Must login!');
                break;
            case 'connected':
                var uid = response.authResponse.userID;
                var signedRequest = response.authResponse.signedRequest;
                console.debug('woop! Welcome user #' + uid);

                FB.api('me?fields=id,name,picture.type(large)', function (r) {
                    $("#imgMe").attr("src", r.picture.data.url);
                    $("#meName").append("<h3>"+ r.name+"</h3>");
                    meId= r.id;
                });
                FB.api('/me/friends', function (fbresponse) {
                    setAutoComplete(makeItems(fbresponse.data));
                });
                getUserMusicProfile();

                break;
            default:
                console.log("Unexpected response from Facebook auth: `" + response.status + "` not recognised!")
        }


    });

};

function setPicture(data) {

    $("#imgSelected").attr("src", data.picture.data.url);
}

function lookProfile() {


    var idUser = userIdSelected;
    //console.log(idUser);
    FB.api('/' + idUser + '/music.listens', function (fbresponse) {

        getComparison(fbresponse.data,idUser);
    });

}

function getUserMusicProfile(){
    FB.api('/me/music.listens', function (fbresponse) {

        getComparison(fbresponse.data, meId);

    });
}

function getComparison(data, id) {
    var songsUser = [];
    var i = 0;
    for (i; i < data.length; i++) {
        var song = data[i];
        url = song.data.song.url;
        urlParam = url.split("/");
        idSong = urlParam[urlParam.length - 1];
        //console.log(song);
        songSend = {app:song.application.name,
            id:idSong};
        songsUser.push(songSend);
    }
    //console.log("COMPARISON");
    //console.log(songsUser);
    getEchoNestIDs(songsUser,id);
}

// Load the SDK's source Asynchronously
(function (d, debug) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
    ref.parentNode.insertBefore(js, ref);
}(document, /*debug*/ true));