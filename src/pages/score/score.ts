import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { InformationProvider } from "../../providers/information/information";

/**
 * Generated class for the ScorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-score",
  templateUrl: "score.html"
})
export class ScorePage {
  value: any;
  Sstatus: Boolean = false;
  dataScore: any;
  teamA: any;
  teamB: any;
  toss: any;
  mom: any;

  teamAlenbat: any;
  teamBlenbat: any;
  teamAlenbowl: any;
  teamBlenbowl: any;

  batstatA = Array();
  bowlstatB = Array();
  batstatB = Array();
  bowlstatA = Array();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private informationProvider: InformationProvider
  ) {
    this.value = navParams.get("item");
    this.toss = navParams.get("toss");
  }

  ionViewDidLoad() {
    // this.informationProvider.getMatch(this.value).subscribe(y => {
    //   this.scores = y.score;
    //   this.teamA = y["team-1"];
    //   this.teamB = y["team-2"];

    //   this.Sstatus = true;
    // });

    this.informationProvider.getScore(this.value).subscribe(y => {
      this.dataScore = y["data"];

      this.teamA = this.dataScore["team"][0].name;
      this.teamB = this.dataScore["team"][1].name;
      this.mom = this.dataScore["man-of-the-match"].name;
      this.toss = this.dataScore["toss_winner_team"];
      this.teamAlenbat = this.dataScore["batting"][0]["scores"].length;
      this.teamBlenbat = this.dataScore["batting"][1]["scores"].length;

      this.teamAlenbowl = this.dataScore["bowling"][1]["scores"].length;
      this.teamBlenbowl = this.dataScore["bowling"][0]["scores"].length;

      for (let i = 0; i < this.teamAlenbat; i++) {
        this.batstatA.push(this.dataScore["batting"][0]["scores"][i]);
      }

      for (let i = 0; i < this.teamBlenbowl; i++) {
        this.bowlstatB.push(this.dataScore["bowling"][0]["scores"][i]);
      }

      for (let i = 0; i < this.teamBlenbat; i++) {
        this.batstatB.push(this.dataScore["batting"][1]["scores"][i]);
      }

      for (let i = 0; i < this.teamAlenbowl; i++) {
        this.bowlstatA.push(this.dataScore["bowling"][1]["scores"][i]);
      }

      console.log(this.dataScore);

      console.log(y["data"]["batting"][0]["scores"].length);
      this.Sstatus = true;
    });
  }
}
