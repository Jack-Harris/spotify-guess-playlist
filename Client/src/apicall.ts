import {HttpClient} from 'aurelia-fetch-client';
import 'aurelia-http-client';

export class APICall {

  client = new HttpClient();

  url:string = "http://46.101.18.121:12346";
  authToken:string = "";
  response;

  constructor(res, rej) {
    this.client.fetch(this.url)
    .then(response => response.json())
    .then(data => {
      this.response = data;
      res();
    }).catch(error => {
      console.log(error);
      rej();
    });
  }



  playSong(songuri:string, res, rej) {
    
  }

}
