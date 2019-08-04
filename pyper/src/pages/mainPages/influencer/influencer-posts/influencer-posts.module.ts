import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfluencerPostsPage } from './influencer-posts';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    InfluencerPostsPage,
  ],
  imports: [
    IonicPageModule.forChild(InfluencerPostsPage),
    ComponentsModule
  ],
})
export class InfluencerPostsPageModule {}
