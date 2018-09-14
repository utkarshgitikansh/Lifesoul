import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CricketPage } from '../../pages/cricket/cricket';

@Injectable()
export class InformationProvider {
  // data: any;
 
  apiKey = 'YQcxw12HpBMe1UaJ6TsKtZTC3Br2';
  url;
  url_pid;
  url_info;
  constructor(public http: Http) {
    console.log('providers working');
    this.url='http://cricapi.com/api/matches/' + this.apiKey;
    this.url_pid='http://cricapi.com/api/playerFinder/'+ this.apiKey;
    this.url_info='http://cricapi.com/api/playerStats/'+ this.apiKey;
  }

getCurrMatch(){

  // console.log(this.http.get(this.url));
  
     return this.http.get(this.url).map(res =>res.json()); 
  }


getPID(cplayer){
    this.url_pid='http://cricapi.com/api/playerFinder/'+ this.apiKey + '?name=' + cplayer;
    console.log(cplayer);
    return this.http.get(this.url_pid).map(rrrr =>rrrr.json()); 
   
   
}

getPlayerInfo(fetch_pid){
  // console.log(fetch_pid);
  this.url_info='http://cricapi.com/api/playerStats/'+ this.apiKey + '?pid=' + fetch_pid;
  return this.http.get(this.url_info).map(res =>res.json());

}

}


