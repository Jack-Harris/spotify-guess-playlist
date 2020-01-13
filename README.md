# Spotify - Guess the Playlist
## Purpose

The game plays a random song amongst all of the submitted playlists. The users guess amongst themselves which playlist the song comes from. To see the answer, they click the album cover and it shows the origin playlist.

This is intended as a party game using the yearly playlist Spotify makes for all its users.

## How to use

1. Create file called `creds.js` in `./Server`.
2. Define the following variables in the file:

| Variable   | Type   | Contents              |
|------------|--------|-----------------------|
| `__CID`    | String | Spotify Client ID     |
| `__CS`     | String | Spotify Client Secret |
| `__RURL`   | String | Spotify Redirect URL  |
| `__ATOKEN` | String | Spotify Access Token  |
| `__RTOKEN` | String | Spotify Refresh Token |

