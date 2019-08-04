import { ComponentsModule } from './../../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DefaultBrandPage } from './default-brand';

@NgModule({
  declarations: [
    DefaultBrandPage,
  ],
  imports: [
    IonicPageModule.forChild(DefaultBrandPage),
    ComponentsModule
  ],
})
export class DefaultBrandPageModule {}
