import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';
import { NativeAudio } from '@ionic-native/native-audio';

import { BlogPage } from '../pages/blog/blog';
import { WeatherPage } from '../pages/weather/weather';
import { MusicPage } from '../pages/music/music';
import { CricketPage } from '../pages/cricket/cricket';
import { TabsPage } from '../pages/tabs/tabs';
import { FileChooser } from '@ionic-native/file-chooser'
import { FileOpener } from '@ionic-native/file-opener'
import { FilePath } from '@ionic-native/file-path'
import { File } from '@ionic-native/file';
import { AlertController } from 'ionic-angular';
import { Media } from '@ionic-native/media';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InformationProvider } from '../providers/information/information';
import { WeatherinfoProvider } from '../providers/weatherinfo/weatherinfo';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { BloggerProvider } from '../providers/blogger/blogger';
import { AudioProvider } from '../providers/audio/audio';



@NgModule({
  declarations: [
    MyApp,
    MusicPage,
    CricketPage,
    WeatherPage,
    BlogPage,
    TabsPage,
    
  ],
  imports: [
    BrowserModule,
    HttpModule, 
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WeatherPage,
    CricketPage,
    MusicPage,
    BlogPage,
    TabsPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InformationProvider,
    WeatherinfoProvider,
    FileChooser,
    FileOpener,
    FilePath,
    File,
    StreamingMedia,
    Media,
    BloggerProvider,
    AudioProvider,
    BackgroundMode,
    NativeAudio
    
    ]
})
export class AppModule {}
