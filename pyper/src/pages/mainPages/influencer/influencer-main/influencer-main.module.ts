import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfluencerMainPage } from './influencer-main';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    InfluencerMainPage,
  ],
  imports: [
    IonicPageModule.forChild(InfluencerMainPage),
    ComponentsModule
  ]
})
export class InfluencerMainPageModule {}
