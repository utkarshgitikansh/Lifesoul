import {
  IonicPage,
  NavController,
  Platform,
  LoadingController
} from "ionic-angular";
import { StreamingMedia } from "@ionic-native/streaming-media";
import { Media, MediaObject } from "@ionic-native/media";
import { Component, NgZone } from "@angular/core";
import { File } from "@ionic-native/file";
import { Storage } from "@ionic/storage";
import { BackgroundMode } from "@ionic-native/background-mode";
import { NativeAudio } from "@ionic-native/native-audio";

@IonicPage()
@Component({
  selector: "page-music",
  templateUrl: "music.html"
})
export class MusicPage {
  savedParentNativeURLs = [];
  items;
  art: String;
  artist: any;
  download: any;
  download1: any;
  arr = new Map();
  a = Array<any>();
  k: number = 0;
  result = Array<any>();
  final = new Map();
  final2 = new Map();
  str: string = "file:///";
  url: any;
  location = new Map();
  playList: boolean = false;
  playing: boolean = false;
  file1: MediaObject;
  music: any;
  audioList = new Map();
  nameAudio = Array<any>();
  Astatus: boolean = false;
  currentSong: any;

  // private media: Media, private streamingMedia: StreamingMedia
  constructor(
    public navCtrl: NavController,
    public file: File,
    public plt: Platform,
    public ngZone: NgZone,
    private media: Media,
    private streamingMedia: StreamingMedia,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public nativeAudio: NativeAudio,
    public backgroundMode: BackgroundMode
  ) {
    this.storage.get("audios").then(val => {
      if (val != null) {
        this.final2 = val;
        this.Astatus = true;
      } else {
        alert("Please allow us to scan for the audio files!! :)");
        this.listagain(this.file.externalRootDirectory, "Download");
        this.listagain(this.file.externalRootDirectory, "Music");
        this.listagain(this.file.externalRootDirectory, "Audio");
      }
    });
  }
  ionViewWillLoad() {
    // this.storage.get("audios").then(val => {
    //   if (val != null) {
    //     this.final2 = val;
    //   } else {
    //     alert("Please allow us to scan to update the audio list!!");
    //     this.set();
    //     // this.listagain('file:///','sdcard');
    //     //this.storage.set('location', this.arr);
    //   }
    // });
    // this.listagain('file:///','');
    // this.final = this.arr;
    //this.show();
    // this.storage.get("audios").then(val => {
    //   if (val != null) {
    //     this.final2 = val;
    //   } else {
    //     alert("Please allow us to scan to update the audio list!!");
    //     this.set();
    //     // this.listagain('file:///','sdcard');
    //     //this.storage.set('location', this.arr);
    //   }
    // });
    this.set();
  }
  set() {
    this.storage.get("audios").then(val => {
      if (val != null) {
        this.music.push(val.name);
      } else {
        alert("Oops! The playlist could not be loaded!!");
      }
    });
  }

  proAudio = (item, i) => {
    this.startAudio(item);
    this.currentSong = item;
  };

  playNext() {
    let index = this.currentSong + 1;
    // let item = this.audioList.get(index);
    this.proAudio(this.final2.get(this.currentSong + 1), index);
  }

  startAudio = item => {
    let file = this.media.create(item[1]);

    file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
    file.onSuccess.subscribe(() => console.log("Action is successful"));
    file.onError.subscribe(error => console.log("Error!", error));

    // send the file to be played

    if (this.playing) this.file1.release();

    file.play();
    this.playing = true;
    this.file1 = file;
  };
  playMusic = item => {
    if (this.file1 == null) alert("Please select a song !!");
    if (this.playing) this.startAudio(item);
    else this.file1.play();
    this.playing = true;

    // this.storage.get('music').then((val) => {
    //   if(val != null){
    //     let file = JSON.parse(val);
    //     file.play();
    //   } else {
    //     alert("please select a song!!");
    //         }
    // });
  };

  pauseAudio() {
    this.file1.pause();

    this.playing = false;
  }

  listagain(x: string, y: string) {
    //alert(x +','+ y);
    this.file.listDir(x, y).then(data => {
      // this.download1 = data;
      //var x = {"row1" : data};
      // var z = x + y;
      // return z;

      for (let item of data) {
        if (item.isFile == true) {
          // Code if its a folder
          // alert('inside isdir');
          //var x = {"row1" : data};
          //alert(item.fullPath);
          // this.arr.push(data);
          let name: String = item.name; // File name
          let path: String = item.nativeURL; // File path
          if (name.includes(".mp3")) {
            this.arr.set(name, path);
          }
          // this.arr.push(name,path);

          // this.list(item.fullPath,'');
          //
        } else if (item.isDirectory == true) {
          // Code if its a file
          let name = item.name; // File name
          let path = item.nativeURL; // File path

          //  if(x!= this.str){
          //     name= '/'+name;
          //   }

          if (y != "") {
            name = "/" + name;
          }

          this.listagain(x, y + name);

          //this.listagain(x, y);

          //this.a.push(name,path);
          //alert (this.a);
          // alert('inside isfile');
        }
      }
    });
    //this.storage.set("audios", this.test);
    //   });
    this.final2 = this.arr;
    this.Astatus = true;

    this.storage.set("audios", this.final2);
  }
}
