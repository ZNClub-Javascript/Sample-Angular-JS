import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/components.module';
import { InfluencerBasicDetails } from './influencer-basic-details';

@NgModule({
  declarations: [
    InfluencerBasicDetails
  ],
  imports: [
    IonicPageModule.forChild(InfluencerBasicDetails),
    ComponentsModule
  ],
})
export class InfluenderDetailPageModule { }