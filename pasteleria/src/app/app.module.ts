import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { PlaceholderPipe } from "../pipes/placeholder";

import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { CargaArchivosService } from '../providers/carga-archivos/carga-archivos';
import { Keyboard } from '@ionic-native/keyboard';

import { Facebook } from '@ionic-native/facebook';

export const firebaseConfig = {
    apiKey: "AIzaSyC7lObDDDUCJxh1RD_wAOssTqDtt05Od4Y",
    authDomain: "pasteleria-e5cd5.firebaseapp.com",
    databaseURL: "https://pasteleria-e5cd5.firebaseio.com",
    projectId: "pasteleria-e5cd5",
    storageBucket: "pasteleria-e5cd5.appspot.com",
    messagingSenderId: "600489573195"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PlaceholderPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,Camera,ImagePicker,Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CargaArchivosService,
    Facebook
  ]
})
export class AppModule {}
