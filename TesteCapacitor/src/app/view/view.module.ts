import { DragDropModule } from '@angular/cdk/drag-drop';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { View } from './view';
import { SharedModule } from '../shared/shared.module';

import { BrightScrollComponent } from '../components/bright-scroll/bright-scroll.component';

import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { DragLightComponent } from '../components/drag-light/drag-light.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: View }]),
    SharedModule,
    NgxSliderModule,
    DragDropModule

  ],
  declarations: [View, BrightScrollComponent, DragLightComponent]
})
export class ViewModule {

}
