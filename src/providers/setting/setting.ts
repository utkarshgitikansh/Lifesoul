import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the SettingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingProvider {
  public activeTheme: string = "theme-light";

  constructor(public http: HttpClient) {
    console.log("Hello SettingProvider Provider");
  }
}
