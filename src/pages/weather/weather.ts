import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { WeatherinfoProvider } from "../../providers/weatherinfo/weatherinfo";
import { Storage } from "@ionic/storage";
@IonicPage()
@Component({
  selector: "page-weather",
  templateUrl: "weather.html"
})
export class WeatherPage {
  city: string;
  state: string;
  weather: any;
  location: {
    city: string;
  };

  constructor(
    public navCtrl: NavController,
    private weatherProvider: WeatherinfoProvider,
    private storage: Storage
  ) {
    this.storage.get("location").then(val => {
      if (val != null) {
        let location = JSON.parse(val);
        this.city = location.city;
      } else {
        this.city = "Noida";
      }
    });
  }

  saveForm() {
    let location = {
      city: this.city
    };
    this.storage.set("location", JSON.stringify(location));

    this.navCtrl.push(WeatherPage);
    this.navCtrl.pop;
  }

  ionViewWillEnter() {
    this.storage.get("location").then(val => {
      if (val != null) {
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: "Noida"
        };
      }

      this.weatherProvider.getWeather(this.city).subscribe(w => {
        this.weather = w;
      });
    });

    console.log(this.weather);
  }
}
