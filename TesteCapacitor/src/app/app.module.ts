import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';

import {CameraService} from '../../src/app/services/camera.service';
import { File } from '@ionic-native/file/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as Jimp from "jimp";

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { Brightness } from '@ionic-native/brightness/ngx'

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, NgxSliderModule,],
  providers: [
    StatusBar,
    CameraPreview,
    CameraService,
    SplashScreen,
    File,
    Geolocation,
    Jimp,
    Brightness,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
