import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfluencerDetailPage } from './influencer-detail';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    InfluencerDetailPage
  ],
  imports: [
    IonicPageModule.forChild(InfluencerDetailPage),
    ComponentsModule
  ],
})
export class InfluenderDetailPageModule { }