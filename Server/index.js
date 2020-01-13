import 'creds.js';

var http = require('http');
var port = 12346;
var SpotifyWebApi = require('spotify-web-api-node');


// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: __CID,
    clientSecret: __CS,
    redirectUri: __RURL
});


http.createServer((request, response) => {

    var playlistIDs = [
        ["37i9dQZF1Etfmg5zzsDucM", "Jack", false],
        ["37i9dQZF1EtrPbanOImOh4", "Snerin", false]
    ]

    var playlistTracks = [];

    spotifyApi.setAccessToken(__ATOKEN);
    spotifyApi.setRefreshToken(__RTOKEN);


    spotifyApi.refreshAccessToken().then(data => {
        console.log("New access token generated successfully...\n");
        console.log(data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
    }).then(e => {


        for(let i = 0; i < playlistIDs.length; i++) {

            console.log(playlistIDs[i][0]);
    
            spotifyApi.getPlaylistTracks(playlistIDs[i][0]).then(data => {
    
                var allDataRetrieved = true;
    
                response.setHeader('Access-Control-Allow-Origin', request.headers.origin);
        
                tracks = [playlistIDs[i][0], playlistIDs[i][1]];
               // console.log(data.body.items);
                for(let i = 0; i < data.body.items.length; i++) {
                    tracks.push([data.body.items[i].track.name, data.body.items[i].track.artists, data.body.items[i].track.album.images, data.body.items[i].track.id]);
                }
                
                playlistTracks.push(tracks);
        
                playlistIDs[i][2] = true;
    
                console.log(playlistIDs[i][0] + " done");
    
                for(let o = 0; o < playlistIDs.length; o++) {
                    if(!playlistIDs[o][2]) allDataRetrieved = false;
                }
    
                if(allDataRetrieved) {
                    playlistTracks = JSON.stringify(playlistTracks);
                    response.write(playlistTracks, () =>  response.end() );
                }
         
            }).catch(e => {
                console.log(e);
            });
    
        }
    
        
    
        

    });



    

}).listen(port);

console.log("Listing on port " + port);