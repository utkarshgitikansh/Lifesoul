import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WeatherinfoProvider } from '../../providers/weatherinfo/weatherinfo';
import { Storage } from '@ionic/storage';
@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {
  city:string;
  state:string;
  weather:any;
  location:{
    city:string,
    state:string
  }

  constructor(
    public navCtrl: NavController, 
    private weatherProvider:WeatherinfoProvider,
    private storage:Storage) {

      this.storage.get('location').then((val) => {
        if(val != null){
          let location = JSON.parse(val);
          this.city = location.city;
          this.state = location.state;
        } else {
          this.city = 'Miami';
          this.state = 'FL';
        }
      });

  }


  saveForm(){
    let location = {
      city: this.city,
      state: this.state
    }
    this.storage.set('location', JSON.stringify(location));
    
    this.navCtrl.push(WeatherPage);
    // this.navCtrl.remove(this);
  }

  ionViewWillEnter(){
    this.storage.get('location').then((val) => {
      if(val != null){
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city: 'Miami',
          state: 'FL'
        }
      }

      this.weatherProvider.getWeather(this.location.city, this.location.state)  .subscribe(weather => {
          this.weather = weather.current_observation;
        });
    });
  }

}
