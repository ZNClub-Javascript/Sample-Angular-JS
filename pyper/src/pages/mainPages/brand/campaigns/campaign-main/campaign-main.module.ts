import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampaignMainPage } from './campaign-main';
import { ComponentsModule } from '../../../../../components/components.module';
import { CampaignCreatePageModule } from '../campaign-create/campaign-create.module';
import { CampaignBriefPageModule } from '../campaign-brief/campaign-brief.module';
import { CampaignCreatorsPageModule } from '../campaign-creators/campaign-creators.module';
import { CampaignReviewPageModule } from '../campaign-review/campaign-review.module';
import { CampaignSubmitPageModule } from '../campaign-submit/campaign-submit.module';
import { CreatePageModule } from '../../create/create.module';

@NgModule({
  declarations: [
    CampaignMainPage,
  ],
  imports: [
    IonicPageModule.forChild(CampaignMainPage),
    CampaignCreatePageModule,
    CampaignBriefPageModule,
    CampaignCreatorsPageModule,
    CampaignReviewPageModule,
    CampaignSubmitPageModule,
    ComponentsModule
],
})
export class CampaignMainPageModule {}
