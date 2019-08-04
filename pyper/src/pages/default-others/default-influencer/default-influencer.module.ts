import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefaultInfluencerPage } from './default-influencer';

@NgModule({
  declarations: [
    DefaultInfluencerPage,
  ],
  imports: [
    IonicPageModule.forChild(DefaultInfluencerPage),
    ComponentsModule
  ],
})
export class DefaultInfluencerPageModule {}
