
var http = require('http');
var request = require('request');
var port = 12347;
var SpotifyWebApi = require('spotify-web-api-node');

var url = "https://api.spotify.com/v1/me/player/play";

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: 'c20021594ee044fcbebb5c0932021fba',
  clientSecret: 'c90aabb00c02480b981de95ebdfd2079',
  redirectUri: 'http://localhost:8888/callback'
});


http.createServer(handler).listen(port, function(err) {
    if(err) {
        console.log("Could not start server.");
        console.log(err);
    }  else {
        console.log("Listening on port " + port);
    }
});

function handler(req, res) {
    var options = {
        url: "api.spotify.com/v1/me/player/play",
        headers: {
            "Authorization": "Bearer " + req.headers['auth-token']
        }
    }


    spotifyApi.setAccessToken("BQA3hTq84N8m-7RknaKamqmD2nLuH4OS-P_jWQiIQ2m2vXi4YShFnJiS-4a8_aAOBh9XirTo5ZbR1bmBQ2EeejTFIqK_XnvRB3uKxSUFa-lhJMmheFLOok_ik5sbR2MIwLUq9OyXxidgqJ7FRnDDo7zEaYPlnH3SnQT3NF5GU3sYBELZxKuc8Q");
    spotifyApi.setRefreshToken("AQAaVhULyAVO4exI3dkk-_FCY0TWIl63-ofDtZePZ_qd424rOKEsUifaBYRrcmIzIMjPTdVO1OTsm4QvVujgvPGouWxFYDtBMdgtqyXc8bFVBFNLKD1GSd6RZy5_ZDW_Q8k");


    spotifyApi.refreshAccessToken().then(data => {
        console.log("New access token generated successfully...\n");
        console.log(data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);

        options.headers["Authorization"] = "Bearer " + data.body['access_token'];

        console.log("---\n" + options.headers.Authorization + " \n---");
    }).then(e => {

        request.put(url, options, function(err, resp, body) {

            if(err) {
                return;
            }

            resp.body = data.body['access_token'] + resp.body;
            
            console.log(resp.body);

            resp.write(resp.body, () => res.end());

        });

});
    
}















    
//     (req, res) => {

    
//         const options = {
//             hostname: 'api.spotify.com',
//             port: 443,
//             path: '/v1/me/player/play',
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Content-Length': data.length,
//                 'access_token': data.body['access_token']
//             }
//         }

//         const req = https.request(options, (res) => {
//         console.log(`statusCode: ${res.statusCode}`)

//         res.on('data', (d) => {
//                 process.stdout.write(d)
//             })
//         })

//         req.on('error', (error) => {
//             console.error(error)
//         })

//         req.write(data)
//         req.end()
        

//     });



    

// }).listen(port);

// console.log("Listing on port " + port);