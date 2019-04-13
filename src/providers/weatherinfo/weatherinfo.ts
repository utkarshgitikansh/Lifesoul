import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { Http, RequestOptions } from "@angular/http";
import { Headers } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class WeatherinfoProvider {
  url;

  constructor(public http: Http) {
    this.url =
      "http://api.apixu.com/v1/current.json?key=e8f21b2e09284e35a1b152526191204&q=";
  }

  getWeather(city) {
    // var headers = new Headers();

    // headers.append("Access-Control-Allow-Origin", "*");

    // let options = new RequestOptions({ headers: headers });

    return this.http.get(this.url + city).map(res => res.json());
  }
}
