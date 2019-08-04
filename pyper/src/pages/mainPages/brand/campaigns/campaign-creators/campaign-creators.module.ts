import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampaignCreatorsPage } from './campaign-creators';
import { ComponentsModule } from '../../../../../components/components.module';

@NgModule({
  declarations: [
    CampaignCreatorsPage,
  ],
  imports: [
    IonicPageModule.forChild(CampaignCreatorsPage),
    ComponentsModule
  ],
  exports:[
    CampaignCreatorsPage
  ]
})
export class CampaignCreatorsPageModule {}
