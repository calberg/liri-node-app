var moment = require('moment');
moment().format();
var axios = require("axios");
var fs = require("fs");


require("dotenv").config();
var keys = require("./keys.js");
var spotify = new spotify(keys.spotify);

if (process.argv[2]  == 'concert-this') {
    concertThis();
}
if (process.argv[2] == 'spotify-this-song') {
    spotifyThisSong();
}
if (process.argv[2] == 'movie-this') {
    movieThis();
}
if (process.argv[2] == 'do-what-it-says') {
    doWhatItSays();
}

function concertThis(artists) {
    if (!artists) {
        var artist = process.argv.slice(3);
        var artists = artist.join("+");
    }
    var URL = ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");
    axios.get(URL).then(function(response) {
            var data = response.data[0];
            var showData = [
                "Venue Name: " + data.venue.name,
                "Venue Location: " + data.venue.city,
                "Date of Event: " + data.datetime,
            ].join("\n\n");
            console.log(showData);
        })
    };

function spotifyThisSong(song) {
    if (!song){
        song = "The Sign Ace of Base"
    }
    spotify.search({ type: 'track', query: song}, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var data = data.response[0];
        var songData = [
            "Artists: " + data.tracks.items[0].artists[0].name,
            "Song Name: " + data.tracks.items[0].name,
            "Preview: " + data.tracks.href,
            "Album: " + data.tracks.items[0].album.name,
        ].join("\n\n");
        console.log(songData);
    });
}

function movieThis() {
    if (!movie){
        var movieArr = process.argv.slice(3);
        var movie = movieArr.join("+");
      }
        if (!movie) {
          movie = "Mr.Nobody"
        }
        var URL = "http://www.omdbapi.com/?t="+ movie + "&y=&plot=short&apikey=trilogy"
        axios.get(URL).then(
        function(response) {
          var movie = response.data
          var movieData = [
            "Title: " + movie.Title,
            "Year the movie came out:" + movie.Year,
            "IMBD rating: " + movie.imdbRating,
            "Rotten Tomatoes Rating " + movie.Ratings[1],
            "Country: " + movie.Country,
            "Language: " + movie.Language,
            "Plot: " + movie.Plot,
            "Actors: " + movie.Actors,
          ].join("\n\n");
          console.log(movieData);
        }
      );
}
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error){
          return console.log("Error: "+error);
        }
        console.log("data: "+ data);
        var dataArr = data.split(',');
        
        console.log(dataArr);
        if (dataArr[0]==="concert-this"){
          concertThis(artistS);
        }
        if (dataArr[0]==="spotify-this-song"){
          var song = dataArr[1];
          spotifyThis(song);
        }
        if (dataArr[0]==="movie-this"){
          movieThis(movie);
        }
      })
}