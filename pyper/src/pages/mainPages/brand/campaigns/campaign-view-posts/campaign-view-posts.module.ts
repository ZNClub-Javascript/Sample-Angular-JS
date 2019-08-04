import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampaignViewPosts } from './campaign-view-posts';
import { ComponentsModule } from '../../../../../components/components.module';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    CampaignViewPosts
  ],
  imports: [
    IonicPageModule.forChild(CampaignViewPosts),
    ComponentsModule,
    AgGridModule
  ],
})
export class CampaignViewMainPageModule {}
