import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CampaignViewMainPage } from './campaign-view-main';
import { ComponentsModule } from '../../../../../components/components.module';

import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    CampaignViewMainPage
  ],
  imports: [
    IonicPageModule.forChild(CampaignViewMainPage),
    ComponentsModule,
    AgGridModule
  ],
})
export class CampaignViewMainPageModule {}
