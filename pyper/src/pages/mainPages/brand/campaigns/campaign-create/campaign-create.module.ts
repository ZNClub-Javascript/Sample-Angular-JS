import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../../components/components.module';
import { CampaignCreatePage } from './campaign-create';

@NgModule({
  declarations: [
    CampaignCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(CampaignCreatePage),
    ComponentsModule
],
exports:[
  CampaignCreatePage
]
})
export class CampaignCreatePageModule {}
