import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampaignSubmitPage } from './campaign-submit';
import { ComponentsModule } from '../../../../../components/components.module';

@NgModule({
  declarations: [
    CampaignSubmitPage,
  ],
  imports: [
    IonicPageModule.forChild(CampaignSubmitPage),
  ],
  exports:[
    CampaignSubmitPage,
    ComponentsModule
  ]
})
export class CampaignSubmitPageModule {}
