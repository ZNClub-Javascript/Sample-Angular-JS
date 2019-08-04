import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { InfluencerHomePage } from './influencer-home';
import { ComponentsModule } from '../../../../components/components.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InfluencerHomePage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicPageModule.forChild(InfluencerHomePage),
    ComponentsModule
  ],
})
export class InfluencerHomePageModule {}
