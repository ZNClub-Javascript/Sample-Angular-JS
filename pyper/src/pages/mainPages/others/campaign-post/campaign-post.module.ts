import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../../../components/components.module';
import { CampaignPostPage } from './campaign-post';

@NgModule({
  declarations: [
    CampaignPostPage
  ],
  imports: [
    IonicPageModule.forChild(CampaignPostPage),
    ComponentsModule
  ],
})
export class InfluenderDetailPageModule { }