import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { File } from "@ionic-native/file";
/*
  Generated class for the AudioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AudioProvider {
  arr = new Map();
  final = new Map();

  constructor(
    public file: File,
    public http: HttpClient,
    private storage: Storage
  ) {
    //console.log('Hello AudioProvider Provider');
  }

  ionViewWillEnter() {
    this.set();
  }

  set() {
    this.listagain(this.file.externalRootDirectory, "Download");
    this.listagain(this.file.externalRootDirectory, "Music");
    this.listagain(this.file.externalRootDirectory, "Audio");
    this.final = this.arr;
    //this.listagain("file:///", "sdcard");
    this.storage.set("location", this.arr);
    //this.storage.set('location', this.final);
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
            //alert(item.nativeURL);
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
          //this.a.push(name,path);
          //alert (this.a);
          // alert('inside isfile');
        }
      }
    });
    //   });
  }
}
