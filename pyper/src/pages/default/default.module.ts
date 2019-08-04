import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefaultPage } from './default';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    DefaultPage,
  ],
  imports: [
    IonicPageModule.forChild(DefaultPage),
    ComponentsModule
  ],
})
export class DefaultPageModule {}
