import { IonicPage, NavController, NavParams, Platform, LoadingController} from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media';
import { Media, MediaObject } from '@ionic-native/media';
import { Component , NgZone } from '@angular/core';
import { File } from '@ionic-native/file';
import { Storage } from '@ionic/storage';
import { AudioProvider } from '../../providers/audio/audio';
import { BackgroundMode } from '@ionic-native/background-mode';
import { NativeAudio } from '@ionic-native/native-audio';


@IonicPage()
@Component({
  selector: 'page-music',
  templateUrl: 'music.html',
})

export class MusicPage {

  savedParentNativeURLs = [];
  items;
  art : String;
  artist : any;
  download : any;
  download1 : any ;
  arr = new Map();
  a = Array<any>();
  k: number =0;
  result=Array<any>();
  final = new Map();
  final2 = new Map();
  str : string = "file:///";
  url :any;
  location = new Map();
  playList: boolean = false;
  playing: boolean = false;
  file1 :MediaObject;
  music;
 
  // private media: Media, private streamingMedia: StreamingMedia
  constructor(public navCtrl: NavController, public file:File,
    public plt: Platform, public ngZone: NgZone,
     private media: Media,private streamingMedia: StreamingMedia, 
     private storage:Storage,public loadingCtrl: LoadingController,
     public nativeAudio: NativeAudio , public backgroundMode : BackgroundMode)  {
    
     // this.show();
      // this.storage.get('location').then((val) => {
      //   if(val != null){
      //      this.final = val;
      //   } else {
      //     alert('Oops! The playlist could not be loaded!!');
      //   }
      // });


    // plt.ready()
    // .then(() => {
    //   this.listRootDir();
    // })
}
ionViewDidLoad(){
 
  // this.listagain('file:///','');
  // this.final = this.arr;
  //this.show();



  this.set();
 //this.file.checkDir( this.file.externalRootDirectory, 'Download').then(_ => alert('Directory exists')).catch(err => alert('Directory doesn\'t exist'));

  
      //  this.storage.get('location').then((val) => {
      //   if(val != null){
      //      this.final2 = val;
      //   } else {
      //     alert('Oops! The playlist could not be loaded!!');
      //     // this.listagain('file:///','sdcard');
      //     //this.storage.set('location', this.arr);
      //   }
      // });
     
  // --->  this.listagain('file:///','sdcard');
    
  // --> this.final2= this.arr;
    // this.listagain('file:///','storage');
    // this.final = this.arr;
      
    //alert(parts.nativeURL);
    
   }
//}
show(){
  //this.navCtrl.push(MusicPage);
  this.storage.get('location').then((val) => {
    if(val != null){
       this.final2 = val;
    } else {
      alert('Please allow us to scan to update the audio list!!');
      this.set();
      // this.listagain('file:///','sdcard');
      //this.storage.set('location', this.arr);
    }
  });

}

yo() {

  this.show();
  // let loading = this.loadingCtrl.create({
  //   spinner: 'hide',
  //   content: `
  //     <div class="custom-spinner-container">
  //       <div class="custom-spinner-box"></div>
  //     </div>`,
  //     duration: 10000
  // });

  // loading.present().then(() => {
  //   this.set();
  //   //loading.dismiss();
  // });
  // this.show();

  
}
 set(){
 // this.audio.set();

  this.listagain(this.file.externalRootDirectory,'Download');
  this.listagain(this.file.externalRootDirectory,'Music');
  this.listagain(this.file.externalRootDirectory,'Audio');
  this.final2= this.arr;
  //alert(this.final2.entries.length);
 // this.storage.set('location', this.arr);



//   this.storage.set('location', this.final);
 }

//   listRootDir = () => {

//   const ROOT_DIRECTORY = "file:///";

//   (<any> window).resolveLocalFileSystemURL(ROOT_DIRECTORY,
//     (fileSystem) => {

//       var reader = fileSystem.createReader();
//       reader.readEntries(
//         (entries) => {
//           this.ngZone.run(()=> {
//             this.items = entries;
//           });
//         }, this.handleError);
//     }, this.handleError);
// }

// handleError = (error) => {
//   console.log('error reading,', error)
// };

// goDown = (item) => {

//   let childName = this.items[0].name;
//   let childNativeURL = this.items[0].nativeURL;

//   const parentNativeURL = childNativeURL.replace(childName, '');

//   this.savedParentNativeURLs.push(parentNativeURL);

//   var reader = item.createReader();
//   alert(parentNativeURL);
//   reader.readEntries(
//     (children) => {
//       this.ngZone.run(()=> {
//         this.items = children;
//       })
//     }, this.handleError);
// }

// hide = (item) => {

// item = item.hide;

// }

// goUp = () => {

//   const parentNativeURL = this.savedParentNativeURLs.pop();

//   (<any> window).resolveLocalFileSystemURL(parentNativeURL,
//     (fileSystem) => {
    
//       var reader = fileSystem.createReader();
    
//       reader.readEntries(
//         (entries) => {
//           this.ngZone.run(()=> {
//             this.items = entries;
//           })
//         }, this.handleError);
//     }, this.handleError);
// }

// startAudio = (item) => {

// let options: StreamingAudioOptions = {
//     successCallback: () => { console.log('Finished Audio') },
//     errorCallback: (e) => { console.log('Error: ', e) },
    
//     initFullscreen: false // iOS only!
//   };


//   this.streamingMedia.playAudio(item[1], options);

// }

startAudio = (item) => {
 // alert ("Now playing");
  let file = this.media.create(item[1]);

  // to listen to plugin events:
  
  file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
  
  file.onSuccess.subscribe(() => console.log('Action is successful'));
  
  file.onError.subscribe(error => console.log('Error!', error));
  
  // send the file to be played

  if(this.playing)
  this.file1.release();

  file.play();
  this.playing = true;
  this.file1=file;
  this.storage.set('music', JSON.stringify(this.file1));

  // this.playMusic(file);
 
  // this.playMusic(this.file1);
  

}
playMusic = (item) => {
  
  if(this.file1 == null)
  alert("Please select a song !!")
  if(this.playing)
  this.startAudio(item);
  else
  this.file1.play();
  this.playing=true;

  // this.storage.get('music').then((val) => {
  //   if(val != null){
  //     let file = JSON.parse(val);
  //     file.play();
  //   } else {
  //     alert("please select a song!!");
  //         }
  // });


// if(this.playing)
// this.file1.release();
// item.play();
// this.playList = true;
// this.playing = true;
 }

pauseAudio(){

this.file1.pause();

this.playing = false;
}



listagain(x:string,y:string){
  //alert(x +','+ y);
   this.file.listDir(x, y).then((data)=>{
          // this.download1 = data;
            //var x = {"row1" : data};
           // var z = x + y;
            // return z;
           
        for (let item of data){
         if(item.isFile == true){
           // Code if its a folder
          // alert('inside isdir');
          //var x = {"row1" : data};
          //alert(item.fullPath);
         // this.arr.push(data);
           let name:String=item.name ;// File name
           let path:String=item.nativeURL; // File path
           if(name.includes('.mp3')){
             this.arr.set(name,path);
             
           }
         // this.arr.push(name,path);
         

             // this.list(item.fullPath,'');
             // 
         }else if(item.isDirectory == true){
           // Code if its a file
           let name=item.name ;// File name
           let path=item.nativeURL; // File path
       
         //  if(x!= this.str){
         //     name= '/'+name;
         //   } 



          //  if(y!=''){
          //    name='/'+name;
          //  }




           //this.listagain(x,y+name);  

           this.listagain(x,y);  

          //this.a.push(name,path);
          //alert (this.a);
           // alert('inside isfile');
         }
       }
       
     });
          //   });

}
}