import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { View } from './view';
import { SharedModule } from '../shared/shared.module';
import exporting from 'highcharts/modules/exporting.src.js';

import * as Highcharts from 'highcharts';
// Alternatively, this is how to load Highstock. Highmaps is similar.
// import Highcharts from 'highcharts/highstock';
 
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
 // Initialize exporting module.
 Exporting(Highcharts);

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: View }]),
    SharedModule
  ],
  declarations: [View]
})
export class ViewModule {
 
}
