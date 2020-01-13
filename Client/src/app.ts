import $ from 'jquery';
import 'bootstrap';
import {APICall} from 'apicall';

import {HttpClient} from 'aurelia-http-client';

export class App {

  /** Information about current song. */ 
  public curSong = {
    song: "loading...",
    artist: "loading...",
    image: "loading...",
    playlist: "loading...",
    uri: "loading..."
  };

  /** Name of correct playlist once shown to user
   * By default - empty (Should not be shown before clicked.)
   */
  public answerText:string = "";

  /** List of playlist objects. */
  public playlists:Object[];

  /** APICall object to get information from Spotify */
  public call:APICall;
  /** API call response data. */
  public response;

  /** List of all songs which have been played.
   * In format: [[playlistID (int), songID (int)] ...]
   */
  private previousSongs:number[][] = [];
  
  /** Index in previousSongs array of curently playing song. */
  private curPlayingSong = -1;


  private client = new HttpClient();

  // --------------------- //

  constructor() {
    this.makeAPICall();
  }

  /** Make API call to Spotify to recieve information.
   * Then call getPlaylists() to show response on screen
   */
  public makeAPICall() {
    new Promise((res, rej) => {
      this.call = new APICall(res, rej);
    }).then(e => {
      this.response = this.call.response;
      this.getPlaylists(this.call.response, true);
    });
  }

  /** Process the response from Spotify and take the relevant 
   * song information to show on screen.
   * @param response - Spotify response.
   * @param next - true = go to next song, false = go to previous
   */
  public getPlaylists(response, next:boolean) {
    var randPlaylist:number,
        randSong:number;

    this.playlists = response;

    // If - go to next song.
    if(next) {
      
      // If new song needed - generate random song.
      if(this.curPlayingSong >= this.previousSongs.length - 1) {
        randPlaylist = Math.floor(((Math.random() * (this.playlists.length - 1))) );
        randSong = Math.floor(((Math.random() * this.playlists[randPlaylist]['length']) + 2) );
        this.previousSongs.push([randPlaylist, randSong]);
        this.curPlayingSong = this.previousSongs.length - 1;
      } else {
        // New song not needed.
        // TODO: rename randPlaylist and randSong because not always random.
        this.curPlayingSong++;
        randPlaylist = this.previousSongs[this.curPlayingSong][0];
        randSong = this.previousSongs[this.curPlayingSong][1];
      }
      
    // Else go to previous song.
    } else {
      // If there is a possible previous song to go to.
      if(this.curPlayingSong > 0) {
        this.curPlayingSong--;
        randPlaylist = this.previousSongs[this.curPlayingSong][0];
        randSong = this.previousSongs[this.curPlayingSong][1];
      
      } else {
        // Nothing should happen if no previous song possible.
        return;
      }
    }

    // Show current song on screen.
    this.curSong.image = this.playlists[randPlaylist][randSong][2][0].url;
    this.curSong.song = this.playlists[randPlaylist][randSong][0];
    this.curSong.artist = this.playlists[randPlaylist][randSong][1][0].name;
    this.curSong.playlist = this.playlists[randPlaylist][1];
    this.curSong.uri = this.playlists[randPlaylist][randSong][3];

    console.log(this.curSong.uri);
    this.playSong(this.curSong.uri);

    // Clear answer off screen.
    this.answerText = "";
  }

  /** Once user clicks on song, show the answer to them. */
  public showPlaylist() {
    this.answerText = this.curSong.playlist;
  }

  /** Skip to next song. */
  public nextSong() {
    this.getPlaylists(this.response, true);
  }

  /** Go back a song */
  public lastSong() {
    // If there have been previous songs.
    // TODO: this.response is global and taken as params. Remove one.
    if(this.previousSongs.length > 0) {
      this.getPlaylists(this.response, false);
    }
  }

  /** Pause the song in progress. */
  public pauseSong() {
    // TODO: to implement
  }

  public playSong(uri:string) {
    let songJSON = '{ "uris" : ["spotify:track:' + uri + '"] }';

    if(uri) {
      
      new Promise((res, rej) => {
        
        
        let json = {
          "uris" : ["spotify:track:" + uri ]
        };

    
        this.client.post("http://46.101.18.121:12347", {
          method:"",
          body: JSON.stringify(json)
        })
          .then(response => response)
          .then(data => {
            console.log(data);
            res();
          }).catch(error => {
            console.log("ERROR");
            console.log(error);
            rej();
          });



      });
      

    }

  }

}
