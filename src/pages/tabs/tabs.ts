import { Component } from "@angular/core";

import { BlogPage } from "../blog/blog";
import { MusicPage } from "../music/music";
import { CricketPage } from "../cricket/cricket";
import { WeatherPage } from "../weather/weather";
import { SettingProvider } from "../../providers/setting/setting";

@Component({
  templateUrl: "tabs.html"
})
export class TabsPage {
  tab1Root = MusicPage;
  tab2Root = CricketPage;
  tab3Root = WeatherPage;
  tab4Root = BlogPage;

  constructor(private setting: SettingProvider) {}

  nightMode() {
    this.setting.activeTheme = "theme-dark";
  }

  dayMode() {
    this.setting.activeTheme = "theme-light";
  }
}
