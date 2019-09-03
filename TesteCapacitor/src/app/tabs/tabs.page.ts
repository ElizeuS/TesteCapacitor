import { Component } from '@angular/core';
import {CameraService} from '../services/camera.service';

import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview'

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  comprimentoDeOn: any;

  constructor(public cameraService: CameraService){
     
  }
  
  ngOnInit() {
    this.cameraService.startCamera();
    //this.cameraService.takePicture();
    
  }


  cor(comprimentoDeOnda) {

    this.comprimentoDeOn = comprimentoDeOnda;
    let red: number;
    let green: number;
    let blue: number;
    let SSS: number;


    if ( this.comprimentoDeOn >= 380 &&  this.comprimentoDeOn < 440) {
      red = -( this.comprimentoDeOn - 440) / (440 - 380);
      green = 0;
      blue = 1;
    } else if ( this.comprimentoDeOn >= 440 &&  this.comprimentoDeOn < 490) {
      red = 0;
      green = ( this.comprimentoDeOn - 440) / (490 - 440);
      blue = 1;
    } else if ( this.comprimentoDeOn >= 490 &&  this.comprimentoDeOn < 510) {
      red = 0;
      green = 1;
      blue = -( this.comprimentoDeOn - 510) / (510 - 490);
    } else if ( this.comprimentoDeOn >= 510 &&  this.comprimentoDeOn < 580) {
      red = ( this.comprimentoDeOn - 510) / (580 - 510);
      green = 1;
      blue = 0;
    } else if ( this.comprimentoDeOn >= 580 &&  this.comprimentoDeOn < 645) {
      red = 1;
      green = -( this.comprimentoDeOn - 645) / (645 - 580);
      blue = 0;
    } else if ( this.comprimentoDeOn >= 645 &&  this.comprimentoDeOn <= 780) {
      red = 1;
      green = 0;
      blue = 0;
    } else {
      red = 255;
      green = 255;
      blue = 255;
      this.comprimentoDeOn = "White, doesn't exist";
    }

    if ( this.comprimentoDeOn >= 380 &&  this.comprimentoDeOn < 420) {
      SSS = 0.3 + 0.7 * ( this.comprimentoDeOn - 350) / (420 - 350);
    } else if ( this.comprimentoDeOn >= 420 &&  this.comprimentoDeOn <= 700) {
      SSS = 1.0;
    } else if ( this.comprimentoDeOn > 700 &&  this.comprimentoDeOn <= 780) {
      SSS = 0.3 + 0.7 * (780 -  this.comprimentoDeOn) / (780 - 700);
    } else {
      SSS = 1;
    }

    SSS *= 255;
    let r: number;
    let g: number;
    let b: number;

    r = Math.floor(SSS * red);
    g = Math.floor(SSS * green);
    b = Math.floor(SSS * blue);

    //let teste = document.getElementById("card-color");
    //teste.style.backgroundColor = `rgb(${r},${g}, ${b})`;
    this.setColor(r, g, b);
    this.cameraService.r = r;
    this.cameraService.g = g;
    this.cameraService.b = b;
    return { r, g, b };
  }

  setColor(r, g, b){
    let teste = document.getElementById("card-color2");
    teste.style.backgroundColor = `rgb(${r},${g}, ${b})`;
    
    
  }

  


}
