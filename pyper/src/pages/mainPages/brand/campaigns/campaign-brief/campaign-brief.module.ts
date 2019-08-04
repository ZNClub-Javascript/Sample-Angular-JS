import { ComponentsModule } from './../../../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampaignBriefPage } from './campaign-brief';

@NgModule({
  declarations: [
    CampaignBriefPage,
  ],
  imports: [
    IonicPageModule.forChild(CampaignBriefPage),
    ComponentsModule
  ],
  exports:[
    CampaignBriefPage
  ]
})
export class CampaignBriefPageModule {}
