import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostStatusPage } from './post-status';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PostStatusPage,
  ],
  imports: [
    IonicPageModule.forChild(PostStatusPage),
    ComponentsModule
  ],
})
export class PostStatusPageModule {}
