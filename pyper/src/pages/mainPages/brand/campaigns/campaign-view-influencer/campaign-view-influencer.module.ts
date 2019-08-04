import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampaignViewInfluencerPage } from './campaign-view-influencer';
import { ComponentsModule } from '../../../../../components/components.module';

@NgModule({
  declarations: [
    CampaignViewInfluencerPage,
  ],
  imports: [
    IonicPageModule.forChild(CampaignViewInfluencerPage),
    ComponentsModule
  ],
})
export class CampaignViewInfluencerPageModule {}
