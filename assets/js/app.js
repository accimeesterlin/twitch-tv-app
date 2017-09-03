// Twitch TV App
var users = [
    "ESL_SC2", 
    "OgamingSC2", 
    "cretetion", 
    "freecodecamp", 
    "storbeck", 
    "habathcx", 
    "RobotCaleb", 
    "noobs2ninjas",
    "accimeesterlin"
];
var userEndPoint = 'https://wind-bow.glitch.me/twitch-api/users/',
    userParams = 'accimeesterlin';

var channelEndPoint = 'https://wind-bow.glitch.me/twitch-api/channels/',
    channelParams = 'accimeesterlin';

// Data about users currently streaming
var streamEndpoint = 'https://wind-bow.glitch.me/twitch-api/streams/',
    streamParams = 'OgamingSC2';

var getData = function (endpoint, params, callback) {
    // Get data from api
    $.ajax({
        url: endpoint + params,
        method:'GET'
    })
    .then(function (data) {
        callback(data);
    })
    .catch(function (err) {
        console.log(err);
    });
};

// Users data
for(var i = 0; i < users.length; i++){
    getData(userEndPoint, users[i], function (user) {
        var usersContainer = $("<div>");
            usersContainer.attr({
                "class":"users offline " + user.display_name,
                "id": user._id
            });

        var title = $("<h2>");
            title.html(user.display_name);

        var img = $("<img>");
            img.attr({
                "src":user.logo
            });

        usersContainer.append(title, img);
        $(".container--users").append(usersContainer);

    });
}


for(var i = 0; i < users.length; i++){

    getData(streamEndpoint, users[i], function (streamer) {
            
        if(streamer.stream !== null){
            
            var status = $("<p>");
                status.html("Online");

            var url = $("<a>");
                url.attr({
                    "href": streamer.stream.channel.url,
                    "target":"_blank"
                });
                url.html(streamer.stream.channel.url);  

            var followers = $("<p>");  
                followers.html("Followers: " + streamer.stream.channel.followers); 

            var game = $("<p>");
                game.html("Game: " + streamer.stream.game); 

            var viewers = $("<p>");
                viewers.html("Viewers: " + streamer.stream.viewers);         

            $("#" + streamer.stream.channel._id).removeClass("offline");

            $('#' + streamer.stream.channel._id).append(url, status, followers, game, viewers);
            $('#' + streamer.stream.channel._id).addClass("online");
            
        } 

        else{
            
            $(".container--offline").remove();

            var status = $("<div>");
                status.addClass("container--offline");

            var offline = $("<p>");
                offline.html("Offline");

            status.append(offline);    
            $(".offline").append(status)            
        }  
    });
}


$("#all").on('click', function () {
    $(".offline, .online").css('display', 'block');
});

$("#online").on('click', function () {
    $(".online").css('display', 'block');
    $(".offline").css('display', 'none');
});

$("#offline").on('click', function () {
    $(".online").css('display', 'none');
    $(".offline").css('display', 'block'); 
});














































































