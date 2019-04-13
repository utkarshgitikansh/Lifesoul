import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { InformationProvider } from "../../providers/information/information";
import { ScorePage } from "../score/score";

@Component({
  selector: "page-cricket",
  templateUrl: "cricket.html"
})
export class CricketPage {
  scrollViewOptions: any = {
    layout: "fixed",
    itemWidth: 134,
    snap: false
  };
  data: any;
  role: any;
  bat: Boolean;
  mtype: String;
  mtype2: String;
  mtype3: String;
  team1: String;
  team2: String;
  teamW: String;
  team3: String;
  team4: String;
  teamW2: String;
  team5: String;
  team6: String;
  teamW3: String;
  score: String;
  cplayer: String;
  fetch_pid: number;
  form: Boolean;
  oruns: number;
  omatches: number;
  oaverage: number;
  ocenturies: number;
  truns: number;
  tmatches: number;
  taverage: number;
  tcenturies: number;
  twruns: number;
  twmatches: number;
  twaverage: number;
  twcenturies: number;

  obwkts: number;
  obmatches: number;
  obaverage: number;
  ofive: number;
  tbwkts: number;
  tbmatches: number;
  tbaverage: number;
  tfive: number;
  twbwkts: number;
  twbmatches: number;
  twbaverage: number;
  twfive: number;
  matches_len: any;
  matches: any;
  Cstatus: Boolean = false;

  current = Array();
  upcoming = Array();
  toss: any;

  // private information:InformationProvider=new InformationProvider();
  constructor(
    public navCtrl: NavController,
    private informationProvider: InformationProvider
  ) {
    this.form = true;
  }

  ionViewWillEnter() {
    this.informationProvider.getCurrMatch().subscribe(info => {
      // this.team1 = info.matches[0]["team-1"];
      // this.team2 = info.matches[0]["team-2"];
      // this.teamW = info.matches[0].winner_team;
      // this.mtype = info.matches[0].type;
      // this.team3 = info.matches[1]["team-1"];
      // this.team4 = info.matches[1]["team-2"];
      // this.teamW2 = info.matches[1].winner_team;
      // this.mtype2 = info.matches[1].type;
      // this.team5 = info.matches[2]["team-1"];
      // this.team6 = info.matches[2]["team-2"];
      // this.teamW3 = info.matches[2].winner_team;
      // this.mtype3 = info.matches[2].type;

      this.current = [];
      this.upcoming = [];
      this.matches_len = info.matches.length;
      this.matches = info.matches;

      for (let i = 0; i < this.matches_len; i++) {
        if (
          info.matches[i]["matchStarted"] == true &&
          info.matches[i]["squad"] == true &&
          info.matches[i]["winner_team"] != null
        ) {
          this.current.push(info.matches[i]);
        } else this.upcoming.push(info.matches[i]);
      }
      //console.log(this.current);

      this.Cstatus = true;
    });
  }

  alert() {
    alert("Please stay tuned for the match updates.");
  }
  scoreIt(i) {
    console.log("i");
    let id = this.current[i]["unique_id"];
    let tos = this.current[i]["toss_winner_team"];
    console.log(id);
    this.navCtrl.push(ScorePage, {
      item: id,
      toss: tos
    });
  }
  saveCPlayer() {
    console.log(this.cplayer);
    this.informationProvider.getPID(this.cplayer).subscribe(y => {
      this.fetch_pid = y.data[0]["pid"];
      //console.log(this.fetch_pid);
      this.getPlayerData();
      this.form = false;
    });
  }

  getPlayerData() {
    this.informationProvider.getPlayerInfo(this.fetch_pid).subscribe(x => {
      this.role = x["playingRole"];

      if (this.role.includes("batsman")) {
        //       truns : number;
        // tmatches : number;
        // taverage : number;
        // tcenturies : number;
        // twruns : number;
        // twmatches : number;
        // twaverage : number;
        // twcenturies : number;

        this.bat = true;

        this.oruns = x.data["batting"]["ODIs"]["Runs"];
        this.omatches = x.data["batting"]["ODIs"]["Mat"];
        this.ocenturies = x.data["batting"]["ODIs"]["100"];
        this.oaverage = x.data["batting"]["ODIs"]["Ave"];

        this.truns = x.data["batting"]["tests"]["Runs"];
        this.tmatches = x.data["batting"]["tests"]["Mat"];
        this.tcenturies = x.data["batting"]["tests"]["100"];
        this.taverage = x.data["batting"]["tests"]["Ave"];

        this.twruns = x.data["batting"]["T20Is"]["Runs"];
        this.twmatches = x.data["batting"]["T20Is"]["Mat"];
        this.twcenturies = x.data["batting"]["T20Is"]["100"];
        this.twaverage = x.data["batting"]["T20Is"]["Ave"];

        console.log(this.role);
      } else {
        this.bat = false;
        this.obwkts = x.data["bowling"]["ODIs"]["Wkts"];
        this.obmatches = x.data["bowling"]["ODIs"]["Mat"];
        this.ofive = x.data["bowling"]["ODIs"]["5w"];
        this.obaverage = x.data["bowling"]["ODIs"]["Ave"];

        this.tbwkts = x.data["bowling"]["tests"]["Wkts"];
        this.tbmatches = x.data["bowling"]["tests"]["Mat"];
        this.tfive = x.data["bowling"]["tests"]["5w"];
        this.tbaverage = x.data["bowling"]["tests"]["Ave"];

        this.twbwkts = x.data["bowling"]["T20Is"]["Wkts"];
        this.twbmatches = x.data["bowling"]["T20Is"]["Mat"];
        this.twfive = x.data["bowling"]["T20Is"]["5w"];
        this.twbaverage = x.data["bowling"]["T20Is"]["Ave"];
      }
    });
  }

  onBackPressed() {
    this.cplayer = "";
    this.form = true;
  }
}
