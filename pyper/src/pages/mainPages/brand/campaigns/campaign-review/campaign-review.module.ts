import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampaignReviewPage } from './campaign-review';
import { ComponentsModule } from '../../../../../components/components.module';

@NgModule({
  declarations: [
    CampaignReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(CampaignReviewPage),
    ComponentsModule
  ],
  exports: [
    CampaignReviewPage,
    ComponentsModule
  ]
})
export class CampaignReviewPageModule {}
