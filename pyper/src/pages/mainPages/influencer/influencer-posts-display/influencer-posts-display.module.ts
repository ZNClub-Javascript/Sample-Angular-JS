import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfluencerPostsDisplayPage } from './influencer-posts-display';
import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    InfluencerPostsDisplayPage,
  ],
  imports: [
    IonicPageModule.forChild(InfluencerPostsDisplayPage),
    ComponentsModule
  ],
})
export class InfluencerPostsDisplayPageModule {}
