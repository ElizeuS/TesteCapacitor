import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { View } from './view';
import { SharedModule } from '../shared/shared.module';
import exporting from 'highcharts/modules/exporting.src.js';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: View }]),
    SharedModule,
  ],
  declarations: [View]
})
export class ViewModule {}
